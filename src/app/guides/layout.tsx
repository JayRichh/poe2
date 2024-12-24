import { ContentLayout } from "~/components/shared/ContentLayout";
import { GuideSidebar } from "~/components/guides/GuideSidebar";

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout
      title="POE2 Guides"
      description="Comprehensive guides for Path of Exile 2"
      sidebar={<GuideSidebar />}
    >
      {children}
    </ContentLayout>
  );
}
