(function() {
   angular.module('FrontEndChallenge')
      .controller('selectionCtrl', selectionCtrl);


   function selectionCtrl(offerService) {
      selectionCtrl.$inject = ['offerService'];

      var vm = this;

      // Sync state with service
      vm.offers = offerService.offers;
      vm.selected = offerService.selected;
      offerService.loadOffers();

      vm.isSelected = function(productId) {
         return offerService.isSelected(productId);
     }

      vm.select = function(productId) {
         return offerService.select(productId);
      }

      vm.reachedMaxSelections = function() {
         return offerService.reachedMaxSelections();
      }
   }
})();
