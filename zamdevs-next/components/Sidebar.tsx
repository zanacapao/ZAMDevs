import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaBook, FaSmile, FaTasks, FaChartBar, FaCog, FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";
import styles from "../pages/dashboard/Sidebar.module.css";
import { supabase } from "../lib/supabaseClient";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { label: "Feed", path: "/feed", icon: <FaGlobe /> },
  { label: "Journal", path: "/dashboard/journal", icon: <FaBook /> },
  { label: "Mood Tracker", path: "/dashboard/mood", icon: <FaSmile /> },
  { label: "Task", path: "/dashboard/tsk", icon: <FaTasks /> },
  { label: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
  { label: "Account", path: "/dashboard/account", icon: <FaUser /> },
  { label: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
];

export default function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (v: boolean) => void }) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  return (
    <>
      <button
        className={styles.overlayToggle}
        onClick={() => setCollapsed(false)}
        style={{ display: collapsed ? "block" : "none" }}
        aria-label="Open sidebar"
      >
        <FaBars />
      </button>
      <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded}`}>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(true)}
          aria-label="Close sidebar"
        >
          <FaBars />
        </button>
        <div className={styles.logo}>
          <FaBook style={{ fontSize: "2rem" }} />
          {!collapsed && <span>Reflectly</span>}
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link href={item.path}>
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className={styles.logoutBtn}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                font: "inherit",
                padding: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
              }}
            >
              <FaSignOutAlt />
              {!collapsed && <span>Log out</span>}
            </button>
          </li>
        </ul>
      </nav>
      {/* Overlay background when sidebar is open */}
      {!collapsed && <div className={styles.overlayBg} onClick={() => setCollapsed(true)} />}
    </>
  );
}