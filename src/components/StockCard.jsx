import React from 'react';

const StockCard = ({ symbol, price, change }) => {
    const changeClass = change > 0 ? 'change-positive' : 'change-negative';

    return (
        <div className="stock-card">
            <h2>{symbol}</h2>
            <p>Price: ${price}</p>
            <p className={changeClass}>
                Change: {change > 0 ? '+' : ''}{change}%
            </p>
        </div>
    );
};

export default StockCard;

