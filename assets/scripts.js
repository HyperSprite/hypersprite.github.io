
var cardDeck = {};
var typeCount;

function Cards(data) {
  this.type = data.type;
  this.priority = data.priority;
  this.headline = data.headline;
  this.image = data.image;
  this.imgAlt = data.imgAlt;
  this.repoLink = data.repoLink;
  this.repoTitle = data.repoTitle;
  this.demoLink = data.demoLink;
  this.furtherReading = data.furtherReading;
  this.repoIcon = data.repoIcon;
  this.content = data.content;
  this.divCard = function () {
    var icon = this.repoIcon ?
      '<i class="fa ' + this.repoIcon + ' fa-lg" aria-hidden="true"></i> ' : '';
    var repoBtnName = this.repoTitle || 'Site';
    var link = this.repoLink ?
      '<a href="' + this.repoLink + '" target="new"><button class="card-btn">' + repoBtnName + '</button></a>' : '';
    var demoLink = this.demoLink ?
      '<a href="' + this.demoLink + '" target="new"><button class="card-btn">Demo</button></a>' : '';
    var moreInfo = this.furtherReading ?
      '<a href="' + this.furtherReading + '" target="new"><button class="card-btn">More Info</button></a>' : '';
    var cardImage = this.image ?
      '<div class="card-img"><img src="' + this.image + '" alt="this.imgAlt"></div>' : '';
    var cardHeadline = '';
    var cardText = '';

    cardHeadline = '<div class="card type-' + this.type + '"><h2>' + icon + this.headline + '</h2><hr>';
    cardText = '<p class="card-txt">' + this.content + '</p>' + link + demoLink + moreInfo + '</div>';
    return cardHeadline + '<div class="card-block">' + cardImage + cardText + '</div>';
  };
}

// Get and process data
(function () {
var jsonFile = '/assets/content.json';

function reqListener() {
  var typeCnt;
  cardDeck = JSON.parse(this.responseText).map(function (crd) {
    return new Cards(crd);
  });
  cardDeck.sort(function(obj0, obj1) {
    return obj0.priority - obj1.priority;
  });

  cardDeck.map(function (crd) {
    elmById = document.getElementById(crd.type);
    elmById.insertAdjacentHTML('beforeend', crd.divCard());
  });

  typeCount = cardDeck.reduce(function (acc, crd) {
    ++acc[crd.type];
    return acc;
  }, { projects: 0, opensource: 0, more: 0 });

  for (var tCnt in typeCount) {
    document.getElementById('type-' + tCnt).insertAdjacentHTML('beforeend', typeCount[tCnt]);
  }
  return typeCount;
}

var oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open('GET', jsonFile);
oReq.send();
})();

// Top banner and nav bar parallax movement
(function () {
  var parallax = document.querySelectorAll('.banner'),
    speed = -0.5;
  var navContainer = document.getElementById('nav-container');

  window.onscroll = function () {
    [].slice.call(parallax).forEach(function (el, i) {
      var windowYOffset = window.pageYOffset,
        elBackgrounPos = '50% ' + (windowYOffset * speed) + 'px';
      el.style.backgroundPosition = elBackgrounPos;
    });
    if (window.pageYOffset > 500) {
      navContainer.className = 'locked';
    } else {
      navContainer.className = 'pho-hidden';
    }
  };
})();

// Card Filter
(function () {
  var docBody = document.getElementsByTagName('body')[0];
  var cardStack = document.getElementsByClassName('cardgroup');
  var filterLinks = document.getElementById('topNavbar').getElementsByTagName('a');
  for (var i = 0; i < filterLinks.length; i++) {
    filterLinks[i].onclick = function (e) {
      e.preventDefault();
      var clickedId = this.childNodes[1].id.slice(5);
      for(var j = 0; j < cardStack.length; j++) {
        if (clickedId === 'home') {
          docBody.scrollTop = 0;
          cardStack[j].style.display = 'inherit';
        } else if (clickedId === cardStack[j].id) {
          docBody.scrollTop = 501;
          cardStack[j].style.display = 'inherit';
        } else {
          cardStack[j].style.display = 'none';
        }
      }
      return false;
    };
  }
})();


// Email Modal
(function () {
  var modal = document.getElementById('emailModal');
  var emaillink = document.getElementById('open-email-modal');
  var span = document.getElementsByClassName('close')[0];

  emaillink.onclick = function () {
    modal.style.display = 'inherit';
    setTimeout(function () {
      modal.className += ' modal-pop';
    }, 2);
  };

  span.onclick = function () {
    modal.style.display = 'none';
    modal.className = 'modal';
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      modal.className = 'modal';
    }
  };
})();

