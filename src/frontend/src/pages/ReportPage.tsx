import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { MapPin, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useComplaints } from "../contexts/ComplaintsContext";
import type { WasteType } from "../types";

const WASTE_TYPES: {
  value: WasteType;
  label: string;
  color: string;
  desc: string;
}[] = [
  {
    value: "wet",
    label: "Wet Waste",
    color: "border-blue-400 bg-blue-50 text-blue-700",
    desc: "Food, organic",
  },
  {
    value: "dry",
    label: "Dry Waste",
    color: "border-amber-400 bg-amber-50 text-amber-700",
    desc: "Paper, plastic",
  },
  {
    value: "mixed",
    label: "Mixed Waste",
    color: "border-purple-400 bg-purple-50 text-purple-700",
    desc: "Mixed types",
  },
];

export default function ReportPage() {
  const { currentUser } = useAuth();
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();

  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState<WasteType>("dry");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!currentUser) {
    navigate({ to: "/login" });
    return null;
  }

  const user = currentUser;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageBase64(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!location.trim() || !description.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      addComplaint({
        userId: user.id,
        userName: user.name,
        imageBase64,
        location,
        wasteType,
        description,
      });
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => navigate({ to: "/dashboard" }), 1200);
    }, 800);
  }

  function triggerFileInput() {
    fileInputRef.current?.click();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 hero-bg py-12 px-4 page-enter">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-extrabold text-foreground">
                Report Waste
              </h1>
            </div>
            <p className="text-muted-foreground ml-[52px]">
              Help keep your city clean by reporting waste issues.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-card p-8 space-y-8"
          >
            {/* Image upload */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Photo (Optional)
              </Label>
              {imageBase64 ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-primary/30 h-52">
                  <img
                    src={imageBase64}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageBase64(undefined);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    data-ocid="report.close_button"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={triggerFileInput}
                  onKeyDown={(e) => e.key === "Enter" && triggerFileInput()}
                  className="w-full border-2 border-dashed border-primary/30 rounded-xl h-44 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-200"
                  data-ocid="report.dropzone"
                >
                  <Upload className="w-10 h-10 text-primary/50" />
                  <div className="text-center">
                    <p className="font-medium text-foreground">
                      Click to upload image
                    </p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                data-ocid="report.upload_button"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-semibold">
                Location *
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g. MG Road, Block 4, Near Bus Stop"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="h-12 text-base pl-10 focus-visible:ring-primary"
                  data-ocid="report.input"
                />
              </div>
            </div>

            {/* Waste Type */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Waste Type *</Label>
              <div className="grid grid-cols-3 gap-3">
                {WASTE_TYPES.map((wt) => (
                  <label
                    key={wt.value}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${wasteType === wt.value ? `${wt.color} border-2` : "border-border hover:border-primary/30"}`}
                  >
                    <input
                      type="radio"
                      name="wasteType"
                      value={wt.value}
                      checked={wasteType === wt.value}
                      onChange={() => setWasteType(wt.value)}
                      className="sr-only"
                      data-ocid="report.radio"
                    />
                    <span className="font-semibold text-sm">{wt.label}</span>
                    <span className="text-xs mt-1 opacity-70">{wt.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the waste issue in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="text-base resize-none focus-visible:ring-primary"
                data-ocid="report.textarea"
              />
            </div>

            {/* Submit */}
            {success ? (
              <div
                className="flex items-center gap-3 p-4 bg-primary/10 rounded-xl border border-primary/30"
                data-ocid="report.success_state"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <title>Success checkmark</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-primary">
                    Report submitted!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Redirecting to dashboard...
                  </p>
                </div>
              </div>
            ) : (
              <Button
                type="submit"
                disabled={isLoading}
                size="lg"
                className="w-full h-14 text-lg rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-semibold transition-all duration-200 hover:scale-[1.02]"
                data-ocid="report.submit_button"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Report...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Submit Report
                  </span>
                )}
              </Button>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
