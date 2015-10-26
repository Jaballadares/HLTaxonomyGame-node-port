// To create dom element with this function
// example div with class of mine you would
// elt("div", {class: "mine"});

var groups = {};

function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
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

$(document).ready(function(e) {
  // // Populate the board options
  // $.get('data/medical_concepts.csv').done(function(data) {
  //   console.log(data);
  //   var groupedData = groupData(data);
  //   console.log(groupedData);
  // });

  // Wires the start button to start the game
  $('.start').click(function() {
    $('.start-page').hide();
    $('.board').show();
  });

  $('.concept').click(function(e) {
    var $_e = $(e.currentTarget);
    var id = $_e.attr('id');

    populateBoard(groups[id]);
  });

});

function populateBoard(concepts) {
  for (var i = 0; i < concepts.length; i++) {

  }
}

$.get('data/medical_concepts.csv', function(data) {
  var objects = $.csv.toObjects(data);

  var groupingKey = 'Medical Concept';
  for (var index = 0; index < objects.length; index++) {
    var currentObject = objects[index];
    var groupName = currentObject[groupingKey];
    var group = groups[groupName];

    if (group == null) {
      group = [];
      groups[groupName] = group;
    }
    group.push(currentObject);

  }
  // console.log(groups);

  var i = 0;
  for (var concept in groups) {
    // console.log(concept);

    $('.terms-list').append('<div class="concept" id="' + concept + '">' + concept + '</div>');
    i++;

    // console.log('hi ' + groups[concept][0]['Concept']);

    // groups[concept]

    // var concept2 = document.getElementById('concept2');
    // concept2.innerText = concept;
  }
});


// function groupData(data) {
//   var groups = {};
//   var objects = $.csv.toObjects(data);
//   var groupingKey = 'Medical Concept';
//
//   for(var index = 0; index < objects.length; index++){
//     var currentObject = objects[index];
//     var groupName = currentObject[groupingKey];
//     var group = groups[groupName];
//
//     if(group === null) {
//       group = [];
//       groups[groupName] = group;
//     }
//     groups.push(currentObject);
//   }
//
//   return groups;
// }
