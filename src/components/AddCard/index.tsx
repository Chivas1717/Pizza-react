import React from "react";
import './AddCard.scss'
import deliveryLogo from '../../assets/img/delivery-man.png'
const AddCard: React.FC = () => {
    return (
        <div className="mainscreen">
            <div className="card">
                <div className="leftside">
                    <img
                        src={deliveryLogo}
                        className="product"
                        alt="delivery"
                    />
                </div>
                <div className="rightside">
                    <form action="" onSubmit={(e) => {
                        e.preventDefault()
                        alert('paid!')
                    }
                    }>
                        <h1>CheckOut</h1>
                        <h2>Payment Information</h2>
                        <p className="line-text">Cardholder Name</p>
                        <input type="text" className="inputbox" name="name" required/>
                        <p className="line-text">Card Number</p>
                        <input type="number" className="inputbox" name="card_number" id="card_number" required/>

                        <p className="line-text">Card Type</p>
                        <select className="inputbox" name="card_type" id="card_type" required>
                            <option value="">--Select a Card Type--</option>
                            <option value="Visa">Visa</option>
                            <option value="MasterCard">MasterCard</option>
                        </select>
                        <div className="expcvv">

                            <p className="line-text expcvv_text">Expiry</p>
                            <input type="date" className="inputbox" name="exp_date" id="exp_date" required/>

                            <p className="line-text expcvv_text2">CVV</p>
                            <input type="password" className="inputbox" name="cvv" id="cvv" required/>
                        </div>
                        <p className="line-text"></p>
                        <button type="submit" className="proceed">CheckOut</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCard