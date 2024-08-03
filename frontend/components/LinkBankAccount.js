"use client";
import React, { useEffect, useState } from 'react';

const LinkBankAccount = () => {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        console.log('Fetching link token...');
        const response = await fetch('/api/create-link-token');
        const data = await response.json();
        setLinkToken(data.link_token);
        console.log('Link token fetched:', data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    fetchLinkToken();
  }, []);

  const handleOnSuccess = async (public_token, metadata) => {
    try {
      console.log('Handling onSuccess...');
      const response = await fetch('/api/exchange-public-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });
      const data = await response.json();
      console.log('Access Token:', data.access_token);
      console.log('Account ID:', metadata.account_id);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  };

  useEffect(() => {
    if (linkToken) {
      console.log('Loading Plaid script...');
      const script = document.createElement('script');
      script.src = "https://cdn.plaid.com/link/v2/stable/link-initialize.js";
      script.onload = () => {
        console.log('Plaid script loaded.');
        const plaid = window.Plaid.create({
          token: linkToken,
          onSuccess: handleOnSuccess,
        });

        document.getElementById('link-button').addEventListener('click', () => {
          console.log('Button clicked, opening Plaid...');
          plaid.open();
        });
      };
      document.body.appendChild(script);
    }
  }, [linkToken]);

  return <button className="button" id="link-button">Link Bank Account</button>;
};

export default LinkBankAccount;