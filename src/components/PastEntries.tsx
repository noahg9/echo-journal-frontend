import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Edit2, Eye } from "lucide-react";

interface JournalEntry {
  id: string;
  content: string;
  date: string;
  mood?: string;
  summary?: string;
}

export const PastEntries = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
    setEntries(savedEntries);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPreview = (content: string) => {
    return content.length > 120 ? content.substring(0, 120) + '...' : content;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">Past Entries</h2>
        <Badge variant="secondary" className="ml-auto">
          {entries.length} entries
        </Badge>
      </div>

      {entries.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No entries yet. Start journaling to see your thoughts here!</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id} className="p-4 hover:shadow-md transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {formatDate(entry.date)}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      {selectedEntry?.id === entry.id ? 'Hide' : 'View'}
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1">
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {getPreview(entry.content)}
                </p>

                {entry.mood && (
                  <Badge variant="outline" className="w-fit">
                    {entry.mood}
                  </Badge>
                )}
              </div>

              {selectedEntry?.id === entry.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                  {entry.summary && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">AI Summary</h4>
                      <p className="text-muted-foreground text-sm">{entry.summary}</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};