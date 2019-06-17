var wid = window.innerWidth;
var hei = window.innerHeight;
document.body.style.backgroundColor = "#F2CAC1";
var characters = ("!#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~¡¢£¥¦§¨©ª«¬®¯°±²³´¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿĀāĂăĄąĆćĈĉĊċČčĎďĐđĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħĨĩĪīĬĭĮįİıĲĳĴĵĶķĸĹĺĻļĽľĿŀŁłŃńŅņŇňŊŋŌōŎŏŐőŒœŔŕŖŗŘřŚśŜŝŞşŠšŢţŤťŦŧŨũŪūŬŭŮůŰűŲųŴŵŶŷŸŹźŻżŽžƏȘșȚțȲȳȷəˆˇ˘˙˚˛˜˝ḂḃḊḋḞḟṀṁṖṗṪṫẀẁẂẃẄẅỲỳ––—―‖‘’‚‛“”„‟†‡•…‰‴‹›⁄⁰⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾€℠™⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞⅟−≈≠≡≤≥◦ﬁﬂ\|{}[]˘¦•ˇ’ˆ‚‛ß").split('');
var grid = document.getElementById("grid-container");

// WORD SPANS
for ( let i = 0 ; i < characters.length ; i++ ) {
  let w = document.createElement('span');
  w.textContent = characters[i];
  w.id = 'c' + i;
  w.className = "grid-item";
  grid.appendChild(w);
}

$(document).on('mousemove', function(e){
  $('#enlarge').css({
    left:  e.pageX - $('#container').offset().left,
    top:   e.pageY - $('#container').offset().top
  });
  $('.grid-item').hover(function(){
    let id = $(this).attr('id');
    // $(this).css("background-color", "green");
    let letter = $("#" + id).text();
    $('#enlarge').css("visibility", "visible");
    $('#enlarge').html(letter + "");
  });

  // $( ".grid-item" ).mouseout(function() {
  //   $('#enlarge').css("visibility", "hidden");
  // });
});


// $(document).on('mousemove', function(e){
//   $('#enlarge').css({
//     left:  e.pageX - $('#container').offset().left,
//     top:   e.pageY - $('#container').offset().top
//   });
//   $('.grid-item').mouseover(function(){
//     let id = $(this).attr('id');
//     let letter = $("#" + id).text();
//     // $('#enlarge').css("z-index", "3");
//     $('#enlarge').css("visibility", "visible");
//     $('#enlarge').html(letter + "");
//   }, function() {
//     $('#enlarge').css("visibility", "hidden");
//     $('#enlarge').html("");
//   });
// });
