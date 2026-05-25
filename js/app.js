/* ==========================================
   DJAM'S RONDEURS
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
   RECUPERER PANIER
============================== */

function getCart(){

try{

return JSON.parse(
localStorage.getItem("cart")
) || [];

}catch(error){

console.error(
"Erreur panier :",
error
);

return [];

}

}

/* ==============================
   SAUVEGARDER PANIER
============================== */

function saveCart(cart){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

updateCartCounter();

}

/* ==============================
   COMPTEUR PANIER
============================== */

function updateCartCounter(){

const counter =
document.getElementById(
"cart-count"
);

if(!counter) return;

const cart = getCart();

let total = 0;

cart.forEach(item=>{

total += item.quantity;

});

counter.innerText = total;

}

/* ==============================
   AJOUTER AU PANIER
============================== */

function addToCart(productId, quantity = 1){

const cart = getCart();

const product =
products[productId];

if(!product){

alert(
"Produit introuvable"
);

return;

}

quantity = parseInt(quantity);

if(isNaN(quantity) || quantity < 1){

quantity = 1;

}

const existing =
cart.find(item =>
item.id === product.id
);

if(existing){

existing.quantity += quantity;

}else{

cart.push({

id:product.id,
name:product.name,
price:product.price,
image:product.image,
quantity:quantity

});

}

saveCart(cart);

alert(
product.name +
" ajouté au panier ✅"
);

}

/* ==============================
   SUPPRIMER PRODUIT
============================== */

function removeItem(index){

let cart = getCart();

cart.splice(index,1);

saveCart(cart);

}

/* ==============================
   AUGMENTER QUANTITE
============================== */

function increaseQty(index){

let cart = getCart();

cart[index].quantity++;

saveCart(cart);

}

/* ==============================
   DIMINUER QUANTITE
============================== */

function decreaseQty(index){

let cart = getCart();

if(cart[index].quantity > 1){

cart[index].quantity--;

saveCart(cart);

}

}

/* ==============================
   VIDER PANIER
============================== */

function clearCart(){

if(confirm(
"Voulez-vous vider le panier ?"
)){

localStorage.removeItem(
"cart"
);

updateCartCounter();

location.reload();

}

}

/* ==============================
   TOTAL PANIER
============================== */

function calculateTotal(){

const cart = getCart();

let total = 0;

cart.forEach(item=>{

total +=
item.price * item.quantity;

});

return total;

}

/* ==============================
   FORMAT FCFA
============================== */

function formatFcfa(price){

return price.toLocaleString()
+ " FCFA";

}

/* ==============================
   FORMAT EURO
============================== */

function formatEuro(price){

return "≈ " +
(price / 655.957)
.toFixed(2)
+ " €";

}

/* ==============================
   REFERENCE COMMANDE
============================== */

function generateOrderNumber(){

const date = Date.now();

const random =
Math.floor(
Math.random() * 10000
);

return "DJR-" +
date +
"-" +
random;

}

/* ==============================
   INITIALISATION
============================== */

document.addEventListener(
"DOMContentLoaded",
function(){

updateCartCounter();

}
);
