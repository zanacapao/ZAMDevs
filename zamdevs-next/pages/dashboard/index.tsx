import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaHome, FaBook, FaSmile, FaTasks, FaChartBar, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FaHome /> },
  { label: "Journal", path: "/dashboard/journal", icon: <FaBook /> },
  { label: "Mood Tracker", path: "/dashboard/mood", icon: <FaSmile /> },
  { label: "Task", path: "/dashboard/task", icon: <FaTasks /> },
  { label: "Analytics", path: "/dashboard/analytics", icon: <FaChartBar /> },
  { label: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
  { label: "Account", path: "/dashboard/account", icon: <FaUser /> },
  { label: "Log out", path: "/auth/logout", icon: <FaSignOutAlt /> },
];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Reflectly Dashboard</title>
        <meta name="description" content="Reflectly minimalist journaling dashboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen bg-gradient-to-br from-[#E1D8E9] via-[#D5CFE1] to-[#B6A6CA]">
        {/* Sidebar */}
        <nav className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#A09ABC]/90 to-[#B6A6CA]/90 shadow-2xl rounded-r-3xl p-6 flex flex-col z-30 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-10">
            <Image src="/pictures/logo.png" alt="Logo" width={38} height={38} />
            <span className="text-white font-serif text-2xl font-bold tracking-wider drop-shadow">Reflectly</span>
          </div>
          <ul className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.path} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 font-semibold hover:bg-white/10 transition">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8 flex justify-center">
            <Image src="/sidebar-art.png" alt="Decorative" width={120} height={80} className="rounded-xl opacity-80" />
          </div>
        </nav>
        {/* Main Content */}
        <main className="flex-1 ml-64 p-10 bg-transparent min-h-screen">
          {/* Welcome Banner */}
          <div className="rounded-2xl mb-8 p-8 bg-white/60 backdrop-blur-md border border-white/30 shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#A09ABC] mb-1">Welcome back, ZAMDevs!</h2>
              <p className="text-[#6C63A6]">How are you feeling today?</p>
            </div>
            <div className="hidden md:block">
              <Image src="/pictures/logo.png" alt="Logo" width={60} height={60} />
            </div>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Today's Mood */}
            <div className="rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gradient-to-br from-[#B6A6CA]/80 to-[#E1D8E9]/80 border border-white/40">
              <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-[#6C63A6]">
                <FaSmile className="text-2xl text-[#A09ABC]" /> Today's Mood
              </div>
              <div className="text-4xl mb-4">😊</div>
              <button className="bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white px-5 py-2 rounded-lg font-bold shadow hover:from-[#B6A6CA] hover:to-[#A09ABC] transition">Update Mood</button>
            </div>
            {/* Mood Consistency */}
            <div className="rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gradient-to-br from-[#E1D8E9]/80 to-[#B6A6CA]/80 border border-white/40">
              <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-[#6C63A6]">
                <FaChartBar className="text-2xl text-[#A09ABC]" /> Mood Consistency
              </div>
              <div className="w-20 h-20 mb-4">
                <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#ede9fe" /><path d="M20 2 a18 18 0 1 1 0 36" stroke="#a78bfa" strokeWidth="4" fill="none" /></svg>
              </div>
              <button className="bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white px-5 py-2 rounded-lg font-bold shadow hover:from-[#B6A6CA] hover:to-[#A09ABC] transition">View Trends</button>
            </div>
            {/* Quick Entry */}
            <div className="rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gradient-to-br from-[#B6A6CA]/80 to-[#E1D8E9]/80 border border-white/40">
              <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-[#6C63A6]">
                <FaBook className="text-2xl text-[#A09ABC]" /> Quick Entry
              </div>
              <p className="text-[#6C63A6] mb-4 text-center">Tap below to create a new journal entry</p>
              <button className="bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white px-5 py-2 rounded-lg font-bold shadow flex items-center gap-2 hover:from-[#B6A6CA] hover:to-[#A09ABC] transition">
                <span className="text-xl">+</span> New Entry
              </button>
            </div>
            {/* Recent Activity */}
            <div className="rounded-2xl shadow-xl p-6 bg-gradient-to-br from-[#E1D8E9]/80 to-[#B6A6CA]/80 border border-white/40">
              <div className="flex items-center gap-2 text-lg font-semibold mb-2 text-[#6C63A6]">
                <FaTasks className="text-2xl text-[#A09ABC]" /> Recent Activity
              </div>
              <ul className="text-[#6C63A6] text-sm space-y-2 w-full">
                <li className="flex items-center gap-2">
                  <span className="text-[#A09ABC]">✔️</span>
                  Logged mood: <span className="font-semibold">Happy</span>
                  <span className="ml-auto text-[#A09ABC]/70">Today, 8:30 AM</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A09ABC]">📝</span>
                  Created journal entry
                  <span className="ml-auto text-[#A09ABC]/70">Yesterday</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#A09ABC]">✅</span>
                  Completed task
                  <span className="ml-auto text-[#A09ABC]/70">2 days ago</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
