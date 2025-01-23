import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ResponsiveBar } from "@nivo/bar";
import { Text } from "~/components/ui/Text";

interface ChartDataPoint {
  class: string;
  count: number;
  percentage: number;
  tooltipValue: string;
}

interface ComparisonDataPoint {
  class: string;
  tooltipValue: string;
  [key: string]: string | number;
}

import { LadderSelector } from "./LadderSelector";
import { ChartContainer, chartTheme } from "~/components/ui/ChartContainer";
import type { LadderStats } from "../../scripts/ladder-service";

const LADDER_NAMES = ["Standard", "Hardcore", "SSF", "HC SSF"] as const;
type LadderName = typeof LADDER_NAMES[number];
type LadderKey = `${LadderName}_count`;

const customChartTheme = {
  ...chartTheme,
  fontSize: 14,
  axis: {
    ...chartTheme.axis,
    legend: {
      text: {
        fontSize: 14,
        fill: "hsl(var(--foreground))",
      }
    },
    ticks: {
      text: {
        fontSize: 12,
        fill: "hsl(var(--foreground))",
      },
      line: {
        stroke: "hsl(var(--border))",
        strokeWidth: 1,
      },
    },
  },
  grid: {
    line: {
      stroke: "hsl(var(--border))",
      strokeWidth: 1,
      strokeOpacity: 0.5,
    },
  },
  labels: {
    text: {
      fontSize: 12,
      fill: "hsl(var(--foreground))",
    },
  },
};

const gradientColors = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
];

interface StatsOverview {
  totalPlayers: number;
  topClass: {
    name: string;
    count: number;
    percentage: number;
  };
  averageLevel: number;
  uniqueClasses: number;
  top3Classes: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  hardcoreRatio: number;
}

