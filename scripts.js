const app=angular.module("weather-app",['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
    .when("/location",{
        templateUrl:'templates/location.html',
    })
    .when("/weather",{
        templateUrl:'templates/weather.html'
    })
    .when("/",{
        templateUrl:'templates/data.html',
        controller:'firebase'
    })
    .when("/route/:routeP",{
        templateUrl:"templates/comp.html",
        controller:'ctrl'
    })
});

app.controller('ctrl',function($routeParams,$scope){
    $scope.obj=$routeParams.routeP;
})

app.component("newComp",{
    template: "This is a component having value  {{$ctrl.in}}",
    controller:function control(){
        this.in="bcjnrle";
    }
});

app.run(function($rootScope){
    $rootScope.clear=function(){
        $rootScope.address="";
    }
})


app.controller("firebase",function(scriptsService,$rootScope,$scope){
    $rootScope.load=false;
    $scope.$on('$viewContentLoaded', function() {
        scriptsService.getData(function(arr){       
            $scope.$apply(function(){$scope.info=arr;})   
            console.log("SERVICE : "+$scope.info);
        })
    });



    $rootScope.data=function(addr){
        $rootScope.load=true;
        scriptsService.data($rootScope.address,function(data){
            if(data.data.city=="none"){
                $rootScope.load=false;
                alert("City doesn't exist");
                return;
            }
            console.log("DATA : "+data.data);
            scriptsService.addData(addr,data.data.longitude,data.data.latitude,data.data.temp,function(){
                scriptsService.getData(function(arr){
                    console.log(arr)
                    $scope.$apply(function(){$scope.info=arr; $rootScope.load=false;})
                   
                })                      
            })
        })  
    }
    
    $scope.deleteDoc=function(doc){
        $rootScope.load=true;
        var query = db.collection('temp-data').where('city','==',doc.city);
        query.get()
        .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.delete();
            });
            return db.collection('temp-data');
        })
        .then(function(obj){
            console.log("Successfully deleted");
    
            scriptsService.getData(function(data){
                $scope.$apply(function(){
                    $scope.info=data;
                })
            })

        })
        .then(function(){
            $rootScope.load=false;
        })
        .catch(function(err){
            console.log("Error : "+err);
        });
    }
})


