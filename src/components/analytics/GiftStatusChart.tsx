"use client";

import { useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Select } from "~/components/ui/Select";
import type { GiftAnalytics } from "~/types/gift-list";

interface GiftStatusChartProps {
  data: GiftAnalytics;
}

type ViewType = "status" | "tags" | "priceRanges" | "monthly";

interface MonthlyDataPoint {
  x: string;
  y: number;
}

interface LineDataSeries {
  id: string;
  data: MonthlyDataPoint[];
}

export function GiftStatusChart({ data }: GiftStatusChartProps) {
  const [viewType, setViewType] = useState<ViewType>("status");

  const statusData = data.statusBreakdown.map(status => ({
    id: status.status,
    label: status.status.charAt(0).toUpperCase() + status.status.slice(1),
    value: status.count,
  }));

  const tagData = data.tagBreakdown
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(tag => ({
      tag: tag.tag,
      count: tag.count,
    }));

  const priceRangeData = data.priceRangeBreakdown.map(range => ({
    range: range.range.label,
    count: range.count,
  }));

  const monthlyData: LineDataSeries[] = [{
    id: "Monthly Spending",
    data: data.monthlySpending.map(month => ({
      x: month.month,
      y: month.spent,
    }))
  }];

  const statusColors = {
    planned: "hsl(var(--primary))",
    purchased: "hsl(var(--warning))",
    delivered: "hsl(var(--success))",
  };

  const commonTheme = {
    background: "transparent",
    textColor: "hsl(var(--foreground))",
    fontSize: 11,
    axis: {
      domain: {
        line: {
          stroke: "hsl(var(--border))",
          strokeWidth: 1,
        },
      },
      ticks: {
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
      },
    },
    tooltip: {
      container: {
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        fontSize: "12px",
        borderRadius: "4px",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        padding: "4px 8px",
      },
    },
  };

  const renderChart = () => {
    switch (viewType) {
      case "status":
        return (
          <ResponsivePie
            data={statusData}
            margin={{ top: 20, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={d => statusColors[d.id as keyof typeof statusColors]}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="hsl(var(--foreground))"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            theme={commonTheme}
          />
        );

      case "tags":
        return (
          <ResponsiveBar
            data={tagData}
            keys={["count"]}
            indexBy="tag"
            margin={{ top: 20, right: 40, bottom: 80, left: 120 }}
            padding={0.3}
            layout="horizontal"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            theme={commonTheme}
          />
        );

      case "priceRanges":
        return (
          <ResponsiveBar
            data={priceRangeData}
            keys={["count"]}
            indexBy="range"
            margin={{ top: 20, right: 40, bottom: 80, left: 80 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            borderColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 1.6]],
            }}
            theme={commonTheme}
          />
        );

      case "monthly":
        return (
          <ResponsiveLine
            data={monthlyData}
            margin={{ top: 20, right: 40, bottom: 80, left: 80 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
            }}
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: -45,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (value) => `$${value}`,
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            theme={commonTheme}
          />
        );
    }
  };

  const getViewTitle = () => {
    switch (viewType) {
      case "status": return "Gift Status Distribution";
      case "tags": return "Top 10 Gift Tags";
      case "priceRanges": return "Gifts by Price Range";
      case "monthly": return "Monthly Spending Trends";
    }
  };

  return (
    <Card noPadding className="h-full">
      <CardContent className="p-4 h-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Select
                value={viewType}
                onChange={(value) => setViewType(value as ViewType)}
                options={[
                  { value: "status", label: "Gift Status" },
                  { value: "tags", label: "Popular Tags" },
                  { value: "priceRanges", label: "Price Ranges" },
                  { value: "monthly", label: "Monthly Spending" },
                ]}
              />
              <Text className="text-lg font-medium">{getViewTitle()}</Text>
            </div>
            <div className="text-right">
              <Text className="text-sm text-foreground-secondary">
                Total Gifts: {data.totalGifts}
              </Text>
              {viewType === "monthly" && (
                <Text className="text-sm text-foreground-secondary mt-1">
                  Avg Monthly: ${(data.monthlySpending.reduce((acc, month) => acc + month.spent, 0) / 
                    Math.max(1, data.monthlySpending.length)).toFixed(2)}
                </Text>
              )}
            </div>
          </div>

          <div className="flex-1 min-h-[300px]">
            {renderChart()}
          </div>

          {viewType === "priceRanges" && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {data.priceRangeBreakdown.map((range) => (
                <div 
                  key={range.range.label}
                  className="p-3 border border-border rounded-lg"
                >
                  <Text className="font-medium">{range.range.label}</Text>
                  <div className="text-sm text-foreground-secondary">
                    <div>Count: {range.count} gifts</div>
                    <div>
                      {((range.count / data.totalGifts) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
