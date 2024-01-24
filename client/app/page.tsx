"use client";
import DifficultySelector from "@/components/DifficultySelector";
import Suduko from "@/components/Suduko";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center flex-col bg-slate-100">
      <Suduko />
    </main>
  );
}
