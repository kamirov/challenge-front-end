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

      svc.isSelected = function(offerId) {
         return svc.selected.includes(offerId);
      };

      svc.select = function(offerId) {
         // Find the offer 
         var offer = svc.offers.find(function(item) {
            return item.id === offerId;
         });
         var offerIdx = svc.selected.indexOf(offer.id);

         // Toggle selection
         if (offerIdx === -1) {
            if (!this.reachedMaxSelections())
               svc.selected.push(offer.id);
         }
         else
            svc.selected.splice(offerIdx, 1);

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

      this.isSelected = function(offerId) {
         return offerService.isSelected(offerId);
     }

      this.handleSelect = function(offerId) {
         offerService.select(offerId);
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
