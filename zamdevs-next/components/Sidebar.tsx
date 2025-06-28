import Link from "next/link";
import { FaHome, FaBook, FaSmile, FaTasks, FaChartBar, FaCog, FaUser, FaBars } from "react-icons/fa";
import Image from "next/image";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { label: "Journal", path: "/dashboard/journal", icon: <FaBook /> },
  { label: "Mood Tracker", path: "/dashboard/mood", icon: <FaSmile /> },
  { label: "Task", path: "/dashboard/task", icon: <FaTasks /> },
  { label: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
  { label: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  { label: "Account", path: "/dashboard/account", icon: <FaUser /> },
];

export default function Sidebar({ collapsed, setCollapsed }: { collapsed?: boolean, setCollapsed?: (v: boolean) => void }) {

  return (
    <>
      {/* Collapse/Expand button and overlay only if props are present (Account page) */}
      {typeof collapsed === 'boolean' && setCollapsed && (
        <button
          className="fixed top-6 left-6 z-50 bg-[#A09ABC] text-white rounded-lg p-2 text-2xl shadow-lg"
          onClick={() => setCollapsed(false)}
          style={{ display: collapsed ? "block" : "none" }}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
      )}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#A09ABC]/90 to-[#B6A6CA]/90 shadow-2xl rounded-r-3xl p-6 flex flex-col z-30 backdrop-blur-md transition-transform duration-200 ${collapsed ? "-translate-x-full" : "translate-x-0"}`}>
        {typeof collapsed === 'boolean' && setCollapsed && (
          <button
            className="bg-transparent border-none text-white text-2xl mb-8 self-end focus:outline-none"
            onClick={() => setCollapsed(true)}
            aria-label="Close sidebar"
          >
            <FaBars />
          </button>
        )}
        <div className="flex items-center gap-3 mb-10">
          <Image src="/pictures/logo.png" alt="Logo" width={38} height={38} />
          {(!collapsed || typeof collapsed !== 'boolean') && <span className="text-white font-serif text-2xl font-bold tracking-wider drop-shadow">Reflectly</span>}
        </div>
        <ul className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.path} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition">
                <span className="text-xl">{item.icon}</span>
                {(!collapsed || typeof collapsed !== 'boolean') && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Overlay background when sidebar is open (Account page only) */}
      {typeof collapsed === 'boolean' && setCollapsed && !collapsed && <div className="fixed inset-0 bg-black/20 z-20" onClick={() => setCollapsed(true)} />}
    </>
  );
}