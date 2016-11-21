
// _eG are the emailGlobals
var _eG = {};
_eG.canceled = false;
_eG.iHateBots = '';

// Email submit progress bar
function statusMove(moveWhat) {
  var elem = document.getElementById(moveWhat);
  var width = 30;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100 || _eG.canceled) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}

function captcha(){
  var alpha = ['A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z','2','3','4','5','6','7','8','9','-','=','+'];
  _eG.iHateBots = '';
  var i;
  for (i = 0; i < 7; i++) {
    _eG.iHateBots += alpha[Math.floor(Math.random() * alpha.length)];
  }
  var canvasTextColor = '#222222';
  if (pGlobal.curTheme === 1) {
    canvasTextColor = '#fff7e6';
  } else if (pGlobal.curTheme === 4) {
    canvasTextColor = '#e6e6e6';
  }
  var canvas = document.getElementById('email-canvas');
  var context = canvas.getContext('2d');
  // context.fillRect(0, 0, 150, 30);
  context.fillStyle = canvasTextColor;
  context.clearRect(0, 0, 150, 30);
  context.font = '20px courier';
  context.fillText(_eG.iHateBots.split('').join(' '), -18, 30);
}

function validCaptcha() {
  var checkThis = document.getElementById('ihatebots').value;
  if (_eG.iHateBots.substring(1) === checkThis) {
    return true;
  }
  return false;
}

var refreshCaptcha = document.getElementById('refresh');
refreshCaptcha.onclick = function () {
  captcha();
  return false;
};
// Credit for most of the stuff below this line goes to:
// https://github.com/dwyl/html-form-send-email-via-google-script-without-server


function validEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}
// get all data in form and return object
function getFormData() {
  var elements = document.getElementById('gform').elements; // all form elements
  var fields = Object.keys(elements).map(function (k) {
    if (elements[k].name !== undefined) {
      return elements[k].name;
    }
  }).filter(function (item, pos, self) {
    return self.indexOf(item) == pos && item;
  });
  var data = {};
  fields.forEach(function(k) {
    data[k] = elements[k].value;
  });
  return data;
}

function handleFormSubmit(event) {  // handles form submit withtout any jquery
  _eG.canceled = false;
  event.preventDefault();           // we are submitting via xhr below
  statusMove('email-bar');          // custom progress bar, not from original code
  var data = getFormData();         // get the values submitted in the form
  if (!validEmail(data.email) || !validCaptcha()) {   // if email is not valid show error
    document.getElementById('email-invalid').style.display = 'block';
    document.getElementById('email-initial').style.display = 'none';
    _eG.canceled = true;
    return false;
  }
  var url = event.target.action;  //
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  // xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function () {
      // console.log( xhr.status, xhr.statusText )
      // console.log(xhr.responseText);
    document.getElementById('gform').style.display = 'none'; // hide form
    document.getElementById('thankyou_message').style.display = 'block';
    return;
  };
  // url encode form data for sending as post data
  var encoded = Object.keys(data).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
  }).join('&');
  xhr.send(encoded);
}
function loaded() {
  // console.log('contact form submission handler loaded successfully');
  // bind to the submit event of our form
  var form = document.getElementById('gform');
  form.addEventListener('submit', handleFormSubmit, false);
}
document.addEventListener('DOMContentLoaded', loaded, false);
captcha();
