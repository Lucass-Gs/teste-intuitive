//config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
const app = express()

app.use(cors())

// forma de ler JSON / middlewares
app.use(
      express.urlencoded({
            extended: true
      })
)
app.use(express.json())

//rotas da API
const personRoutes = require('./routes/PersonRoutes')

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {

      //mostrar req
      res.json({ message: 'Oi Express!' })
})

//credenciais para conexão do banco
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

//entregar uma porta
mongoose
      .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.penki.mongodb.net/intuitiveDB?retryWrites=true&w=majority`)
      .then(() => {
            app.listen(3000)
            console.log("API online!")
      })
      .catch((err) => console.log(err))
