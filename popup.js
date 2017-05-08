console.log('Activated')
console.log('Event::Changed')
// Add css modal to page
var style = document.createElement('link')
var SUBSCRIPTION_KEY = '218622d4fbf2eb1c9c3321f2e87e5225'
var WEIGHT = {
  far_liberal: -2,
  liberal: -1,
  neutral: 0,
  conservative: 1,
  far_conservative: 2,
}

// 1 is more conservative, -1 is more liberal
// http://www.truthrevolt.org/sites/default/files/images/kP4Yax1.jpg
// [("wall_street",0),("npr",0),("bbc",0),("new_york_times",-1),("cnn",-1),("usa_today",0),("economist",1),("fxn",2),("info_wars",3),
// ("breibart",3),("the_guardian",-1),("slate",-2),("vox",-2),("atlantic",-2),("msnbc",-2),("huffington_post",-2),("occupy_democrats",3)]
//
var MEDIA_VALUES = {
  'the-guardian': WEIGHT.liberal,
  'the-new-yorker': WEIGHT.far_liberal,
  'vice': WEIGHT.liberal,
  'the-guardian': WEIGHT.neutral,
  'time': WEIGHT.neutral,
  'bbc': WEIGHT.neutral,
  'new-york-times': WEIGHT.neutral,
  'forbes': WEIGHT.far_conservative,
  'sports-illustrated': WEIGHT.neutral,
  'cbs-sports': WEIGHT.neutral,
  'facebook': WEIGHT.liberal
}

style.rel = 'stylesheet'
style.type = 'text/css'
style.href = chrome.extension.getURL('w3.css')

;(document.head || document.documentElement).appendChild(style)

var id = 0
var valid_links = ['cnn', 'fxn', 'trib', 'occupydemocrats']
// adding news box when any a is hovered over

$('a').on({
  mouseenter: function (event) {
    event.preventDefault()
    // id = id + 1
    // get the text out of this so we can say that it has to be a cnn link then we can grab url as shown below and use that to find related URLS

    var self = $(this)
    var article_link = self[0].href

    valid_links.forEach(function (element, index) {
      if (article_link.indexOf(valid_links[index]) != -1) {
        var url = self
        var article_title = $(url[0]).prev(0).text().trim()
        var article_text = article_title.substring(0, article_title.length - 12)
        var payload = {
          text: article_text
        }
        // http://cnn.it/2oZRWAW
        // Make AJAX REQUEST
        // only in white subheading can mouse be in
        console.log('article_title', article_title)

        if ((article_title != '') && (article_title != null) && (article_title.indexOf(' ') >= 0)) {
          console.log('Event::hover')
          $.ajax({
            type: 'POST', // or GET
            url: 'https://news-api.lateral.io/documents/similar-to-text',
            data: payload,
            dataType: 'json',
            headers: {
              'subscription-key': SUBSCRIPTION_KEY
            },
            crossDomain: true,
            cache: false,
            async: false,
            success: onSuccess,
            error: onError
          })
        }
      }
    })
  }
})

function onError (response) {
  console.error(response.responseText)
}

function onSuccess (response) {
  // call createNewsBox function
  article_1 = response[0]
  article_2 = response[1]
  article_3 = response[3]

  console.log('response', response)
  // if(!created_box_already){
  createNewsBox({
    'id': id,
    'news_1_img': article_1.image,
    'news_2_img': article_2.image,
    'news_3_img': article_3.image,
    'source_slug_1': article_1.source_slug,
    'source_slug_2': article_2.source_slug,
    'source_slug_3': article_3.source_slug,
    'news_1_heading': article_1['title'],
    'news_2_heading': article_2['title'],
    'news_3_heading': article_3['title'],
    'news_1_url': article_1['url'],
    'news_2_url': article_2['url'],
    'news_3_url': article_3['url']
  }, function (err, container) {
    if (err) {
      console.error('Error', 'Error loading news box')
    // handle...
    }
    $('body').append(container)
    $('#modal_' + id).show()
  })
}