export function BuildStats() {
  const [stats, setStats] = useState<LadderStats | null>(null);
  const [selectedLadder, setSelectedLadder] = useState<string>("overall");
  const [showPercentage, setShowPercentage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [overview, setOverview] = useState<StatsOverview>({
    totalPlayers: 0,
    topClass: { name: "", count: 0, percentage: 0 },
    averageLevel: 0,
    uniqueClasses: 0,
    top3Classes: [],
    hardcoreRatio: 0
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch("/data/ladder-stats.json")
      .then((res) => res.json())
      .then((data: LadderStats) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading ladder stats:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!stats) return;

    const currentData = selectedLadder === "overall" 
      ? stats.overall 
      : stats.ladders[selectedLadder];

    const topClass = currentData.distribution[0];
    const top3 = currentData.distribution.slice(0, 3).map(c => ({
      name: c.className,
      count: c.count,
      percentage: c.percentage
    }));

    const uniqueClassCount = currentData.distribution.length;
    
    const hardcoreTotal = selectedLadder === "overall" 
      ? (stats.ladders["Hardcore"].total + stats.ladders["HC SSF"].total)
      : 0;
    const hardcoreRatio = selectedLadder === "overall"
      ? (hardcoreTotal / currentData.total) * 100
      : 0;
    
    setOverview({
      totalPlayers: currentData.total,
      topClass: {
        name: topClass.className,
        count: topClass.count,
        percentage: topClass.percentage,
      },
      averageLevel: 95,
      uniqueClasses: uniqueClassCount,
      top3Classes: top3,
      hardcoreRatio
    });
  }, [stats, selectedLadder]);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  if (!stats) {
    return <div className="flex justify-center items-center h-96">No data available</div>;
  }

  const currentData = selectedLadder === "overall" 
    ? stats.overall 
    : stats.ladders[selectedLadder];

  const chartData = currentData.distribution.map(item => ({
    class: item.className,
    count: item.count,
    percentage: Number(item.percentage.toFixed(1)),
    tooltipValue: `${item.count} players (${item.percentage.toFixed(1)}%)`
  }));

  const ladderComparisonData: ComparisonDataPoint[] = currentData.distribution.slice(0, isMobile ? 3 : 5).map(item => {
    const classData: ComparisonDataPoint = {
      class: item.className,
      tooltipValue: `${item.count} players (${item.percentage.toFixed(1)}%)`,
    };
    
    LADDER_NAMES.forEach(ladder => {
      const ladderData = stats.ladders[ladder];
      const classStats = ladderData.distribution.find(d => d.className === item.className);
      if (classStats) {
        classData[`${ladder}_count`] = classStats.count;
      }
    });

    return classData;
  });

  const ladderKeys = LADDER_NAMES.map(ladder => `${ladder}_count` as LadderKey);

  return (
    <div className="w-full space-y-6">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Text 
          variant="h2"
          className="tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent text-center"
        >
          Top 1000 Class Distribution
        </Text>
        <Text variant="body-lg" className="text-xl text-muted-foreground leading-relaxed mb-6 text-center px-4">
          Analyze class preferences and meta trends among top 1000 players in each ladder
        </Text>
        <LadderSelector
          selectedLadder={selectedLadder}
          onSelect={setSelectedLadder}
          ladders={LADDER_NAMES}
        />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-3 rounded-lg bg-background/95 border border-border/50"
        >
          <div className="text-sm text-foreground/60">Total Players</div>
          <div className="text-xl font-bold">{overview.totalPlayers}</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-3 rounded-lg bg-background/95 border border-border/50"
        >
          <div className="text-sm text-foreground/60">Top 3 Classes</div>
          {overview.top3Classes.map((cls, idx) => (
            <div key={cls.name} className={idx === 0 ? "text-lg font-bold" : "text-sm"}>
              {idx + 1}. {cls.name}
              <div className="text-xs text-foreground/60">
                {cls.count} ({cls.percentage.toFixed(1)}%)
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-3 rounded-lg bg-background/95 border border-border/50"
        >
          <div className="text-sm text-foreground/60">Class Stats</div>
          <div className="text-lg font-bold">{overview.uniqueClasses}</div>
          <div className="text-xs text-foreground/60">Unique Classes</div>
          {selectedLadder === "overall" && (
            <div className="mt-1">
              <div className="text-sm font-semibold">{overview.hardcoreRatio.toFixed(1)}%</div>
              <div className="text-xs text-foreground/60">Hardcore Players</div>
            </div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-3 rounded-lg bg-background/95 border border-border/50"
        >
          <div className="text-sm text-foreground/60">Class Distribution</div>
          <div className="space-y-1 mt-1">
            {currentData.distribution.slice(0, 4).map((cls) => (
              <div key={cls.className} className="flex justify-between items-center text-xs">
                <span>{cls.className}</span>
                <span className="text-foreground/60">{cls.percentage.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <ChartContainer 
          title="Top 1000 Distribution" 
          chartId="class-distribution"
          description="Distribution of character classes among top 1000 players in the selected ladder"
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowPercentage(!showPercentage)}
            className="px-3 py-1 text-sm rounded-md bg-background/80 border border-border/50 hover:bg-background/60"
          >
            Show {showPercentage ? "Count" : "Percentage"}
          </button>
        </div>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveBar
            data={chartData}
            keys={[showPercentage ? "percentage" : "count"]}
            indexBy="class"
            margin={{
              top: 30,
              right: isMobile ? 30 : 50,
              bottom: isMobile ? 100 : 80,
              left: isMobile ? 60 : 80
            }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={gradientColors}
            theme={customChartTheme}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: isMobile ? -65 : -45,
              legend: "Character Class",
              legendPosition: "middle",
              legendOffset: isMobile ? 85 : 65,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: showPercentage ? "Player Distribution (%)" : "Player Count",
              legendPosition: "middle",
              legendOffset: -50,
            }}
            enableGridY={true}
            gridYValues={5}
            labelSkipWidth={isMobile ? 0 : 12}
            labelSkipHeight={isMobile ? 0 : 12}
            labelTextColor="hsl(var(--background))"
            label={isMobile ? undefined : d => String(d.value) + (showPercentage ? '%' : '')}
            role="application"
            ariaLabel="Class distribution chart"
            barAriaLabel={({ indexValue, value }) => 
              `${String(indexValue)}: ${value} players`}
            tooltip={({ data }: { data: ChartDataPoint }) => (
              <div className="bg-background/95 border border-border/50 p-3 rounded-md shadow-lg">
                <div className="font-semibold mb-1">{data.class}</div>
                <div className="text-sm text-foreground/80">
                  {data.count.toLocaleString()} players
                </div>
                <div className="text-sm text-foreground/60">
                  {data.percentage}% of total
                </div>
              </div>
            )}
          />
        </div>
      </ChartContainer>

      {selectedLadder === "overall" && (
        <ChartContainer 
          title="Top Classes Across Ladders" 
          chartId="ladder-comparison"
          description="Comparison of top classes among the top 1000 players in each ladder type"
        >
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveBar
              data={ladderComparisonData}
              keys={ladderKeys}
              indexBy="class"
              groupMode="grouped"
              margin={{
                top: 30,
                right: isMobile ? 30 : 130,
                bottom: isMobile ? 100 : 80,
                left: isMobile ? 60 : 80
              }}
              padding={0.2}
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={gradientColors}
              theme={customChartTheme}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: isMobile ? -65 : -45,
                legend: "Character Class",
                legendPosition: "middle",
                legendOffset: isMobile ? 85 : 65,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Player Count",
                legendPosition: "middle",
                legendOffset: -50,
              }}
              enableGridY={true}
              gridYValues={5}
              labelSkipWidth={isMobile ? 0 : 12}
              labelSkipHeight={isMobile ? 0 : 12}
              labelTextColor="hsl(var(--background))"
              label={isMobile ? undefined : d => String(d.data[d.id as keyof ComparisonDataPoint])}
              legends={isMobile ? [] : [
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Ladder comparison chart"
              barAriaLabel={({ id, value }) => 
                `${String(id)}: ${value} players`}
              tooltip={({ id, value, indexValue }) => {
                const ladder = (typeof id === 'string' ? id.split('_')[0] : '') as LadderName;
                return (
                  <div className="bg-background/95 border border-border/50 p-3 rounded-md shadow-lg">
                    <div className="font-semibold mb-1">{indexValue}</div>
                    <div className="text-sm text-foreground/80">
                      {Number(value).toLocaleString()} players
                    </div>
                    <div className="text-sm text-foreground/60">
                      {ladder} Ladder
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </ChartContainer>
      )}
    </div>
  );
}
