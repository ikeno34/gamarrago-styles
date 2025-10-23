import { useState } from "react";
import { Search, Menu, User, MapPin, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import StoreDetail from "@/components/StoreDetail";

// Mock data for stores
const mockStores = [
  {
    id: 1,
    name: "Moda Femenina Rosa",
    category: "Ropa de Mujer",
    address: "Galería El Dorado, Piso 2, Tienda 215",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400",
    distance: "150m",
  },
  {
    id: 2,
    name: "Zapatería Premium",
    category: "Calzado",
    address: "Galería Guisado, Piso 1, Tienda 102",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
    distance: "220m",
  },
  {
    id: 3,
    name: "Telas y Textiles",
    category: "Telas",
    address: "Jr. Gamarra 845, Local 3",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400",
    distance: "180m",
  },
  {
    id: 4,
    name: "Accesorios VIP",
    category: "Accesorios",
    address: "Galería Unicachi, Piso 3, Tienda 305",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400",
    distance: "340m",
  },
];

const Map = () => {
  const [selectedStore, setSelectedStore] = useState<typeof mockStores[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hidden sm:inline">Gamarra Go</span>
        </div>

        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar tienda, galería o producto..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Mi Perfil</SheetTitle>
              <SheetDescription>
                Gestiona tu cuenta y preferencias
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Ver Perfil
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Mis Favoritos
              </Button>
              <Button variant="destructive" className="w-full">
                Cerrar Sesión
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Map Area */}
        <div className="flex-1 relative bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8 bg-card rounded-xl shadow-gamarra-lg max-w-md">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Mapa Interactivo</h2>
              <p className="text-muted-foreground mb-4">
                Para ver el mapa completo con ubicaciones en tiempo real, necesitas configurar Mapbox.
              </p>
              <div className="bg-muted p-4 rounded-lg text-sm text-left space-y-2">
                <p className="font-semibold">Pasos para activar el mapa:</p>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                  <li>Crea una cuenta en <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a></li>
                  <li>Obtén tu token público</li>
                  <li>Configúralo en el proyecto</li>
                </ol>
              </div>
            </div>
          </div>

          {/* GPS Button */}
          <Button
            className="absolute bottom-6 right-6 h-12 w-12 rounded-full shadow-gamarra-lg bg-gradient-primary hover:opacity-90"
            size="icon"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-96 bg-card border-l overflow-y-auto">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Tiendas Cercanas</h3>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                Ropa Mujer
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Calzado
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Accesorios
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                Telas
              </Badge>
            </div>
          </div>

          <div className="divide-y">
            {mockStores.map((store) => (
              <Card
                key={store.id}
                className="border-0 rounded-none cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setSelectedStore(store)}
              >
                <CardHeader className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={store.image}
                      alt={store.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base mb-1 truncate">
                        {store.name}
                      </CardTitle>
                      <CardDescription className="text-xs mb-2">
                        {store.category}
                      </CardDescription>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-secondary text-secondary" />
                          <span className="font-medium">{store.rating}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{store.distance}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </aside>
      </div>

      {/* Store Detail Modal */}
      {selectedStore && (
        <StoreDetail
          store={selectedStore}
          onClose={() => setSelectedStore(null)}
        />
      )}
    </div>
  );
};

export default Map;
