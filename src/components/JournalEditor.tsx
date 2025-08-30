import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Lightbulb, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SAMPLE_PROMPTS = [
  "What moment today made you feel most alive?",
  "If today had a color, what would it be and why?",
  "What's one thing you learned about yourself today?",
  "Describe a small victory from today, no matter how minor.",
  "What would you tell your past self about today?",
  "What emotions visited you today? Which ones stayed longest?"
];

export const JournalEditor = () => {
  const [entry, setEntry] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { toast } = useToast();

  const getRandomPrompt = () => {
    const randomPrompt = SAMPLE_PROMPTS[Math.floor(Math.random() * SAMPLE_PROMPTS.length)];
    setCurrentPrompt(randomPrompt);
  };

  const saveEntry = () => {
    if (!entry.trim()) {
      toast({
        title: "Empty entry",
        description: "Write something before saving your journal entry.",
        variant: "destructive"
      });
      return;
    }

    // Here you would save to your backend/storage
    const savedEntry = {
      id: Date.now().toString(),
      content: entry,
      date: new Date().toISOString(),
      mood: null // Will be set later
    };
    
    // Save to localStorage for now
    const existingEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
    existingEntries.unshift(savedEntry);
    localStorage.setItem('journal-entries', JSON.stringify(existingEntries));

    toast({
      title: "Entry saved!",
      description: "Your thoughts have been captured.",
    });

    setEntry("");
    setCurrentPrompt("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Today's Journal</h2>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      {currentPrompt && (
        <Card className="p-4 bg-accent/30 border-accent">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-accent-foreground mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-accent-foreground mb-1">Writing Prompt</h4>
              <p className="text-accent-foreground/80">{currentPrompt}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        <Textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="What's on your mind today? Let your thoughts flow..."
          className="min-h-[300px] text-base leading-relaxed resize-none border-2 focus:border-primary/50 bg-card"
        />
        
        <div className="flex gap-3">
          <Button onClick={saveEntry} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Entry
          </Button>
          <Button variant="outline" onClick={getRandomPrompt} className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Get Prompt
          </Button>
        </div>
      </div>
    </div>
  );
};