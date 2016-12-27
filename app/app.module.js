// Angular entry point

(function() {
   angular.module('FrontEndChallenge', ['ngAnimate'])
      .directive('app', appDirective)
      .directive('productDetails', productDetailsDirective);

   function appDirective() {
      return {
         restrict: 'E',
         templateUrl: 'app/components/app.html',
         controller: appCtrl,
         controllerAs: 'app'
      };
   }

   function appCtrl(offerService) {
      appCtrl.$inject = ['offerService'];

      var vm = this;

      vm.resetModal = function() {
         vm.modal = {
            active: false,
            offer: []
         };
      }
      
      vm.openModal = function(offer, $event) {
         $event.stopPropagation();

         vm.modal = {
            active: true,
            offer: offer
         };
      }

      vm.isSelected = function(productId) {
         return offerService.isSelected(productId);
     }

      vm.select = function(productId) {
         return offerService.select(productId);
      }

      vm.reachedMaxSelections = function() {
         return offerService.reachedMaxSelections();
      }

      
      // Sync state with service
      vm.offers = offerService.offers;
      vm.selected = offerService.selected;
      offerService.loadOffers();

      // Modal window state
      vm.modal;
      vm.resetModal();
   }

   function productDetailsDirective() {
      return {
         restrict: 'E',
         templateUrl: 'app/components/product-details.html',
         controller: appCtrl,
         controllerAs: 'app'
      };
   }

})();