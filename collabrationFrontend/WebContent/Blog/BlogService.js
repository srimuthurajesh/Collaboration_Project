app.factory('BlogService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("inside BlogService...")
	
	var BASE_URL='http://localhost:8080/collabrationBackend'
    return {
         
            fetchAllBlogs: function() {
                    return $http.get(BASE_URL+'/fetchallblogs')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while fetching Blogs');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            createBlog: function(blogModel){
                    return $http.post(BASE_URL+'/createblog', blogModel)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateBlog: function(blog, id){
                    return $http.put(BASE_URL+'/blog/'+id, blog)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            accept: function(id) {
            	console.log("calling approve ")
                    return $http.get(BASE_URL+'/accept/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while accept blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            reject: function(id, reason) {
            	console.log("calling reject ")
                    return $http.get(BASE_URL+'/reject/'+id+'/'+reason)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while reject blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            deleteBlog: function(id){
                    return $httpdelete(BASE_URL+'/blog/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting blog');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            getblog: function(blogname){
                return $http.get  (BASE_URL+'/getblogbyname/'+blogname)
                        .then(
                                function(response){
                                	$rootScope.selectedBlog = response.data
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while getting blog');
                                    return $q.reject(errResponse);
                                }
                        );
        }
         
    };
 
}]);