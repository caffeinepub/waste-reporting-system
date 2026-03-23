import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Leaf, LogOut, User } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold text-base leading-tight text-foreground">
              EcoReport
            </div>
            <div className="text-xs text-muted-foreground leading-tight">
              Waste Management
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/report", label: "Report Waste" },
            { to: "/dashboard", label: "Dashboard" },
            ...(currentUser?.role === "admin"
              ? [{ to: "/admin", label: "Admin" }]
              : []),
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              activeProps={{ className: "text-primary" }}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-foreground">
                <User className="w-4 h-4 text-primary" />
                {currentUser.name}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                data-ocid="nav.button"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link to="/login" data-ocid="nav.button">
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
