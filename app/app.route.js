// Router configuration

(function() {
   angular.module('FrontEndChallenge').config(function($routeProvider) {
      $routeProvider
         // Selection page
         .when('/', {
            templateUrl: 'app/components/selection/selection.html',
            controller: 'selectionCtrl as selection'
         })
         // Product info page
         .when('/info/:productId', {
            templateUrl: 'app/components/info/info.html',
            controller: 'infoCtrl as info'
         });
   });
})();