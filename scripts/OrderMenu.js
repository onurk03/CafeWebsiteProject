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
        cartQuantity.innerHTML = cartCount;
        cartQuantity.style.display = "inline";
    });
}

console.log(cart);
