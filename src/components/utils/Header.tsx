import { useState } from "react";
import {
  MapPin,
  Search,
  User,
  Star,
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

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Aquí empieza el "return" que faltaba
  return (
    <header className="bg-card border-b shadow-sm px-4 py-3 flex items-center gap-4 z-10">
      {/* 2. El comentario ahora está dentro del JSX */}
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
  ); 
}; 

export default Header;
