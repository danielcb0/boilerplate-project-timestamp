// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

// API endpoint para manejar fechas específicas
app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;

  // Si no se proporciona ninguna fecha, usa la fecha actual
  if (!dateString) {
    let currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }

  // Intentar crear una fecha a partir del parámetro proporcionado
  let date = new Date(dateString);

  // Si la fecha es inválida, intentar convertir el parámetro a un número y crear una fecha de nuevo
  if (isInvalidDate(date)) {
    date = new Date(parseInt(dateString));
  }

  // Si aún no es una fecha válida, responde con un error
  if (isInvalidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  // Responde con la fecha en formato UNIX y UTC
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
