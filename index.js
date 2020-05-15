const express = require('express')

const app = express()

const port = process.env.PORT || 3000

app.set('public', __dirname + '/public')
app.set('views', __dirname + '/public/views')

app.use(express.static(app.get('public')))
app.get('/', (req, res) => {
  res.sendFile(app.get('views') + '/index.html')
})

app.listen(port, () => {
  console.log('Available at localhost:3000')
})
