import { BookOpen, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-background to-accent/20 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg shadow-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Echo Journal</h1>
              <p className="text-sm text-muted-foreground">Your thoughts, reflected back with insight</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};