// ===== LOGIN =====
function login() {
    let username = document.getElementById("username").value;
    localStorage.setItem("user", username);
    window.location.href = "catalogue.html";
}

// ===== PANIER =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " ajouté !");
}

// ===== AFFICHAGE PANIER =====
if (document.getElementById("cart")) {
    let container = document.getElementById("cart");
    let total = 0;

    cart.forEach(item => {
        container.innerHTML += `<p>${item.name} - ${item.price}$</p>`;
        total += item.price;
    });

    container.innerHTML += `<h2>Total : ${total}$</h2>`;
}

// ===== WEBHOOK =====
async function sendOrder() {

    let user = localStorage.getItem("user") || "Inconnu";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    let items = "";

    cart.forEach(item => {
        items += `• ${item.name} - ${item.price}$\n`;
        total += item.price;
    });

    let webhookURL = "https://discord.com/api/webhooks/1483605241546145792/LH573t2e9hi21OKEUwNhEwaflwNd_1fT44JfsaQiDT9E8vwi8GqBOQjzTL14w45_Yyql";

    let data = {
        content: "📦 Nouvelle commande Davis Quartz",
        embeds: [{
            title: "Commande reçue",
            color: 15844367,
            fields: [
                { name: "Client", value: user },
                { name: "Produits", value: items },
                { name: "Total", value: total + "$" }
            ],
            footer: {
                text: "Davis Quartz System"
            }
        }]
    };

    await fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    alert("Commande envoyée !");
    localStorage.removeItem("cart");
    window.location.reload();
}

// ===== ADMIN =====
function clearOrders() {
    localStorage.removeItem("cart");
    alert("Commandes supprimées");
}