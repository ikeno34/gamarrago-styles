import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Lock, User, Store } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      toast.success("¡Bienvenido a Gamarra Go!");
      navigate("/map");
      setIsLoading(false);
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast.success("¡Cuenta creada exitosamente!");
      navigate("/map");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-primary p-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-light rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-2xl shadow-gamarra-xl mb-4 animate-scale-in">
            <MapPin className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">
            Gamarra Go
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Navega el Emporio de la Moda
          </p>
        </div>

        {/* Login/Register Card */}
        <Card className="shadow-gamarra-xl border-0 backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-2xl">Bienvenido</CardTitle>
            <CardDescription>
              Ingresa a tu cuenta o crea una nueva
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Correo o usuario</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="tu@correo.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? "Ingresando..." : "Iniciar Sesión"}
                  </Button>
                  <div className="text-center">
                    <a href="#" className="text-sm text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Nombre completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Juan Pérez"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="tu@correo.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-type">Tipo de usuario</Label>
                    <div className="relative">
                      <Store className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select
                        id="user-type"
                        className="w-full pl-10 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      >
                        <option value="customer">Cliente</option>
                        <option value="merchant">Comerciante</option>
                      </select>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-accent hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-primary-foreground/60 text-sm mt-6">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
};

export default Login;
