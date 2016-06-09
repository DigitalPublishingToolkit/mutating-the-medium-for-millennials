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

	//code
	$('.search-bar').on("click", function(){
		$('#search-form').toggle();
	});

	var links=[

	"articleprison.html",
	"articlegreenery.html",
	"articleghanaian.html",
	"articledisorders.html",
	"articleconflict.html",
	"articlecook.html"


	];

	for (var i=0; i<links.length; i++){
		//append link to article page
		$('.small-article-heading').eq(i).parent('.col-sm-3').wrap('<a href="'+links[i]+'"></a>');
	}

	//cancels the :hover menu on mobile
	$('#myNavBar ul li.tilt').off('mouseenter mouseleave'); //just JS not CSS

	//on load
	if($(window).width() > 767){
		//console.log();
		$('body').addClass('lscr');
	}else{
		//console.log();
		$('body').removeClass('lscr');
	}

  //smooth scroll to top
  //check this if you'd like all anchor links to scroll smoothly
  //https://css-tricks.com/snippets/jquery/smooth-scrolling/
  $('.send-top').on('click', function(){
    $('html, body').animate({
          scrollTop: 0
        }, 1000);
        //1000 (milliseconds) is the duration of the animation
  });

	//on resize
  $(window).smartresize(function(){
    //check screen size, remove class if needed
		if($(window).width() > 767){
			//console.log();
			$('body').addClass('lscr');
		}else{
			//console.log();
			$('body').removeClass('lscr');
		}
  });



});
