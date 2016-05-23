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
	

});
