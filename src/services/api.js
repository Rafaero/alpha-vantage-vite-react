import axios from 'axios';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

export const fetchStockData = async (symbol) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '5min',
                apikey: API_KEY,
            },
        });
        
        // Log rate limit headers for debugging
        console.log("Rate Limit Remaining:", response.headers['x-ratelimit-remaining']);
        console.log("Rate Limit Reset:", new Date(response.headers['x-ratelimit-reset'] * 1000));
        
        if (response.data && response.data['Time Series (5min)']) {
            return response.data['Time Series (5min)'];
        } else {
            console.error('Unexpected response structure', response.data);
            return null;
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return null;
    }
};
