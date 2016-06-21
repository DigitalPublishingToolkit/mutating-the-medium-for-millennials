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
 var isFullScreen = false;
 var numImg;

  //gallery mechanism
  if($('#article-image-gallery').length){
    //not full screen
    numImg = $('#article-image-gallery').children().length; //total images
  }else{
    //fullscreen
    numImg = $('#article-image-gallery-full').children().length; //total images
    isFullScreen = true;
  }

  var imgCounter = 0; //initial image
  var imgCounterCaption = (imgCounter+1) + ' of ' + numImg;
  var imgCaption = $('.currentImg img').attr('alt');

  function setCaption(c){
    //count and caption
    imgCounterCaption = (c+1) + ' of ' + numImg;
    imgCaption = $('.currentImg img').attr('alt');
    $('.counter').text(imgCounterCaption); //count and caption
    $('.caption').text(imgCaption);
  }//end setCaption()

  function nextImg(){
    if(imgCounter < numImg -1){
      imgCounter++;
    }//else{
    //   imgCounter = 0;
    // }

    $('#slider').val(imgCounter + 1);
    setRotation($('#slider').width());

    //set .currentImg
    $('.currentImg').removeClass('currentImg');
    if(isFullScreen){
        $('#article-image-gallery-full li').eq(imgCounter).addClass('currentImg');
    }else{
        $('#article-image-gallery li').eq(imgCounter).addClass('currentImg');
    }


    //count and caption
    setCaption(imgCounter);
  } // end nextImg()

  function prevImg(){
    if(imgCounter > 0){
      imgCounter--;
    }//else{
    //   imgCounter = numImg -1;
    // }

    $('#slider').val(imgCounter + 1);
    setRotation($('#slider').width());

    //set .currentImg
    $('.currentImg').removeClass('currentImg');
    if(isFullScreen){
        $('#article-image-gallery-full li').eq(imgCounter).addClass('currentImg');
    }else{
        $('#article-image-gallery li').eq(imgCounter).addClass('currentImg');
    }

    //count and caption
    setCaption(imgCounter);
  } // end prevImg()

  function loadImage(n){
    console.log('loading image ' + n);
    n = Math.round(n);
    //set .currentImg
    $('.currentImg').removeClass('currentImg');
    if(isFullScreen){
        $('#article-image-gallery-full li').eq(imgCounter).addClass('currentImg');
    }else{
        $('#article-image-gallery li').eq(imgCounter).addClass('currentImg');
    }

    //count and caption
    setCaption(n);
     imgCounter = n; //set in broadcastVal()
  }// end loadImage()

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
      setRotation($('#slider').width());
      prevImg();

    }
    else if(e.keyCode == 39) { // right
      setRotation($('#slider').width());
      nextImg();

    }
  });


  //end gallery mechanism


  var thumbPos, origin, originPerc, degToRotate, minVal, maxVal, curVal, lastVal, sliderWidth;

  lastVal = $('#slider').val(); //initial value

  var scale = d3.scale.linear()
                      .domain([0, 25, 50, 75, 100])
                      .range([-4, -12, 0, 2, 4]); //play around with the value of these numbers

  function setRotation(w){
    sliderWidth = w;
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
    lastVal = curVal;
    }


  function broadcastVal(v){
    // console.log(curVal);
    // if(v < maxVal && v > minVal){
    //     console.log('input value '+ v);
    //     if(v < curVal){
          ////prevImg();
        // }
        // if(v > curVal){
          ////nextImg();
    //     }
    // }else if(v == maxVal){
    //     console.log('MAX LIMIT '+ v);
    // }else if(v == minVal){
    //     console.log('MIN LIMIT '+ v);
    // }else{
    //     console.log('OUTSIDE ' + v);
    // }
    //rotate
    setRotation($('#slider').width());
    loadImage(v-1);
  }

  //on input change
  $("#slider").on("input change", function(){
    broadcastVal($(this).val());
    //setRotation($(this).width());
    //loadImage($(this).val()-1);
  });

  //count and caption, initial
  setCaption(imgCounter);
  //initial rotation angle
  setRotation($('#slider').width());

  //on resize
  $(window).smartresize(function(){
    //adjust the rotation angle accordingly
    setRotation($('#slider').width());
  });

});
