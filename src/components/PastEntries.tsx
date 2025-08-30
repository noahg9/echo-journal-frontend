import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface JournalEntry {
    id: string;
    content: string;
    date: string;
    mood?: string;
    theme?: string;
    summary?: string;
}

export const PastEntries = () => {
    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

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
                    {entries.map((entry) => {
                        const isExpanded = expandedEntryId === entry.id;

                        return (
                            <Card
                                key={entry.id}
                                className={`p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
                                    isExpanded ? 'shadow-lg' : ''
                                }`}
                                onClick={() => setExpandedEntryId(isExpanded ? null : entry.id)}
                            >
                                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary">
                    {formatDate(entry.date)}
                  </span>
                                </div>

                                {/* Default view: mood + theme */}
                                {!isExpanded && (
                                    <div className="flex flex-wrap gap-2">
                                        {entry.mood && (
                                            <Badge variant="outline">{entry.mood}</Badge>
                                        )}
                                        {entry.theme && (
                                            <Badge variant="secondary">{entry.theme}</Badge>
                                        )}
                                    </div>
                                )}

                                {/* Expanded view: full content + AI summary */}
                                {isExpanded && (
                                    <div className="mt-2 pt-2 border-t border-border space-y-3">
                                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                                            {entry.content}
                                        </p>
                                        {entry.summary && (
                                            <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                                                <h4 className="font-medium text-foreground mb-2">AI Summary</h4>
                                                <p className="text-muted-foreground text-sm">{entry.summary}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
