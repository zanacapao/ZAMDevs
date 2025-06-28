import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

type JournalEntry = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
};

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEntries() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }
      const { data } = await supabase
        .from("journal")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
      setEntries(data || []);
      setLoading(false);
    }
    fetchEntries();
  }, [router]);

  const addEntry = async () => {
    if (newEntry.trim() === "") return;
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login");
      return;
    }
    const { data, error } = await supabase
      .from("journal")
      .insert([{ content: newEntry, user_id: session.user.id }])
      .select();
    if (!error && data) {
      setEntries([data[0], ...entries]);
      setNewEntry("");
    }
  };

  const deleteEntry = async (id: string) => {
    await supabase.from("journal").delete().eq("id", id);
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  if (loading) return <div className="text-center text-[#6C63A6] mt-20">Loading your journal...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-[#A09ABC] mb-6">📔 My Journal</h2>

      {/* Entry Form */}
      <div className="mb-8 bg-white/60 p-4 rounded-xl shadow backdrop-blur-md border border-white/30">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full p-3 rounded-lg bg-white/70 text-[#6C63A6] focus:outline-none focus:ring-2 focus:ring-[#A09ABC] mb-3"
          rows={4}
        />
        <button
          onClick={addEntry}
          className="px-6 py-2 rounded-full bg-gradient-to-r from-[#A09ABC] to-[#B6A6CA] text-white font-bold shadow hover:from-[#B6A6CA] hover:to-[#A09ABC] transition-all duration-300"
        >
          ➕ Add Entry
        </button>
      </div>

      {/* Journal Entries */}
      {entries.length === 0 ? (
        <div className="text-[#6C63A6] text-center">No entries yet. Start writing above! ✍️</div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white/70 rounded-xl p-4 shadow border border-white/30">
              <div className="flex justify-between items-center text-sm text-[#A09ABC] mb-2">
                <span>{new Date(entry.created_at).toLocaleString()}</span>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-500 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
              <div className="text-[#6C63A6] whitespace-pre-wrap">{entry.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
