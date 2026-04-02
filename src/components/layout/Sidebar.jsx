import { NavLink } from "react-router-dom";

function Sidebar({ mobile = false, onClose, theme = "dark" }) {
  const navClass = ({ isActive }) =>
    `block rounded-xl px-4 py-3 transition-all duration-200 hover:bg-sidebar-accent ${
      isActive
        ? "bg-sidebar-accent font-semibold shadow-sm"
        : ""
    }`;

  // ✅ FIXED PATH
  const logoSrc =
    theme === "dark"
      ? "/logoDark.png"
      : "/logoLight.png";

  return (
    <aside
      className={`${
        mobile ? "w-full" : "h-screen w-72 sticky top-0"
      } border-r border-border bg-sidebar px-5 py-6 transition-colors duration-300`}
    >
      {/* 🔥 LOGO */}
      <div className="mb-8 flex items-center justify-center">
        <img
          src={logoSrc}
          alt="ExpenseHub Logo"
          className="h-15 object-contain"
        />
      </div>

      <nav className="space-y-3">
        <NavLink
          to="/"
          className={navClass}
          onClick={mobile ? onClose : undefined}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={navClass}
          onClick={mobile ? onClose : undefined}
        >
          Transactions
        </NavLink>

        <NavLink
          to="/insights"
          className={navClass}
          onClick={mobile ? onClose : undefined}
        >
          Insights
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;