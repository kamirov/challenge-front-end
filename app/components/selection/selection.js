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
      vm.selected = [];

      vm.maxSelections = 5;

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

      this.isSelected = function(offerId) {
         return vm.selected.includes(offerId);
     }

      this.handleSelect = function(offerId) {

         // Find the offer 
         var offer = vm.offers.find(function(item) {
            return item.id === offerId;
         });

         var offerIdx = vm.selected.indexOf(offer.id);

         // Toggle selection
         if (offerIdx === -1) {
            if (!vm.reachedMaxSelections())
               vm.selected.push(offer.id);
         }
         else
            vm.selected.splice(offerIdx, 1);
      }

      this.reachedMaxSelections = function() {
         // console.log(vm.selected, vm.selected.length, vm.maxSelections);
         return vm.selected.length === vm.maxSelections;
      }
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
