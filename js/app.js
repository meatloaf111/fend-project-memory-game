
/*
 * Create a list that holds all of your cards
 */
let cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

/*
 * Initialize Variables
 */

let openedcards = [];
let targetLists = [];
let moveCounter = document.querySelector('.moves');
let moves = 0;
let num_cards = 0;
let stars = document.querySelectorAll('.stars i');
let num_stars = 0;
let start;
let timer = 0;


let restartbtn = document.querySelector('.restart');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/**
* @description Generate the cards so that plyaer can play
* @constructor
* @param cardList - list of the cards
*/


function generateCards(cardList) {

    start = new Date();


    let shuffledCards = shuffle(cardList);
    num_cards = shuffledCards.length;
    for (i = 0; i < shuffledCards.length; i++) {
        var cardValue = document.querySelectorAll('.deck .fa');
        cardValue[i].classList.add(shuffledCards[i]);
    };
    countupTimer();
};

generateCards(cards);

/**
* @description Timer function to show the elapsed time
* @constructor
*/


function countupTimer() {
    now = new Date();

    datet = parseInt((now.getTime() - start.getTime()) / 1000);
    min = parseInt((datet / 60) % 60);
    sec = datet % 60;

    if (min < 10) { min = '0' + min };
    if (sec < 10) { sec = '0' + sec };

    timer = min + ':' + sec;
    /*console.log(timer);*/

    document.querySelector('#timer').innerHTML = timer;


    setTimeout(countupTimer, 1000);
}

/*When restar btn is clicked, call restart function */
restartbtn.addEventListener('click', restart);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 /**
* @description lock the cards that are matched and check if the game ends.
* @constructor
* @param event - event
*/

function lockcards(evt) {
    openedcards[0].classList.add('match');
    openedcards[1].classList.add('match');

    openedcards = [];
    num_cards -= 2;
    if (num_cards == 0) {
        gameOver();
    }
}

/**
* @description End the game and open the modal window to show the results
* @constructor
*/


function gameOver() {
    console.log('game is over');
    modalcontent = document.getElementById('modal-content');
    modalcontent.style.display = 'block';
    modalcontent.getElementsByClassName('winscore')[0].innerText = num_stars;
    modalcontent.getElementsByClassName('timespent')[0].innerText = timer;
    document.getElementById('modal-overlay').style.display = 'block';
}


button = document.querySelector('button');
button.addEventListener('click', restart);

/**
* @description Restart the game
* @constructor
*/


function restart() {
    console.log('game restart');

    stars.forEach(function (star) {
        if (star.classList.contains('fa-star-o')) {
            star.classList.remove('fa-star-o');
            star.classList.add('fa-star');
        }
    });

    num_stars = 3;
    timer = 0;
    moves = 0;
    document.querySelector('#timer').innerHTML = '00:00';
    moveCounter.innerText = moves;

    document.getElementById('modal-content').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    setTimeout(function () {
        existing_cards = document.querySelectorAll('.deck li');
        existing_cards.forEach(function (card) {
            card.classList.remove('open', 'show', 'match');
        });
        existing_fonts = document.querySelectorAll('.deck i');
        existing_fonts.forEach(function (font) {
            fontclass = font.classList[1];
            font.classList.remove(fontclass);
            font.classList.add('fa');
        })

        generateCards(cards);
    }, 1000);
}

/**
* @description Hide the cards when those are not matched
* @constructor
* @param event - event
*/

function hidecards(evt) {
    setTimeout(function () {
        openedcards.forEach(function (card) {
            card.classList.remove('open', 'show');
        });
        openedcards = [];
    }, 1000);
}

/**
* @description Decide the number of stars based on the number of moves
* @constructor
* @param count- number of moves
*/
function decideStars(count) {
    if (count <= 10) {
        num_stars = 3;
    } else if (count > 10 && count <= 15) {
        num_stars = 2;
        stars[0].classList.remove('fa', 'fa-star');
        stars[0].classList.add('fa', 'fa-star-o');
    } else if (count > 15) {
        num_stars = 1;
        stars[1].classList.remove('fa', 'fa-star');
        stars[1].classList.add('fa', 'fa-star-o');
    }
}

/**
* @description Check to see chosen cards match or not
* @constructor
* @param event - event
*/
function matchedCheck(evt) {

    /*
    console.log('card1:' + openedcards[0].childNodes[1].className);
    console.log('card2:' + openedcards[1].childNodes[1].className);
    */

    if (openedcards[0].childNodes[1].className === openedcards[1].childNodes[1].className) {
        console.log('card matched!');
        lockcards(evt);
    } else {
        console.log('card not matched!');
        openedcards.forEach(function () {
            hidecards(evt);
        });
    }
    moves += 1;
    moveCounter.innerText = moves;
    decideStars(moves);
}

/**
* @description Display the card players chose
* @constructor
* @param event - event
*/

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
