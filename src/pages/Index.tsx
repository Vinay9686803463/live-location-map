import { useState } from "react";
import TrackerNavbar from "@/components/TrackerNavbar";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import DashboardPage from "@/pages/DashboardPage";
import { useAuth } from "@/hooks/useAuth";
import { useDarkMode } from "@/hooks/useDarkMode";

const Index = () => {
  const { user, login, register, logout } = useAuth();
  const { dark, toggle } = useDarkMode();
  const [page, setPage] = useState<"login" | "register">("login");

  if (!user) {
    return (
      <>
        <TrackerNavbar dark={dark} onToggleDark={toggle} />
        {page === "login" ? (
          <LoginPage onLogin={login} onGoRegister={() => setPage("register")} />
        ) : (
          <RegisterPage onRegister={register} onGoLogin={() => setPage("login")} />
        )}
        <footer className="text-center py-4 text-xs text-muted-foreground">
          © 2026 Mobile Location Tracker
        </footer>
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TrackerNavbar dark={dark} onToggleDark={toggle} userName={user.name} onLogout={logout} />
      <main className="flex-1">
        <DashboardPage />
      </main>
      <footer className="text-center py-4 text-xs text-muted-foreground border-t border-border">
        © 2026 Mobile Location Tracker
      </footer>
    </div>
  );
};

export default Index;
