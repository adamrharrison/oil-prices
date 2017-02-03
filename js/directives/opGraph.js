angular.module('OilApp')
  .directive("opGraph", ['financeService'
    , function (financeService) {
      return {
        restrict: "EA",
        scope: {
          quote: '=',
          chart: '=',
          name: '=?',
          mobile: '=?'
        },
        controller: ['$scope', function ($scope) {

            if($scope.mobile){
              $scope.isMobile = '-mobile';
            }

          var rows = [];
          var rows1y;
          var rows6m = [];
          var rows1m = [];

          var months1y;
          var months6m = [];
          var months1m = [];

          //Create months array for ticks
          var now = new Date(Date.now());
          var months = [];



          var today = new Date();

          $scope.$watch('chart', function () {
            if ($scope.chart != undefined) {
              for (var i = 0; i < $scope.chart.length; i++) {
                var pointDate = (new Date($scope.chart[i][0]));
                rows.push([pointDate, ($scope.chart[i][4] ? $scope.chart[i][4] : $scope.chart[i][6])]);

                //Only go back one year
                //Add some comments next time so I dont have to decipher this non-sense
                if ((pointDate.getDate() <= today.getDate())
                  && (pointDate.getYear() < today.getYear())
                  && (pointDate.getMonth() == today.getMonth())) {
                  break;
                }

              }
              rows1y = rows;
              rows6m = rows.slice(0, rows.length / 2);
              rows1m = rows.slice(0, 30);


              months.push(new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()));
              for (var d = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate()); d <= now; d.setDate(d.getDate() + 1)) {
                if (months[months.length - 1].getMonth() < d.getMonth() || (months[months.length - 1].getMonth() == 11 && d.getMonth() != 11)) {
                  months.push(new Date(d));
                }
              }

              months1y = months;
              months6m = months.slice((months.length/2) + 1);
              months1m = months.slice(months.length - 2);

              google.charts.setOnLoadCallback(drawBasic);
            }
          });

          function drawBasic() {

            var data = new google.visualization.DataTable();

            data.addColumn('date', 'X');
            data.addColumn('number', '$');
            data.addRows(rows);


            var options = {
              legend: 'none',
              hAxis: {
                textStyle: {
                  fontSize: 8
                },
                ticks: months,
                slantedText: 'true'
              },
              vAxis: {
                format: 'currency'
              }
            };

            var chartDesktop = new google.visualization.LineChart(document.getElementById($scope.quote.symbol));
            var chartMobile = new google.visualization.LineChart(document.getElementById($scope.quote.symbol + '-mobile'));
            chartDesktop.draw(data, options);
            chartMobile.draw(data, options);
          }

          $scope.changeGraph = function (freq) {
            switch (freq) {
              case '1y':
                rows = rows1y;
                months = months1y;
                break;
              case '6m':
                rows = rows6m;
                months = months6m;
                break;
              case '1m':
                rows = rows1m;
                months = months1m;
                break;
              default:
                rows = rows1y;
                months = months1y;
                break;
            }
            google.charts.setOnLoadCallback(drawBasic);
          };

        }],
        templateUrl: 'views/opGraph.html'
      }
    }]);
