"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormData } from "@/components/CreateLobby/types";
import CreateLobbyForm from "@/components/CreateLobby/CreateLobbyForm";

export default function CreatePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Generate a unique 6-character lobby code

    const lobbyCode = Array.from(
      { length: 6 },
      () =>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 36)]
    ).join("");

    // TODO: Save lobby data to backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to dashboard instead of lobby view
    router.push(`/dashboard/${lobbyCode}?type=${data.type}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <CreateLobbyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
