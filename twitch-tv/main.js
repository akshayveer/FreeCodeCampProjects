var twitch_urls = {
  'stream_info' :  "https://wind-bow.gomix.me/twitch-api/streams/",
  'channel_info' :  "https://wind-bow.gomix.me/twitch-api/channels/"
};

var favorite_channels = {
  channels : {},
  addChannel : function (channel_name) {
    console.log('adding channel name :', channel_name);
    getChannleInfo(channel_name);
  },
  addChannelInfo : function (channel_name, channel) {
    console.log('Channel info for ', channel_name);
    console.log(channel);
    if (channel_name == ''){
      console.error(channel.error, channel.message);
      //alert(channel.message);
      showError(channel.message);
      return;
    } else if (this.channels.hasOwnProperty(channel_name) == false){
      this.channels[channel_name] = channel;
      this.channels[channel_name].view = createView(channel);
      console.log('created view');
      console.log(this.channels[channel_name].view);
      addView(this.channels[channel_name]);
    }
    getStreamInfo(channel_name);
  },
  addStreamInfo : function (channel_name, stream_info) {
      console.log(stream_info);
      this.channels[channel_name].online = stream_info['online'];
      updateChannelView(this.channels[channel_name]);
  }
}

function addView(channel){
  $('.results').append(channel.view);
}

function updateChannelView(channel) {
  console.log('updating view based on onlie');
  var view = channel.view.children(1);
  console.log(view);
  console.log(view.children(1));
  console.log(view.children(2));
  if (channel.online){
    view.children('h6').text('Online');
    view.children('a').attr('href',channel.url);
    view.children('a').text(channel.status);
    view.children('a').prop('hidden', false);
  } else {
    view.children('h6').text('ofline');
    view.children('a').prop('hidden', true);
  }
  $('.channel_name').val('');
}

function showError(message) {
  var content = '<div class="row"> \
    <div class="col-lg-3"></div>\
    <div class="col-lg-6">\
      <div class="alert alert-warning alert-dismissible" role="alert">\
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
        <strong>Error!</strong> '+ message + '\
      </div>\
    </div>\
  </div>'
  $('.container').prepend(content);
}

function createView(channel) {
  var container = $('<div class="row" style="margin-top:20px"></div>');
  var col1 = $('<div class="col-lg-2 col-md-2 col-sm-4"></div>');
  var col2 = $('<div class="col-lg-4 col-md-4 col-sm-8"></div>');
  var img = $('<img class="img-responsive imageClip" src="' + channel.logo + '">');
  var header = $('<h4></h4>');
  var online_status = $('<h6></h6>');
  var link = $('<a target="_blank"></a>');

  col1.append(img);
  header.text(channel.display_name);

  col2.append(header);
  col2.append(online_status);
  col2.append(link);
  container.append('<div class="col-lg-3 col-md-3"></div>')
  container.append(col1);
  container.append(col2);

  return container;
}

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
    favorite_channels.addChannelInfo('', {'error' : data['error'], 'message' : data['message']});
  } else {
    var img_logo = "https://via.placeholder.com/300x300";
    if (data['logo'] != null){
      img_logo = data['logo'];
    }
    console.log('imge url is ', data['logo']);
    favorite_channels.addChannelInfo(data['name'], new Channel(data['display_name'],data['status'],null,false, null, data['url'], img_logo));
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

function getStreamInfoSuccess(data, channel_name) {
  console.log(data);
  if (data['stream'] == null){
    favorite_channels.addStreamInfo(channel_name, {'online' : false});
  } else {
    favorite_channels.addStreamInfo(channel_name, {'online' : true});
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
    success: function (data) {
      getStreamInfoSuccess(data, channel_name);
    },
    error: getStreamInfoError
  });
}

$('.channel_name').keypress(function (e) {
  if (e.which == 13){
    var channel_name = $('.channel_name').val();
    $('.channel_name').val('');
    favorite_channels.addChannel(channel_name);
  }
})

$(document).ready(function () {
  favorite_channels.addChannel('freecodecamp');
})
