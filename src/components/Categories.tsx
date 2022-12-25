import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Hot', 'Calzone'];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
