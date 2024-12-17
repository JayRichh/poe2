"use client";

import { motion } from "framer-motion";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Spinner } from "~/components/ui/Spinner";
import { BudgetChart } from "~/components/analytics/BudgetChart";
import { GiftStatusChart } from "~/components/analytics/GiftStatusChart";

export default function AnalyticsPage() {

  return (
    <div className="min-h-screen pb-16">
      <Container className="py-8">
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <Text variant="h1" className="text-5xl font-bold">
              Analytics & Insights
            </Text>
            <Text className="text-foreground-secondary max-w-2xl text-lg">
              Track stuff 
            </Text>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <span>i am chart</span>
          </div>
</div>
      </Container>
    </div>
  );
}
