import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";

const BudgetSetting = () => {
  const { budget, setBudget } = useExpenseStore();
  const [newBudget, setNewBudget] = useState(budget);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newBudget > 0) {
      setBudget(Number(newBudget));
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-base-200 p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Set Monthly Budget</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Enter Monthly Budget (₹)"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          className="input input-bordered w-full"
        />
        <button type="submit" className="btn btn-primary w-full">
          Save Budget
        </button>
      </form>
      <p className="mt-4 text-lg">
        Current Budget: <span className="font-bold">₹{budget}</span>
      </p>
    </div>
  );
};

export default BudgetSetting;
