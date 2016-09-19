class PageHandler {
  constructor() {
    this.currentPage = 1;
    this.apiKey = "YOUR_KEY_HERE";
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
      this.sendGETRequest("https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + this.userInput.value + "?api_key=" + this.apiKey, this.sendGETRequest);
    }.bind(this);
  }

  changePage(targetPage) {
    if (targetPage != this.currentPage) {
      var fadeInElement = null;

      switch (targetPage) {
        case 1:
          fadeInElement = this.homepage;
          break;
        case 2:
          fadeInElement = this.userpage;
          break;
        case 3:
          fadeInElement = this.subpage;
          break;
        default:
          console.log("unknown page to show");
          break;
      }

      //do the animations here
      //hide the current page we're on, then show the next one
      switch (this.currentPage) {
        case 1:
          this.fadeOut(this.homepage, fadeInElement);
          break;
        case 2:
          this.fadeOut(this.userpage, fadeInElement);
          break;
        case 3:
          this.fadeOut(this.subpage, fadeInElement);
          break;
        default:
          console.log("unknown page to hide");
          break;
      }

      this.currentPage = targetPage;
    }
  }

  fadeOut(element, fadeInElement) {
    var object = this;
    var op = 1;
    function fadeIt() {
      element.style.opacity = op;
      op -= 0.05;
    	if (op > 0) {
    		setTimeout(function () {
    			fadeIt();
        }, 50);
    	}
      else {
        element.style.display = 'none';
        object.fadeIn(fadeInElement);
      }
    };
    fadeIt();
  }

  fadeIn(element) {
    element.style.display = 'inline-block';
    var op = 0;
    function fadeIt() {
      element.style.opacity = op;
      op += 0.05;
    	if (op < 1) {
    		setTimeout(function () {
    			fadeIt();
        }, 50);
    	}
    };
    fadeIt();
  }

  displayUserData(userData) {
    var name = this.userInput.value;

    //console.log(this.userData[0].captaincam);
    var userString = "";
    //                                              \/
    userString += "Name: " + this.userData[0].captaincam.name + "\n";
    userString += "ID: " + this.userData[0].captaincam.id + "\n";
    userString += "Level: " + this.userData[0].captaincam.summonerLevel + "\n";
    var date = new Date(this.userData[0].captaincam.revisionDate);
    var newDate = " " + date.getDay() + "/" + date.getMonth() + "/" + date.getYear();
    userString += "Created on: " + newDate;

    this.userOutput.innerText = userString;
    //console.log(this.userData[0]);
    //console.log(this.userData[1]);
    var statsString = "";
    statsString += "Your Match Stats\n";
    statsString += "You have played: " + this.userData[1].matches.length + " games since Season 3."

    this.statsOutput.innerText = statsString;
  }

  sendGETRequest(connString, callback, object) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
           if (xmlhttp.status == 200) {
             if (callback != null) {
               this.userData[0] = JSON.parse(xmlhttp.responseText);
               var summonerID = "35786647";
               //                                                                         \/  change this id!
               callback("https://euw.api.pvp.net/api/lol/euw/v2.2/matchlist/by-summoner/" + summonerID + "?api_key=" + this.apiKey, null, this);
            } else {
               object.userData[1] = JSON.parse(xmlhttp.responseText);
               object.displayUserData();
             }
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
