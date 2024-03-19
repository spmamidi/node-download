Open the page to get the links - Use this script to get links (console)

let urls = [];
$('.homeLink').each(function(index, element){

let url = 'https://www.superteacherworksheets.com' +$(this).attr('href');
urls.push(url);

});
console.log(JSON.stringify(urls));

copy the urls and paste into links.js.
run - node .\download.js

