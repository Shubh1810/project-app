// components/Navbar.js
"use client";
const Navbar = () => {
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
      <nav className="navbar">
        <div className="nav-logo">Shubh Sheth</div>
        <div className="button-container">
          <button onClick={addExpense} className="button">Add Expense</button>
          <button onClick={editExpense} className="button">Edit Expense</button>
          <button onClick={loadExpenses} className="button">Load Expenses</button>
          <button onClick={generateReport} className="button">Generate Report</button>
        </div>
      </nav>
    );
  };
  
  export default Navbar;