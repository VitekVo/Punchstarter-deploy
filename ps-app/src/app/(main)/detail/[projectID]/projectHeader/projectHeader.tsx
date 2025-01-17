import ProjectProgress from "@/components/projectDetail/progress/projectProgress";
import React, { useRef, useState } from "react";
import { IProject } from "@/utils/types/types";
import Button from "@/components/button/Button";
import { DonateWindow } from "@/components/donateWindow/donateWindow";
import { useUserContext } from "@/context/UserContext";
import { url } from "../../../../../../config/axiosInstance";

const ProjectHeader = ({ project }: { project: IProject }) => {
  const modalRef = useRef<{ openModal: () => void; closeModal: () => void }>(
    null,
  );
  const { user } = useUserContext();
  const [projectData, setProjectData] = useState(project);

  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    }
  };

  const imgUrl =
    project.images.length > 0
      ? `data:image/png;base64,${Buffer.from(project.images[0]).toString(
          "base64",
        )}`
      : "/path/to/placeholder-image.png";

  const refreshProjectProgress = async () => {
    const response = await fetch(`${url}/projects/${project._id}`);
    const updatedProject = await response.json();

    setProjectData(updatedProject);
  };

  return (
    <div className="flex lg:flex-row flex-col gap-8 h-full">
      <div className="flex flex-col lg:w-1/3 border rounded-lg p-4 justify-between">
        <div className={"flex flex-col gap-4"}>
          <h2 className={"text-xl font-bold uppercase"}>{project.title}</h2>

          <ProjectProgress
            variant={"detail"}
            sum={projectData.sum}
            goalAmount={project.goalAmount}
            backers={project.followCount}
            deadline={project.deadline}
          />
        </div>
        <Button
          onClick={handleOpenModal}
          text={"PODPOŘIT"}
          isDisabled={user ? false : true}
        ></Button>
        <DonateWindow
          ref={modalRef}
          projectId={project._id}
          refresh={refreshProjectProgress}
        />
      </div>
      <div className="rounded-lg overflow-clip flex-grow">
        {project.images.length > 0 ? (
          <img
            className="h-full w-full object-cover"
            src={imgUrl} // Dynamically display the image
          />
        ) : (
          <img
            className="h-full w-full object-cover"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectHeader;
