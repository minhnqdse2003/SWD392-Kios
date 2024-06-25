import React from "react";

const page = () => {
  return (
    <div class="flex flex-col items-center h-full justify-center gap-12 py-8">
      <div class="flex flex-col items-center gap-4">
        <h1 class="text-3xl font-medium text-center">403</h1>
        <h1 class="text-3xl font-medium text-center">Access Forbidden</h1>
        <p class="text-xl text-center">
          You tried to access a page you did not have prior authorization for.
        </p>
      </div>
    </div>
  );
};

export default page;
