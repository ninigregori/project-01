var request = require('request');

var options = { method: 'GET',
                   url: 'http://api.openweathermap.org/data/2.5/weather',
                    qs: { q: '',
                      APPID: '4fd8ab9649f81ad2e6e9a02464bc6c3f',
                      units: 'metric'}
              };

module.exports = function (robot) {

  return robot.hear(/weather (.*)/i, function (msg)  {

    options.qs.q = msg.match[1];
    request(options, function (error, response, body)  {

      if (error) throw new Error(error);
      var condition = JSON.parse(body);
      var message ="*Condition:* " + condition.weather[0].description + " *Temperature:* " + condition.main.temp + "ºC " + "Wind" + condition.wind.speed + "Km/h" 
      // var message = `*Condition:* ${condition.weather[0].description}\n*Temperature:* ${condition.main.temp}ºC\n*Wind:* ${condition.wind.speed}Km/h`;
      return msg.send(message);
    });
  });

}; // end module exports