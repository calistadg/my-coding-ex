import React, { useState } from 'react';

const initialProducts = [
    { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: '$99' },
    { id: 2, name: 'Ergonomic Chair', category: 'Furniture', price: '$199' },
    { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: '$120' },
    { id: 4, name: 'Coffee Mug', category: 'Kitchen', price: '$15' },
    { id: 5, name: 'Standing Desk', category: 'Furniture', price: '$450' },
    { id: 6, name: 'Blender', category: 'Kitchen', price: '$60' }
];

const categories = ['All', 'Electronics', 'Furniture', 'Kitchen'];

export default function SearchFilter() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);

    // Filter products in real time based on search term and category
    const filteredProducts = initialProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Handle keyboard events (Escape to clear, Enter to favorite first result)
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setSearchTerm('');
        } else if (e.key === 'Enter') {
            if (filteredProducts.length > 0) {
                toggleFavorite(filteredProducts[0].id);
            }
        }
    };

    // Toggle item in favorites
    const toggleFavorite = (productId) => {
        setFavorites((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto', fontFamily: 'sans-serif' }}>
            <h2>Real-time Search Filter</h2>

            {/* Controls Container */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search products... (Press Enter to select first result, Esc to clear)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Product List */}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => {
                        const isFav = favorites.includes(product.id);
                        return (
                            <li
                                key={product.id}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px',
                                    borderBottom: '1px solid #eee',
                                    backgroundColor: isFav ? '#fff8e7' : 'transparent',
                                    borderRadius: '4px',
                                    margin: '4px 0'
                                }}
                            >
                                <div>
                                    <strong>{product.name}</strong> —
                                    <span style={{ color: '#666', fontSize: '14px', marginLeft: '6px' }}>
                                        {product.category}
                                    </span>
                                    <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{product.price}</span>
                                </div>

                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    style={{
                                        background: 'none',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '6px 12px',
                                        cursor: 'pointer',
                                        backgroundColor: isFav ? '#ffc107' : '#fff'
                                    }}
                                >
                                    {isFav ? '★ Favorited' : '☆ Favorite'}
                                </button>
                            </li>
                        );
                    })
                ) : (
                    <li style={{ color: '#888', fontStyle: 'italic', padding: '10px 0' }}>
                        No products found.
                    </li>
                )}
            </ul>
        </div>
    );
}