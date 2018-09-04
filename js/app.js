/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

var openedcards = [];
var targetLists = [];
var moveCounter = document.querySelector('.moves');
var moves = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateCards(cardList) {


    moveCounter.innerText = moves;
    let shuffledCards = shuffle(cardList);
    for (i = 0; i < shuffledCards.length; i++) {
        var cardValue = document.querySelectorAll('.deck .fa');
        cardValue[i].classList.add(shuffledCards[i]);
    };
};

generateCards(cards);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function lockcards(evt) {
    openedcards[0].classList.add('match');
    openedcards[1].classList.add('match');

    openedcards = [];
}

function hidecards(evt) {
    setTimeout(function () {
        openedcards.forEach(function (card) {
            card.classList.remove('open', 'show');
        });
        openedcards = [];
    }, 1000);
}


function matchedCheck(evt) {


    console.log("card1:" + openedcards[0].childNodes[1].className);
    console.log("card2:" + openedcards[1].childNodes[1].className);

    if (openedcards[0].childNodes[1].className === openedcards[1].childNodes[1].className) {
        console.log("card matched!");
        lockcards(evt);
    } else {
        console.log("card not matched!");
        openedcards.forEach(function () {
            hidecards(evt);
        });
    }
    moves += 1;
    moveCounter.innerText = moves;
}


function displaySymbol(evt) {
    if (evt.target.localName === 'li') {
        if (!evt.target.classList.contains('open') && !evt.target.classList.contains('show')) {
            openedcards.push(evt.target);
            evt.target.classList.add('open', 'show');
            evt.target.removeEventListener('click', displaySymbol);
            if (openedcards.length == 2) {
                matchedCheck(evt);
            }
        }
    }
}


document.querySelector('.deck').addEventListener('click', displaySymbol);
