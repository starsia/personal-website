"use client";

import { useEffect, useRef } from "react";

type Point = [number, number];

const CELL_SIZE = 22;
const LEVELS = 9;
const LEVEL_RANGE = 1.6;
const INDEX_EVERY = 4;
const LABEL_SEGMENT_INTERVAL = 40;

function baseHue(isDark: boolean) {
  return isDark
    ? { hue: 192, saturation: 42, lightness: 70 }
    : { hue: 205, saturation: 38, lightness: 32 };
}

function levelStyle(levelIndex: number, isDark: boolean) {
  const isIndexContour = levelIndex % INDEX_EVERY === 0;
  const { hue, saturation, lightness } = baseHue(isDark);
  const alpha = isIndexContour ? 0.31 : 0.2;

  return {
    isIndexContour,
    color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
    lineWidth: isIndexContour ? 1.6 : 1.1,
  };
}

function elevationLabel(threshold: number) {
  return Math.round(threshold * 100).toString();
}

// Fixed phase offsets (arbitrary, just breaks up symmetry) since the field
// no longer animates — this is a static "map", not a live simulation.
const PHASE_A = 1.7;
const PHASE_B = -0.9;
const PHASE_C = 0.4;
const PHASE_D = -2.1;

function elevation(x: number, y: number) {
  return (
    Math.sin(x * 0.0024 + PHASE_A) * 0.5 +
    Math.cos(y * 0.002 + PHASE_B) * 0.5 +
    Math.sin(x * 0.0016 + y * 0.0016 + PHASE_C) * 0.4 +
    Math.cos((x - y) * 0.0012 + PHASE_D) * 0.3
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
  labels?: { text: string; textColor: string; haloColor: string },
) {
  ctx.beginPath();

  const labelPoints: { mid: Point; angle: number }[] = [];
  let segmentCounter = 0;

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

        if (labels) {
          segmentCounter += 1;
          if (segmentCounter % LABEL_SEGMENT_INTERVAL === 0) {
            const [a, b] = crossings;
            let angle = Math.atan2(b[1] - a[1], b[0] - a[0]);
            if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI;
            labelPoints.push({
              mid: [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
              angle,
            });
          }
        }
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

  if (labels && labelPoints.length) {
    ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (const { mid, angle } of labelPoints) {
      const width = ctx.measureText(labels.text).width;

      ctx.save();
      ctx.translate(mid[0], mid[1]);
      ctx.rotate(angle);
      ctx.fillStyle = labels.haloColor;
      ctx.fillRect(-width / 2 - 3, -7, width + 6, 14);
      ctx.fillStyle = labels.textColor;
      ctx.fillText(labels.text, 0, 0);
      ctx.restore();
    }
  }
}

export function TopographicBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDarkRef = {
      current: document.documentElement.classList.contains("dark"),
    };
    const observer = new MutationObserver(() => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
      draw();
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
      draw();
    }

    function draw() {
      const c = ctx!;
      c.clearRect(0, 0, width, height);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          grid[j * cols + i] = elevation(i * CELL_SIZE, j * CELL_SIZE);
        }
      }

      const { hue, saturation, lightness } = baseHue(isDarkRef.current);
      const haloColor = isDarkRef.current
        ? "rgba(10, 10, 10, 0.85)"
        : "rgba(255, 255, 255, 0.85)";

      for (let l = 0; l < LEVELS; l++) {
        const threshold = -LEVEL_RANGE + (l / (LEVELS - 1)) * LEVEL_RANGE * 2;
        const { isIndexContour, color, lineWidth } = levelStyle(
          l,
          isDarkRef.current,
        );
        c.strokeStyle = color;
        c.lineWidth = lineWidth;
        drawContoursAtLevel(
          c,
          grid,
          cols,
          rows,
          threshold,
          isIndexContour
            ? {
                text: elevationLabel(threshold),
                textColor: `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`,
                haloColor,
              }
            : undefined,
        );
      }
    }

    resize();
    window.addEventListener("resize", resize);

    return () => {
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
