
import ProductCard from "./ProductCard.jsx";

function ProductList() {
    const products = [
        { id: 1, name: "Ask AI", isOnSale: true },
        { id: 2, name: "Certificate Library", isOnSale: false },
        { id: 3, name: "Verify Halal Logo", isOnSale: true },
        { id: 4, name: "Training", isOnSale: false },
    ];

    return (
        <div className="p-4 max-w-sm mx-auto">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
                {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;