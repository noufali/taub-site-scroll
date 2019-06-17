var wid = window.innerWidth;
var hei = window.innerHeight;
var hypotenuse = calcHypotenuse(wid,hei);
document.body.style.overflow = "hidden";

var textDiv = document.getElementById("textDiv");
textDiv.style.width = wid + "px";
textDiv.style.height = hei + "px";
var taub = ("Taub").split('');

function setup () {
  createCanvas(wid, hei);

  // WORD SPANS
  for ( let i = 0 ; i < taub.length ; i++ ) {
    let w = document.createElement('span');
    w.textContent = taub[i];
    let id = 'w' + i;
    w.id = id;
    w.className = "properties";
    textDiv.appendChild(w);
  }
}

window.onresize = resize;

function resize() {
  //resize p5 canvas
  wid = window.innerWidth;
  hei = window.innerHeight;
  resizeCanvas(wid, hei);

  // resize text Canvas
  textDiv.style.width = wid + "px";
  textDiv.style.height = hei + "px";

  // recalculate hypotenuse
  hypotenuse = calcHypotenuse(wid,hei);
}

function draw () {
  background("#f2635d");

  var centerList = {};
  var distances = {};
  var letterDiv;
  var c;

  // finding center of each letter
  for(let i=0;i<taub.length;i++) {
    letterDiv = document.getElementById("w" + i);

    let xCorner = letterDiv.offsetLeft;
    let yCorner = letterDiv.offsetTop;
    let w = letterDiv.offsetWidth / 2;
    let h = letterDiv.offsetHeight / 2;
    centerList[i] = {'x':xCorner+w,'y':yCorner+h, 'index': i, 'letter': letterDiv.innerHTML};
    noFill();
    //rect(xCorner,yCorner, letterDiv.offsetWidth, letterDiv.offsetHeight);
    //ellipse(xCorner + w , yCorner + h, 5);
  }

  // calculating distances
  for (let l =0 ; l<taub.length; l++) {
    let text = centerList[l].letter;
    let letter = centerList[l];
    let distance = dist(letter.x,letter.y,mouseX,mouseY);
    distances[l] = {'index':letter.index,'dist':distance, 'letter': text};
    //line(letter.x,letter.y,mouseX,mouseY);
  }

  // attractor point
  for (let n=0;n<taub.length;n++){
    let letterDiv = document.getElementById("w" + n);
    let text = distances[n].letter;
    let impact = hypotenuse;
    let hi = map(distances[n].dist,0,impact/6,100,600);

    if (hi > 600){
      hi = 600;
    }

    if (hi < 200){
      hi = 200;
    }

    letterDiv.style.fontVariationSettings = " 'wght' " + hi;
  }
}

function calcHypotenuse(a, b) {
  return(Math.sqrt((a * a) + (b * b)));
}
