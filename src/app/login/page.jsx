import Image from "next/image";
import React from "react";
import LoginWithGoogle from "./LoginWithGoogle";
import FormLoginWithCredential from "./FormLoginWithCredential";

const page = async () => {
  return (
    <main>
      <div className="mx-auto my-0 w-1/2 p-4 md:p-6 2xl:p-10">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <section className="flex flex-col justify-center items-center w-full mb-6">
            <Image
              alt="Logo"
              src="/logo2.png"
              className="object-contain grayscale"
              width={200}
              height={200}
            />
            <p
              aria-disabled="true"
              className="w-full text-center text-4xl font-bold"
            >
              Kios Management System
            </p>
          </section>
          <FormLoginWithCredential />
          <LoginWithGoogle />
        </div>
      </div>
    </main>
  );
};

export default page;
