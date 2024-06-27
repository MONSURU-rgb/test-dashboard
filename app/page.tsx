"use client";

import { Avatar, Flex, Select, Stack, TextInput, Title } from "@mantine/core";
import {
  Activity,
  ArrowUp,
  ExportCurve,
  NotificationBing,
  SearchNormal,
} from "iconsax-react";
import { LightDark } from "./components";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LineChart } from "@mantine/charts";
import LineGraph from "./components/line-chart";

export default function Home() {
  return (
    <div className="py-1 flex flex-col gap-5">
      <Header />
      <DashboardContent />
    </div>
  );
}

function Header() {
  const { theme } = useTheme();
  return (
    <header className="flex justify-between px-6 pb-2 border-b border-b-[#D9D9D9]">
      <TextInput
        leftSection={<SearchNormal size="16" color="#A8A8A8" />}
        placeholder="Search..."
        classNames={{
          root: "w-1/3 py-3 rounded-xl !bg-none flex",
          input: "!border-none outline-0 bg-none bg-inherit",
          wrapper:
            "flex gap-2 items-center rounded-xl border border-primary-blue rounded-xl px-3 py-2 dark:border-white/50",
        }}
        role="search"
      />
      <section className="flex gap-2 items-center">
        <LightDark />
        <NotificationBing color={"#4880FF"} />
        <Avatar src="/course-instructor-1.svg" alt="it's me" className="w-6" />
      </section>
    </header>
  );
}

function DashboardContent() {
  const { theme } = useTheme();
  const [value, setValue] = useState<Date[] | undefined>(undefined);
  const [dateRanges, setDateRanges] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueChange, setRevenueChange] = useState(0);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 days");
  const [topProducts, setTopProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [insights, setInsights] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [sales, setSales] = useState([]);

  const stateValues = {
    dateRanges,
    totalRevenue,
    revenueChange,
    selectedDateRange,
    topProducts,
    salesData,
    salesByCategory,
    insights,
    recommendations,
    sales,
  };

  console.log("State Values:", stateValues);

  useEffect(() => {
    fetch("/sales.json")
      .then((response) => response.json())
      .then((data) => {
        setDateRanges(data.dateRanges);
        setSales(data);
        updateDataForSelectedRange(data, selectedDateRange);
      })
      .catch((error) => console.error("Error fetching the JSON file:", error));
  }, []);

  const updateDataForSelectedRange = (data: any, dateRange: any) => {
    setTopProducts(data.topSellingProducts[dateRange] || []);
    setSalesData(data.charts.totalSalesOverTime[dateRange]?.data || []);
    setSalesByCategory(data.charts.salesByCategory[dateRange] || []);
    setInsights(data.insightsAndRecommendations[dateRange]?.insights || "");
    setRecommendations(
      data.insightsAndRecommendations[dateRange]?.recommendations || ""
    );
    setTotalRevenue(data.summary.totalSalesValue.value); // Assuming total value is overall, not per date range
    setRevenueChange(data.summary.totalSalesValue.percentageChange); // Assuming percentage change is overall, not per date range

    setSales(data);
  };

  return (
    <section className="flex flex-col gap-4 px-6">
      <div className="flex justify-between items-center gap-5">
        <article>
          <h2 className="dark:text-white">Sales overview</h2>
          <p className="text-[var(--gray)] dark:text-white/90">
            {stateValues.insights}
          </p>
          <p className="text-[var(--gray)] dark:text-white/70 text-sm">
            {stateValues.recommendations}
          </p>
        </article>

        <button className="px-4 py-2 rounded-lg border border-[var(--gray)] flex gap-2 dark:border-[var(--dark-border)] h-fit whitespace-nowrap">
          <ExportCurve
            size="24"
            color={theme === "light" ? "#344054" : "rgb(255 255 255 / 0.7)"}
          />
          <span>Export report</span>
        </button>
      </div>

      <Flex justify="between">
        <button className="px-4 py-2 rounded-lg border border-[var(--gray)] flex gap-2 dark:border-[var(--dark-border)]">
          Default view
        </button>
        {/* <Select
          label="Your favorite library"
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
        /> */}
      </Flex>
      <div className="flex gap-4 overflow-x-auto">
        <RevenueCard salesSummary={stateValues.sales} />
        <RevenueUnit salesSummary={stateValues.sales} />
        {/* <RevenueCard />
        <RevenueCard /> */}
      </div>

      <section className="border border-[var(--gray)] rounded-2xl dark:border-[var(--dark-border)] p-4 grid gap-4">
        <article className="flex justify-between">
          <h2 className="dark:text-white">Sales report</h2>
          <button className="px-4 py-2 rounded-lg border border-[var(--gray)] flex gap-2 dark:border-[var(--dark-border)]">
            <span>Download report</span>
          </button>
        </article>
        <div className="h-[300px]">
          <LineGraph />
        </div>
      </section>
    </section>
  );
}

export function RevenueUnit({ salesSummary }: { salesSummary: any }) {
  const { theme } = useTheme();

  console.log(salesSummary);

  return (
    <div className="p-6 min-w-[300px] border border-[var(--gray)] rounded-2xl dark:border-[var(--dark-border)] flex flex-col gap-3 flex-1 w-[300px]">
      <Flex justify="space-between" className="flex flex-1" align="center">
        <Title order={3}>Total sales in units</Title>
        <Activity
          size="24"
          color={theme === "dark" ? "rgb(255 255 255 / 0.7)" : "#344054"}
        />
      </Flex>

      <article className="flex justify-between gap-4">
        <h2 className="dark:text-white">
          {salesSummary?.summary?.totalSalesValue?.value} units
        </h2>
        <div className="bg-[#ECFDF3] rounded-2xl flex gap-1 px-2 w-fit items-center">
          <ArrowUp size="16" color="#027A48" />

          <span className="text-[#027A48]">
            {" "}
            {salesSummary?.summary?.totalSalesValue?.percentageChange}%
          </span>
        </div>
      </article>
    </div>
  );
}
export function RevenueCard({ salesSummary }: { salesSummary: any }) {
  const { theme } = useTheme();

  console.log(salesSummary);

  return (
    <div className="p-6 min-w-[300px] border border-[var(--gray)] rounded-2xl dark:border-[var(--dark-border)] flex flex-col gap-3 flex-1 whitespace-nowrap">
      <Flex justify="space-between" className="flex flex-1" align="center">
        <Title order={3}>Total sales in value</Title>
        <Activity
          size="24"
          color={theme === "dark" ? "rgb(255 255 255 / 0.7)" : "#344054"}
        />
      </Flex>

      <article className="flex justify-between gap-4">
        <h2 className="dark:text-white">
          ${salesSummary?.summary?.totalSalesUnits?.value}
        </h2>
        <div className="bg-[#ECFDF3] rounded-2xl flex gap-1 px-2 w-fit items-center">
          <ArrowUp size="16" color="#027A48" />

          <span className="text-[#027A48]">
            {" "}
            {salesSummary?.summary?.totalSalesUnits?.percentageChange}%
          </span>
        </div>
      </article>
    </div>
  );
}
