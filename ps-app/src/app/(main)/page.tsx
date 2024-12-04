import ProjectCarousel from "@/components/projectCard/projectCarousel";
import { ListProvider } from "@/components/providers/ProjectProvider";
export default function Home() {
  return (
    <>
      <ListProvider>
        <ProjectCarousel />
      </ListProvider>
    </>
  );
}
