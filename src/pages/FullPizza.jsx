import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function renderFullPizza() {
      try {
        const { data } = await axios.get('https://62a159bdcc8c0118ef49d6b2.mockapi.io/items/' + id);
        console.log(data);
        setPizza(data);
      } catch (err) {
        alert('Thiz pizza does not exist or no longer available');
      }
    }

    renderFullPizza();
  }, []);

  if (!pizza) {
    return 'loading...';
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt="" />
      <div>{pizza.title}</div>
      <div>{pizza.sizes}</div>
    </div>
  );
};

export default FullPizza;
