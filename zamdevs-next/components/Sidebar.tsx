import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaHome, FaBook, FaSmile, FaTasks, FaChartBar, FaCog, FaUser, FaSignOutAlt, FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import styles from "../pages/dashboard/Sidebar.module.css";
import { supabase } from "../lib/supabaseClient";
import Image from "next/image";

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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    // Fetch user info and streak from Supabase
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, avatar_url, full_name')
        .eq('id', user.id)
        .single();
      let firstName = '';
      if (profile) {
        if (profile.first_name) firstName = profile.first_name;
        else if (profile.full_name) firstName = profile.full_name.split(' ')[0];
      }
      setUser({ first_name: firstName, avatar_url: profile?.avatar_url || "/default-avatar.png" });
      setStreak(5); // TODO: fetch real streak
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/auth/login");
  }

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  // Only show overlay on mobile (max-width: 768px)
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <nav className={`${styles.sidebar} ${collapsed ? styles.collapsed : styles.expanded}`}>  
      {/* Logo/Icon at the top */}
      <div className={styles.logo} style={{ marginBottom: collapsed ? '2.5rem' : '2.5rem' }}>
        <Image src="/pictures/logo.png" alt="Logo" width={collapsed ? 36 : 44} height={collapsed ? 36 : 44} />
        {!collapsed && <span style={{ fontFamily: 'serif', fontWeight: 700, letterSpacing: 1 }}>Reflectly</span>}
      </div>

      {/* Toggle button visually integrated */}
      <button
        className={`${styles.overlayToggle} ${collapsed ? styles.showToggle : styles.hideToggle}`}
        onClick={() => setCollapsed(false)}
        aria-label="Open sidebar"
        style={{ display: collapsed ? 'flex' : 'none' }}
      >
        <FaBars />
      </button>
      <button
        className={styles.collapseBtn}
        onClick={() => setCollapsed(true)}
        aria-label="Close sidebar"
        style={{ display: collapsed ? 'none' : 'flex' }}
      >
        <FaTimes />
      </button>

      {/* Menu Items */}
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.label} className={styles.menuItem}>
            <Link
              href={item.path}
              className={`${styles.menuLink} ${isActive(item.path) ? styles.active : ''}`}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span
                className={styles.iconWrapper}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
              </span>
              <span className={styles.menuText}>{item.label}</span>
              {isActive(item.path) && <div className={styles.activeIndicator} />}
            </Link>
          </li>
        ))}
        {/* Logout Button */}
        <li className={styles.menuItem}>
          <button
            onClick={handleLogout}
            className={`${styles.logoutBtn} ${styles.menuLink}`}
            onMouseEnter={() => setHoveredItem('logout')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <span className={styles.iconWrapper} title={collapsed ? 'Log out' : undefined}>
              <FaSignOutAlt />
            </span>
            <span className={styles.menuText}>Log out</span>
          </button>
        </li>
      </ul>
      {/* Profile Mini-Card */}
      <div style={{ marginTop: 'auto', padding: collapsed ? '0.5rem 0' : '1.2rem 0', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', transition: 'padding 0.3s' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 12, width: '100%' }}>
          <Image src={user?.avatar_url || "/default-avatar.png"} alt="Avatar" width={36} height={36} style={{ borderRadius: '50%', border: '2px solid #E1D8E9', background: '#fff' }} />
          {!collapsed && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontSize: 14 }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{user?.first_name || 'Set name'}</span>
              <span style={{ color: '#D4BEBE', fontSize: 13, fontWeight: 500 }}>🔥 {streak} day streak</span>
            </div>
          )}
        </div>
      </div>
      {/* Overlay background when sidebar is open (only on mobile) */}
      {!collapsed && isMobile && (
        <div
          className={styles.overlayBg}
          onClick={() => setCollapsed(true)}
        />
      )}
    </nav>
  );
}