import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { BarChart2, Calendar, MapPin } from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { WasteTypeBadge } from "../components/WasteTypeBadge";
import { useAuth } from "../contexts/AuthContext";
import { useComplaints } from "../contexts/ComplaintsContext";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const { currentUser } = useAuth();
  const { complaints } = useComplaints();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate({ to: "/login" });
    return null;
  }

  const myComplaints = complaints.filter((c) => c.userId === currentUser.id);
  const pending = myComplaints.filter((c) => c.status === "Pending").length;
  const assigned = myComplaints.filter((c) => c.status === "Assigned").length;
  const cleaned = myComplaints.filter((c) => c.status === "Cleaned").length;

  const stats = [
    {
      label: "Total",
      value: myComplaints.length,
      color: "bg-primary/10 text-primary",
    },
    { label: "Pending", value: pending, color: "status-pending" },
    { label: "Assigned", value: assigned, color: "status-assigned" },
    { label: "Cleaned", value: cleaned, color: "status-cleaned" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 hero-bg py-10 px-4 page-enter">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <BarChart2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-3xl font-extrabold text-foreground">
                  My Dashboard
                </h1>
              </div>
              <p className="text-muted-foreground ml-[52px]">
                Welcome back,{" "}
                <span className="font-semibold text-foreground">
                  {currentUser.name}
                </span>
              </p>
            </div>
            <Button
              asChild
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-6 transition-all duration-200 hover:scale-105"
              data-ocid="dashboard.primary_button"
            >
              <Link to="/report">+ New Report</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-5 text-center shadow-card"
              >
                <div
                  className={`text-4xl font-extrabold mb-1 ${s.color.startsWith("bg-") ? "text-primary" : ""}`}
                  style={s.color.startsWith("status-") ? {} : {}}
                >
                  <span
                    className={`inline-block px-4 py-1 rounded-full text-3xl font-extrabold ${s.color}`}
                  >
                    {s.value}
                  </span>
                </div>
                <div className="text-sm font-medium text-muted-foreground mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Complaints list */}
          {myComplaints.length === 0 ? (
            <div
              className="bg-white rounded-2xl shadow-card p-12 text-center"
              data-ocid="dashboard.empty_state"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                No complaints yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start by reporting a waste issue in your area.
              </p>
              <Button
                asChild
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary-hover"
              >
                <Link to="/report">Report Waste</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="dashboard.list">
              {myComplaints.map((c, i) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-shadow duration-200"
                  data-ocid={`dashboard.item.${i + 1}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {c.imageBase64 && (
                      <img
                        src={c.imageBase64}
                        alt="Waste"
                        className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <WasteTypeBadge type={c.wasteType} />
                        <StatusBadge status={c.status} />
                        <span className="text-xs text-muted-foreground font-mono ml-auto">
                          {c.id.toUpperCase()}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground mb-1 truncate">
                        {c.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {c.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(c.createdAt)}
                        </span>
                      </div>
                      {c.assignedWorker && (
                        <p className="text-sm mt-1">
                          <span className="text-muted-foreground">
                            Assigned to:{" "}
                          </span>
                          <span className="font-medium text-accent">
                            {c.assignedWorker}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
