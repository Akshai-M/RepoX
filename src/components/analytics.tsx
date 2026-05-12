import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";

/** Share of project's issues (`0` … `100`), using total issues as the denominator */
function pctOfIssues(part: number, total: number) {
  if (total <= 0) return 0;
  return Math.round((part / total) * 100);
}

export const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  if (!data) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const total = data.totalTaskCount;

  const monthTrend = (delta: number): "up" | "down" | "neutral" => {
    if (delta > 0) return "up";
    if (delta < 0) return "down";
    return "neutral";
  };

  return (
    <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-3xl">
      <div className="flex w-full flex-row space-x-4 pb-1">
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            tone="total"
            title="Total Issues"
            value={data.totalTaskCount}
            variant={monthTrend(data.taskDiff)}
            badgeValue={
              `${data.taskDiff >= 0 ? "+" : ""}${data.taskDiff} this month`
            }
          />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            tone="assigned"
            title="Assigned Issues"
            value={data.assignedTaskCount}
            variant="neutral"
            badgeValue={`${pctOfIssues(data.assignedTaskCount, total)}%`}
          />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            tone="completed"
            title="Completed Issues"
            value={data.completedTaskCount}
            variant={
              pctOfIssues(data.completedTaskCount, total) >= 50 ? "up" : "neutral"
            }
            badgeValue={`${pctOfIssues(data.completedTaskCount, total)}%`}
          />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            tone="overdue"
            title="OverDue Issues"
            value={data.overdueTaskCount}
            variant={data.overdueTaskCount > 0 ? "down" : "neutral"}
            badgeValue={`${pctOfIssues(data.overdueTaskCount, total)}%`}
          />
        </div>
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            tone="incomplete"
            title="Incomplete Issues"
            value={data.incompleteTaskCount}
            variant="neutral"
            badgeValue={`${pctOfIssues(data.incompleteTaskCount, total)}%`}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
