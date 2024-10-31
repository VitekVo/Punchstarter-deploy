import Image from "next/image";
import ProjectCard from "@/components/projectCard";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <ProjectCard />;
    </>
  );
}
