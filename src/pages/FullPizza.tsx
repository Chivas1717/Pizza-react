import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const FullPizza: React.FC = () => {
  interface pizzaType {
    imageUrl: string;
    title: string;
    sizes: string;
  }

  const [pizza, setPizza] = useState<pizzaType>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function renderFullPizza() {
      try {
        const { data } = await axios.get('https://62a159bdcc8c0118ef49d6b2.mockapi.io/items/' + id);
        console.log(data);
        setPizza(data);
      } catch (err) {
        alert('Thiz pizza does not exist or no longer available');
        navigate('/');
      }
    }

    renderFullPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
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
