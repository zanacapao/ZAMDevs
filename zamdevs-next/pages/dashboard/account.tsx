import { useRef, useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { TransitionContext } from "../_app";
import { FaTrophy, FaFire, FaCalendarCheck } from "react-icons/fa";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function Account() {
  const router = useRouter();
  const headerInput = useRef<HTMLInputElement>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  
  const [header, setHeader] = useState("/default-header.jpg");
  const [avatar, setAvatar] = useState("/default-avatar.png");
  const [name, setName] = useState("Your Name");
  const [bio, setBio] = useState("Short bio goes here...");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [showText, setShowText] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const { showContent } = useContext(TransitionContext);

  useEffect(() => {
    setTimeout(() => setShowText(true), 100);
  }, []);

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
        .select("avatar_url, header_url, full_name, bio, phone")
        .eq("id", user.id)
        .single();
      if (profile) {
        setAvatar(profile.avatar_url || "/default-avatar.png");
        setHeader(profile.header_url || "/default-header.jpg");
        let displayName = '';
        if (profile.full_name && profile.full_name.trim() !== '') {
          displayName = profile.full_name.split(' ')[0];
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
      setProfileLoading(true);
      await supabase.from("profiles").update({
        full_name: name,
        bio,
        phone,
      }).eq("id", userId);
      setProfileLoading(false);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
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
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      {/* Animated Clouds */}
      <div className="absolute left-0 top-24 w-1/2 z-10 animate-cloud-left pointer-events-none">
        <svg width="320" height="80" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="60" rx="60" ry="20" fill="#D5CFE1" />
          <ellipse cx="140" cy="50" rx="50" ry="18" fill="#E1D8E9" />
          <ellipse cx="220" cy="65" rx="70" ry="22" fill="#B6A6CA" />
        </svg>
      </div>
      <div className="absolute right-0 top-40 w-1/3 z-10 animate-cloud-right pointer-events-none">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="50" cy="40" rx="50" ry="15" fill="#E1D8E9" />
          <ellipse cx="120" cy="30" rx="40" ry="12" fill="#D5CFE1" />
        </svg>
      </div>
      {/* Twinkling Stars */}
      <div className="absolute left-1/3 top-1/4 text-[#fff] text-2xl opacity-80 z-0 animate-twinkle">✦</div>
      <div className="absolute right-1/4 bottom-1/3 text-[#fff] text-xl opacity-60 z-0 animate-twinkle">✧</div>
      <div className="absolute left-1/4 bottom-1/4 text-[#fff] text-lg opacity-40 z-0 animate-twinkle" style={{ animationDelay: "1s" }}>✦</div>
      <div className="absolute left-1/2 top-1/6 text-[#fff] text-lg opacity-60 z-0 animate-twinkle" style={{ animationDelay: "2s" }}>✦</div>
      {/* Main Content */}
      <main className="flex-1 ml-64 flex items-center justify-center p-6 min-h-screen">
        <div className={`relative z-20 w-full max-w-2xl mx-auto px-6 py-10 bg-white/30 rounded-3xl shadow-2xl backdrop-blur-md transition-all duration-700 ${showText && showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Header Image & Avatar */}
          <div className="relative h-48 md:h-56 bg-gradient-to-r from-[#A09ABC]/40 to-[#B6A6CA]/40 rounded-2xl overflow-hidden mb-20 flex items-center justify-center">
            <Image
              src={header}
              alt="Header"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-2xl"
              onError={(e) => (e.currentTarget.src = "/default-header.jpg")}
            />
            <button
              onClick={() => headerInput.current?.click()}
              className="absolute bottom-4 right-4 bg-[#A09ABC] text-white px-4 py-2 rounded-full shadow hover:bg-[#B6A6CA] transition"
            >
              Change Header
            </button>
            <input
              type="file"
              ref={headerInput}
              style={{ display: "none" }}
              accept="image/*"
              onChange={e => handleImageChange(e, "header")}
            />
            <div className="absolute left-1/2 bottom-[-48px] transform -translate-x-1/2">
              <div className="relative">
                <Image
                  src={avatar}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-[#E1D8E9] bg-white"
                  onError={e => (e.currentTarget.src = "/default-avatar.png")}
                />
                <button
                  onClick={() => avatarInput.current?.click()}
                  className="absolute bottom-0 right-0 bg-[#A09ABC] text-white px-2 py-1 rounded-full shadow hover:bg-[#B6A6CA] transition"
                >
                  Change
                </button>
                <input
                  type="file"
                  ref={avatarInput}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={e => handleImageChange(e, "avatar")}
                />
              </div>
            </div>
          </div>
          {/* Profile Info */}
          <div className="mt-16 flex flex-col items-center">
            <div className="text-2xl font-bold text-[#A09ABC] font-serif mb-1">{name}</div>
            <div className="text-[#6C63A6] mb-1">{email}</div>
            <div className="text-[#B6A6CA] mb-1">{phone}</div>
            <div className="flex gap-2 mt-2">
              <span className="bg-[#B6A6CA] text-white rounded-full px-3 py-1 text-xs font-semibold shadow">🔥 {journalEntries.length} entries</span>
              <span className="bg-[#D5CFE1] text-[#A09ABC] rounded-full px-3 py-1 text-xs font-semibold shadow">Streak: 5 days</span>
            </div>
          </div>
          {/* Achievements Grid */}
          <div className="mt-8">
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
          <div className="mt-8">
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
    </>
  );
}
  