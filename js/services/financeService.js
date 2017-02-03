angular.module('OilApp').service('financeService', ['$http', 'Symbols', function ($http, Symbols) {

  var symbols = Symbols.stocks;
  var temp = symbols.slice(0, 2);
  temp.push(shuffle(symbols.slice(2)));
  symbols = temp;

  var symbolsString = symbols[0];
  for (var i = 1; i < symbols.length; i++) {
    symbolsString += ',' + symbols[i];
  }
  return {
    getQuotes: function () {
      return $http({
        method: 'GET',
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance%20.quotes%20where%20symbol%20in%20(%22' + symbolsString + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
      });
    },
    getChartData: function (url) {
      return $http({
        method: 'GET',
        url: url
      });
    }
  };

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}]);
