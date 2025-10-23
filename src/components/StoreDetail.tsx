import { X, MapPin, Clock, Phone, Star, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Store {
  id: number;
  name: string;
  category: string;
  address: string;
  rating: number;
  image: string;
  distance: string;
}

interface StoreDetailProps {
  store: Store;
  onClose: () => void;
}

const StoreDetail = ({ store, onClose }: StoreDetailProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-gamarra-xl animate-scale-in">
        <div className="relative">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-64 object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full shadow-lg"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-3xl font-bold">{store.name}</h2>
              <Badge variant="secondary" className="ml-2">
                {store.category}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-medium text-foreground">{store.rating}</span>
                <span>(125 reseñas)</span>
              </div>
              <span>•</span>
              <span>{store.distance} de distancia</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Dirección</p>
                <p className="text-sm text-muted-foreground">{store.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Horario</p>
                <p className="text-sm text-muted-foreground">Lun - Sáb: 9:00 AM - 7:00 PM</p>
                <p className="text-sm text-muted-foreground">Dom: 9:00 AM - 2:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Contacto</p>
                <p className="text-sm text-muted-foreground">+51 987 654 321</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Sobre la tienda</h3>
            <p className="text-muted-foreground">
              Especialistas en moda femenina con más de 15 años de experiencia en el emporio 
              de Gamarra. Ofrecemos las últimas tendencias en ropa casual, formal y deportiva 
              a precios competitivos. Ven y descubre nuestra amplia variedad de productos.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-gradient-primary hover:opacity-90" size="lg">
              <Navigation className="mr-2 h-4 w-4" />
              Cómo llegar
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Contactar
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Productos Destacados</h3>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-muted" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Reseñas Recientes</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-2 border-primary pl-4 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3 w-3 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">María López</span>
                    <span className="text-xs text-muted-foreground">hace 2 días</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excelente atención y productos de calidad. Los precios son muy buenos.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StoreDetail;
