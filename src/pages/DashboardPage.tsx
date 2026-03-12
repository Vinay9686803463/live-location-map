import { useState } from "react";
import { Play, Square, RefreshCw, History, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LocationMap from "@/components/LocationMap";
import LocationInfoPanel from "@/components/LocationInfoPanel";
import LocationHistory from "@/components/LocationHistory";
import { useGeolocation } from "@/hooks/useGeolocation";

const DashboardPage = () => {
  const { location, history, tracking, loading, error, getLocation, startTracking, stopTracking } = useGeolocation();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="container mx-auto p-4 space-y-4 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4">
          {!tracking ? (
            <Button onClick={startTracking} className="gap-2">
              <Play className="w-4 h-4" /> Start Tracking
            </Button>
          ) : (
            <Button onClick={stopTracking} variant="destructive" className="gap-2">
              <Square className="w-4 h-4" /> Stop Tracking
            </Button>
          )}
          <Button variant="outline" onClick={getLocation} disabled={loading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
          </Button>
          <Button variant="outline" onClick={() => setShowHistory((s) => !s)} className="gap-2">
            <History className="w-4 h-4" /> History
          </Button>
          {tracking && (
            <span className="flex items-center gap-2 text-sm text-success ml-auto">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Live tracking
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-4">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Map + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            {location ? (
              <LocationMap
                latitude={location.latitude}
                longitude={location.longitude}
                className="h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg"
              />
            ) : (
              <div className="h-[400px] lg:h-[500px] glass-card rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  {loading ? "Getting your location…" : "Click Start Tracking to begin"}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <LocationInfoPanel location={location} loading={loading} />
            <LocationHistory history={history} open={showHistory} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
