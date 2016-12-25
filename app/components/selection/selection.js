(function() {
   angular.module('FrontEndChallenge')
      .controller('selectionCtrl', selectionCtrl)
      .directive('step', stepDirective);


   function selectionCtrl() {
      var vm = this;

      // Steps in the process
      vm.steps = {
         items: ['Profile', 'Offers', 'Success'],
         currentItem: 1
      };
   }


   function stepDirective() {
      return {
         restrict: 'E',
         templateUrl: 'app/components/selection/step.html',
         scope: {
            status: '@',
            idx: '@',
            name: '@'
         },
         controller: stepCtrl,
         controllerAs: 'step'
      };
   }


   function stepCtrl() {
      
   }

})();
