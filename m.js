var textlinesEl = document.querySelector("#textlines");
var searchHistoryFormEl = document.querySelector("#notes");
var displayDivEl = document.querySelector("#display");
var locationInputEl = document.querySelector("#searchInput");
var apiKey = "&appid=38b9f7071f9eafef52b0970c1e55a172";
var iconURL = "https://openweathermap.org/img/wn/";
var baseURL = "https://api.openweathermap.org/data/2.5/";
var oneCall = "onecall?";
var cityCall = "weather?q=";
var cCode = ",us";
var units = "&units=imperial";
var latPar = "lat=";
var lonPar = "&lon=";
var exclude = "&exclude=hourly,minutely,alerts";
var city = "";
var state = "";
var searchHistory = [];
var weather = [];


var goplaces = function(local) {
    city = local.split(", ")[0];
    state = local.split(", ")[1];
    
    fetch(baseURL + cityCall + city + "," + state + cCode + units + apiKey)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(locationData) {
                var lat = locationData.coord.lat;
                var lon = locationData.coord.lon;
                getWeather(lat,lon);
            })
        } else {
            document.location.reload()
        }
    });
};


var getWeather = function(lat,lon) {
    fetch(baseURL + oneCall + latPar + lat + lonPar + lon + exclude + units + apiKey)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                weather = data;

                $("#today:first-child").remove();
                $("#forecast:first-child").remove();

               
                var todayDivEl = document.createElement("div");
                todayDivEl.classList = "row";
                todayDivEl.setAttribute("id", "today");

                
                var city1 = city.split(" ")[0];
                var city2 = city.split(" ")[1];
            
                if (city2) {
                    city = city1.charAt(0).toUpperCase() + city1.slice(1) + 
                        " " + city2.charAt(0).toUpperCase() + city2.slice(1);
                } else {
                    city = city.charAt(0).toUpperCase() + city.slice(1);
                }
            
                state = state.charAt(0).toUpperCase() + state.charAt(1).toUpperCase();

               
                var todayH3El = document.createElement("h3");
                todayH3El.classList = "col-12";
                todayH3El.setAttribute("id", "city");
                todayH3El.textContent = city + ", " + state + "  " + moment().format('l');
                todayDivEl.appendChild(todayH3El);

                
                var todayIcon = weather.current.weather[0].icon + ".png";
                var todayDesc = weather.current.weather[0].description;
                var cityImg = document.createElement("img");
                cityImg.setAttribute("src", iconURL + todayIcon);
                cityImg.setAttribute("alt", iconURL + todayDesc);
                todayH3El.appendChild(cityImg);

               
                var tempTodayPEl = document.createElement("p");
                tempTodayPEl.classList = "col-12";
                tempTodayPEl.innerHTML = "Temp: " + "<span id='temp'></span>";
                todayDivEl.appendChild(tempTodayPEl);

                
                var windTodayPEl = document.createElement("p");
                windTodayPEl.classList = "col-12";
                windTodayPEl.innerHTML = "Wind: " + "<span id='wind'></span>";
                todayDivEl.appendChild(windTodayPEl);

                
                var humidityTodayPEl = document.createElement("p");
                humidityTodayPEl.classList = "col-12";
                humidityTodayPEl.innerHTML = "Humidity: " + "<span id='humidity'></span>";
                todayDivEl.appendChild(humidityTodayPEl);

                
                var uvTodayPEl = document.createElement("p");
                uvTodayPEl.classList = "col-12 uv";
                uvTodayPEl.innerHTML = "UV Index: " + "<span id='uv'></span>";
                todayDivEl.appendChild(uvTodayPEl);

                
                displayDivEl.appendChild(todayDivEl);                

                
                var tempEL = document.querySelector("#temp");
                tempEL.textContent = weather.current.temp + "\u00B0" + "F";

                
                var windEL = document.querySelector("#wind");
                windEL.textContent = weather.current.wind_speed + " " + "MPH";

               
                var humidityEL = document.querySelector("#humidity");
                humidityEL.textContent = weather.current.humidity + "%";

              
                var uvEL = document.querySelector("#uv");
                var uv = weather.current.uvi;
                uvEL.textContent = uv;

                
                if (uv <= 3.0) {
                    uvEL.className = "uv_green";
                } else if (uv >= 3.0 && uv < 6.0) {
                    uvEL.className = "uv_yellow";
                } else if (uv >= 6.0 && uv < 8.0) {
                    uvEL.className = "uv_orange";
                } else if (uv >= 8.0 && uv < 11.0) {
                    uvEL.className = "uv_red";
                } else if (uv >= 11.0) {
                    uvEL.className = "uv_purple";
                }

               
                var forecastDivEl = document.createElement("div");
                forecastDivEl.classList = "row";
                forecastDivEl.setAttribute("id", "forecast");

               
                var forecastH3El = document.createElement("h3");
                forecastH3El.classList = "col-xs-6 col-sm-12";
                forecastH3El.setAttribute("id", "5day");
                forecastH3El.textContent = "5-Day Forecast:";
                forecastDivEl.appendChild(forecastH3El);

                
                var futureDivContainerEl = document.createElement("div");
                futureDivContainerEl.classList = "row";
                forecastDivEl.appendChild(futureDivContainerEl);

                displayDivEl.appendChild(forecastDivEl);

                for (var i = 0; i < 5; i++) {
                    
                    var futureDivEl = document.createElement("div");
                    futureDivEl.classList = "col-xs-6 col-sm-4 col-md-3 col-xl-2 future";
                    futureDivEl.setAttribute("id", "card");

                    
                    var futureH4El = document.createElement("h4");
                    futureH4El.setAttribute("id", "date");
                    futureDivEl.appendChild(futureH4El);

                   
                    var futureImageEl = document.createElement("img");
                    futureImageEl.setAttribute("id", "icon");
                    futureDivEl.appendChild(futureImageEl);

                   
                    var futureTempPEl = document.createElement("p");
                    futureTempPEl.innerHTML = "Temp: " + "<span id='temp" + [i] + "'></span>";
                    futureDivEl.appendChild(futureTempPEl);

                   
                    var futureWindPEl = document.createElement("p");
                    futureWindPEl.innerHTML = "Wind: " + "<span id='wind" + [i] + "'></span>";
                    futureDivEl.appendChild(futureWindPEl);

                    
                    var futureHumidityPEl = document.createElement("p");
                    futureHumidityPEl.innerHTML = "Humidity: " + "<span id='humidity" + [i] + "'></span>";
                    futureDivEl.appendChild(futureHumidityPEl);

                    futureDivContainerEl.appendChild(futureDivEl);

                  
                    futureH4El.textContent = moment().add(parseInt([i]) + 1, 'd').format("M/D/YYYY");

                    // create icon
                    var todayIcon = weather.daily[i].weather[0].icon + ".png";
                    var todayDesc = weather.daily[i].weather[0].description;
                    var cityImg = document.createElement("img");
                    futureImageEl.setAttribute("src", iconURL + todayIcon);
                    futureImageEl.setAttribute("alt", iconURL + todayDesc);

                    
                    tempEL = document.querySelector("#temp" + [i]);
                    tempEL.textContent = weather.daily[i].temp.max + " \u00B0" + "F";
    
                   
                    windEL = document.querySelector("#wind" + [i]);
                    windEL.textContent = weather.daily[i].wind_speed + " MPH";
    
                    
                    humidityEL = document.querySelector("#humidity" + [i]);
                    humidityEL.textContent = weather.daily[i].humidity + " %";
                }
            })
        }
    })
}

