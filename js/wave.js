var wid = window.innerWidth;
var hei = window.innerHeight;
document.body.style.backgroundColor = "#f2635d";
document.body.style.overflow = "hidden";

var letters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split('');
var letterGrid = document.getElementById("letter-grid");

// WORD SPANS
for ( let i = 0 ; i < 200 ; i++ ) {
  let w = document.createElement('span');
  let r = letters[getRandomInt(0, letters.length)];
  w.textContent = r;
  w.id = 'let' + i;
  w.className = "letter";
  letterGrid.appendChild(w);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function setup(){
  createCanvas(wid, hei);
}

function draw() {
  background("#f2635d");

  for(let i=0;i<200;i++) {
    let num = getRandomInt(0, 199);
    let div = document.getElementById("let" + num);

    //let x = $("#let" + i).offset().left;
    //let y = $("#let" + i).offset().top;
    let n = sin(frameCount * 0.5);

    //let val = Math.floor(map(n,-1,1,0,500));
    //console.log(val);
    //$("#let" + i).css('top', x);
    //$("#let" + i).css('top', n);
    //div.style.fontVariationSettings = " 'wght' " + val;
  }

}


function windowResized() {
  //resize p5 canvas
  wid = window.innerWidth;
  hei = window.innerHeight;
  resizeCanvas(wid, hei);
}
