// Sample menu data in Indian Rupees
const menuItems = [
    { name: "Cappuccino", description: "Freshly brewed coffee", price: 250, image: "cappuccino.jpg" },
    { name: "Cheese Sandwich", description: "Grilled with love", price: 400, image: "cheese-sandwich.jpg" },
    { name: "Cheeseburger", description: "Delicious and cheesy", price: 300, image: "cheeseburger.jpg" },
    { name: "Espresso", description: "Strong and aromatic", price: 150, image: "espresso.jpg" },
];

// Load menu dynamically
const menuContainer = document.getElementById("menu-container");

menuItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Price: ₹${item.price}</p>
        <button onclick="addToCart('${item.name}')">Add to Cart</button>
    `;
    menuContainer.appendChild(card);
});

// Simple cart
const cart = [];

function addToCart(itemName) {
    cart.push(itemName);
    alert(`${itemName} added to cart!`);
}

// Order form
const orderForm = document.getElementById("order-form");

orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;

    alert(`Thank you ${name}! Your order has been placed.`);
    orderForm.reset();
});

// On load, greet and show quick options
window.onload = function() {
    greetAndGuide();
};

let bookingStep = 0;
let bookingData = {};

function greetAndGuide() {
    const chatbox = document.getElementById("chatbox");
    chatbox.innerHTML = "";

    // Greet
    const greetMsg = document.createElement("p");
    greetMsg.innerHTML = '<strong>Assistant:</strong> Hi there! Welcome to Café Delight!<br>How can I help you today?';
    chatbox.appendChild(greetMsg);

    // Show quick options
    const options = document.createElement("div");
    options.innerHTML = `
        <button class="quick-btn" onclick="viewMenu()">View Menu</button>
        <button class="quick-btn" onclick="startBooking()">Book a Table</button><br>
        <button class="quick-btn" onclick="showHours()">Opening Hours</button>
        <button class="quick-btn" onclick="showLocation()">Location</button>
    `;
    chatbox.appendChild(options);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function appendMessage(sender, text) {
    const chatbox = document.getElementById("chatbox");
    const p = document.createElement("p");
    p.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function viewMenu() {
    window.open("menu.pdf", "_blank");
    appendMessage("Assistant", "Our menu PDF has been opened in a new tab.");
}

function showHours() {
    appendMessage("Assistant", "We are open daily from <strong>9:00 AM to 11:00 PM</strong>.");
}

function showLocation() {
    appendMessage("Assistant", "Our location: 123 Main Street, New Delhi, 110001 <br>");
}

function startBooking() {
    bookingStep = 1;
    bookingData = {};
    appendMessage("Assistant", "Please enter the <strong>date</strong> for your reservation (e.g., 2025-10-05):");
}

// Chat send function (bind this to your "Send" button)
function chat() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;
    appendMessage("You", userInput);

    if (bookingStep > 0) {
        handleBooking(userInput);
        document.getElementById("userInput").value = "";
        return;
    }

    const input = userInput.toLowerCase();

    // Keyboard support for options
    if (input.includes("menu")) viewMenu();
    else if (input.includes("book")) startBooking();
    else if (input.includes("hour")) showHours();
    else if (input.includes("location") || input.includes("address")) showLocation();
    else {
        appendMessage("Assistant", "I can help you with Menu, Table Booking, Opening Hours, or Location. Please use the options above or type your request!");
    }
    document.getElementById("userInput").value = "";
}

// Table booking stepper logic
function handleBooking(msg) {
    if (bookingStep === 1) {
        bookingData.date = msg;
        appendMessage("Assistant", "What <strong>time</strong> would you like to reserve? (e.g., 7:30 PM)");
        bookingStep = 2;
    } else if (bookingStep === 2) {
        bookingData.time = msg;
        appendMessage("Assistant", "How many <strong>people</strong>?");
        bookingStep = 3;
    } else if (bookingStep === 3) {
        bookingData.people = msg;
        appendMessage("Assistant", "Please share the <strong>name</strong> for the booking:");
        bookingStep = 4;
    } else if (bookingStep === 4) {
        bookingData.name = msg;
        appendMessage(
            "Assistant",
            `Thank you, <strong>${bookingData.name}</strong>! Your table for <strong>${bookingData.people}</strong> on <strong>${bookingData.date}</strong> at <strong>${bookingData.time}</strong> is booked. We look forward to seeing you!`
        );
        bookingStep = 0;
        bookingData = {};
        setTimeout(greetAndGuide, 4000); // Optionally return to main menu after confirmation
    }
}


/*
// AI Chatbot functionality
function chat() {
    const userInput = document.getElementById("userInput").value.toLowerCase();
    const chatbox = document.getElementById("chatbox");

    if(userInput === "") return;

    // Display user message
    const userMessage = document.createElement("p");
    userMessage.innerHTML = `<strong>You:</strong> ${userInput}`;
    chatbox.appendChild(userMessage);

    // Generate AI-like response
    const botMessage = document.createElement("p");
    botMessage.innerHTML = `<strong>Assistant:</strong> ${getBotResponse(userInput)}`;
    chatbox.appendChild(botMessage);

    // Scroll to bottom
    chatbox.scrollTop = chatbox.scrollHeight;
    document.getElementById("userInput").value = "";
}

// Basic AI responses
function getBotResponse(input) {
    if(input.includes("menu") || input.includes("items")) {
        return menuItems.map(item => `${item.name} - ₹${item.price}`).join("<br>");
    } else if(input.includes("recommend") || input.includes("suggest")) {
        const recommended = menuItems[Math.floor(Math.random() * menuItems.length)];
        return `I recommend trying our ${recommended.name} for ₹${recommended.price}!`;
    } else if(input.includes("price") || input.includes("cost")) {
        const item = menuItems.find(i => input.includes(i.name.toLowerCase()));
        return item ? `${item.name} costs ₹${item.price}.` : "Sorry, I don't have the price for that item.";
    } else if(input.includes("hello") || input.includes("hi")) {
        return "Hello! I'm your Cafe Delight Assistant. How can I help you today?";
    } else {
        return "I can tell you about our menu, prices, or recommend items. Try asking me!";
    }
}*/