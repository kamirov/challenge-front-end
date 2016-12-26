(function() {
   angular.module('FrontEndChallenge')
      .controller('selectionCtrl', selectionCtrl)
      // .directive('step', stepDirective)
      .directive('offer', offerDirective)
      .filter('tagToClass', function() {
         return tagToClass;

         function tagToClass(tag) {
            return tag
                     .toLowerCase()
                     .replace(/ /gi, '-')
                     .replace(/\+/gi, '');
         }
      })

   function selectionCtrl($http) {
      var vm = this;

      // Get selected offers
      // TBA

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

   function offerCtrl() {

   }

   // function stepDirective() {
   //    return {
   //       restrict: 'E',
   //       templateUrl: 'app/components/selection/step.html',
   //       scope: {
   //          status: '@',
   //          idx: '@',
   //          name: '@'
   //       },
   //       controller: stepCtrl,
   //       controllerAs: 'step'
   //    };
   // }


   // function stepCtrl() {
      
   // }


})();
