export class Card {

    public value: CardValue;

    public suit: CardSuit;

    public rank: number;

    public static VALUES: CardValue[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

    public constructor(str: string) {
        this.value = <CardValue>str.substr(0, 1);
        this.suit = <CardSuit>str.substr(1, 1).toLowerCase();
        this.rank = Card.VALUES.indexOf(this.value);
    }

    public toString() {
        if (this.rank === 0) {
            return `A${this.suit}(low)`;
        }
        return `${this.value}${this.suit}`;
    }

    public static sort(a, b): number {
        if (a.rank > b.rank) {
            return -1;
        } else if (a.rank < b.rank) {
            return 1;
        } else {
            return 0;
        }
    }

}

export type CardValue = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'T' | 'J' | 'Q' | 'K' | 'A';

export type CardSuit = 's' | 'h' | 'd' | 'c';