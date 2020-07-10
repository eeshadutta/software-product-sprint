var quotes = ["Keep your eyes on the stars and your feet on the ground", "Difficult roads often lead to beautiful destinations", "Life is better when you're laughing", "Find yourself and be that", "When nothing goes right, go left"];
var n = quotes.length;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function randomQuote(idx) {
    document.getElementsByClassName("quote")[0].innerHTML = quotes[idx];
    console.log(quotes[idx]);
    await sleep(4000);
    randomQuote((idx + 1) % n);
}

document.addEventListener("DOMContentLoaded", function (event) {
    randomQuote(0);
});
