import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import About from './components/About';
import Connect from './components/Connect';
import Footer from './components/Footer';
import InkLine from './components/InkLine';

export default function App() {
  return (
    <>
      <InkLine />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <About />
        <Connect />
      </main>
      <Footer />
    </>
  );
}
