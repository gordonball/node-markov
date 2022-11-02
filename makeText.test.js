/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require("./markov");

describe("getChains function", function () {

  test("generate chains object, where multiple possibilities for last word",
    function () {
      const machine = new MarkovMachine(`The cat is in the hat. The cat is the cat.
    The hat is a cat.`);
      const wordChains = machine.getChains();
      expect(wordChains).toEqual(
        {
          'The': ['cat', 'cat', 'hat'],
          'cat': ['is', 'is'],
          'is': ['in', 'the', 'a'],
          'in': ['the'],
          'the': ['hat.', 'cat.'],
          'hat.': ['The'],
          'cat.': ['The', null],
          'hat': ['is'],
          'a': ['cat.']
        }
      );
    });

  test("generate chains object", function () {
    const machine = new MarkovMachine(`The cat is in the hat.`);
    const wordChains = machine.getChains();
    expect(wordChains).toEqual(
      {
        'The': ['cat'],
        'cat': ['is'],
        'is': ['in'],
        'in': ['the'],
        'the': ['hat.'],
        'hat.': [null]
      }
    );
  });

  test("generate chains object", function () {
    const machine = new MarkovMachine(``);
    const wordChains = machine.getChains();
    expect(wordChains).toEqual(
      {}
    );
  });

});

describe("getText function", function () {

  test("generate text", function () {
    const machine = new MarkovMachine(`The cat in the hat.`);
    const text = machine.getText();
    expect(text).toEqual(
      "The cat in the hat."
    );
  });

  test("generate text", function () {
    const machine = new MarkovMachine(`The cat is in the hat.
    The cat is the cat. The hat is a cat.`);
    const text = machine.getText();
    const words = text.split(' ');
    for (let i = 1; i < words.length; i++) {
      expect(machine.chains[words[i - 1]].includes(words[i])).toEqual(true);
    }
  });

  test("generate text", function () {
    const machine = new MarkovMachine(``);
    const text = machine.getText();
    expect(text).toEqual(
      "There are no words in this text"
    );
  });

});