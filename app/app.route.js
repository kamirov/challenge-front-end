// Router configuration

(function() {
   angular.module('FrontEndChallenge').config(function($routeProvider) {
      $routeProvider
         // Selection page
         .when('/', {
            templateUrl: 'app/components/selection/selection.html',
            controller: 'selectionCtrl'
         })
         // Product info page
         .when('/info', {
            templateUrl: 'app/components/info/info.html',
            controller: 'infoCtrl'
         });
   });
})();