import { PageLoading } from "~/components/shared/PageLoading";
import { Container } from "~/components/ui/Container";

export default function DPSCalcLoading() {
  return (
    <Container className="py-6 md:py-8">
      <PageLoading />
    </Container>
  );
}
