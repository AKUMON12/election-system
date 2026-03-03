"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        // Next.js Safety: window is only available on client
        if (typeof window === "undefined") return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        if (window.innerWidth < 768) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const count = 60;
        particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            radius: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1,
        }));

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { x: mx, y: my } = mouseRef.current;
            if (mx > 0 && my > 0) {
                const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 250);
                gradient.addColorStop(0, "rgba(30, 58, 138, 0.12)");
                gradient.addColorStop(0.5, "rgba(30, 58, 138, 0.04)");
                gradient.addColorStop(1, "rgba(30, 58, 138, 0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            for (const p of particlesRef.current) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200 && dist > 0) {
                    p.vx += (dx / dist) * 0.01;
                    p.vy += (dy / dist) * 0.01;
                }

                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 0.8) {
                    p.vx = (p.vx / speed) * 0.8;
                    p.vy = (p.vy / speed) * 0.8;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(148, 163, 184, ${p.opacity})`;
                ctx.fill();
            }

            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const a = particlesRef.current[i];
                    const b = particlesRef.current[j];
                    const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(148, 163, 184, ${0.06 * (1 - d / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouse);
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default AnimatedBackground;