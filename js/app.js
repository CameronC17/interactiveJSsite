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
        
    	});
	  });
  }

}


window.onload = function() {
  var content = new PageHandler();
}
