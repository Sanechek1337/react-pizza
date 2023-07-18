import { FC } from "react";

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (index: number) => void;
};

const categoriesTitle = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

const Categories: FC<CategoriesProps> = ({ categoryId, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categoriesTitle.map((category, index) => (
          <li
            className={categoryId === index ? "active" : ""}
            key={index}
            onClick={() => onChangeCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
