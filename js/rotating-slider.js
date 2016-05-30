(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');


$(document).ready(function(){

  var thumbPos, origin, originPerc, degToRotate, minVal, maxVal, curVal, sliderWidth;

  var scale = d3.scale.linear()
                      .domain([0, 25, 50, 75, 100])
                      .range([-4, -12, 0, 2, 4]); //play around with the value of these numbers

  function setRotation(w){
    sliderWidth = w;
    //sliderWidth = $('#slider').width();
    minVal = $('#slider').prop('min');
    maxVal = $('#slider').prop('max');
    curVal = $('#slider').val();
    thumbPos = ((curVal - minVal / maxVal - minVal) / maxVal) * sliderWidth;
    origin = thumbPos + 10;
    originPerc = origin / sliderWidth * 100;
    degToRotate = scale(originPerc);
    $('#slider').css({
      'transform': 'rotate('+degToRotate+'deg)',
      'transform-origin': originPerc + '% 0%'
    });
    // $('output').html('<strong>Rotation </strong>' +degToRotate + '<br><strong>Rotation center (knob position)</strong> '+thumbPos+'<br>Step ' + curVal + ' of ' + maxVal + ' ('+curVal/maxVal*100+'%)');
  }

  //initial rotation angle
  setRotation($('#slider').width());

  //on input change
  $("#slider").on("input change", function(){
    setRotation($(this).width());
  });

  //on resize
  $(window).smartresize(function(){
    setRotation($('#slider').width());
  });

});
