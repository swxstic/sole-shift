import { useEffect, useRef } from 'react';

export function useCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const onMouseEnterLink = () => {
      cursor.classList.add('scale-[3]');
      follower.classList.add('scale-[2]');
    };

    const onMouseLeaveLink = () => {
      cursor.classList.remove('scale-[3]');
      follower.classList.remove('scale-[2]');
    };

    const links = document.querySelectorAll('a, button, [data-cursor]');
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink);
      el.addEventListener('mouseleave', onMouseLeaveLink);
    });

    document.addEventListener('mousemove', onMouseMove);

    let raf;
    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      posX = lerp(posX, mouseX, 0.1);
      posY = lerp(posY, mouseY, 0.1);
      follower.style.transform = `translate(${posX - 20}px, ${posY - 20}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
      cancelAnimationFrame(raf);
    };
  }, []);

  return { cursorRef, followerRef };
}
