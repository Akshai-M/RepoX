import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

type TrendVariant = "up" | "down" | "neutral";

export type AnalyticsTone =
  | "total"
  | "assigned"
  | "completed"
  | "overdue"
  | "incomplete";

interface AnalyticsCardProps {
  title: string;
  value: number;
  variant?: TrendVariant;
  /** Shown next to optional trend caret (counts, deltas, percentages). */
  badgeValue?: string | number;
  /** Subtle semantic accent stripe + soft badge hue only (neutral title & KPI). */
  tone?: AnalyticsTone;
}

/** Light inset stripe — color cue without soaking the whole card */
const TONE_STRIP: Record<AnalyticsTone, string> = {
  total:
    "shadow-[inset_3px_0_0_0_rgba(14,165,233,0.38)] dark:shadow-[inset_3px_0_0_0_rgba(56,189,248,0.35)]",
  assigned:
    "shadow-[inset_3px_0_0_0_rgba(139,92,246,0.36)] dark:shadow-[inset_3px_0_0_0_rgba(167,139,250,0.32)]",
  completed:
    "shadow-[inset_3px_0_0_0_rgba(16,185,129,0.38)] dark:shadow-[inset_3px_0_0_0_rgba(52,211,153,0.32)]",
  overdue:
    "shadow-[inset_3px_0_0_0_rgba(244,63,94,0.38)] dark:shadow-[inset_3px_0_0_0_rgba(251,113,133,0.32)]",
  incomplete:
    "shadow-[inset_3px_0_0_0_rgba(245,158,11,0.4)] dark:shadow-[inset_3px_0_0_0_rgba(251,191,36,0.28)]",
};

/** Single quiet card surface — small blue wash matches rest of dashboard */
const CARD_SURFACE =
  "[background-image:radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent),hsl(var(--card))]";

/** Neutral pill; hue only from text at low saturation */
const BADGE_SHELL =
  "border border-border/50 bg-muted/35 dark:bg-background/35";

/** Muted tinted badge copy (neutral variant); keeps hierarchy vs title/KPI */
const TONE_BADGE_TEXT: Record<AnalyticsTone, string> = {
  total: "text-sky-700/90 dark:text-sky-400/80",
  assigned: "text-violet-700/90 dark:text-violet-400/75",
  completed: "text-emerald-700/90 dark:text-emerald-400/75",
  overdue: "text-rose-700/90 dark:text-rose-400/75",
  incomplete: "text-amber-800/90 dark:text-amber-400/72",
};

export const AnalyticsCard = ({
  title,
  value,
  variant = "neutral",
  badgeValue,
  tone,
}: AnalyticsCardProps) => {
  const iconColor =
    variant === "neutral"
      ? "text-muted-foreground"
      : variant === "up"
        ? "text-emerald-500"
        : "text-red-500";
  const trendBadgeText =
    variant === "neutral"
      ? undefined
      : variant === "up"
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-red-600 dark:text-rose-400";
  const Icon = variant === "down" ? FaCaretDown : FaCaretUp;

  const badgeDefaultText = tone
    ? TONE_BADGE_TEXT[tone]
    : "text-muted-foreground";

  return (
    <Card
      className={cn(
        "w-full overflow-hidden border-none shadow-none dark:shadow-[0_22px_55px_-32px_rgba(15,23,42,0.75)]",
        CARD_SURFACE,
        tone && TONE_STRIP[tone],
      )}
    >
      <CardHeader className="p-4">
        <div className="flex items-center justify-between gap-3">
          <CardDescription className="flex items-center gap-x-2 overflow-hidden font-medium">
            <span className="truncate text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {title}
            </span>
          </CardDescription>
          {badgeValue !== undefined &&
            badgeValue !== null &&
            badgeValue !== "" && (
              <div
                className={cn(
                  "flex items-center gap-x-1 rounded-full px-2 py-1 backdrop-blur-sm",
                  BADGE_SHELL,
                )}
              >
                {variant !== "neutral" && (
                  <Icon className={cn(iconColor, "size-4 shrink-0")} />
                )}
                <span
                  className={cn(
                    "truncate text-sm font-medium",
                    trendBadgeText ?? badgeDefaultText,
                  )}
                >
                  {badgeValue}
                </span>
              </div>
            )}
        </div>
        <CardTitle className="text-3xl font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
