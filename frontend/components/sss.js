"use client";
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import BalanceDisplay from './BalanceDisplay';

const LinkBankAccount = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      console.log("fetching link toen...")
      try {
        const response = await fetch('http://localhost:8000/api/create_link_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log("Response received:", response);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error response:', errorData);
          throw new Error(JSON.stringify(errorData)); // Convert errorData to string
        }


        if (!response.ok) {
          throw new Error('Failed to create link token');
        }
        const data = await response.json();
        console.log("Data received:", data);
        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.link_token) {
          console.error('Link token not found in response:', data); // Log full data if link_token is missing
          throw new Error('Link token not found');
        }
        console.log("Setting link token:", data.link_token); // Debugging statement before setting link token

        setLinkToken(data.link_token);
        console.log("Link token set successfully:", data.link_token); // Debugging statement after setting link token

        console.log("Link token set:", data.link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
        setError('Failed to initialize Plaid Link. Please try again later.');
      }
    };
    createLinkToken();
  }, []);


  const fetchBalance = async () => {
    console.log("Fetching balance...");
    try {
        const response = await fetch('http://localhost:8000/api/balance', {
            method: 'GET',
        });

        console.log('Balance API response received:', response);

        const data = await response.json();
        console.log('Balance Response:', JSON.stringify(data));

        if (!response.ok) {
            console.error('Failed to fetch balance:', data);
            throw new Error(data.error);
        }

        const accounts = data.accounts;
        if (accounts && accounts.length > 0) {
            const availableBalance = accounts[0].balances.available;
            console.log("Available Balance:", availableBalance);
            return availableBalance;
        } else {
            throw new Error('No accounts found');
        }
    } catch (error) {
        console.error('Error fetching balance:', error);
        setError('Failed to fetch balance. Please try again later.');
        return null;
    }
};



  const onSuccess = async (publicToken, metadata) => {
    console.log('Public Token:', publicToken);
    console.log('Account ID:', metadata.account_id);
    try {
      const payload = { public_token: publicToken };
      console.log('Sending payload to backend:', payload);

      const response = await fetch('http://localhost:8000/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure this matches the content being sent
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const responseData = await response.json();
        console.error('Failed to exchange public token:', responseData);
        throw new Error(responseData.error);
      }
      
      const data = await response.json();
      console.log('Exchange Response:', JSON.stringify(data));
      const availableBalance = await fetchBalance();
            if (availableBalance !== null) {
                setBalance(availableBalance);
            }
      // Handle successful token exchange (e.g., navigate to a dashboard)
    } catch (error) {
      console.error('Error exchanging public token:', error);
      setError('Failed to link your account. Please try again later.');
    }
  };


  const { open, ready, error: plaidError } = usePlaidLink({
    token: linkToken,
    onSuccess,
  });

  useEffect(() => {
    if (plaidError) {
      console.error('Plaid Link Error:', plaidError);
      setError('Failed to open Plaid Link. Please try again later.');
    }
  }, [plaidError]);

  return (
    <div>
          
      <button className="button" id="link-button" onClick={open} disabled={!ready || !linkToken}>
        Link Bank Account
      </button>
      <BalanceDisplay balance={balance} /> {/* Pass balance state to BalanceDisplay */}  
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LinkBankAccount;