(function() {
   angular.module('FrontEndChallenge')
      .controller('selectionCtrl', selectionCtrl)
      .directive('step', stepDirective)
      .directive('offer', offerDirective);

   function selectionCtrl($http) {
      var vm = this;

      // Get data
      vm.offers = [];
      $http.get("assets/data.json")
         .then(function(response) {
            vm.offers = response.data.products;
         });

      // Steps in the process
      vm.steps = {
         items: ['Profile', 'Offers', 'Success'],
         currentItem: 1
      };
   }

   function offerDirective() {
      return {
         restrict: 'E',
         templateUrl: 'app/components/selection/offer.html',
         controller: offerCtrl,
         controllerAs: 'offer'
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

   function offerCtrl() {

   }

})();
