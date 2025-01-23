import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ResponsiveLine } from "@nivo/line";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { chartTheme } from "~/components/ui/ChartContainer";

export function BuildsPreviewSection() {
  const previewStats = [
    { label: "Infernalist Players", value: "32.4%", subtext: "Most Popular Class" },
    { label: "Average Level", value: "95", subtext: "End-game Builds" },
    { label: "Hardcore Ratio", value: "18.5%", subtext: "HC + HC SSF" },
    { label: "Unique Builds", value: "2.5K+", subtext: "Build Diversity" },
  ];

  const lineData = [
    {
      id: "Active Builds",
      data: [
        { x: "Dec 15", y: 850 },
        { x: "Dec 22", y: 1450 },
        { x: "Dec 29", y: 1850 },
        { x: "Jan 5", y: 2100 },
        { x: "Jan 12", y: 2350 },
        { x: "Jan 19", y: 2500 },
      ],
    },
  ];

  return (
    <div className="w-full overflow-hidden py-16 md:py-24">
      <Container className="max-w-7xl px-6 md:px-8 lg:px-10">
        <Text
          variant="h3"
          className="tracking-tight mb-2 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
        >
          Build Analytics
        </Text>
        <Text variant="body-lg" className="text-xl text-muted-foreground leading-relaxed mb-12">
          Discover trending builds, analyze class distributions, and find your next character.
        </Text>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {previewStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-background/95 border border-border/50"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-foreground/80">{stat.label}</div>
              <div className="text-xs text-foreground/60">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>

        <div className="h-[160px] mb-12">
          <ResponsiveLine
            data={lineData}
            margin={{ top: 30, right: 5, bottom: 40, left: 5 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 500,
              max: 3000,
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 0,
              tickPadding: 12,
              tickRotation: -25,
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 12,
              tickValues: 5,
              format: value => `${Number(value).toLocaleString()}`,
            }}
            enablePoints={true}
            pointSize={8}
            pointColor="hsl(var(--background))"
            pointBorderWidth={2}
            pointBorderColor="hsl(var(--primary))"
            enableGridX={true}
            gridXValues={6}
            enableGridY={true}
            gridYValues={5}
            colors={["hsl(var(--primary))"]}
            theme={{
              ...chartTheme,
              grid: {
                line: {
                  stroke: "hsl(var(--border))",
                  strokeWidth: 1,
                  strokeOpacity: 0.5,
                },
              },
              crosshair: {
                line: {
                  stroke: "hsl(var(--primary))",
                  strokeWidth: 1,
                  strokeOpacity: 0.35,
                },
              },
            }}
            lineWidth={2}
            enableArea={true}
            areaBaselineValue={500}
            areaOpacity={0.1}
            isInteractive={true}
            useMesh={true}
            enableSlices="x"
            crosshairType="x"
            role="presentation"
            tooltip={({ point }) => (
              <div className="bg-background/95 border border-border/50 p-3 rounded-md shadow-lg">
                <div className="text-sm font-medium text-foreground/80">{String(point.data.x)}</div>
                <div className="text-base font-semibold text-foreground">
                  {Number(point.data.y).toLocaleString()} builds
                </div>
              </div>
            )}
          />
        </div>

        <Link 
          href="/builds"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <span className="text-lg font-medium text-primary">View Build Analytics</span>
          <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
        </Link>
      </Container>
    </div>
  );
}
