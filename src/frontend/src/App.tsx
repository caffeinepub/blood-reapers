import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { StaffMember, WarTeamPlayer } from "./backend.d";
import { useStaffMembers } from "./hooks/useQueries";

const queryClient = new QueryClient();

// ——————————————————————————
// Particle component
// ——————————————————————————
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i * 5.5 + 4) % 96}%`,
    bottom: `${(i * 7 + 5) % 40}%`,
    duration: `${2.5 + (i % 4) * 0.8}s`,
    delay: `${(i * 0.4) % 3.5}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 8)}px`,
    size: i % 3 === 0 ? 5 : 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={
            {
              left: p.left,
              bottom: p.bottom,
              "--duration": p.duration,
              "--delay": p.delay,
              "--drift": p.drift,
              width: p.size,
              height: p.size,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

// ——————————————————————————
// Navbar
// ——————————————————————————
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "RULES", href: "#about" },
    { label: "FEATURES", href: "#about" },
    { label: "WAR LOGS", href: "#war-logs" },
    { label: "STAFF", href: "#staff" },
    { label: "TEAMS", href: "#teams" },
  ];

  return (
    <header
      data-ocid="nav.section"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(5, 3, 3, 0.97)" : "rgba(5, 3, 3, 0.85)",
        borderBottom: "1px solid rgba(255,42,42,0.35)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <a
          data-ocid="nav.link"
          href="#home"
          className="flex items-center gap-2 group"
        >
          <img
            src="/assets/generated/blood-reapers-skull.dim_300x300.png"
            alt="Blood Reapers Skull"
            className="w-9 h-9 object-contain rounded-full"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,42,42,0.7))" }}
          />
          <span
            className="font-display font-bold text-xl tracking-widest uppercase"
            style={{
              color: "#FF2A2A",
              textShadow: "0 0 8px rgba(255,42,42,0.5)",
            }}
          >
            Blood Reapers
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              data-ocid="nav.link"
              href={link.href}
              className="font-heading font-semibold text-sm tracking-wider text-gray-300 hover:text-red-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            data-ocid="nav.primary_button"
            href="https://discord.gg/bloodreaper"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 red-gradient-btn animate-btn-pulse text-white font-heading font-semibold text-sm px-5 py-2 rounded-full tracking-wider"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.04.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            JOIN DISCORD
          </a>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-gray-300 hover:text-red-400 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          className="md:hidden border-t"
          style={{
            borderColor: "rgba(255,42,42,0.25)",
            background: "rgba(5,3,3,0.97)",
          }}
        >
          <div className="px-4 py-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading font-semibold text-sm tracking-wider text-gray-300 hover:text-red-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://discord.gg/bloodreaper"
              target="_blank"
              rel="noopener noreferrer"
              className="red-gradient-btn text-white font-heading font-semibold text-sm px-5 py-2 rounded-full tracking-wider text-center mt-2"
            >
              JOIN DISCORD
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

// ——————————————————————————
// Hero
// ——————————————————————————
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden"
      style={{ background: "#050305" }}
    >
      {/* Animated BG gradient */}
      <div
        className="animate-bg-drift absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 55%, rgba(255,42,42,0.12) 0%, rgba(139,0,0,0.07) 30%, transparent 70%)",
          width: "160%",
          height: "160%",
          left: "-30%",
          top: "-30%",
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in-up">
        <img
          src="/assets/generated/blood-reapers-skull.dim_300x300.png"
          alt="Blood Reapers"
          className="w-32 h-32 mx-auto mb-4 object-contain"
          style={{
            filter:
              "drop-shadow(0 0 20px rgba(255,42,42,0.7)) drop-shadow(0 0 40px rgba(255,42,42,0.3))",
          }}
        />

        <h1
          className="font-display font-bold text-6xl sm:text-7xl md:text-8xl uppercase tracking-widest animate-glow-pulse mb-4"
          style={{ color: "#FF2A2A" }}
        >
          💀 BLOOD REAPERS 💀
        </h1>

        <p
          className="font-heading text-xl sm:text-2xl tracking-widest uppercase mb-2"
          style={{ color: "#B7B7B7" }}
        >
          #1 Global Discord Community
        </p>
        <p className="text-gray-500 text-sm tracking-wider mb-10">
          Elite Gaming Clan · Est. 2024 · Global Members
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            data-ocid="hero.primary_button"
            href="https://discord.gg/bloodreaper"
            target="_blank"
            rel="noopener noreferrer"
            className="red-gradient-btn animate-btn-pulse text-white font-heading font-bold text-lg px-10 py-4 rounded-full tracking-wider flex items-center justify-center gap-2"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.04.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
            </svg>
            JOIN DISCORD
          </a>
          <a
            data-ocid="hero.secondary_button"
            href="#war-logs"
            className="outline-btn font-heading font-bold text-lg px-10 py-4 rounded-full tracking-wider"
          >
            ⚔️ VIEW WAR LOGS
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs tracking-widest">
        <span>SCROLL</span>
        <svg
          aria-hidden="true"
          className="w-4 h-4 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}

// ——————————————————————————
// About / Rules / Features
// ——————————————————————————
function AboutSection() {
  const features = [
    { icon: "⚔️", label: "Active Wars" },
    { icon: "🎮", label: "Daily Events" },
    { icon: "🌍", label: "Global Players" },
    { icon: "💬", label: "24/7 Chat" },
    { icon: "🏆", label: "Tournaments" },
    { icon: "🤝", label: "Partnerships" },
    { icon: "📊", label: "Leaderboards" },
    { icon: "🎁", label: "Giveaways" },
  ];

  const rules = [
    "Respect all members at all times",
    "No spamming or flooding channels",
    "Zero tolerance for toxicity & harassment",
    "Follow Discord Terms of Service",
    "No self-promotion without permission",
    "Keep content age-appropriate",
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 max-w-7xl mx-auto"
      style={{ background: "transparent" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Card */}
        <div data-ocid="about.card" className="clan-card rounded-xl p-8">
          <h2 className="section-title text-2xl mb-6">⚔️ About Us</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Blood Reapers is the premier global gaming community — built for
            elite players who live for the grind, the glory, and the brotherhood
            of battle.
          </p>
          <p className="text-gray-400 leading-relaxed mb-4">
            Founded by veteran gamers, we've grown into a powerhouse clan with
            members across every timezone. Whether you're a competitive warlord
            or a casual gamer, Blood Reapers is your home.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="text-center">
              <p
                className="font-display font-bold text-3xl"
                style={{ color: "#FF2A2A" }}
              >
                2.4K+
              </p>
              <p className="text-gray-500 text-xs tracking-wider uppercase">
                Members
              </p>
            </div>
            <div className="text-center">
              <p
                className="font-display font-bold text-3xl"
                style={{ color: "#FF2A2A" }}
              >
                48
              </p>
              <p className="text-gray-500 text-xs tracking-wider uppercase">
                Wars Won
              </p>
            </div>
            <div className="text-center">
              <p
                className="font-display font-bold text-3xl"
                style={{ color: "#FF2A2A" }}
              >
                12
              </p>
              <p className="text-gray-500 text-xs tracking-wider uppercase">
                Countries
              </p>
            </div>
          </div>
        </div>

        {/* Rules Card */}
        <div data-ocid="rules.card" className="clan-card rounded-xl p-8">
          <h2 className="section-title text-2xl mb-6">📜 Rules</h2>
          <ul className="space-y-3">
            {rules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
              >
                <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-red-500" />
                {rule}
              </li>
            ))}
          </ul>
          <div
            className="mt-6 p-3 rounded-lg text-xs text-gray-500 tracking-wide"
            style={{
              background: "rgba(255,42,42,0.05)",
              border: "1px solid rgba(255,42,42,0.15)",
            }}
          >
            ⚠️ Violations result in immediate mute or permanent ban at staff
            discretion.
          </div>
        </div>

        {/* Features Card */}
        <div data-ocid="features.card" className="clan-card rounded-xl p-8">
          <h2 className="section-title text-2xl mb-6">🔥 Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 p-3 rounded-lg text-sm font-medium text-gray-300 transition-colors hover:text-red-400"
                style={{
                  background: "rgba(255,42,42,0.05)",
                  border: "1px solid rgba(255,42,42,0.2)",
                }}
              >
                <span className="text-lg">{f.icon}</span>
                <span className="font-heading text-xs tracking-wider uppercase">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————
// War Logs (static)
// ——————————————————————————
interface StaticWarLog {
  logNumber: number;
  opponent: string;
  ourFighters: string;
  theirFighters: string;
  score: string;
  region: string;
  status: string;
  mvp: string;
  notes: string;
}

const STATIC_WAR_LOGS: StaticWarLog[] = [
  {
    logNumber: 112,
    opponent: "EMBERX X DIVINITY X PROM X ONLY HACKS",
    ourFighters: "Raze x Dark",
    theirFighters: "YONKO AND STRAYFO",
    score: "5-0",
    region: "AS",
    status: "WIN",
    mvp: "Us",
    notes:
      "Ezz, ember kid was yapping too much they saw what dark is I 1v2ed in 2 round and they left at 4-0 xdd",
  },
  {
    logNumber: 111,
    opponent: "Dragon Slayers",
    ourFighters: "@raze0999 x Dark",
    theirFighters: "Miguel And his tm8",
    score: "20-0",
    region: "EU",
    status: "WIN",
    mvp: "Us",
    notes: "Ezz, brutal end of Miguel after beefing me",
  },
  {
    logNumber: 110,
    opponent: "Zen Espada",
    ourFighters: "DARK",
    theirFighters: "Unknown-user",
    score: "5-1",
    region: "AS",
    status: "WIN",
    mvp: "Us",
    notes:
      "GGs, light work, after I won ft5 we did 4 friendly and I won them too",
  },
];

const BR_DIVIDER = "✧·············[𝔹ℝ]──────\\\\   //──────[𝔹ℝ]·············✧";

function WarLogDivider() {
  return (
    <div
      className="text-center text-xs tracking-widest overflow-hidden whitespace-nowrap"
      style={{ color: "rgba(255,42,42,0.5)", fontFamily: "monospace" }}
    >
      {BR_DIVIDER}
    </div>
  );
}

function WarLogCard({ log, index }: { log: StaticWarLog; index: number }) {
  return (
    <div
      data-ocid={`warlogs.card.${index + 1}` as string}
      className="clan-card rounded-xl overflow-hidden"
      style={{ maxWidth: 720, width: "100%" }}
    >
      {/* Header */}
      <div
        className="px-6 pt-6 pb-3"
        style={{
          background: "rgba(255,42,42,0.06)",
          borderBottom: "1px solid rgba(255,42,42,0.2)",
        }}
      >
        <p
          className="font-display font-bold text-lg tracking-widest uppercase"
          style={{ color: "#FF2A2A" }}
        >
          ⚔️ Blood Reapers War Log No. {log.logNumber}
        </p>
        <p className="text-gray-400 text-sm font-heading tracking-wider mt-0.5">
          VS {log.opponent}
        </p>
      </div>

      <div className="px-6 py-4 space-y-4">
        <WarLogDivider />

        {/* Fighters */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p
              className="font-heading text-xs tracking-widest uppercase mb-1"
              style={{ color: "#FF2A2A" }}
            >
              OUR FIGHTERS
            </p>
            <p className="text-white font-bold text-sm">{log.ourFighters}</p>
          </div>
          <div>
            <p className="font-heading text-xs tracking-widest uppercase mb-1 text-gray-500">
              THEIR FIGHTERS
            </p>
            <p className="text-gray-300 font-semibold text-sm">
              {log.theirFighters}
            </p>
          </div>
        </div>

        <WarLogDivider />

        {/* Stats */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="text-center">
            <p className="text-gray-500 text-xs font-heading tracking-wider uppercase mb-0.5">
              Score
            </p>
            <p className="font-display font-bold text-white text-lg">
              {log.score}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs font-heading tracking-wider uppercase mb-0.5">
              Region
            </p>
            <p className="font-display font-bold text-white text-sm">
              {log.region}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs font-heading tracking-wider uppercase mb-0.5">
              Status
            </p>
            <Badge
              className="text-xs font-bold tracking-wider font-heading"
              style={{
                background: "rgba(55,208,106,0.12)",
                color: "#37D06A",
                border: "1px solid rgba(55,208,106,0.3)",
              }}
            >
              {log.status}
            </Badge>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs font-heading tracking-wider uppercase mb-0.5">
              MVP
            </p>
            <p
              className="font-display font-bold text-sm"
              style={{ color: "#FF2A2A" }}
            >
              {log.mvp}
            </p>
          </div>
        </div>

        {/* Notes */}
        <div
          className="p-3 rounded-lg"
          style={{
            background: "rgba(255,42,42,0.04)",
            border: "1px solid rgba(255,42,42,0.12)",
          }}
        >
          <p className="text-gray-500 text-xs font-heading tracking-widest uppercase mb-1">
            Notes
          </p>
          <p className="text-gray-400 text-sm italic">{log.notes}</p>
        </div>
      </div>
    </div>
  );
}

function WarLogsSection() {
  return (
    <section
      id="war-logs"
      className="py-24 px-4"
      style={{ background: "rgba(8,4,4,0.5)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="section-title text-3xl">⚔️ WAR LOGS</h2>
          <p className="text-gray-500 mt-3 text-sm tracking-wide">
            Official Blood Reapers battle record
          </p>
        </div>

        <div
          data-ocid="warlogs.list"
          className="flex flex-col items-center gap-6"
        >
          {STATIC_WAR_LOGS.map((log, i) => (
            <WarLogCard key={log.logNumber} log={log} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————
// Staff Roster
// ——————————————————————————
const FALLBACK_STAFF: StaffMember[] = [
  { name: "DarkReaper_X", role: "Commander", status: "Active" },
  { name: "BloodSaint", role: "Co-Commander", status: "Active" },
  { name: "VoidStriker", role: "War General", status: "Active" },
  { name: "NightHunter", role: "Recruitment Lead", status: "Active" },
  { name: "CrimsonBlade", role: "Event Manager", status: "Active" },
  { name: "ShadowReign", role: "Moderator", status: "Active" },
  { name: "IronVeil", role: "Moderator", status: "Active" },
  { name: "RedPhoenix", role: "Moderator", status: "Active" },
];

function getInitials(name: string): string {
  return name
    .split(/[_\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function StaffSection() {
  const { data, isLoading } = useStaffMembers();
  const staff: StaffMember[] = data && data.length > 0 ? data : FALLBACK_STAFF;

  return (
    <section id="staff" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-10">
        <h2 className="section-title text-3xl">👑 STAFF ROSTER</h2>
        <p className="text-gray-500 mt-3 text-sm tracking-wide">
          The leadership keeping Blood Reapers elite
        </p>
      </div>

      {isLoading ? (
        <div
          data-ocid="staff.loading_state"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="h-36"
              style={{ background: "rgba(255,42,42,0.06)" }}
            />
          ))}
        </div>
      ) : (
        <div
          data-ocid="staff.list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {staff.map((member, i) => (
            <div
              key={member.name}
              data-ocid={`staff.card.${i + 1}` as string}
              className="clan-card rounded-xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="avatar-circle w-16 h-16 text-xl font-display">
                {getInitials(member.name)}
              </div>
              <div>
                <p className="font-display font-bold text-white text-base tracking-wide">
                  {member.name}
                </p>
                <p className="text-gray-400 text-xs font-heading tracking-wider uppercase mt-0.5">
                  {member.role}
                </p>
              </div>
              <Badge
                className="text-xs font-bold tracking-wider"
                style={{
                  background: "rgba(55,208,106,0.12)",
                  color: "#37D06A",
                  border: "1px solid rgba(55,208,106,0.3)",
                }}
              >
                ● {member.status}
              </Badge>
            </div>
          ))}
        </div>
      )}

      {!isLoading && staff.length === 0 && (
        <div
          data-ocid="staff.empty_state"
          className="text-center py-16 text-gray-600"
        >
          <p className="font-heading text-lg tracking-wider">NO STAFF LISTED</p>
        </div>
      )}
    </section>
  );
}

// ——————————————————————————
// War Teams
// ——————————————————————————
const SHARED_TEAM: WarTeamPlayer[] = [
  { name: "EMBERX", role: "Fighter", rank: "AS/EU" },
  { name: "DIVINITY", role: "Fighter", rank: "AS/EU" },
  { name: "PROM", role: "Fighter", rank: "AS/EU" },
  { name: "ONLY HACKS", role: "Fighter", rank: "AS/EU" },
];

function PlayerCard({
  player,
  index,
}: { player: WarTeamPlayer; index: number }) {
  return (
    <div
      data-ocid={`teams.card.${index + 1}` as string}
      className="team-card rounded-xl p-4 flex items-center gap-4"
    >
      <div
        className="avatar-circle flex-shrink-0"
        style={{ width: 48, height: 48, fontSize: 14 }}
      >
        {getInitials(player.name)}
      </div>
      <div className="min-w-0">
        <p className="font-display font-bold text-white text-sm tracking-wide truncate">
          {player.name}
        </p>
        <p
          className="text-xs font-heading tracking-wider uppercase mt-0.5"
          style={{ color: "#FF2A2A" }}
        >
          {player.role}
        </p>
        <p className="text-gray-500 text-xs mt-0.5">{player.rank}</p>
      </div>
    </div>
  );
}

function TeamsSection() {
  return (
    <section
      id="teams"
      className="py-24 px-4"
      style={{ background: "rgba(8,4,4,0.5)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="section-title text-3xl">🌐 WAR TEAMS</h2>
          <p className="text-gray-500 mt-3 text-sm tracking-wide">
            Our elite competitive rosters
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AS War Team */}
          <div>
            <div
              className="flex items-center gap-3 mb-5 pb-3"
              style={{ borderBottom: "1px solid rgba(255,42,42,0.2)" }}
            >
              <span className="text-2xl">⚔️</span>
              <h3 className="font-heading font-bold text-xl tracking-widest uppercase text-white">
                AS WAR TEAM
              </h3>
              <span
                className="ml-auto px-2 py-0.5 text-xs font-bold font-heading tracking-wider rounded"
                style={{
                  background: "rgba(255,42,42,0.1)",
                  color: "#FF2A2A",
                  border: "1px solid rgba(255,42,42,0.3)",
                }}
              >
                ASIA
              </span>
            </div>
            <div className="space-y-3">
              {SHARED_TEAM.map((player, i) => (
                <PlayerCard
                  key={`as-${player.name}`}
                  player={player}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* EU War Team */}
          <div>
            <div
              className="flex items-center gap-3 mb-5 pb-3"
              style={{ borderBottom: "1px solid rgba(255,42,42,0.2)" }}
            >
              <span className="text-2xl">🛡️</span>
              <h3 className="font-heading font-bold text-xl tracking-widest uppercase text-white">
                EU WAR TEAM
              </h3>
              <span
                className="ml-auto px-2 py-0.5 text-xs font-bold font-heading tracking-wider rounded"
                style={{
                  background: "rgba(42,100,255,0.1)",
                  color: "#6A9FFF",
                  border: "1px solid rgba(100,140,255,0.3)",
                }}
              >
                EUROPE
              </span>
            </div>
            <div className="space-y-3">
              {SHARED_TEAM.map((player, i) => (
                <PlayerCard
                  key={`eu-${player.name}`}
                  player={player}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————
// Footer
// ——————————————————————————
function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "War Logs", href: "#war-logs" },
    { label: "Staff", href: "#staff" },
    { label: "Teams", href: "#teams" },
  ];

  return (
    <footer
      className="py-12 px-6"
      style={{
        background: "rgba(4,2,2,0.97)",
        borderTop: "1px solid rgba(255,42,42,0.2)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-8">
          {/* Brand */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <img
                src="/assets/generated/blood-reapers-skull.dim_300x300.png"
                alt=""
                className="w-9 h-9 object-contain"
                style={{ filter: "drop-shadow(0 0 4px rgba(255,42,42,0.6))" }}
              />
              <span
                className="font-display font-bold text-lg tracking-widest"
                style={{ color: "#FF2A2A" }}
              >
                BLOOD REAPERS
              </span>
            </div>
            <p className="text-gray-600 text-xs leading-relaxed max-w-xs">
              #1 Global Discord Community. Elite gaming clan built for
              champions.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-2">
            <p className="font-heading font-bold text-xs tracking-widest uppercase text-gray-500 mb-2">
              NAVIGATION
            </p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-400 hover:text-red-400 text-sm transition-colors font-heading tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div>
            <p className="font-heading font-bold text-xs tracking-widest uppercase text-gray-500 mb-4">
              CONNECT
            </p>
            <div className="flex gap-4">
              {/* Discord */}
              <a
                href="https://discord.gg/bloodreaper"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(88,101,242,0.15)",
                  border: "1px solid rgba(88,101,242,0.3)",
                }}
              >
                <span className="sr-only">Discord</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  style={{ color: "#7289DA" }}
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.014.04.031.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a
                href="https://twitter.com/bloodreapers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span className="sr-only">Twitter / X</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-current text-gray-300"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com/bloodreapers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: "rgba(255,0,0,0.1)",
                  border: "1px solid rgba(255,0,0,0.2)",
                }}
              >
                <span className="sr-only">YouTube</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  style={{ color: "#FF0000" }}
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,42,42,0.1)" }}
        >
          <p className="text-gray-600 text-xs tracking-wide">
            © {year} Blood Reapers. All rights reserved.
          </p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-400 text-xs tracking-wide transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ——————————————————————————
// App Root
// ——————————————————————————
function AppContent() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#050305", color: "#F2F2F2" }}
    >
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <WarLogsSection />
        <StaffSection />
        <TeamsSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
