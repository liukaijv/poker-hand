import {Card} from './card';

export abstract class Hand {

    protected abstract _name: string;

    protected abstract _rank: number;

    protected _isPossible: boolean = false;

    public cardPool: Card[] = [];

    protected suits: { [key: string]: Card[] } = {};

    protected values: Card[][] = [];

    public cards: Card[] = [];

    protected abstract make(): boolean;

    public constructor(cards: string[] | Card[]) {

        this.cardPool = (<any[]>cards).map(c => {
            if (typeof c === 'string') {
                return new Card(c);
            } else if (c instanceof Card) {
                return c;
            }
        });

        this.cardPool.sort(Card.sort).forEach(card => {
            if (!this.suits[card.suit]) {
                this.suits[card.suit] = [];
            }
            this.suits[card.suit].push(card);
            if (!this.values[card.rank]) {
                this.values[card.rank] = [];
            }
            this.values[card.rank].push(card);
        });

        this.values.reverse();

        this._isPossible = this.make();

    }

    public get name(): string {
        return this._name;
    }

    public get rank(): number {
        return this._rank;
    }

    public get isPossible(): boolean {
        return this._isPossible;
    }

    public compare(h: Hand): number {
        if (this.rank < h.rank) {
            return 1;
        } else if (this.rank > h.rank) {
            return -1;
        }
        let result: number = 0;
        for (let i = 0; i < 4; i++) {
            if (this.cards[i].rank < h.cards[i].rank) {
                result = 1;
                break;
            } else if (this.cards[i].rank > h.cards[i].rank) {
                result = -1;
                break;
            }
        }
        return result;
    }

    public beats(h: Hand): boolean {
        if (this.compare(h) < 0) {
            return true;
        }
        return false;
    }

    public losesTo(h: Hand): boolean {
        if (this.compare(h) > 0) {
            return true;
        }
        return false;
    }

    public ties(h: Hand): boolean {
        if (this.compare(h) === 0) {
            return true;
        }
        return false;
    }

    public nextHighest(excluding: Card[] = []): Card[] {
        excluding = excluding.concat(this.cards);
        return this.cardPool.filter(c => {
            if (excluding.indexOf(c) < 0) {
                return true;
            }
        });
    }

    public toString(): string {
        return this.cards.map(c => c.toString()).join(',');
    }

    public static pickWinners(hands: Hand[]): Hand[] {
        let byRank = hands.map(h => h.rank);
        let highestRank = Math.max.apply(Math, byRank);
        hands = hands.filter(h => h.rank === highestRank);
        return hands.filter(h => {
            return !hands.some(a => h.losesTo(a));
        });
    }

    public static make(cards: string[] | Card[]): Hand {
        let hands: any[] = [StraightFlush, FourOfAKind, FullHouse, Flush, Straight, ThreeOfAKind, TwoPair, OnePair, HighCard];
        let result: Hand;
        for (let hand of hands) {
            result = new hand(cards);
            if (result.isPossible) {
                break;
            }
        }
        return result;
    }

}

export class StraightFlush extends Hand {

    protected _name: string = 'Straight Flush';
    protected _rank: number = 8;

    protected make(): boolean {
        let possibleStraight: Card[] = null;
        for (let key of Object.keys(this.suits)) {
            let cards: Card[] = this.suits[key];
            if (cards.length >= 5) {
                possibleStraight = cards;
                break;
            }
        }
        if (possibleStraight) {
            let straight: Hand = new Straight(possibleStraight);
            if (straight.isPossible) {
                this.cards = straight.cards;
            }
        }
        return this.cards.length === 5;
    }

}

export class FourOfAKind extends Hand {

    protected _name: string = 'Four of a kind';
    protected _rank: number = 7;

    protected make(): boolean {
        for (let cards of this.values) {
            if (cards && cards.length === 4) {
                this.cards = cards;
                this.cards.push(this.nextHighest()[0]);
                break;
            }
        }
        return this.cards.length === 5;
    }

}

export class FullHouse extends Hand {

    protected _name: string = 'Full house';
    protected _rank: number = 6;

    protected make(): boolean {
        for (let cards of this.values) {
            if (cards && cards.length === 3) {
                this.cards = cards;
                break;
            }
        }
        if (this.cards.length === 3) {
            for (let cards of this.values) {
                if (cards && cards.length >= 2) {
                    if (this.cards[0].value !== cards[0].value) {
                        this.cards = this.cards.concat(cards.slice(0, 2));
                        break;
                    }
                }
            }
        }
        return this.cards.length === 5;
    }

}

export class Flush extends Hand {

    protected _name: string = 'Flush';
    protected _rank: number = 5;

    protected make(): boolean {

        for (let key of Object.keys(this.suits)) {
            let cards: Card[] = this.suits[key];
            if (cards.length >= 5) {
                this.cards = cards.slice(0, 5);
                break;
            }
        }
        return this.cards.length === 5;
    }

}

export class Straight extends Hand {

    protected _name: string = 'Straight';
    protected _rank: number = 4;

    protected make(): boolean {
        for (let card of this.cardPool) {
            if (card.value === 'A') {
                this.cardPool.push(new Card(`1${card.suit}`));
            }
        }
        for (let card of this.cardPool) {
            let previousCard: Card = this.cards[this.cards.length - 1];
            let diff: number = null;
            if (previousCard) {
                diff = previousCard.rank - card.rank;
            }
            if (diff > 1) {
                this.cards = [];
                this.cards.push(card);
            } else if (diff === 1) {
                this.cards.push(card);
            } else if (diff === null) {
                this.cards.push(card);
            }
            if (this.cards.length === 5) {
                break;
            }
        }
        return this.cards.length === 5;
    }

}

export class ThreeOfAKind extends Hand {

    protected _name: string = 'Three of a kind';
    protected _rank: number = 3;

    protected make(): boolean {
        for (let cards of this.values) {
            if (cards && cards.length === 3) {
                this.cards = cards;
                this.cards = this.cards.concat(this.nextHighest().slice(0, 2));
                break;
            }
        }
        return this.cards.length === 5;
    }

}

export class TwoPair extends Hand {

    protected _name: string = 'Two pair';
    protected _rank: number = 2;

    protected make(): boolean {
        for (let cards of this.values) {
            if (this.cards.length > 0 && cards && cards.length === 2) {
                this.cards = this.cards.concat(cards);
                this.cards.push(this.nextHighest()[0]);
                break;
            } else if (cards && cards.length === 2) {
                this.cards = this.cards.concat(cards);
            }
        }
        return this.cards.length === 5;
    }

}

export class OnePair extends Hand {

    protected _name: string = 'One pair';
    protected _rank: number = 1;

    protected make(): boolean {
        for (let cards of this.values) {
            if (cards && cards.length === 2) {
                this.cards = cards;
                this.cards = this.cards.concat(this.nextHighest().slice(0, 3));
                break;
            }
        }
        return this.cards.length === 5;
    }

}

export class HighCard extends Hand {

    protected _name: string = 'High card';
    protected _rank: number = 0;

    protected make(): boolean {
        this.cards = this.cardPool.slice(0, 5);
        return true;
    }

}