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
});