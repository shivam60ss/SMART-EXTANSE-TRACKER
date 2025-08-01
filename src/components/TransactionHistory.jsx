import { useState } from "react";
import { useExpenseStore } from "../store/useExpenseStore";

const TransactionHistory = () => {
  const { expenses, deleteExpense, updateExpense } = useExpenseStore();
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");

  const startEdit = (expense) => {
    setEditId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);
    setEditDate(expense.date ? expense.date.slice(0, 10) : "");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("");
    setEditDate("");
  };

  const saveEdit = () => {
    if (!editTitle || !editAmount || !editCategory || !editDate) return;
    updateExpense({
      id: editId,
      title: editTitle,
      amount: Number(editAmount),
      category: editCategory,
      date: editDate,
    });
    cancelEdit();
  };

  return (
    <div className="card bg-base-200 p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Transaction History</h2>

      {expenses.length === 0 ? (
        <p className="text-gray-300">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount (₹)</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  {editId === expense.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editAmount}
                          onChange={(e) => setEditAmount(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="select select-bordered w-full"
                        >
                          <option>Food</option>
                          <option>Travel</option>
                          <option>Bills</option>
                          <option>Rent</option>
                          <option>Other</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="input input-bordered w-full"
                        />
                      </td>
                      <td>
                        <button
                          onClick={saveEdit}
                          className="btn btn-success btn-xs mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn btn-warning btn-xs"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{expense.title}</td>
                      <td>₹{expense.amount}</td>
                      <td>{expense.category}</td>
                      <td>{expense.date ? expense.date.slice(0, 10) : ""}</td>
                      <td>
                        <button
                          onClick={() => startEdit(expense)}
                          className="btn btn-primary btn-xs mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteExpense(expense.id)}
                          className="btn btn-error btn-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
