// Setting up a qGlobal object
var qGlobal = {};

// Do all the cool stuff in here but only export the doQuote fuction
(function () {
  var jsFile = '/randomquotemachine/quotes.js';
  var quotes;
// Adding the doQuote to the qGlobal object
  qGlobal.doQuote = function () {
    var thisQuote = quotes[Math.floor(Math.random() * quotes.length)];
    var elmById = document.getElementById('content');
    elmById.innerHTML = '<h1>' + thisQuote + '</h1>';
  };

    var clickThis = document.getElementsByClassName('click-this')[0];
    clickThis.onclick = function () {
      qGlobal.doQuote();
    };

  function reqListener() {
    // quotes var is now an array of quotes
    quotes = JSON.parse(this.responseText);
    // puts the cards on the page
    qGlobal.doQuote();
  }
  // gets our JSON from the server
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', jsFile);
  oReq.send();
})();

// http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en
