import { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Filter,
  Star,
  User,
  Navigation,
  List, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mockStores } from "@/components/map/mocks";
// 1. IMPORTAR useLocation
import { Link, useLocation } from "react-router-dom"; 
import { StoreListContent } from "@/components/map/StoreListContent";
import Header from "@/components/utils/Header";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaWtlbm8xMjMiLCJhIjoiY21obGJ5ZmtrMHM4MzJxcHNjeTl6d3djYiJ9.UzZw8HbFmaGkwThT3suEcQ";

const GAMARRA_CENTER = {
  lat: -12.0573,
  lng: -77.0133,
};

const MapComponent = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [hasRoute, setHasRoute] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const markersRef = useRef([]);

  // 2. OBTENER EL ESTADO DE LA NAVEGACIÓN
  const location = useLocation(); 

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [GAMARRA_CENTER.lng, GAMARRA_CENTER.lat],
      zoom: 16,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.current.addControl(geolocate, "bottom-right");

    map.current.on("load", () => {
      geolocate.trigger();

      geolocate.on("geolocate", (e) => {
        setUserLocation({
          lat: e.coords.latitude,
          lng: e.coords.longitude,
        });
      });

      // Crear marcadores de tiendas
      mockStores.forEach((store) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.innerHTML = `
          <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C10.477 0 6 4.477 6 10C6 17.5 16 30 16 30C16 30 26 17.5 26 10C26 4.477 21.523 0 16 0ZM16 14C13.7909 14 12 12.2091 12 10C12 7.79086 13.7909 6 16 6C18.2091 6 20 7.79086 20 10C20 12.2091 18.2091 14 16 14Z" fill="#9C27B0"/>
          </svg>
        `;
        el.style.cursor = "pointer";
        el.style.width = "32px";
        el.style.height = "48px";

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
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

        const marker = new mapboxgl.Marker(el)
          .setLngLat([store.coordinates.lng, store.coordinates.lat])
          .setPopup(popup)
          .addTo(map.current);

        el.addEventListener("click", () => {
          setSelectedStore(store);
          map.current.flyTo({
             center: [store.coordinates.lng, store.coordinates.lat],
             zoom: 18,
             duration: 1500,
           });
        });

        markersRef.current.push(marker);
      });

      // 3. LÓGICA DE REDIRECCIÓN DESDE PRODUCTO
      // Si venimos de ProductDetail, location.state tendrá la tienda objetivo
      if (location.state && location.state.targetStore) {
        const { targetStore } = location.state;
        
        // Enfocar el mapa en la tienda
        map.current.flyTo({
          center: [targetStore.coordinates.lng, targetStore.coordinates.lat],
          zoom: 18,
          duration: 2000, // Un poco más lento para que se note el movimiento
        });

        // Abrir automáticamente el modal de la tienda
        setSelectedStore(targetStore);
      }

    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  // Agregamos location a las dependencias, aunque el mapa solo se inicializa una vez
  }, [location]); 

  const centerOnUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (map.current) {
            map.current.flyTo({
              center: [position.coords.longitude, position.coords.latitude],
              zoom: 17,
              duration: 2000,
            });
          }
        },
        () => alert("No se pudo obtener tu ubicación. Activa el GPS.")
      );
    } else {
      alert("Tu navegador no soporta geolocalización.");
    }
  };

  const drawRoute = async (destination) => {
    if (!userLocation || !map.current) {
      alert("Primero permite el acceso a tu ubicación.");
      return;
    }

    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${userLocation.lng},${userLocation.lat};${destination.lng},${destination.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
    );

    const data = await query.json();
    if (!data.routes || data.routes.length === 0) {
      alert("No se pudo calcular la ruta.");
      return;
    }

    const route = data.routes[0].geometry;

    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: route,
      },
    });

    map.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: { "line-cap": "round", "line-join": "round" },
      paint: {
        "line-color": "#8B5CF6",
        "line-width": 6,
        "line-opacity": 0.8,
      },
    });

    const bounds = new mapboxgl.LngLatBounds();
    route.coordinates.forEach((coord) => bounds.extend(coord));
    map.current.fitBounds(bounds, { padding: 60 });

    setHasRoute(true);
  };

  const clearRoute = () => {
    if (map.current && map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
      setHasRoute(false);
    }
  };

  const handleStoreClick = (store) => {
    setSelectedStore(store);
    if (map.current) {
      map.current.flyTo({
        center: [store.coordinates.lng, store.coordinates.lat],
        zoom: 18,
        duration: 1500,
      });
    }
    setMobileSheetOpen(false); 
  };

  const filteredStores = mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 relative">
          <div ref={mapContainer} className="w-full h-full" />

          <Button
            onClick={centerOnUser}
            className="absolute bottom-28 md:bottom-24 right-6 h-12 w-12 rounded-full shadow-lg bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 z-10"
            size="icon"
            title="Mi ubicación"
          >
            <Navigation className="h-5 w-5 text-white" />
          </Button>

          {hasRoute && (
            <Button
              onClick={clearRoute}
              className="absolute bottom-44 md:bottom-40 right-6 h-12 w-12 rounded-full shadow-lg bg-gradient-to-br from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 z-10 text-white"
              size="icon"
              title="Borrar ruta"
            >
              ✕
            </Button>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 md:hidden">
            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  size="lg"
                  className="rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <List className="mr-2 h-5 w-5" />
                  Ver Lista
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="h-[70vh] flex flex-col p-0"
              >
                <StoreListContent
                  stores={filteredStores}
                  onStoreClick={handleStoreClick}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <aside className="w-96 bg-card border-l hidden md:flex md:flex-col">
          <StoreListContent
            stores={filteredStores}
            onStoreClick={handleStoreClick}
          />
        </aside>
      </div>

      {selectedStore && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStore(null)}
        >
          <div
            className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <h2 className="text-2xl font-bold mb-1">
                    {selectedStore.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedStore.category}
                  </p>
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
                    <p className="text-sm text-muted-foreground">
                      {selectedStore.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={() => {
                      drawRoute(selectedStore.coordinates);
                      setSelectedStore(null);
                    }}
                  >
                    Cómo llegar
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setSelectedStore(null)}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;