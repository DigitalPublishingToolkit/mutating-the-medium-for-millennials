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

  //gallery mechanism
  var numImg = $('#article-image-gallery').children().length; //total images
  var imgCounter = 0; //initial image
  var imgCounterCaption = (imgCounter+1) + ' of ' + numImg;
  var imgCaption = $('.currentImg img').attr('alt');

  //count and caption, initial
  $('.counter').text(imgCounterCaption); //count and caption
  $('.caption').text(imgCaption);

  function setCaption(c){
    //count and caption
    imgCounterCaption = (c+1) + ' of ' + numImg;
    imgCaption = $('.currentImg img').attr('alt');
    $('.counter').text(imgCounterCaption); //count and caption
    $('.caption').text(imgCaption);
  }

  function nextImg(){
    if(imgCounter < numImg -1){
      imgCounter++;
    }else{
      imgCounter = 0;
    }
    //set .currentImg
    $('.currentImg').removeClass('currentImg');
    $('#article-image-gallery li').eq(imgCounter).addClass('currentImg');

    //count and caption
    setCaption(imgCounter);
  }

  function prevImg(){
    if(imgCounter > 0){
      imgCounter--;
    }else{
      imgCounter = numImg -1;
    }
    //set .currentImg
    $('.currentImg').removeClass('currentImg');
    $('#article-image-gallery li').eq(imgCounter).addClass('currentImg');

    //count and caption
    setCaption(imgCounter);
  }

  //click
  $('#next').on('click', function(){
    nextImg();
  });

  $('#prev').on('click', function(){
    prevImg();
  });

  //swipe (TO DO)


  //keyboard arrow
  $("body").keydown(function(e) {
    if(e.keyCode == 37) { // left
      prevImg();
    }
    else if(e.keyCode == 39) { // right
      nextImg();
    }
  });


  //end gallery mechanism


  var thumbPos, origin, originPerc, degToRotate, minVal, maxVal, curVal, lastVal, sliderWidth;

  var scale = d3.scale.linear()
                      .domain([0, 25, 50, 75, 100])
                      .range([-4, -12, 0, 2, 4]); //play around with the value of these numbers

  function setRotation(w){
    sliderWidth = w;
    //sliderWidth = $('#slider').width();
    $('#slider').prop('max', numImg);
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
    //call prev next img functions
  });



  //on resize
  $(window).smartresize(function(){
    setRotation($('#slider').width());
  });

});
