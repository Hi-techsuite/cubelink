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
          href="https://play.google.com/store/apps/details?id=ng.cube.app"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4B5BE6] text-white text-sm font-semibold hover:bg-[#3f4fd9] transition"
        >
          {/* Telegram-style icon */}
          <svg
            viewBox="0 0 512 512"
            className="w-4 h-4 fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M48 59.49v393a4.33 4.33 0 006.56 3.73l229.1-132.3L48 59.49z" />
            <path d="M285.34 256L329.4 211.9 85.8 75.6l199.54 180.4z" />
            <path d="M329.4 300.1L285.34 256 85.8 436.4l243.6-136.3z" />
            <path d="M432.9 239.3l-83.1-48.1-46.5 46.5 46.5 46.5 83.1-48.1c10.8-6.2 10.8-21.6 0-27.8z" />
          </svg>
          Download App
        </a>
      </div>
    </header>
  );
}
