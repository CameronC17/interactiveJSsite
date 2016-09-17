class PageHandler {
  constructor() {
    this.currentPage = 1;
    this.getElements();
    this.addEventListeners();
  }

  getElements() {
    this.navLinks = Array.from(document.getElementsByClassName("navLink"));
    this.userSubmit = document.getElementById("userSubmit");
		this.subredditSubmit = document.getElementById("subredditSubmit");

    this.userOutput = document.getElementById("userContent");
		this.subredditOutput = document.getElementById("subredditContent");
  }

  addEventListeners() {
    //nav links listener
    this.navLinks.forEach(function(link) {
      link.addEventListener("click", function() {
        this.changePage(link.value);
    	}.bind(this));
	  }.bind(this));
  }

  changePage(targetPage) {
    if (targetPage != this.currentPage) {
      //do the animations here
      
    }
  }

}


window.onload = function() {
  var content = new PageHandler();
}
