class PageHandler {
  constructor() {
    this.currentPage = 1;
    this.apiKey = "3b349a97-a0af-45e4-8c7c-bfdb951fb97b";

    this.opts = {
      method: 'GET',
      body: 'json',
      headers: {}
    };


    this.getElements();
    this.addEventListeners();
  }

  getElements() {
    this.navLinks = Array.from(document.getElementsByClassName("navLink"));
    this.userSubmit = document.getElementById("userSubmit");
		this.subredditSubmit = document.getElementById("subredditSubmit");

    this.userOutput = document.getElementById("userContent");
		this.subredditOutput = document.getElementById("subredditContent");

    this.homepage = document.getElementById("page1");
    this.userpage = document.getElementById("page2");
    this.subpage= document.getElementById("page3");
  }

  addEventListeners() {
    //nav links listener
    this.navLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        this.changePage(link.value);
    	}.bind(this));
	  }.bind(this));

    //user text input listener
    this.userSubmit.onclick = function(event) {
      event.preventDefault();
      //console.log("toot toot");
      this.sendGetRequest();

    }.bind(this);

    //subreddit text input
    this.subredditSubmit.onclick = function(event) {
      event.preventDefault();
      console.log("pop pop");
    }
  }

  changePage(targetPage) {
    if (targetPage != this.currentPage) {
      //do the animations here
      //hide the current page we're on
      switch (this.currentPage) {
        case 1:
          this.homepage.style.display = 'none';
          break;
        case 2:
          this.userpage.style.display = 'none';
          break;
        case 3:
          this.subpage.style.display = 'none';
          break;
        default:
          console.log("unknown page to hide");
          break;
      }

      //change the page to target page
      this.currentPage = targetPage;

      //now we show the target page
      switch (this.currentPage) {
        case 1:
          this.homepage.style.display = 'inline-block';
          break;
        case 2:
          this.userpage.style.display = 'inline-block';
          break;
        case 3:
          this.subpage.style.display = 'inline-block';
          break;
        default:
          console.log("unknown page to show");
          break;
      }
    }
  }

  sendGetRequest() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               console.log(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/CaptainCam?api_key=3b349a97-a0af-45e4-8c7c-bfdb951fb97b", true);
    xmlhttp.send();
    //return something
  }

}


window.onload = function() {
  var content = new PageHandler();
}
