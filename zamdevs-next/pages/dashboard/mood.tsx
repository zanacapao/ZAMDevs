import { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { TransitionContext } from "../_app";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const moods = ["😀", "🙂", "😐", "😕", "😢"];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState("");
  type MoodChartData = { date: string; moods: number };
  const [moodData, setMoodData] = useState<MoodChartData[]>([]);
  const { showContent } = useContext(TransitionContext);

  useEffect(() => {
    fetchMoodData();
  }, []);

  async function fetchMoodData() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data } = await supabase
      .from("moods")
      .select("emoji, created_at")
      .eq("user_id", session.user.id);

    const grouped = data?.reduce((acc, mood) => {
      const date = new Date(mood.created_at).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(grouped || {}).map(([date, count]) => ({ date, moods: count }));
    setMoodData(chartData);
  }

  async function submitMood() {
    if (!selectedMood) return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    await supabase.from("moods").insert([{ user_id: session.user.id, emoji: selectedMood }]);
    setSelectedMood("");
    fetchMoodData();
  }

  return (
    <div className={`max-w-4xl mx-auto p-6 min-h-screen transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h2 className="text-3xl font-bold text-[#A09ABC] mb-6">😊 Mood Tracker</h2>

      <div className="mb-8 bg-white/60 p-4 rounded-xl shadow backdrop-blur-md border border-white/30 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-3 text-2xl">
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${selectedMood === mood ? 'bg-[#A09ABC] text-white' : 'bg-white text-[#6C63A6]'}`}
            >
              {mood}
            </button>
          ))}
        </div>
        <button
          onClick={submitMood}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white font-bold shadow hover:from-[#B6A6CA] hover:to-[#A09ABC] transition-all duration-300"
        >
          Save Mood
        </button>
      </div>

      <div className="bg-white/70 rounded-xl p-6 shadow border border-white/30">
        <h3 className="text-xl font-semibold text-[#6C63A6] mb-4">Mood Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={moodData}>
            <XAxis dataKey="date" stroke="#A09ABC" />
            <YAxis stroke="#A09ABC" />
            <Tooltip />
            <Bar dataKey="moods" fill="#A09ABC" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
