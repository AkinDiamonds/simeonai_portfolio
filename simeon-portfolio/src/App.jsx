// import React from 'react'
import Hero from './components/Hero'
import Header from './components/Header'
import WorkSection from './components/WorkSection'
import About from './components/About'
import { useRef } from 'react'



export default function App() {

  const worksRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToWorks = () => {
    worksRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="relative min-h-screen">
      <Header scrollToWorks={scrollToWorks} scrollToAbout={scrollToAbout}></Header>
      <Hero scrollToWorks={scrollToWorks}></Hero>
      <WorkSection worksRef={worksRef}></WorkSection>
      <About aboutRef={aboutRef}></About>
    </div>
  )
}
