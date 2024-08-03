"use client";
import { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const LinkBankAccount = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createLinkToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/create_link_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to create link token');
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
        setError('Failed to initialize Plaid Link. Please try again later.');
      }
    };
    createLinkToken();
  }, []);

  const onSuccess = async (publicToken, metadata) => {
    console.log('Public Token:', publicToken);
    console.log('Account ID:', metadata.account_id);
    try {
      const response = await fetch('http://localhost:8000/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token: publicToken }),
      });
      if (!response.ok) {
        throw new Error('Failed to exchange public token');
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
      <button onClick={() => open()} disabled={!ready || !linkToken}>
        <strong>Link account</strong>
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LinkBankAccount;