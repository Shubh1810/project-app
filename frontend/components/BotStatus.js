"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BotStatus = () => {
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get('/api/bot/status');
                setStatus(response.data.status);
            } catch (error) {
                console.error('Error fetching bot status:', error);
                setStatus('Error');
            }
        };

        fetchStatus();
    }, []);

    return (
        <div>
            <h2>Bot Status: {status}</h2>
        </div>
    );
};

export default BotStatus;