$(document).ready(function(){

var thumbPos, origin, originPerc, degToRotate;

var scale = d3.scale.linear()
                    .domain([0, 25, 50, 75, 100])
                    .range([-4, -2, 0, 2, 4]);

$("#slider").on("input change", function(){
  thumbPos = ((this.value - this.min / this.max - this.min) / this.max) * $(this).width();
  origin = thumbPos + 10;
  originPerc = origin / $(this).width() * 100;
  
  degToRotate = scale(originPerc);
  //console.log(originPerc, degToRotate);

  $(this).css({
     'transform': 'rotate('+degToRotate+'deg)',
     'transform-origin': originPerc + '% 0%'
  });

});


});
