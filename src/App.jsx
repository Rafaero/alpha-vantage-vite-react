import React from 'react';
import { useEffect, useState } from 'react';
import { fetchStockData } from './services/api';
import StockCard from './components/StockCard';

function App() {
    const [stockData, setStockData] = useState(null);

    useEffect(() => {
        fetchStockData('IBM').then(data => {
            if (data) {
                const timeSeries = data['Time Series (5min)'];
                const latestTime = Object.keys(timeSeries)[0];
                const latestData = timeSeries[latestTime];
                setStockData({
                    symbol: 'IBM',
                    price: latestData['1. open'],
                    change: ((latestData['4. close'] - latestData['1. open']) / latestData['1. open']) * 100,
                });
            }
        });
    }, []);

    return (
        <div>
            <h1>Financial Market App</h1>
            {stockData ? (
                <StockCard
                    symbol={stockData.symbol}
                    price={stockData.price}
                    change={stockData.change.toFixed(2)}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
