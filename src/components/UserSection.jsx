import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";

const UserSection = ({ className, size }) => {
  const { data } = useSession();

  return (
    <div
      className={
        className + `bg-btn w-5/6 max-h-20 rounded-2xl overflow-hidden`
      }
    >
      {data ? (
        <div
          className={`flex ${
            className.includes("sidebar-collapse") ? "flex-col gap-2" : ""
          }  items-center p-4 w-full`}
        >
          <Image
            src={data.user.image || "/user.png"}
            alt="Profile Picture"
            width={42}
            height={42}
            className="rounded-full"
          />
          <div className="text-wrap w-1/2 side-content">
            <h1 className="text-xs whitespace-nowrap overflow-hidden overflow-ellipsis">
              {data.user.name}
            </h1>
          </div>
          <button
            className="h-full pl-3 text-white hover:text-black"
            onClick={() => signOut()}
          >
            <IoIosLogOut />
          </button>
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
