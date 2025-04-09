import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'dots' | 'waves' | 'gradient' | 'particles';
  height?: string;
}

const AnimatedBackground = ({ 
  className = "",
  variant = 'gradient',
  height = "100%"
}: AnimatedBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Gradient animation effect
  useEffect(() => {
    if (variant !== 'gradient' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let hue = 0;
    
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    const draw = () => {
      resizeCanvas();
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsla(${hue}, 60%, 60%, 0.5)`);
      gradient.addColorStop(0.5, `hsla(${hue + 40}, 70%, 50%, 0.3)`);
      gradient.addColorStop(1, `hsla(${hue + 80}, 60%, 40%, 0.5)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Subtle moving circles
      for (let i = 0; i < 5; i++) {
        // Ensure radius is always positive
        const radiusBase = Math.max(5, canvas.width * 0.2);
        const radiusVariation = Math.sin(hue * 0.01 + i) * 50;
        const radius = Math.max(10, radiusBase + radiusVariation);
        
        const x = canvas.width * 0.5 + Math.cos(hue * 0.005 + i * 0.5) * canvas.width * 0.2;
        const y = canvas.height * 0.5 + Math.sin(hue * 0.01 + i * 0.5) * canvas.height * 0.1;
        
        try {
          const circleGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          circleGradient.addColorStop(0, `hsla(${hue + i * 20}, 70%, 60%, 0.1)`);
          circleGradient.addColorStop(1, `hsla(${hue + i * 20}, 70%, 60%, 0)`);
          
          ctx.fillStyle = circleGradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        } catch (e) {
          console.warn('Error drawing circle gradient:', e);
          // Fallback in case gradient creation fails
          ctx.fillStyle = `hsla(${hue + i * 20}, 70%, 60%, 0.05)`;
          ctx.beginPath();
          ctx.arc(x, y, Math.max(10, radius), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      hue = (hue + 0.2) % 360;
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);
  
  // Particles animation effect
  useEffect(() => {
    if (variant !== 'particles' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    const particles: {x: number, y: number, size: number, speedX: number, speedY: number, hue: number}[] = [];
    
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        initParticles();
      }
    };
    
    const initParticles = () => {
      particles.length = 0;
      const count = Math.floor(canvas.width * canvas.height / 15000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          hue: Math.random() * 60 + 180 // blue-ish colors
        });
      }
    };
    
    const draw = () => {
      resizeCanvas();
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Connect nearby particles with lines
      ctx.strokeStyle = 'rgba(100, 200, 255, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    resizeCanvas();
    draw();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {variant === 'dots' && (
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      )}
      {variant === 'waves' && (
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTI4MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAwOWVlYiI+PHBhdGggZD0iTTEyODAgMEwxMjgwIDE0MEwwIDE0MEwwIDBMMTI4MCAweiIgZmlsbC1vcGFjaXR5PSIwLjAyIi8+PC9nPjwvc3ZnPg==')]" />
      )}
    </div>
  );
};

export default AnimatedBackground;