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
    this.repoTitle = data.repoTitle || 'Repo';
    this.demoLink = data.demoLink;
    this.furtherReading = data.furtherReading;
    this.moreTitle = data.moreTitle || 'More Info';
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
        '<a href="' + this.furtherReading + '" target="new"><button class="card-btn">' + this.moreTitle + '</button></a>' : '';
      var cardImage = this.image ?
        '<div class="card-img"><img src="' + this.image + '" alt="' + this.imgAlt + '"></div>' : '';
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
    pGlobal.cardDeck.sort(function (obj0, obj1) {
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

// Theme switcher
(function () {
  var cssArray = [
    'soft',
    'dark-gray',
    'gray',
    'dark-red',
    'red',
    'indigo',
    'green',
    'orange',
  ];
  var curTheme;
  var cTheme;
  var tstrTime;
  var cssAL = cssArray.length;
  var colorsCss = document.getElementById('colorsCss');
  var linkCssColor = document.getElementById('linkCssColor');
  var tstr = document.getElementById('tstr');

  // this will be moved out to pGlobal if some other function needs cookies
  function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 864000000));
    var expires = '; expires=' + date.toGMTString();
    document.cookie = name + '=' + value + expires + '; path=/';
  }

  function getCookie(name) {
    var cookArr = document.cookie.split(';');
    for (var i = 0, l = cookArr.length; i < l; i++) {
      var cookie = cookArr[i].split('=', 2);
      cookie[0] = cookie[0].replace(/^\s+/, '');
      if (cookie[0] === name) {
        return cookie;
      }
    }
    return undefined;
  }

  function mkUpper(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // This gets the cookie and sets current theme based on what it finds
  cTheme = getCookie('theme') || NaN;
  if (isNaN(cTheme[1] * 1)) {
    curTheme = 0;
  } else {
    curTheme = +cTheme[1];
  }
  // This sets the page to use the current theme on page load
  linkCssColor.href = '/assets/color-' + cssArray[curTheme] + '.css';

  // This timeout function is here so it can be killed
  // this way if someone hits the button quickly, the
  // tstr button will just stay there utnil they stop
  function tstrTimeout() {
    tstrTime = setTimeout(function() {
      tstr.className = tstr.className.replace('show ', '');
    }, 2600);
  }

  // This does the colorCSS swaping
  colorsCss.onclick = function (e) {
    (e).preventDefault;
    clearTimeout(tstrTime);

    cTheme = getCookie('theme');
    curTheme++;
    curTheme >= cssAL ? curTheme = 0 : curTheme;
    linkCssColor.href = '/assets/color-' + cssArray[curTheme] + '.css';
    tstr.textContent = mkUpper(cssArray[curTheme].split('-').join(' '));
    tstr.className = 'show card-btn';
    tstrTimeout();
    setCookie('theme', curTheme, 7);
  };
})();

// Card Filter
(function () {
  var cardStack = document.getElementsByClassName('cardgroup');
  var filterLinks = document.getElementById('topNavbar').getElementsByTagName('a');
  var clickedId;
  var i;
  // scrollSpd = setTimeout wait in milliseconds
  var scrollSpd = 16;
  // scrollSpd = default number of px to scroll
  var scrollPxls = 24;
  // Turning array-likes into arrays
  cardStack = Array.prototype.slice.call(cardStack);
  filterLinks = Array.prototype.slice.call(filterLinks);

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
  filterLinks.forEach(function(filterL) {
    filterL.onclick = function (e) {
      e.preventDefault();
      filterLinks.map(function (fLink) {
        fLink.className = '';
      });

      this.className = 'selected';
      clickedId = this.childNodes[1].id.slice(5);

      cardStack.map(function (cardS) {
        if (clickedId === 'home') {
          cardS.style.display = 'inherit';
          // auto scroll
          scrollCheck(window.pageYOffset, 0);
        } else if (clickedId === cardS.id) {
          cardS.style.display = 'inherit';
          // auto scroll
          scrollCheck(window.pageYOffset, 501);
        } else {
          cardS.style.display = 'none';
        }
      });
      return false;
    };
  });
})();


(function() {
  var foot = document.getElementsByClassName('footer')[0];
  var today = new Date().getFullYear();
  var footerTxt = '<p>&copy;' + today + ' HyperSprite.com</p>';
  foot.insertAdjacentHTML('beforeend', footerTxt);
})();


// Email Modal
(function () {
  var modal = document.getElementById('emailModal');
  var emaillink = document.getElementById('open-email-modal');
  var span = document.getElementsByClassName('close')[0];

  emaillink.onclick = function (e) {
    (e).preventDefault;
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


(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments);
  }, i[r].l = 1 * new Date();
  a = s.createElement(o), m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-84713563-1', 'auto');
ga('send', 'pageview');
