// WINDOW DIMENSIONS
var wid = window.innerWidth;
var hei = window.innerHeight;
// SECTIONS
var intro = document.getElementById('intro-section');
var vidContainer = document.getElementById('vid-container');
var vidDesktop = document.getElementById('vid-desktop');
var vidMobile = document.getElementById('vid-mobile');
var introTitle = document.getElementById('intro-title');
var introDescription = document.getElementById('intro-description');
var dataSection = document.getElementById("data-section");
var anatomySection = document.getElementById("anatomy-section");
var stylesSection = document.getElementById("styles-section");
var animateSection = document.getElementById("animate-section");
var gridSection = document.getElementById("grid-section");
var grid = document.getElementById("grid-container");
var slider = document.getElementById("whatyear");
var characters = ("!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦§¨©ª«¬®¯°±²³´¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžƏȘșȚțȲȳȷəˆˇ˘˙˚˛˜˝ḂḃḊḋḞḟṀṁṖṗṪṫẀẁẂẃẄẅỲỳ––—―‖‘’‚‛“”„‟†‡•…‰‴‹›⁄⁰⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎€℠™⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟−≈≠≡≤≥◦ﬁﬂ@|{}[]˘¦•ˇ’ˆ‚‛ß").split('');
var two, skeleton, work, cursor, anatomyText, anatomyText2;

if( wid > 1024 ) {
  console.log("desktop");
  console.log(wid);
  intro.style.width = wid + "px";
  intro.style.height = hei + "px";

  dataSection.style.width = wid + "px";
  dataSection.style.height = hei + "px";

  anatomySection.style.width = wid + "px";
  anatomySection.style.height = hei + "px";

  stylesSection.style.height = hei + "px";

  animateSection.style.width = wid + "px";
  animateSection.style.height = hei + "px";

  let ratio = (wid*924) / 2880;

  vidContainer.style.width = wid + "px";
  vidContainer.style.height = ratio + "px";

  introTitle.style.width = wid + "px";
  introTitle.style.height = ratio + "px";

  let diff = hei - ratio;

  introDescription.style.width = wid + "px";
  introDescription.style.height = diff + "px";

  showAnatomy();
  showGrid();
  enlargeLetter();

  window.onresize = resize;
}

// IPAD
if (wid >= 768 && wid <= 1024) {
  console.log("iPad");
  console.log(wid);
  vidContainer.style.width = wid + "px";
  vidContainer.style.height = "500px";

  vidDesktop.style.width = wid + "px";
  vidDesktop.style.height = "auto";

  vidMobile.style.width = wid + "px";
  vidMobile.style.height = "auto";

  introTitle.style.width = wid + "px";
  introTitle.style.height = "500px";

  showGrid();
}

// MOBILE
if(wid < 768) {
  console.log("mobile");
  console.log(wid);

  vidContainer.style.width = wid + "px";
  vidContainer.style.height = "500px";

  vidDesktop.style.width = wid + "px";
  vidDesktop.style.height = "auto";

  vidMobile.style.width = wid + "px";
  vidMobile.style.height = "auto";

  introTitle.style.width = wid + "px";
  introTitle.style.height = "500px";

  showGrid();

}

var interval = setInterval(function() {
  slider.stepUp();
  slider.dispatchEvent(new Event('input'));
  dataViz();
  if (slider.value == 204) slider.value = 0;
}, 900);

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
// 4th section - grid
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
function enlargeLetter() {
  $(document).on('mousemove', function(e){
    $('#grid-enlarge').css({
      left:  e.pageX,
      top:   e.pageY
    });
    for(let i=0;i<characters.length;i++) {
      let letter = document.getElementById('G' + i);
      let txt = letter.innerHTML;
      let big = document.getElementById("grid-enlarge");
      letter.onmouseover = function(event) {
        let target = event.target;
        target.style.cursor = "pointer";
        big.innerHTML = txt;
        big.style.visibility = 'visible';
      };

      letter.onmouseout = function(event) {
        let target = event.target;
        big.style.visibility = 'hidden';
      };
    }
  });
}
// 5th section - anatomy
function showAnatomy() {
  two = new Two({
    width: wid,
    height: hei
  }).appendTo(anatomySection);

  var message = "Taub Type draws its inspiration from the works of Karl Gerstner and Otl Aicher and was drawn on an offset pixel grid, which informs Taub Sans’ construction, and connects to our iconography";
  var message2 = "and data visualizations.";
  anatomyText = two.makeText(message, 75, two.height/10, {
    alignment: 'left'
  });
  anatomyText2 = two.makeText(message2, 75, two.height/7, {
    alignment: 'left'
  });
  let textFactor = mapped(wid,0,2440,10,30);
  anatomyText.size = textFactor;
  anatomyText.fill = "#efdfd1";
  anatomyText.family = "TaubSans-Regular";

  anatomyText2.size = textFactor;
  anatomyText2.fill = "#efdfd1";
  anatomyText2.family = "TaubSans-Regular";

  var w = document.getElementById("work");
  work = two.interpret(w);
  let value = mapped(wid,0,2440,0.009,1.67);

  var s = document.getElementById("skeleton");
  skeleton = two.interpret(s);
  work.scale = value;
  skeleton.scale = value;

  var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
  background.noStroke();
  background.fill = "#7569A9";
  background.name = 'background';

  var container = two.makeGroup(background);
  container.add(skeleton);

  cursor = two.makeCircle(0, 0, Math.min(two.height, two.width) / 6);
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

$(document).ready(function(){
  $(window).scroll(function(){
    var scrollTop = $(document).scrollTop();
    var divTop = $("#animate-section").offset().top;
    var divMin = divTop - ( $("#animate-section").offset().top / 2 );
    var divBottom = divTop + $("#animate-section").height();
    if (scrollTop >= divMin && scrollTop < divBottom) {
      console.log("added");
      $(".display-T").css("animation", "weight 4s infinite");
    } else {
      console.log("removed");
      $(".display-T").css("animation", "");
      // $('.display-T').removeAttr('animation');
    }
  })
});

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

  let ratio = (wid*924) / 2880;

  vidContainer.style.width = wid + "px";
  vidContainer.style.height = ratio + "px";

  vidDesktop.style.width = wid + "px";
  vidDesktop.style.height = "auto";

  vidMobile.style.width = wid + "px";
  vidMobile.style.height = "auto";

  introTitle.style.width = wid + "px";
  introTitle.style.height = ratio + "px";

  let diff = hei - ratio;

  introDescription.style.width = wid + "px";
  introDescription.style.height = diff + "px";

  // resize Data Section
  dataSection.style.width = wid + "px";
  dataSection.style.height = hei + "px";

  // resize animation section
  animateSection.style.width = wid + "px";
  animateSection.style.height = hei + "px";

  // resize anatomy Section
  anatomySection.style.width = wid + "px";
  anatomySection.style.height = hei + "px";
  let factor = mapped(wid,0,2440,0.009,1.67);

  two.width = wid;
  two.height = hei;

  cursor.target.set(two.width / 2, two.height / 2);
  //cursor.translation.copy(cursor.target);

  skeleton.scale = factor;
  work.scale = factor;


  let textFactor = mapped(wid,0,2440,10,30);
  anatomyText.size = textFactor;
  anatomyText2.size = textFactor;

  // resize Styles Section
  stylesSection.style.height = hei + "px";
}
