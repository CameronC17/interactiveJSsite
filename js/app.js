class PageHandler {
  constructor() {
    this.currentPage = 1;
    this.apiKey = "your key";
    this.userData = [];

    this.getElements();
    this.addEventListeners();
  }

  getElements() {
    this.navLinks = Array.from(document.getElementsByClassName("navLink"));
    this.userSubmit = document.getElementById("userSubmit");

    this.userInput = document.getElementById("username");

    this.userOutput = document.getElementById("userContent");
		this.statsOutput = document.getElementById("statsContent");

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
      this.sendUserRequest("https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + this.userInput.value + "?api_key=" + this.apiKey);
    }.bind(this);
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

  displayUserData(userData) {
    console.log(this.userData[0][0]);
  }

  sendUserRequest(connString) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
               this.userData[0] = JSON.parse(xmlhttp.responseText);
               //do the match list string on this line
               this.displayUserData();
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    }.bind(this);
    xmlhttp.open("GET", connString, true);
    xmlhttp.send();
  }

  sendMatchRequest(connString) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {


           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    }.bind(this);
    xmlhttp.open("GET", connString, true);
    xmlhttp.send();
  }

}


//and the beginning of the page......

window.onload = function() {
  var content = new PageHandler();
}
