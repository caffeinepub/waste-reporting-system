import { Leaf } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";
  return (
    <footer className="hero-bg border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">EcoReport</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-default">
              FAQ
            </span>
            <span className="hover:text-primary transition-colors cursor-default">
              Terms
            </span>
            <span className="hover:text-primary transition-colors cursor-default">
              Privacy
            </span>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            © {year}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
