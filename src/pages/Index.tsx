import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Store, Navigation, Star, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: "Mapas Interactivos",
      description: "Navega por Gamarra con mapas detallados y ubicaciones precisas de cada tienda.",
    },
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description: "Encuentra exactamente lo que buscas con filtros por categoría, precio y ubicación.",
    },
    {
      icon: Store,
      title: "Miles de Tiendas",
      description: "Accede a información completa de miles de comercios en el emporio.",
    },
    {
      icon: Navigation,
      title: "Navegación GPS",
      description: "Obtén direcciones precisas para llegar a cualquier tienda en tiempo real.",
    },
  ];

  const stats = [
    { value: "5000+", label: "Tiendas Registradas" },
    { value: "50+", label: "Galerías Comerciales" },
    { value: "100K+", label: "Usuarios Activos" },
    { value: "4.8", label: "Valoración Promedio" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light rounded-full blur-3xl animate-pulse-slow" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-2xl shadow-gamarra-xl mb-4">
              <MapPin className="w-12 h-12 text-secondary-foreground" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Descubre Gamarra como nunca antes
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90">
              El emporio comercial más grande de Perú, ahora en tus manos. 
              Encuentra tiendas, navega el distrito y conecta con comerciantes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="bg-secondary text-secondary-foreground hover:bg-secondary-light text-lg px-8 py-6 shadow-gamarra-lg"
              >
                <Users className="mr-2 h-5 w-5" />
                Comenzar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/map")}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 text-lg px-8 py-6"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Ver Mapa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Todo lo que necesitas para navegar Gamarra
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Una plataforma completa diseñada para conectar clientes con comerciantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-gamarra-md hover:shadow-gamarra-lg transition-shadow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Listo para explorar Gamarra?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Únete a miles de usuarios que ya navegan el emporio con Gamarra Go
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/login")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary-light text-lg px-8 py-6 shadow-gamarra-lg"
            >
              Crear Cuenta Gratis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">Gamarra Go</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Tu guía completa para navegar el emporio comercial más grande de Perú.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Características</a></li>
                <li><a href="#" className="hover:text-primary">Precios</a></li>
                <li><a href="#" className="hover:text-primary">Para Comerciantes</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Sobre Nosotros</a></li>
                <li><a href="#" className="hover:text-primary">Contacto</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Términos</a></li>
                <li><a href="#" className="hover:text-primary">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Gamarra Go. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
