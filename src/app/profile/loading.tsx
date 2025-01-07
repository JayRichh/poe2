import { Spinner } from "~/components/ui/Spinner";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
