document.addEventListener('DOMContentLoaded', () => {

    const productsCarousel = document.querySelector('[data-products-carousel]');
    if (productsCarousel) {
        const viewport = productsCarousel.querySelector('.product-carousel-viewport');
        const track = productsCarousel.querySelector('.featured-products-track');
        const previousButton = productsCarousel.querySelector('[data-carousel-previous]');
        const nextButton = productsCarousel.querySelector('[data-carousel-next]');
        const position = productsCarousel.querySelector('[data-carousel-position]');
        const cards = Array.from(track.children);

        function updateCarousel() {
            const cardStep = cards[1]
                ? cards[1].offsetLeft - cards[0].offsetLeft
                : cards[0].offsetWidth;
            const cardGap = cards[1] ? cardStep - cards[0].offsetWidth : 0;
            const visibleCards = Math.max(1, Math.floor((viewport.clientWidth + cardGap) / cardStep));
            const maxIndex = Math.max(0, cards.length - visibleCards);
            const currentIndex = Math.min(maxIndex, Math.round(viewport.scrollLeft / cardStep));

            previousButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === maxIndex;
            position.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(maxIndex + 1).padStart(2, '0')}`;

            return { cardStep, currentIndex, maxIndex };
        }

        previousButton.addEventListener('click', () => {
            const { cardStep, currentIndex } = updateCarousel();
            viewport.scrollTo({ left: Math.max(0, (currentIndex - 1) * cardStep), behavior: 'smooth' });
        });

        nextButton.addEventListener('click', () => {
            const { cardStep, currentIndex, maxIndex } = updateCarousel();
            viewport.scrollTo({ left: Math.min(maxIndex, currentIndex + 1) * cardStep, behavior: 'smooth' });
        });

        viewport.addEventListener('scroll', updateCarousel, { passive: true });
        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const loginCloseButton = document.querySelector('.login-close-button');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('login-message');

    if (loginBtn && loginModal && loginCloseButton && loginForm && loginMessage) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });

        loginCloseButton.addEventListener('click', () => {
            loginModal.style.display = 'none';
            loginMessage.textContent = '';
            loginForm.reset();
        });

        window.addEventListener('click', (event) => {
            if (event.target == loginModal) {
                loginModal.style.display = 'none';
                loginMessage.textContent = '';
                loginForm.reset();
            }
        });

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            if (username === 'user' && password === 'password') {
                loginMessage.textContent = '¡Inicio de sesión exitoso!';
                loginMessage.className = 'form-message success';
                setTimeout(() => {
                    loginModal.style.display = 'none';
                    loginMessage.textContent = '';
                    loginForm.reset();
                }, 1500);
            } else {
                loginMessage.textContent = 'Usuario o contraseña incorrectos.';
                loginMessage.className = 'form-message error';
            }
        });
    }

    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    const registerCloseButton = document.querySelector('.register-close-button');
    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('register-message');

    if (registerBtn && registerModal && registerCloseButton && registerForm && registerMessage) {
        registerBtn.addEventListener('click', () => {
            registerModal.style.display = 'block';
        });

        registerCloseButton.addEventListener('click', () => {
            registerModal.style.display = 'none';
            registerMessage.textContent = '';
            registerForm.reset();
        });

        window.addEventListener('click', (event) => {
            if (event.target == registerModal) {
                registerModal.style.display = 'none';
                registerMessage.textContent = '';
                registerForm.reset();
            }
        });

        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const regName = registerForm['reg-name'].value;
            const regEmail = registerForm['reg-email'].value;
            const regUsername = registerForm['reg-username'].value;
            const regPassword = registerForm['reg-password'].value;
            const regConfirmPassword = registerForm['reg-confirm-password'].value;

            if (regPassword !== regConfirmPassword) {
                registerMessage.textContent = 'Las contraseñas no coinciden.';
                registerMessage.className = 'form-message error';
                return;
            }

            if (regName && regEmail && regUsername && regPassword) {
                registerMessage.textContent = '¡Registro exitoso! Ya puedes iniciar sesión.';
                registerMessage.className = 'form-message success';
                setTimeout(() => {
                    registerModal.style.display = 'none';
                    loginModal.style.display = 'block';
                    registerMessage.textContent = '';
                    registerForm.reset();
                }, 1500);
            } else {
                registerMessage.textContent = 'Por favor, completa todos los campos.';
                registerMessage.className = 'form-message error';
            }
        });
    }

    const appointmentForm = document.getElementById('appointmentForm');
    const formMessage = document.getElementById('form-message');

    if (appointmentForm && formMessage) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = appointmentForm.name.value;
            const email = appointmentForm.email.value;
            const date = appointmentForm.date.value;
            const time = appointmentForm.time.value;
            const serviceType = appointmentForm['service-type'].value;

            if (name && email && date && time && serviceType) {
                formMessage.textContent = '¡Tu asesoría quedó solicitada! Pronto nos pondremos en contacto contigo.';
                formMessage.className = 'form-message success';
                appointmentForm.reset();
            } else {
                formMessage.textContent = 'Por favor, completa todos los campos requeridos.';
                formMessage.className = 'form-message error';
            }
        });
    }

    const cartCountSpan = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalPriceSpan = document.getElementById('cart-total-price');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const proceedToCheckoutButton = document.getElementById('proceed-to-checkout-button');
    const checkoutDetailsDiv = document.getElementById('checkout-details');
    const deliveryOptionRadios = document.querySelectorAll('input[name="delivery-option"]');
    const deliveryAddressGroup = document.getElementById('delivery-address-group');
    const addressInput = document.getElementById('address');
    const paymentForm = document.getElementById('payment-form');
    const purchaseMessage = document.getElementById('purchase-message');

    const productNamesById = {
        1: 'Bikini Mandarina',
        2: 'Bikini Luna Dorada',
        3: 'Bikini Sol',
        4: 'Bikini Cacao',
        5: 'Bikini Brasil',
        6: 'Set Brasil Tropical',
        7: 'Bikini Jaguar',
        8: 'Bikini Nácar',
        9: 'Bikini Coco'
    };
    let cart = JSON.parse(localStorage.getItem('trianaSwimCart')) || [];
    let cartNamesUpdated = false;

    cart = cart.map(item => {
        const currentName = productNamesById[item.id];
        if (!currentName || currentName === item.name) return item;

        cartNamesUpdated = true;
        return { ...item, name: currentName };
    });

    if (cartNamesUpdated) {
        localStorage.setItem('trianaSwimCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalItems;
        }
    }

    function calculateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return total.toFixed(3);
    }

    function saveCart() {
        localStorage.setItem('trianaSwimCart', JSON.stringify(cart));
        updateCartCount();
    }

    function renderCartItems() {
        if (!cartItemsDiv) return;

        cartItemsDiv.innerHTML = '';
        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
            proceedToCheckoutButton.style.display = 'none';
            checkoutDetailsDiv.style.display = 'none';
        } else {
            cartEmptyMessage.style.display = 'none';
            proceedToCheckoutButton.style.display = 'block';
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.price.toFixed(3)} COP c/u</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">Eliminar</button>
                    </div>
                `;
                cartItemsDiv.appendChild(cartItemElement);
            });
        }
        cartTotalPriceSpan.textContent = `$${calculateCartTotal()} COP`;
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        renderCartItems();
    }

    function updateQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id == productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            saveCart();
            renderCartItems();
        }
    }

    function removeItem(productId) {
        cart = cart.filter(item => item.id != productId);
        saveCart();
        renderCartItems();
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product-item');
            const product = {
                id: productElement.dataset.id,
                name: productElement.dataset.name,
                price: parseFloat(productElement.dataset.price),
                image: productElement.dataset.image
            };
            addToCart(product);
            alert(`"${product.name}" ha sido añadido al carrito.`);
        });
    });

    if (cartItemsDiv) {
        cartItemsDiv.addEventListener('click', (e) => {
            const target = e.target;
            const productId = target.dataset.id;

            if (target.classList.contains('increase-quantity')) {
                updateQuantity(productId, 1);
            } else if (target.classList.contains('decrease-quantity')) {
                updateQuantity(productId, -1);
            } else if (target.classList.contains('remove-item')) {
                removeItem(productId);
            }
        });
    }

    if (proceedToCheckoutButton && checkoutDetailsDiv && deliveryOptionRadios && paymentForm && purchaseMessage) {
        proceedToCheckoutButton.addEventListener('click', () => {
            checkoutDetailsDiv.style.display = 'block';
            proceedToCheckoutButton.style.display = 'none';
            purchaseMessage.style.display = 'none';
            purchaseMessage.className = 'form-message';
            paymentForm.reset();
            if (document.getElementById('pickup').checked) {
                deliveryAddressGroup.style.display = 'none';
                addressInput.removeAttribute('required');
            } else {
                deliveryAddressGroup.style.display = 'block';
                addressInput.setAttribute('required', 'required');
            }
        });

        deliveryOptionRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'delivery') {
                    deliveryAddressGroup.style.display = 'block';
                    addressInput.setAttribute('required', 'required');
                } else {
                    deliveryAddressGroup.style.display = 'none';
                    addressInput.removeAttribute('required');
                    addressInput.value = '';
                }
            });
        });

        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const expiryMonth = document.getElementById('expiry-month').value;
            const expiryYear = document.getElementById('expiry-year').value;
            const cvv = document.getElementById('cvv').value;
            const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
            const deliveryAddress = document.getElementById('address').value;

            if (cardNumber.length !== 16 || isNaN(cardNumber)) {
                purchaseMessage.textContent = 'Número de tarjeta inválido. Debe tener 16 dígitos.';
                purchaseMessage.className = 'form-message error';
                purchaseMessage.style.display = 'block';
                return;
            }
            if (!cardName.trim()) {
                purchaseMessage.textContent = 'Por favor, ingresa el nombre en la tarjeta.';
                purchaseMessage.className = 'form-message error';
                purchaseMessage.style.display = 'block';
                return;
            }
            if (expiryMonth.length !== 2 || isNaN(expiryMonth) || parseInt(expiryMonth) < 1 || parseInt(expiryMonth) > 12) {
                purchaseMessage.textContent = 'Mes de vencimiento inválido (MM).';
                purchaseMessage.className = 'form-message error';
                purchaseMessage.style.display = 'block';
                return;
            }
            const currentYear = new Date().getFullYear() % 100;
            if (expiryYear.length !== 2 || isNaN(expiryYear) || parseInt(expiryYear) < currentYear) {
                purchaseMessage.textContent = 'Año de vencimiento inválido o caducado (AA).';
                purchaseMessage.className = 'form-message error';
                purchaseMessage.style.display = 'block';
                return;
            }
            if (cvv.length !== 3 || isNaN(cvv)) {
                purchaseMessage.textContent = 'CVV inválido (XXX).';
                purchaseMessage.className = 'form-message error';
                purchaseMessage.style.display = 'block';
                return;
            }

            if (deliveryOption === 'delivery' && !deliveryAddress.trim()) {
                purchaseMessage.textContent = 'Por favor, ingresa la dirección de envío.';
                purchaseMessage.className = 'form-message error';
                purchaseMessage.style.display = 'block';
                return;
            }

            purchaseMessage.textContent = 'Procesando tu compra...';
            purchaseMessage.className = 'form-message';
            purchaseMessage.style.display = 'block';

            setTimeout(() => {
                purchaseMessage.textContent = '¡Compra realizada con éxito! Gracias por confiar en nosotros.';
                purchaseMessage.className = 'form-message success';
                purchaseMessage.style.display = 'block';
                
                cart = [];
                saveCart();
                renderCartItems();

                setTimeout(() => {
                    checkoutDetailsDiv.style.display = 'none';
                    purchaseMessage.style.display = 'none';
                    paymentForm.reset();
                    document.getElementById('pickup').checked = true;
                    deliveryAddressGroup.style.display = 'none';
                    addressInput.value = '';
                }, 3000);
            }, 2000);
        });
    }

    updateCartCount();
    if (window.location.pathname.endsWith('cart.html')) {
        renderCartItems();
    }
});