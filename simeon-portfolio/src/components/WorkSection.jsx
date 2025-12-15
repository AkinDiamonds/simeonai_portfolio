import React from "react"

const works = [
  { title: "Design System UI", img: "https://cdn.prod.website-files.com/64f7e0efa0923cf471f9417c/66164a50fb49143f9d0ca0d0_homepage-student-work-4-p-500.webp", tech: "React, TailwindCSS" },
  { title: "Analytics Dashboard", img: "https://cdn.prod.website-files.com/64f7e0efa0923cf471f9417c/66164a50fb49143f9d0ca0d0_homepage-student-work-4-p-500.webp", tech: "React, TailwindCSS" },
  { title: "Portfolio Redesign", img: "https://cdn.prod.website-files.com/64f7e0efa0923cf471f9417c/66164a50fb49143f9d0ca0d0_homepage-student-work-4-p-500.webp", tech: "React, TailwindCSS" },
  { title: "Web App Interface", img: "https://cdn.prod.website-files.com/64f7e0efa0923cf471f9417c/66164a50fb49143f9d0ca0d0_homepage-student-work-4-p-500.webp", tech: "React, TailwindCSS" },
  { title: "Marketing Landing Page", img: "https://cdn.prod.website-files.com/64f7e0efa0923cf471f9417c/66164a50fb49143f9d0ca0d0_homepage-student-work-4-p-500.webp", tech: "React, TailwindCSS" },
  { title: "Component Library", img: "https://cdn.prod.website-files.com/64f7e0efa0923cf471f9417c/66164a50fb49143f9d0ca0d0_homepage-student-work-4-p-500.webp", tech: "React, TailwindCSS" },
];

export default function WorkSection({worksRef}) {
  return (
    <section id="works" ref={worksRef} className="relative bg-accent-black text-white py-16 overflow-hidden">
      {/* Top mist fade (major color mixed into black) */}
      <div className="absolute top-70 left-0 w-full h-32 
        bg-linear-to-b from-accent-black to-transparent
        pointer-events-none z-20" />

      {/* Bottom mist fade */}
      <div className="absolute bottom-30 left-0 w-full h-32 
        bg-linear-to-t from-accent-black to-transparent
        pointer-events-none z-20" />

        <p className="text-support font-body font-bold text-center text-2xl">See the difference</p>
            <h2 className="relative text-6xl font-display font-bold mb-8 text-accent-white text-center ">
                Designs I Created
            </h2>

      <div className="max-w-7xl mx-auto px-4">

        {/* Three looping columns */}
        <div className="grid grid-cols-3 gap-8">
          {/* Column 1 - scroll up */}
          <div className="relative h-[150vh] overflow-hidden">
            <div className="animate-scroll-up flex flex-col space-y-6">
              {works.concat(works).map((work, i) => (
                <div key={`col1-${i}`} className="w-full">
                  <img src={work.img} alt={work.title} className="w-full object-cover rounded-lg" />
                  <p className="mt-2 text-sm opacity-80">{`Tech stack: ${work.tech}`}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - scroll down */}
          <div className="relative h-[150vh] overflow-hidden">
            <div className="animate-scroll-down flex flex-col space-y-6">
              {works.concat(works).map((work, i) => (
                <div key={`col2-${i}`} className="w-full">
                  <img src={work.img} alt={work.title} className="w-full object-cover rounded-lg" />
                  <p className="mt-2 text-sm opacity-80">{`Tech stack: ${work.tech}`}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 - scroll up */}
          <div className="relative h-[150vh] overflow-hidden">
            <div className="animate-scroll-up flex flex-col space-y-6">
              {works.concat(works).map((work, i) => (
                <div key={`col3-${i}`} className="w-full">
                  <img src={work.img} alt={work.title} className="w-full object-cover rounded-lg" />
                  <p className="mt-2 text-sm opacity-80">{`Tech stack: ${work.tech}`}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for scroll animation */}
      <style>
        {`
          @keyframes scroll-up {
            0%   { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes scroll-down {
            0%   { transform: translateY(-50%); }
            100% { transform: translateY(0); }
          }
          .animate-scroll-up {
            animation: scroll-up 60s linear infinite;
          }
          .animate-scroll-down {
            animation: scroll-down 60s linear infinite;
          }
        `}
      </style>
    </section>
  );
}

