
var converter = new showdown.Converter({headerLevelStart: 2});

window.onhashchange = function(){
  loadMd();
};

ready(function(){
  loadMd();
});

function loadMd(){
  var page = window.location.hash.length > 2 ? window.location.hash.substr(1) : 'about';

  document.body.className = page;

  var request = new XMLHttpRequest();
  request.open('GET', '/pages/'+page+'.md', true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var md = this.response;
      var html = converter.makeHtml(md);
      document.querySelector('.md-content').innerHTML = html;
    }else if( this.status >= 400 && this.status < 500){
      document.querySelector('.md-content').innerHTML = '<h2>404</h2><p>That page doesn\'t exist.</p>';
    } else {
      // We reached our target server, but it returned an error
      document.querySelector('.md-content').innerHTML = 'There was an error.';
    }
  };

  request.onerror = function() {
    document.querySelector('.md-content').innerHTML = 'There was an error.';
  };

  request.send();
}

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}