angular.module('OilApp').constant('Symbols',
  {
    stocks: [
      'CLQ16.NYM',
      'BZU16.NYM',
      'DWTI',
      'UWTI',
      'BP',
      'CVX',
      'XOM',
      'SU.TO',
      'COP',
      'SLB'
    ],
    urls: [
      'https://www.quandl.com/api/v3/datasets/CME/CLQ2016.json?auth_token=2otHyL37rh_KetiWzufX',
      'https://www.quandl.com/api/v3/datasets/ICE/BZ2016.json?auth_token=2otHyL37rh_KetiWzufX'
    ]
  }
);