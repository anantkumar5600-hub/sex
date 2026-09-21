import { brand } from "@/data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  // Reusable Tailwind classes for the glow and lift effect
  const iconStyle =
    "text-paper-faint transition-all duration-300 hover:-translate-y-1 hover:text-paper hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]";

  return (
    <footer className="border-t border-ink-line py-8">
      <div className="mx-auto max-w-shell px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-paper-faint">
        {/* Left: Copyright */}
        <p className="w-full md:w-auto text-left">
          © {year} {brand.name}.
        </p>

        {/* Right: Email & Socials */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto justify-start md:justify-end">
          <a
            href="mailto:labourplazzz@gmail.com"
            data-cursor="link"
            className="hover:text-paper transition-colors duration-300"
          >
            labourplazzz@gmail.com
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/minito.vfx/" 
              target="_blank" 
              rel="noreferrer" 
              className={iconStyle} 
              aria-label="Instagram"
              data-cursor="link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            {/* Twitter / X */}
            <a 
              href="https://x.com/MINITOVFX" 
              target="_blank" 
              rel="noreferrer" 
              className={iconStyle} 
              aria-label="Twitter"
              data-cursor="link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>

            {/* Discord */}
            <a 
              href="https://discord.gg/c4ywjZBVaK" 
              target="_blank" 
              rel="noreferrer" 
              className={iconStyle} 
              aria-label="Discord"
              data-cursor="link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.445.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.618-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.319 13.58.099 18.058a.082.082 0 0 0 .031.056 19.908 19.908 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}