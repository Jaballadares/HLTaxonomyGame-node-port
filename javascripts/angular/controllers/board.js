healthLineApp.controller("BoardCtrl", ["$rootScope", "$scope", "$interval",
function($rootScope, $scope, $interval) {
  $scope.init = function() {
    $rootScope.game.initGame();
    $scope.previewCountdown = $rootScope.game.eventPreviewCountdown();
    $scope.gameTimeLimit = $rootScope.game.eventGameTimeLimit();

    $scope.selectMedicalConceptInterval = null;
    $scope.startGameInterval = null;
  }

  $scope.selectMedicalConcept = function(medicaConceptId) {
    $rootScope.game.selectMedicalConcept(medicaConceptId);
    $scope.selectMedicalConceptInterval = $interval(function() {
      if(0 === $scope.previewCountdown)
        $scope.startGame();

      $scope.previewCountdown -= 1;
    }, 1000);
  };

  $scope.startGame = function() {
    $rootScope.game.startGame();
    $interval.cancel($scope.selectMedicalConceptInterval);
    $scope.startGameInterval = $interval(function() {
      if(0 === $scope.gameTimeLimit)
        $scope.finishGame();

      $scope.gameTimeLimit -= 1;
    }, 1000);
  };

  $scope.finishGame = function() {
    $rootScope.game.finishGame($scope.gameTimeLimit);
    $interval.cancel($scope.startGameInterval);
  };

  var _prependZero = function(number) {
    if(number < 10)
      return "0"+ number;

    return number;
  }

  $scope.timeFormat = function(time) {
    var min = parseInt(time / 60);
    var sec = parseInt(time % 60);

    return _prependZero(min) +":"+ _prependZero(sec);
  };

  $scope.selectTerm = function(termId) {
    if($rootScope.game.when(['playing']))
      $rootScope.game.setSelectedTerm(termId);
  };

  $scope.toggleTerm = function(conceptId) {
    if($rootScope.game.when(['playing']))
      $rootScope.game.toogleTerm(conceptId);
  };
}]);
