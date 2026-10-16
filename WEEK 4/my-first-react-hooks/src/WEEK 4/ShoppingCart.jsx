import { useState } from "react";

function ShoppingCart() {
    const product = [
        {
            id: 1,
            name: 'Apple',
            price: 2
        },
        {
            id: 2,
            name: 'Orange',
            price: 3
        },
        {
            id: 3,
            name: 'Banana',
            price: 1.5
        },
    ];

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <h2>Shopping Cart</h2>
            <h3>Products</h3>
            {product.map((product) => (
                <div key={product.id}>
                    {product.name} - ${product.price}
                    <button onClick={() => addToCart(product)}>Add</button>
                </div>
            ))}

            <h3>Cart</h3>
            {cart.map((item, index) => (
                <div key={index}>
                    {item.name} - ${item.price}
                    <button onClick={() => removeFromCart(index)}>Remove</button>
                </div>
            ))}

            <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
            );
}

export default ShoppingCart;
