
/* const connectToMongo = require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/login', (req, res) => {
  res.send('Hello login!')
})
app.get('/api/v1/signup', (req, res) => {
  res.send('Hello signup!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
}) */

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000

// app.use(cors())
const allowedOrigins = ["http://localhost:3000", "http://localhost:5000"];

app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
); 


app.use(express.json()) //neccessary for using request.body. Its a middleware. Only after this we can send and get data

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})

//https://chat.openai.com/share/8c31d633-a242-4d8f-8759-9cb0b5299045