// search when search form used
var formSubmitHandler = function(event) {
    event.preventDefault();

    var local = locationInputEl.value.trim();

    if (!local.includes(",")) {
        errorPrompt();
        return;
    }

    locationInputEl.value = "";

    if (local) {
        getLocation(local);
    } else {
        alert("Please enter a valid location.");
    }

    if (local) {
        var button = document.createElement("button");
        button.classList = "col-12 text-Button";
        button.setAttribute("id", "text-Button");
        button.setAttribute("type", "submit");
        button.setAttribute("form", "text-Button");
        button.setAttribute("value", local);
        button.textContent = local;
    
        var form = document.querySelector("#notes");
    
        form.appendChild(button);
        if (searchHistory.length >= 10) {
            var tempHistory = text.slice(-9);
            searchHistory = text;
            text.push(local);
            saveHistory();
            $(".searchHistoryButton:first-child").remove();
        } else {
            text.push(local);
            saveHistory();
        }
    }
    
    
};

// search when history item clicked
var formHistorySubmitHandler = function(event) {
    event.preventDefault();

    var locale = event.target.outerText;

    if (locale) {
        getLocation(locale);
    }
};

// save to local storage
var saveHistory = function() {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};

// load search history
var loadHistory = function() {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    if (!searchHistory) {
        searchHistory = [];
        saveHistory();
    }


    for (var i = 0; i < searchHistory.length; i++) {
        var local = searchHistory[i];
    
        var button = document.createElement("button");
        button.classList = "col-12 searchHistoryButton";
        button.setAttribute("id", "searchHistoryButton");
        button.setAttribute("type", "submit");
        button.setAttribute("form", "searchHistoryButton");
        button.setAttribute("value", local);
        button.textContent = local;
    
        var form = document.querySelector("#search_history");
        
        form.appendChild(button);
    }
};


var errorPrompt = function() {
    document.location.reload();
}

loadHistory();

searchFormEl.addEventListener("submit", formSubmitHandler);
searchHistoryFormEl.addEventListener("click", formHistorySubmitHandler);