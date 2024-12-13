import { Container } from "~/components/ui/Container";
import { Spinner } from "~/components/ui/Spinner";

export default function GiftsLoading() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner size="lg" />
      </div>
    </Container>
  );
}
