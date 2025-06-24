"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-transparent border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-white text-lg font-semibold tracking-widest font-anton uppercase">
          <Image src="/glob.png" alt="" width={32} height={32}/>
          <p>Glob</p>
        </Link>

        {/* Nav Links */}
        <div className="flex gap-5 items-center text-sm text-white/70 font-medium">
          <Link href="#features" className="hover:text-[#FB5D32] transition">Features</Link>
          <Link href="#demo" className="hover:text-[#FB5D32] transition">Demo</Link>
          <Link href="https://docs.useglob.io" target="_blank" className="hover:text-[#FB5D32] transition">Docs</Link>

          <a
            href="https://github.com/useglob"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
          >
            <svg width="18" height="18" fill="currentColor" className="hover:text-white transition">
              <path d="M8.998 0C4.03 0 0 4.03 0 8.998c0 3.975 2.576 7.342 6.148 8.532.45.082.615-.195.615-.43 0-.212-.008-.775-.012-1.522-2.503.543-3.032-1.207-3.032-1.207-.41-1.043-1.002-1.32-1.002-1.32-.82-.56.062-.548.062-.548.91.064 1.388.936 1.388.936.806 1.382 2.116.983 2.63.752.082-.584.316-.983.574-1.21-1.997-.227-4.096-.998-4.096-4.444 0-.982.35-1.785.922-2.413-.094-.227-.4-1.143.088-2.384 0 0 .753-.24 2.467.92A8.607 8.607 0 0 1 8.998 4.8c.76.004 1.525.103 2.24.302 1.71-1.16 2.462-.92 2.462-.92.49 1.24.184 2.157.09 2.384.576.628.92 1.43.92 2.413 0 3.454-2.104 4.214-4.11 4.436.324.276.61.823.61 1.658 0 1.196-.012 2.162-.012 2.456 0 .24.16.52.62.43A9.004 9.004 0 0 0 18 8.998C18 4.03 13.97 0 8.998 0Z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
