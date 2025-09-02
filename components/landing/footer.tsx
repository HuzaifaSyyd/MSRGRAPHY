"use client";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 left-0 w-full h-[50px] border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur flex items-center min-h-[50px]">
      <div className="container text-xs text-slate-600 dark:text-slate-400 flex justify-between px-12">
        <span>© {new Date().getFullYear()} Msr Graphy.</span>
        <span>Crafted with love and color grading</span>
      </div>
    </footer>
  );
}
