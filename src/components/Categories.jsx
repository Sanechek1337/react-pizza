import { useState } from 'react';

const Categories = () => {
	const categoriesTitle = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
	const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

	return (
		<div className="categories">
			<ul>
				{
					categoriesTitle.map((category, index) => (
						<li
							className={activeCategoryIndex === index ? 'active' : ''}
							key={index}
							onClick={() => setActiveCategoryIndex(index)}
						>
							{category}
						</li>
					))
				}
			</ul>
		</div>
	);
}

export default Categories;