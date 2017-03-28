console.log("start of job controller")

app.controller('JobController', ['$scope', 'JobService','$location','$rootScope','$cookieStore',
                                 function($scope, JobService,$location,$routeParams,$rootScope,$cookieStore) {
	console.log("inside jobController...")
          var self = this;
          self.jobModel={jobname:'',jobdescription:'',username:''};
          self.jobs=[];
          self.viewjob=[];
          self.editjob=[];
          self.appliedjob=[];
         self.getJob = getjob

//-------------------------------------------------------------------------GET job ---------------------------------------------------------------------------------------
          function getjob(jobname){
        	  JobService.getjob(jobname)
                  .then(  
                		       function(d) {
                            	   console.log('inside getselected')
                                       console.log(d)
                            	        self.viewjob = d;
                               
                            	   self.getapplylist(d.jobname)
                                     $location.path('/viewjob'); 
                               },
                                function(errResponse){
                                    console.error('Error while get jobs controller');
                                }
                       );
          };
          
          function getapplylist(jobname){
        	  JobService.getapplylist(jobname)
                  .then(  
                		       function(d) {
                            	   console.log('inside getselected')
                                       console.log(d)
                            	       
                                     $location.path('/viewjob'); 
                               },
                                function(errResponse){
                                    console.error('Error while get jobs controller');
                                }
                       );
          };
          
//---------------------------------------------------------------------------ALL job LIST-------------------------------------------------------------------------------------        
          self.fetchAlljobs = function(){
              JobService.fetchAlljobs()
                  .then(
                               function(d) {
                                    self.jobs = d;
                                 console.log('inside fetch all job')
                           
                               },
                                function(errResponse){
                                    console.error('Error while fetching jobs');
                                }
                       );
          };
  //--------------------------------------------------------------------------ADD job--------------------------------------------------------------------------------------          
          self.createjob = function(jobModel){
              JobService.createjob(jobModel)
                      .then(
                    		  
                    		  function(d) {
									
									self.jobModel = d;
									if (self.jobModel.errorCode == "404")

									{
										alert(self.jobModel.errorMessage)

										self.jobModel.username = "";
										self.jobModel.password = "";

									} else { 
												
												self.fetchAlljobs(); 
										self.reset();
													$location.path('/listjob');
												

									}}

                  );
          };
        //--------------------------------------------------------------------------UPDATE job--------------------------------------------------------------------------------------          
          self.editjob = function(jobname){
         	 console.log('inside editjob')
               JobService.editjob(jobname)
                       .then( function(d) {
                     	  console.log('inside edit'+d)
                     	  console.log(d)
                     	  self.editjob=d;
                     	  $location.path("/addjob")
 							
 						 },
                               self.fetchAlljobs, 
                               function(errResponse){
                                    console.error('Error while updating job.');
                               } 
                   );
           };
           
//--------------------------------------------------------------------------REMOVE BLOG--------------------------------------------------------------------------------------          
           self.deletejob = function(jobname){
               JobService.deletejob(jobname)
                       .then( function(d) {
                     	  $location.path("/listjob")
 							
 							 },
                     		  function(errResponse){
                                    console.error('Error while updating Blog.');
                               } 
                   );
           };
           self.applyjob = function(jobname){
               JobService.applyjob(jobname)
                       .then( function(d) {
                     	  $location.path("/listjobapply")
 							
 							 },
                     		  function(errResponse){
                                    console.error('Error while updating Blog.');
                               } 
                   );
           };
           
           self.applyjobbyid= function(){
        	   JobService.applyjobbyid().then(function(d)
        		{console.log('inside apply job by id')
        		   console.log(d)
        		   self.appliedjob = d;
                
        		   
        		}	   
        	   )
           }
           
           
     self.fetchAlljobs();
 
          self.addjob = function() {
           
                  self.createjob(self.jobModel);
              	self.reset();
				
            
          };
    
               
          self.edit = function(id){
              console.log('id to be edited', id);
              for(var i = 0; i < self.jobs.length; i++){
                  if(self.jobs[i].id === id) {
                     self.jobModel = angular.copy(self.jobs[i]);
                     break;
                  }
              }
          };
               
         
           self.applyjobbyid();
          self.reset = function(){
        	  self.jobModel={jobname:'',jobdescription:'',username:'',jobdateTime:'',jobstatus:'',jobreason:''};
             //    $scope.myForm.$setPristine(); 
          };
 
      }]);