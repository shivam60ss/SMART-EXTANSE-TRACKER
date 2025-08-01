import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpenseForm from "./components/AddExpenseForm";
import BudgetSetting from "./components/BudgetSetting";
import TransactionHistory from "./components/TransactionHistory";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-base-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-expense" element={<AddExpenseForm />} />
            <Route path="/budget-setting" element={<BudgetSetting />} />
            <Route path="/transactions" element={<TransactionHistory />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
