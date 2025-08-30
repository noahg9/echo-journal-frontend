import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Smile, Meh, Frown } from "lucide-react";

interface MoodData {
  date: string;
  mood: 'happy' | 'neutral' | 'sad';
  intensity: number;
}

const MOCK_MOOD_DATA: MoodData[] = [
  { date: '2024-01-01', mood: 'happy', intensity: 8 },
  { date: '2024-01-02', mood: 'neutral', intensity: 6 },
  { date: '2024-01-03', mood: 'happy', intensity: 9 },
  { date: '2024-01-04', mood: 'neutral', intensity: 7 },
  { date: '2024-01-05', mood: 'happy', intensity: 8 },
  { date: '2024-01-06', mood: 'sad', intensity: 4 },
  { date: '2024-01-07', mood: 'neutral', intensity: 6 },
];

const getMoodIcon = (mood: string) => {
  switch (mood) {
    case 'happy':
      return <Smile className="w-4 h-4 text-green-600" />;
    case 'neutral':
      return <Meh className="w-4 h-4 text-yellow-600" />;
    case 'sad':
      return <Frown className="w-4 h-4 text-red-600" />;
    default:
      return <Meh className="w-4 h-4" />;
  }
};

const getMoodColor = (mood: string) => {
  switch (mood) {
    case 'happy':
      return 'bg-green-500';
    case 'neutral':
      return 'bg-yellow-500';
    case 'sad':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

export const MoodTracker = () => {
  const averageMood = MOCK_MOOD_DATA.reduce((sum, entry) => sum + entry.intensity, 0) / MOCK_MOOD_DATA.length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Mood Tracking</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Weekly Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Mood</span>
              <Badge className="bg-primary text-primary-foreground">
                {averageMood.toFixed(1)}/10
              </Badge>
            </div>
            
            <div className="space-y-3">
              {MOCK_MOOD_DATA.slice(-7).map((entry, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-12">
                    {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  {getMoodIcon(entry.mood)}
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`${getMoodColor(entry.mood)} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${(entry.intensity / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground w-8 text-right">
                    {entry.intensity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Mood Insights</h3>
          <div className="space-y-4">
            <div className="text-center p-4 bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-1">
                {Math.round(averageMood)}
              </div>
              <div className="text-sm text-muted-foreground">
                Average this week
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Best day</span>
                <div className="flex items-center gap-2">
                  <Smile className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Jan 3rd (9/10)</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Improvement</span>
                <Badge variant="outline" className="text-green-600 border-green-600">
                  +12% vs last week
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};