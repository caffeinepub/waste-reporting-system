export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  imageBase64?: string;
  location: string;
  wasteType: "wet" | "dry" | "mixed";
  description: string;
  status: "Pending" | "Assigned" | "Cleaned";
  assignedWorker?: string;
  createdAt: string;
}

export type WasteType = "wet" | "dry" | "mixed";
export type Status = "Pending" | "Assigned" | "Cleaned";
