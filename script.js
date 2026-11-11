const weekly = document.getElementById("weekly");
const savings = document.getElementById("savings");
const price = document.getElementById("price");

const weeksText = document.getElementById("weeks");
const dateText = document.getElementById("date");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const message = document.getElementById("message");

function calculate() {

    const weeklyMoney = parseFloat(weekly.value);
    const currentSavings = parseFloat(savings.value);
    const itemPrice = parseFloat(price.value);

    // Check empty or invalid values
    if (
        weekly.value === "" ||
        savings.value === "" ||
        price.value === "" ||
        !Number.isFinite(weeklyMoney) ||
        !Number.isFinite(currentSavings) ||
        !Number.isFinite(itemPrice) ||
        weeklyMoney < 0 ||
        currentSavings < 0 ||
        itemPrice <= 0
    ) {
        weeksText.textContent = "Weeks needed: --";
        dateText.textContent = "Estimated date: --";
        progressText.textContent = "Savings progress: 0%";
        progressBar.style.width = "0%";
        message.textContent = "Please enter valid numbers.";
        message.className = "error";
        return;
    }

    // Calculate progress
    const progress = Math.min(
        (currentSavings / itemPrice) * 100, 100
    );

    progressText.textContent =
        "Savings progress: " + progress.toFixed(2) + "%";

    progressBar.style.width = progress + "%";

    // Check if enough money is available
    if (currentSavings >= itemPrice) {
        weeksText.textContent = "Weeks needed: 0";
        dateText.textContent = "You can buy it today!";
        message.textContent = "🎉 Congratulations! You have enough money!";
        message.className = "success";
        return;
    }

    // Check weekly pocket money
    if (weeklyMoney === 0) {
        weeksText.textContent = "Weeks needed: Cannot calculate";
        dateText.textContent = "Estimated date: Unknown";
        message.textContent = "You need weekly pocket money to save.";
        message.className = "error";
        return;
    }
    
    // Calculate remaining amount
    const remaining = itemPrice - currentSavings;

    // Calculate weeks
    const weeks = Math.ceil(remaining / weeklyMoney);

    // Calculate purchase date
    const today = new Date();
    const purchaseDate = new Date(today);

    purchaseDate.setDate(today.getDate() + weeks * 7);

    const formattedDate = purchaseDate.toLocaleDateString(
        "en-KE",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

    // Display results
    weeksText.textContent = "Weeks needed: " + weeks;

    dateText.textContent =
        "You can buy it by: " + formattedDate;

    message.textContent =
        "Keep saving! You need KSh " +
        remaining.toFixed(2) + " more.";

    message.className = "success";
}

// Update automatically when typing
weekly.addEventListener("input", calculate);
savings.addEventListener("input", calculate);
price.addEventListener("input", calculate);