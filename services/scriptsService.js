
app.factory('scriptsService',['$rootScope','$location','$http',function($rootScope,$location,$http){
    return {
        data:       function(addr,callback){
                                console.log("Address L : "+addr);
                                $http({
                                    method:'POST',
                                    url:'/api/data',
                                    data:{
                                        address:addr
                                    }
                                }).then(function(res){
                                    callback(res);
                                });
                            },
        
        dataPreloaded:        function(callback){
                                $http({
                                    url:'/api/dataPreloaded',
                                    method:'GET'
                                }).then(function(res){
                                    callback(res);
                                },function(err){
                                    callback(err);
                                });
                            },

        temperature:        function(callback){
                                $http({
                                    method:'POST',
                                    url:'/api/temperature',
                                    data:{
                                        location:$rootScope.location
                                    }
                                }).then(function(res){
                                    callback(res);
                                },function(err){
                                    callback(err);
                                })
                            },

        getData:            function(callback){ 
                                db.collection('temp-data').get()
                                .then((snap)=>{
                                    arr=[];
                                    snap.docs.forEach(s=>{
                                        
                                        arr.push(s.data());
                                    })
                                    
                                    return arr;
                                })
                                .then(function(arr){
                                    callback(arr);                                  
                                })
                                .catch(function(err){
                                    throw err;
                                })
    

                            },
    
        addData :           function(addr,long,lat,temp,callback){
                                    db.collection('temp-data').add({
                                        city:addr,
                                        location:{
                                                    latitude:long,
                                                    longitude:lat
                                                },
                                        temperature:temp
                                    });
                                    callback();
                            }
    }
}])