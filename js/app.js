/* ==========================================
   DJAM'S RONDEUR
   APP.JS
========================================== */

/* ==============================
   PRODUITS
============================== */

const products = {

1:{
id:1,
name:"CURE BOBI",
price:30000,
image:"images/produit1.jpg"
},

2:{
id:2,
name:"CURE BOOSTER BOBI",
price:30000,
image:"images/produit2.jpg"
},

3:{
id:3,
name:"CURE AFRICA QUEEN",
price:55000,
image:"images/produit3.jpg"
},

4:{
id:4,
name:"SUPPOSITOIRE BBL",
price:50000,
image:"images/produit4.jpg"
},

5:{
id:5,
name:"GÉLULE 100% HANCHES",
price:10000,
image:"images/produit5.jpg"
},

6:{
id:6,
name:"CRÈME KABATO",
price:5000,
image:"images/produit6.jpg"
},

7:{
id:7,
name:"SIROP TASSABA",
price:20000,
image:"images/produit7.jpg"
},

8:{
id:8,
name:"CURE MAMAMIYA",
price:75000,
image:"images/produit8.jpg"
},

9:{
id:9,
name:"SIROP 3 EN 1",
price:30000,
image:"images/produit9.jpg"
},

10:{
id:10,
name:"SIROP TCHAPA BALAISE",
price:65000,
image:"images/produit10.jpg"
},

11:{
id:11,
name:"SIROP APOUTCHOU",
price:25000,
image:"images/produit11.jpg"
},

12:{
id:12,
name:"GUMMIE BOBARABA ORIGIGI",
price:25000,
image:"images/produit12.jpg"
},

13:{
id:13,
name:"CURE MAA-BIO",
price:200000,
image:"images/produit13.jpg"
}

};

/* ==============================
   LOCAL STORAGE
============================== */

function getCart(){

return JSON.parse(
localStorage.getItem("cart")
) || [];

}

function saveCart(cart){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCounter();

}

/* ==============================
   AJOUT PANIER
============================== */

function addToCart(productId){

let cart = getCart();

let product = products[productId];

if(!product){

console.error("Produit introuvable");

return;

}

let existing = cart.find(
item => item.id === productId
);

if(existing){

existing.quantity++;

}

else{

cart.push({

id:product.id,
name:product.name,
price:product.price,
quantity:1,
image:product.image

});

}

saveCart(cart);

alert(
product.name +
" ajouté au panier."
);

}

/* ==============================
   AJOUT AVEC QUANTITE
============================== */

function addToCartWithQuantity(productId){

let quantityField =
document.getElementById("qty");

let quantity =
parseInt(quantityField.value);

let cart = getCart();

let product =
products[productId];

let existing =
cart.find(item=>item.id===productId);

if(existing){

existing.quantity += quantity;

}

else{

cart.push({

id:product.id,
name:product.name,
price:product.price,
quantity:quantity,
image:product.image

});

}

saveCart(cart);

alert("Produit ajouté.");

}

/* ==============================
   COMPTEUR PANIER
============================== */

function updateCartCounter(){

let cart = getCart();

let total = 0;

cart.forEach(item=>{

total += item.quantity;

});

let counter =
document.getElementById("cart-count");

if(counter){

counter.innerText = total;

}

}

document.addEventListener(
"DOMContentLoaded",
updateCartCounter
);

/* ==============================
   AFFICHAGE PANIER
============================== */

function renderCart(){

let container =
document.getElementById(
"cartContainer"
);

if(!container) return;

let cart = getCart();

container.innerHTML="";

if(cart.length===0){

container.innerHTML=`

<div class="empty-cart">

Votre panier est vide.

</div>

`;

return;

}

let total = 0;

cart.forEach((item,index)=>{

let subtotal =
item.price * item.quantity;

total += subtotal;

container.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="">

<div class="cart-info">

<h3>${item.name}</h3>

<p>

${item.price.toLocaleString()}
FCFA

</p>

<div class="quantity-controls">

<button
onclick="decreaseQty(${index})">

-

</button>

<span>

${item.quantity}

</span>

<button
onclick="increaseQty(${index})">

+

</button>

</div>

<p>

Sous-total :
<strong>

${subtotal.toLocaleString()}
FCFA

</strong>

</p>

</div>

<button
class="remove-btn"
onclick="removeItem(${index})">

Supprimer

</button>

</div>

`;

});

updateTotals(total);

}

/* ==============================
   TOTALS
============================== */

function updateTotals(total){

let totalFcfa =
document.getElementById(
"totalFcfa"
);

let totalEuro =
document.getElementById(
"totalEuro"
);

if(totalFcfa){

totalFcfa.innerText =
total.toLocaleString()
+" FCFA";

}

if(totalEuro){

totalEuro.innerText =
(total/655.957).toFixed(2)
+" €";

}

}

/* ==============================
   QUANTITES
============================== */

function increaseQty(index){

let cart = getCart();

cart[index].quantity++;

saveCart(cart);

renderCart();

}

function decreaseQty(index){

let cart = getCart();

if(cart[index].quantity>1){

cart[index].quantity--;

saveCart(cart);

renderCart();

}

}

function removeItem(index){

let cart = getCart();

cart.splice(index,1);

saveCart(cart);

renderCart();

}

function clearCart(){

if(confirm(
"Vider complètement le panier ?"
)){

localStorage.removeItem("cart");

renderCart();

updateCartCounter();

}

}

/* ==============================
   DETAIL PRODUIT
============================== */

function increase(){

let qty =
document.getElementById("qty");

qty.value =
parseInt(qty.value)+1;

}

function decrease(){

let qty =
document.getElementById("qty");

if(parseInt(qty.value)>1){

qty.value =
parseInt(qty.value)-1;

}

}

/* ==============================
   RESUME COMMANDE
============================== */

function renderCheckoutSummary(){

let summary =
document.getElementById(
"cartSummary"
);

if(!summary) return;

let cart = getCart();

let total = 0;

summary.innerHTML="";

cart.forEach(item=>{

let subtotal =
item.price * item.quantity;

total += subtotal;

summary.innerHTML += `

<div class="checkout-item">

<p>

${item.name}

x ${item.quantity}

</p>

<strong>

${subtotal.toLocaleString()}
FCFA

</strong>

</div>

<hr>

`;

});

updateTotals(total);

}

/* ==============================
   REFERENCE COMMANDE
============================== */

function generateOrderNumber(){

let date = Date.now();

let random =
Math.floor(
Math.random()*10000
);

return "DJR-"+
date+
"-"+
random;

}

/* ==============================
   ENVOI COMMANDE
============================== */

function submitOrder(){

let cart = getCart();

if(cart.length===0){

alert(
"Votre panier est vide."
);

return;

}

let orderNumber =
generateOrderNumber();

alert(

"Commande validée !\n\n"+
"Référence : "+
orderNumber

);

localStorage.removeItem(
"cart"
);

window.location.href=
"index.html";

}

/* ==============================
   INITIALISATION
============================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

renderCart();

renderCheckoutSummary();

updateCartCounter();

}
);