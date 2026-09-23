"use client";

import { signOut } from "@/app/actions";

export default function LogoutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="text-xs text-[#EDE0D3]/50 hover:text-[#EDE0D3] transition"
      >
        Salir
      </button>
    </form>
  );
}
