// Deck of 54 cards (includes Jokers)
// 4 suits consisting of 13 cards (A - 10, plus 3 face cards)
// two separate joker cards
// each card has a top and bottom part that are identical but inverted
// face of the card displays the value using symbols

// Each card has:
// a suit
// a value
// a color (dependant on the suit)
// isFaceCard flag (depending on the value (11 - 13))

class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = this.value == 14 ? "Joker" : suit;
    this.color = this.suit == "clubs" || this.suit == "spades" ? "black" : this.suit == "Joker" ? null : "red";
    this.isFaceCard = this.value > 10 && this.value < 14 ? true : false;
    this.face = this.value == 11 ? "Jack" : this.value == 12 ? "Queen" : this.value == 13 ? "King" : null;
    this.isJoker = this.suit == "Joker";
  }
}

class Deck {
  constructor(hasJokers = false) {
    this.numCards = hasJokers ? 54 : 52;
    this.numSuits = 4;
    this.numColors = 2;
    this.hasJokers = hasJokers;
    this.isShuffled = false;
    this.cards = [];
    this.cardsPerSuit = 52 / this.numSuits;
    for (let i = 0; i < this.numSuits; i++) {
      let suit;
      if (i == 0) {
        suit = "hearts";
        for (let j = 0; j < this.cardsPerSuit; j++) {
          this.cards.push(new Card(j + 1, suit));
        }
      }
      if (i == 1) {
        suit = "diamonds";
        for (let j = 0; j < this.cardsPerSuit; j++) {
          this.cards.push(new Card(j + 1, suit));
        }
      }
      if (i == 2) {
        suit = "clubs";
        for (let j = 0; j < this.cardsPerSuit; j++) {
          this.cards.push(new Card(j + 1, suit));
        }
      }
      if (i == 3) {
        suit = "spades";
        for (let j = 0; j < this.cardsPerSuit; j++) {
          this.cards.push(new Card(j + 1, suit));
        }
      }
    }
    if (hasJokers) {
      this.cards.push(new Card(14, "Joker"));
      this.cards.push(new Card(14, "Joker"));
    }
  }

  shuffleDeck(deck = this.cards, shuffledDeck = []) {
    if (deck.length == 0) {
      this.isShuffled = true;
      this.cards = shuffledDeck;
      return;
    }
    let index = Math.floor(Math.random() * deck.length);
    let card = deck.splice(index, 1)[0];
    shuffledDeck.push(card);
    this.shuffleDeck(deck, shuffledDeck);
  }

}

let myDeck = new Deck();
myDeck.shuffleDeck();

const cardBack = document.getElementById('cardBack');
const cardFront = document.getElementById('cardFront');
let mid = document.getElementById('middle');
let value = document.querySelectorAll('.value');
let suit = document.querySelectorAll('.suit');
let symbol;
cardBack.addEventListener('click', () => {
  let content = "";
  let card = myDeck.cards.pop();
  value.forEach(v => card.value == 13 ? v.innerText = "K" :
    card.value == 12 ? v.innerText = "Q" :
      card.value == 11 ? v.innerText = "J" :
        card.value == 1 ? v.innerText = "A" :
          v.innerText = card.value);
  cardFront.style.color = card.color;
  if (card.suit == "hearts") {
    symbol = "♥ ";
  }
  if (card.suit == "diamonds") {
    symbol = "♦ ";
  }
  if (card.suit == "clubs") {
    symbol = "♣ ";
  }
  if (card.suit == "spades") {
    symbol = "♠ ";
  }
  suit.forEach(s => s.innerText = symbol);
  for (let i = 1; i <= card.value; i++) {
    content += symbol;
  }
  if (card.value == 13) {
    mid.innerText = "K";
  } else if (card.value == 12) {
    mid.innerText = "Q"
  } else if (card.value == 11) {
    mid.innerText = "J"
  } else {
    mid.innerText = `${content}`;
  }
})