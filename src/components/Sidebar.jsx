import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  PlusCircleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Add Expense", path: "/add-expense", icon: <PlusCircleIcon className="h-5 w-5" /> },
    { name: "Budget Setting", path: "/budget-setting", icon: <Cog6ToothIcon className="h-5 w-5" /> },
    { name: "Transactions", path: "/transactions", icon: <ClipboardDocumentListIcon className="h-5 w-5" /> },
  ];

  return (
    <div className="w-64 bg-secondary text-white flex flex-col">
      <h1 className="text-2xl font-bold text-center py-5">Expense Tracker</h1>
      <ul className="menu p-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-lg ${
                location.pathname === item.path
                  ? "bg-primary text-white"
                  : "hover:bg-lightBlue"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
