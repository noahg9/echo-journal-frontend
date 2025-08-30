import { Header } from "@/components/Header";
import { WeeklyOverview } from "@/components/WeeklyOverview";
import { JournalEditor } from "@/components/JournalEditor";
import { AIFeedback } from "@/components/AIFeedback";
import { PastEntries } from "@/components/PastEntries";

const Journal = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
                {/* Weekly Overview Section */}
                <section>
                    <WeeklyOverview />
                </section>

                {/* Main Grid: Left (Journal + Daily Insights) & Right (Past Entries) */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Journal + Daily Insights */}
                    <div className="flex flex-col gap-8">
                        <JournalEditor />
                        <AIFeedback />
                    </div>

                    {/* Right Column - Past Entries */}
                    <div>
                        <PastEntries />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Journal;
