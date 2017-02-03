angular.module('OilApp')
  .directive("opQuote", ['financeService'
    , function (financeService) {
      return {
        restrict: "EA",
        scope: {
          quote: '=',
          name: '=?'
        },
        controller: ['$scope', function ($scope) {

        }],
        templateUrl: 'views/opQuote.html'
      }
    }]);