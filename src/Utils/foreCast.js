const request = require('request');


const foreCast= ( latitude,longitude, callback) =>{

    const weatherUrl = "http://api.weatherstack.com/current?access_key=ca6a301c95d5b9bd5be9abfbe09ac9af&query="+latitude+","+longitude+"&units=m";

    request( {url: weatherUrl,json: true},(error, response) =>{

        if(error){
            callback('Unable to connect to the API',undefined);
       }else if(response.body.error){
        callback(response.body.error.type, ' ', response.body.error.info,undefined)
       }else{
        callback(undefined,
            
            response.body.current.weather_descriptions[0]+
            ', It is currently '+response.body.current.temperature+
            ' degrees out There is a '+response.body.current.precip+' chance of rain',
            //Weather_description: response.body.current.weather_descriptions[0],
            //Temperature: response.body.current.temperature
       )
    }
    });

}

module.exports ={
    foreCast: foreCast
}