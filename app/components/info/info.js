(function() {
   angular.module('FrontEndChallenge')
      .controller('infoCtrl', infoCtrl)

   function infoCtrl(offerService, $route) {
      var vm = this;
      var productId = parseInt($route.current.params.productId);

      // Default state (only needed keys are set)
      vm.offer = {
         tag: ''
      }

      // Sync state with service
      vm.offers = offerService.offers;
      vm.selected = offerService.selected;
      offerService.loadOffers().then(function() {
         // Get current offer
         vm.offer = vm.offers.find(function(item) {
            return item.id === productId;
         });
      });

      this.isSelected = function() {
         return offerService.isSelected(productId);
     }

      this.select = function() {
         return offerService.select(productId);
      }

      this.reachedMaxSelections = function() {
         return offerService.reachedMaxSelections();
      }
   }
})();