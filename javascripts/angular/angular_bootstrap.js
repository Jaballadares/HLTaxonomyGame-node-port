"use strict";

var healthLineApp = angular.module("healthLineApp", ["ngResource", "ngRoute", "templates"]);

healthLineApp.config(["$routeProvider", "$locationProvider",
function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", { templateUrl: "/templates/home.html" })
    .when("/game_setting", { templateUrl: "/templates/game_setting.html" })
    .when("/ranking", { templateUrl: "/templates/ranking.html" })
    .when("/ranking_details", { templateUrl: "/templates/ranking_details.html" })
    .when("/enter_player", { templateUrl: "/templates/enter_player.html" })
    .when("/rules", { templateUrl: "/templates/rules.html" })
    .when("/board", { templateUrl: "/templates/board.html" })
    .otherwise({ redirectTo: "/" });
  $locationProvider.html5Mode(true);
}])

.run(["$rootScope", "$location", "$http", "GameFactory",
function($rootScope, $location, $http, GameFactory) {
  $rootScope.game = new GameFactory();
  $rootScope.game.loadMedicalConcepts();

  var ignore_pages = ["/home", "/game_setting", "/ranking", "/ranking_details"];

  if(ignore_pages.indexOf($location.path()) === -1)
    $location.path("/home");
}]);
