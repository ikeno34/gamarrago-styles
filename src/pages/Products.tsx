import React, { useState } from 'react';
import Header from "@/components/utils/Header";
import data from "@/components/products/products.json"; 
import { ProductDetail } from "@/components/products/ProductDetail"; 

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
    <line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
    <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line>
    <line x1="17" y1="16" x2="23" y2="16"></line>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const Products = () => {
  const [selectedGender, setSelectedGender] = useState('Hombre'); 
  const [selectedCategory, setSelectedCategory] = useState('Todo');
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const menuStructure = {
    "Mujer": ["Polos","Zapatos","Zapatillas","Camisas","Faldas","Vestidos"],
    "Hombre": ["Polos", "Pantalones", "Shorts", "Jeans"],
    "Calzado": ["Zapatillas", "Sandalias"],
    "Colecciones": ["Anime", "Música", "Urbano", "Verano", "Deportivo"]
  };

  const filteredProducts = data.products.filter(product => {
    if (selectedGender !== 'Todo' && !product.gender.includes(selectedGender)) {
        return false;
    }
    if (selectedCategory === 'Todo') return true;
    return product.category.includes(selectedCategory);
  });

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const resetFilters = () => {
    setSelectedCategory('Todo');
    setSelectedProduct(null);
    setShowMobileFilters(false);
  };

  return (
    <>
      <style>{`
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .desktop-menu {
            display: flex;
            align-items: center;
            gap: 20px;
            height: 100%;
        }

        .mobile-filter-btn {
            display: none; 
        }

        /* --- CAMBIO MÁGICO PARA LA GRILLA --- */
        .product-grid {
          display: grid;
          /* minmax(140px, 1fr):
             - 140px es el ancho mínimo. Si caben dos de 140px + el espacio, pondrá 2 columnas.
             - Si el celular es muy ancho, se estirarán (1fr).
             - Esto evita que se corten o que se vea solo 1 si caben 2.
          */
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 15px; /* Espacio moderado entre tarjetas */
          list-style: none;
          padding: 0;
        }

        /* En pantallas más grandes (PC/Tablet), aumentamos el tamaño mínimo */
        @media (min-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 30px;
          }
          
          .nav-container { padding: 0 20px; }
        }

        @media (max-width: 768px) {
            .desktop-menu { display: none; }
            
            .mobile-filter-btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                background-color: #f3f4f6;
                border: 1px solid #e5e7eb;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
            }
        }

        .product-card {
          background-color: white;
          width: 100%;
          cursor: pointer;
          transition: transform 0.2s;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image-container {
          width: 100%;
          aspect-ratio: 1 / 1;
          background-color: #f5f5f5;
          position: relative;
        }

        /* Modal Móvil y otros estilos se mantienen igual */
        .mobile-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            display: flex;
            justify-content: flex-end;
        }
        .mobile-modal-content {
            width: 80%;
            max-width: 350px;
            background: white;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
        .filter-section {
            margin-bottom: 25px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        .filter-tag {
            display: inline-block;
            padding: 6px 12px;
            margin: 0 8px 8px 0;
            border-radius: 4px;
            font-size: 0.9rem;
            cursor: pointer;
            border: 1px solid #eee;
        }
        .filter-tag.active {
            background-color: black;
            color: white;
            border-color: black;
        }
      `}</style>

      <Header />
      
      <nav style={{ borderBottom: '1px solid #e5e5e5', position: 'relative', backgroundColor: 'white' }}>
        <div className="nav-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div 
                    style={{ fontWeight: '900', fontSize: '24px', letterSpacing: '-1px', cursor: 'pointer' }} 
                    onClick={resetFilters}
                >
                    LOGO
                </div>

                <button 
                    className="mobile-filter-btn"
                    onClick={() => setShowMobileFilters(true)}
                >
                    <FilterIcon /> 
                    Filtros
                </button>
            </div>

            <div className="desktop-menu">
              {['Todo', 'Hombre', 'Mujer', 'Niño'].map(gender => (
                <div 
                  key={gender}
                  onClick={() => {
                    setSelectedGender(gender);
                    setSelectedCategory('Todo');
                    setSelectedProduct(null);
                  }}
                  style={{ 
                    cursor: 'pointer', 
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: selectedGender === gender ? 'black' : '#888',
                    borderBottom: selectedGender === gender ? '2px solid black' : '2px solid transparent',
                    padding: '18px 0',
                    transition: 'all 0.2s'
                  }}
                >
                  {gender.toUpperCase()}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '20px', height: '100%', alignItems: 'center' }}>
                <div 
                  className="desktop-menu"
                  style={{ 
                    position: 'relative',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    height: '100%',
                    alignItems: 'center',
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
                      right: '-50px', 
                      width: '600px', 
                      backgroundColor: 'white',
                      zIndex: 50,
                      border: '1px solid #eee',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      padding: '30px',
                      cursor: 'default',
                      display: 'flex',
                      gap: '40px'
                    }}>
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
                                    setSelectedProduct(null);
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
                        <div style={{ borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                          <h4 style={{ fontWeight: 'bold', color: '#EAB308' }}>IMPERDIBLES</h4>
                          <button 
                            onClick={() => {
                                setSelectedCategory('Todo');
                                setSelectedGender('Todo');
                                setSelectedProduct(null);
                                setShowMenu(false);
                            }}
                            style={{ marginTop: '10px', textDecoration: 'underline', cursor: 'pointer', background: 'none', border: 'none', padding: 0, fontWeight: 'bold' }}
                          >
                            Ver todo →
                          </button>
                        </div>
                    </div>
                  )}
                </div>
                
                <div style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>AYUDA</div>
            </div>
        </div>
      </nav>

      {showMobileFilters && (
        <div className="mobile-modal-overlay" onClick={() => setShowMobileFilters(false)}>
            <div className="mobile-modal-content" onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Filtros</h2>
                    <div onClick={() => setShowMobileFilters(false)} style={{ cursor: 'pointer' }}>
                        <CloseIcon />
                    </div>
                </div>

                <div className="filter-section">
                    <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '10px' }}>Género</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {['Todo', 'Hombre', 'Mujer', 'Niño'].map(gender => (
                            <span 
                                key={gender}
                                className={`filter-tag ${selectedGender === gender ? 'active' : ''}`}
                                onClick={() => setSelectedGender(gender)}
                            >
                                {gender}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="filter-section">
                    <h3 style={{ fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '10px' }}>Categorías</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        <span 
                             className={`filter-tag ${selectedCategory === 'Todo' ? 'active' : ''}`}
                             onClick={() => setSelectedCategory('Todo')}
                        >
                            Todo
                        </span>
                        {Object.values(menuStructure).flat().filter((item, index, self) => self.indexOf(item) === index).map(cat => (
                             <span 
                                key={cat}
                                className={`filter-tag ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                           >
                               {cat}
                           </span>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => setShowMobileFilters(false)}
                    style={{ width: '100%', padding: '15px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem' }}
                >
                    VER RESULTADOS ({filteredProducts.length})
                </button>
            </div>
        </div>
      )}

      <div className="text-black p-4" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        
        {selectedProduct ? (
            <ProductDetail product={selectedProduct} onBack={handleBack} />
        ) : (
            <>
                <div style={{ padding: '10px 0 20px 0' }}>
                    <span style={{fontSize: '0.8rem', color: '#888', textTransform: 'uppercase'}}>
                        {selectedGender} / {selectedCategory}
                    </span>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', fontStyle: 'italic', marginTop: '5px', lineHeight: '1.2' }}>
                        {selectedCategory === 'Todo' 
                            ? (selectedGender === 'Todo' ? 'CATÁLOGO COMPLETO' : `TODO PARA ${selectedGender.toUpperCase()}`)
                            : selectedCategory.toUpperCase()}
                    </h1>
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>{filteredProducts.length} Artículos</span>
                </div>

                <section>
                {filteredProducts.length === 0 ? (
                    <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
                    <p>No se encontraron productos con estos filtros.</p>
                    <button 
                        onClick={resetFilters}
                        style={{marginTop: '20px', padding: '10px 20px', background: 'black', color: 'white', border: 'none', cursor: 'pointer'}}
                    >
                        Limpiar filtros
                    </button>
                    </div>
                ) : (
                    <ul className="product-grid">
                    {filteredProducts.map((product) => (
                        <li key={product.id}>
                        <article>
                            <div 
                                onClick={() => setSelectedProduct(product)}
                                className="product-card"
                            >
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <span style={{ position: 'absolute', bottom: '10px', left: '10px', backgroundColor: 'white', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                                S/ {product.price.toFixed(2)}
                                </span>
                            </div>
                            <div style={{ padding: '10px 0' }}>
                                <h3 style={{ fontSize: '0.9rem', margin: 0, fontWeight: 'normal', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {product.name}
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#888', margin: '4px 0' }}>{product.category[1]}</p>
                            </div>
                            </div>
                        </article>
                        </li>
                    ))}
                    </ul>
                )}
                </section>
            </>
        )}
      </div>
    </>
  );
};

export default Products;