import { useState, useEffect, useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

	const [pizzaList, setPizzaList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const { searchValue } = useContext(SearchContext);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	}

	const skeletons = [...new Array(4)].map((_, index) => { return <PizzaSkeleton key={index} /> });
	const pizzas = pizzaList.map((pizzaInfo) => (<PizzaBlock {...pizzaInfo} key={pizzaInfo.id} />));

	const fetchPizzas = () => {
		setIsLoading(true);

		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const filterBy = categoryId > 0 ? `&category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios.get(`https://64932246428c3d2035d1632a.mockapi.io/pizzasData/pizzas?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${filterBy}${search}`)
			.then(res => {
				setPizzaList(res.data);
				setIsLoading(false);
			})
	}

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}

		isMounted.current = true;
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	// Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = list.find(obj => obj.sortProperty === params.sortProperty);

			dispatch(setFilters({
				...params,
				sort
			}));
			isSearch.current = true;
		}
	}, [])

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			fetchPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	return (
		<div className="container">
			<div className="content__top">
				<Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeletons : pizzas}
			</div>
			<Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
		</div>
	);
}

export default Home;