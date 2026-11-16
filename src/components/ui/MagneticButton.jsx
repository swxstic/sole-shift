import { useRef, useEffect } from 'react';

export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    const onMouseLeave = () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
    };

    const onMouseEnter = () => {
      el.style.transition = 'transform 0.1s linear';
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseenter', onMouseEnter);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [strength]);

  return (
    <button ref={ref} className={className} {...props}>
      {children}
    </button>
  );
}
