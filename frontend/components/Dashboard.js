// components/Navbar.js
"use client";
const Dashboard = () => {
    const addExpense = () => {
      console.log('Adding expense...');
      // Add logic to add an expense
    };
  
    const editExpense = () => {
      console.log('Editing expense...');
      // Add logic to edit an expense
    };
  
    const loadExpenses = () => {
      console.log('Loading expenses...');
      // Logic to load or view expenses
    };
  
    const generateReport = () => {
      console.log('Generating monthly report...');
      // Logic to generate a report
    };
  
    return (
      <nav className="dashboard">
        <div className="nav-logo">Shubh Sheth</div>
        <div className="button-container">
          <button onClick={addExpense} className="button">Dashboard</button>
          <button onClick={editExpense} className="button">Strategies </button>
          <button onClick={loadExpenses} className="button">Portfolio</button>
          <button onClick={generateReport} className="button">Generate Report</button>
        </div>
      </nav>
    );
  };
  
  export default Dashboard;