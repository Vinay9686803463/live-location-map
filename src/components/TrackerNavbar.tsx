import { MapPin, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrackerNavbarProps {
  dark: boolean;
  onToggleDark: () => void;
  userName?: string;
  onLogout?: () => void;
}

const TrackerNavbar = ({ dark, onToggleDark, userName, onLogout }: TrackerNavbarProps) => (
  <nav className="sticky top-0 z-50 glass-card border-b px-4 py-3">
    <div className="container mx-auto flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
          <MapPin className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold text-foreground">Location Tracker</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onToggleDark} aria-label="Toggle theme">
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        {userName && (
          <>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {userName}
            </span>
            <Button variant="ghost" size="icon" onClick={onLogout} aria-label="Logout">
              <LogOut className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  </nav>
);

export default TrackerNavbar;
