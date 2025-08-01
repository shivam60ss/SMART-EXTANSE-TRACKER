import { useExpenseStore } from "../store/useExpenseStore";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

import { useMemo } from "react";

export default function Dashboard() {
    const { expenses, budget } = useExpenseStore();

    const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
    const remainingBudget = budget - totalSpent;

    // Aggregate expenses by category dynamically
    const categoryData = useMemo(() => {
        const categories = {};
        expenses.forEach(({ category, amount }) => {
            categories[category] = (categories[category] || 0) + amount;
        });
        return categories;
    }, [expenses]);

    const pieData = {
        labels: Object.keys(categoryData),
        datasets: [
            {
                data: Object.values(categoryData),
                backgroundColor: ["#3B82F6", "#22D3EE", "#FBBF24", "#F43F5E", "#10B981"],
            },
        ],
    };

    const barData = useMemo(() => {
        // Helper to get week number of the month
        const getWeekNumber = (date) => {
            const d = new Date(date);
            const day = d.getDay() || 7; // Sunday as 7
            d.setDate(d.getDate() + 4 - day);
            const yearStart = new Date(d.getFullYear(), 0, 1);
            const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
            return weekNo;
        };

        const weeks = {};
        expenses.forEach(({ date, amount }) => {
            const week = getWeekNumber(date);
            weeks[week] = (weeks[week] || 0) + amount;
        });

        const labels = Object.keys(weeks).map((w) => `Week ${w}`);
        const data = Object.values(weeks);

        return {
            labels,
            datasets: [
                {
                    label: "Expenses",
                    data,
                    backgroundColor: "#3B82F6",
                },
            ],
        };
    }, [expenses]);

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="card bg-primary p-4 text-white shadow-lg">
                    <h2 className="text-xl">Total Spent</h2>
                    <p className="text-3xl font-bold">₹{totalSpent}</p>
                </div>
                <div className="card bg-[#C21460] p-4 text-white shadow-lg">
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
