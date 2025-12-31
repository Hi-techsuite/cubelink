function DownloadHeader() {
  return (
    <div className="sticky top-0 z-30 bg-[#f6f6f2] border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#2AABEE] flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M9.993 15.674l-.398 5.6c.57 0 .816-.246 1.112-.54l2.67-2.55 5.53 4.045c1.014.56 1.73.266 1.984-.936L23.98 2.79c.296-1.49-.538-2.074-1.522-1.71L1.114 9.403c-1.452.56-1.43 1.36-.247 1.723l5.49 1.713L19.11 5.86c.6-.397 1.146-.177.697.22" />
            </svg>
          </div>
          <span className="text-[15px] font-semibold text-neutral-900">
            Cube
          </span>
        </div>

        {/* CTA */}
        <a
          href="https://cubechat.org/download"
          className="px-4 py-1.5 rounded-full bg-[#2AABEE] text-white text-xs font-semibold tracking-wide hover:bg-[#229ED9] transition"
        >
          DOWNLOAD APP
        </a>
      </div>
    </div>
  );
}

export default DownloadHeader;
