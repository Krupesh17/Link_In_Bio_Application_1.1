import React, { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Cell, Pie, PieChart } from "recharts";
import { MonitorSmartphone } from "lucide-react";

const LinkClickDeviceAnalyticsChart = ({ time_period, clicks_Data }) => {
  const [deviceClickChartData, setDeviceClickChartData] = useState([]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#006635",
    },
    mobile: {
      label: "Mobile",
      color: "#00582d",
    },
    tablet: {
      label: "Tablet",
      color: "#004a25",
    },
    other: {
      label: "Other",
      color: "#003c1d",
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

    const filteredClicks = clicks_Data.filter((click) => {
      const clickDate = new Date(click.created_at);
      return clickDate >= startDate && clickDate <= endDate;
    });

    const deviceTypes = ["desktop", "mobile", "tablet", "other"];
    const deviceColors = {
      desktop: "#004D29",
      mobile: "#006635",
      tablet: "#338F5D",
      other: "#66B98B",
    };

    const deviceCounts = filteredClicks.reduce((acc, click) => {
      acc[click.device] = (acc[click.device] || 0) + 1;
      return acc;
    }, {});

    const deviceChartData = deviceTypes.map((device) => ({
      device: device,
      label: device.charAt(0).toUpperCase() + device.slice(1),
      count: deviceCounts[device] || 0,
      fill: deviceColors[device],
    }));

    setDeviceClickChartData(deviceChartData);
  }, [time_period, clicks_Data]);

  const isDeviceDataAvailable = () => {
    try {
      const result = deviceClickChartData?.filter((device) => {
        return device?.count > 0;
      });

      return result?.length > 0 ? true : false;
    } catch (error) {
      console.error(error?.message);
    }
  };

  return isDeviceDataAvailable() ? (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[280px] max-h-[280px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Pie
            data={deviceClickChartData}
            innerRadius={60}
            paddingAngle={2}
            cornerRadius={2}
            dataKey="count"
            nameKey="device"
          >
            {deviceClickChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>

          <ChartLegend
            content={<ChartLegendContent nameKey="device" />}
            verticalAlign="bottom"
            align="center"
            className="flex-wrap gap-2 *:basis-1/4 *:justify-start p-0"
          />
        </PieChart>
      </ChartContainer>
    </div>
  ) : (
    <div className="flex items-center justify-center h-full text-copy-light flex-grow">
      <div className="text-center">
        <MonitorSmartphone
          size={40}
          strokeWidth={1}
          className="mx-auto mb-2 text-copy-lighter"
        />

        <p className="font-medium">
          No device data available for this selection.
        </p>
      </div>
    </div>
  );
};

export default LinkClickDeviceAnalyticsChart;
