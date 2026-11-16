import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    };

    const onMouseEnter = () => {
      dot.style.transform += ' scale(3)';
      ring.style.transform += ' scale(2)';
      ring.style.borderColor = '#FF3B30';
    };
    const onMouseLeave = () => {
      ring.style.borderColor = 'rgba(245,245,240,0.4)';
    };

    document.addEventListener('mousemove', onMouseMove);

    const interactives = document.querySelectorAll('a, button, [role="button"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    let raf;
    const animate = () => {
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;
      ring.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-red rounded-full z-[9999] pointer-events-none transition-transform duration-75"
        style={{ willChange: 'transform' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 z-[9998] pointer-events-none transition-colors duration-200"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
