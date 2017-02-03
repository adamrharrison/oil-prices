angular.module('OilApp', ['ngRoute', 'ngMaterial'])
	.run(function($rootScope) {
    $rootScope.wtiDone = false;
    $rootScope.brentDone = false;
    $rootScope.quotesDone = false;
	})

	.config(function($mdThemingProvider) {
	  // Extend the grey theme with a few different colors
	  var newGreyMap = $mdThemingProvider.extendPalette('grey', {
	    'A100': 'fafafa'
	  });
	  $mdThemingProvider.definePalette('lightGrey', newGreyMap);
	})

	.config(function($mdThemingProvider) {
	  // Extend the indigo theme with a few different colors
	  var newWhiteMap = $mdThemingProvider.extendPalette('grey', {
	  	'500' : 'ffffff',
	    'A100': 'ffffff'
	  });
	  $mdThemingProvider.definePalette('newWhite', newWhiteMap);
	})

	.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('mainTheme')
	  	.primaryPalette('teal')
    	.backgroundPalette('lightGrey')
	})

	.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('sideBarTheme')
	  	.primaryPalette('newWhite')
    	.backgroundPalette('newWhite')
	})

  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
      })
      .otherwise('/dashboard');
  });