console.log("Activated");

//Add css modal to page
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('w3.css');
(document.head||document.documentElement).appendChild(style);
var id = 0;
var valid_links = ["cnn"];
//change cursor when activated
$("div").css('cursor','url(http://w17.snunit.k12.il/images/big_arrow.png),auto');
//adding news box when any a is hovered over
$( "a" ).hover(function() {
		//id = id + 1;
		//get the text out of this so we can say that it has to be a cnn link then we can grab url as shown below and use that to find related URLS
		var element = $(this);
		var article_link = element[0].href;
		for (var index = 0; index < valid_links.length; index++) {
		if (article_link.indexOf(valid_links[index]) != -1){
			var url = $(this);
			console.log(url);
		createNewsBox({
			"id" : id,
	  	"news_1_img" : "http://global.fncstatic.com/static/v/all/img/og/og-fn-foxnews.jpg",
	  	"news_2_img" : "http://global.fncstatic.com/static/v/all/img/og/og-fn-foxnews.jpg",
	  	"news_3_img" : "http://global.fncstatic.com/static/v/all/img/og/og-fn-foxnews.jpg",
	  	"news_1_heading" : "Hello World 1",
	  	"news_2_heading" : "Hello World 2",
	  	"news_3_heading" : "Hello World 3"
	    },function(container) {
			$("body").append(container);
			$('#modal_'+id).show();
		});
		}
	}
  });

function createNewsBox(data,callback) {
	//container for three images and main container
	var container = $('<div id="modal_'+data.id+'"class="news-container modal">');
	var container_modal_content = $('<div class="modal-content">');
	container_modal_content.appendTo(container);
	var close = $('<span class="close">');
	close.text("CLOSE");
	close.appendTo(container_modal_content);
	var news_1_container = $('<div class="news-1-container">');
	var news_2_container = $('<div class="news-2-container">');
	var news_3_container = $('<div class="news-3-container">');
	news_1_container.appendTo(container_modal_content);
	news_2_container.appendTo(container_modal_content);
	news_3_container.appendTo(container_modal_content);
	console.log("RYAN");
	//append three titles to each news box container
	$(".news-1-container").text(data.news_1_heading);
	$(".news-2-container").text(data.news_2_heading);
	$(".news-3-container").text(data.news_3_heading);
	console.log("RYAN");
	//create three img and append to boxes
	var img_news_1 = $('<img id="img_news_1">');
	img_news_1.attr('src', data.news_1_img);
	img_news_1.attr('height', "20px");
	img_news_1.attr('width', "20px");
	img_news_1.appendTo('.news-1-container');
	var img_news_2 = $('<img id="img_news_2">');
	img_news_2.attr('src', data.news_2_img);
	img_news_2.attr('height', "20px");
	img_news_2.attr('width', "20px");
	img_news_2.appendTo('.news-2-container');
	var img_news_3 = $('<img id="img_news_3">');
	img_news_3.attr('src', data.news_3_img);
	img_news_3.attr('height', "20px");
	img_news_3.attr('width', "20px");
	img_news_3.appendTo('.news-3-container');
	console.log("RYAN");
	$( ".close" ).on( "click", function() {
			console.log("HE");
      $("#modal_0").hide();
	});
  callback(container);
}

//});