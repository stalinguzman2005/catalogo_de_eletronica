// Definición de variables globales y elementos del DOM
const productsContainer = document.getElementById('products-container');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.getElementById('cart-count');
const paymentTotalDisplay = document.getElementById('payment-total-display');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentForm = document.getElementById('payment-form');

// Inicializar el carrito desde LocalStorage
let cart = JSON.parse(localStorage.getItem('shopguzconCart')) || [];

// --- CATÁLOGO DE PRODUCTOS DE ELECTRÓNICA (LISTA ESTÁTICA) ---
const electronicsCatalog = [
    {
        id: 1,
        title: "iPhone 15 Pro Max",
        price: 1399.99,
        description: "El smartphone más potente de Apple con chip A17 Bionic, cámara de 48MP y cuerpo de titanio.",
        category: "Teléfonos Móviles",
        image: "https://m.media-amazon.com/images/I/616mZZm8-7L.jpg",
        rating: { rate: 4.8, count: 250 }
    },
    {
        id: 2,
        title: "Laptop Gamer X500 (RTX 4070)",
        price: 1950.00,
        description: "Portátil de alto rendimiento ideal para juegos y diseño gráfico. 16GB RAM y SSD de 1TB.",
        category: "Laptops",
        image: "https://cl-media.hptiendaenlinea.com/catalog/product/A/1/A14LYLA_1ImagenPrincipalConTexto_b.jpg",
        rating: { rate: 4.6, count: 180 }
    },
    {
        id: 3,
        title: "Monitor Curvo 34'' 144Hz",
        price: 499.50,
        description: "Monitor Ultrawide ideal para multitarea y juegos inmersivos. Resolución QHD.",
        category: "Monitores",
        image: "https://m.media-amazon.com/images/I/71EF1iLDRKL._AC_UF894,1000_QL80_.jpg",
        rating: { rate: 4.5, count: 320 }
    },
    {
        id: 4,
        title: "iPhone SE (2022)",
        price: 429.00,
        description: "Potencia del chip A15 en un diseño compacto y clásico. El iPhone más accesible.",
        category: "Teléfonos Móviles",
        image: "https://www.einfo.co.nz/media/catalog/product/cache/815354ab74b8b2689b03cd87669d24a6/a/p/apple_iphone_se_2022_64gb_starlight.jpg",
        rating: { rate: 4.2, count: 500 }
    },
    {
        id: 5,
        title: "Televisor Smart 4K UHD 65 pulgadas",
        price: 890.99,
        description: "Televisor de última generación con sistema operativo Smart y HDR avanzado para colores vibrantes.",
        category: "Televisores",
        image: "https://easelectric.es/10218-large_default/android-tv-65-ultra-hd-4k-negra.jpg",
        rating: { rate: 4.7, count: 410 }
    },
    {
        id: 6,
        title: "CPU Intel Core i9-14900K",
        price: 589.00,
        description: "El procesador más rápido de Intel para estaciones de trabajo extremas y gaming.",
        category: "CPUs",
        image: "https://m.media-amazon.com/images/I/619ytLAytAL.jpg",
        rating: { rate: 4.9, count: 120 }
    },
    {
        id: 7,
        title: "iPhone 13 Standard",
        price: 699.00,
        description: "Cámara dual avanzada y batería duradera. Un clásico confiable.",
        category: "Teléfonos Móviles",
        image: "https://m.media-amazon.com/images/I/71MKNCEgE6L.jpg",
        rating: { rate: 4.4, count: 650 }
    },
    {
        id: 8,
        title: "MacBook Air M3",
        price: 1099.00,
        description: "Ultra delgado y potente con el chip M3. Perfecto para estudiantes y profesionales.",
        category: "Laptops",
        image: "https://istore.gt/wp-content/uploads/2024/03/1-5.png",
        rating: { rate: 4.9, count: 300 }
    }
];

// --- FUNCIONES PRINCIPALES ---

// 1. Cargar Productos: Simplemente usa la lista estática
function loadProducts() {
    renderProducts(electronicsCatalog);
}

