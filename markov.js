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
    console.log(this.words);

    for (let i = 0; i < ((this.words).length) - 1; i++) {

      if (wordChains[this.words[i]] === undefined) {
        wordChains[this.words[i]] = [this.words[i + 1]];
      } else {
        wordChains[this.words[i]].push(this.words[i + 1]);
      }
    }

    const lastIndex = this.words.length - 1;

    if (wordChains[this.words[lastIndex]] === undefined) {
      wordChains[this.words[lastIndex]] = [null];
    } else {
      wordChains[this.words[lastIndex]].push(null);
    }

    return wordChains
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
  }
}

const machine = new MarkovMachine("The cat in the hat");


machine.getChains();

module.exports = { MarkovMachine };