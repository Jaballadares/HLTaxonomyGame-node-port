var concept = document.getElementById('concept');
var test = document.getElementById('test');

// To create dom element with this function
  // example div with class of mine you would
// elt("div", {class: "mine"});

function elt(name, attributes) {
  var node = document.createElement(name);
  if(attributes) {
    for (var attr in attributes)
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string")
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}


function load() {
  $.ajax({
    dataType: "json",
    url: "./hltaxonomy.json",
    success: function(data){
      for(var i=0;i < data.length; i++){
        var medicalConcept = data[i].medicalConcept;
        var concept = data[i].Concept;
        var term = data[i].Term;
        var conceptType = data[i].conceptType;

console.log(data[i].conceptType);
/*console.log(concept);
console.log(medicalConcept);*/

}
    },
    error: function(e){
      console.log(e);
    }
  });
}
load();


// Adding click event listener for concept being chosen in the sidebar list
concept.addEventListener("click", function() {
  this.setAttribute("class", "concept_plucked");

  // takes the concepts innerText
  var innerText = this.innerText;

  // adds innerText from concept into placeholder
  test.onclick = function() {
    this.innerText = innerText;
    this.style.background = "purple";
    this.style.color = "white";
  };
});
