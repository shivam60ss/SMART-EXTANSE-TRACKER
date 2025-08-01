import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";

const AddExpenseForm = () => {
  const { addExpense } = useExpenseStore();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // yyyy-mm-dd

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date) return;
    addExpense({ title, amount: Number(amount), category, date });
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="max-w-md mx-auto card bg-base-200 p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Expense Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-full"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Rent</option>
          <option>Other</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
