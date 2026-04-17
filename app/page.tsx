"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  title: string;
  desc: string;
};

type PortfolioItem = {
  title: string;
  category: string;
  desc: string;
  imageFront: string;
  imageBack: string;
  fitFront: string;
  fitBack: string;
  cardBg: string;
  video?: string;
};

function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      {children}
    </div>
  );
}

function PortfolioCard({
  item,
  idx,
  onOpen,
}: {
  item: PortfolioItem;
  idx: number;
  onOpen: (item: PortfolioItem) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="group text-left [perspective:1600px]">
      <div className="relative z-10 h-full min-h-[31rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_35px_100px_rgba(0,0,0,0.6)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.05] to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle at top, rgba(251,191,36,0.14), transparent 40%), radial-gradient(circle at bottom right, rgba(236,72,153,0.12), transparent 38%), radial-gradient(circle at bottom left, rgba(34,211,238,0.10), transparent 36%)" }} />

        <button
          type="button"
          onClick={() => setFlipped((prev) => !prev)}
          className="block w-full text-left"
          aria-pressed={flipped}
        >
          <div className={`relative h-[22rem] w-full [transform-style:preserve-3d] transition duration-700 ease-out md:group-hover:[transform:rotateY(180deg)] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] [backface-visibility:hidden]">
              <div className={`h-full w-full ${item.cardBg}`}>
                <img
                  src={item.imageFront}
                  alt={`${item.title} front`}
                  className={`h-full w-full ${item.fitFront} transition duration-700 md:group-hover:scale-[1.06] ${flipped ? "scale-[1.03]" : ""}`}
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0.08),rgba(0,0,0,0.30))]" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.06] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition duration-500 md:group-hover:opacity-100" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm">
                Front Frame
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className={`h-full w-full ${item.cardBg}`}>
                <img
                  src={item.imageBack}
                  alt={`${item.title} back`}
                  className={`h-full w-full ${item.fitBack} transition duration-700 md:group-hover:scale-[1.06] ${flipped ? "scale-[1.03]" : ""}`}
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0.08),rgba(0,0,0,0.30))]" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.06] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition duration-500 md:group-hover:opacity-100" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/75 backdrop-blur-sm">
                Second Frame
              </div>
            </div>
          </div>
        </button>

        <div className="relative z-10 px-4 pb-4 pt-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-amber-300/90">0{idx + 1} • {item.category}</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{item.title}</h3>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55 backdrop-blur-sm">
              Tap or hover to flip
            </div>
          </div>
          <p className="max-w-sm leading-7 text-white/68">{item.desc}</p>
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
          >
            Open full view
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FilmParkMediaWebsite() {
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(null);
  const services: Service[] = [
    {
      title: "Commercial Work",
      desc: "Brand videos and ads that make your business look polished, memorable, and worth paying attention to.",
    },
    {
      title: "Short Form Content",
      desc: "Scroll-stopping reels, TikToks, and social clips built to grab attention fast and keep people watching.",
    },
    {
      title: "Weddings",
      desc: "Emotional wedding films that feel real, cinematic, and worth rewatching for years.",
    },
    {
      title: "Sports",
      desc: "High-energy sports content that captures intensity, movement, and standout moments.",
    },
    {
      title: "Short Films",
      desc: "Story-driven film production for creators who want to bring an idea to life with intention.",
    },
  ];

  const portfolio: PortfolioItem[] = [
    {
      title: "Cheeseburger Randy’s",
      category: "Commercial",
      desc: "Retro-style restaurant promo with bold color and personality.",
      imageFront: "/images/commercial-1.jpg",
      imageBack: "/images/commercial-2.jpg",
      fitFront: "object-contain",
      fitBack: "object-contain",
      cardBg: "bg-black",
      video: "/videos/commercial.mp4",
    },
    {
      title: "Wedding Films",
      category: "Wedding",
      desc: "Emotional moments that feel timeless, cinematic, and real.",
      imageFront: "/images/wedding-1.jpg",
      imageBack: "/images/wedding-2.jpg",
      fitFront: "object-contain",
      fitBack: "object-contain",
      cardBg: "bg-black",
      video: "/videos/wedding.mp4",
    },
    {
      title: "Southern Miss Football",
      category: "Sports",
      desc: "Big-game energy from pregame runout to postgame moments.",
      imageFront: "/images/sports-1.jpg",
      imageBack: "/images/sports-2.jpg",
      fitFront: "object-contain",
      fitBack: "object-contain",
      cardBg: "bg-black",
      video: "/videos/sports.mp4",
    },
    {
      title: "Short Form Content",
      category: "Short Form",
      desc: "Fast, cinematic content built for brands that need attention now.",
      imageFront: "/images/shortform-1.jpg",
      imageBack: "/images/shortform-2.jpg",
      fitFront: "object-cover",
      fitBack: "object-cover",
      cardBg: "bg-black",
      video: "/videos/shortform.mp4",
    },
  ];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProject(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatStar {
          0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); opacity: .42; }
          50% { transform: translateY(-12px) scale(1.15) rotate(10deg); opacity: .95; }
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .logo-float {
          animation: logoFloat 7s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {[
            { left: "6%", top: "12%", color: "text-pink-400", delay: "0s", dur: "6s", size: "h-7 w-7 md:h-10 md:w-10" },
            { left: "18%", top: "72%", color: "text-cyan-300", delay: "1.3s", dur: "7.5s", size: "h-6 w-6 md:h-9 md:w-9" },
            { left: "30%", top: "20%", color: "text-fuchsia-400", delay: "2.1s", dur: "6.8s", size: "h-5 w-5 md:h-8 md:w-8" },
            { left: "44%", top: "82%", color: "text-yellow-300", delay: "1.8s", dur: "8s", size: "h-7 w-7 md:h-10 md:w-10" },
            { left: "59%", top: "10%", color: "text-sky-300", delay: "0.7s", dur: "7.2s", size: "h-6 w-6 md:h-9 md:w-9" },
            { left: "74%", top: "68%", color: "text-violet-400", delay: "2.7s", dur: "6.6s", size: "h-7 w-7 md:h-10 md:w-10" },
            { left: "86%", top: "18%", color: "text-pink-300", delay: "1.1s", dur: "7.7s", size: "h-5 w-5 md:h-8 md:w-8" },
            { left: "92%", top: "80%", color: "text-cyan-200", delay: "0.9s", dur: "8.2s", size: "h-6 w-6 md:h-9 md:w-9" },
          ].map((star, index) => (
            <div
              key={index}
              className={`absolute ${star.color} opacity-80 mix-blend-screen`}
              style={{ left: star.left, top: star.top, animation: `floatStar ${star.dur} ease-in-out ${star.delay} infinite` }}
            >
              <svg viewBox="0 0 100 100" className={`${star.size} drop-shadow-[0_0_18px_currentColor]`}>
                <path d="M50 4 L58 34 L90 26 L66 50 L90 74 L58 66 L50 96 L42 66 L10 74 L34 50 L10 26 L42 34 Z" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>

        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.22)_100%)]" />

        <div className="relative z-10">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black font-black text-sm">FPM</div>
                <div>
                  <p className="text-sm font-semibold tracking-wide">Film Park Media</p>
                  <p className="text-xs text-white/60">Presly Vinney & Parker Gautney</p>
                </div>
              </div>

              <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
                <a href="#services" className="transition hover:text-white">Services</a>
                <a href="#portfolio" className="transition hover:text-white">Portfolio</a>
                <a href="#about" className="transition hover:text-white">About</a>
                <a href="#contact" className="transition hover:text-white">Contact</a>
              </nav>

              <a href="#contact" className="rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]">Book With Us</a>
            </div>
          </header>

          <section className="relative z-10 overflow-hidden border-b border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_28%),radial-gradient(circle_at_20%_15%,rgba(236,72,153,0.09),transparent_22%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.08),transparent_24%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />
            <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
              <RevealOnScroll>
                <div className="relative z-10 flex flex-col justify-center">
                  <div className="mb-4 space-y-3">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Cinematic video for brands that want to stand out</p>
                    <p className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-white/70 backdrop-blur-sm">Co-Founded by Presly Vinney & Parker Gautney</p>
                  </div>
                  <h1 className="max-w-2xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl">Work that makes your brand feel bigger, sharper, and impossible to scroll past.</h1>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-white/75 md:text-xl">Film Park Media creates cinematic commercials, short form content, wedding films, sports media, and story-driven visuals for brands and people who are done settling for content that feels small.</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href="#contact" className="rounded-2xl bg-amber-400 px-6 py-4 font-semibold text-black shadow-[0_10px_30px_rgba(250,204,21,0.18)] transition hover:scale-[1.02]">Book With Us</a>
                    <a href="#portfolio" className="rounded-2xl border border-white/15 bg-white/[0.02] px-6 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/5">Look at Our Portfolio</a>
                  </div>
                  <div className="mt-8 grid max-w-xl grid-cols-1 gap-3 text-sm text-white/65 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                      <p className="text-lg font-bold text-white">Commercials</p>
                      <p className="mt-1">Brand films with style and purpose</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                      <p className="text-lg font-bold text-white">Short Form</p>
                      <p className="mt-1">Fast content built to get attention</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                      <p className="text-lg font-bold text-white">Films</p>
                      <p className="mt-1">Story-first visuals that actually stick</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={120}>
                <div className="relative z-10 flex items-center justify-center">
                  <div className="relative mx-auto w-full max-w-[640px] transition duration-700 hover:scale-[1.02]">
                    <div className="absolute inset-0 rounded-[2.8rem] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22),transparent_55%),radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.15),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.15),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(250,204,21,0.12),transparent_28%)] blur-3xl" />
                    <div className="absolute inset-x-[10%] bottom-[8%] h-16 rounded-full bg-white/12 blur-3xl" />
                    <div className="relative flex items-center justify-center overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)),linear-gradient(145deg,#03040a,#0a0d16_45%,#06070c)] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.72)] backdrop-blur-xl md:p-8">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_34%)]" />
                      <div className="absolute inset-[1px] rounded-[2.7rem] ring-1 ring-white/8" />
                      <img src="/images/logo.png" alt="Film Park Media" className="logo-float relative z-10 h-[420px] w-auto object-contain brightness-125 contrast-150 drop-shadow-[0_0_60px_rgba(255,255,255,0.35)] md:h-[500px]" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section className="relative z-10 mx-auto max-w-7xl px-6 py-20">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Why people book</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">You don’t need more random content. You need content that does something.</h2>
              </div>
            </RevealOnScroll>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                ["Make people stop scrolling", "Your brand gets a stronger first impression with content that feels cinematic, intentional, and worth watching."],
                ["Look like a real brand", "Clean visuals, better storytelling, and a polished final product help people trust you faster."],
                ["Turn ideas into something real", "From pre-production to final edit, you get a process that keeps things moving and a result you’re proud to share."],
              ].map(([title, desc], idx) => (
                <RevealOnScroll key={title} delay={idx * 100}>
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="mt-3 leading-7 text-white/70">{desc}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <section className="relative z-10 border-y border-white/10 bg-white/[0.03]">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_0.8fr]">
              <RevealOnScroll>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">The problem</p>
                  <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">You know your business is better than the content you’ve been putting out.</h2>
                  <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">Maybe you’ve tried filming it yourself. Maybe you paid for something that looked fine but didn’t really do anything. It’s frustrating putting time and money into content that gets skipped, forgotten, or barely reaches anyone. When the video falls flat, it doesn’t just hurt the post. It makes your whole brand feel smaller than it really is.</p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={120}>
                <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/5 p-7 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold">What changes here</h3>
                  <p className="mt-3 leading-7 text-white/72">You get content with a plan behind it. Better pacing. Better visuals. Better storytelling. Something that finally feels like it fits the level of what you do.</p>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-14">
              <RevealOnScroll>
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">The team behind Film Park Media</p>
                  <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">We work well together because strong creative needs both vision and follow-through.</h2>
                  <p className="mt-6 text-lg leading-8 text-white/72">Presly leads with story, direction, and the creative instinct behind the work. Parker helps keep projects moving, ideas sharp, and execution locked in. That mix is a big part of why Film Park Media feels creative without feeling chaotic.</p>
                </div>
              </RevealOnScroll>

              <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                <RevealOnScroll>
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
                    <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                      <img src="/images/presly.jpg" alt="Presly filming" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={100}>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">About Presly</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Started with a camera in high school. Never really stopped.</h2>
                    <p className="mt-6 text-lg leading-8 text-white/72">Presly Vinney is the co-founder of Film Park Media. He got into filmmaking back in high school and has been creating content consistently for the past 3 years.</p>
                    <p className="mt-4 text-lg leading-8 text-white/72">What started as making short films turned into a deeper understanding of how to make people actually care about what they’re watching. That same approach now goes into every commercial, video, and project Film Park Media takes on.</p>
                    <p className="mt-4 text-lg leading-8 text-white/72">The goal is simple. Make content that feels real, looks cinematic, and actually gets attention.</p>
                  </div>
                </RevealOnScroll>
              </div>

              <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                <RevealOnScroll>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">About Parker</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">The other half of Film Park Media making sure everything runs right.</h2>
                    <p className="mt-6 text-lg leading-8 text-white/72">Parker Gautney is the co-founder of Film Park Media. He plays a huge role in making sure projects run smoothly from start to finish.</p>
                    <p className="mt-4 text-lg leading-8 text-white/72">From helping shape ideas to making sure execution is on point, he brings balance to the creative process and keeps everything moving the way it should.</p>
                    <p className="mt-4 text-lg leading-8 text-white/72">Together, Presly and Parker focus on creating content that not only looks good but actually works for the people they’re creating it for.</p>
                  </div>
                </RevealOnScroll>
                <RevealOnScroll delay={100}>
                  <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4">
                    <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-neutral-800 via-neutral-900 to-black">
                      <img src="/images/parker.jpg" alt="Parker Gautney" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </section>

          <section className="relative z-10 border-y border-white/10 bg-neutral-900/80">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <RevealOnScroll>
                <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Process</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Here’s how your idea turns into something people care about.</h2>
                  </div>
                  <a href="#contact" className="rounded-2xl bg-amber-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.02]">Book With Us</a>
                </div>
              </RevealOnScroll>

              <div className="mt-12 grid gap-6 md:grid-cols-3">
                {[
                  ["01", "Plan the vision", "We figure out the goal, the feel, and what needs to happen before cameras ever turn on."],
                  ["02", "Shoot with intention", "Production is focused, smooth, and built around capturing what matters most."],
                  ["03", "Deliver content that hits", "You get a final piece that feels polished, memorable, and ready to work for your brand."],
                ].map(([num, title, desc], idx) => (
                  <RevealOnScroll key={title} delay={idx * 100}>
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
                      <p className="text-sm font-semibold text-amber-300">{num}</p>
                      <h3 className="mt-3 text-2xl font-bold">{title}</h3>
                      <p className="mt-3 leading-7 text-white/70">{desc}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
            <RevealOnScroll>
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Services</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Pick the kind of project you need. We’ll make sure it actually feels like you.</h2>
              </div>
            </RevealOnScroll>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, idx) => (
                <RevealOnScroll key={service.title} delay={idx * 90}>
                  <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="mt-3 leading-7 text-white/70">{service.desc}</p>
                    <a href="#contact" className="mt-6 inline-flex text-sm font-semibold text-amber-300 hover:text-amber-200">Ask about {service.title.toLowerCase()} →</a>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <section id="portfolio" className="relative z-10 border-y border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]">
            <div className="mx-auto max-w-7xl px-6 py-24">
              <RevealOnScroll>
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Selected Work</p>
                    <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">A sharper, more cinematic look at the work.</h2>
                    <p className="mt-4 max-w-xl text-lg leading-8 text-white/68">Think of this like a premium browse screen for Film Park Media. Tap in, flip cards, and open each project for a bigger, cleaner full-screen look.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/55 backdrop-blur-sm">Tap on mobile. Hover on desktop.</div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3 overflow-x-auto pb-2 text-sm text-white/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {portfolio.map((item, idx) => (
                      <a key={item.title} href={`#portfolio-card-${idx}`} className="whitespace-nowrap rounded-full border border-white/10 bg-black/20 px-4 py-2 transition hover:border-white/20 hover:bg-white/[0.05]">
                        {item.category}
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-4">
                {portfolio.map((item, idx) => (
                  <RevealOnScroll key={item.title} delay={idx * 90}>
                    <div id={`portfolio-card-${idx}`}>
                      <PortfolioCard item={item} idx={idx} onOpen={setActiveProject} />
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>

          <section className="relative z-10 border-t border-white/10 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_35%)]">
            <div className="mx-auto max-w-4xl px-6 py-24 text-center">
              <RevealOnScroll>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Ready when you are</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Let’s make something people don’t forget.</h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/72">If you’re tired of content that feels small, flat, or easy to skip, let’s change that. Book with Film Park Media and let’s build something that actually gets attention.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a href="#contact" className="rounded-2xl bg-amber-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.02]">Book With Us</a>
                  <a href="#portfolio" className="rounded-2xl border border-white/15 px-6 py-4 font-semibold text-white transition hover:bg-white/5">See the Portfolio</a>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <RevealOnScroll>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Contact</p>
                  <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Tell us what you’re trying to create.</h2>
                  <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">Need a commercial, short form package, wedding film, sports video, or creative project? Reach out and let’s talk through the idea, timeline, and next step.</p>
                  <div className="mt-8 space-y-3 text-white/72">
                    <p>Instagram: @filmparkmedia</p>
                    <p>Facebook: Film Park Media</p>
                    <p>TikTok: @filmparkmedia</p>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={100}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8">
                  <form action="https://formspree.io/f/xwvalbdr" method="POST" className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/75">Name</label>
                      <input name="name" required className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-amber-300/60" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/75">Email</label>
                      <input type="email" name="email" required className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-amber-300/60" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/75">Project Type</label>
                      <select name="projectType" className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-amber-300/60">
                        <option>Commercial Work</option>
                        <option>Short Form Content</option>
                        <option>Wedding</option>
                        <option>Sports</option>
                        <option>Short Film</option>
                        <option>Not Sure Yet</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/75">Message</label>
                      <textarea name="message" rows={5} required className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 outline-none placeholder:text-white/30 focus:border-amber-300/60" placeholder="Tell us what you’re trying to make" />
                    </div>
                    <input type="hidden" name="_subject" value="New Film Park Media project inquiry" />
                    <button type="submit" className="w-full rounded-2xl bg-amber-400 px-6 py-4 font-semibold text-black transition hover:scale-[1.01]">Send Project Inquiry</button>
                  </form>
                </div>
              </RevealOnScroll>
            </div>
          </section>

          {activeProject && (
            <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-md" onClick={() => setActiveProject(null)}>
              <div className="relative max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)),#07090f] shadow-[0_40px_120px_rgba(0,0,0,0.7)]" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-amber-300/90">{activeProject.category}</p>
                    <h3 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">{activeProject.title}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-0 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="border-b border-white/10 bg-black xl:border-b-0 xl:border-r">
                    <div className="flex items-center justify-between px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/50 md:px-7">
                      <span>{activeProject.video ? "Highlight Reel" : "Frame One"}</span>
                    </div>
                    <div className="flex h-[34vh] items-center justify-center bg-black px-4 pb-4 md:h-[58vh] md:px-6 md:pb-6">
                      {activeProject.video ? (
                        <video
                          src={activeProject.video}
                          className="h-full w-full rounded-[1rem] object-contain"
                          autoPlay
                          muted
                          loop
                          playsInline
                          controls
                          poster={activeProject.imageFront}
                        />
                      ) : (
                        <img
                          src={activeProject.imageFront}
                          alt={`${activeProject.title} frame one`}
                          className={`max-h-full w-full ${activeProject.fitFront} object-center`}
                        />
                      )}
                    </div>
                  </div>

                  <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-1">
                    <div className="border-b border-white/10 bg-black md:border-r xl:border-r-0">
                      <div className="flex items-center justify-between px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/50 md:px-7">
                        <span>Frame One</span>
                      </div>
                      <div className="flex h-[28vh] items-center justify-center bg-black px-4 pb-4 md:h-[29vh] md:px-6 md:pb-6 xl:h-[29vh]">
                        <img
                          src={activeProject.imageFront}
                          alt={`${activeProject.title} frame one`}
                          className={`max-h-full w-full ${activeProject.fitFront} object-center`}
                        />
                      </div>
                    </div>
                    <div className="bg-black">
                      <div className="flex items-center justify-between px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/50 md:px-7">
                        <span>Frame Two</span>
                      </div>
                      <div className="flex h-[28vh] items-center justify-center bg-black px-4 pb-4 md:h-[29vh] md:px-6 md:pb-6 xl:h-[29vh]">
                        <img
                          src={activeProject.imageBack}
                          alt={`${activeProject.title} frame two`}
                          className={`max-h-full w-full ${activeProject.fitBack} object-center`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 px-5 py-5 md:px-7">
                  <p className="max-w-2xl text-base leading-7 text-white/72">{activeProject.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      onClick={() => setActiveProject(null)}
                      className="rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
                    >
                      Want this style? Book it
                    </a>
                    {activeProject.video && (
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/60">
                        Video autoplay enabled
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
