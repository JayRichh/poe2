import { type PropsWithChildren } from "react";

export default function AscendanciesLayout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8">{children}</div>
    </div>
  );
}
