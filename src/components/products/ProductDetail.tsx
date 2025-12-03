import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { mockStores } from "@/components/map/mocks"; 

export const ProductDetail = ({ product, onBack }) => {
  const navigate = useNavigate(); 

  if (!product) return null;

  const storeOwner = mockStores.find(store => store.id === product.storeId);

  const handleGoToMap = () => {
    if (!storeOwner) {
      alert("No se encontró la ubicación de esta tienda.");
      return;
    }

    navigate('/map', { 
      state: { 
        targetStore: storeOwner, 
        center: [storeOwner.coordinates.lat, storeOwner.coordinates.lng], 
        zoom: 18 
      } 
    });
  };

  // Función anterior de WhatsApp (Opcional, si quieres mantener ambos botones)
  const handleContactWhatsApp = () => {
     // ... tu lógica de WhatsApp anterior ...
     if (!storeOwner) return;
     const message = `Hola ${storeOwner.name}, vi el producto ${product.name}...`;
     
  };

  return (
    <div style={{ padding: '20px 0', animation: 'fadeIn 0.3s' }}>
      
      <button 
        onClick={onBack}
        style={{ marginBottom: '20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', color: '#555'}}
      >
        ← Volver al catálogo
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* IMAGEN */}
        <div style={{ flex: '1 1 400px', maxWidth: '600px' }}>
          <div style={{ backgroundColor: '#f5f5f5', borderRadius: '12px', overflow: 'hidden', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* INFO */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <span style={{ color: '#EAB308', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px' }}>
               TIENDA: {storeOwner ? storeOwner.name.toUpperCase() : 'DESCONOCIDA'}
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '10px 0', lineHeight: 1.1 }}>
              {product.name}
            </h1>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#000' }}>
              S/ {product.price.toFixed(2)}
            </span>
          </div>

          <p style={{ lineHeight: '1.6', color: '#555' }}>
            {product.description || "Encuentra este producto y muchos más visitando nuestra tienda física en Gamarra."}
          </p>

          {/* ... Selectores de Color y Talla (Igual que antes) ... */}

          {/* 4. BOTONES DE ACCIÓN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            
            {/* BOTÓN A: IR AL MAPA */}
            <button 
                onClick={handleGoToMap}
                style={{ 
                backgroundColor: 'black', 
                color: 'white', 
                padding: '18px', 
                border: 'none', 
                fontWeight: 'bold', 
                fontSize: '1rem', 
                cursor: 'pointer',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                }}
            >
                <span>Ubicar tienda en Mapa</span>
            </button>

           
          </div>

          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
            Stock disponible: {product.quantity} unidades en <strong>{storeOwner?.name}</strong>
          </div>

        </div>
      </div>
    </div>
  );
};