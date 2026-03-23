import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Calendar, MapPin, Shield, User } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { WasteTypeBadge } from "../components/WasteTypeBadge";
import { useAuth } from "../contexts/AuthContext";
import { useComplaints } from "../contexts/ComplaintsContext";
import type { Status } from "../types";

const FILTERS: (Status | "All")[] = ["All", "Pending", "Assigned", "Cleaned"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPage() {
  const { currentUser } = useAuth();
  const { complaints, updateStatus, assignWorker } = useComplaints();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Status | "All">("All");
  const [workerInputs, setWorkerInputs] = useState<Record<string, string>>({});

  if (!currentUser || currentUser.role !== "admin") {
    navigate({ to: "/login" });
    return null;
  }

  const filtered =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const assigned = complaints.filter((c) => c.status === "Assigned").length;
  const cleaned = complaints.filter((c) => c.status === "Cleaned").length;

  function handleAssign(id: string) {
    const worker = workerInputs[id]?.trim();
    if (!worker) return;
    assignWorker(id, worker);
    setWorkerInputs((prev) => ({ ...prev, [id]: "" }));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 hero-bg py-10 px-4 page-enter">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">
                Manage all waste complaints
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Complaints", value: total },
              { label: "Pending", value: pending },
              { label: "Assigned", value: assigned },
              { label: "Cleaned", value: cleaned },
            ].map((s, idx) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-5 text-center shadow-card"
              >
                <div
                  className={`text-4xl font-extrabold mb-2 ${
                    idx === 0
                      ? "text-primary"
                      : idx === 1
                        ? "text-amber-500"
                        : idx === 2
                          ? "text-blue-500"
                          : "text-green-600"
                  }`}
                >
                  {s.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-6" data-ocid="admin.tab">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                data-ocid="admin.tab"
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "bg-white text-muted-foreground border border-border hover:border-primary hover:text-primary"
                }`}
              >
                {f}
                {f !== "All" && (
                  <span className="ml-2 opacity-70">
                    (
                    {f === "Pending"
                      ? pending
                      : f === "Assigned"
                        ? assigned
                        : cleaned}
                    )
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Complaints */}
          {filtered.length === 0 ? (
            <div
              className="bg-white rounded-2xl shadow-card p-12 text-center"
              data-ocid="admin.empty_state"
            >
              <p className="text-xl font-semibold text-muted-foreground">
                No complaints in this category.
              </p>
            </div>
          ) : (
            <div className="space-y-4" data-ocid="admin.list">
              {filtered.map((c, i) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl shadow-card p-6 hover:shadow-card-hover transition-shadow"
                  data-ocid={`admin.item.${i + 1}`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {c.imageBase64 && (
                      <img
                        src={c.imageBase64}
                        alt="Waste"
                        className="w-32 h-32 rounded-xl object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {c.id.toUpperCase()}
                        </span>
                        <WasteTypeBadge type={c.wasteType} />
                        <StatusBadge status={c.status} />
                      </div>
                      <p className="font-semibold text-foreground mb-2">
                        {c.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {c.userName}
                        </span>
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
                        <p className="text-sm mb-3">
                          <span className="text-muted-foreground">
                            Worker:{" "}
                          </span>
                          <span className="font-semibold text-accent">
                            {c.assignedWorker}
                          </span>
                        </p>
                      )}
                      <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-border">
                        <div className="flex gap-2 flex-1">
                          <Input
                            placeholder="Worker name"
                            value={workerInputs[c.id] || ""}
                            onChange={(e) =>
                              setWorkerInputs((prev) => ({
                                ...prev,
                                [c.id]: e.target.value,
                              }))
                            }
                            className="h-10 text-sm"
                            data-ocid="admin.input"
                          />
                          <Button
                            size="sm"
                            type="button"
                            onClick={() => handleAssign(c.id)}
                            className="rounded-full bg-accent text-accent-foreground hover:opacity-90 whitespace-nowrap font-semibold"
                            data-ocid="admin.secondary_button"
                          >
                            Assign
                          </Button>
                        </div>
                        <Select
                          value={c.status}
                          onValueChange={(val) =>
                            updateStatus(c.id, val as Status)
                          }
                        >
                          <SelectTrigger
                            className="h-10 w-[160px]"
                            data-ocid="admin.select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Assigned">Assigned</SelectItem>
                            <SelectItem value="Cleaned">Cleaned</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
