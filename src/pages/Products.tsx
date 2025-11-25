import Header from "@/components/utils/Header";
// 1. CORRECCIÓN: Tu import debe ser 'mockStores' (nombrado), no 'Mocks' (default)
//    (Basado en el código que me mostraste: "export const mockStores = [...]")
import { mockStores } from "@/components/map/mocks"; 

export const Products = () => {
  return (
    <>
      <Header />
      <section style={{ padding: '16px' }}> {/* Añadí un padding a la sección */}
        
        {/* Puedes cambiar el título para que coincida con tus datos */}
        <h2>Tiendas Destacadas</h2>

        <ul style={{
          display: 'flex',
          flexWrap: 'wrap', // Para que se ajusten en varias líneas si no caben
          gap: '16px',
          listStyle: 'none',
          padding: 0
        }}>
          
          {/* 2. AQUÍ ESTÁ LA MAGIA: Iteramos sobre el arreglo mockStores */}
          {mockStores.map((store) => (
            
            // 3. Añadimos una 'key' única, fundamental para React
            <li key={store.id}>
              <article>
                {/* 4. Damos estilos a la tarjeta, quitamos el fondo rojo */}
                <div style={{
                  backgroundColor: 'white',
                  width: '200px', // Un ancho fijo para cada tarjeta
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                  overflow: 'hidden' // Para que la imagen no se salga
                }}>
                  
                  {/* 5. Usamos los datos de 'store' para la imagen */}
                  <img
                    src={store.image}
                    alt={store.name}
                    // Usamos style para la imagen
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover'
                    }}
                  />
                  
                  {/* 6. Creamos un contenedor para el texto con padding */}
                  <div style={{ padding: '12px' }}>
                    
                    {/* 7. Usamos los datos de 'store' para el texto */}
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', margin: 0 }}>
                      {store.name}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: '#555', margin: '4px 0' }}>
                      {store.category}
                    </p>
                    <span style={{ fontWeight: 'bold', color: '#EAB308' }}>
                      ★ {store.rating}
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}

        </ul>
        
      </section>
    </>
  );
};

export default Products;