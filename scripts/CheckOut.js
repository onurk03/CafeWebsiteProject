var cart = [];
let checkOut = document.querySelector(".check-out-button");
let checkOutBox = document.querySelector(".check-out-box");
let processing = document.querySelector(".processing");
let checkIcon = document.querySelector(".check-icon");
let resultText = document.querySelector(".result-text");

checkOut.addEventListener("click", function () {
    checkOutBox.style.display = "none";
    processing.style.display = "inline-block";
    setTimeout(function () {
        resultText.innerHTML = "Process Success (This is not a real restaurant!)";
        checkIcon.style.display = "block";
    }, 1000);
});

if(localStorage.length > 1) {
    cart = JSON.parse(localStorage.getItem('cart'));
}

for(let i = 0; i < cart.length; i++) {
    document.querySelector(".items-box").innerHTML +=
        `<p class="check-out-item"> ${cart[i].name} <em> $${cart[i].price}</em>
         <em class="item-quantity">${cart[i].quantity} ct.</em></em>`;
}

