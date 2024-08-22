// Assuming you're using Next.js without the new app/ directory structure
import Layout from '../components/Layout';  // Adjust the path as necessary
import '../styles/globals.css';
import LinkBankAccount  from '../components/sss';
import React from "react";
import BotStatus from '../components/BotStatus';
import BotControl from '../components/BotControl';
import TradingViewChart from '../components/TradingViewChart';
import BotLogs from '../components/BotLogs';




export default function Page() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold text-center">- Welcome to the Rand Co-Pilot Page -</h1>
                <p className="text-center mb-6">Please link Bank account to continue!!!</p>
    
                <div className="mb-8">
                    <LinkBankAccount />
                </div>
                <h1 className="text-4xl font-bold text-center mb-6">Trading Chart</h1>

                <div className='chartContainer'>
                <TradingViewChart />
                </div>
                
                <h1 className="text-2xl font-bold text-center mb-4">Trading Bot Control</h1>
                "
                <div className="botStatus">
                    <BotStatus />
                </div>
                <div className="botControl">
                    <BotControl />
                </div>
                <div className="botLogs">
                    <BotLogs />
                </div>
            </div>
        </Layout>
    );
}

