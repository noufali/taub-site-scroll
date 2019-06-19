// WINDOW DIMENSIONS
var wid = window.innerWidth;
var hei = window.innerHeight;
var intro, dataSection;
var anatomySection = document.getElementById("anatomy-section");
var stylesSection = document.getElementById("styles-section");

// Make Sections fullscreen on Desktop
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
  // no resizing
} else {
  console.log("desktop");
  intro = document.getElementById('intro-section');
  intro.style.width = wid + "px";
  intro.style.height = hei + "px";

  dataSection = document.getElementById("data-section");
  dataSection.style.width = wid + "px";
  dataSection.style.height = hei + "px";

  anatomySection.style.width = wid + "px";
  anatomySection.style.height = hei + "px";

  stylesSection.style.width = wid + "px";
  stylesSection.style.height = hei + "px";


  window.onresize = resize;
}

var animateSection = document.getElementById("animate-section");
animateSection.style.width = wid + "px";
animateSection.style.height = hei + "px";

var taub = ("Taub").split('');
var e = ("data").split('');

var characters = ("!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦§¨©ª«¬®¯°±²³´¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžƏȘșȚțȲȳȷəˆˇ˘˙˚˛˜˝ḂḃḊḋḞḟṀṁṖṗṪṫẀẁẂẃẄẅỲỳ––—―‖‘’‚‛“”„‟†‡•…‰‴‹›⁄⁰⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾€℠™⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟−≈≠≡≤≥◦ﬁﬂ\|{}[]˘¦•ˇ’ˆ‚‛ß").split('');
var grid = document.getElementById("grid-container");
introducingTaub();

var slider = document.getElementById("whatyear");

var interval = setInterval(function() {
  slider.stepUp();
  slider.dispatchEvent(new Event('input'));
  dataViz();
  if (slider.value == 204) slider.value = 0;
}, 900);

//dataViz();

// 1st section - intro
function introducingTaub() {
  for (let i = 0 ;i < taub.length; i++) {
    let introTitle = document.getElementById('intro-title');
    let w = document.createElement('span');
    w.textContent = taub[i];
    let id = 'I' + i;
    w.id = id;
    w.className = "sans-h1";
    introTitle.appendChild(w);
  }
}
// 2nd section - data visualizations

function dataViz() {
  let index = document.getElementById("whatyear").value;
  var stats;
  d3.csv("js/ADP_Employment_History.csv").then(function(data) {
    stats = data[index];
    $( "#data-month" ).text(stats.month);
    $( "#data-year" ).text(stats.year);

    $( "#graph-1-num" ).text(stats.privateThousands);
    $( "#graph-2-num" ).text(stats.goodsThousands);
    $( "#graph-3-num" ).text(stats.serviceThousands);

    $( "#graph-1-perc" ).text(stats.privatePercent);
    $( "#graph-2-perc" ).text(stats.goodsPercent);
    $( "#graph-3-perc" ).text(stats.servicePercent);
    let privatePerc = mapped(stats.privatePercent,-0.64,0.32,0,900);
    let goodsPerc = mapped(stats.goodsPercent,-0.97,0.42,0,900);
    let servicePer = mapped(stats.servicePercent,-0.47,0.33,0,900);

    if (privatePerc > 900) {
      privatePerc = 900;
    }

    if (goodsPerc > 900) {
      goodsPerc = 900;
    }
    if (servicePer > 900) {
      servicePer = 900;
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

    let graph1 = document.getElementById("graph-1-num");
    let graph2 = document.getElementById("graph-2-num");
    let graph3 = document.getElementById("graph-3-num");

    graph1.style.fontVariationSettings = " 'wght' " + privatePerc;
    graph2.style.fontVariationSettings = " 'wght' " + goodsPerc;
    graph3.style.fontVariationSettings = " 'wght' " + servicePer;
  });

  //requestAnimationFrame(dataViz);
}

var two;
scrollTaub();
showGrid();
showAnatomy();

// second section - scroll taub
function scrollTaub(){
  for (let i = 0 ;i < e.length; i++) {
    let w = document.createElement('span');
    w.textContent = e[i];
    let id = 'M' + i;
    w.id = id;
    w.className = "display-T";
    animateSection.appendChild(w);
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
  }).appendTo(anatomySection);

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
  console.log(wid);
  // resize intro Section
  intro.style.width = wid + "px";
  intro.style.height = hei + "px";

  // resize mouse Section
  animateSection.style.width = wid + "px";
  animateSection.style.height = hei + "px";

  stylesSection.style.width = wid + "px";
  stylesSection.style.height = hei + "px";

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
