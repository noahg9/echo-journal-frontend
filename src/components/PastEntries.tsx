import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface JournalEntry {
    id: string;
    content: string;
    date: string;
}

// Hardcoded past entries
const HARDCODED_ENTRIES: JournalEntry[] = [
    {
        id: "1",
        content: `Today I went for a long walk in the park. The weather was perfect, the sun was shining,
and I could feel the gentle breeze on my face. I saw families having picnics, children playing,
and dogs running around happily. It made me reflect on how simple joys can really uplift your mood.
I also listened to a podcast about productivity and took some notes on how to better manage my time.
I felt very inspired and decided to start planning my week more efficiently. Later in the evening,
I cooked a healthy dinner and enjoyed it while reading a book. Overall, it was a very fulfilling day.`,
        date: "2025-08-29",
    },
    {
        id: "2",
        content: `Read a book about AI, focusing on the latest trends in machine learning and natural language processing.
The chapters covered various algorithms, their use cases, and ethical considerations. I spent hours taking notes
and trying out some code examples to solidify my understanding. Later, I wrote a small blog post summarizing
what I learned and shared it with a friend who is also interested in AI. By the end of the day, I felt that I
had gained valuable knowledge that I could apply in my projects.`,
        date: "2025-08-28",
    }
];

export const PastEntries = () => {
    // Single state for all entries (hardcoded + saved + new)
    const [entries, setEntries] = useState<JournalEntry[]>(() => {
        const savedEntries = JSON.parse(localStorage.getItem("journal-entries") || "[]");
        return [...HARDCODED_ENTRIES, ...savedEntries];
    });
    const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    // Add a new entry and immediately merge with hardcoded entries
    const addEntry = (content: string) => {
        const newEntry: JournalEntry = {
            id: Date.now().toString(),
            content,
            date: new Date().toISOString(),
        };

        // Update state immediately
        setEntries(prev => [...prev, newEntry]);

        // Save only user-added entries (not hardcoded) to localStorage
        const savedEntries = JSON.parse(localStorage.getItem("journal-entries") || "[]");
        localStorage.setItem("journal-entries", JSON.stringify([...savedEntries, newEntry]));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Past Entries</h2>
                <span className="ml-auto">{entries.length} entries</span>
            </div>

            {entries.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-muted-foreground">No entries yet. Start journaling to see your thoughts here!</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {entries.map(entry => {
                        const isExpanded = expandedEntryId === entry.id;
                        return (
                            <Card
                                key={entry.id}
                                className={`p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${isExpanded ? "shadow-lg" : ""}`}
                                onClick={() => setExpandedEntryId(isExpanded ? null : entry.id)}
                            >
                                {/* Heading: only the date */}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-primary">
                                        {formatDate(entry.date)}
                                    </span>
                                </div>

                                {/* Expanded view: full content */}
                                {isExpanded && (
                                    <div className="mt-2 pt-2 border-t border-border">
                                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                                            {entry.content}
                                        </p>
                                    </div>
                                )}
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Button to add a new entry */}
            <div className="mt-4">
                <button
                    className="px-4 py-2 bg-primary text-white rounded"
                    onClick={() => addEntry("This is a newly added journal entry.")}
                >
                    Add New Entry
                </button>
            </div>
        </div>
    );
};
