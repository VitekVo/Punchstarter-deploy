import React from "react";

const ProjectCard = () => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Project Title</h2>
          <p>
            Description ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptate vero delectus natus tenetur voluptas nisi accusamus aut
            unde corrupti animi eos aperiam maxime deleniti, id sunt assumenda
            architecto consectetur. Iste!
          </p>
          <div className="badge badge-primary p-4">Category</div>
          <div>
            <div className="grid grid-cols-2">
              <div className="flex justify-start text-success text-lg font-bold">
                CZK <br />
                7000
              </div>
              <div className="flex justify-end text-success text-lg font-bold">
                <br />
                10 000
              </div>
            </div>
            <progress
              className="progress progress-success w-full h-3"
              value="70"
              max="100"
            ></progress>
          </div>
          <div className="grid grid-cols-2 ">
            <div className="flex justify-start font-bold">X Backers</div>
            <div className="flex justify-end font-bold">X days Left</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
