"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const fetchTest = async () => {
    const res = await fetch("https://localhost:7092/api/values", {
      method: "GET",
      headers: {
        authorization: `bearer ${session?.user.accessToken}`,
      },
    });

    const response = await res.json();
    console.log(response);
  };

  return (
    <main className="overflow-hidden">
      main page <button onClick={() => fetchTest()}>Click</button>
    </main>
  );
}
