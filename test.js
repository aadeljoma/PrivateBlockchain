(function theLoop (i) {
  setTimeout(function () {
    let blockTest = new Block("Test Block - " + (i + 1));
    blockchain.addBlock(blockTest);
    i++;
    if (i < 10) theLoop(i);
  }, 10000);
})(0);
