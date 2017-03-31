'use strict'
var app = angular.module('myApp', [ 'ngRoute','ngCookies']);
app.config(function($routeProvider) {
	$routeProvider

	.when('/', {
	    templateUrl : 'landing.html',
	    controller  : 'UserController'
	  })

	  	
 .when('/login', {
    templateUrl : 'login.html',
    controller  : 'UserController'
  })
  
  .when('/register', {
	    templateUrl : 'register.html',
	    controller  : 'UserController'
	  })
	  .when('/addblog', {
		    templateUrl : 'Blog/addblog.html',
		    controller  : 'BlogController'
		  })
	  .when('/viewblog', {
		    templateUrl : 'Blog/viewblog.html',
		    controller  : 'BlogController'
		  })
		    .when('/userblog', {
		    templateUrl : 'Blog/userblogs.html',
		    controller  : 'BlogController'
		  })
		    .when('/listblog', {
		    templateUrl : 'Blog/listblog.html',
		    controller  : 'BlogController'
		  })
		    .when('/comments', {
		    templateUrl : 'Blog/comments.html',
		    controller  : 'BlogController'
		  })
		  
		   .when('/addjob', {
		    templateUrl : 'Job/addjob.html',
		    controller  : 'JobController'
		  })
	  .when('/viewjob', {
		    templateUrl : 'Job/viewjob.html',
		    controller  : 'JobController'
		  })
		  .when('/listjob', {
		    templateUrl : 'Job/listjob.html',
		    controller  : 'JobController'
		  })
		  .when('/listjobapply', {
		    templateUrl : 'Job/listjobapply.html',
		    controller  : 'JobController'
		  })
		
		    .when('/viewalluser', {
		    templateUrl : 'Friend/viewalluser.html',
		    controller  : 'FriendController'
		  })
	  .when('/viewfriends', {
		    templateUrl : 'Friend/viewfriends.html',
		    controller  : 'FriendController'
		  })

.when('/viewnotifications', {
	    templateUrl : 'Friend/viewnotifications.html',
	    controller  : 'FriendController'
	  })
	  .when('/forum', {
	    templateUrl : 'Chat/chat.html',
	    controller  : 'ChatController'
	  })
	
	   .when('/manageuser', {
	    templateUrl : 'manageuser.html',
	    controller  : 'UserController'
	  })
	    .when('/userpage', {
	    templateUrl : 'myprofile.html',
	    controller  : 'UserController'
	  })
});


app.run( function ($rootScope, $location, $http, $cookieStore) {

	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")
		   
		 var userPages = ['/addblog',
		                  '/userblog',
		                  '/viewfriends',
		                  '/viewnotifications',
		                  '/listjobapply',
		                  '/forum',]
		 var adminPages = ['/addjob']
		 
		 var currentPage = $location.path()
		  console.log("currentpage ="+ currentPage)
		   
		 console.log($.inArray(currentPage, userPages))
		 var isUserPage = $.inArray(currentPage, userPages) != -1;
		 var isAdminPage = $.inArray(currentPage, adminPages) != -1;
		 
		 var isLoggedIn = $rootScope.currentUser;
		 console.log("isLoggedIn:" +isLoggedIn)
	     console.log("isUserPage:" +isUserPage)
	     console.log("isAdminPage:" +isAdminPage)
	        
	        if(!isLoggedIn)
	        	{console.log('inside !isLoggedIn')
	        	
	        	 if (isUserPage || isAdminPage) {
		        	  console.log("Navigating to login page:")
		        	  alertify.alert("You need to login to do this operation")

						            $location.path('/login');
		                }
	        	}
	        
			 else
	        	{
	        	
				 var role = $rootScope.currentUser.role;
				 
				 if(isAdminPage && role!='ROLE_ADMIN' )
					 {
					 
					  alertify.alert("You can not do this operation as you are logged as : User " + role +"Need to login as Admin")
					   $location.path('/login');
					 
					 }
				     
	        	
	        	}
	        
	 }
	       );
	 
//	 
//     $rootScope.currentUser = $cookieStore.get('currentUser') || {};
//     if ($rootScope.currentUser) {
//         $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser; 
//     }

});


 
    
    
