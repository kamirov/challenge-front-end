// Angular entry point. Defines root template directive.

(function() {
   angular.module('FrontEndChallenge', [])
          .directive('app', function() {
             return {
                restrict: 'E',
                templateUrl: 'app/app.html'
             };
          });
})();
