import test from 'ava';
import {Card, Deck, Hand} from '../src/index';

test('Using the Hand builder', t => {
    let hand = Hand.make(["5s", "5c", "5h", "6c", "Ts", "9s", "2d"]);
    t.is(hand.name, 'Three of a kind');
});

test('Using Card', t => {
    let card = new Card('5s');
    t.is(card.suit, 's');
});


test('Using Deck', t => {
    let deck = new Deck();
    t.is(deck.cards.length, 52);
});
