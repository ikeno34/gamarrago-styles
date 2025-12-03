import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export const StoreListContent = ({ stores, onStoreClick }) => {
  return (
    <>
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
          <Button asChild>
          <Link to="/products">Ir a mi página</Link>
        </Button>
        </div>
      </div>

      <div className="divide-y flex-1 overflow-y-auto">
        {stores.length === 0 && (
          <p className="p-4 text-center text-muted-foreground">
            No se encontraron tiendas.
          </p>
        )}
        {stores.map((store) => (
          <Card
            key={store.id}
            className="border-0 rounded-none cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => onStoreClick(store)}
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
                    <span className="text-muted-foreground">
                      {store.distance}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </>
  );
};