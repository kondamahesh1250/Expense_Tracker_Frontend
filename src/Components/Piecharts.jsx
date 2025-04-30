import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid
} from 'recharts';

const Piecharts = ({ expenses }) => {
    if (!expenses || expenses.length === 0) {
        return (
          <div style={{
            height: '300px',
            display: 'flex',
            marginTop:'150px',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f5f5f5',
            borderRadius: '8px',
            color: '#777',
            fontSize: '18px',
            textAlign: 'center'
          }}>
            No expense data available to display charts.
          </div>
        );
      }
  // Sum total income and expense
  let incomeTotal = 0;
  let expenseTotal = 0;

  expenses.forEach(exp => {
    const amount = Math.abs(Number(exp.amount));
    if (exp.category.toLowerCase() === 'income') {
      incomeTotal += amount;
    } else {
      expenseTotal += amount;
    }
  });

  const pieData = [
    { name: 'Income', value: incomeTotal },
    { name: 'Expense', value: expenseTotal },
  ];

  const COLORS = ['#82ca9d', '#8884d8']; // Green and Purple

  // Bar Chart - Total per month (income + expense)
  const monthMap = {};
  expenses.forEach(exp => {
    const date = new Date(exp.date);
    const key = date.toLocaleString('default', { month: 'short', year: 'numeric' });

    monthMap[key] = (monthMap[key] || 0) + Math.abs(Number(exp.amount));
  });

  const monthData = Object.entries(monthMap).map(([month, total]) => ({
    month,
    total
  })).sort((a, b) => new Date('1 ' + a.month) - new Date('1 ' + b.month));

  return (
    <div style={{ padding: '1rem' }}>
      <h2 className=' mt-3 mb-4'>Financial Overview</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {/* Pie Chart */}
        <div className='mb-4'>
          <h4 style={{ textAlign: 'center', paddingTop:'10px' }}>Income vs Expense</h4>
          <PieChart width={450} height={250}>
            <Pie
              data={pieData}
              cx="50%" cy="50%" outerRadius={80}
              labelLine={false}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div>
          <h4 style={{ textAlign: 'center' }}>Monthly Total</h4>
          <BarChart width={300} height={250} data={monthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" name="Total (Income + Expense)" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Piecharts;
