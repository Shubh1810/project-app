import json
import os
import tkinter as tk
from tkinter import messagebox, simpledialog, ttk
from datetime import datetime
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

FILE_NAME = 'expenses.json'
BUDGET_FILE_NAME = 'budget.json'

def load_expenses():
    if not os.path.exists(FILE_NAME):
        with open(FILE_NAME, 'w') as file:
            json.dump([], file)
    with open(FILE_NAME, 'r') as file:
        return json.load(file)

def save_expenses(expenses):
    with open(FILE_NAME, 'w') as file:
        json.dump(expenses, file, indent=4)

def add_expense(date, category, amount):
    expenses = load_expenses()
    expenses.append({
        'id': len(expenses) + 1,
        'date': date,
        'category': category,
        'amount': amount
    })
    save_expenses(expenses)

def edit_expense(expense_id, date, category, amount):
    expenses = load_expenses()
    for expense in expenses:
        if expense['id'] == expense_id:
            expense['date'] = date
            expense['category'] = category
            expense['amount'] = amount
            break
    save_expenses(expenses)

def delete_expense(expense_id):
    expenses = load_expenses()
    expenses = [expense for expense in expenses if expense['id'] != expense_id]
    save_expenses(expenses)

def view_expenses():
    return load_expenses()

def search_expenses(query):
    expenses = load_expenses()
    matching_expenses = [expense for expense in expenses if query.lower() in expense['category'].lower()]
    return matching_expenses

def generate_report():
    expenses = load_expenses()
    total_amount = sum(expense['amount'] for expense in expenses)
    return total_amount, expenses

def generate_monthly_report(year, month):
    expenses = load_expenses()
    monthly_expenses = [expense for expense in expenses if expense['date'].startswith(f"{year}-{month}")]
    total_amount = sum(expense['amount'] for expense in monthly_expenses)
    return total_amount, monthly_expenses

def load_budget():
    if not os.path.exists(BUDGET_FILE_NAME):
        with open(BUDGET_FILE_NAME, 'w') as file:
            json.dump([100 for _ in range(31)], file)  # Default budget
    with open(BUDGET_FILE_NAME, 'r') as file:
        return json.load(file)

def save_budget(budget):
    with open(BUDGET_FILE_NAME, 'w') as file:
        json.dump(budget, file, indent=4)

class ExpenseTrackerApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Expense Tracker")
        self.geometry("800x600")
        self.configure(bg='#2e2e2e')

        self.budget = load_budget()
        self.expenses = [0] * 31

        self.style = ttk.Style(self)
        self.style.theme_use('clam')

        self.entry_frame = tk.Frame(self)
        self.entry_frame.pack(pady=10)

        self.style.configure('Treeview', 
                             background='#333333', 
                             foreground='#ffffff', 
                             rowheight=25, 
                             fieldbackground='#333333',
                             font=('Arial', 10, 'bold'))
        self.style.map('Treeview', background=[('selected', '#1f77b4')], foreground=[('selected', '#ffffff')])

        self.style.configure('Treeview.Heading', 
                             background='#444444', 
                             foreground='#ffffff', 
                             font=('Arial', 12, 'bold'))

        self.style.configure('TButton', 
                             font=('Arial', 10, 'bold'), 
                             padding=5, 
                             background='#4CAF50', 
                             foreground='#ffffff')
        self.style.map('TButton', background=[('active', '#45a049')])

        self.fullscreen = False  # Add this attribute
        self.create_widgets()

    def create_widgets(self):
        self.tree = ttk.Treeview(self, columns=("ID", "Date", "Category", "Amount"), show='headings', style='Treeview')
        self.tree.heading("ID", text="ID")
        self.tree.heading("Date", text="Date")
        self.tree.heading("Category", text="Category")
        self.tree.heading("Amount", text="Amount")
        self.tree.column("Amount", anchor=tk.E)
        self.tree.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        style = ttk.Style()
        style.configure("Treeview", bordercolor="white", relief="solid")

        button_frame = tk.Frame(self, bg='#2e2e2e')  # Fixed reference to self
        button_frame.pack(fill=tk.X, padx=10, pady=10)

        self.add_button = ttk.Button(button_frame, text="Add Expense", command=self.add_expense)
        self.add_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.edit_button = ttk.Button(button_frame, text="Edit Expense", command=self.edit_expense)
        self.edit_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.delete_button = ttk.Button(button_frame, text="Delete Expense", command=self.delete_expense)
        self.delete_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.report_button = ttk.Button(button_frame, text="Generate Report", command=self.generate_report)
        self.report_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.monthly_report_button = ttk.Button(button_frame, text="Generate Monthly Report", command=self.generate_monthly_report)
        self.monthly_report_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.search_button = ttk.Button(button_frame, text="Search Expenses", command=self.search_expenses)
        self.search_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.add_button = tk.Button(self.entry_frame, text="Add/Update", command=self.add_update_data, bg="lightblue")
        self.add_button.grid(row=3, columnspan=2)

        self.fullscreen_button = ttk.Button(button_frame, text="Toggle Fullscreen", command=self.toggle_fullscreen)
        self.fullscreen_button.pack(side=tk.LEFT, padx=5, pady=5)

        self.load_expenses()

        # Space for chart visualization

        self.canvas = tk.Canvas(self, width=800, height=400)
        self.canvas.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        chart_frame = tk.Frame(self, bg='#2e2e2e')
        chart_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        self.chart_label = tk.Label(chart_frame, text="Expenses vs Budget", bg='#2e2e2e', fg='#ffffff', font=('Arial', 14, 'bold'))
        self.chart_label.pack(pady=5)
        self.chart_canvas = None
        self.update_chart()

    def add_edit_budget(self):
        for i in range(31):
            amount = simpledialog.askfloat("Budget", f"Enter budget for day {i+1}:", initialvalue=self.budget[i])
            if amount is not None:
                self.budget[i] = amount
        save_budget(self.budget)
        self.update_chart()

    def load_expenses(self):
        for expense in self.tree.get_children():
            self.tree.delete(expense)
        expenses = view_expenses()
        for expense in expenses:
            self.tree.insert("", tk.END, values=(expense['id'], expense['date'], expense['category'], f"${expense['amount']:.2f}"))

    def add_expense(self):
        date = simpledialog.askstring("Input", "Enter date (YYYY-MM-DD):")
        category = simpledialog.askstring("Input", "Enter category:")
        amount = simpledialog.askfloat("Input", "Enter amount:")

        if date and category and amount is not None:
            add_expense(date, category, amount)
            self.load_expenses()
            self.update_chart()
        else:
            messagebox.showerror("Error", "All fields are required!")

    def edit_expense(self):
        selected_item = self.tree.selection()
        if not selected_item:
            messagebox.showerror("Error", "Please select an expense to edit.")
            return

        expense_id = self.tree.item(selected_item, 'values')[0]
        date = simpledialog.askstring("Input", "Enter new date (YYYY-MM-DD):")
        category = simpledialog.askstring("Input", "Enter new category:")
        amount = simpledialog.askfloat("Input", "Enter new amount:")

        if date and category and amount is not None:
            edit_expense(int(expense_id), date, category, amount)
            self.load_expenses()
            self.update_chart()
        else:
            messagebox.showerror("Error", "All fields are required!")

    def delete_expense(self):
        selected_item = self.tree.selection()
        if not selected_item:
            messagebox.showerror("Error", "Please select an expense to delete.")
            return

        expense_id = self.tree.item(selected_item, 'values')[0]
        delete_expense(int(expense_id))
        self.load_expenses()
        self.update_chart()
    
    def add_update_data(self):
        for i in range(31):
            amount = simpledialog.askfloat("Budget", f"Enter budget for day {i+1}:", initialvalue=self.budget[i])
            if amount is not None:
                self.budget[i] = amount
        save_budget(self.budget)
        self.update_chart()
   
    def generate_report(self):
        total_amount, expenses = generate_report()
        messagebox.showinfo("Report", f"Total Expenses: ${total_amount:.2f}")

    def generate_monthly_report(self):
        year = simpledialog.askstring("Input", "Enter year (YYYY):")
        month = simpledialog.askstring("Input", "Enter month (MM):")
        if year and month:
            total_amount, monthly_expenses = generate_monthly_report(year, month)
            report = f"Total Expenses for {year}-{month}: ${total_amount:.2f}\n"
            for expense in monthly_expenses:
                report += f"{expense['date']} - {expense['category']} - ${expense['amount']:.2f}\n"
            messagebox.showinfo("Monthly Report", report)
        else:
            messagebox.showerror("Error", "Year and month are required!")

    def search_expenses(self):
        query = simpledialog.askstring("Input", "Enter search query:")
        if query:
            matching_expenses = search_expenses(query)
            self.tree.delete(*self.tree.get_children())
            for expense in matching_expenses:
                self.tree.insert("", tk.END, values=(expense['id'], expense['date'], expense['category'], f"${expense['amount']:.2f}"))
        else:
            messagebox.showerror("Error", "Search query is required!")

    def toggle_fullscreen(self):
        self.fullscreen = not self.fullscreen
        self.attributes('-fullscreen', self.fullscreen)
        if not self.fullscreen:
            self.geometry("800x600")  # Reset to default size

    def update_chart(self):
        expenses = load_expenses()
        
        # Assuming the budget is predefined, for example, a fixed amount per day.
        # You can change this to match your actual budget logic.
        # Calculate daily expenses
        daily_expenses = [0] * 31
        for expense in expenses:
            try:
                day = int(expense['date'].split('-')[2])
                daily_expenses[day - 1] += expense['amount']
            except (IndexError, ValueError):
                continue

        fig, ax = plt.subplots()
        ax.plot(range(1, 32), self.budget, label='Budget', color='blue')
        ax.plot(range(1, 32), daily_expenses, label='Expenses', color='red')
        ax.set_xlabel('Day of the Month')
        ax.set_ylabel('Amount ($)')
        ax.legend()


        ax.tick_params(axis='x', colors='white')
        ax.tick_params(axis='y', colors='white')
        ax.spines['top'].set_color('white')
        ax.spines['bottom'].set_color('white')
        ax.spines['left'].set_color('white')
        ax.spines['right'].set_color('white')

        if hasattr(self, 'canvas_widget'):
            self.canvas_widget.get_tk_widget().pack_forget()

        self.canvas_widget = FigureCanvasTkAgg(fig, master=self.canvas)
        self.canvas_widget.draw()
        self.canvas_widget.get_tk_widget().pack()


if __name__ == "__main__":
    app = ExpenseTrackerApp()
    app.mainloop()
