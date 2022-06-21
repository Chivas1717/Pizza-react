import React from 'react';

function Categories({ value, onClickCategory }) {
  const categories = ['All', 'Meat', 'Vegan', 'Grill', 'Hot', 'Calzone'];

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
}

export default Categories;
