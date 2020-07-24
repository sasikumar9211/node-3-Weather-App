const request = require('request');

const geoCode = (address,callback) =>{

    const geoCodeUrl  = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic2FzaWt1bWFyOTIxMSIsImEiOiJja2N5YXY5OXQwODN6MnFwdmRxNTVoN2NqIn0.GJ7ojZuuGK9pAU9ClvPv1Q&limit=1";

    request({url : geoCodeUrl,json: true},(error,response) => {
            
        if(error){
            callback('Unable to connect to the API',undefined)
        }else if(response.body.features.length ===0){
            callback("Unable to find location,Try another search..",undefined)
        }else{
            callback(undefined,{

                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                placeName: response.body.features[0].place_name

            })
        }
    })
};

    

module.exports = {
    geoCode: geoCode
}
