import { useState, useEffect, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
	const [pizzaList, setPizzaList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [category, setCategory] = useState(0);
	const [sort, setSort] = useState('rating');
	const [currentPage, setCurrentPage] = useState(1);
	const { searchValue } = useContext(SearchContext);

	const sortBy = `sortBy=${sort}`;
	const filterBy = category > 0 ? `&category=${category}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';

	const skeletons = [...new Array(4)].map((_, index) => { return <PizzaSkeleton key={index} /> });
	const pizzas = pizzaList.map((pizzaInfo) => (<PizzaBlock {...pizzaInfo} key={pizzaInfo.id} />));

	useEffect(() => {
		if (pizzaList.length === 0) window.scrollTo(0, 0);

		setIsLoading(true);
		fetch(`https://64932246428c3d2035d1632a.mockapi.io/pizzasData/pizzas?page=${currentPage}&limit=4&${sortBy}${filterBy}${search}`)
			.then(res => res.json())
			.then(pizzas => {
				setPizzaList(pizzas);
				setIsLoading(false);
			})
	}, [category, sort, searchValue, currentPage])

	return (
		<div className="container">
			<div className="content__top">
				<Categories category={category} setCategory={setCategory} />
				<Sort sort={sort} setSort={setSort} />
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