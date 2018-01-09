import test from 'ava';
import {
    Hand,
    StraightFlush,
    FourOfAKind,
    FullHouse,
    Flush,
    Straight,
    ThreeOfAKind,
    TwoPair,
    OnePair,
    HighCard
} from '../src/hand';

test('StraightFlush Hand', t => {

    //it's possible
    let hand = new StraightFlush(["5h", "6s", "3s", "2s", "5s", "4s", "5c"]);
    t.true(hand.isPossible);

    //it's not possible
    let hand2 = new StraightFlush(["5h", "6c", "3s", "2s", "5s", "4s", "5c"]);
    t.false(hand2.isPossible);
});

test('FourOfAKind Hand', t => {

    //it's possible
    let hand = new FourOfAKind(["5h", "5d", "3s", "2c", "5s", "4s", "5c"]);
    t.true(hand.isPossible);

    //it's not possible
    let hand1 = new FourOfAKind(["5h", "5d", "3s", "Ac", "3s", "Ts", "5c"]);
    t.false(hand1.isPossible);
});

test('FullHouse Hand', t => {

    //it's possible
    let hand = new FullHouse(["5s", "5h", "3s", "3c", "2s", "Ts", "3d"]);
    let hand1 = new FullHouse(["8c", "8d", "Qh", "Qd", "Qs", "8h", "5s"]);
    t.true(hand.isPossible);
    t.true(hand1.isPossible);

    //it's not possible
    let hand2 = new FullHouse(["5s", "5h", "3s", "3c", "2s", "Ts", "Td"]);
    let hand3 = new FullHouse(["Kc", "5s", "9d", "6h", "7c", '7d', "Kh"]);
    t.false(hand2.isPossible);
    t.false(hand3.isPossible);

    //pick the highest kickers
    let hand4 = new FullHouse(["5s", "5h", "3s", "3c", "Th", "Ts", "Td"]);
    t.is(hand4.toString().indexOf('3s'), -1);

    //in order
    let hand5 = new FullHouse(['8c', 'Qs', '8h', '5h', 'Js', 'Qc', 'Qh']);
    t.is(hand5.toString(), 'Qs,Qc,Qh,8c,8h');

});

test('Flush Hand', t => {

    //it's possible
    let hand = new Flush(["5s", "Ts", "3s", "Ac", "2s", "Ts", "8d"]);
    t.true(hand.isPossible);

    //it's not possible
    let hand1 = new Flush(["5s", "Ts", "3h", "Ac", "2s", "Ts", "8d"]);
    t.false(hand1.isPossible);

});

test('Straight Hand', t => {

    //it's possible
    let hand = new Straight(["5h", "6s", "3s", "2s", "5s", "4s", "5c"]);
    t.true(hand.isPossible);
    let hand1 = new Straight(["5s", "6s", "7s", "8c", "Ts", "9s", "2d"]);
    t.true(hand1.isPossible);

    //it's not possible
    let hand2 = new Straight(["5s", "6s", "6h", "7c", "2s", "Ts", "8d"]);
    t.false(hand2.isPossible);

    //handle a wheel
    let hand3 = new Straight(["2s", "3s", "4h", "5c", "As", "Ts", "8d"]);
    t.true(hand3.isPossible);

    //a wheel can't go around
    let hand4 = new Straight(["2s", "3s", "4h", "7c", "As", "Ts", "Kd"]);
    t.false(hand4.isPossible);

    //a wheel's high card is not the Ace
    let lowHand = new Straight(["2s", "3s", "4h", "5c", "As", "Ts", "8d"]);
    let highHand = new Straight(["2s", "3s", "4h", "5c", "6s", "Ts", "8d"]);
    t.false(lowHand.beats(highHand));

});

test('ThreeOfAKind Hand', t => {

    //it's possible
    let hand = new ThreeOfAKind(["5s", "5c", "5h", "6c", "Ts", "9s", "2d"]);
    t.true(hand.isPossible);
    t.is(hand.toString(), '5s,5c,5h,Ts,9s');

    //it's not possible
    let hand1 = new ThreeOfAKind(["5s", "2c", "5h", "6c", "Ts", "9s", "2d"]);
    t.false(hand1.isPossible);

});

test('TwoPair Hand', t => {

    //it's possible
    let hand = new TwoPair(["5s", "5c", "6s", "6c", "Ts", "9s", "2d"]);
    t.true(hand.isPossible);
    t.is(hand.cards.toString(), '6s,6c,5s,5c,Ts');

    //it's not possible
    hand = new TwoPair(["5s", "6s", "6h", "7c", "2s", "Ts", "8d"]);
    t.false(hand.isPossible);

});

test('OnePair Hand', t => {

    //it's possible
    let hand = new OnePair(["5s", "5c", "7s", "6c", "Ts", "9s", "2d"]);
    t.true(hand.isPossible);

    //it's not possible
    hand = new OnePair(["5s", "6s", "Jh", "7c", "2s", "Ts", "8d"]);
    t.false(hand.isPossible);

    //who ranks higher
    let highHand = new OnePair(["4s", "4h", "Ah", "Jc", "Ts", "7s", "8d"]);
    let lowHand = new OnePair(["4s", "4h", "Ac", "Tc", "9s", "7c", "8d"]);

    t.true(highHand.beats(lowHand));
    t.false(lowHand.beats(highHand));

});

test('Building hands from 7 cards"', t => {

    let hand = Hand.make(["8h", "8s", "4s", "5c", "Qd", '5d', "Qh"]);

    t.is(hand.name, 'Two pair');
    t.is(hand.toString(), 'Qd,Qh,8h,8s,5c');

    hand = Hand.make(["4s", "4h", "Ah", "Jc", "Ts", "7s", "8d"]);
    t.is(hand.toString(), '4s,4h,Ah,Jc,Ts');

});

test('Finding winning hands', t => {

    //one winning hand from a list
    let h1 = Hand.make(["2s", "3s", "4h", "5c", "As", "Ts", "8d"]);
    let h2 = Hand.make(["5s", "Ts", "3h", "Ac", "2s", "Ts", "8d"]);
    let h3 = Hand.make(["5s", "5h", "3s", "3c", "2s", "Ts", "3d"]);
    let winners = Hand.pickWinners([h1, h2, h3]);

    t.is(winners.length, 1);
    t.deepEqual(winners[0], h3);

    //two winning hands from a list
    h1 = Hand.make(["2s", "3s", "4h", "5c", "As", "Ts", "8d"]);
    h2 = Hand.make(["2h", "3h", "4d", "5d", "Ah", "Tc", "8c"]);
    h3 = Hand.make(["5s", "Ts", "3h", "Ac", "2s", "Ts", "8d"]);
    winners = Hand.pickWinners([h1, h2, h3]);

    t.is(winners.length, 2);
    t.true(winners.indexOf(h1) >= 0);
    t.true(winners.indexOf(h2) >= 0);

});