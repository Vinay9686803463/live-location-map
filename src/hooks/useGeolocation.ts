import { useState, useCallback, useRef, useEffect } from "react";

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationHistoryEntry extends LocationData {
  id: string;
}

export function useGeolocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [history, setHistory] = useState<LocationHistoryEntry[]>([]);
  const [tracking, setTracking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: LocationData = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        };
        setLocation(loc);
        setHistory((h) => [
          { ...loc, id: crypto.randomUUID() },
          ...h,
        ]);
        setLoading(false);
      },
      (err) => {
        setError(
          err.code === 1
            ? "Location permission denied. Please enable GPS."
            : err.code === 2
            ? "Location unavailable. Check your GPS settings."
            : "Location request timed out."
        );
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    setError(null);
    setTracking(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        const loc: LocationData = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        };
        setLocation(loc);
        setHistory((h) => [{ ...loc, id: crypto.randomUUID() }, ...h]);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setTracking(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setTracking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { location, history, tracking, loading, error, getLocation, startTracking, stopTracking };
}
