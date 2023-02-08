import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddCard from "../components/AddCard";

const Payment: React.FC = () => {
    // @ts-ignore
    return (
        <div className="container container--cart">
            <AddCard />
        </div>
    )
}

export default Payment
