function DataRow(title, content, url, img_url, w, h){
  this.title = title;
  this.content = content;
  this.url = url;
  this.img = {'img_url' : img_url, 'width' : w, 'height' : h};
}

var searchResults = [];
//https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts|info&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=apple
function create_api_url(search_term, search_limit) {
  var base_url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&";
  base_url += "generator=search&gsrnamespace=0&prop=pageimages|extracts|info&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";
  base_url += "&gsrsearch=" + search_term;
  base_url += "&gsrlimit=" + search_limit;
  return base_url;
}

function getWikiContentSucess(data, status, requestObject){
  if (data.hasOwnProperty('error')){
    console.error(data['error']);
  } else {
    for (pageId in data['query']['pages']){
      var page = data['query']['pages'][pageId];
      var img = "";
      var h;
      var w;
      if (page.hasOwnProperty('thumbnail')){
        img = page['thumbnail']['source'];
        h = page['thumbnail']['height'];
        w = page['thumbnail']['width'];
      }
      searchResults.push(new DataRow(page['title'],page['extract'],page['fullurl'],img, w, h));
    }
    console.log(searchResults);
    displayResult();
  }
}
function getWikiContentError(requestObject, status, error) {
  console.log(status, error);
}

function getWikiContent(search_term, search_limit) {
  $.ajax({
    url: create_api_url(search_term, search_limit),
    crossDomain : true,
    success : getWikiContentSucess,
    error : getWikiContentError
  });
}

function displayResult() {
  console.log('displaying results');
  $('.search_results').empty();
  searchResults.forEach(function(data){
    var link_element = $('<a href="#" target="_blank" class="list-group-item"></a>');
    link_element.attr('href', data.url);

    var header = $('<h4 class="list-group-item-heading"></h4>');
    var summary = $('<p class="list-group-item-text"></p>');
    header.text(data.title);
    summary.text(data.content);
    link_element.append(header);
    link_element.append(summary);
    $('.search_results').append(link_element);

  });
}

function getResults() {
  var search_term = $('.search').val();
  searchResults.length = 0;
  getWikiContent(search_term, 10);
}

$('.search').keypress(function (e) {
  var key = e.which;
  if (key === 13) {
    getResults();
  }
})
