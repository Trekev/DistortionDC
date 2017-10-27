
var name = "distortiondc",
  items;
$.getJSON("https://query.yahooapis.com/v1/public/yql", {
  q: "select * from json where url='https://www.instagram.com/" + name + "/media?__a=1'",
  format: "json"
}, function(data) {
  if (data.query.results) {
    items = data.query.results.json.items;
    // items.reverse();
    items = items.slice(0,4);
    $.each(items, function(n, item) {
      $('.Instabanner').prepend(
        $('<a/>', {
          href: item.link,
          target: '_blank',
          class: 'instapic'
        }).css({
          backgroundImage: 'url(' + item.images.standard_resolution.url + ')'
        }));
    });
  }

});

function parse_str(str) {
  return str.split('&').reduce(function(params, param) {
    var paramSplit = param.split('=').map(function(value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}
