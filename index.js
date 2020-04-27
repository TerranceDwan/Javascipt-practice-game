const express = require('express')
const app = express()

app.set('public', __dirname + '/public')
app.set('views', __dirname + '/public/views')

app.use(express.static(app.get('public')))
app.get('/', (req, res) => {
  res.sendFile(app.get('views') + '/index.html')
})

app.listen(3000, () => {
  console.log('Available at localhost:3000')
})
