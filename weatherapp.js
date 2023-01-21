window.onload = startApp;
const image = document.querySelector('#photo');
const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');
const cloudPerc = document.querySelector('#cloudPerc');
const windSpeed = document.querySelector('#windSpeed');
const sunRise = document.querySelector('#sunRise');
const sunSet = document.querySelector('#sunSet');
var latitude;
var longitude;
const apiKey = "30bee0a5d85e04219348a2038792e25a";
function startApp(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                latitude =position.coords.latitude;
                longitude = position.coords.longitude;
                getWeatherData();
            }
        );
    }
}
function getWeatherData(){
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetch(url).then(
        response => response.json()
    ).then(data => changeData(data))
}

function changeData(data){
    console.log(data)
    image.src =  'http://openweathermap.org/img/wn/'+ data.weather[0].icon+'@2x.png';
    city.innerHTML = data.name;
    city.href = `https://openstreetmap.org/#map=10/${latitude,longitude}`
    temp.innerHTML = data.main.temp +'°C';
    humidity.innerHTML = data.main.humidity + '%';
    pressure.innerHTML = data.main.pressure + 'HpA';
    cloudPerc.innerHTML = data.clouds.all + '%';
    windSpeed.innerHTML = data.wind.speed + 'km/h';
    if(new Date(data.sys.sunrise * 1000).getMinutes().toString().length==1){
        sunRise.innerHTML = new Date(data.sys.sunrise * 1000).getHours() + ':' + new Date(data.sys.sunrise * 1000).getMinutes()+'0';
    }else{
        sunRise.innerHTML = new Date(data.sys.sunrise * 1000).getHours() + ':' + new Date(data.sys.sunrise * 1000).getMinutes();
    }
    if(new Date(data.sys.sunset * 1000).getMinutes().toString().length==1){
        sunSet.innerHTML = new Date(data.sys.sunset * 1000).getHours() + ':' + new Date(data.sys.sunset * 1000).getMinutes()+'0';
    }else{
        sunSet.innerHTML = new Date(data.sys.sunset * 1000).getHours() + ':' + new Date(data.sys.sunset * 1000).getMinutes();
    }
}
