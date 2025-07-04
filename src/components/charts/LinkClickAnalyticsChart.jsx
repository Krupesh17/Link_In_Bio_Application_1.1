import React, { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const LinkClickAnalyticsChart = ({
  time_period,
  clicks_Data,
  setTotalClicks,
}) => {
  const [clickChartData, setClickChartData] = useState([]);

  const chartConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--chart-1))",
    },
  };

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();

    switch (time_period) {
      case "last7days":
        startDate.setDate(startDate.getDate() - 6); // 6 days back + today = 7 days total
        break;
      case "last28days":
        startDate.setDate(startDate.getDate() - 27); // 27 days back + today = 28 days total
        break;
      case "last3months":
        startDate.setMonth(startDate.getMonth() - 3);
        break;
      default:
        startDate.setDate(startDate.getDate() - 6); // Default to 7 days
    }

    // Set time to start of day for startDate and end of day for endDate to ensure full day coverage
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const dailyData = [];
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toDateString();
      const clicksForDate = clicks_Data.filter((click) => {
        const clickDate = new Date(click.created_at).toDateString();
        return clickDate === dateStr;
      }).length;

      let dateLabel;
      if (time_period === "last3months") {
        dateLabel = d.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      } else {
        dateLabel = d.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
      }

      dailyData.push({
        date: dateLabel,
        fullDate: d.toISOString().split("T")[0],
        clicks: clicksForDate,
      });
    }

    setClickChartData(dailyData);
  }, [time_period]);

  useEffect(() => {
    const totalClicks = clickChartData.reduce(
      (sum, item) => sum + item.clicks,
      0
    );
    setTotalClicks(totalClicks);
  }, [clickChartData]);

  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto w-full h-full px-4"
      >
        <LineChart accessibilityLayer data={clickChartData}>
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="date"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="dot"
                nameKey="clicks"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
              />
            }
          />

          <Line
            type="monotone"
            dataKey="clicks"
            stroke="hsl(var(--alternative))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </>
  );
};

export default LinkClickAnalyticsChart;
