import Image from "next/image";
import ProjectProgress from "@/components/projectDetail/progress/projectProgress";
import React from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
import { useRef } from "react";
import { DonateWindow } from "@/components/donateWindow/donateWindow";
const ProjectHeader = ({ project }: { project: IProject }) => {
  const modalRef = useRef<{ openModal: () => void; closeModal: () => void }>(
    null
  );

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  const imgUrl =
    project.images.length > 0
      ? `data:image/png;base64,${Buffer.from(project.images[0]).toString(
          "base64"
        )}`
      : "/path/to/placeholder-image.png";
  return (
    <div className="flex lg:flex-row flex-col gap-8 h-full">
      <div className="flex flex-col lg:w-1/3 border rounded-lg p-4 justify-between">
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-xl font-bold uppercase"}>{project.title}</h2>

          <ProjectProgress
            variant={"detail"}
            sum={project.sum}
            goalAmount={project.goalAmount}
            backers={project.followCount}
            deadline={project.deadline}
          />
        </div>
        <Button onClick={handleOpenModal} text={"PODPOŘIT"}></Button>
        <DonateWindow ref={modalRef} projectId={project._id} />
      </div>
      <div className="rounded-lg overflow-clip flex-grow aspect-[16/9]">
        {project.images.length > 0 ? (
          <img
            className="h-full w-full object-contain"
            src={imgUrl} // Dynamically display the image
          />
        ) : (
          <img
            className="h-full w-full object-contain"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectHeader;
