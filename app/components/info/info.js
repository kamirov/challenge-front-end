(function() {
   angular.module('FrontEndChallenge')
      .controller('infoCtrl', infoCtrl)

   function infoCtrl($http, $route) {
      var vm = this;
      console.log($route);
      var productId = parseInt($route.current.params.productId);

      // Get product based on ID
      // First get all products
      $http.get("assets/data.json")
         .then(function(response) {

            // Now filter for the product we want
            vm.offer = response.data.products.find(function(item) {
               return item.id === productId;
            });

            console.log(vm.offer);
         });
   }
})();