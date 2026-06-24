"use client";

import { useState } from "react";

import { DisclaimerModal } from "@/widgets/disclaimer-modal";
import { Sidebar } from "@/widgets/sidebar";

export default function Home() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-[#E9EAEC]">
        {!agreed && (
          <DisclaimerModal onAgree={() => setAgreed(true)} onClose={() => {}} />
        )}
      </main>
    </div>
  );
}
