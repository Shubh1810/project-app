"use client";
import React from 'react';
import axios from 'axios';

const BotControl = () => {
    const startBot = async () => {
        try {
            await axios.post('/api/bot/start');
            alert('Bot started');
        } catch (error) {
            console.error('Error starting bot:', error);
            alert('Failed to start the bot');
        }
    };

    const stopBot = async () => {
        try {
            await axios.post('/api/bot/stop');
            alert('Bot stopped');
        } catch (error) {
            console.error('Error stopping bot:', error);
            alert('Failed to stop the bot');
        }
    };

    return (
        <div>
            <button onClick={startBot}>Start Bot</button>
            <button onClick={stopBot}>Stop Bot</button>
        </div>
    );
};

export default BotControl;