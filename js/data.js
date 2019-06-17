document.body.style.backgroundColor = "#efdfd1";
var seconds, mili;
// date
var today = new Date();
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var thisMonth = months[today.getMonth()];
var date = thisMonth + ' ' + today.getDate() + ', '+ today.getFullYear();
// city
var city = document.getElementById("time-container");

var bigLetter = document.getElementById("bigLetter");
var word = ("H I").split('');

// WORD SPANS
for ( let i = 0 ; i < word.length ; i++ ) {
  let w = document.createElement('span');
  w.textContent = word[i];
  let id = 'w' + i;
  w.id = id;
  bigLetter.appendChild(w);
}

$.ajax({
  url: "https://geoip-db.com/jsonp",
  jsonpCallback: "callback",
  dataType: "jsonp",
  success: function( location ) {
    $('#city').html(location.city + ", " + location.country_name);
    $('#date').html(date);
  }
});

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  seconds = today.getSeconds();
  mili = today.getMilliseconds();
  m = checkTime(m);
  seconds = checkTime(seconds);
  document.getElementById('time').innerHTML =
  h + ":" + m + ":" + seconds;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function animate(){
  let val = mapped(seconds, 0,60,0,1000);

  for (let n=0;n<word.length;n++) {
    let letterDiv = document.getElementById("w" + n);
    letterDiv.style.fontVariationSettings = " 'wght' " + val;
  }

  requestAnimationFrame(animate);
}

animate();

function mapped (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
