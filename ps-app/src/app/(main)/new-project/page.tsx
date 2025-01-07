import React from "react";
import { CreateForm } from "@/components/CreateForm/CreateForm";

const page = () => {
  return (
    <div className="md:grid grid-cols-2 gap-4 w-full h-full">
      <img
        className="w-full h-full object-cover rounded-lg max-md:hidden"
        src="https://citygospelmovements.org/wp-content/uploads/2020/03/tim-mossholder-bo3SHP58C3g-unsplash.jpg"
        alt="Example"
      />

      <div
        className={
          "rounded-lg overflow-hidden bg-cover min-h-[550px] h-full max-md:bg-[url(https://citygospelmovements.org/wp-content/uploads/2020/03/tim-mossholder-bo3SHP58C3g-unsplash.jpg)]"
        }
      >
        <div
          className={
            "w-full h-full backdrop-saturate-[75%] max-md:backdrop-brightness-[35%]"
          }
        >
          <CreateForm />
        </div>
      </div>
    </div>
  );
};

export default page;
