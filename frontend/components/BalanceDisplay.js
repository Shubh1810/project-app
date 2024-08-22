import React from 'react';

const BalanceDisplay = ({ balance }) => {
    return (
        <div >
            <h2 className="balance-title">Wallet</h2>
            <p className="balance-amount">$ {balance !== null ? balance : '0.0000'}</p>
        </div>
    );
};

export default BalanceDisplay;