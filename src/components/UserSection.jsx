import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";

const UserSection = ({ className, size }) => {
  const { data, status } = useSession();
  if (status === "loading") {
    return <div>loading...</div>;
  }
  return (
    <div className={className + `bg-btn w-5/6 rounded-2xl overflow-hidden`}>
      {data ? (
        <div className="flex items-center gap-4 p-4">
          <Image
            src={data.user.image}
            alt="Profile Picture"
            width={64}
            height={64}
            className="rounded-2xl"
          />
          <div className="side-content">
            <h1>Welcome back, {data.user.name}</h1>
            <button
              className="rounded-md px-4 py-2 hover:bg-primary hover:text-tertiary font-medium border-2 border-primary"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link
          className="flex p-4 gap-4 side-icon w-full text-btn-text overflow-hidden hover:bg-btn-text hover:text-btn"
          href={"/login"}
        >
          <FaUser size={size} />
          <p className="side-content tracking-[0.08em]">SIGN IN</p>
        </Link>
      )}
    </div>
  );
};

export default UserSection;
