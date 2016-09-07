function navBarBurger() {
  var gotTopNavBar = document.getElementById('topNavbar');
  if (gotTopNavBar.className === 'topnav') {
    gotTopNavBar.className += ' responsive';
  } else {
    gotTopNavBar.className = 'topnav';
  }
}

(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = -0.5;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = "50% " + (windowYOffset * speed) + "px";

      el.style.backgroundPosition = elBackgrounPos;

    });
  };

})();

function Cards(data) {
  this.type = data.type;
  this.priority = data.priority;
  this.headline = data.headline;
  this.image = data.image;
  this.imgAlt = data.imgAlt;
  this.repoLink = data.repoLink;
  this.demoLink = data.demoLink;
  this.furtherReading = data.furtherReading;
  this.repoIcon = data.repoIcon;
  this.content = data.content;
  this.divCard = function () {
    var icon = '';
    var link = '';
    var demo = '';
    var moreInfo = '';
    var cardHeadline = '';
    var cardImage = '';
    var cardText = '';
    if (this.repoIcon) {
      icon = '<i class="fa ' + this.repoIcon + ' fa-lg" aria-hidden="true"></i> ';
    } else {
      icon = '';
    }
    if (this.repoLink) {
      link = '<a href="' + this.repoLink + '" target="new">' + icon + this.headline + '</a>';
    } else {
      link = icon + this.headline;
    }
    if (this.demoLink) {
      demo = '<a href="' + this.demoLink + '" target="new"><button class="card-btn">Demo</button></a>';
    } else {
      demo = '';
    }
    if (this.furtherReading) {
      moreInfo = '<a href="' + this.furtherReading + '" target="new"><button class="card-btn">More Info</button></a>'
    } else {
      moreInfo = '';
    }
    if (this.image) {
      cardImage = '<div class="card-img"><img src="' + this.image + '" alt="this.imgAlt"></div>';
    } else {
      cardImage = '';
    }
    cardHeadline = '<div class="card"><h2>' + link + '</h2><hr>';
    cardText = '<p class="card-txt">' + this.content + '</p>' + demo + moreInfo + '</div>';
    return cardHeadline + '<div class="card-block">' + cardImage + cardText + '</div>';
  };
}

var cardDeck;
(function () {
var jsonFile = '/assets/content.json';
  var cardType = {
    project: '',
    opensource: '',
    more: '',
  };

function reqListener() {

  cardDeck = JSON.parse(this.responseText).map(function(crd) {
    return new Cards(crd);
  });
  cardDeck.sort(function(obj0, obj1) {
    return obj0.priority - obj1.priority;
  });
  for (var i = 0, len = cardDeck.length; i < len; i++) {
    if (cardDeck[i].type === 'projects') {
      document.getElementById('projects').insertAdjacentHTML('beforeend', cardDeck[i].divCard());
    } else if (cardDeck[i].type === 'opensource') {
      document.getElementById('opensource').insertAdjacentHTML('beforeend', cardDeck[i].divCard());
    } else {
      document.getElementById('more').insertAdjacentHTML('beforeend', cardDeck[i].divCard());
    }
  }
  return cardDeck;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', jsonFile);
oReq.send();
})();

