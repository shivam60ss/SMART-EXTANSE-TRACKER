import { create } from "zustand";

export const useExpenseStore = create((set) => ({
  expenses: [
    { id: 1, title: "Lunch", amount: 200, category: "Food" },
    { id: 2, title: "Bus Ticket", amount: 50, category: "Travel" },
  ],
  budget: 5000,

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, { id: Date.now(), ...expense }],
    })),

  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),

  setBudget: (amount) => set(() => ({ budget: amount })),
}));
