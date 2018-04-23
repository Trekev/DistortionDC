const { XMLHttpRequest } = require("xmlhttprequest");

var http = new XMLHttpRequest();
var url = "https://accounts.spotify.com/api/token";

http.open("POST", url, true);

//Send the proper header information along with the request
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.setRequestHeader("Authorization", 'Basic ' + 'YmQyODBjZDkxOThiNDNlNTk3ZDdkZTMzZWU2MjQ3YmY6YmM5ZDRlMmRkZWEyNDJiM2I5YmYyYTQwM2JlYTczYTk=');

http.onreadystatechange = function() {//Call a function when the state changes.
    if(http.readyState == 4 && http.status == 200) {
        console.log(http.responseText);
    }
}
http.send();
