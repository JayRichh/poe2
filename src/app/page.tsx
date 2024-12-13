"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { GiftIcon, ArrowRight, Users, Gift, PieChart } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import { FirstTimeSetup } from "~/components/FirstTimeSetup";
import type { BudgetPreference } from "~/types/gift-list";

const STORAGE_KEYS = {
  SETUP_COMPLETED: 'hasCompletedSetup',
  BUDGET_PREFERENCES: 'budgetPreferences',
};

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFirstTimeSetup, setShowFirstTimeSetup] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);

  useEffect(() => {
    const setupCompleted = localStorage.getItem(STORAGE_KEYS.SETUP_COMPLETED);
    setHasCompletedSetup(!!setupCompleted);
    
    if (searchParams.get('setup') === 'true') {
      setShowFirstTimeSetup(true);
    }
  }, [searchParams]);

  const handleSetupComplete = (preferences: BudgetPreference) => {
    localStorage.setItem(STORAGE_KEYS.SETUP_COMPLETED, 'true');
    localStorage.setItem(STORAGE_KEYS.BUDGET_PREFERENCES, JSON.stringify(preferences));
    router.push('/groups');
  };

  return (
    <>
      <Container>
        <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-16 px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 max-w-2xl mx-auto"
          >
            <div className="flex justify-center">
              <div className="p-6 rounded-full bg-primary/10 dark:bg-primaryDark/10">
                <GiftIcon className="w-16 h-16 text-primary dark:text-primaryDark" />
              </div>
            </div>
            
            <div className="space-y-4">
              <Text variant="h1" className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white">
                Welcome to Gift List
              </Text>
              <Text className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl">
                Your personal gift management assistant. Keep track of gifts, budgets, and make every occasion special.
              </Text>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => hasCompletedSetup ? router.push('/groups') : setShowFirstTimeSetup(true)}
                className="gap-2 text-lg px-8 py-4"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto w-full"
          >
            {/* Feature Cards */}
            {[
              {
                step: "1",
                icon: Users,
                title: "Create Groups",
                description: "Start by creating gift groups for occasions like birthdays or holidays."
              },
              {
                step: "2",
                icon: Gift,
                title: "Track Gifts",
                description: "Add gifts, set budgets, and update status from planned to delivered."
              },
              {
                step: "3",
                icon: PieChart,
                title: "Monitor Progress",
                description: "View spending analytics and track gift-giving patterns."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary/10 dark:bg-primaryDark/10 border border-primary/20 dark:border-primaryDark/20 flex items-center justify-center text-sm font-medium text-primary dark:text-primaryDark">
                  {feature.step}
                </div>
                <feature.icon className="w-10 h-10 mb-4 text-primary dark:text-primaryDark group-hover:text-primary/80 transition-colors" />
                <h3 className="font-semibold text-xl mb-2 text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </Container>

      {/* First Time Setup Modal */}
      <FirstTimeSetup 
        isOpen={showFirstTimeSetup} 
        onComplete={handleSetupComplete}
        onClose={() => setShowFirstTimeSetup(false)}
      />
    </>
  );
}
