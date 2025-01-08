import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { useRandomItems } from "~/hooks/useRandomItems";

import { ItemCarousel } from "./ItemCarousel";

export function ItemsSection() {
  const { topItems, bottomItems } = useRandomItems(20);

  return (
    <div className="w-full overflow-hidden">
      <Container className="max-w-7xl px-6 md:px-8 lg:px-10">
        <Text
          variant="h3"
          className="tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
        >
          Item Details
        </Text>
        <Text variant="body-lg" className="text-xl text-muted-foreground leading-relaxed">
          Utilize all PoE2 Equipment & Item Data for build planning and technical insights.
        </Text>
      </Container>

      <ItemCarousel topItems={topItems} bottomItems={bottomItems} />
    </div>
  );
}
