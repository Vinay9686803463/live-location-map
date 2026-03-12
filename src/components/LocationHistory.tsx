import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { LocationHistoryEntry } from "@/hooks/useGeolocation";

interface LocationHistoryProps {
  history: LocationHistoryEntry[];
  open: boolean;
}

const LocationHistory = ({ history, open }: LocationHistoryProps) => {
  if (!open) return null;

  return (
    <div className="glass-card rounded-lg p-5">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Clock className="w-4 h-4" /> Location History
      </h3>
      {history.length === 0 ? (
        <p className="text-sm text-muted-foreground">No history yet.</p>
      ) : (
        <ScrollArea className="h-60">
          <div className="space-y-2">
            {history.map((entry) => (
              <div key={entry.id} className="flex justify-between items-center text-sm py-2 border-b border-border last:border-0">
                <span className="font-mono text-foreground">
                  {entry.latitude.toFixed(5)}, {entry.longitude.toFixed(5)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default LocationHistory;
