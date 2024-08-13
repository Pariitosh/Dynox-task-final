'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from 'lenis/react'
import { useGSAP } from '@gsap/react';
import Navbar from "./components/Navbar";
import Page1 from "./components/Page1";
import ImageContainer from "./components/ImageContainer";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import MouseFollower from "./components/MouseFollower";
gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const [current, setCurrent] = useState(0)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const changeImage = () => {
      setCurrent(prev => (prev === 5 ? 0 : prev + 1));
    };

    const timer = setInterval(changeImage, 2000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })
  useGSAP(
    () => {
      // gsap code here...
      
        gsap.from('.heading', { opacity: 0, y: 100, duration: 1 });
        gsap.to('.video-wrapper', {
          scrollTrigger: {
            trigger: '.page1',
            pin: true,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
          },
          width: "100vw",
          height: "100vh",
          duration: 1,
          ease: "none",

        });
      


      // Second page animation (pin and image rows)
      // Pin and animate page 2
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.page2',
          pin: true,
          start: 'top top',
          end: '+=300%', // Adjust based on how many animations you have
          scrub: 1,
        }
      });

      // Image row animations start together
      tl.to('.name', {
        opacity: 1,
        y: "-100%",
        duration: 10
      });
      tl.to('.name', {
        opacity: 0,
        y: "-100%",
        duration: 10
      });

      tl.to('.image-row1', {
        x: '-260%',
        duration: 30
      }, 'imageRows');

      tl.to('.image-row2', {
        x: '260%',
        duration: 30
      }, 'imageRows'); // Same label as image-row1

      // Fourth animation (new)
      tl.to('.name2', {
        opacity: 1,
        y: "-100%",
        duration: 10
      });
      tl.to('.name2', {
        opacity: 0,
        y: "-100%",
        duration: 50
      });
      tl.to('.cities-list', {
        y: '-80%',
        scale: 0.7,
        duration: 50,
        transform: "matrix3d(0.3, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0.3, 0, 0, -1487, 0, 0.1)", // Scale down and move away  y:100,
      })
      tl.to('.scroll-down-wrapper',{
        opacity:0
      })
    },

  ); // <-- scope is for selector text (optional)
  const handleLoad = () => {
    
    gsap.to('.loading-screen img',{width:0,height:0})
    gsap.to('.heading',{scale:1})
    gsap.to('.video-wrapper',{scale:1,delay:0.5})
  }
  const cities = ['Paris', 'France', 'London', 'New York', 'Florida', 'Chicago', 'Los Angeles', 'Capri', 'Bangkok', 'Hong Kong', 'New Delhi', 'Moscow']
  const imageLinks = [
    { link: 'https://admin.deniot.com/app/uploads/2020/07/living-room_2_eylau_paris_jean-louis-deniot.jpg', name: "Eylau" },
    { link: 'https://admin.deniot.com/app/uploads/2020/07/living-room_1_touraine_jean-louis-deniot.jpg', name: "Upper East Side" },
    { link: 'https://admin.deniot.com/app/uploads/2020/07/living-room_10_south-beach-loft_miami_jean-louis-deniot.jpg', name: "Touraine" },
    { link: 'https://admin.deniot.com/app/uploads/2022/01/living-room_2_doheny-drive_los-angeles_jean-louis-deniot.jpg', name: "Eaton Square" },
    { link: 'https://admin.deniot.com/app/uploads/2020/07/living-room_1_flamingo_miami_jean-louis-deniot.jpg', name: "South Beach" },
    { link: 'https://admin.deniot.com/app/uploads/2020/07/linving-room_10_west-hollywood_los-angeles_jean-louis-deniot.jpg', name: "Doheny Drive" }
  ]
  return (
    <ReactLenis root>
      <MouseFollower/>
      <header>
        <Navbar />
      </header>
      <div className="scroll-down-wrapper">
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17" viewBox="0 0 11 17" focusable="false" tabindex="-1" class="icon"><path fill-rule="evenodd" d="M5.5 0C8.533 0 11 2.727 11 6.08v4.86C11 14.28 8.533 17 5.5 17S0 14.273 0 10.92V6.08C0 2.726 2.467 0 5.5 0zm0 1C3.019 1 1 3.26 1 6.038v4.924C1 13.74 3.019 16 5.5 16s4.5-2.252 4.5-5.02V6.039C10 3.26 7.981 1 5.5 1zm0 3c.276 0 .5.244.5.545v1.91c0 .3-.224.545-.5.545S5 6.756 5 6.455v-1.91c0-.3.224-.545.5-.545z"></path></svg>
        </div>
        <p>Scroll to explore</p>
      </div>
      <main class="main">

        <section class="page1">
          <div className="loading-screen">
            <img src="logo.png"/>
          </div>
          <div class="headings">
            <h1 class="heading">Design your life and</h1>
            <h1 class="heading"> Dreams</h1>
          </div>
          <div class="video-wrapper">
            <iframe
              onLoad={handleLoad}
              src="https://player.vimeo.com/video/505223053?loop=1&autoplay=1&muted=1&byline=0&portrait=0&title=0&controls=0"
              frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
          </div>
          <div>

          </div>
        </section>
        <section class="page2">
          <div class="image-row1">
            {imageLinks.map((item, idx) => { return (<ImageContainer key={idx} link={item.link} name={item.name} />) })}
          </div>
          <p class="name">Jean-Louis Denoit</p>
          <p class="name2">Our Internation Interiors</p>
          <div class="image-row2">
            {imageLinks.map((item, idx) => { return (<ImageContainer key={idx} link={item.link} name={item.name} />) })}
          </div>

          <ul class="cities-list">
            <li>Paris</li>
            <li>France</li>
            <li>New York</li>
            <li>Florida</li>
            <li>Chicago</li>
            <li>Los Angeles</li>
            <li>Capri</li>
            <li>Bangkok</li>
            <li>Hong Kong</li>
            <li>New Delhi</li>
            <li>Moscow</li>
          </ul>
        </section>


      </main>
      <div className="mobile-main">

        <div className="phone-iframe">
          <h1>Design your life and dreams</h1>
          <img src={imageLinks[current].link} />
        </div>
        <p className="mobile-text">Jean-Louis Denoit</p>
        {imageLinks.map((item, idx) => { return (<MobileImage key={idx} link={item.link} name={item.name} />) })}
        <div className="cities-mobile">
          <p>Our International Interiors</p>
          <ul>{cities.map((item, idx) => { return (<li key={idx}>{item}</li>) })}</ul>
        </div>
      </div>
      <Footer />
    </ReactLenis>
  );
}

const MobileImage = ({ link, name }) => {
  return (
    <div className="mobile-img-outer">
      <img src={`${link}`} />
      <p>{name}</p>
    </div>
  )
}