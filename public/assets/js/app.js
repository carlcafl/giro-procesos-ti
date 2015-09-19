//var backendURL = "https://sura-resource-alloc-backend.herokuapp.com/api/rest";



// create our angular app and inject ngAnimate and ui-router 
// =============================================================================
angular.module('giroApp', ['ngAnimate', 'ui.router'])

// configuring our routes 
// =============================================================================
.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form (/form)
        .state('form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: 'formController'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/step1)
        .state('form.step1', {
            url: '/step1',
            templateUrl: 'step1.html'
        })
        
        // url will be /form/step2
        .state('form.step2', {
            url: '/step2',
            templateUrl: 'step2.html'
        })
        
        // url will be /form/step3
        .state('form.step3', {
            url: '/step3',
            templateUrl: 'step3.html'
        })

        // url will be /form/step4
        .state('form.step4', {
            url: '/step4',
            templateUrl: 'step4.html'
        })

        // url will be /form/step5
        .state('form.step5', {
            url: '/step5',
            templateUrl: 'step5.html'
        })

        // url will be /form/step6
        .state('form.step6', {
            url: '/step6',
            templateUrl: 'step6.html'
        })

        // url will be /form/step7
        .state('form.step7', {
            url: '/step7',
            templateUrl: 'step7.html'
        })

        // url will be /form/step8
        .state('form.step8', {
            url: '/step8',
            templateUrl: 'step8.html'
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/step1');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope, $http) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        var res = $http.post('/submit/' + $scope.formData.email,$scope.formData);
		res.success(function(data, status, headers, config) {			
	        alert('El resultado ha sido enviado satisfactoriamente a tu correo.\nMuchas gracias por participar'); 
		});
		res.error(function(data, status, headers, config) {			
	        alert('Ha ocurrido un error... Por favor intenta nuevamente'); 
		});
    };
    
});
