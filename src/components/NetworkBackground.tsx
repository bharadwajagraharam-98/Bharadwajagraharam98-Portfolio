import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

const COLOR = '255,255,255';
const MAX_DIST = 200;
const MOUSE_RADIUS = 150;
const NODE_COUNT_DIVISOR = 18000;

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      build();
    };

    const build = () => {
      nodes = [];
      const area = canvas.width * canvas.height;
      const count = Math.max(60, Math.floor(area / NODE_COUNT_DIVISOR));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 3,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.012 + Math.random() * 0.018,
        });
      }
    };

    const virtualHeight = () => canvas.height * 3;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY;
      const mouse = mouseRef.current;
      const vh = virtualHeight();

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > vh) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      }

      ctx.save();
      ctx.translate(0, -scrollY);

      // Edges between nearby nodes (only draw those visible on screen)
      const visibleTop = scrollY - MAX_DIST;
      const visibleBottom = scrollY + canvas.height + MAX_DIST;

      for (let i = 0; i < nodes.length; i++) {
        const na = nodes[i];
        if (na.y < visibleTop || na.y > visibleBottom) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const nb = nodes[j];
          if (nb.y < visibleTop || nb.y > visibleBottom) continue;
          const dx = nb.x - na.x;
          const dy = nb.y - na.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DIST) continue;

          const alpha = (1 - dist / MAX_DIST) * 0.45;
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Mouse interaction — mouse coords are in page-space
      if (mouse) {
        for (const n of nodes) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MOUSE_RADIUS) continue;

          const alpha = (1 - dist / MOUSE_RADIUS) * 0.85;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},0.9)`;
        ctx.fill();
      }

      for (const n of nodes) {
        if (n.y < visibleTop || n.y > visibleBottom) continue;
        const pf = 0.75 + 0.25 * Math.sin(n.pulse);
        const r = n.radius * pf;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},0.85)`;
        ctx.fill();
      }

      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    // Store mouse in page coordinates (clientY + scrollY)
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    const onMouseLeave = () => { mouseRef.current = null; };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
