import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function MouseFollower() {
  const followerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId = null;

    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const updateFollowerPosition = () => {
      if (followerRef.current) {
        const scrollX = window.pageXOffset;
        const scrollY = window.pageYOffset;

        gsap.to(followerRef.current, {
          x: mousePosition.x + scrollX,
          y: mousePosition.y + scrollY,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
      rafId = requestAnimationFrame(updateFollowerPosition);
    };

    window.addEventListener('mousemove', updateMousePosition);
    updateFollowerPosition();

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mousePosition]);

  return (
    <div 
      ref={followerRef} 
      style={{
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#515559',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}

export default MouseFollower;