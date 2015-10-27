// To create dom element with this function
// example div with class of mine you would
// elt("div", {class: "mine"});

var groups = {};

$(document).ready(function(e) {

  // Wires the start button to start the game
  $('.start').click(function() {
    $('.start-page').hide();
    $('.board').show();
  });

  // // Populate the board options
  $.get('data/medical_concepts.csv', function(data) {
    var objects = $.csv.toObjects(data);
    var groupingKey = 'Medical Concept';

    objects.forEach(function(element, index, array){
        var groupName = element['Medical Concept'];

        if (groups[groupName] == null) {
            groups[groupName] = [];
        }

        groups[groupName].push(element);
    });

    for (var concept in groups) {
      $('.terms-list').append(
          '<div class="concept" id="' + concept + '">'
          + concept + '</div>');
    }
  });

  $('.terms-list').on('click', '.concept', function(e) {
    var group = $(this).attr('id');
    $.each(groups[group], function(index, element) {
      console.log(element.Concept);
      // $('.answersContainer').append('<div class="placeholder2" id="' + element.Concept + '">' + element.Concept + '</div>');

      //Compile the template​
      var theTemplateScript = $("#element-concept").html();
      var theTemplate = Handlebars.compile(theTemplateScript);
      $(".answersContainer").append(theTemplate(element));
    });
  });
});

function populateBoard(concepts) {
  for (var i = 0; i < concepts.length; i++) {

  }
}




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
// function startTimer(duration, display) {
//   var timer = duration,
//     minutes, seconds;
//
//   setInterval(function() {
//     minutes = parseInt(timer / 60, 10);
//     seconds = parseInt(timer % 60, 10);
//
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;
//
//     display.textContent = minutes + ":" + seconds;
//
//     if (--timer < 0) {
//       timer = duration;
//     }
//   }, 1000);
//
// }
//
// var startButton = document.getElementById('start');
//
// startButton.onclick = function() {
//   var twoMinutes = 60 * 2;
//   display = document.getElementById('timeLeft');
//   startTimer(twoMinutes, display);
// };


// Random Utilities
//
// function elt(name, attributes) {
//   var node = document.createElement(name);
//   if (attributes) {
//     for (var attr in attributes)
//       if (attributes.hasOwnProperty(attr))
//         node.setAttribute(attr, attributes[attr]);
//   }
//   for (var i = 2; i < arguments.length; i++) {
//     var child = arguments[i];
//     if (typeof child == "string")
//       child = document.createTextNode(child);
//     node.appendChild(child);
//   }
//   return node;
// }
