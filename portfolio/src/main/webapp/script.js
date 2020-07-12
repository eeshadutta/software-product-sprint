var quotes = ["Keep your eyes on the stars and your feet on the ground", "Difficult roads often lead to beautiful destinations", "Life is better when you're laughing", "Find yourself and be that", "When nothing goes right, go left"];
var n = quotes.length;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function randomQuote(idx) {
    elem = document.getElementsByClassName("quote")[0];
    elem.innerHTML = quotes[idx];
    elem.animate([
        { opacity: 0 },
        { opacity: 0.9 },
        { opacity: 1 },
        { opacity: 0.9 },
        { opacity: 0 },
    ], {
        duration: 6000,
        easing: "ease-in-out",
    })
    await sleep(6000);
    randomQuote((idx + 1) % n);
}

document.addEventListener("DOMContentLoaded", function(event) {
    randomQuote(0);
});