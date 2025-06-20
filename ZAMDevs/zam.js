document.addEventListener('DOMContentLoaded', function() {
    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const section = this.getAttribute('data-section');
            document.querySelectorAll('main section').forEach(sec => {
                sec.style.display = sec.id === section + '-section' ? '' : 'none';
            });
            // If journal, render entries
            if (section === 'journal') renderJournalList();
        });
    });

    // Notification bell
    const notifIcon = document.querySelector('.user-menu .material-icons');
    if (notifIcon) {
        notifIcon.addEventListener('click', function() {
            alert('No new notifications!');
        });
    }

    // Profile avatar
    const avatar = document.querySelector('.user-avatar');
    if (avatar) {
        avatar.addEventListener('click', function() {
            alert('Profile menu coming soon!');
        });
    }

    // --- Quick Entry Modal Logic ---
    const quickEntryBtn = Array.from(document.querySelectorAll('.card .btn')).find(btn => btn.textContent.includes('New Entry'));
    const quickEntryModal = document.getElementById('quick-entry-modal');
    const closeModal = document.getElementById('close-modal');
    const quickEntryForm = document.getElementById('quick-entry-form');
    const quickEntryText = document.getElementById('quick-entry-text');
    const quickEntrySuccess = document.getElementById('quick-entry-success');

    if (quickEntryBtn && quickEntryModal) {
        quickEntryBtn.addEventListener('click', function() {
            quickEntryModal.style.display = 'flex';
            quickEntryText.value = '';
            quickEntrySuccess.style.display = 'none';
        });
    }
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            quickEntryModal.style.display = 'none';
        });
    }
    window.onclick = function(event) {
        if (event.target === quickEntryModal) {
            quickEntryModal.style.display = 'none';
        }
    };

    // Save entry from modal
    if (quickEntryForm) {
        quickEntryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const text = quickEntryText.value.trim();
            const mood = selectedMoodInput.value;
            if (text && mood) {
                saveJournalEntry(text, mood);
                quickEntrySuccess.style.display = '';
                quickEntryText.value = '';
                selectedMood = '';
                selectedMoodInput.value = '';
                moodOptions.forEach(opt => opt.style.border = '');
                setTimeout(() => {
                    quickEntrySuccess.style.display = 'none';
                    quickEntryModal.style.display = 'none';
                    updateDashboardMood();
                    updateMoodConsistency();
                }, 1000);
            } else if (!mood) {
                alert('Please pick a mood!');
            }
        });
    }

    // --- Journal List Logic (save mood) ---
    function saveJournalEntry(text, mood) {
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        const now = new Date();
        entries.unshift({
            text,
            mood,
            date: now.toLocaleString(), // for display
            isoDate: now.toISOString().slice(0, 10) // for matching in calendar
        });
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }

    function renderJournalList() {
        const listDiv = document.getElementById('journal-list');
        if (!listDiv) return;
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        if (entries.length === 0) {
            listDiv.innerHTML = '<p style="color:gray;">No journal entries yet.</p>';
        } else {
            listDiv.innerHTML = entries.map(entry =>
                `<div class="journal-entry" style="margin-bottom:1em;padding:1em;border:1px solid #eee;border-radius:6px;">
                    <div style="font-size:0.95em;color:#666;">${entry.date} ${entry.mood ? moodToEmoji(entry.mood) : ''}</div>
                    <div style="margin-top:0.5em;">${entry.text.replace(/\n/g, '<br>')}</div>
                </div>`
            ).join('');
        }
    }

    // --- Dashboard Mood & Consistency ---
    function moodToEmoji(mood) {
        switch (mood) {
            case 'happy': return '😊';
            case 'neutral': return '😐';
            case 'sad': return '😢';
            case 'angry': return '😠';
            case 'excited': return '🤩';
            default: return '';
        }
    }

    function updateDashboardMood() {
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        const moodEl = document.getElementById('todays-mood-emoji');
        if (!moodEl) return;

        if (entries.length === 0) {
            moodEl.textContent = "No data";
            moodEl.style.opacity = "0.5";
        } else {
            const todayMood = entries[0].mood;
            moodEl.textContent = todayMood ? moodToEmoji(todayMood) : "No data";
            moodEl.style.opacity = "1";
        }
    }

    function updateMoodConsistency() {
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
        if (entries.length === 0) return;
        // Calculate the percentage of days with the same mood as today
        const todayMood = entries[0].mood;
        const sameMoodCount = entries.filter(e => e.mood === todayMood).length;
        const percent = Math.round((sameMoodCount / entries.length) * 100);
        const consistencyEl = document.getElementById('mood-consistency-bar');
        if (consistencyEl) {
            consistencyEl.style.background = `conic-gradient(#7c3aed ${percent}%, #e0e7ff ${percent}% 100%)`;
        }
    }

    // Call these on load
    updateDashboardMood();
    updateMoodConsistency();

    // --- Mood Picker Logic ---
    let selectedMood = '';
    const moodOptions = document.querySelectorAll('.mood-option');
    const selectedMoodInput = document.getElementById('selected-mood');

    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            moodOptions.forEach(opt => opt.style.border = '');
            this.style.border = '2px solid #7c3aed';
            selectedMood = this.getAttribute('data-mood');
            selectedMoodInput.value = selectedMood;
        });
    });

    // --- Mood Trends Modal Logic ---
    const trendsModal = document.getElementById('trends-modal');
    const closeTrendsModal = document.getElementById('close-trends-modal');
    const viewTrendsBtn = document.getElementById('view-trends-btn');

    if (viewTrendsBtn && trendsModal) {
        viewTrendsBtn.addEventListener('click', function() {
            renderMoodCalendar();
            trendsModal.style.display = 'flex';
        });
    }
    if (closeTrendsModal) {
        closeTrendsModal.addEventListener('click', function() {
            trendsModal.style.display = 'none';
        });
    }
    window.addEventListener('click', function(event) {
        if (event.target === trendsModal) {
            trendsModal.style.display = 'none';
        }
    });

    // --- Render Mood Calendar ---
    function renderMoodCalendar(selectedYear, selectedMonth) {
        const calendarDiv = document.getElementById('calendar-container');
        const summaryDiv = document.getElementById('mood-summary');
        const yearSelect = document.getElementById('calendar-year');
        const monthSelect = document.getElementById('calendar-month');
        const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');

        // Group moods by date (YYYY-MM-DD)
        const moodByDate = {};
        entries.forEach(entry => {
            let ymd = entry.isoDate;
            if (!ymd && entry.date) {
                const parsed = new Date(entry.date);
                if (!isNaN(parsed)) ymd = parsed.toISOString().slice(0, 10);
            }
            if (ymd) moodByDate[ymd] = entry.mood;
        });

        // Find min and max dates
        const allDates = Object.keys(moodByDate).sort();
        if (allDates.length === 0) {
            calendarDiv.innerHTML = '<p style="color:gray;">No mood entries yet.</p>';
            summaryDiv.innerHTML = '';
            if (yearSelect && monthSelect) {
                yearSelect.innerHTML = '';
                monthSelect.innerHTML = '';
            }
            return;
        }
        const minDate = new Date(allDates[0]);
        const maxDate = new Date(allDates[allDates.length - 1]);

        // --- Dropdowns for year and month ---
        const years = [];
        for (let y = minDate.getFullYear(); y <= maxDate.getFullYear(); y++) years.push(y);
        const months = [
            'January','February','March','April','May','June','July','August','September','October','November','December'
        ];

        // Populate year dropdown
        if (yearSelect) {
            yearSelect.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
        }
        // Populate month dropdown
        if (monthSelect) {
            monthSelect.innerHTML = months.map((m, i) => `<option value="${i}">${m}</option>`).join('');
        }

        // Set selected values (default to current if not set)
        let year = selectedYear !== undefined ? selectedYear : new Date().getFullYear();
        let month = selectedMonth !== undefined ? selectedMonth : new Date().getMonth();
        if (yearSelect && monthSelect) {
            yearSelect.value = year;
            monthSelect.value = month;
        }

        // Render calendar for selected month/year
        calendarDiv.innerHTML = renderMonthCalendar(year, month, moodByDate);

        // --- Mood Summary for selected month ---
        const today = new Date();
        const todayStr = today.toISOString().slice(0,10);
        const todayMood = moodByDate[todayStr] ? moodToEmoji(moodByDate[todayStr]) : 'No entry';

        // Weekly (for selected month)
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekMoods = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(weekStart);
            d.setDate(weekStart.getDate() + i);
            const ds = d.toISOString().slice(0,10);
            if (moodByDate[ds]) weekMoods.push(moodByDate[ds]);
        }
        const weekMood = mostCommonMood(weekMoods);

        // Monthly (selected month)
        const monthMoods = [];
        const daysInMonth = new Date(year, parseInt(month) + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(parseInt(month)+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            if (moodByDate[dateStr]) monthMoods.push(moodByDate[dateStr]);
        }
        const monthMood = mostCommonMood(monthMoods);

        summaryDiv.innerHTML = `
            <div><b>Today's Mood:</b> ${todayMood}</div>
            <div><b>Most Common This Week:</b> ${weekMood ? moodToEmoji(weekMood) : 'No data'}</div>
            <div><b>Most Common This Month:</b> ${monthMood ? moodToEmoji(monthMood) : 'No data'}</div>
        `;

        // --- Dropdown change handlers ---
        if (yearSelect && monthSelect) {
            yearSelect.onchange = () => renderMoodCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
            monthSelect.onchange = () => renderMoodCalendar(parseInt(yearSelect.value), parseInt(monthSelect.value));
        }
    }

    function renderMonthCalendar(year, month, moodByDate) {
        const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let html = `<div style="margin-bottom:2em;">
            <div style="font-weight:bold;margin-bottom:0.5em;">${monthNames[month]} ${year}</div>
            <table style="width:100%;text-align:center;"><tr>`;
        const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        weekDays.forEach(d => html += `<th>${d}</th>`);
        html += '</tr><tr>';

        for (let i = 0; i < firstDay; i++) html += '<td></td>';
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const mood = moodByDate[dateStr];
            html += `<td style="padding:8px;">${d}<br>${mood ? moodToEmoji(mood) : ''}</td>`;
            if ((firstDay + d) % 7 === 0) html += '</tr><tr>';
        }
        html += '</tr></table></div>';
        return html;
    }

    // Helper: Most common mood in array
    function mostCommonMood(arr) {
        if (!arr.length) return null;
        const freq = {};
        arr.forEach(m => freq[m] = (freq[m]||0)+1);
        return Object.keys(freq).reduce((a,b) => freq[a]>freq[b]?a:b);
    }

    // Helper: Mood to emoji (reuse from previous code)
    function moodToEmoji(mood) {
        switch (mood) {
            case 'happy': return '😊';
            case 'neutral': return '😐';
            case 'sad': return '😢';
            case 'angry': return '😠';
            case 'excited': return '🤩';
            default: return '';
        }
    }

    // Convert existing entries to new format (if any)
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    let migrated = false;
    entries.forEach(e => {
        if (!e.isoDate && e.date) {
            const d = new Date(e.date);
            if (!isNaN(d)) {
                e.isoDate = d.toISOString().slice(0, 10);
                migrated = true;
            }
        }
    });
    if (migrated) localStorage.setItem('journalEntries', JSON.stringify(entries));

    // Logout button (supabase example)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            if (window.supabase) {
                await supabase.auth.signOut();
            }
            window.location.href = "Login-Signup.html"; // Change to your actual login page
        });
    }
});

const supabaseUrl = 'https://xftjumejicbxbaoqfugj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdGp1bWVqaWNieGJhb3FmdWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMzk5ODEsImV4cCI6MjA2NTkxNTk4MX0.QGWradaCpxJaDn7srZVeu5LnHIjg6GSjipOZ9fx_V-Q'; // Use your actual anon/public key
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);