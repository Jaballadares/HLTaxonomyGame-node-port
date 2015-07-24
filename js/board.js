var concept = document.getElementById('concept');
var test = document.getElementById('test');


concept.addEventListener("click", function() {
  this.style.border = "1px solid white";
  this.style.color = "purple";
  this.style.background = "rgba(255,255,255,0.4)";

// takes the concepts innerText
  var innerText = this.innerText;

// adds innerText from concept into placeholder
  test.onclick = function() {
    this.innerText = innerText;
  }
});