const express = require('express')
var cors = require('cors')
const app = express()
app.use(express.json())
const port = 4000

app.use(cors())

let data = {}
let lastId= 0;

app.get('/phonebook', (req, res) => {
  res.json(data)
})

app.post('/phonebook', (req, res) => {
  lastId++;
  data[lastId] = {
    id: lastId,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  res.json(data)
})

app.put('/phonebook/:id', (req, res) => {
  if(!req.params.id && !(req.params.id in data)){
    res.send('Invalid Id')
  }
  data[req.params.id] = {
    id: req.params.id,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }
  res.json(data)
})

app.delete('/phonebook/:id', (req, res) => {
  if(!req.params.id && !(req.params.id in data)){
    res.send('Invalid Id')
  }
  delete data[req.params.id]
  res.json(data)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})