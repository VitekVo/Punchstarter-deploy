import React from "react";
import { CreateForm } from "@/components/CreateForm/CreateForm";

const page = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <div className="flex justify-center items-center">
        <img
          className="max-w-full max-h-[450px] object-cover rounded-lg"
          src="https://citygospelmovements.org/wp-content/uploads/2020/03/tim-mossholder-bo3SHP58C3g-unsplash.jpg"
          alt="Example"
        />
      </div>

      <div>
        <CreateForm />
      </div>
    </div>
  );
};

export default page;
