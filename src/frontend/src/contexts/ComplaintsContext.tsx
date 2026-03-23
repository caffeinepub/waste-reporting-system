import { type ReactNode, createContext, useContext, useState } from "react";
import type { Complaint } from "../types";

const SEED_COMPLAINTS: Complaint[] = [
  {
    id: "c1",
    userId: "u1",
    userName: "Rajesh Kumar",
    location: "MG Road, Block 4",
    wasteType: "dry",
    description: "Garbage pile near bus stop",
    status: "Pending",
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "c2",
    userId: "u2",
    userName: "Priya Sharma",
    location: "Gandhi Nagar, Lane 7",
    wasteType: "wet",
    description: "Overflowing dustbin outside market",
    status: "Assigned",
    assignedWorker: "Suresh",
    createdAt: "2026-03-16T08:30:00Z",
  },
  {
    id: "c3",
    userId: "u1",
    userName: "Rajesh Kumar",
    location: "Park Street, Near Fountain",
    wasteType: "mixed",
    description: "Mixed waste dumped in open ground",
    status: "Cleaned",
    assignedWorker: "Manoj",
    createdAt: "2026-03-17T14:00:00Z",
  },
  {
    id: "c4",
    userId: "u3",
    userName: "Anita Patel",
    location: "Shivaji Colony, Main Road",
    wasteType: "wet",
    description: "Rotting food waste near residential area",
    status: "Pending",
    createdAt: "2026-03-20T09:00:00Z",
  },
  {
    id: "c5",
    userId: "u2",
    userName: "Priya Sharma",
    location: "Station Road, Platform 2",
    wasteType: "dry",
    description: "Plastic waste scattered on platform",
    status: "Assigned",
    assignedWorker: "Ramesh",
    createdAt: "2026-03-21T11:00:00Z",
  },
];

interface ComplaintsContextValue {
  complaints: Complaint[];
  addComplaint: (c: Omit<Complaint, "id" | "createdAt" | "status">) => void;
  updateStatus: (id: string, status: Complaint["status"]) => void;
  assignWorker: (id: string, worker: string) => void;
}

const ComplaintsContext = createContext<ComplaintsContextValue | null>(null);

export function ComplaintsProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(SEED_COMPLAINTS);

  function addComplaint(data: Omit<Complaint, "id" | "createdAt" | "status">) {
    const newC: Complaint = {
      ...data,
      id: `c${Date.now()}`,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setComplaints((prev) => [newC, ...prev]);
  }

  function updateStatus(id: string, status: Complaint["status"]) {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c)),
    );
  }

  function assignWorker(id: string, worker: string) {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, assignedWorker: worker, status: "Assigned" } : c,
      ),
    );
  }

  return (
    <ComplaintsContext.Provider
      value={{ complaints, addComplaint, updateStatus, assignWorker }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  const ctx = useContext(ComplaintsContext);
  if (!ctx)
    throw new Error("useComplaints must be used within ComplaintsProvider");
  return ctx;
}
