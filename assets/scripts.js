var pGlobal = {};

// Get and process data
(function () {
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
    // since I am not using any templating engine, I am building the divs here.
    // Otherwise, we could just return the object and parse it in a template.
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
        '<div class="card-img"><img src="' + this.image + '" alt="'this.imgAlt'"></div>' : '';
      var cardHeadline = '';
      var cardText = '';

      cardHeadline = '<div class="card type-' + this.type + '"><h2>' + icon + this.headline + '</h2><hr>';
      cardText = '<p class="card-txt">' + this.content + '</p>' + link + demoLink + moreInfo + '</div>';
      return cardHeadline + '<div class="card-block">' + cardImage + cardText + '</div>';
    };
  }
  // where to get the JSON data, this could be an API url but it is just a file
  // for demo sake.
  var jsonFile = '/assets/content.json';

  function reqListener() {
    pGlobal.cardDeck = {};
    // takes the JSON array and builds objects
    pGlobal.cardDeck = JSON.parse(this.responseText).map(function (crd) {
      return new Cards(crd);
    });
    // sorting the cards by priority
    pGlobal.cardDeck.sort(function(obj0, obj1) {
      return obj0.priority - obj1.priority;
    });
    // puts the cards on the page
    pGlobal.cardDeck.map(function (crd) {
      elmById = document.getElementById(crd.type);
      elmById.insertAdjacentHTML('beforeend', crd.divCard());
    });
    // this gets our counts for the navbar links
    pGlobal.typeCount = pGlobal.cardDeck.reduce(function (acc, crd) {
      ++acc[crd.type];
      return acc;
    }, { projects: 0, opensource: 0, more: 0 });
    // this puts the numbers in the navbar
    for (var tCnt in pGlobal.typeCount) {
      document.getElementById('type-' + tCnt).insertAdjacentHTML('beforeend', pGlobal.typeCount[tCnt]);
    }
    return pGlobal.typeCount;
  }
  // gets our JSON from the server
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', jsonFile);
  oReq.send();
})();

// Top banner and nav bar parallax movement
(function () {
  var speed = -0.5;
  var parallax = document.querySelectorAll('.banner');
  var profilePic = document.getElementsByClassName('profile')[0];
  var navContainer = document.getElementById('nav-container');
  var lastPageYOff = 0;

  window.onscroll = function () {
    [].slice.call(parallax).forEach(function (el, i) {
      var windowYOffset = window.pageYOffset;
      var elBackgrounPos;
      // this controles scroll up and down speed of the banner
      if (lastPageYOff > windowYOffset) {
        speed = -0.3;
      } else {
        speed = -0.5;
      }
      elBackgrounPos = '50% ' + (windowYOffset * speed) + 'px';
      el.style.backgroundPosition = elBackgrounPos;
      lastPageYOff = windowYOffset;
    });
    if (window.pageYOffset > 500) {
      navContainer.className = 'locked';
      profilePic.className = 'profile profile-slide';
    } else {
      navContainer.className = 'pho-hidden';
      profilePic.className = 'profile';
    }
  };
})();

// Card Filter
(function () {
  var cardStack = document.getElementsByClassName('cardgroup');
  var filterLinks = document.getElementById('topNavbar').getElementsByTagName('a');
  var clickedId;
  var i;
  var j;
  // scrollSpd = setTimeout wait in milliseconds
  var scrollSpd = 16;
  // scrollSpd = default number of px to scroll
  var scrollPxls = 24;

// check if we need to go up or down
  function scrollCheck(scrlFrm, scrlTo) {
    if (scrlFrm >= scrlTo) {
      scrollPageDown(scrlFrm, scrlTo);
    } else {
      scrollPageUp(scrlFrm, scrlTo);
    }
  }

// if we need to scroll te page up, recurse on this
  function scrollPageUp(scrlFrm, scrlTo) {
    setTimeout(function () {
      // base case
      if (scrlFrm >= scrlTo + scrollPxls) {
        window.scroll(0, scrlTo);
        return null;
      }
      // otherwise recursive
      scrlFrm = scrlFrm + scrollPxls;
      window.scroll(0, scrlFrm);
      scrollPageUp(scrlFrm, scrlTo);
    }, scrollSpd);
  }

// if we need to scroll the page down, recurse on this
  function scrollPageDown(scrlFrm, scrlTo) {
    setTimeout(function () {
      // base case
      if (scrlFrm <= scrlTo + scrollPxls) {
        window.scroll(0, scrlTo);
        return null;
      }
      // otherwise recursive
      scrlFrm = Math.floor(scrlFrm / 1.07);
      window.scroll(0, scrlFrm);
      scrollPageDown(scrlFrm, scrlTo);
    }, scrollSpd);
  }

// this filters out the cards for the selected link
  for (i = 0; i < filterLinks.length; i++) {
    filterLinks[i].onclick = function (e) {
      e.preventDefault();
      clickedId = this.childNodes[1].id.slice(5);

      for (j = 0; j < cardStack.length; j++) {
        if (clickedId === 'home') {
          cardStack[j].style.display = 'inherit';
          // auto scroll
          scrollCheck(window.pageYOffset, 0);
        } else if (clickedId === cardStack[j].id) {
          cardStack[j].style.display = 'inherit';
          // auto scroll
          scrollCheck(window.pageYOffset, 501);
        } else {
          cardStack[j].style.display = 'none';
        }
      }
      return false;
    };
  }
})();


(function() {
  var foot = document.getElementsByClassName('footer')[0];
  var today = new Date().getFullYear();
  var footerTxt = '&copy;' + today + ' HyperSprite.com';
  foot.insertAdjacentHTML('beforeend', footerTxt);
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

