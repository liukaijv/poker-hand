import {Card} from './card';
import {
    Hand,
    RoyalFlush,
    StraightFlush,
    FourOfAKind,
    FullHouse,
    Flush,
    Straight,
    ThreeOfAKind,
    TwoPair,
    OnePair,
} from './hand';

export class HandHint {

    public static make(cards: string[] | Card[]): Card[] {
        let resultCards: Card[] = [];
        let len: number = cards.length;
        if (len < 2 || len > 7) {
            return resultCards;
        } else if (len < 5) {
            let computeHand: Hand = new LowerFiveHand(cards);
            if (computeHand.isPossible) {
                resultCards = computeHand.cards;
            }
        } else {
            let hands: any[] = [RoyalFlush, StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair];
            let result: Hand;
            for (let hand of hands) {
                result = new hand(cards);
                if (result.isPossible) {
                    resultCards = result.cards;
                    break;
                }
            }
        }
        return resultCards;
    }

}

class LowerFiveHand extends Hand {

    protected _name: string = '';
    protected _rank: number = 0;

    protected make(): boolean {
        return this.isFourOfAKind()
            || this.isTwoPairs()
            || this.isThreeOfAKind()
            || this.isOnePairs();
    }

    public  isFourOfAKind(): boolean {
        for (let cards of this.values) {
            if (cards.length === 4) {
                this.cards = cards;
                return true;
            }
        }
        return false;
    }

    public isThreeOfAKind(): boolean {
        for (let cards of this.values) {
            if (cards.length === 3) {
                this.cards = cards;
                return true;
            }
        }
        return false;
    }

    public isTwoPairs(): boolean {
        for (let cards of this.values) {
            if (this.cards.length > 0 && cards && cards.length === 2) {
                this.cards = this.cards.concat(cards);
                return true;
            } else if (cards && cards.length === 2) {
                this.cards = this.cards.concat(cards);
            }
        }
        return false;
    }

    public isOnePairs(): boolean {
        for (let cards of this.values) {
            if (cards.length === 2) {
                this.cards = cards;
                return true;
            }
        }
        return false;
    }

}