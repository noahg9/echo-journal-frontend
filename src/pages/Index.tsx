import { Header } from "@/components/Header";
import { WeeklyOverview } from "@/components/WeeklyOverview";
import { JournalEditor } from "@/components/JournalEditor";
import { AIFeedback } from "@/components/AIFeedback";
import { PastEntries } from "@/components/PastEntries";
import { MoodTracker } from "@/components/MoodTracker";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Weekly Overview Section */}
          <section>
            <WeeklyOverview />
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Journal Editor */}
            <div className="lg:col-span-2">
              <JournalEditor />
            </div>

            {/* Right Column - AI Feedback */}
            <div className="lg:col-span-1">
              <AIFeedback />
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Past Entries */}
            <div>
              <PastEntries />
            </div>

            {/* Mood Tracker */}
            <div>
              <MoodTracker />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