function set_meter (source) {
  chrome.storage.sync.get('score', function (data) {
    var score = MEDIA_VALUES[source]
    var new_val = data['score'] + score
    console.log('METER SCORE')
    console.log(new_val)
    chrome.storage.sync.set({'score': new_val}, function () {
      // Notify that we saved.
      console.log('Settings saved')
    })
  })
}

function createNewsBox (data, callback) {
  // container for three images and main container
  var container = $('<div id="modal_' + data.id + '"class="news-container modal">')
  var container_modal_content = $('<div class="modal-content">')
  container_modal_content.appendTo(container)

  var close = $('<span class="close">')
  close.text('CLOSE')
  close.appendTo(container_modal_content)
  // add meter self
  var meter = $('<meter class="meter">')
  var div = $('<div>')
  meter.attr('min', -50)
  meter.attr('max', 50)
  chrome.storage.sync.get('score', function (data) {
    meter.attr('value', data['score'])
    meter.appendTo(div)
  })
  div.appendTo(container_modal_content)
  var news_1_container = $('<div class="news-1-container">')
  var news_2_container = $('<div class="news-2-container">')
  var news_3_container = $('<div class="news-3-container">')
  news_1_container.appendTo(container_modal_content)
  news_2_container.appendTo(container_modal_content)
  news_3_container.appendTo(container_modal_content)
  // append three titles to each news box container
  // add headings to each box
  var news_1_heading = $('<div class="news-1-heading">')
  var news_2_heading = $('<div class="news-2-heading">')
  var news_3_heading = $('<div class="news-3-heading">')
  news_1_heading.appendTo(news_1_container)
  news_2_heading.appendTo(news_2_container)
  news_3_heading.appendTo(news_3_container)
  $('.news-1-heading').empty()
  $('.news-2-heading').empty()
  $('.news-3-heading').empty()
  $('.news-1-heading').text(data.news_1_heading)
  $('.news-2-heading').text(data.news_2_heading)
  $('.news-3-heading').text(data.news_3_heading)

  d = new Date()
  // create three img and append to boxes
  var img_news_1 = $('<img id="img_news_1">')
  $('#img_news_1').attr('src', data.news_1_img + '?r=' + Math.random())
  img_news_1.attr('height', '20px')
  img_news_1.attr('width', '20px')
  img_news_1.appendTo(news_1_container)
  if ($('#img_news_1').parent().is('a')) {
    $('#img_news_1').unwrap()
  }
  $('#img_news_1').wrap("<a href='" + data.news_1_url + "' target='_blank'</a>")
  img_news_1.click(function () {set_meter(data.source_slug_1);})

  var img_news_2 = $('<img id="img_news_2">')
  $('#img_news_2').attr('src', data.news_2_img + '?r=' + Math.random())
  img_news_2.attr('src', data.news_2_img)
  img_news_2.attr('height', '20px')
  img_news_2.attr('width', '20px')
  img_news_2.appendTo(news_2_container)
  if ($('#img_news_2').parent().is('a')) {
    $('#img_news_2').unwrap()
  }
  $('#img_news_2').wrap("<a href='" + data.news_2_url + "' target='_blank'</a>")
  img_news_2.click(function () {set_meter(data.source_slug_2)
  })

  var img_news_3 = $('<img id="img_news_3">')
  $('#img_news_3').attr('src', data.news_3_img + '?r=' + Math.random())
  img_news_3.attr('src', data.news_3_img)
  img_news_3.attr('height', '20px')
  img_news_3.attr('width', '20px')
  img_news_3.appendTo(news_3_container)
  if ($('#img_news_3').parent().is('a')) {
    console.log('UNWRAPPING!!!!')
    $('#img_news_3').unwrap()
  }
  $('#img_news_3').wrap("<a href='" + data.news_3_url + "'target='_blank' </a>")

  img_news_3.click(function () {
    set_meter(data.source_slug_3)
  })

  $(close).on('click', function (event) {
    event.preventDefault()
    $('#modal_0').hide()
  })

  callback(null, container)
}
