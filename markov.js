/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const wordChains = {};

    if (this.words.length === 1 && this.words[0] === "") {
      return wordChains;
    }


    for (let i = 0; i < ((this.words).length) - 1; i++) {

      if (wordChains[this.words[i]] === undefined) {
        wordChains[this.words[i]] = [this.words[i + 1]];
      } else {
        (wordChains[this.words[i]]).push(this.words[i + 1]);

      }
    }

    const lastIndex = this.words.length - 1;

    if (wordChains[this.words[lastIndex]] === undefined) {
      wordChains[this.words[lastIndex]] = [null];
    } else {
      wordChains[this.words[lastIndex]].push(null);
    }

    return wordChains;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    if (this.words.length === 1 && this.words[0] === "") {
      return "There are no words in this text";
    }

    const chains = this.chains;

    let nextWord = Object.keys(chains)[0];
    const result = [nextWord];
    // rename nextWord
    while (nextWord !== null) {
      const chainLength = chains[nextWord].length;
      const randomIndex = Math.floor(Math.random() * chainLength);
      nextWord = chains[nextWord][randomIndex];

      result.push(nextWord);
    }

    return result.join(" ").trim();
  }
}

const machine = new MarkovMachine(``);

// console.log(machine.getChains());
console.log(machine.getText());

module.exports = { MarkovMachine };