"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BotLogs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await axios.get('/api/bot/logs');
                setLogs(response.data.logs);
            } catch (error) {
                console.error('Error fetching bot logs:', error);
            }
        };

        fetchLogs();
    }, []);

    return (
        <div>
            <h2>Bot Activity Logs</h2>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>{log}</li>
                ))}
            </ul>
        </div>
    );
};

export default BotLogs;