"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
  localStorage.setItem("theme", theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // Reads browser-only state (localStorage/matchMedia) to avoid an SSR
    // hydration mismatch — the value can't be known until after mount.
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(initial);
  }, []);

  if (theme === null) {
    return <span className="h-9 w-9 shrink-0" aria-hidden />;
  }

  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} mode`}
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-sm transition-colors hover:bg-foreground/5"
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
