// pages/expenses.js
"use client";
import Layout from '../components/Layout';
import ExpenseActions from '../components/ExpenseActions';
import CategoryDropdown from '../components/CategoryDropdown';
import { useState } from 'react';

export default function Expenses() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    { id: 'food', name: 'Food' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'transport', name: 'Transport' },
    // Additional categories as needed
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-6">Manage Expenses</h1>
        <CategoryDropdown categories={categories} onSelect={setSelectedCategory} />
        <ExpenseActions
          onAdd={() => console.log('Add')}
          onEdit={() => console.log('Edit')}
          onDelete={() => console.log('Delete')}
          onView={() => console.log('View')}
          onGenerateReport={() => console.log('Generate Report')}
        />
      </div>
    </Layout>
  );
}