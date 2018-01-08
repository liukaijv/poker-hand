import test from 'ava';
import {Deck} from '../src/deck';

test('The deck', t => {
    let deck = new Deck();
    t.is(deck.cards.length, 52);
});

test('Deck shuffle', t => {
    let deck = new Deck();
    deck.shuffle();
    t.is(deck.cards.length, 52);
});

test('Deck deal cards', t => {
    let deck = new Deck();
    deck.deal();
    t.is(deck.cards.length, 51);
});