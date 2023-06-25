import { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { PizzaSkeleton } from '../components/PizzaBlock/PizzaSkeleton';

const Home = () => {
	const [pizzaList, setPizzaList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// (async () => {
		// 	const request = await fetch('https://64932246428c3d2035d1632a.mockapi.io/pizzasData/pizzas')
		// 		.then(res => res.json())

		// 	if (request) {
		// 		setPizzaList(request)
		// 	}
		// })()

		fetch('https://64932246428c3d2035d1632a.mockapi.io/pizzasData/pizzas')
			.then(res => res.json())
			.then(pizzas => {
				setPizzaList(pizzas);
				setIsLoading(false);
			})
		window.scrollTo(0, 0);
	}, [])

	return (
		<div className="container">
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{
					isLoading
						? [...new Array(10)].map((_, index) => {
							return <PizzaSkeleton key={index} />
						})
						: pizzaList.map((pizzaInfo, index) => {
							return (
								<PizzaBlock
									{...pizzaInfo}
									key={pizzaInfo.id}
								/>
							)
						})
				}
			</div>
		</div>
	);
}

export default Home;