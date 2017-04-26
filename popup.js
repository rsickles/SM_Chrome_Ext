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
// var css =
// ' body { cursor: url('+chrome.extension.getURL("cursor.ani")+'), default; }'
// if ($("head").length === 0) {
//   $("body").before(css);
// } else {
//   $("head").append(css);
// }
//adding news box when any a is hovered over
$( "a" ).hover(function() {
		//id = id + 1;
		//get the text out of this so we can say that it has to be a cnn link then we can grab url as shown below and use that to find related URLS
		var element = $(this);
		var article_link = element[0].href;
		for (var index = 0; index < valid_links.length; index++) {
		if(article_link.indexOf(valid_links[index]) != -1){
			var url = $(this);
			var article_title = $(url[0]).prev(0).text();

			//http://cnn.it/2oZRWAW
		//Make AJAX REQUEST
		// only in white subheading can mouse be in
		if(article_title!="" && article_title!=null && article_title.indexOf(' ') >= 0){
		$.ajax({
            type: "POST", //or GET
            url: 'https://news-api.lateral.io/documents/similar-to-text',
            data: '{"text":"The US just lost a trade battle with Mexico money.cnn.com"}',
            contentType: 'application/json',
            headers: {
            	'subscription-key': '218622d4fbf2eb1c9c3321f2e87e5225'
            },
            crossDomain:true,
            cache:false,
            async:false,
            success: function(msg){
                //call createNewsBox function
              article_1 = msg[0];
              article_2 = msg[1];
              article_3 = msg[3];
              console.log(msg);
					// 		createNewsBox({
					// 		"id" : id,
					// 		"news_1_img" : article_1.image,
					// 		"news_2_img" : article_2.image,
					// 		"news_3_img" : article_3.image,
					// 		"news_1_heading" : article_1.title,
					// 		"news_2_heading" : article_1.title,
					// 		"news_3_heading" : article_1.title
					// 		},function(container) {
					// 			$("body").append(container);
					// 			$('#modal_'+id).show();
					// 		});
           },
           error:function(jxhr){
               alert(jxhr.responseText);
                //do some thing
           }
     });
		}
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
	console.log("RYAN");
	// add headings to each box
	var news_1_heading = $('<div class="news-1-heading">');
	var news_2_heading = $('<div class="news-2-heading">');
	var news_3_heading = $('<div class="news-3-heading">');
	news_1_heading.appendTo(news_1_container);
	news_2_heading.appendTo(news_2_container);
	news_3_heading.appendTo(news_3_container);
	news_1_heading.text("Heading 1")
	news_2_heading.text("Heading 2")
	news_3_heading.text("Heading 3")
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