import {Card} from './card';

export class Deck {

    public cards: Card[] = [];

    public constructor(cards?: Card[]) {

        if (cards && cards.length) {
            this.cards = cards;
        } else {
            for (let value of Card.VALUES.slice(1)) {
                this.cards.push(new Card(`${value}s`));
                this.cards.push(new Card(`${value}h`));
                this.cards.push(new Card(`${value}d`));
                this.cards.push(new Card(`${value}c`));
            }
        }

    }

    public shuffle(): void {

        //Shuffle the deck array with Fisher-Yates
        let i, j, tempI, tempJ;

        for (i = 0; i < this.cards.length; i++) {
            j = Math.floor(Math.random() * i + 1);
            tempI = this.cards[i];
            tempJ = this.cards[j];
            this.cards[i] = tempJ;
            this.cards[j] = tempI;
        }

    }

    public deal(): Card {
        return this.cards.pop();
    }

}