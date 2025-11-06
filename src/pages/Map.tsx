import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Filter, Star, User, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = 'pk.eyJ1IjoiaWtlbm8xMjMiLCJhIjoiY21obGJ5ZmtrMHM4MzJxcHNjeTl6d3djYiJ9.UzZw8HbFmaGkwThT3suEcQ';


const GAMARRA_CENTER = {
  lat: -12.0573,
  lng: -77.0133
};

const mockStores = [
  {
    id: 1,
    name: "Moda Femenina Rosa",
    category: "Ropa de Mujer",
    address: "Galería El Dorado, Piso 2, Tienda 215",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400",
    distance: "150m",
    coordinates: { lat: -12.0573, lng: -77.0133 }
  },
  {
    id: 2,
    name: "Zapatería Premium",
    category: "Calzado",
    address: "Galería Guisado, Piso 1, Tienda 102",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
    distance: "220m",
    coordinates: { lat: -12.0580, lng: -77.0140 }
  },
  {
    id: 3,
    name: "Telas y Textiles",
    category: "Telas",
    address: "Jr. Gamarra 845, Local 3",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400",
    distance: "180m",
    coordinates: { lat: -12.0565, lng: -77.0125 }
  },
  {
    id: 4,
    name: "Accesorios VIP",
    category: "Accesorios",
    address: "Galería Unicachi, Piso 3, Tienda 305",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400",
    distance: "340m",
    coordinates: { lat: -12.0585, lng: -77.0120 }
  },
];

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const markersRef = useRef([]);

  
  useEffect(() => {
    if (map.current) return; 
    if (!mapContainer.current) return; 

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [GAMARRA_CENTER.lng, GAMARRA_CENTER.lat],
        zoom: 16
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      });
      map.current.addControl(geolocate, 'bottom-right');

      map.current.on('load', () => {
        mockStores.forEach(store => {
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.innerHTML = `
            <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C10.477 0 6 4.477 6 10C6 17.5 16 30 16 30C16 30 26 17.5 26 10C26 4.477 21.523 0 16 0ZM16 14C13.7909 14 12 12.2091 12 10C12 7.79086 13.7909 6 16 6C18.2091 6 20 7.79086 20 10C20 12.2091 18.2091 14 16 14Z" fill="#9C27B0"/>
            </svg>
          `;
          el.style.cursor = 'pointer';
          el.style.width = '32px';
          el.style.height = '48px';

          const popup = new mapboxgl.Popup({ 
            offset: 25,
            closeButton: false
          }).setHTML(`
            <div style="padding: 12px; min-width: 180px;">
              <h3 style="margin: 0 0 4px 0; font-weight: 600; font-size: 14px; color: #1a1a1a;">${store.name}</h3>
              <p style="margin: 0 0 6px 0; color: #666; font-size: 12px;">${store.category}</p>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="color: #FFC107; font-size: 14px;">★</span>
                <span style="font-size: 12px; font-weight: 600; color: #1a1a1a;">${store.rating}</span>
                <span style="color: #999; font-size: 12px;">• ${store.distance}</span>
              </div>
            </div>
          `);

          // Crear y añadir marcador
          const marker = new mapboxgl.Marker(el)
            .setLngLat([store.coordinates.lng, store.coordinates.lat])
            .setPopup(popup)
            .addTo(map.current);

          // Evento click en el marcador
          el.addEventListener('click', () => {
            setSelectedStore(store);
          });

          markersRef.current.push(marker);
        });
      });
    } catch (error) {
      console.error('Error al inicializar el mapa:', error);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Función para centrar en la ubicación del usuario
  const centerOnUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (map.current) {
            map.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 17,
              duration: 2000
            });
          }
        },
        (error) => {
          alert("No se pudo obtener tu ubicación. Activa el GPS en tu navegador.");
        }
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    // Centrar el mapa en la tienda seleccionada
    if (map.current) {
      map.current.flyTo({
        center: [store.coordinates.lng, store.coordinates.lat],
        zoom: 18,
        duration: 1500
      });
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm px-4 py-3 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
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
        <div className="flex-1 relative">
          <div 
            ref={mapContainer} 
            className="w-full h-full"
          />

          {/* GPS Button */}
          <Button
            onClick={centerOnUser}
            className="absolute bottom-24 right-6 h-12 w-12 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 z-10"
            size="icon"
            title="Mi ubicación"
          >
            <Navigation className="h-5 w-5 text-white" />
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
              <Badge className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0">
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
                onClick={() => handleStoreClick(store)}
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
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedStore(null)}>
          <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-64">
              <img
                src={selectedStore.image}
                alt={selectedStore.name}
                className="w-full h-full object-cover rounded-t-xl"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 rounded-full"
                onClick={() => setSelectedStore(null)}
              >
                ✕
              </Button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedStore.name}</h2>
                  <p className="text-muted-foreground">{selectedStore.category}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-400/20 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{selectedStore.rating}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-sm text-muted-foreground">{selectedStore.address}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => {
                      window.open(`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}`, '_blank');
                    }}
                  >
                    Cómo llegar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Llamar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .mapboxgl-ctrl-bottom-right {
          bottom: 80px !important;
        }
        
        .custom-marker {
          transition: transform 0.3s ease;
        }
        
        .custom-marker:hover {
          transform: translateY(-5px);
        }
        
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .mapboxgl-popup-close-button {
          display: none;
        }
        
        .mapboxgl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  );
};

export default MapComponent;
