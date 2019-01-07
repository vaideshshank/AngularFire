const express=require('express');
const app=express();
const request=require('request');
const axios=require('axios');

module.exports={
    data:               (req,res)=>{
                            console.log(JSON.stringify(req.body,undefined,2));
                            var add=req.body.address;
                            axios({
                                method:'GET',
                                url:`https://api.opencagedata.com/geocode/v1/json?q=${add}&key=95b8a313189744e0a839f4c2e0357cc4`,
                                json:true
                            })
                            .then(function(response){
                                if(response.data.total_results==0){
                                    res.json({"city":"none"});
                                    return;
                                }
                                var location=response.data.results[0].geometry;
                                
                                console.log(location);
                                return ({
                                    latitude:location.lat,
                                    longitude:location.lng
                                })

                                //return axios.get(`https://api.darksky.net/forecast/38a9fb4ff2145e603141a7b082c2ba64/${location.latitude},${location.longitude}`)
                            }).then(function(obj){
                                axios({
                                    method:'GET',
                                    url:`https://api.darksky.net/forecast/38a9fb4ff2145e603141a7b082c2ba64/${obj.latitude},${obj.longitude}`,
                                    json:true
                                })
                                .then(function(response){                                    
                                    obj.temp=response.data.currently.temperature;
                                    console.log(obj);
                                    res.json(obj);
                                })
                            })
                            .catch(function(err){
                                console.log('Error : '+err);
                            })
                        },
    dataPreloaded:      (req,res)=>{
                            axios({
                                method:'GET',
                                url:`https://api.opencagedata.com/geocode/v1/json?q=delhi&key=95b8a313189744e0a839f4c2e0357cc4`,
                                json:true
                            })
                            .then(function(response){
                                let location=response.data.results[0].geometry;
                                console.log(location);
                                res.json({
                                    latitude:location.lat,
                                    longitude:location.lng
                                })
                            })
                            .catch(function(err){
                                console.log('Error : '+err);
                            })
                        },
    temperature:        (req,res)=>{
                            console.log(JSON.stringify(req.body,undefined,2));
                            var location=req.body.location;
                            axios({
                                method:'GET',
                                url:`https://api.darksky.net/forecast/38a9fb4ff2145e603141a7b082c2ba64/${location.latitude},${location.longitude}`,
                                json:true
                            })
                            .then(function(response){
                                
                                res.json({
                                    temperature:response.data.currently.temperature
                                });
                            })
                            .catch(function(err){
                                console.log('Error : '+err);
                            })
                        } ,
        
        home:           (req,res)=>{
                            res.sendFile(__dirname+'/index.html');
                        }
}