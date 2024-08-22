# project-app
Side Project demo Appp

Still deciding what to make!!


project/
│
├── backend/
│   ├── app.py (Main Flask application)
│   ├── requirements.txt (Dependencies)
│   ├── models/
│   │   └── user.py (User model)
│   │   └── transaction.py (Transaction model)
│   ├── routes/
│   │   └── auth.py (User authentication routes)
│   │   └── transactions.py (Transaction-related routes)
│   ├── config.py (Configuration settings)
│   └── tests/
│       ├── test_auth.py (Unit tests for authentication)
│       └── test_transactions.py (Unit tests for transactions)
│
├── frontend/
│   ├── app/
│   │   ├── page.js (Home/Dashboard page)
│   │   ├── transactions.js (Transactions list page)
│   │   ├── _app.js (Custom App component for global state/layout)
│   │
│   ├── components/
│   │   ├── Navbar.js (Navigation component)
│   │   ├── LinkAccount.js (Form component for adding transactions)
│   │   ├── TransactionList.js (Component to display list of transactions)
│   │
│   ├── styles/
│   │   ├── globals.css (Global CSS styles)
│   │
│   ├── utils/
│   │   ├── api.js (Helper functions to interact with Flask API)
│   │
│   ├── public/
│   │   └── (Static assets like images, icons, etc.)
│   │
│   ├── next.config.js (Next.js configuration)
│   └── package.json (NPM dependencies)
│
├── .env (API KEYS)
├── .gitignore (Files to be ignored by Git)
├── README.md (Project documentation)
