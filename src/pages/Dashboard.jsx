import { useExpenseStore } from "../store/useExpenseStore";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Dashboard() {
  const { expenses, budget } = useExpenseStore();

  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const remainingBudget = budget - totalSpent;

  const pieData = {
    labels: ["Food", "Travel", "Bills", "Rent", "Other"],
    datasets: [
      {
        data: [300, 150, 100, 200, 50],
        backgroundColor: ["#3B82F6", "#22D3EE", "#FBBF24", "#F43F5E", "#10B981"],
      },
    ],
  };

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Expenses",
        data: [400, 500, 300, 700],
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div className="card bg-primary p-4 text-white shadow-lg">
          <h2 className="text-xl">Total Spent</h2>
          <p className="text-3xl font-bold">₹{totalSpent}</p>
        </div>
        <div className="card bg-secondary p-4 text-white shadow-lg">
          <h2 className="text-xl">Remaining Budget</h2>
          <p className="text-3xl font-bold">₹{remainingBudget}</p>
        </div>
        <div className="card bg-accent p-4 text-white shadow-lg">
          <h2 className="text-xl">Monthly Budget</h2>
          <p className="text-3xl font-bold">₹{budget}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
          <Pie data={pieData} />
        </div>
        <div className="card bg-base-200 p-4 shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Weekly Trends</h3>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
