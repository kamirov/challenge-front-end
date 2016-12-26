(function() {
   angular.module('FrontEndChallenge')
      .controller('selectionCtrl', selectionCtrl)
      // .directive('step', stepDirective)
      .directive('offer', offerDirective)
      .factory('offerService', offerService)
      .filter('tagToClass', function() {
         return tagToClass;

         function tagToClass(tag) {
            return tag
                     .toLowerCase()
                     .replace(/ /gi, '-')
                     .replace(/\+/gi, '');
         }
      })
      

   function offerService($http, $window) {
      var svc = {};               

      // Default offers
      svc.offers = [];

      // Gets persistent selected offers
      var maxSelections = 5;
      var selectedRaw = $window.localStorage.selected;
      svc.selected = (selectedRaw ? JSON.parse(selectedRaw) : []); 

      svc.loadOffers = function() {
         return $http.get("assets/data.json")
            .then(function(response) {
               angular.copy(response.data.products, svc.offers);
               // svc.offers = response.data.products;
            });            
      };

      svc.reachedMaxSelections = function() {
         return svc.selected.length === maxSelections;
      };

      svc.isSelected = function(productId) {
         return svc.selected.includes(productId);
      };

      // Selects or unselects an offer
      svc.select = function(productId) {
         // Find the offer 
         var offer = svc.offers.find(function(item) {
            return item.id === productId;
         });
         var productIdx = svc.selected.indexOf(offer.id);

         // Toggle selection
         if (productIdx === -1) {
            if (!this.reachedMaxSelections())
               svc.selected.push(offer.id);
         }
         else
            svc.selected.splice(productIdx, 1);

         // Update local storage
         $window.localStorage.selected = JSON.stringify(svc.selected);
      };

      return svc;      
   }


   function selectionCtrl(offerService) {
      var vm = this;

      // Sync state with service
      vm.offers = offerService.offers;
      vm.selected = offerService.selected;
      offerService.loadOffers();

      // offerService.loadOffers().then(function() {
      //    vm.offers = offerService.getOffers();
      // });

      // Get data

      // Steps in the process
      // vm.steps = {
      //    items: ['Profile', 'Offers', 'Success'],
      //    currentItem: 1
      // };

      this.isSelected = function(productId) {
         return offerService.isSelected(productId);
     }

      this.select = function(productId) {
         return offerService.select(productId);
      }

      this.reachedMaxSelections = function() {
         return offerService.reachedMaxSelections();
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
