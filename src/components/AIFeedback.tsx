import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Heart } from "lucide-react";

interface DaySummary {
  mood: string;
  theme: string;
  insights: string[];
  encouragement: string;
}

const MOCK_SUMMARY: DaySummary = {
  mood: "reflective",
  theme: "Growth & Learning",
  insights: [
    "You showed resilience when facing challenges today",
    "Multiple mentions of gratitude and appreciation",
    "Strong focus on personal development"
  ],
  encouragement: "Your mindful approach to challenges shows real emotional growth. Keep nurturing this reflective mindset!"
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

        <Card className="p-6">
          <h3 className="font-semibold text-foreground mb-4">Key Insights</h3>
          <div className="space-y-3">
            {MOCK_SUMMARY.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p className="text-muted-foreground">{insight}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <h3 className="font-semibold text-foreground mb-3">Encouragement</h3>
          <p className="text-foreground/80 italic leading-relaxed">
            "{MOCK_SUMMARY.encouragement}"
          </p>
        </Card>
      </div>
    </div>
  );
};