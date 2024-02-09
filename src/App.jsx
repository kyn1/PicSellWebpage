import React from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Project from './components/Project.jsx';
import Review from './components/Review.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div className="">
      <Navbar />
      <main>
        <div id="home">
        <Home />
        </div>
        <div id="about">
        <About />
        </div>
        <div id="project">
        <Project />
        </div>
        <div id="review">
        <Review />
        </div>
        <div id="contact">
        <Contact />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