// 2. Renderizar (Dibujar) las tarjetas de productos
function renderProducts(products) {
    productsContainer.innerHTML = ''; // Limpia el contenedor antes de dibujar
    products.forEach(product => {
        // Estructura de la tarjeta Bootstrap
        const productCard = document.createElement('div');
        productCard.className = 'col';
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <div>
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text text-muted">${product.category}</p>
                    </div>
                    <div>
                        <p class="product-price">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#productDetailModal" data-product-id="${product.id}">
                            <i class="fas fa-eye"></i> Ver más
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Asignar el evento para abrir el modal después de renderizar
    document.querySelectorAll('[data-product-id]').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-product-id');
            // Ahora pasamos el catálogo estático a la función
            showProductDetail(productId, electronicsCatalog);
        });
    });
}

// 3. Mostrar Modal de Detalles del Producto
function showProductDetail(productId, products) {
    // Busca el producto en el catálogo de electrónica
    const product = products.find(p => p.id == productId);
    const modalBody = document.getElementById('modal-body-content');

    if (!product) return;

    // Contenido del Modal
    modalBody.innerHTML = `
        <div class="row">
            <div class="col-md-5 modal-img-container">
                <img src="${product.image}" class="modal-img" alt="${product.title}">
            </div>
            <div class="col-md-7">
                <h2>${product.title}</h2>
                <span class="badge bg-secondary mb-3">${product.category}</span>
                <p>${product.description}</p>
                <ul class="list-unstyled">
                    <li><strong class="h3 text-success">$${product.price.toFixed(2)}</strong></li>
                    <li>Valoración: <span class="badge bg-warning text-dark">${product.rating.rate} <i class="fas fa-star"></i></span> (${product.rating.count} opiniones)</li>
                </ul>
                <div class="d-flex align-items-center mt-4">
                    <label for="quantity-${product.id}" class="me-3">Cantidad:</label>
                    <input type="number" id="quantity-${product.id}" class="form-control me-3" value="1" min="1" style="width: 80px;">
                    <button class="btn btn-success" onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price.toFixed(2)}, document.getElementById('quantity-${product.id}').value)">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    `;

    // Cerrar el modal al agregar
    const modalInstance = bootstrap.Modal.getInstance(document.getElementById('productDetailModal'));
    if (modalInstance) {
        const addButton = modalBody.querySelector('.btn-success');
        addButton.onclick = () => {
            const quantityInput = document.getElementById(`quantity-${product.id}`);
            addToCart(product.id, product.title, product.price, quantityInput.value);
            modalInstance.hide(); // Cierra el modal
            alert('✅ Producto agregado al carrito');
        };
    }
}

// 4. Agregar Producto al Carrito
function addToCart(id, title, price, quantity) {
    quantity = parseInt(quantity);
    const existingItemIndex = cart.findIndex(item => item.id === id);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ id, title, price, quantity });
    }

    saveCart();
    renderCart();
}

// 5. Renderizar (Dibujar) el Carrito
function renderCart() {
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="list-group-item text-center text-muted">🛒 El carrito está vacío.</li>';
        cartTotalElement.textContent = '$0.00';
        paymentTotalDisplay.textContent = '$0.00';
        cartCountElement.textContent = '0';
        checkoutBtn.disabled = true;
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Estructura de cada item del carrito
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <div class="me-auto">
                <strong>${item.title}</strong>
                <p class="text-muted mb-0">${item.quantity} x $${item.price.toFixed(2)}</p>
            </div>
            <div class="d-flex align-items-center">
                <input type="number" class="form-control form-control-sm me-2" style="width: 60px;" value="${item.quantity}" min="1" 
                       onchange="updateQuantity(${item.id}, this.value)">
                <span class="text-success me-3">$${itemTotal.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeItem(${item.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        cartItemsList.appendChild(listItem);
    });

    // Actualizar Total y Contador
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    paymentTotalDisplay.textContent = `$${total.toFixed(2)}`;
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    checkoutBtn.disabled = false;
}

// 6. Actualizar Cantidad en el Carrito
function updateQuantity(id, newQuantity) {
    newQuantity = parseInt(newQuantity);
    const item = cart.find(item => item.id === id);

    if (item && newQuantity > 0) {
        item.quantity = newQuantity;
        saveCart();
        renderCart();
    } else if (newQuantity <= 0) {
        removeItem(id);
    }
}

// 7. Eliminar Producto del Carrito
function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    alert('🗑️ Producto eliminado del carrito.');
}

