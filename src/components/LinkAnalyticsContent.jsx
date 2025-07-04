import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  LinkClickAnalyticsChart,
  LinkClickDeviceAnalyticsChart,
  LinkClickLocationAnalyticsChart,
} from "./charts";
import { Button } from "./ui/button";

const chartNavigationButtons = [
  { name: "Daily", slug: "daily" },
  { name: "Devices", slug: "devices" },
  { name: "Locations", slug: "locations" },
];

const LinkAnalyticsContent = ({ linkData }) => {
  const { clicks } = useSelector((state) => state?.dashboard);

  const clicksData = clicks?.filter((click) => {
    return click?.link_id === linkData?.id;
  });

  const [activeTab, setActiveTab] = useState("daily");
  const [timePeriod, setTimePeriod] = useState("last7days");
  const [totalClicks, setTotalClicks] = useState(0);

  return (
    <div className="w-full">
      <section className="flex items-center justify-between px-4 pb-4 border-b border-border">
        <div className="flex items-center gap-1.5">
          <Calendar size={16} strokeWidth={2} />
          <p className="text-sm font-semibold text-wrap">Time Period</p>
        </div>
        <Select
          defaultValue={timePeriod}
          onValueChange={(value) => setTimePeriod(value)}
        >
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last28days">Last 28 days</SelectItem>
              <SelectItem value="last3months">Last 3 months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      <section className="p-4">
        <div className="flex lg:items-center lg:justify-between max-lg:flex-col gap-2 mb-4">
          <div className="flex flex-col">
            <h3 className="text-base text-copy font-semibold">
              Click Analytics
            </h3>
            <p className="text-sm text-copy-lighter text-wrap">
              Keep track of when, where, and on what devices your links are clicked.
            </p>
          </div>
          <div className="text-sm text-copy-light">
            {timePeriod === "last7days" && "Last 7 days"}
            {timePeriod === "last28days" && "Last 28 days"}
            {timePeriod === "last3months" && "Last 3 months"} • {totalClicks}{" "}
            clicks
          </div>
        </div>
        <ul className="flex space-x-2 border-b border-border">
          {chartNavigationButtons?.map((button, index) => (
            <li key={index}>
              <Button
                type="button"
                variant="link"
                className={`!no-underline rounded-none px-1.5 font-medium text-sm text-copy-lighter border-b-2 border-transparent hover:text-copy focus-visible:text-copy ${
                  activeTab === button?.slug && "text-copy border-primary"
                }`}
                onClick={() => setActiveTab(button?.slug)}
              >
                {button?.name}
              </Button>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full h-80">
        {activeTab === "daily" && (
          <LinkClickAnalyticsChart
            time_period={timePeriod}
            clicks_Data={clicksData}
            setTotalClicks={setTotalClicks}
          />
        )}

        {activeTab === "devices" && (
          <LinkClickDeviceAnalyticsChart
            time_period={timePeriod}
            clicks_Data={clicksData}
          />
        )}

        {activeTab === "locations" && (
          <LinkClickLocationAnalyticsChart
            time_period={timePeriod}
            clicks_Data={clicksData}
          />
        )}
      </section>
    </div>
  );
};

export default LinkAnalyticsContent;
