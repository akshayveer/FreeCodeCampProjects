function DataRow(title, content, url, img_url, w, h){
  this.title = title;
  this.content = content;
  this.url = url;
  this.img = {'img_url' : img_url, 'width' : w, 'height' : h};
}

var searchResults = [];
//https://en.wikipedia.org/w/api.php?format=jsonfm&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts|info&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=apple
function create_api_url(title, search_limit) {
  var base_url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&";
  base_url += "generator=search&gsrnamespace=0&prop=pageimages|extracts|info&inprop=url&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";
  base_url += "&gsrsearch=" + title;
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
  }
}
function getWikiContentError(requestObject, status, error) {
  console.log(status, error);
}

function getWikiContent(title, search_limit) {
  $.ajax({
    url: create_api_url(title, search_limit),
    crossDomain : true,
    success : getWikiContentSucess,
    error : getWikiContentError
  });
}
