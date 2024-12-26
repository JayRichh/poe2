import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";

interface LayoutProps {
  children: React.ReactNode;
}

export default function NewBuildLayout({ children }: LayoutProps) {
  return (
    <BuildPlannerLayout
      title="Create New Build"
      description="Create a new Path of Exile 2 build to plan your character progression, equipment, and skills."
    >
      {children}
    </BuildPlannerLayout>
  );
}
