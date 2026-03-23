import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle,
  Leaf,
  MapPin,
  Megaphone,
  Search,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { StatusBadge } from "../components/StatusBadge";
import { useAuth } from "../contexts/AuthContext";
import { useComplaints } from "../contexts/ComplaintsContext";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HomePage() {
  const { complaints } = useComplaints();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const recentComplaints = complaints.slice(0, 5);

  const actionCards = [
    {
      icon: <Megaphone className="w-10 h-10 text-white" />,
      label: "Quick Report",
      desc: "Report a waste issue",
      to: "/report",
      ocid: "home.quick_report.button",
    },
    {
      icon: <BarChart2 className="w-10 h-10 text-white" />,
      label: "My Dashboard",
      desc: "Track your complaints",
      to: "/dashboard",
      ocid: "home.dashboard.button",
    },
    {
      icon: <Search className="w-10 h-10 text-white" />,
      label: "Track Status",
      desc: "Check complaint status",
      to: "/dashboard",
      ocid: "home.track_status.button",
    },
  ];

  const steps = [
    {
      icon: <Megaphone className="w-10 h-10 text-primary" />,
      step: "01",
      title: "Report Waste",
      desc: "Upload a photo, enter location and describe the issue.",
    },
    {
      icon: <Search className="w-10 h-10 text-primary" />,
      step: "02",
      title: "Track Progress",
      desc: "Follow your complaint status in real time.",
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-primary" />,
      step: "03",
      title: "Confirmed Cleaned",
      desc: "Get notified when the area is cleaned up.",
    },
  ];

  function handleActionClick(to: string) {
    if (to === "/report" || to === "/dashboard") {
      if (!currentUser) {
        navigate({ to: "/login" });
        return;
      }
    }
    navigate({ to });
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 page-enter">
        {/* Hero */}
        <section className="hero-bg">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm font-medium text-primary border border-primary/20 mb-6">
                <Leaf className="w-4 h-4" />
                Eco-Friendly Initiative
              </div>
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-foreground leading-tight mb-6">
                Report Waste,
                <br />
                <span className="text-primary">Keep Cities Clean</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                Join thousands of citizens making a difference. Report waste
                issues in your area and track progress until it's resolved.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-semibold px-8 py-6 text-base transition-all duration-200 hover:scale-105 shadow-card"
                  onClick={() =>
                    currentUser
                      ? navigate({ to: "/report" })
                      : navigate({ to: "/login" })
                  }
                  data-ocid="home.primary_button"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Report Waste Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-6 text-base transition-all duration-200"
                >
                  <Link to="/login" data-ocid="home.secondary_button">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/generated/hero-eco-illustration.dim_600x480.png"
                alt="Eco illustration showing a person next to a green recycling bin"
                className="w-full max-w-lg rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Action cards */}
        <section className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actionCards.map((card) => (
              <button
                type="button"
                key={card.label}
                onClick={() => handleActionClick(card.to)}
                data-ocid={card.ocid}
                className="bg-primary rounded-2xl p-8 flex flex-col items-center text-center gap-4 cursor-pointer transition-all duration-200 hover:scale-105 shadow-card hover:shadow-card-hover group"
              >
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-1">
                    {card.label}
                  </div>
                  <div className="text-white/80 text-sm">{card.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="hero-bg py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-8 text-center shadow-card"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-extrabold text-primary/20 mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Reports */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
            Recent Reports Dashboard
          </h2>
          <div
            className="bg-white rounded-2xl shadow-card overflow-hidden border border-border"
            data-ocid="home.table"
          >
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hero-bg">
                    <TableHead className="font-bold text-foreground">
                      ID
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      Reported By
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      Location
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      Type
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      Date
                    </TableHead>
                    <TableHead className="font-bold text-foreground">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentComplaints.map((c, i) => (
                    <TableRow
                      key={c.id}
                      className="hover:bg-muted/50"
                      data-ocid={`home.row.item.${i + 1}`}
                    >
                      <TableCell className="font-mono text-sm text-muted-foreground">
                        {c.id.toUpperCase()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {c.userName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {c.location}
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {c.wasteType}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(c.createdAt)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={c.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
