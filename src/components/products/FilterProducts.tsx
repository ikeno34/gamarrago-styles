import React, { useState } from 'react';

export const Navbar = ({ selectedGender, setSelectedGender, setSelectedCategory }) => {
  const [showMenu, setShowMenu] = useState(false);

  // Estructura del menú
  const menuStructure = {
    "Mujer": ["Polos", "Zapatos", "Zapatillas", "Camisas", "Faldas", "Vestidos"],
    "Hombre": ["Polos", "Pantalones", "Shorts", "Jeans"],
    "Calzado": ["Zapatillas", "Sandalias"],
    "Colecciones": ["Anime", "Música", "Urbano", "Verano", "Deportivo"]
  };

  return (
    <nav style={{ borderBottom: '1px solid #e5e5e5', position: 'relative', backgroundColor: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* IZQUIERDA: LOGO + GÉNEROS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', height: '100%' }}>
          
          <div style={{ fontWeight: '900', fontSize: '24px', letterSpacing: '-1px', cursor: 'pointer' }} onClick={() => setSelectedCategory('Todos')}>
            LOGO
          </div>

          <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
            {['Todos', 'Hombre', 'Mujer', 'Niño'].map(gender => (
              <div 
                key={gender}
                onClick={() => {
                  setSelectedGender(gender);
                  setSelectedCategory('Todos');
                }}
                style={{ 
                  cursor: 'pointer', 
                  display: 'flex',
                  alignItems: 'center',
                  height: '100%',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  color: selectedGender === gender ? 'black' : '#888',
                  borderBottom: selectedGender === gender ? '3px solid black' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {gender.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        {/* DERECHA: MENU TIENDA Y EXTRAS */}
        <div style={{ display: 'flex', gap: '30px', height: '100%' }}>
          
          {/* BOTÓN TIENDA (MEGA MENU) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              height: '100%', 
              cursor: 'pointer',
              fontWeight: 'bold',
              borderBottom: showMenu ? '3px solid black' : '3px solid transparent'
            }}
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
          >
            TIENDA
            
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: '60px',
                left: 0,
                width: '100%',
                backgroundColor: 'white',
                zIndex: 50,
                borderTop: '1px solid #eee',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '30px 0',
                cursor: 'default'
              }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', gap: '60px' }}>
                  
                  {Object.entries(menuStructure).map(([title, items]) => (
                    <div key={title} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <h4 style={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>
                        {title}
                      </h4>
                      {items.map(item => (
                        <span 
                          key={item}
                          onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCategory(item);
                              setShowMenu(false);
                          }}
                          className="hover:text-black hover:underline"
                          style={{ cursor: 'pointer', color: '#555', fontSize: '0.95rem' }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ))}

                  <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
                    <h4 style={{ fontWeight: 'bold', color: '#EAB308' }}>IMPERDIBLES</h4>
                    <button 
                      onClick={() => {
                          setSelectedCategory('Todos');
                          setSelectedGender('Todos');
                          setShowMenu(false);
                      }}
                      style={{ marginTop: '10px', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontWeight: 'bold' }}
                    >
                      Ver todo →
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>OFERTAS</div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: 'bold' }}>AYUDA</div>
        </div>
      </div>
    </nav>
  );
};