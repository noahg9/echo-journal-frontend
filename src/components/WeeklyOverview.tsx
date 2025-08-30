import { Card } from "@/components/ui/card";
import { useState } from "react";

interface WeekData {
    id: string;
    year: number;
    weekNumber: number; // 1-52
    theme: 'adventurous' | 'courageous' | 'reflective' | 'creative' | 'peaceful' | 'growth' | 'grateful';
    summary: string;
    patterns: string[];
    dates: string; // new field
}

// Helper to get date range from year + week number
function getWeekDateRange(year: number, weekNumber: number) {
    const firstDayOfYear = new Date(year, 0, 1);
    const dayOffset = (weekNumber - 1) * 7;

    // Adjust to first Monday of the year
    const firstMonday = new Date(firstDayOfYear);
    const day = firstDayOfYear.getDay(); // Sunday = 0
    const offset = day === 0 ? 1 : (8 - day);
    firstMonday.setDate(firstDayOfYear.getDate() + offset);

    const startDate = new Date(firstMonday);
    startDate.setDate(firstMonday.getDate() + dayOffset);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const options = { month: 'short', day: 'numeric' } as const;
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
}

// Mock data spanning multiple years with computed dates
const MOCK_WEEKS: WeekData[] = [
    {
        id: '1', year: 2025, weekNumber: 51, theme: 'reflective',
        summary: 'Year-end introspection', patterns: ['Evening journaling', 'Gratitude'],
        dates: getWeekDateRange(2025, 51)
    },
    {
        id: '2', year: 2025, weekNumber: 50, theme: 'grateful',
        summary: 'Focus on appreciation', patterns: ['Family time', 'Notes'],
        dates: getWeekDateRange(2025, 50)
    },
    {
        id: '3', year: 2024, weekNumber: 49, theme: 'growth',
        summary: 'Learning new skills', patterns: ['Skill development', 'Challenges'],
        dates: getWeekDateRange(2024, 49)
    },
    {
        id: '4', year: 2024, weekNumber: 35, theme: 'adventurous',
        summary: 'Tried new experiences', patterns: ['Hiking', 'New recipe'],
        dates: getWeekDateRange(2024, 35)
    },
];

// Map themes to colors
const themeColors = {
    adventurous: 'bg-theme-adventurous',
    courageous: 'bg-theme-courageous',
    reflective: 'bg-theme-reflective',
    creative: 'bg-theme-creative',
    peaceful: 'bg-theme-peaceful',
    growth: 'bg-theme-growth',
    grateful: 'bg-theme-grateful',
    empty: 'bg-gray-200'
};

export const WeeklyOverview = () => {
    const years = Array.from(new Set(MOCK_WEEKS.map(w => w.year))).sort((a, b) => b - a); // all years descending
    const [selectedYear, setSelectedYear] = useState(years[0]);
    const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);

    // Filter weeks for selected year
    const weeksOfYear = MOCK_WEEKS.filter(w => w.year === selectedYear);

    // Map weekNumber to data for quick access
    const weekMap: Record<number, WeekData | null> = {};
    Array.from({ length: 52 }, (_, i) => i + 1).forEach((weekNum) => {
        const entry = weeksOfYear.find(w => w.weekNumber === weekNum);
        weekMap[weekNum] = entry || null;
    });

    const currentYearIndex = years.indexOf(selectedYear);

    return (
        <div className="space-y-6">
            {/* Year navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => currentYearIndex < years.length - 1 && setSelectedYear(years[currentYearIndex + 1])}
                    disabled={currentYearIndex >= years.length - 1}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    ◀ Previous
                </button>

                <h2 className="text-2xl font-semibold text-foreground">{selectedYear}</h2>

                <button
                    onClick={() => currentYearIndex > 0 && setSelectedYear(years[currentYearIndex - 1])}
                    disabled={currentYearIndex <= 0}
                    className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                    Next ▶
                </button>
            </div>

            {/* 2-row weekly grid */}
            <div
                className="grid gap-1 auto-rows-[24px]"
                style={{ gridTemplateColumns: 'repeat(26, minmax(0, 1fr))' }}
            >
                {Array.from({ length: 52 }, (_, i) => i + 1).map((weekNum) => {
                    const weekData = weekMap[weekNum];
                    const colorClass = weekData ? themeColors[weekData.theme] : themeColors.empty;

                    return (
                        <div
                            key={weekNum}
                            className={`w-6 h-6 cursor-pointer ${colorClass} rounded-sm border border-gray-300`}
                            title={weekData ? `${weekData.theme} Week` : `No entry`}
                            onClick={() =>
                                setSelectedWeek(selectedWeek?.id === weekData?.id ? null : weekData)
                            }
                        />
                    );
                })}
            </div>

            {/* Selected week details */}
            {selectedWeek && (
                <Card className="p-6 bg-card border border-border shadow-xl">
                    <div className="space-y-4">
                        {/* Header with date and theme */}
                        <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${themeColors[selectedWeek.theme]}`} />
                            <h3 className="text-xl font-semibold capitalize">
                                {selectedWeek.dates}, {selectedWeek.year} (Week {selectedWeek.weekNumber}): {selectedWeek.theme}
                            </h3>
                        </div>

                        {/* Weekly Summary */}
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Weekly Summary</h4>
                            <p className="text-muted-foreground">{selectedWeek.summary}</p>
                        </div>

                        {/* Patterns & Themes */}
                        <div>
                            <h4 className="font-medium text-foreground mb-2">Patterns & Themes</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedWeek.patterns.map((pattern, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                                    >
              {pattern}
            </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            )}

        </div>
    );
};
