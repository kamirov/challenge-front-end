// Angular entry point

(function() {
   angular.module('FrontEndChallenge', ['ngAnimate'])
      .directive('app', appDirective)
      .directive('productDetails', productDetailsDirective)
      .directive('mainNavButton', mainNavButtonDirective);


   function appDirective() {
      return {
         restrict: 'E',
         templateUrl: 'app/components/app.html',
         controller: appCtrl,
         controllerAs: 'app'
      };
   }


   function appCtrl(offerService, $window) {
      appCtrl.$inject = ['offerService', '$window'];

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

      vm.handleMainNavButtonClick = function() {
         if (vm.isModalSelected() || vm.isModalSelectable()) {
            vm.select(vm.modal.offer.id);
            vm.resetModal();
         }
         else if (vm.reachedMaxSelections()) {
            $window.location.href = 'http://www.sampler.io';
         }
      }

      // Returns true if the modal window is displaying a selected offer
      vm.isModalSelected = function() {
          return vm.modalIsOpen() && vm.isSelected(vm.modal.offer.id);
      }

      // Returns true if the modal window is displaying a selectable offer
      vm.isModalSelectable = function() {
          return vm.modalIsOpen() && !vm.isSelected(vm.modal.offer.id) && !vm.reachedMaxSelections()
      }

      vm.modalIsOpen = function() {
          return vm.modal.active;
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


   function mainNavButtonDirective() {
      return {
         restrict: 'E',
         templateUrl: 'app/components/main-nav-button.html',
         controller: appCtrl,
         controllerAs: 'app'
      };
   }

})();