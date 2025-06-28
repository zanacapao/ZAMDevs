import { useEffect, useState, useContext } from "react";
import { supabase } from "../../lib/supabaseClient";
import { TransitionContext } from "../_app";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [data, setData] = useState<{ date: string; entries: number }[]>([]);
  const { showContent } = useContext(TransitionContext);

  useEffect(() => {
    async function fetchData() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from("moods")
        .select("created_at")
        .eq("user_id", session.user.id);

      const grouped = data?.reduce((acc, entry) => {
        const date = new Date(entry.created_at).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const chartData = Object.entries(grouped || {}).map(([date, count]) => ({ date, entries: count }));
      setData(chartData);
    }
    fetchData();
  }, []);

  return (
    <div className={`max-w-5xl mx-auto p-6 min-h-screen transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <h2 className="text-3xl font-bold text-[#A09ABC] mb-6">📊 Mood Analytics</h2>

      <div className="bg-white/70 rounded-xl p-6 shadow border border-white/30">
        <h3 className="text-xl font-semibold text-[#6C63A6] mb-4">Mood Logs Over Time</h3>
        {data.length === 0 ? (
          <p className="text-[#6C63A6] text-center">No mood data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E1D8E9" />
              <XAxis dataKey="date" stroke="#A09ABC" />
              <YAxis stroke="#A09ABC" />
              <Tooltip />
              <Line type="monotone" dataKey="entries" stroke="#A09ABC" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
