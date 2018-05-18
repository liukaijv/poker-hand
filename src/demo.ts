import {Deck, Card, Hand} from './index';

let deck: Deck = new Deck();

deck.shuffle();

let cards: Card[] = [];

for (let i = 0; i < 7; i++) {
    cards.push(deck.deal());
}

let hand: Hand = Hand.make(cards);

console.log(hand);




