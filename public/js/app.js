console.log('Client side javascript file is loaded!')


document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    fetch('/weather?address='+document.querySelector('input').value).then((response) => {
        response.json().then((data) => {

            if(data.error){
                document.querySelector('#error1').textContent = data.error;
                document.querySelector('#message1').textContent = '';
                document.querySelector('#message2').textContent = '';
                console.log(data.error)
            }else{
                document.querySelector('#message1').textContent = data.Weather_forecast;
                document.querySelector('#message2').textContent = data.location;
                document.querySelector('#error1').textContent = '';

            }
        })
})
})