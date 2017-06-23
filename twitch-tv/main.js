var twitch_urls = {
  'stream_info' :  "https://wind-bow.gomix.me/twitch-api/streams/",
  'channel_info' :  "https://wind-bow.gomix.me/twitch-api/channels/"
};

function Channel(display_name, status, online, error, message, url, logo){
  this.display_name = display_name,
  this.status = status,
  this.online = online,
  this.error = error,
  this.message = message,
  this.url = url,
  this.logo = logo
};


function getChannelInfoSuccess(data, status, obj) {
  if (data.hasOwnProperty('error')){
    console.log({'error' : data['error'], 'message' : data['message']});
  } else {
    console.log(new Channel(data['display_name'],data['status'],false,null, null, data['url'], data['logo']));
  }
}

function getChannelInfoError(obj, error, status){
  console.error(obj.responseText);
  alert('error receiving data from server');
}

/**
* get channel info object
*/
function getChannleInfo(channel_name){
  var encodedUri = encodeURI(channel_name);
  var final_url = twitch_urls.channel_info + encodedUri + '?callback=?';
  console.log(final_url);
  $.ajax({
    url: final_url,
    dataType : "jsonp",
    cache: false,
    crossorigin: true,
    success: getChannelInfoSuccess,
    error: getChannelInfoError
  });
}

function getStreamInfoError(req, error, status) {
  console.error(obj.responseText);
}

function getStreamInfoSuccess(data, status, obj) {
  console.log(data);
  if (data['stream'] == null){
    console.log({'online' : false});
  } else {
    console.log({'online' : true});
  }
}

function getStreamInfo(channel_name) {
  var encodedUri = encodeURI(channel_name);
  var final_url = twitch_urls.stream_info + encodedUri + '?callback=?';
  console.log(final_url);
  $.ajax({
    url: final_url,
    dataType : "jsonp",
    cache: false,
    crossorigin: true,
    success: getStreamInfoSuccess,
    error: getStreamInfoError
  });
}
