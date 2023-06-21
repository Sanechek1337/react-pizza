import { useState, useEffect } from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {
	const [pizzaList, setPizzaList] = useState([]);

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
			.then(pizzas => setPizzaList(pizzas))

	}, [])

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{
							pizzaList.map((pizzaInfo, index) => {
								return (
									<PizzaBlock
										{...pizzaInfo}
										key={index}
									/>
								)
							})
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
