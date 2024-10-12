document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById("popup");
    const closeButton = document.getElementById("close-popup");
    const form = document.getElementById("newsletter-form");
    const footerForm = document.getElementById("subscribeForm");
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const clearCartButton = document.getElementById('clearCartBtn');
    const processOrderButton = document.getElementById('processOrderBtn');
    const viewCartButton = document.getElementById('viewCartBtn');
    const cartPopup = document.createElement('div'); // Popup for viewing cart
    const contactForm = document.getElementById('formSubmission');
    cartPopup.classList.add('cart-popup');
    document.body.appendChild(cartPopup);


    // Check if the popup has already been shown
    if (!sessionStorage.getItem("popupShown")) {
        // Show the popup and overlay after 3 seconds
        setTimeout(function () {
            overlay.classList.add("show");
            popup.classList.add("show");
        }, 3000);
    }

    // Close the popup and overlay when the close button is clicked
    closeButton.addEventListener("click", function () {
        overlay.classList.remove("show");
        popup.classList.remove("show");
        sessionStorage.setItem("popupShown", "true"); // Mark popup as shown
    });

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from actually submitting
        const email = document.getElementById("popup-email").value;

        // Simple validation to check if email is entered
        if (email) {
            // Display a "Thank you" message
            alert("Thank you for subscribing!");

            // Close the popup and overlay after subscribing
            overlay.classList.remove("show");
            popup.classList.remove("show");
            sessionStorage.setItem("popupShown", "true"); // Mark popup as shown
        } else {
            alert("Please enter a valid email address.");
        }
    });

    // Handle form submission for the footer form
    footerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent actual form submission
        const email = document.querySelector("#subscribeForm input[type='email']").value;

        // Simple validation to check if email is entered
        if (email) {
            alert("Thank you for subscribing!");

            //Reset the form after displaying thank you message
            footerForm.reset();
            // You can add any additional logic here, such as clearing the form
        } else {
            alert("Please enter a valid email address.");
        }
    });


    // Function to show an alert
    function showAlertMessage(message) {
        alert(message);
    }

    // Function to save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to get cart from localStorage
    function getCart() {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    // Initialize the cart from localStorage or as an empty array
    let cart = getCart();

    // Function to update the cart popup with the current cart items
    function updateCartPopup() {
        cartPopup.innerHTML = ''; // Clear previous contents
        if (cart.length > 0) {
            cart.forEach(function (item, index) {
                const itemElement = document.createElement('p');
                itemElement.textContent = `${index + 1}. ${item}`;
                cartPopup.appendChild(itemElement);
            });
        } else {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Your cart is empty!';
            emptyMessage.style.textAlign = 'center'; // Center the message text
            cartPopup.appendChild(emptyMessage);
        }
        // Create the Close Cart button regardless of whether the cart is empty or not
        const closeCartButton = document.createElement('button');
        closeCartButton.textContent = 'Close Cart';
        closeCartButton.classList.add('close-cart-btn');
        closeCartButton.addEventListener('click', function () {
            cartPopup.style.display = 'none';
            overlay.classList.remove('show');
        });
        cartPopup.appendChild(closeCartButton); // Add the Close Cart button to the popup
        }


    // Style the cart popup and overlay
    cartPopup.style.position = 'fixed';
    cartPopup.style.top = '50%';
    cartPopup.style.left = '50%';
    cartPopup.style.transform = 'translate(-50%, -50%)';
    cartPopup.style.padding = '20px';
    cartPopup.style.backgroundColor = 'antiquewhite'; // Background set to antique white
    cartPopup.style.border = '2px solid #2E4057';
    cartPopup.style.borderRadius = '10px';
    cartPopup.style.zIndex = '1001';
    cartPopup.style.display = 'none'; // Initially hidden

    // Show cart popup when View Cart button is clicked
    viewCartButton.addEventListener('click', function () {
        overlay.classList.add('show');
        cartPopup.style.display = 'block';
        updateCartPopup();
    });

    // Add to Cart functionality
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const product = button.getAttribute('data-product');
            cart.push(product); // Add item to cart array
            saveCart(cart); // Save updated cart to localStorage
            showAlertMessage(`${product} has been added to your cart!`);
            button.classList.add('added-to-cart');
            setTimeout(function () {
                button.classList.remove('added-to-cart');
            }, 300);
        });
    });

    // Clear Cart button functionality
    clearCartButton.addEventListener('click', function () {
        if (cart.length > 0) {
            cart = []; // Empty the cart
            saveCart(cart); // Save the empty cart
            showAlertMessage('Cart has been cleared!');
        } else {
            showAlertMessage('No items to clear');
        }
    });

    // Process Order button functionality
    processOrderButton.addEventListener('click', function () {
        if (cart.length > 0) {
            cart = []; // Process the order and clear the cart
            saveCart(cart); // Save the empty cart
            showAlertMessage('Thank you for your order!');
        } else {
            showAlertMessage('Cart is empty');
        }
    });

});
