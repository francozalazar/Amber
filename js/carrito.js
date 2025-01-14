document.addEventListener("DOMContentLoaded", () => {
    const buyButtons = document.querySelectorAll(".buy-button");
    const cartItems = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartIconContainer = document.getElementById("cart-icon-container");
    const cartDropdown = document.getElementById("cart-dropdown");

    let totalPrice = 0;
    const cart = {}; // Objeto para rastrear productos y cantidades

    // Function to update cart dropdown visibility
    const toggleCartDropdown = () => {
        if (cartDropdown.classList.contains("hidden")) {
            cartDropdown.classList.remove("hidden");
            cartDropdown.classList.add("visible");
        } else {
            cartDropdown.classList.remove("visible");
            cartDropdown.classList.add("hidden");
        }
    };

    // Function to update cart display
    const updateCartDisplay = () => {
        cartItems.innerHTML = ""; // Limpia el contenido previo

        for (const [productName, productDetails] of Object.entries(cart)) {
            const { quantity, price, image } = productDetails;

            if (productName && quantity > 0) {
                const listItem = document.createElement("li");

                // Crear la estructura del carrito con imagen y texto
                const productImage = document.createElement("img");
                productImage.src = image;
                productImage.alt = productName;
                productImage.className = "cart-product-image";

                const productText = document.createElement("span");
                productText.textContent = `${productName} x${quantity} - $${(price * quantity).toFixed(3)}`;

                listItem.appendChild(productImage);
                listItem.appendChild(productText);
                cartItems.appendChild(listItem);
            }
        }

        totalPriceElement.textContent = totalPrice.toFixed(3);
    };

    // Event listener for buy buttons
    buyButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-product");
            const productPrice = parseFloat(button.getAttribute("data-price"));
            const productImage = button.getAttribute("data-image");

            if (!productName || isNaN(productPrice) || !productImage) {
                console.error("Error: Producto, precio o imagen no válidos.");
                return;
            }

            // Update cart data
            if (cart[productName]) {
                cart[productName].quantity += 1;
            } else {
                cart[productName] = { quantity: 1, price: productPrice, image: productImage };
            }

            // Update total price
            totalPrice += productPrice;

            // Update cart display
            updateCartDisplay();

            // Show notification for added product
            showProductNotification(productName);
        });
    });

    // Function to show product notification
    function showProductNotification(productName) {
        const notification = document.createElement("div");
        notification.className = "product-notification";
        notification.textContent = `${productName} fue agregado al carrito.`;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event listener for cart icon to toggle dropdown
    cartIconContainer.addEventListener("click", toggleCartDropdown);
});
