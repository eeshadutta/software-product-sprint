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

function getComments() {
    fetch('/data').then(response => response.json()).then((commentsReceived) => {
        commentListElement = document.getElementById("all-comments");
        commentListElement.innerText = '';

        comments_list = commentsReceived.comments;
        num_comments = comments_list.length;

        for (i = 0; i < num_comments; i++)
        {
            const commentDiv = document.createElement('div');
            commentDiv.className = "comments-list";
            commentDiv.appendChild(createDomElement('div', "date", comments_list[i].datetime));
            commentDiv.appendChild(createDomElement('div', "comment", comments_list[i].comment));
            commentDiv.appendChild(createDomElement('div', "user", comments_list[i].user));

            commentListElement.appendChild(commentDiv);
        }
    });
}

function createDomElement(typeOfElement, class_name, text) {
    const element = document.createElement(typeOfElement);
    element.className = class_name;
    element.innerText = text;

    return element;
}

window.onload = randomQuote(0);
window.onload = getComments();