import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Journal() {
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEntries() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
      setEntries(data || []);
      setLoading(false);
    }
    fetchEntries();
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>My Journal Entries</h2>
      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map(entry => (
          <div key={entry.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ color: "#888", fontSize: "0.9em" }}>{entry.created_at}</div>
            <div>{entry.content}</div>
          </div>
        ))
      )}
    </div>
  );
}