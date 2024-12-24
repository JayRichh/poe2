import { Container } from "~/components/ui/Container";
import { Spinner } from "~/components/ui/Spinner";

export default function MechanicsLoading() {
  return (
    <Container className="py-8">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" variant="primary" />
      </div>
    </Container>
  );
}
