import { Card } from "@/components/ui/card";
import { useState } from "react";

interface WeekData {
  id: string;
  dates: string;
  theme: 'adventurous' | 'courageous' | 'reflective' | 'creative' | 'peaceful' | 'growth' | 'grateful';
  summary: string;
  patterns: string[];
}

const MOCK_WEEKS: WeekData[] = [
  {
    id: '1',
    dates: 'Dec 23-29',
    theme: 'reflective',
    summary: 'A week of deep introspection and year-end contemplation.',
    patterns: ['Evening journaling routine', 'Gratitude practice', 'Self-reflection']
  },
  {
    id: '2', 
    dates: 'Dec 16-22',
    theme: 'grateful',
    summary: 'Focused on appreciation and connecting with loved ones.',
    patterns: ['Family time', 'Appreciation notes', 'Holiday traditions']
  },
  {
    id: '3',
    dates: 'Dec 9-15',
    theme: 'growth',
    summary: 'Learning new skills and pushing comfort zones.',
    patterns: ['Skill development', 'Challenge-seeking', 'Personal goals']
  }
];

const themeColors = {
  adventurous: 'bg-theme-adventurous',
  courageous: 'bg-theme-courageous', 
  reflective: 'bg-theme-reflective',
  creative: 'bg-theme-creative',
  peaceful: 'bg-theme-peaceful',
  growth: 'bg-theme-growth',
  grateful: 'bg-theme-grateful'
};

export const WeeklyOverview = () => {
  const [selectedWeek, setSelectedWeek] = useState<WeekData | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Weekly Insights</h2>
        <span className="text-sm text-muted-foreground">Tap a week to explore</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_WEEKS.map((week) => (
          <Card
            key={week.id}
            className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              themeColors[week.theme]
            } text-white border-0`}
            onClick={() => setSelectedWeek(selectedWeek?.id === week.id ? null : week)}
          >
            <div className="text-center">
              <div className="text-sm font-medium opacity-90">{week.dates}</div>
              <div className="text-lg font-semibold mt-1 capitalize">{week.theme}</div>
            </div>
          </Card>
        ))}
      </div>

      {selectedWeek && (
        <Card className="p-6 bg-card border border-border shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${themeColors[selectedWeek.theme]}`} />
              <h3 className="text-xl font-semibold capitalize">{selectedWeek.theme} Week</h3>
              <span className="text-sm text-muted-foreground">({selectedWeek.dates})</span>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Weekly Summary</h4>
              <p className="text-muted-foreground">{selectedWeek.summary}</p>
            </div>
            
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