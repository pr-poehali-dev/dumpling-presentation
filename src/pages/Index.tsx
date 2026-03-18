import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const IMG_PELMENI = "https://cdn.poehali.dev/projects/c803593f-2204-45bb-b904-874e26df13fa/files/666393dd-b804-4bc2-aafd-2efb9953de63.jpg";
const IMG_INGREDIENTS = "https://cdn.poehali.dev/projects/c803593f-2204-45bb-b904-874e26df13fa/files/f99a4440-e99b-45e5-9fd7-b45beb8ca6f9.jpg";
const IMG_SERVING = "https://cdn.poehali.dev/projects/c803593f-2204-45bb-b904-874e26df13fa/files/6509c17f-4c69-4c8d-bb8d-7835cdd6050c.jpg";
const IMG_LOGO = "https://cdn.poehali.dev/projects/c803593f-2204-45bb-b904-874e26df13fa/bucket/deb1091c-1489-4682-8acf-908e4b2b0e0b.png";

const slides = [
  {
    id: 1,
    tag: "ВЫСШИЙ КЛАСС",
    title: "Пельмени,\nкоторые\nпорадуют",
    subtitle: "Вкус, который узнаёшь с первой ложки",
    type: "hero",
    image: IMG_PELMENI,
    bg: "from-[#1a0005] to-[#3d0010]",
  },
  {
    id: 2,
    tag: "СОСТАВ",
    title: "Тонкое тесто.\nСочный фарш.",
    subtitle: "Каждый пельмень — это частичка старания. Отборный фарш, нежное тесто без изъяна — только так, и никак иначе.",
    type: "feature",
    image: IMG_INGREDIENTS,
    bg: "from-[#1a0008] to-[#2d000e]",
    stats: [
      { value: "100%", label: "Натуральный фарш" },
      { value: "≤2мм", label: "Толщина теста" },
      { value: "0", label: "Консервантов" },
    ],
  },
  {
    id: 3,
    tag: "АРОМАТ И ВКУС",
    title: "С первой ложки\n— радость\nи восторг",
    subtitle: "Аромат такой — аж дух мятежный! Сытный обед, отличный итог.",
    type: "taste",
    image: IMG_SERVING,
    bg: "from-[#200008] to-[#3a0012]",
    sauces: ["Сметана", "Зелень", "Уксус", "Горчица"],
  },
  {
    id: 4,
    tag: "УДОБСТВО",
    title: "Готово\nза минуты",
    subtitle: "Быстро сварить — совсем несложно. Миг — и блюдо уже возможно.",
    type: "quick",
    bg: "from-[#25000a] to-[#3d0015]",
    steps: [
      { icon: "Droplets", text: "Вскипятите воду", num: "01" },
      { icon: "Flame", text: "Забросьте пельмени", num: "02" },
      { icon: "Timer", text: "Подождите 7 минут", num: "03" },
      { icon: "UtensilsCrossed", text: "Наслаждайтесь!", num: "04" },
    ],
  },
  {
    id: 5,
    tag: "ДЛЯ ВСЕХ",
    title: "Для семьи,\nдрузей,\nпраздника",
    subtitle: "Завтрак, ужин, обед любой — станут радостью они живой.",
    type: "family",
    bg: "from-[#1a000a] to-[#320010]",
    occasions: [
      { emoji: "🏠", label: "Каждый день" },
      { emoji: "🎉", label: "Праздник" },
      { emoji: "👨‍👩‍👧", label: "Семья" },
      { emoji: "🤝", label: "Друзья" },
      { emoji: "🌅", label: "Завтрак" },
      { emoji: "🌙", label: "Ужин" },
    ],
  },
  {
    id: 6,
    tag: "ВЫБОР",
    title: "Выбирай\nлучшее.\nНе зевай.",
    subtitle: "Натуральные ингредиенты, честный рецепт. Качество — вот наш завет.",
    type: "cta",
    bg: "from-[#2d0010] to-[#1a0008]",
    cta: "Попробовать сейчас",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (index === current) return;
      setDirection(dir);
      setCurrent(index);
      setAnimKey(k => k + 1);
    },
    [current]
  );

  const next = useCallback(() => {
    if (current < slides.length - 1) goTo(current + 1, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-black select-none"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-all duration-700`} />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Glow accents */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: "45vw", height: "45vw",
          background: "radial-gradient(circle, rgba(200,16,46,0.4) 0%, transparent 70%)",
          top: "-10vw", right: "-10vw",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: "25vw", height: "25vw",
          background: "radial-gradient(circle, rgba(245,200,0,0.15) 0%, transparent 70%)",
          bottom: "5vw", left: "5vw",
        }}
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-6">
        <img
          src={IMG_LOGO}
          alt="Бульмени"
          style={{ height: "72px", objectFit: "contain", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
        />
        <div className="text-white text-sm tracking-widest" style={{ opacity: 0.35 }}>
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </header>

      {/* Main content */}
      <main
        key={animKey}
        className="relative z-10 w-full h-full flex items-center"
        style={{
          animation: `slideIn${direction === "next" ? "Up" : "Down"} 0.3s ease forwards`,
        }}
      >
        {/* SLIDE 1 — HERO */}
        {slide.type === "hero" && (
          <div className="w-full h-full flex">
            <div className="flex-1 flex flex-col justify-center pl-16 pr-8 z-10">
              <div className="flex items-center gap-2 mb-6">
                <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5c800", letterSpacing: "0.3em" }}>
                  {slide.tag}
                </span>
              </div>
              <h1
                className="text-white leading-none mb-4"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 7vw, 7rem)" }}
              >
                {slide.title.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {i === 1 ? (
                      <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.25)", color: "transparent" }}>
                        {line}
                      </span>
                    ) : line}
                  </span>
                ))}
              </h1>
              <p className="text-white font-light text-lg max-w-xs mt-4" style={{ opacity: 0.45 }}>
                {slide.subtitle}
              </p>
              <div className="flex items-center gap-3 mt-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "#f5c800" }}
                >
                  <Icon name="ChevronDown" size={20} className="text-white" />
                </div>
                <span className="text-white text-sm" style={{ opacity: 0.35 }}>Листайте вниз</span>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img
                src={slide.image}
                alt="Пельмени"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}
              />
              <div
                className="absolute bottom-16 right-12 text-right pointer-events-none"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 900, fontSize: "clamp(5rem, 14vw, 16rem)", lineHeight: 1, color: "#f5c800", opacity: 0.12 }}
              >
                №1
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2 — FEATURE */}
        {slide.type === "feature" && (
          <div className="w-full h-full flex">
            <div className="w-1/2 relative overflow-hidden">
              <img
                src={slide.image}
                alt="Ингредиенты"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 40%, #0d0d0d)" }} />
            </div>
            <div className="w-1/2 flex flex-col justify-center pr-16 pl-8">
              <div className="flex items-center gap-2 mb-6">
                <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5c800", letterSpacing: "0.3em" }}>
                  {slide.tag}
                </span>
              </div>
              <h2
                className="text-white leading-tight mb-6"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
              >
                {slide.title.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              <p className="font-light text-base max-w-sm mb-10 leading-relaxed text-white" style={{ opacity: 0.45 }}>
                {slide.subtitle}
              </p>
              {slide.stats && (
                <div className="flex gap-8">
                  {slide.stats.map((s, i) => (
                    <div key={i}>
                      <div
                        style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, color: "#f5c800", fontSize: "1.75rem" }}
                      >{s.value}</div>
                      <div className="text-white text-xs mt-1" style={{ opacity: 0.35 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SLIDE 3 — TASTE */}
        {slide.type === "taste" && (
          <div className="w-full h-full flex">
            <div className="flex-1 flex flex-col justify-center pl-16 pr-8 z-10">
              <div className="flex items-center gap-2 mb-6">
                <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5c800", letterSpacing: "0.3em" }}>
                  {slide.tag}
                </span>
              </div>
              <h2
                className="text-white leading-tight mb-6"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
              >
                {slide.title.split("\n").map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h2>
              <p className="font-light text-base max-w-xs mb-10 leading-relaxed text-white" style={{ opacity: 0.45 }}>
                {slide.subtitle}
              </p>
              {slide.sauces && (
                <div>
                  <div className="text-xs tracking-widest mb-4 uppercase text-white" style={{ opacity: 0.3, letterSpacing: "0.25em" }}>
                    Подаётся с
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {slide.sauces.map((s, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 text-sm font-medium rounded-full"
                        style={{ border: "1px solid rgba(245,200,0,0.4)", color: "#f5c800" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img
                src={slide.image}
                alt="Подача"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ maskImage: "linear-gradient(to right, transparent 0%, black 35%)" }}
              />
            </div>
          </div>
        )}

        {/* SLIDE 4 — QUICK */}
        {slide.type === "quick" && (
          <div className="w-full h-full flex flex-col justify-center px-16">
            <div className="flex items-center gap-2 mb-6">
              <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5c800", letterSpacing: "0.3em" }}>
                {slide.tag}
              </span>
            </div>
            <h2
              className="text-white leading-tight mb-14"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
            >
              {slide.title.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <div className="grid grid-cols-4 gap-8">
              {slide.steps?.map((step, i) => (
                <div key={i} className="relative">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      fontFamily: "'Oswald', sans-serif", fontWeight: 900,
                      fontSize: "5rem", color: "rgba(255,255,255,0.04)",
                      top: "-1.5rem", left: "-0.5rem", lineHeight: 1,
                    }}
                  >{step.num}</div>
                  <div className="relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(245,200,0,0.12)", border: "1px solid rgba(245,200,0,0.3)" }}
                    >
                      <Icon name={step.icon} size={20} style={{ color: "#f5c800" }} />
                    </div>
                    <p className="text-white font-medium text-base">{step.text}</p>
                  </div>
                  {i < (slide.steps?.length ?? 0) - 1 && (
                    <div
                      className="absolute"
                      style={{
                        top: "1.5rem", left: "3.5rem",
                        width: "calc(100% - 3rem)", height: "1px",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 5 — FAMILY */}
        {slide.type === "family" && (
          <div className="w-full h-full flex flex-col justify-center px-16">
            <div className="flex items-center gap-2 mb-6">
              <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5c800", letterSpacing: "0.3em" }}>
                {slide.tag}
              </span>
            </div>
            <h2
              className="text-white leading-tight mb-4"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
            >
              {slide.title.split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="font-light text-base max-w-lg mb-10 leading-relaxed text-white" style={{ opacity: 0.45 }}>
              {slide.subtitle}
            </p>
            <div className="grid grid-cols-6 gap-4">
              {slide.occasions?.map((occ, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
                >
                  <span style={{ fontSize: "2rem" }}>{occ.emoji}</span>
                  <span className="text-white text-xs text-center" style={{ opacity: 0.5 }}>{occ.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 6 — CTA */}
        {slide.type === "cta" && (
          <div className="w-full h-full flex flex-col justify-center items-center text-center px-16">
            <div className="flex items-center gap-2 mb-6">
              <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#f5c800", letterSpacing: "0.3em" }}>
                {slide.tag}
              </span>
              <div style={{ width: "2rem", height: "1px", background: "#f5c800" }} />
            </div>
            <h2
              className="leading-tight mb-6"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 7vw, 8rem)" }}
            >
              {slide.title.split("\n").map((line, i) => (
                <span key={i} className="block" style={{ color: i === 2 ? "#f5c800" : "white" }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="font-light text-lg max-w-lg mb-12 leading-relaxed text-white" style={{ opacity: 0.45 }}>
              {slide.subtitle}
            </p>
            <button
              className="px-12 py-5 rounded-full font-bold text-lg transition-all duration-300"
              style={{
                color: "#1a0008",
                background: "#f5c800",
                boxShadow: "0 0 40px rgba(245,200,0,0.35)",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = "#e6b800"; (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = "#f5c800"; (e.target as HTMLElement).style.transform = "scale(1)"; }}
            >
              {slide.cta}
            </button>
            <div className="mt-12 flex items-center gap-8">
              {[
                { icon: "Leaf", text: "Натуральный состав" },
                { icon: "Award", text: "Честный рецепт" },
                { icon: "Heart", text: "Уют и тепло" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Icon name={item.icon} size={16} style={{ color: "#f5c800" }} />
                  <span className="text-white text-sm" style={{ opacity: 0.35 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Navigation bottom */}
      <nav className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-between px-10 pb-8">
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              style={{
                width: i === current ? "2rem" : "0.5rem",
                height: "0.5rem",
                borderRadius: "9999px",
                background: i === current ? "#f5c800" : "rgba(255,255,255,0.2)",
                transition: "all 0.3s ease",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              opacity: current === 0 ? 0.2 : 1,
              cursor: current === 0 ? "not-allowed" : "pointer",
            }}
          >
            <Icon name="ChevronLeft" size={20} className="text-white" />
          </button>
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: current === slides.length - 1 ? "rgba(245,200,0,0.3)" : "#f5c800",
              color: "#1a0008",
              border: "none",
              opacity: current === slides.length - 1 ? 0.3 : 1,
              cursor: current === slides.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </nav>

      {/* Large background slide number */}
      <div
        className="absolute pointer-events-none select-none z-0 text-white"
        style={{
          fontFamily: "'Oswald', sans-serif", fontWeight: 900,
          fontSize: "28vw", lineHeight: 1, opacity: 0.018,
          bottom: "-6vw", left: "50%", transform: "translateX(-50%)",
        }}
      >
        {String(current + 1).padStart(2, "0")}
      </div>
    </div>
  );
}