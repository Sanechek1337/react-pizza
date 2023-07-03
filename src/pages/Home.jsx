import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sort } = useSelector((state) => state.filter);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const [pizzaList, setPizzaList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const { searchValue } = useContext(SearchContext);

	const sortBy = sort.sortProperty.replace('-', '');
	const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
	const filterBy = categoryId > 0 ? `&category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';

	const skeletons = [...new Array(4)].map((_, index) => { return <PizzaSkeleton key={index} /> });
	const pizzas = pizzaList.map((pizzaInfo) => (<PizzaBlock {...pizzaInfo} key={pizzaInfo.id} />));

	useEffect(() => {
		if (pizzaList.length === 0) window.scrollTo(0, 0);

		setIsLoading(true);
		fetch(`https://64932246428c3d2035d1632a.mockapi.io/pizzasData/pizzas?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${filterBy}${search}`)
			.then(res => res.json())
			.then(pizzas => {
				setPizzaList(pizzas);
				setIsLoading(false);
			})
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
			<Pagination setCurrentPage={setCurrentPage} />
		</div>
	);
}

export default Home;