import { MechanicsSidebar } from "~/components/mechanics/MechanicsSidebar";
import { ContentLayout } from "~/components/shared/ContentLayout";

export default function MechanicsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout
      title="Game Mechanics"
      description="Master guide to POE2's elemental and status effect mechanics"
      sidebar={<MechanicsSidebar />}
    >
      {children}
    </ContentLayout>
  );
}
