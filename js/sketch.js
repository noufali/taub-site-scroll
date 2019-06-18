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
  let index = document.getElementById("whatyear").value;
  let data = [
    {"year": "2018", "month": "April", "privatePerc": "0.14", "goodsPerc": "0.22", "servicePer": "0.13", "privateTho": "126,048.160", "goodsTho": "20,573.179", "servicesTho": "105,474.981"},
    {"year": "2018", "month": "May", "privatePerc": "0.22", "goodsPerc": "0.42", "servicePer": "0.18", "privateTho": "126,323.795", "goodsTho": "20,659.955", "servicesTho": "105,663.840"},
    {"year": "2018", "month": "June", "privatePerc": "0.17", "goodsPerc": "0.14", "servicePer": "0.18", "privateTho": "126,544.810", "goodsTho": "20,689.282", "servicesTho": "105,855.528"},
    {"year": "2018", "month": "July", "privatePerc": "0.22", "goodsPerc": "0.37", "servicePer": "0.20", "privateTho": "126,829.139", "goodsTho": "20,766.569", "servicesTho": "106,062.570"},
    {"year": "2018", "month": "August", "privatePerc": "0.13", "goodsPerc": "0.08", "servicePer": "0.13", "privateTho": "126,988.113", "goodsTho": "20,782.417", "servicesTho": "106,205.696"},
    {"year": "2018", "month": "September", "privatePerc": "0.16", "goodsPerc": "0.27", "servicePer": "0.14", "privateTho": "127,187.340", "goodsTho": "20,837.603", "servicesTho": "106,349.736"},
    {"year": "2018", "month": "October", "privatePerc": "0.19", "goodsPerc": "0.18", "servicePer": "0.19", "privateTho": "127,425.327", "goodsTho": "20,875.551", "servicesTho": "106,549.776"},
    {"year": "2018", "month": "November", "privatePerc": "0.11", "goodsPerc": "0.03", "servicePer": "0.12", "privateTho": "127,561.742", "goodsTho": "20,882.065", "servicesTho": "106,679.677"},
    {"year": "2018", "month": "December", "privatePerc": "0.20", "goodsPerc": "0.18", "servicePer": "0.20", "privateTho": "127,810.745", "goodsTho": "20,919.687", "servicesTho": "106,891.058"},
    {"year": "2019", "month": "January", "privatePerc": "0.21", "goodsPerc": "0.42", "servicePer": "0.16", "privateTho": "128,074.432", "goodsTho": "21,007.174", "servicesTho": "107,067.258"},
    {"year": "2019", "month": "February", "privatePerc": "0.17", "goodsPerc": "0.19", "servicePer": "0.17", "privateTho": "128,294.340", "goodsTho": "21,046.653", "servicesTho": "107,247.687"},
    {"year": "2019", "month": "March", "privatePerc": "0.12", "goodsPerc": "0.00", "servicePer": "0.14", "privateTho": "128,445.777", "goodsTho": "21,046.099", "servicesTho": "107,399.679"},
    {"year": "2019", "month": "April", "privatePerc": "0.21", "goodsPerc": "0.25", "servicePer": "0.21", "privateTho": "128,720.753", "goodsTho": "21,098.064", "servicesTho": "107,622.690"}
  ];

  let dataPt = data[index];
  $( "#data-month" ).text(dataPt.month);
  $( "#data-year" ).text(dataPt.year);

  $( "#num-1" ).text(dataPt.privateTho);
  $( "#num-2" ).text(dataPt.goodsTho);
  $( "#num-3" ).text(dataPt.servicesTho);

  let privatePerc = mapped(dataPt.privatePerc,0.11,0.22,300,600);
  let goodsPerc = mapped(dataPt.privatePerc,0.00,0.42,300,600);
  let servicePer = mapped(dataPt.privatePerc,0.12,0.21,300,500);

  if (privatePerc > 600) {
    privatePerc = 600;
  }

  if (goodsPerc > 600) {
    goodsPerc = 600;
  }
  if (servicePer > 500) {
    servicePer = 500;
  };

  if (privatePerc < 300) {
    privatePerc = 300;
  }
  if (goodsPerc < 300) {
    goodsPerc = 300;
  }
  if (servicePer < 300) {
    servicePer = 300;
  };

  let graph1 = document.getElementById("graph-1");
  let graph2 = document.getElementById("graph-2");
  let graph3 = document.getElementById("graph-3");

  graph1.style.fontVariationSettings = " 'wght' " + privatePerc;
  //console.log(privatePerc);
  graph2.style.fontVariationSettings = " 'wght' " + goodsPerc;
  graph3.style.fontVariationSettings = " 'wght' " + servicePer;
  //console.log(servicePer);

  requestAnimationFrame(dataViz);
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
