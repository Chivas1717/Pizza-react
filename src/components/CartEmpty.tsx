import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartLogo from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Cart is Empty </h2>
      <p>
        You probably haven't ordered pizza yet.
        <br />
        To order pizza, go to the main page.
      </p>
      <img src={emptyCartLogo} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Back to Main Page</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
