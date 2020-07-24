const express =require('express');
const path = require('path')
const hbs =  require('hbs')
const map =require('./Utils/geoCode')
const weather =require('./Utils/foreCast')
const fetch = require( 'node-fetch');

const public_directory = path.join(__dirname,'../public');
const views_path = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');






const app = express();

app.set('view engine','hbs');
app.set('views',views_path);

hbs.registerPartials(partialPath);

app.use(express.static(public_directory))



app.get('', ( req, res) =>{

    res.render('index',{
        title: 'Weather App',
         name: 'sasikumar'
    })
})


app.get('/help', ( req, res) =>{

    res.render('help',{
        title: 'This is a help page',
        name: 'sasikumar'
    });
})


app.get('/about', ( req, res) =>{

    res.render('about',{
        title: 'About',
        name: 'sasikumar'
    });
})

app.get('/weather', ( req, res) =>{

    console.log(req.query.address)

    if(!req.query.address){
        return res.send({
            error : 'Please enter the address'
        })
    }

        map.geoCode(req.query.address,(err,{latitude, longitude, placeName} = {})=>{

            if(err){
                return res.send({
                    error : err
                })
            }
        weather.foreCast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error : error
                });
            }
            res.send({
                Weather_forecast :data ,
                location : placeName               
            })
        })
})
    
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term!!'
        })
    }
    console.log(req.query);

    res.send({
        product: []
    })
});

app.get('/help/*',(req,res) => {
 
     res.render('errorPage',{
        title: 'Error Page',
        name: 'sasikumar',
        error: 'Help Article not found'
     })

})

app.get('*',(req,res) => {
    res.render('errorPage',{
        title: 'Error Page',
        name: 'sasikumar',
        error: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server started....')
})



fetch('https://puzzle.mead.io/puzzle').then((response) => {

    response.json().then((data) => {
         console.log(data);
    })
})



