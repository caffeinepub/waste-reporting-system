import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleLoginForm(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);
    setTimeout(() => {
      const err = login(loginEmail, loginPassword);
      setIsLoading(false);
      if (err) {
        setLoginError(err);
        return;
      }
      navigate({ to: "/dashboard" });
    }, 400);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegError("");
    if (!regName.trim()) {
      setRegError("Name is required.");
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError("Passwords do not match.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const err = register(regName, regEmail, regPassword);
      setIsLoading(false);
      if (err) {
        setRegError(err);
        return;
      }
      navigate({ to: "/dashboard" });
    }, 400);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 hero-bg flex items-center justify-center px-4 py-16 page-enter">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">
              Welcome to EcoReport
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in or create an account to continue
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-8">
            <Tabs defaultValue="login">
              <TabsList className="w-full mb-6" data-ocid="login.tab">
                <TabsTrigger
                  value="login"
                  className="flex-1"
                  data-ocid="login.tab"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="flex-1"
                  data-ocid="register.tab"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLoginForm} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="h-12 text-base"
                      data-ocid="login.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showLoginPw ? "text" : "password"}
                        placeholder="Enter password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="h-12 text-base pr-12"
                        data-ocid="login.input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showLoginPw ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  {loginError && (
                    <p
                      className="text-sm text-destructive font-medium"
                      data-ocid="login.error_state"
                    >
                      {loginError}
                    </p>
                  )}
                  <div className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                    Demo: <strong>admin@eco.com</strong> / admin123 or{" "}
                    <strong>user@eco.com</strong> / user123
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-semibold transition-all duration-200 hover:scale-[1.02]"
                    data-ocid="login.submit_button"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="reg-name">Full Name</Label>
                    <Input
                      id="reg-name"
                      type="text"
                      placeholder="Your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="h-12 text-base"
                      data-ocid="register.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="your@email.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="h-12 text-base"
                      data-ocid="register.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="reg-password"
                        type={showRegPw ? "text" : "password"}
                        placeholder="Min 6 characters"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        required
                        className="h-12 text-base pr-12"
                        data-ocid="register.input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showRegPw ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-confirm">Confirm Password</Label>
                    <Input
                      id="reg-confirm"
                      type="password"
                      placeholder="Repeat password"
                      value={regConfirm}
                      onChange={(e) => setRegConfirm(e.target.value)}
                      required
                      className="h-12 text-base"
                      data-ocid="register.input"
                    />
                  </div>
                  {regError && (
                    <p
                      className="text-sm text-destructive font-medium"
                      data-ocid="register.error_state"
                    >
                      {regError}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-base rounded-full bg-primary text-primary-foreground hover:bg-primary-hover font-semibold transition-all duration-200 hover:scale-[1.02]"
                    data-ocid="register.submit_button"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </span>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
