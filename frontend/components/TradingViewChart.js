"use client";
import React, { useEffect } from 'react';

const TradingViewChart = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            new window.TradingView.widget({
                "width": "100%",
                "height": "600",
                "symbol": "BINANCE:BTCUSD",  // Default symbol; can be dynamic
                "interval": "D",          // Default time interval
                "timezone": "Etc/UTC",
                "theme": "dark",         // or "dark"
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "withdateranges": true,
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_chart"
            });
        };
        document.getElementById('tradingview_container').appendChild(script);
    }, []);

    return (
        <div id="tradingview_container">
            <div id="tradingview_chart"></div>
        </div>
    );
};

export default TradingViewChart;