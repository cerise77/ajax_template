function get(url) {
return new Promise(function(succeed, fail) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.addEventListener("load", function() {
    if (request.status < 400)
      succeed(request.response);
    else
      fail(new Error("Request failed: " + request.statusText));
  });
  request.addEventListener("error", function() {
    fail(new Error("Network error"));
  });
  request.send();
});
}

get("liza.json").then(function(response) {

  var person = JSON.parse(response);

  for (var i=0; i< person.length; ++i) {
  var $template = $($('#personTemplate').html());

        $template.find('img').attr("src", person[i]["picture"]);
        $template.find('h3').text(person[i]["name"]);
        $template.find('p').text(person[i]["description"].substring(0,80));
        $template.find('.numeral').text(person[i]["quantity"]);
        $template.find('.new').text(person[i]["category"]);

      $("<li></li>").append($template).appendTo("#gallery-items");

  }

  /*console.log(person);*/
  return person;
}).catch(function(error){
  /*console.log("Error!!!");
  console.log(error);*/
});
