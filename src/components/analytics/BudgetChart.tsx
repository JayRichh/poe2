"use client";

import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Card, CardContent } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { Select } from "~/components/ui/Select";
import type { BudgetAnalytics } from "~/types/gift-list";

interface BudgetChartProps {
  data: BudgetAnalytics;
}

type ViewType = "groups" | "members" | "priceRanges";

type BarChartData = { 
  group: string; 
  budget?: number; 
  spent?: number;
  count?: number;
}[];

export function BudgetChart({ data }: BudgetChartProps) {
  const [viewType, setViewType] = useState<ViewType>("groups");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getChartData = (): BarChartData => {
    if (!data) return [];

    switch (viewType) {
      case "groups":
        return data.groupBreakdown.map(group => ({
          group: group.groupName,
          budget: Number(group.budget.toFixed(2)),
          spent: Number(group.spent.toFixed(2)),
        }));

      case "members":
        return data.groupBreakdown.flatMap(group => 
          group.memberBreakdown?.map(member => ({
            group: `${group.groupName} - ${member.memberName}`,
            budget: Number(member.budget.toFixed(2)),
            spent: Number(member.spent.toFixed(2)),
          })) || []
        );

      case "priceRanges":
        return data.priceRangeBreakdown.map(range => ({
          group: range.range.label,
          count: range.count,
          spent: Number(range.totalSpent.toFixed(2)),
        }));

      default:
        return [];
    }
  };

  const chartData = getChartData();
  const remainingBudget = data?.remainingAmount ?? 0;
  const isOverBudget = remainingBudget < 0;

  const commonTheme = {
    background: "transparent",
    textColor: "hsl(var(--foreground))",
    fontSize: 12,
    axis: {
      domain: {
        line: {
          stroke: "hsl(var(--foreground) / 0.2)",
          strokeWidth: 1,
        },
      },
      legend: {
        text: {
          fill: "hsl(var(--foreground))",
          fontSize: 12,
        },
      },
      ticks: {
        line: {
          stroke: "hsl(var(--foreground) / 0.2)",
          strokeWidth: 1,
        },
        text: {
          fill: "hsl(var(--foreground) / 0.8)",
          fontSize: 11,
          fontWeight: 500,
        },
      },
    },
    grid: {
      line: {
        stroke: "hsl(var(--foreground) / 0.1)",
        strokeWidth: 1,
      },
    },
    legends: {
      text: {
        fill: "hsl(var(--foreground))",
        fontSize: 12,
        fontWeight: 500,
      },
    },
    tooltip: {
      container: {
        background: "hsl(var(--background))",
        color: "hsl(var(--foreground))",
        fontSize: "12px",
        borderRadius: "8px",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        padding: "6px 10px",
      },
    },
  };

  const getBarChartKeys = () => {
    if (viewType === "priceRanges") {
      return ["count", "spent"];
    }
    return ["budget", "spent"];
  };

  const getChartMargins = () => {
    const baseMargins = { top: 20, bottom: 50 };
    
    const rightMargin = viewType === "priceRanges" ? 80 : 120;
    const leftMargin = viewType === "members" ? 140 : 100;
    
    return { ...baseMargins, right: rightMargin, left: leftMargin };
  };

  if (!mounted) {
    return null;
  }

  return (
    <Card noPadding className="h-full">
      <CardContent className="flex flex-col p-4 h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Select
              value={viewType}
              onChange={(value) => setViewType(value as ViewType)}
              options={[
                { value: "groups", label: "By Groups" },
                { value: "members", label: "By Members" },
                { value: "priceRanges", label: "By Price Range" },
              ]}
            />
            <Text 
              className={`text-sm font-medium ${
                isOverBudget ? "text-error" : "text-success"
              }`}
            >
              {isOverBudget ? "Over Budget" : "Remaining"}: ${Math.abs(remainingBudget).toFixed(2)}
            </Text>
          </div>
        </div>

        <div className="h-[500px] w-full">
          <ResponsiveBar
            data={chartData}
            keys={getBarChartKeys()}
            indexBy="group"
            margin={getChartMargins()}
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
              format: value => value,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: value => 
                viewType === "priceRanges" && getBarChartKeys()[0] === "count"
                  ? value.toFixed(0)
                  : `$${Number(value).toFixed(2)}`,
            }}
            enableLabel={true}
            label={d => {
              if (typeof d.value !== "number") return "";
              return viewType === "priceRanges" && getBarChartKeys()[0] === "count"
                ? d.value.toFixed(0)
                : `$${d.value.toFixed(2)}`;
            }}
            labelSkipWidth={32}
            labelSkipHeight={32}
            labelTextColor={{
              from: "color",
              modifiers: [["darker", 2]],
            }}
            valueFormat={value => 
              typeof value === "number" 
                ? viewType === "priceRanges" && getBarChartKeys()[0] === "count"
                  ? value.toFixed(0)
                  : `$${value.toFixed(2)}`
                : value
            }
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 0.8,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Budget overview chart"
            theme={commonTheme}
          />
        </div>

        {viewType === "priceRanges" && (
          <div className="mt-6 border-t border-border pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.priceRangeBreakdown.map((range) => (
                <div 
                  key={range.range.label}
                  className="p-4 border border-border rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                >
                  <Text className="font-medium mb-2">{range.range.label}</Text>
                  <div className="space-y-1 text-sm text-foreground/60">
                    <div>Count: {range.count} gifts</div>
                    <div>Total: ${range.totalSpent.toFixed(2)}</div>
                    <div>
                      Avg: ${(range.totalSpent / (range.count || 1)).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
