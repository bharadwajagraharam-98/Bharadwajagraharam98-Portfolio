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
  color: string;
}

interface Edge {
  a: number;
  b: number;
  activity: number; // 0-1, animated data-packet position
  active: boolean;
  speed: number;
}

const PALETTE = {
  hub:   '255,255,255',
  relay: '255,255,255',
  leaf:  '255,255,255',
};

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

      // Hub count based on viewport
      const hubCount = Math.max(4, Math.floor(w / 350));
      const relayCount = hubCount * 2;
      const leafCount = hubCount * 5;

      const makeNode = (type: Node['type']): Node => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (type === 'hub' ? 0.2 : type === 'relay' ? 0.35 : 0.55),
        vy: (Math.random() - 0.5) * (type === 'hub' ? 0.2 : type === 'relay' ? 0.35 : 0.55),
        radius: type === 'hub' ? 5 : type === 'relay' ? 3 : 2,
        type,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        color: PALETTE[type],
      });

      for (let i = 0; i < hubCount; i++) nodes.push(makeNode('hub'));
      for (let i = 0; i < relayCount; i++) nodes.push(makeNode('relay'));
      for (let i = 0; i < leafCount; i++) nodes.push(makeNode('leaf'));

      // Build edges: hubs connect to nearby relays; relays connect to nearby leaves
      const MAX_HUB_RELAY = 280;
      const MAX_RELAY_LEAF = 180;
      const MAX_HUB_HUB = 420;

      for (let i = 0; i < hubCount; i++) {
        // Hub ↔ Hub (long backbone)
        for (let j = i + 1; j < hubCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < MAX_HUB_HUB) {
            edges.push({ a: i, b: j, activity: Math.random(), active: Math.random() > 0.3, speed: 0.003 + Math.random() * 0.004 });
          }
        }
        // Hub ↔ Relay
        for (let j = hubCount; j < hubCount + relayCount; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < MAX_HUB_RELAY) {
            edges.push({ a: i, b: j, activity: Math.random(), active: Math.random() > 0.4, speed: 0.005 + Math.random() * 0.006 });
          }
        }
      }
      // Relay ↔ Leaf
      for (let i = hubCount; i < hubCount + relayCount; i++) {
        for (let j = hubCount + relayCount; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < MAX_RELAY_LEAF) {
            edges.push({ a: i, b: j, activity: Math.random(), active: Math.random() > 0.5, speed: 0.008 + Math.random() * 0.008 });
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += n.pulseSpeed;
      }

      // Draw edges
      for (const e of edges) {
        const na = nodes[e.a];
        const nb = nodes[e.b];
        const dx = nb.x - na.x;
        const dy = nb.y - na.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const tierAlpha = na.type === 'hub' ? 0.45 : na.type === 'relay' ? 0.28 : 0.18;

        // Static line
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = `rgba(${na.color},${tierAlpha})`;
        ctx.lineWidth = na.type === 'hub' ? 1.0 : 0.6;
        ctx.stroke();

        // Animated data packet travelling along edge
        if (e.active) {
          e.activity = (e.activity + e.speed) % 1;
          const px = na.x + dx * e.activity;
          const py = na.y + dy * e.activity;
          const packetR = na.type === 'hub' ? 2.5 : 1.8;

          // Packet glow
          const grd = ctx.createRadialGradient(px, py, 0, px, py, packetR * 4);
          grd.addColorStop(0, `rgba(${na.color},0.7)`);
          grd.addColorStop(1, `rgba(${na.color},0)`);
          ctx.beginPath();
          ctx.arc(px, py, packetR * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Packet core
          ctx.beginPath();
          ctx.arc(px, py, packetR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${na.color},0.95)`;
          ctx.fill();

          // Trail
          const trailLen = 0.06;
          const trailStart = Math.max(0, e.activity - trailLen);
          const tsx = na.x + dx * trailStart;
          const tsy = na.y + dy * trailStart;
          const trailGrad = ctx.createLinearGradient(tsx, tsy, px, py);
          trailGrad.addColorStop(0, `rgba(${na.color},0)`);
          trailGrad.addColorStop(1, `rgba(${na.color},0.55)`);
          ctx.beginPath();
          ctx.moveTo(tsx, tsy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = na.type === 'hub' ? 1.5 : 1;
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pf = 0.75 + 0.25 * Math.sin(n.pulse);
        const r = n.radius * pf;

        // Outer glow for hubs / relays
        if (n.type !== 'leaf') {
          const rings = n.type === 'hub' ? 2 : 1;
          for (let ring = 0; ring < rings; ring++) {
            const ringR = r * (5 + ring * 3);
            const ringAlpha = (0.15 - ring * 0.05) * pf;
            const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, ringR);
            grd.addColorStop(0, `rgba(${n.color},${ringAlpha})`);
            grd.addColorStop(1, `rgba(${n.color},0)`);
            ctx.beginPath();
            ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }
        }

        // Node core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${n.type === 'hub' ? 1.0 : n.type === 'relay' ? 0.85 : 0.7})`;
        ctx.fill();

        // Bright centre dot for hubs
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
