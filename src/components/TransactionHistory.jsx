import { useExpenseStore } from "../store/useExpenseStore";

const TransactionHistory = () => {
  const { expenses, deleteExpense } = useExpenseStore();

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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>₹{expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="btn btn-error btn-xs"
                    >
                      Delete
                    </button>
                  </td>
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
