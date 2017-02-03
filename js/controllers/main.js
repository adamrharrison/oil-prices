angular.module('OilApp').controller('MainController', [
  '$scope',
  '$rootScope',
  'financeService',
  'Symbols',
  '$interval',
  '$timeout',
  '$mdDialog',
  '$mdMedia',
  function ($scope,
            $rootScope,
            financeService,
            Symbols,
            $interval,
            $timeout,
            $mdDialog,
            $mdMedia) {

    //Load google charts
    google.charts.load('current', {packages: ['corechart', 'line']});

    //Get chart data
    var getChartsData = function (urls) {
      //WTI
      financeService.getChartData(urls[0]).success(function (data) {
        $scope.wti = data.dataset.data;
        $rootScope.wtiDone = true;
      }).error(function () {
        console.log('WTI chart error.');
      });
      //BRENT
      financeService.getChartData(urls[1]).success(function (data) {
        $scope.brent = data.dataset.data;
        $rootScope.brentDone = true;
      }).error(function () {
        console.log('Brent chart error.');
      });
    };

    getChartsData(Symbols.urls);

    //Get all stocks in one query
    $scope.getQuotes = function () {
      $scope.quotesLoaded = false;
      financeService.getQuotes().success(function (data) {
        $scope.quotes = data.query.results.quote;
        $scope.stockQuotes = data.query.results.quote.slice(2);
        $scope.stockQuotes.sort(function(a, b) {
          return a.symbol > b.symbol;
        })
        $scope.quotesLoaded = true;
        $rootScope.quotesDone = true;
      }).error(function () {
        $timeout($scope.getQuotes, 5000);
        console.log('Quotes error');
      });
    };

    $scope.getQuotes();

    var todayDay = new Date().getDay();

    if(todayDay > 0 && todayDay < 6) {
      $interval($scope.getQuotes, 30000);
    }

    //More info dialog handler
    $scope.showMoreInfo = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '/views/aboutDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
    };

  }]);

function DialogController($scope, $mdDialog) {
  $scope.close = function() {
    $mdDialog.hide();
  };
}
