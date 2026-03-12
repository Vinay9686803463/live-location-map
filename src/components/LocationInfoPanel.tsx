import { Copy, Share2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { LocationData } from "@/hooks/useGeolocation";

interface LocationInfoPanelProps {
  location: LocationData | null;
  loading: boolean;
}

const LocationInfoPanel = ({ location, loading }: LocationInfoPanelProps) => {
  const copyCoords = () => {
    if (!location) return;
    navigator.clipboard.writeText(`${location.latitude}, ${location.longitude}`);
    toast.success("Coordinates copied!");
  };

  const shareLocation = () => {
    if (!location) return;
    const url = `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}#map=16/${location.latitude}/${location.longitude}`;
    if (navigator.share) {
      navigator.share({ title: "My Location", url });
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Location link copied!");
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-lg p-6 flex items-center justify-center gap-3">
        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-muted-foreground">Fetching location…</span>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="glass-card rounded-lg p-6 text-center text-muted-foreground">
        <Navigation className="w-8 h-8 mx-auto mb-2 opacity-40" />
        <p>No location data yet. Start tracking to see your position.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-lg p-5 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Latitude</p>
          <p className="text-lg font-mono font-semibold text-foreground">{location.latitude.toFixed(6)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Longitude</p>
          <p className="text-lg font-mono font-semibold text-foreground">{location.longitude.toFixed(6)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Accuracy</p>
          <p className="text-sm font-mono text-foreground">{location.accuracy.toFixed(0)}m</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Updated</p>
          <p className="text-sm font-mono text-foreground">
            {new Date(location.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={copyCoords} className="flex-1">
          <Copy className="w-4 h-4 mr-1" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={shareLocation} className="flex-1">
          <Share2 className="w-4 h-4 mr-1" /> Share
        </Button>
      </div>
    </div>
  );
};

export default LocationInfoPanel;
