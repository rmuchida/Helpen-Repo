// Imports
require('dotenv').config() //cause process.env to have all key value pairs in .env
const express = require('express')
const axios = require('axios');
const path = require('path')

const app = express()
const port = 3000

/* middlewares to process json bodies */
/* safeguard for not messing up json due to url character not being url friendly */
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  res.render('pages/about', { text: 'About Page' })
})

app.get('/data', async (req, res) => {
  // const {type} = req.query
  const { baseId, tableIdOrName, recordId } = req.params //gets and sets baseId, tableIdOrName, and recordId from req.params
  // baseId = 'oIWeR7ljtwSxCM' //our base id which can be found in the airtable portal's url
  const url = `https://api.airtable.com/v0/appoIWeR7ljtwSxCM/tblqpJqY2tvAhKcUM`;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

  const response = await axios.get(url, config);
  //res.json(response.data);
  const records = response.data.records.filter((record) => {
    return Object.entries(record.fields).length //&& (record.fields.Type == type || !type)
  })
  res.render('pages/index', { 'organizationData': records });
})

app.post('/connections', async (req, res) => {
  const url = `https://api.airtable.com/v0/appoIWeR7ljtwSxCM/tbldDr7K2Dil5XvfH`;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`
    }
  };

  const response = await axios.post(url, {
    "fields": {
      ...req.body, "orgID-email": req.body.orgID + req.body.email
    }
  }, config);
  const data = response.data
  res.json(data)
})

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))

