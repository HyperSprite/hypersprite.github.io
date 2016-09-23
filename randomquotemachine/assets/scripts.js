
// Setting up a qGlobal object
var qGlobal = {};

// Do all the cool stuff in here but only export the doQuote fuction
(function () {
  var jsFile = '/randomquotemachine/assets/quotes.js';
  var quotes;

  function fitText() {
    var outer = document.getElementById('resizable');
    var inner = document.getElementById('texter');
    var innerHeight = window.innerHeight;
    var innerYOffset = inner.windowYOffset;
    var difference = outer.clientWidth - inner.clientWidth;
    var ratio = outer.clientWidth / inner.clientWidth;
    var style = 'translateX(' + (difference / 2) + 'px) scale(' + ratio + ')';
    inner.style.transform = style;
    // outer.style.marginTop = innerHeight
  }

// Adding the doQuote to the qGlobal object
  qGlobal.doQuote = function () {
    var thisQuote = quotes[Math.floor(Math.random() * quotes.length)];
    var elmById = document.getElementById('texter');
    elmById.innerHTML = thisQuote;
    fitText();
  };

  var getNew = document.getElementsByClassName('get-new')[0];
  getNew.onclick = function () {
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

