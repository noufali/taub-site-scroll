// WINDOW DIMENSIONS
var wid = window.innerWidth;
var hei = window.innerHeight;

// Make Sections fullscreen
var intro = document.getElementById('introSection');
intro.style.width = wid + "px";
intro.style.height = hei + "px";
var animateSection = document.getElementById("animateSection");
animateSection.style.width = wid + "px";
animateSection.style.height = hei + "px";
var anatomySection = document.getElementById("AnatomySection");
anatomySection.style.width = wid + "px";
anatomySection.style.height = hei + "px";
var dataSection = document.getElementById("dataSection");
dataSection.style.width = wid + "px";
dataSection.style.height = hei + "px";

// time, date, location
var seconds, mili;
var today = new Date();
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var thisMonth = months[today.getMonth()];
var date = thisMonth + ' ' + today.getDate() + ', '+ today.getFullYear();
var city = document.getElementById("time-container");
var bigLetter = document.getElementById("Hello");
var word = ("H I").split('');

var two;
var characters = ("!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦§¨©ª«¬®¯°±²³´¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžƏȘșȚțȲȳȷəˆˇ˘˙˚˛˜˝ḂḃḊḋḞḟṀṁṖṗṪṫẀẁẂẃẄẅỲỳ––—―‖‘’‚‛“”„‟†‡•…‰‴‹›⁄⁰⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾€℠™⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟−≈≠≡≤≥◦ﬁﬂ\|{}[]˘¦•ˇ’ˆ‚‛ß").split('');
var grid = document.getElementById("gridContainer");

// Intro div fullscreen
var taub = ("Taub").split('');

window.onresize = resize;
$(window).scroll(changeWeight);
introducingTaub();
scrollTaub();
showGrid();
showAnatomy();
dataViz();

// first section - intro
function introducingTaub() {
  for(let i = 0;i < taub.length; i++) {
    let introTitle = document.getElementById('introTitle');
    let left = getRandomInt(100, $("#introTitle").width());
    let top = getRandomInt(200, $("#introTitle").width());
    let w = document.createElement('span');
    w.textContent = taub[i];
    let id = 'I' + i;
    w.id = id;
    w.className = "taub";
    w.style.top = top + "px";
    w.style.left = left + "px";
    introTitle.appendChild(w);
    $("#I" + i).draggable({
      // when user drops off word, check for its position
      // if word is on the right of the page then turn div background colour to red
      stop: function() {
        //positions();
      }
    });
  }
}

// second section - scroll taub
function scrollTaub(){
  for (let i = 0 ;i < taub.length; i++) {
    let w = document.createElement('span');
    w.textContent = taub[i];
    let id = 'M' + i;
    w.id = id;
    w.className = "properties";
    animateSection.appendChild(w);
  }
}
function changeWeight() {
  var scrollTop= $(window).scrollTop();
  //console.log("Scroll from Top: " + tempScrollTop.toString());
  var value = mapped(scrollTop,0,1032,200,800);
  for (let n=0;n<taub.length;n++){
    let letterDiv = document.getElementById("M" + n);

    if (value > 800){value = 800}
    if (value < 200){value = 200}

    letterDiv.style.fontVariationSettings = " 'wght' " + value;
  }
}

// third section - grid
function showGrid() {
  // Grid Characters
  for (let i = 0; i < characters.length; i++) {
    let w = document.createElement('span');
    w.textContent = characters[i];
    w.id = 'G' + i;
    w.className = "grid-item";
    grid.appendChild(w);
  }
}

// fourth section - anatomy
function showAnatomy() {
  two = new Two({
    width: wid,
    height: hei
  }).appendTo(AnatomySection);

  var w = document.getElementById("work");
  var work = two.interpret(w);
  let value = mapped(wid,0,2440,0.009,1.87);

  var s = document.getElementById("skeleton");
  var skeleton = two.interpret(s);
  work.scale = value;
  skeleton.scale = value;

  var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
  background.noStroke();
  background.fill = "#7569A9";
  background.name = 'background';

  var container = two.makeGroup(background);
  container.add(skeleton);

  var cursor = two.makeCircle(0, 0, Math.min(two.height, two.width) / 6);
  cursor.outline = two.makeCircle(0, 0, Math.min(two.height, two.width) / 6);
  cursor.target = new Two.Vector();

  cursor.outline.noFill();
  cursor.outline.stroke = 'rgba(239, 223, 209, 0.7)';
  cursor.outline.linewidth = 2;

  container.mask = cursor;
  cursor.target.set(two.width / 2, two.height / 2);
  cursor.translation.copy(cursor.target);

  var center = _.debounce(function() {
    cursor.target.set(two.width / 2, two.height / 2);
  }, 1000);

  var drag = function(e) {
    cursor.target.set(e.clientX, e.clientY);
    center();
  };

  var touchDrag = function(e) {
    e.preventDefault();
    var touch = e.originalEvent.changedTouches[0];
    drag({
      clientX: touch.pageX,
      clientY: touch.pageY
    });
    return false;
  };

  $(window)
  .bind('mousemove', drag)
  .bind('touchmove', touchDrag);

  two.bind('update', function(frameCount) {
    cursor.translation.x += (cursor.target.x - cursor.translation.x) * 0.125;
    cursor.translation.y += (cursor.target.y - cursor.translation.y) * 0.125;
    cursor.outline.translation.copy(cursor.translation);
  }).play();
}

// fifth section - data visualizations
function dataViz() {
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
    document.getElementById('time').innerHTML = h + ":" + m + ":" + seconds;
    var t = setTimeout(startTime, 500);
  }
  startTime();
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
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
function mapped (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
function resize() {
  console.log("resizing");
  //get new window dimensions
  wid = window.innerWidth;
  hei = window.innerHeight;
  // resize intro Section
  intro.style.width = wid + "px";
  intro.style.height = hei + "px";

  // resize mouse Section
  animateSection.style.width = wid + "px";
  animateSection.style.height = hei + "px";

  // resize anatomy Section
  anatomySection.style.width = wid + "px";
  anatomySection.style.height = hei + "px";
  let factor = mapped(wid,0,2440,0.009,1.87);

  skeleton.scale = factor;
  work.scale = factor;

  two.width = wid;
  two.height = hei;

  // resize Data Section
  dataSection.style.width = wid + "px";
  dataSection.style.height = hei + "px";
}
