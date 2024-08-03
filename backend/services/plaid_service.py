import os
from plaid import get_plaid_client
from plaid.api import plaid_api

def get_plaid_client():
    return plaid_api.PlaidApi(get_plaid_client(
        client_id=os.getenv('PLAID_CLIENT_ID'),
        secret=os.getenv('PLAID_SECRET'),
        environment=os.getenv('PLAID_ENV', 'development'),  # Default to sandbox if not set
    ))