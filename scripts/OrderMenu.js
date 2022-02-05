// Collapsible Menu Implementation
let collapsibleMenu = document.querySelectorAll(".collapsible");
let i;

for(i = 0; i < collapsibleMenu.length; i++) {
    collapsibleMenu[i].addEventListener("click",function() {
        this.classList.toggle("collapsed");
        let content = this.nextElementSibling;
        if(content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

// Cart Implementation
class menuItem {
    constructor(name,price,quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

let menuItems = [
    "Grilled Cheese","Avocado Toast", "BLT", "Tuna", "Turkey", "Club",
    "French Fries", "Cheese Curds", "Pretzel Bites", "Boneless Wings",
    "Cafe Mocha", "Cafe Latte", "Cappuccino", "Americano", "Double Espresso",
    "Soda","Iced Tea","Orange Juice", "Bottled Water",
    "Tiramisu","Ice Cream", "New York Cheesecake", "Fudge Brownie"
]

let prices = [
    4.99,6.99,5.99,4.99,4.99,5.99,
    2.99,3.99,2.99,6.99,
    3.95,3.95,2.95,2.95,2.95,
    1.99,2.99,3.99,1.50,
    5.99,2.99,6.99,5.99
]

let cart = [];

let cartQuantity = document.querySelector("#cart-quantity");
let cartCount = 0;

// If there are items already stored in the local storage, assign them to the default cart and
// cartCount variables.
if(localStorage.length > 1) {
    cart = JSON.parse(localStorage.getItem('cart'));
    cartCount = JSON.parse(localStorage.getItem('cartCount'))
}

// Loops through all items in the cafe and adds an event listener to each of their buttons. The
// event listener makes each item's "Add to Cart" buttons create and push a menuItem object type
// of the corresponding item into the cart list when clicked.
let addToCart = document.querySelectorAll(".add-cart");
for(let i = 0; i < addToCart.length ; i++) {
    addToCart[i].addEventListener("click",  function() {
        let quantities = document.getElementsByClassName("item-quantity");
        let item = new menuItem(menuItems[i], prices[i], quantities[i].value);
        cart.push(item);
        cartCount += parseInt(quantities[i].value);
        // Save the new cart item count to storage and assign it on the HTML on button click
        localStorage.setItem('cartCount', cartCount);
        cartQuantity.style.display = "inline";
        cartQuantity.innerHTML = localStorage.getItem('cartCount');

        // Save cart to local storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Save the time the last item was added to the cart
        let timeAdded = Date.now() / 60000;
        localStorage.setItem('timeAdded', JSON.stringify(timeAdded));
    });
}


// Display the cart item count on page reload if it's more than 0;
if (localStorage.getItem('cartCount') > 0) {
    cartQuantity.style.display = "inline";
    cartQuantity.innerHTML = localStorage.getItem('cartCount');
}

// Warn the user after 5 minutes that they haven't checked out in 5 minutes.
// Erase the cart info on page reload 30 minutes after adding the last cart item
if(localStorage.length >= 3) {
    let timeNow = Date.now() / 60000;
    let timeDif = timeNow - JSON.parse(localStorage.getItem('timeAdded'));
    if(timeDif === 5) {
        document.querySelector(".alert-popup").style.display = "inline";
    }
    if (timeDif >= 30) {
        localStorage.removeItem('cart');
        localStorage.removeItem('cartCount');
    }
}

// Button to close alert popup about 5 minutes checkout inactivity
let alertButton = document.querySelector(".alert-popup button");

alertButton.addEventListener('click', function() {
    document.querySelector(".alert-popup").style.display = "none";
});
