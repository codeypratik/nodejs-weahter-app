const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.render('main');
})

app.post("", function(req, res){
  var country = req.body.country;
  var city = req.body.city;

  var options={
    url:"https://api.weatherbit.io/v2.0/current",
    method:"POST",
    NS:"",
    qs: {
      city: city,
      key:"d772a561903449d1992742ed1996dfb5",
    },
    headers: {
      "Authorization":"d772a561903449d1992742ed1996dfb5"
    }
  };
  request(options, function(error, response, body){
    if (error){
      console.log("Error");
    }
    else {
          console.log(response.statusCode);
          var data = JSON.parse(body);
          console.log(data.data[0].temp);
          res.render('main',{temp:data.data[0].temp, city:data.data[0].city_name, weather: data.data[0].weather.description});
        }
  });
  console.log(req.body);

});



app.listen(3000, function(){
    console.log("Server running");
});
