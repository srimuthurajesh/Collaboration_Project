
	console.log("inside jobService...")
	
app.factory('JobService', ['$http', '$q','$rootScope','$cookieStore', function($http, $q,$rootScope,$cookieStore){
	
	var BASE_URL='http://localhost:8080/collabrationBackend'
    return {
         
            fetchAlljobs: function() {
                    return $http.get(BASE_URL+'/fetchallJobs')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching jobs');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createjob: function(jobModel){
                    return $http.post(BASE_URL+'/createJob', jobModel)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating job');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            editjob: function(jobname){
                return $http.get(BASE_URL+'/getJobbyname/'+jobname)
                        .then(
                        		 function(response){
                                 	$rootScope.editjob = response.data
                                     return response.data;
                                 }, 
                                 function(errResponse){
                                     console.error('Error while edit job');
                                     return $q.reject(errResponse);
                                 }
                         );
         },
        
            
         
             
            deletejob: function(jobname){
                    return $http.get (BASE_URL+'/deletejob/'+jobname)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting job');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            getjob: function(jobname){
                return $http.get  (BASE_URL+'/getJobbyname/'+jobname)
                        .then(
                                function(response){
                                	$rootScope.selectedjob = response.data
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while getting job');
                                    return $q.reject(errResponse);
                                }
                        );
        }
         
    };
 
}]);