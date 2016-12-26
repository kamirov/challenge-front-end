(function() {
   angular.module('FrontEndChallenge')
      .factory('offerService', offerService)
      .filter('tagToClass', tagToClassFilter);


   // Handles all offer business logic
   function offerService($http, $window) {
      var svc = {};               

      // Default offers
      svc.offers = [];

      // Gets persistent selected offers
      var maxSelections = 5;
      var selectedRaw = $window.localStorage.selected;
      svc.selected = (selectedRaw ? JSON.parse(selectedRaw) : []); 


      // Load data from store
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


   // Converts product tag strings to CSS-friendly class names
   function tagToClassFilter() {
      return function tagToClass(tag) {
         return tag
                  .toLowerCase()
                  .replace(/ /gi, '-')
                  .replace(/\+/gi, '');
      }
   }

})();