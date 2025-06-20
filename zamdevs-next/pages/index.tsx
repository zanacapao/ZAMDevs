import React from "react";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Reflectly App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <header>
        <div className="logo">Reflectly</div>
        <div className="user-menu">
          <span className="material-icons">notifications</span>
          <div className="user-avatar">ZD</div>
        </div>
      </header>

      <nav>
        <div className="nav-item active" data-section="dashboard">
          <span className="material-icons">home</span>
          <span>Dashboard</span>
        </div>
        <div className="nav-item" data-section="journal">
          <span className="material-icons">menu_book</span>
          <span>Journal</span>
        </div>
        <div className="nav-item" data-section="mood-tracker">
          <span className="material-icons">mood</span>
          <span>Mood Tracker</span>
        </div>
        <div className="nav-item" data-section="tasks">
          <span className="material-icons">task</span>
          <span>Tasks</span>
        </div>
        <div className="nav-item" data-section="analytics">
          <span className="material-icons">insights</span>
          <span>Analytics</span>
        </div>
        <div className="nav-item" data-section="settings">
          <span className="material-icons">settings</span>
          <span>Settings</span>
        </div>
        <div className="nav-item" id="logout-btn" style={{ color: "#b91c1c", cursor: "pointer" }}>
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </div>
      </nav>

      <main>
        <div className="welcome-card">
          <h1>Welcome back, ZAMDevs!</h1>
          <p className="subtitle">How are you feeling today?</p>
        </div>

        <div className="cards-grid">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Today's Mood</div>
            </div>
            <div className="mood-display" id="todays-mood-emoji" style={{ fontSize: "2em" }}>😊</div>
            <button className="btn">
              <span className="material-icons">edit</span>
              Update Mood
            </button>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Mood Consistency</div>
            </div>
            <div className="progress-container">
              <svg className="progress-ring" viewBox="0 0 100 100">
                <circle className="background" cx="50" cy="50" r="45" />
                <circle className="progress" cx="50" cy="50" r="45" strokeDasharray="282.6" strokeDashoffset="70.6" />
              </svg>
            </div>
            <div id="mood-consistency-bar" style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "conic-gradient(#7c3aed 0%, #e0e7ff 0% 100%)",
              margin: "auto"
            }}></div>
            <button type="button" className="btn" id="view-trends-btn">View Trends</button>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick Entry</div>
            </div>
            <p style={{ marginBottom: 20, color: "var(--text-light)" }}>Tap below to create a new journal entry</p>
            <button className="btn" id="open-modal">
              <span className="material-icons">add</span>
              New Entry
            </button>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Recent Activity</div>
            </div>
            <div style={{ marginTop: 15 }}>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <span className="material-icons" style={{ marginRight: 10, color: "var(--primary)" }}>check_circle</span>
                <span>Logged mood: Happy</span>
                <span style={{ marginLeft: "auto", color: "var(--text-light)", fontSize: "0.9rem" }}>Today, 8:30 AM</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
                <span className="material-icons" style={{ marginRight: 10, color: "var(--primary)" }}>article</span>
                <span>Created journal entry</span>
                <span style={{ marginLeft: "auto", color: "var(--text-light)", fontSize: "0.9rem" }}>Yesterday</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="material-icons" style={{ marginRight: 10, color: "var(--primary)" }}>task</span>
                <span>Completed task</span>
                <span style={{ marginLeft: "auto", color: "var(--text-light)", fontSize: "0.9rem" }}>2 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add sections with matching IDs */}
        <section id="dashboard-section">
          {/* dashboard content */}
        </section>
        <section id="journal-section" style={{ display: "none" }}>
          <h2>Journal Entries</h2>
          <div id="journal-list"></div>
        </section>
        <section id="mood-tracker-section" style={{ display: "none" }}>
          {/* mood tracker content */}
        </section>
        <section id="tasks-section" style={{ display: "none" }}>
          {/* tasks content */}
        </section>
        <section id="analytics-section" style={{ display: "none" }}>
          {/* analytics content */}
        </section>
        <section id="settings-section" style={{ display: "none" }}>
          {/* settings content */}
        </section>

        {/* Quick Entry Modal */}
        <div id="quick-entry-modal" className="modal" style={{ display: "none" }}>
          <div className="modal-content">
            <span className="close" id="close-modal" style={{ float: "right", cursor: "pointer" }}>&times;</span>
            <h2>New Journal Entry</h2>
            <div id="mood-picker" style={{ textAlign: "center", marginBottom: 10 }}>
              <label style={{ fontWeight: 600 }}>Pick your mood:</label><br />
              <span className="mood-option" data-mood="happy" style={{ fontSize: "2em", cursor: "pointer" }}>😊</span>
              <span className="mood-option" data-mood="neutral" style={{ fontSize: "2em", cursor: "pointer" }}>😐</span>
              <span className="mood-option" data-mood="sad" style={{ fontSize: "2em", cursor: "pointer" }}>😢</span>
              <span className="mood-option" data-mood="angry" style={{ fontSize: "2em", cursor: "pointer" }}>😠</span>
              <span className="mood-option" data-mood="excited" style={{ fontSize: "2em", cursor: "pointer" }}>🤩</span>
            </div>
            <input type="hidden" id="selected-mood" value="" />
            <form id="quick-entry-form">
              <textarea id="quick-entry-text" rows={5} placeholder="Write your thoughts..."></textarea>
              <br />
              <button type="submit" className="btn">Save Entry</button>
            </form>
            <div id="quick-entry-success" style={{ display: "none", color: "green", marginTop: 10 }}>Entry saved!</div>
          </div>
        </div>

        {/* Mood Trends Modal */}
        <div id="trends-modal" className="modal" style={{ display: "none" }}>
          <div className="modal-content" style={{ maxWidth: 600 }}>
            <span className="close" id="close-trends-modal" style={{ float: "right", cursor: "pointer" }}>&times;</span>
            <h2>Mood Trends</h2>
            <div style={{ marginBottom: "1em", textAlign: "center" }}>
              <select id="calendar-year"></select>
              <select id="calendar-month"></select>
            </div>
            <div id="calendar-container"></div>
            <div id="mood-summary" style={{ marginTop: "1em" }}></div>
          </div>
        </div>
      </main>
    </>
  );
}