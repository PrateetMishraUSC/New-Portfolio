import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialPanel from './components/SocialPanel';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Connect from './components/Connect';
import Footer from './components/Footer';
import FloatingIcons from './components/FloatingIcons';

export default function App() {
  return (
    <>
      <FloatingIcons />
      <Navbar />
      <SocialPanel />
      <main>
        <Hero />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
