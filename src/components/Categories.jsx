import { useEffect, useState } from 'react';

const Categories = ({ categoryId, onChangeCategory }) => {
	const categoriesTitle = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	return (
		<div className="categories">
			<ul>
				{
					categoriesTitle.map((category, index) => (
						<li
							className={categoryId === index ? 'active' : ''}
							key={index}
							onClick={() => onChangeCategory(index)}
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