import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: 'hub' | 'relay' | 'leaf';
  pulse: number;
  pulseSpeed: number;
}

interface Edge {
  a: number;
  b: number;
  activity: number;
  active: boolean;
  speed: number;
}

const COLOR = '255,255,255';

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };

    const build = () => {
      nodes = [];
      edges = [];
      const w = canvas.width;
      const h = canvas.height;

      const hubCount   = Math.max(4, Math.floor(w / 350));
      const relayCount = hubCount * 2;
      const leafCount  = hubCount * 5;

      const makeNode = (type: Node['type']): Node => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (type === 'hub' ? 0.2 : type === 'relay' ? 0.35 : 0.55),
        vy: (Math.random() - 0.5) * (type === 'hub' ? 0.2 : type === 'relay' ? 0.35 : 0.55),
        radius: type === 'hub' ? 5 : type === 'relay' ? 3 : 2,
        type,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
      });

      for (let i = 0; i < hubCount; i++)   nodes.push(makeNode('hub'));
      for (let i = 0; i < relayCount; i++) nodes.push(makeNode('relay'));
      for (let i = 0; i < leafCount; i++)  nodes.push(makeNode('leaf'));

      // Connect every node to every other node (full mesh)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          edges.push({
            a: i,
            b: j,
            activity: Math.random(),
            active: Math.random() > 0.6,
            speed: 0.003 + Math.random() * 0.008,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      }

      // Draw edges
      for (const e of edges) {
        const na = nodes[e.a];
        const nb = nodes[e.b];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;

        // Line opacity by tier
        const alpha = na.type === 'hub' ? 0.55 : na.type === 'relay' ? 0.35 : 0.22;

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(${COLOR},${alpha})`;
        ctx.lineWidth = na.type === 'hub' ? 1.4 : 0.8;
        ctx.stroke();

        // Animated data packet
        if (e.active) {
          e.activity = (e.activity + e.speed) % 1;
          const px = na.x + dx * e.activity;
          const py = na.y + dy * e.activity;
          const packetR = na.type === 'hub' ? 2.5 : 1.8;

          // Glow
          const grd = ctx.createRadialGradient(px, py, 0, px, py, packetR * 4);
          grd.addColorStop(0, `rgba(${COLOR},0.7)`);
          grd.addColorStop(1, `rgba(${COLOR},0)`);
          ctx.beginPath();
          ctx.arc(px, py, packetR * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(px, py, packetR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},1)`;
          ctx.fill();

          // Trail
          const trailStart = Math.max(0, e.activity - 0.08);
          const tsx = na.x + dx * trailStart;
          const tsy = na.y + dy * trailStart;
          const trailGrad = ctx.createLinearGradient(tsx, tsy, px, py);
          trailGrad.addColorStop(0, `rgba(${COLOR},0)`);
          trailGrad.addColorStop(1, `rgba(${COLOR},0.85)`);
          ctx.beginPath();
          ctx.moveTo(tsx, tsy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = na.type === 'hub' ? 2.5 : 1.6;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pf = 0.75 + 0.25 * Math.sin(n.pulse);
        const r = n.radius * pf;

        if (n.type !== 'leaf') {
          const rings = n.type === 'hub' ? 2 : 1;
          for (let ring = 0; ring < rings; ring++) {
            const ringR = r * (5 + ring * 3);
            const ringAlpha = (0.18 - ring * 0.06) * pf;
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, ringR);
            grd.addColorStop(0, `rgba(${COLOR},${ringAlpha})`);
            grd.addColorStop(1, `rgba(${COLOR},0)`);
            ctx.beginPath();
            ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${COLOR},1)`;
        ctx.fill();

        if (n.type === 'hub') {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onResize = () => { resize(); build(); };
    resize();
    build();
    draw();
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
