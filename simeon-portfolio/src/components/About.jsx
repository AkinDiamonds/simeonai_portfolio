// About.jsx
import React from "react";
import { motion } from "framer-motion";

/*
  About page
  - Minimal, persuasive, easy to scan.
  - Fixed "30s read" at the top.
  - Medium backdrop blur cards.
  - Fade-up reveal as the reader scrolls.
  - Primary CTA: Contact (I reply within 12 hours).
  - Comments are short and to the point (my voice).
*/

export default function About({aboutRef}) {
    // short content blocks based on what you provided
    const cards = [
        {
            id: "lead",
            title: "High-end frontend developer",
            body:
                "Design excellence focused on meaning and experience. Everything has a purpose. Everything is doable.",
        },
        {
            id: "values",
            title: "What I value",
            body:
                "Clarity in every interaction. Thoughtful spacing, precise typography, and microcopy that guides rather than shouts.",
        },
        {
            id: "approach",
            title: "Signature approach",
            body:
                "Start from intent → refine through constraints → deliver a humane interface. I treat constraints as design opportunities.",
        },
        {
            id: "skills",
            title: "Skills & tools",
            body:
                "React  # TailwindCSS  # modern CSS patterns  # JS  # systems thinking",
        },
    ];

    return (
        <main
            ref={aboutRef}
            className="about-bg min-h-screen text-accent-white"
            aria-labelledby="about-heading"
        >
            <div className="max-w-5xl mx-auto px-4 py-12">
                {/* header row: title + read time */}
                <header className="mb-8 flex flex-col items-center text-center gap-4">

                    <div className="flex flex-col items-center">
                        <p className="text-support font-body font-bold text-2xl mb-4">
                            About
                        </p>

                        <h1
                            id="about-heading"
                            className="text-4xl md:text-6xl font-display font-bold leading-tight"
                            style={{ lineHeight: "1.06" }}
                        >
                            Simeon Akinrinola
                        </h1>

                        <p className="mt-3 text-lg opacity-70 max-w-xl">
                            High-end frontend developer. Design excellence and deliberate on meaning
                            and experience.
                        </p>
                    </div>

                    {/* read time — centered under everything */}
                    <div className="text-sm opacity-70">
                        <div className="inline-flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-[rgba(0,0,0,0.25)] text-sm">
                                30s read
                            </span>
                            <a
                                href="#contact"
                                className="text-sm underline hover:text-major underline-offset-4"
                                aria-label="Jump to contact"
                            >
                                Contact
                            </a>
                        </div>
                    </div>

                </header>


                {/* grid of large, airy, high-readability cards */}
<section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mt-16">

  {/* --- normal cards (no obsessions here) --- */}
  {cards
    .filter((c) => c.id !== "obsessions")
    .map((c, idx) => (
      <motion.article
        key={c.id}
        className="
          p-8 md:p-10 
          rounded-3xl 
          backdrop-blur-xl 
          bg-white/5 
          border border-white/10 
          shadow-[0_8px_32px_rgba(0,0,0,0.15)]
          transition-all
        "
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, delay: idx * 0.08 }}
        aria-labelledby={`${c.id}-title`}
      >
        <h3
          id={`${c.id}-title`}
          className="text-2xl md:text-3xl font-display text-support font-bold mb-4 leading-snug"
        >
          {c.title}
        </h3>

        <p className="text-lg md:text-xl leading-relaxed opacity-95">
          {c.body}
        </p>

      </motion.article>
    ))}

  {/* --- dedicated, standalone OBSESSIONS BLOCK --- */}
  <motion.article
    id="obsessions"
    className="
      col-span-1 md:col-span-2
      p-10 md:p-14 
      rounded-3xl 
      backdrop-blur-xl 
      bg-white/5 
      border border-white/5 
      shadow-[0_12px_42px_rgba(0,0,0,0.1)]
    "
    initial={{ opacity: 0, y: 48 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.8 }}
  >
    <h3 className="text-3xl md:text-4xl text-support text-center font-display font-bold mb-8 leading-snug">
      What I Obsess Over
    </h3>

    <div
      className="
        grid grid-cols-1 sm:grid-cols-2 gap-10 
        text-[1.3rem] md:text-[1.6rem] 
        leading-relaxed font-display
      "
    >
      {/* LEFT COLUMN */}
      <div className="space-y-5">

        {/* exaggerated spacing */}
        <p className="tracking-[0.4em] uppercase font-semibold opacity-90 text-[1.8rem] md:text-[2.1rem]">
          S P A C I N G
        </p>

        {/* ultra heavy weight */}
        <p className="font-black text-[2.6rem] md:text-[3rem] leading-none">
          Weight
        </p>

        <motion.p
                animate={{ opacity: [0.5, 1, 0.5], color: ['#fff', '#fad4d4', '#fff'] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="font-semibold tracking-tight"
        >
  C͟o͟n͟t͟r͟a͟s͟t͟
</motion.p>

        <motion.p
  initial={{ x: -10 }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', stiffness: 100 }}
  className="italic text-left text-[1.6rem] md:text-[1.8rem]"
>
  Alignment
</motion.p>

      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-5">

        <motion.p
  animate={{ y: [0, -5, 0] }}
  transition={{ repeat: Infinity, duration: 1 }}
  className="tracking-[0.35em] text-[1.9rem] md:text-[2.2rem]"
>
  Rhythm
</motion.p>


        {/* hierarchy — strong underline */}
        <p className="underline decoration-[6px] decoration-major font-bold">
          Hierarchy
        </p>

        {/* clarity — spaced-out uppercase */}
        <p className="uppercase tracking-[0.3em] font-semibold text-[2rem] md:text-[2.3rem]">
          C L A R I T Y
        </p>

        <motion.p className=" text-center text-[1.7rem] md:text-[2rem] font-display">
  Flow<span className="ml-1">
    {['.', '.', '.'].map((dot, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          repeatType: "loop",
          times: [0, 0.25, 0.5, 1],
          delay: i * 0.4
        }}
      >
        {dot}
      </motion.span>
    ))}
  </span>
</motion.p>


      </div>
    </div>
  </motion.article>

  <motion.article
  id="closing"
  className="col-span-1 md:col-span-2 p-10 md:p-14 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_12px_42px_rgba(0,0,0,0.2)]"
  initial={{ opacity: 0, y: 48 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.8 }}
>
  <h3 className="text-3xl md:text-4xl text-center font-display font-bold mb-8 leading-snug">
    Let's Talk
  </h3>

  <p className="text-center text-lg md:text-xl opacity-95 mb-8">
    If you want purposeful frontends that prioritize product and people, let's connect.
  </p>

  <div className="flex justify-center gap-4">
    <a
      id="contact"
      href="/#contact"
      className="inline-block px-8 py-4 rounded-xl bg-major text-accent-white font-medium text-lg"
      aria-label="Contact me"
    >
      Contact
    </a>
    <p className="self-center text-sm md:text-base opacity-80">
      I reply within <strong>12 hours</strong>.
    </p>
  </div>
</motion.article>

</section>

{/* footer detail */}
<footer className="mt-20 text-base md:text-lg opacity-80 text-center">
  <p>
    When I'm not coding or studying, you'll probably find me playing chess.
  </p>
</footer>



            </div>
        </main>
    );
}
