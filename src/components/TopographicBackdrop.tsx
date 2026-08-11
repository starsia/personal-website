"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

const CELL_SIZE = 22;
const LEVELS = 9;
const LEVEL_RANGE = 1.6;
const DRIFT_SPEED = 0.00035;

function elevation(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.006 + t) * 0.5 +
    Math.cos(y * 0.005 - t * 0.7) * 0.5 +
    Math.sin((x * 0.004 + y * 0.004) + t * 0.4) * 0.4 +
    Math.cos((x - y) * 0.003 - t * 0.5) * 0.3
  );
}

function interp(
  threshold: number,
  aVal: number,
  bVal: number,
  a: Point,
  b: Point,
): Point {
  const f = (threshold - aVal) / (bVal - aVal);
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}

function drawContoursAtLevel(
  ctx: CanvasRenderingContext2D,
  grid: Float32Array,
  cols: number,
  rows: number,
  threshold: number,
) {
  ctx.beginPath();

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const v0 = grid[j * cols + i];
      const v1 = grid[j * cols + i + 1];
      const v2 = grid[(j + 1) * cols + i + 1];
      const v3 = grid[(j + 1) * cols + i];

      const x = i * CELL_SIZE;
      const y = j * CELL_SIZE;
      const p0: Point = [x, y];
      const p1: Point = [x + CELL_SIZE, y];
      const p2: Point = [x + CELL_SIZE, y + CELL_SIZE];
      const p3: Point = [x, y + CELL_SIZE];

      const edges: [Point, Point, number, number][] = [
        [p0, p1, v0, v1],
        [p1, p2, v1, v2],
        [p2, p3, v2, v3],
        [p3, p0, v3, v0],
      ];

      const crossings: Point[] = [];
      for (const [a, b, av, bv] of edges) {
        if (av >= threshold !== bv >= threshold) {
          crossings.push(interp(threshold, av, bv, a, b));
        }
      }

      if (crossings.length === 2) {
        ctx.moveTo(crossings[0][0], crossings[0][1]);
        ctx.lineTo(crossings[1][0], crossings[1][1]);
      } else if (crossings.length === 4) {
        const center = (v0 + v1 + v2 + v3) / 4;
        if (center >= threshold) {
          ctx.moveTo(crossings[0][0], crossings[0][1]);
          ctx.lineTo(crossings[1][0], crossings[1][1]);
          ctx.moveTo(crossings[2][0], crossings[2][1]);
          ctx.lineTo(crossings[3][0], crossings[3][1]);
        } else {
          ctx.moveTo(crossings[0][0], crossings[0][1]);
          ctx.lineTo(crossings[3][0], crossings[3][1]);
          ctx.moveTo(crossings[1][0], crossings[1][1]);
          ctx.lineTo(crossings[2][0], crossings[2][1]);
        }
      }
    }
  }

  ctx.stroke();
}

export function TopographicBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDarkRef = {
      current: document.documentElement.classList.contains("dark"),
    };
    const observer = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let grid = new Float32Array(0);

    function resize() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      cols = Math.ceil(width / CELL_SIZE) + 2;
      rows = Math.ceil(height / CELL_SIZE) + 2;
      grid = new Float32Array(cols * rows);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let rafId = 0;
    let frameCount = 0;

    function draw() {
      const c = ctx!;
      c.clearRect(0, 0, width, height);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          grid[j * cols + i] = elevation(i * CELL_SIZE, j * CELL_SIZE, t);
        }
      }

      const strokeColor = isDarkRef.current
        ? "hsla(192, 45%, 70%, 0.14)"
        : "hsla(205, 40%, 32%, 0.13)";
      c.strokeStyle = strokeColor;
      c.lineWidth = 1;

      for (let l = 0; l < LEVELS; l++) {
        const threshold = -LEVEL_RANGE + (l / (LEVELS - 1)) * LEVEL_RANGE * 2;
        drawContoursAtLevel(c, grid, cols, rows, threshold);
      }
    }

    function frame() {
      frameCount += 1;
      t += DRIFT_SPEED;

      if (frameCount % 3 === 0) {
        draw();
      }

      rafId = requestAnimationFrame(frame);
    }

    if (prefersReducedMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
