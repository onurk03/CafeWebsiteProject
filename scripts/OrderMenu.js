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

/**
 * Each item is turned into a menuItem object before being put into the cart.
 */
class menuItem {
    constructor(name,price,quantity) {
        this.name = name;
        this.price = price;
        this.quantity = parseInt(quantity);
    }
    hasSameItem(cart) {
        for(let x of cart) {
            if (x.name === this.name) {
                return true;
            }
        }
        return false;
    }

    findSameItem(cart) {
        for(let i = 0; i < cart.length; i++) {
            if (cart[i].name === this.name) {
                return i;
            }
        }
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

// Loops through all items in the cafe and adds an event listener to each of their buttons.
let cartButtons = document.querySelectorAll(".add-cart");
for(let i = 0; i < cartButtons.length ; i++) {
    cartButtons[i].addEventListener("click",  function() {
        addToCart(i);
        orderTimer();
    });
}

// Display the number of cart items on page reload if it's more than 0;
if (localStorage.getItem('cartCount') > 0) {
    cartQuantity.style.display = "inline";
    cartQuantity.innerHTML = localStorage.getItem('cartCount');
}

/**
 * Adds an item to the cart and stores the cart info in the local storage when called.
 */
function addToCart(i) {
    // create and push a menuItem object type of the corresponding item into the cart list
    // when clicked.
    let quantities = document.getElementsByClassName("item-quantity");
    let item = new menuItem(menuItems[i], prices[i], quantities[i].value);
    if(!item.hasSameItem(cart)) {
        cart.push(item);
        cartCount += parseInt(quantities[i].value);
    } else {
        cart[item.findSameItem(cart)].quantity += item.quantity;
    }

    // Save the new cart item count to local storage and assign it on the HTML on button click
    localStorage.setItem('cartCount', cartCount);
    cartQuantity.style.display = "inline";
    cartQuantity.innerHTML = localStorage.getItem('cartCount');

    // Save cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Sets a timer for 5 min and 30 min marks after the last item added to the cart. User will get
 * a warning after 5 mins, and their cart information will be deleted after 30 mins.
 */
function orderTimer() {
    // Warn the user after 5 minutes that they haven't checked out in 5 minutes.
    setTimeout(function() {
        document.querySelector(".alert-popup").innerHTML = `
            <h2> Alert</h2>
            <p> You haven't checked out in 5 minutes, your cart information will disappear after 25
                minutes.</p>
            <button type="button"> OK!</button>
        `;
        document.querySelector(".alert-popup").style.display = "inline";

        // Button to close alert popup about 5 minutes checkout inactivity
        let alertButton = document.querySelector(".alert-popup button");

        alertButton.addEventListener('click', function() {
            document.querySelector(".alert-popup").style.display = "none";
        });
    }, 5 * 60000);


    // Erase the cart info 30 minutes after adding the last cart item
    setTimeout(function() {

        localStorage.removeItem('cart');
        localStorage.removeItem('cartCount');

        document.querySelector(".alert-popup").innerHTML = `
            <h2> Alert</h2>
            <p> You haven't checked out in 30 minutes, therefore your cart information has disappeared.</p>
            <button type="button"> OK!</button>
        `;

        document.querySelector(".alert-popup").style.display = "inline";

        // Button that confirms cart information disappearance after 30 mins
        let alertButton = document.querySelector(".alert-popup button");

        alertButton.addEventListener('click', function() {
            document.querySelector(".alert-popup").style.display = "none";
            // Reloads page for changes to be visible
            location.reload();
        });

    }, 30 * 60000);
}