// 8. Persistencia del Carrito (LocalStorage)
function saveCart() {
    localStorage.setItem('shopguzconCart', JSON.stringify(cart));
}

// 9. Pasarela de Pago (Simulación) y Generación de Ticket
paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario (omitiendo validación detallada por brevedad)
    const fullName = document.getElementById('fullName').value;
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvc = document.getElementById('cvc').value;

    if (fullName.length < 3 || cardNumber.length !== 16 || expiryDate.length !== 5 || cvc.length !== 3) {
        alert('⚠️ Por favor, complete todos los campos de pago correctamente.');
        return;
    }

    alert('✅ Pago realizado con éxito. Su pedido está siendo procesado.');
    
    // 10. Generar Ticket en PDF
    generateThermalReceipt(fullName);

    // Limpiar el carrito después del pago
    cart = [];
    saveCart();
    renderCart();

    // Cerrar el modal de pago
    bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();
});


// 10. Función para Generar el Ticket en PDF (jsPDF)
function generateThermalReceipt(customerName) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        unit: 'mm',
        format: [58, 200]
    });

    doc.setFont('Courier');
    doc.setFontSize(8);
    
    let y = 5;
    const lineSpacing = 3;
    const margin = 2;

    // --- ENCABEZADO ---
    doc.setFontSize(10);
    doc.text('*** SHOPGUZCON E-COMMERCE ***', 29, y, { align: 'center' }); y += lineSpacing * 2;
    
    doc.setFontSize(8);
    doc.text('C.I.F.: B-12345678', margin, y); y += lineSpacing;
    doc.text('Dirección: Calle Ficticia No. 100, Digitaland', margin, y); y += lineSpacing;
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, margin, y); y += lineSpacing;
    doc.text(`Hora: ${new Date().toLocaleTimeString()}`, margin, y); y += lineSpacing;
    doc.text(`Cliente: ${customerName}`, margin, y); y += lineSpacing * 2;
    
    // --- LÍNEA DE SEPARACIÓN ---
    doc.text('----------------------------------------------------', margin, y); y += lineSpacing;

    // --- DETALLE DE PRODUCTOS ---
    doc.setFontSize(8);
    let totalFinal = 0;
    
    // Encabezados de la tabla
    doc.text('CANT.', margin, y);
    doc.text('DESCRIPCION', 12, y);
    doc.text('PRECIO', 38, y);
    doc.text('TOTAL', 48, y);
    y += lineSpacing;
    doc.text('----------------------------------------------------', margin, y); y += lineSpacing;

    // Items del carrito
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalFinal += itemTotal;
        
        const quantityStr = String(item.quantity).padEnd(5);
        const priceStr = item.price.toFixed(2).padStart(6);
        const totalStr = itemTotal.toFixed(2).padStart(6);
        
        doc.text(quantityStr, margin, y);
        doc.text(item.title.substring(0, 20), 12, y);
        doc.text(priceStr, 38, y);
        doc.text(totalStr, 48, y);
        y += lineSpacing;
    });

    // --- PIE DE PÁGINA ---
    doc.text('----------------------------------------------------', margin, y); y += lineSpacing;
    
    // TOTAL
    doc.setFontSize(10);
    doc.text('TOTAL A PAGAR:', 12, y);
    doc.text(`$${totalFinal.toFixed(2)}`, 48, y, { align: 'right' }); y += lineSpacing * 2;
    
    doc.setFontSize(8);
    doc.text('----------------------------------------------------', margin, y); y += lineSpacing;
    doc.text('¡GRACIAS POR SU COMPRA!', 29, y, { align: 'center' }); y += lineSpacing;
    doc.text('Vuelva pronto!', 29, y, { align: 'center' }); y += lineSpacing;

    // Guarda el PDF con el nombre del recibo
    doc.save(`Recibo_ShopGuzCon_${new Date().getTime()}.pdf`);
}


// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    loadProducts(); // Carga los productos desde la lista estática
    renderCart();    // Dibuja el carrito desde LocalStorage
});