import React from "react";

export default function Header({scrollToWorks, scrollToAbout}) {
  return (
    <header className="w-full py-4 px-4 flex justify-between items-center bg-[#010118]/20 sticky top-0 z-50 backdrop-blur-3xl">
      <div className="text-2xl font-display font-bold text-support">
        Simeon Akinrinola
      </div>
      <nav>
        <div className="flex gap-6  text-base font-medium text-accent-white transition-all">
          <button onClick={scrollToWorks} className="hover:underline cursor-pointer">Work</button>
          <button onClick={scrollToAbout} className="hover:underline cursor-pointer">About</button>
          <button className="hover:underline cursor-pointer">Contact</button>
        </div>
      </nav>
    </header>
  );
}
