"use client";

export default function HomePage() {
  return (
    <main className="relative w-full flex flex-col">
      <div className="h-[2lh]" />
      <div className="absolute w-full" style={{ "--box-border-color": "var(--foreground1)" } as React.CSSProperties} box-="round">
        <span className="px-[1ch] text-(--foreground1)">
          Using currency: <span className="text-(--primary1)">￡</span>
        </span>
      </div>
      <div className="z-10 bg-(--background0)" box-="round" shear-="top">
        <div className="header flex px-[1ch]">
          <h1 className="text-(--secondary1) bg-(--background0)">Noti Page</h1>
        </div>
        <span className="px-[1ch] text-(--foreground1)">

        </span>
      </div>
    </main>
  );
}
