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
        });
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/form/step1');
})

// our controller for the form
// =============================================================================
.controller('formController', function($scope) {
    
    // we will store all of our form data in this object
    $scope.formData = {};
    
    // function to process the form
    $scope.processForm = function() {
        alert('awesome!');  
    };
    
});

/*
var angularModule = angular.module('giroApp', [ 'ngRoute' ])
		.config(function($routeProvider, $locationProvider) {
			$routeProvider.
			when('/', {
				templateUrl : '../views/step1.html'
			}).
			when('/Login', {
				templateUrl : '../login.html',
				controller : 'LoginCtrl'
			}).
			when('/Home', {
				templateUrl : '../templates/menu.html'
			}).
			when('/Platforms', {
				templateUrl : '../platforms/list.html',
				controller : 'PlatformListCtrl'
			}).
			when('/NewPlatform', {
				templateUrl : '../platforms/new_or_edit.html',
				controller : 'NewPlatformCtrl'
			}).
			when('/EditPlatform/:id', {
				templateUrl : '../platforms/new_or_edit.html',
				controller : 'NewPlatformCtrl'
			}).
			when('/Projects', {
				templateUrl : '../projects/list.html',
				controller : 'ProjectListCtrl'
			}).
			when('/EditProject/:id', {
				templateUrl : '../projects/new_or_edit.html',
				controller : 'NewProjectCtrl'
			}).
			when('/TeamMemberAssignedCapacity/:teamMemberId/:platformId', {
				templateUrl : '../teamMembers/assigned_capacity.html',
				controller : 'TeamMemberACCtrl'
			}).
			when('/About', {
				templateUrl : '../about.html'
			}).
			otherwise({
			    controller : function(){
			        window.location.replace('/');
			    }, 
			    template : "<div></div>"
			});			
//			if(window.history && window.history.pushState){
//	            //$locationProvider.html5Mode(true); will cause an error $location in HTML5 mode requires a  tag to be present! Unless you set baseUrl tag after head tag like so: <head> <base href="/">
//
//	         // to know more about setting base URL visit: https://docs.angularjs.org/error/$location/nobase
//
//	         // if you don't wish to set base URL then use this
//	         $locationProvider.html5Mode({
//	                 enabled: true,
//	                 requireBase: false
//	          });
//	        }

		});

angularModule.controller('PlatformListCtrl',function($scope, $http, $filter, ngTableParams) {
	waitingDialog.show('Cargando...');
	$http.get(backendURL + '/platforms'
	).success(function(data) {			
		$scope.platforms = data;
		$scope.platformsTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        sorting: {
	            shortName: 'asc'     // initial sorting
	        }
	    }, {
	        total: data.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var orderedData = params.sorting() ?
	                                $filter('orderBy')(data, params.orderBy()) :
	                                	data;

	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	    });
		waitingDialog.hide();
	});
	
	$scope.gotoDetail = function() {
		waitingDialog.show('Cargando...');
		location.href="/#EditPlatform/" + this.platform.id;
	};
});

angularModule.controller('ProjectListCtrl',function ProjectsController($scope, $http, $filter, ngTableParams) {
	waitingDialog.show('Cargando...');
	$http.get(backendURL + '/projects'
	).success(function(data) {			
		$scope.projects = data;
		$scope.projectsTable = new ngTableParams({
	        page: 1,            // show first page
	        count: 10,          // count per page
	        sorting: {
	            name: 'asc'     // initial sorting
	        }
	    }, {
	        total: data.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var orderedData = params.sorting() ?
	                                $filter('orderBy')(data, params.orderBy()) :
	                                	data;

	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	    });
		waitingDialog.hide();
	});
	
	$scope.gotoDetail = function() {
		waitingDialog.show('Cargando...');
		location.href="/#EditProject/" + this.project.id;
	};
});

angularModule.controller('NewPlatformCtrl',['$scope', '$http', '$routeParams', NewPlatformController]);

function NewPlatformController($scope, $http, $routeParams) {

	$scope.option = 'Nueva';
	var id = ($routeParams.id || "");
	if (id!="") {
		$scope.option = 'Editar';
		waitingDialog.show('Cargando...');
		$http.get(backendURL + '/platforms/' + id
		).success(function(data) {			
			$scope.platform = data;
			$scope.platformId = $scope.platform.id;
			$scope.shortName = $scope.platform.shortName;
			$scope.name = $scope.platform.name;
			$scope.department = $scope.platform.department;
			$scope.owner = $scope.platform.owner;
			$scope.ownerEmail = $scope.platform.ownerEmail;
		});
		$http.get(backendURL + '/platforms/' + id + '/capacity'
		).success(function(data) {			
			$scope.capacity = data;
		});
		$http.get(backendURL + '/platforms/' + id + '/capacity/assigned'
		).success(function(data) {			
			$scope.teamMembers = data;
			waitingDialog.hide();
		    });
	}

	$scope.getAssignedCapacity = function(memberId) {
		var total = 0;
	    for(var i = 0; i < $scope.teamMembers.length; i++){
	    	if ($scope.teamMembers[i].id==memberId) {
	    		total += ($scope.teamMembers[i].capacity);
	    	}
	    }
	    return total;		
	}

	$scope.create = function() {
		$scope.submitted = true;
		if ($scope.platformId == undefined) {
			waitingDialog.show('Cargando...');
			var platformJson = {
					  shortName: $scope.shortName,
					  name: $scope.name,
					  department: $scope.department,
					  owner: $scope.owner,
					  ownerEmail: $scope.ownerEmail
					};
			var res = $http.post(backendURL + '/platforms',platformJson);
			res.success(function(data, status, headers, config) {			
					$scope.shortName = '';
					$scope.name = '';
					$scope.department = '';
					$scope.owner = '';
					$scope.ownerEmail = '';
					$scope.submitted = false;
					showAlert('#successMessage');
					waitingDialog.hide();
			});
			res.error(function(data, status, headers, config) {			
				showAlert('#errorMessage');
				waitingDialog.hide();
			});
		} else {
			waitingDialog.show('Cargando...');
			var platformJson = {
					  shortName: $scope.shortName,
					  name: $scope.name,
					  department: $scope.department,
					  owner: $scope.owner,
					  ownerEmail: $scope.ownerEmail
					};
			var res = $http.put(backendURL + '/platforms/' + $scope.platformId,platformJson);
			res.success(function(data, status, headers, config) {			
//					$scope.shortName = '';
//					$scope.name = '';
//					$scope.department = '';
//					$scope.owner = '';
//					$scope.ownerEmail = '';
					$scope.submitted = false;
					showAlert('#successMessage');
					waitingDialog.hide();
			});
			res.error(function(data, status, headers, config) {			
				showAlert('#errorMessage');
				alert(status);
				waitingDialog.hide();
			});
		}
	};
	
	$scope.viewTeamMemberDetail = function(id) {
		//alert('OK' + id);
		$('#assignedCapacity').modal('show');
	}
}

function showAlert(alertId) {
	$(alertId).show();
	window.setTimeout(function() {$(alertId).hide();}, 2000);
}

angularModule.controller('TeamMemberACCtrl',['$scope', '$http', '$filter', 'ngTableParams', '$routeParams', TeamMemberACController]);

function TeamMemberACController($scope, $http, $filter, ngTableParams, $routeParams) {
	waitingDialog.show('Cargando...');
	$scope.platformId = $routeParams.platformId;	
	$http.get(backendURL + '/platforms/' + $scope.platformId
	).success(function(data) {			
		$scope.platform = data;
	});
	$http.get(backendURL + '/teamMembers/' + $routeParams.teamMemberId + '/capacity/assigned'
	).success(function(data) {			
		$scope.teamMembers = data;		
		$scope.teamMemberTable = new ngTableParams({
	        page: 1,            // show first page
	        count: data.length,          // no pagination
	        sorting: {
	            name: 'asc'     // initial sorting
	        },
	    }, {
	    	counts: [], // hides page sizes
	    	total: data.length, // length of data
	        getData: function($defer, params) {
	            // use build-in angular filter
	            var orderedData = params.sorting() ?
	                                $filter('orderBy')(data, params.orderBy()) :
	                                	data;

	            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
	        }
	    });
		waitingDialog.hide();
	});
}

angularModule.controller('NewProjectCtrl',['$scope', '$http', '$routeParams', NewProjectController]);

function NewProjectController($scope, $http, $routeParams) {

	$scope.option = 'Nueva';
	$http.get(backendURL + '/projects/types'
	).success(function(data) {			
		$scope.projectTypeOptions = data;
	});
	var id = ($routeParams.id || "");
	if (id!="") {
		waitingDialog.show('Cargando...');
		$scope.option = 'Editar';
		$http.get(backendURL + '/projects/' + id
		).success(function(data) {			
			$scope.project = data;
			$scope.name = $scope.project.name;
			$scope.leadAnalyst = $scope.project.leadAnalyst;
			$scope.leadAnalystEmail = $scope.project.leadAnalystEmail;
			$scope.projectType = $scope.project.projectType.id;
			waitingDialog.hide();
		});
	}

//	$scope.create = function() {
//		$scope.submitted = true;
//		if ($scope.platformId == undefined) {
//			waitingDialog.show('Cargando...');
//			var projectJson = {
//					  name: $scope.name,
//					  projectType: $scope.projectType
//					};
//			var res = $http.post(backendURL + '/projects',platformJson);
//			res.success(function(data, status, headers, config) {			
//					$scope.shortName = '';
//					$scope.name = '';
//					$scope.department = '';
//					$scope.owner = '';
//					$scope.ownerEmail = '';
//					$scope.submitted = false;
//					showAlert('#successMessage');
//					waitingDialog.hide();
//			});
//			res.error(function(data, status, headers, config) {			
//				showAlert('#errorMessage');
//				waitingDialog.hide();
//			});
//		} else {
//			waitingDialog.show('Cargando...');
//			var projectJson = {
//					  name: $scope.name,
//					  projectType: $scope.projectType
//					};
//			var res = $http.put(backendURL + '/projects/' + $scope.projectId,platformJson);
//			res.success(function(data, status, headers, config) {			
//					$scope.submitted = false;
//					showAlert('#successMessage');
//					waitingDialog.hide();
//			});
//			res.error(function(data, status, headers, config) {			
//				showAlert('#errorMessage');
//				alert(status);
//				waitingDialog.hide();
//			});
//		}
//	};
}
*/