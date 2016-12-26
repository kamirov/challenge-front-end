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
})();
