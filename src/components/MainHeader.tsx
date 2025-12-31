export default function MainHeader() {
  return (
    <header className="w-full bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-3">
          {/* Logo */}
    

          {/* Brand name */}
          {/* <span className="text-xl font-semibold text-neutral-900">Cube</span> */}
        </div>

        {/* Center: Navigation */}

        {/* Right: CTA */}
        <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4B5BE6] text-white text-sm font-semibold hover:bg-[#3f4fd9] transition"
        >
          {/* Telegram-style icon */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
            <path d="M9.993 15.674l-.398 5.6c.57 0 .816-.246 1.112-.54l2.67-2.55 5.53 4.045c1.014.56 1.73.266 1.984-.936L23.98 2.79c.296-1.49-.538-2.074-1.522-1.71L1.114 9.403c-1.452.56-1.43 1.36-.247 1.723l5.49 1.713L19.11 5.86c.6-.397 1.146-.177.697.22" />
          </svg>
          Download App
        </a>
      </div>
    </header>
  );
}
