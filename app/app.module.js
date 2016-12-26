// Angular entry point. Defines root template directive.

(function() {
   angular.module('FrontEndChallenge', ['ngRoute', 'ngAnimate'])
      .run(function () {
         console.log('Done loading dependencies and configuring module!');
      });

      
})();