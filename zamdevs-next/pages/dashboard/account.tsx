import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../../lib/supabaseClient";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaTrophy, FaCalendarCheck, FaFire } from "react-icons/fa";

export default function Account() {
  const [header, setHeader] = useState("/default-header.jpg");
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [name, setName] = useState("Your Name");
  const [bio, setBio] = useState("Short bio goes here...");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  type JournalEntry = {
    id: string;
    created_at: string;
    title: string;
    content: string;
    // Add other fields as needed based on your database schema
  };
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const headerInput = useRef<HTMLInputElement>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user info and profile images
  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }
      
      setEmail(user.email || "");
      setUserId(user.id);
      
      // Fetch profile from your 'profiles' table
      const { data: profile } = await supabase
        .from("profiles")
        .select("avatar_url, header_url, full_name, bio, phone, first_name")
        .eq("id", user.id)
        .single();
      if (profile) {
        setAvatar(profile.avatar_url || "/default-avatar.png");
        setHeader(profile.header_url || "/default-header.jpg");
        let displayName = '';
        if (profile.first_name && profile.first_name.trim() !== '') {
          displayName = profile.first_name;
        } else if (profile.full_name && profile.full_name.trim() !== '') {
          displayName = profile.full_name.split(' ')[0];
        } else {
          displayName = "Your Name";
        }
        setName(displayName);
        setBio(profile.bio || "Short bio goes here...");
        setPhone(profile.phone || "");
      }
      
      // Fetch journal entries
      const { data: journals } = await supabase
        .from("journal")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setJournalEntries(journals || []);
      setLoading(false);
    }
    fetchProfile();
  }, [router]);

  // Upload image to Supabase Storage and update profile
  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "header") {
    if (e.target.files && e.target.files[0] && userId) {
      const file = e.target.files[0];
      const filePath = `${userId}/${type}-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("profile-images")
        .upload(filePath, file, { upsert: true });
      if (!uploadError) {
        const { data } = supabase.storage.from("profile-images").getPublicUrl(filePath);
        if (type === "avatar") {
          setAvatar(data.publicUrl);
          await supabase.from("profiles").update({ avatar_url: data.publicUrl }).eq("id", userId);
        } else {
          setHeader(data.publicUrl);
          await supabase.from("profiles").update({ header_url: data.publicUrl }).eq("id", userId);
        }
      }
    }
  }

  async function handlePhoneSave() {
    if (userId) {
      await supabase.from("profiles").update({ phone }).eq("id", userId);
    }
  }

  // Example achievements (replace with real logic)
  const achievements = [
    { icon: <FaTrophy />, label: "First Entry", desc: "Congrats on your first journal!" },
    { icon: <FaFire />, label: "7 Day Streak", desc: "7 days of consistent journaling!" },
    { icon: <FaCalendarCheck />, label: "30 Entries", desc: "30 reflections completed." },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-[#E1D8E9] via-[#D5CFE1] to-[#B6A6CA] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#A09ABC]"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Account | Reflectly</title>
        <meta name="description" content="Manage your account settings" />
      </Head>
      <div className="flex min-h-screen bg-gradient-to-br from-[#E1D8E9] via-[#D5CFE1] to-[#B6A6CA]">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className={`flex-1 p-10 bg-transparent min-h-screen transition-all duration-300 ${collapsed ? 'ml-0' : 'ml-64'}`}>
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-8">
            {/* Profile Info Card */}
            <div className="bg-white/30 rounded-2xl shadow-xl backdrop-blur-md p-6 flex flex-col md:flex-row items-center gap-6 border border-white/40">
              <Image src={avatar} alt="Avatar" width={96} height={96} className="rounded-full border-4 border-[#E1D8E9] bg-white" />
              <div className="flex-1 flex flex-col items-center md:items-start">
                <div className="text-2xl font-bold text-[#A09ABC] font-serif mb-1">{name}</div>
                <div className="text-[#6C63A6] mb-1">{email}</div>
                <div className="text-[#B6A6CA] mb-1">{phone}</div>
                <div className="flex gap-2 mt-2">
                  <span className="bg-[#B6A6CA] text-white rounded-full px-3 py-1 text-xs font-semibold shadow">🔥 {journalEntries.length} entries</span>
                  <span className="bg-[#D5CFE1] text-[#A09ABC] rounded-full px-3 py-1 text-xs font-semibold shadow">Streak: 5 days</span>
                </div>
              </div>
            </div>
            {/* Achievements Grid */}
            <div>
              <div className="text-lg font-bold text-[#A09ABC] mb-2" style={{ fontFamily: 'serif', letterSpacing: 1 }}>Achievements</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((ach, i) => (
                  <div key={i} className="bg-white/40 rounded-xl p-4 flex flex-col items-center shadow backdrop-blur-md border border-white/30">
                    <div className="text-3xl mb-2 text-[#B6A6CA]">{ach.icon}</div>
                    <div className="font-semibold text-[#A09ABC] mb-1">{ach.label}</div>
                    <div className="text-xs text-[#6C63A6] text-center">{ach.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Journal Timeline */}
            <div>
              <div className="text-lg font-bold text-[#A09ABC] mb-2" style={{ fontFamily: 'serif', letterSpacing: 1 }}>Journal Timeline</div>
              <div className="flex flex-col gap-6">
                {journalEntries.length === 0 ? (
                  <div className="bg-white/40 rounded-xl p-6 text-center text-[#B6A6CA] shadow backdrop-blur-md border border-white/30">No entries yet. Start journaling to see your timeline!</div>
                ) : (
                  journalEntries.map((entry, idx) => (
                    <div key={entry.id} className="bg-white/40 rounded-xl p-6 shadow backdrop-blur-md border border-white/30 flex flex-col gap-2 relative">
                      <div className="absolute left-[-32px] top-8 w-2 h-2 bg-[#A09ABC] rounded-full shadow" style={{ display: idx === 0 ? 'none' : 'block' }}></div>
                      <div className="text-xs text-[#B6A6CA] mb-1">{new Date(entry.created_at).toLocaleString()}</div>
                      <div className="font-semibold text-[#A09ABC] text-lg">{entry.title || 'Untitled Entry'}</div>
                      <div className="text-[#6C63A6] whitespace-pre-wrap">{entry.content}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
  