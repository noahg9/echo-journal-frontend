import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Heart } from "lucide-react";

interface DaySummary {
  mood: string;
  theme: string;
}

const MOCK_SUMMARY: DaySummary = {
  mood: "reflective",
  theme: "Growth & Learning"
};

export const AIFeedback = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Daily Insights</h2>
      </div>

      <div className="grid gap-4">
        <Card className="p-6 bg-gradient-to-br from-card to-accent/10 border-accent/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Today's Mood</span>
              </div>
              <Badge variant="secondary" className="capitalize">
                {MOCK_SUMMARY.mood}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">Theme</span>
              </div>
              <Badge className="bg-primary text-primary-foreground">
                {MOCK_SUMMARY.theme}
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
