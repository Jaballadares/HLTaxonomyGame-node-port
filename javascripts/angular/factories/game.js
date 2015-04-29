"use strict";

healthLineApp.factory("GameFactory", ["$http",
function ($http) {
  var Player = function() {
    this.firsName = "";
    this.lastName = "";
    this.email = "";
  };

  var Event = function() {
    this.name = "";
    this.event_date = "";
    this.preview_countdown = 30;
    this.game_time_limit = 2;
    this.id = null;

    this.update = function(attributes) {
      this.id = attributes.id;
      this.name = attributes.name;
      this.event_date = attributes.event_date;
      this.preview_countdown = attributes.preview_countdown;
      this.game_time_limit = attributes.game_time_limit;
    };
  };

  var Game = function() {
    this.player = new Player();
    this.event = new Event();
    this.gameStatus = "";
    this.medicalConcept = null;
    this.medicalConcepts = [];
    this.selectedTerm = null;
    this.termsAndConcepts = {};
    this.rank = 1;

    var _compare = function(a, b) {
      if (a.position < b.position)
        return -1;
      if (a.position > b.position)
        return 1;
      return 0;
    };

    var _shuffle = function(terms) {
      var currentIndex = terms.length, temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = terms[currentIndex];
        terms[currentIndex] = terms[randomIndex];
        terms[randomIndex] = temporaryValue;
      }
    };

    this.loadMedicalConcepts = function() {
      var self = this;
      $http.get("/api/medical_concepts.json")
        .success(function(data) {
          self.medicalConcepts = data;
        })
        .error(function(data) {
          console.log("/api/medical_concepts.json", data);
        });
    };

    this.enterPlayerName = function(player) {
      this.player.firstName = player.firstName;
      this.player.lastName = player.lastName;
      this.player.email = player.email;
    };

    this.initGame = function() {
      this.medicalConcept = null;
      this.setStatus("selectMedicalConcept");
      this.selectedTerm = null;
      this.termsAndConcepts = {};
    };

    this.when = function(statuses) {
      return -1 !== statuses.indexOf(this.gameStatus);
    };

    this.setStatus = function(status) {
      return this.gameStatus = status;
    };

    var _findMedicalConcept = function(medicalConceptId) {
      var mc = null;
      this.medicalConcepts.forEach(function(medicalConcept) {
        if(medicalConcept.id === medicalConceptId) {
          mc = medicalConcept;
          return;
        }
      });

      return mc;
    }.bind(this);

    this.selectMedicalConcept = function(medicalConceptId) {
      this.setStatus("preview");
      this.medicalConcept = _findMedicalConcept(medicalConceptId);
      this.concepts().sort(_compare);
      _shuffle(this.terms());
    };

    this.terms = function() {
      if(this.medicalConcept)
        return this.medicalConcept.terms;

      return [];
    };

    this.concepts = function() {
      if(this.medicalConcept)
        return this.medicalConcept.concepts;

      return [];
    };

    this.eventLoaded = function() {
      return null !== this.event.id;
    };

    this.eventName = function() {
      return this.event.name;
    };

    this.startGame = function() {
      this.setStatus("playing");
    };

    this.eventPreviewCountdown = function() {
      return this.event.preview_countdown;
    };

    this.eventGameTimeLimit = function() {
      return this.event.game_time_limit * 60;
    };

    this.finishGame = function(gameTime) {
      this.setStatus("saving");
      this.persistGame(gameTime);
    };

    this.scoreCorrect = function() {
      var i, j = 0;
      for(i in this.termsAndConcepts) {
        if(this.correctConcept(i))
          j += 1;
      }

      return j;
    };

    this.scoreWrong = function() {
      var i, j = 0;
      for(i in this.termsAndConcepts) {
        if(this.wrongConcept(i))
          j += 1;
      }

      return j;
    };

    this.totalTerms = function() {
      return this.terms().length;
    };

    this.persistGame = function(gameTime) {
      var self = this;
      $http.post("/api/players.json", {
        event_id: this.event.id,
        medical_concept_id: this.medicalConcept.id,
        first_name: this.player.firstName,
        last_name: this.player.lastName,
        email: this.player.email,
        score_correct: this.scoreCorrect(),
        score_wrong: this.scoreWrong(),
        total_terms: this.totalTerms(),
        game_time: (this.eventGameTimeLimit() - gameTime) })
      .success(function(data) {
        self.setStatus("finished");
        self.rank = data.rank;
      })
      .error(function(data) {
        console.log("/api/players.json", data);
      });
    };

    this.playerName = function() {
      return [this.player.firstName, this.player.lastName].join(" ");
    };

    var _findTerm = function(termId) {
      var t = null;
      this.terms().forEach(function(term) {
        if(term.id === parseInt(termId)) {
          t = term;
          return;
        }
      });

      return t;
    }.bind(this);

    var _findTermsByName = function(termName) {
      var arr = [], i;
      for(i in this.terms()) {
        if(this.terms()[i].name === termName)
          arr.push(this.terms()[i]);
      };

      return arr;
    }.bind(this);

    var _findConcept = function(conceptId) {
      var c = null;
      this.concepts().forEach(function(concept) {
        if(concept.id === parseInt(conceptId)) {
          c = concept;
          return;
        }
      });

      return c;
    }.bind(this);

    this.setSelectedTerm = function(termId) {
      if( ! this.termIsDragged(termId))
        this.selectedTerm = _findTerm(termId);
    };

    this.termIsSelected = function(termId) {
      return this.selectedTerm && this.selectedTerm.id === termId;
    };

    this.termIsDragged = function(termId) {
      var i;
      for(i in this.termsAndConcepts) {
        if(this.termsAndConcepts[i] === termId)
          return true
      }

      return false;
    };

    this.toogleTerm = function(conceptId) {
      if(this.termsAndConcepts[conceptId])
        delete this.termsAndConcepts[conceptId];
      else if(null !== this.selectedTerm)
        this.termsAndConcepts[conceptId] = this.selectedTerm.id;

      this.selectedTerm = null;
    }

    this.emptyConcept = function(conceptId) {
      return ! this.termsAndConcepts[conceptId];
    };

    this.notEmptyConcept = function(conceptId) {
      return this.when(["playing"]) && this.termsAndConcepts[conceptId];
    };

    this.correctConcept = function(conceptId) {
      if( ! this.when(["finished", "saving"]))
        return false;

      var termId = this.termsAndConcepts[conceptId];
      if(termId) {
        var term = _findTerm(termId);
        var concept = _findConcept(conceptId);
        var terms = _findTermsByName(term.name), i, names = [];
        for(i in terms) {
          names.push(terms[i].concept_name);
        }
        return -1 !== names.indexOf(concept.name);
      }

      return false;
    };

    this.wrongConcept = function(conceptId) {
      if( ! this.when(["finished", "saving"]))
        return false;

      var termId = this.termsAndConcepts[conceptId];
      if(termId) {
        var term = _findTerm(termId);
        var concept = _findConcept(conceptId);
        var terms = _findTermsByName(term.name), i, names = [];
        for(i in terms) {
          names.push(terms[i].concept_name);
        }
        return -1 === names.indexOf(concept.name);
      }

      return false;
    };

    this.termPutInConcept = function(conceptId) {
      var termId = this.termsAndConcepts[conceptId];
      if(termId) {
        var term = _findTerm(termId);
        return term.name;
      }

      return "";
    };
  };

  return Game;
}]);
