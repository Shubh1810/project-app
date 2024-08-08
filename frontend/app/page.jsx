// Assuming you're using Next.js without the new app/ directory structure
import Layout from '../components/Layout';  // Adjust the path as necessary
import '../styles/globals.css';
import LinkBankAccount  from '../components/sss';
import React from "react";
import CategoryDropdown from '../components/categorydropdown';



export default function Page() {
    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-4xl font-bold text-center">Welcome to the Rand Co-Pilot Page</h1>
                <p>Please link Bank account to continue!!.</p>
    
                <LinkBankAccount />
                

            </div>
        </Layout>
    );
}

