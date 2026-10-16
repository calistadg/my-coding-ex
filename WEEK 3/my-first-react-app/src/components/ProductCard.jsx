import React from "react";

function ProductCard({ name = "Unknown Item", isOnSale = false }) {
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
            <span className="text-xs font-bold text-slate-800">{name}</span>
            {isOnSale && (
                <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                    SALE
                </span>
            )}
        </div>
    );
}

export default ProductCard;