"use client";

import { motion } from "framer-motion";
import { useAnalytics } from "~/hooks/gift-list";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Spinner } from "~/components/ui/Spinner";
import { BudgetChart } from "~/components/analytics/BudgetChart";
import { GiftStatusChart } from "~/components/analytics/GiftStatusChart";

export default function AnalyticsPage() {
  const {
    budgetAnalytics,
    giftAnalytics,
    loading,
    error,
  } = useAnalytics();

  if (loading) {
    return (
      <Container className="min-h-screen py-8">
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="min-h-screen py-8">
        <div className="flex justify-center items-center h-[60vh]">
          <Text className="text-error">Error loading analytics. Please try again later.</Text>
        </div>
      </Container>
    );
  }

  if (!budgetAnalytics || !giftAnalytics) {
    return (
      <Container className="min-h-screen py-8">
        <div className="flex justify-center items-center h-[60vh]">
          <Text className="text-foreground-secondary">
            No data available. Start by adding some gifts!
          </Text>
        </div>
      </Container>
    );
  }

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
              Track your gift-giving progress, budget allocation, and popular categories
              across all your groups.
            </Text>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
            >
              <Text className="text-foreground-secondary mb-2">Total Budget</Text>
              <Text variant="h3" className="text-3xl font-bold">
                ${budgetAnalytics.totalBudget.toFixed(2)}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
            >
              <Text className="text-foreground-secondary mb-2">Total Spent</Text>
              <Text variant="h3" className="text-3xl font-bold">
                ${budgetAnalytics.spentAmount.toFixed(2)}
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50"
            >
              <Text className="text-foreground-secondary mb-2">Total Gifts</Text>
              <Text variant="h3" className="text-3xl font-bold">
                {giftAnalytics.totalGifts}
              </Text>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="space-y-12">
            {/* Budget Overview */}
            <div className="space-y-6">
              <Text variant="h2" className="text-3xl font-bold">
                Budget Overview
              </Text>
              <div className="flex-1">
                <BudgetChart data={budgetAnalytics} />
              </div>
            </div>

            {/* Gift Status Overview */}
            <div className="space-y-6">
              <Text variant="h2" className="text-3xl font-bold">
                Gift Status & Categories
              </Text>
              <div className="h-[500px] w-full">
                <GiftStatusChart data={giftAnalytics} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
