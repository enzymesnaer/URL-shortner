//https://www.jsonstore.io/66d5d839f9552bf747923ee7b2639fc4d2be25669c57b5bad6e506329bd67a15

//geturl()  will take the value from the input box, verify it, and return the value

//try using regex to validate urls
//For an URL like http://[www.example.com]:80/search?q=devmo#test
//hash return the part of the URL that follows the # symbol, including the # symbol.
//to omit #symbol we'll be using substr(1) as follows

/*
Here we use JQuery to send the JSON request to endpoint+”/” + our random string hash from the location bar.
As an example:https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1/abcd
So whenever we send a get request to the above-mentioned URL, we’ll get the long URL as data.
*/

//call the send_request() with an argument longurl.
//send_request() function we send a JSON request to jsonstore to store the long URL with a link to short URL.

//Now we will use the code to GET the long URL linked to the short URL entered in the address bar:

/*
First, we store the hash value from the URL in the hashh variable.

Example: if our short URL is https://shorted.com/#abcd , the value of the hash will be #abcd.
Then we check if the hash location is empty or not. If it’s not empty we send a get request to the address, endpoint + hashh.

Example :https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1/abcd
And as usual, if everything is okay we will get the long URL from the data which is JSON array data, and from that we extract the result with data["result"].

The value of data will be similar to this {"result":longurl,"ok":true} , where the long URL is the URL you shortened.
Our URL shortener is almost complete! Copy-paste a long URL in the input box then click the Shorten The URL button! Copy the link from the address bar — it’s your short URL!
*/


/*-----------------------------------------------------------------------------------------------------------------------------------
First, we initiated a function called getrandom. Then we initialized a variable called random_string and gave it a value.
Math is a built-in Javascript object which allows us to perform mathematical tasks on numbers.
First we called the random function from Math , Math.random() returns a random number between 0 (inclusive), and 1 (exclusive).
Then we transform the returned number to a string using toString() and we give it an argument of 32 so that we get a proper string not a binary, hexadecimal or octal.
Base32 is one of several base 32 transfer encodings. Base32 uses a 32-character set comprising the twenty-six upper-case letters A–Z, and the digits 2–7. Base32 is primarily used to encode binary data, but Base32 is also able to encode binary text like ASCII.
Then we use substring(2,5) as well to slice the string and maintain the size of the string. Then again we follow the same procedure to get another chunk of a random string, and finally we add both chunks of the string using +.
-----------------------------------------------------------------------------------------------------------------------------------
##method2
function getrandom() {
    var text = “”;
    var possible = “ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789”;
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;}
---------------------------------------------------------------------------------------------------------------------------------------
*/

var endpoint = "https://www.jsonstore.io/8ba4fd855086288421f770482e372ccb5a05d906269a34da5884f39eed0418a1";

function geturl(){
    var url = document.getElementById("urlinput").value;
    var protocol_ok = url.startsWith("http://") || url.startsWith("https://") || url.startsWith("ftp://");
    if(!protocol_ok){
        newurl = "http://"+url;
        return newurl;
        }else{
            return url;
        }
}

function getrandom() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function genhash(){
    if (window.location.hash == ""){
        window.location.hash = getrandom();
    }
}

function send_request(url) {
    this.url = url;
    $.ajax({
        'url': endpoint + "/" + window.location.hash.substr(1),
        'type': 'POST',
        'data': JSON.stringify(this.url),
        'dataType': 'json',
        'contentType': 'application/json; charset=utf-8'
})
}

function shorturl(){
    var longurl = geturl();
    genhash();
    send_request(longurl);
}

var hashh = window.location.hash.substr(1)

if (window.location.hash != "") {
    $.getJSON(endpoint + "/" + hashh, function (data) {
        data = data["result"];

        if (data != null) {
            window.location.href = data;
        }

    });
}
