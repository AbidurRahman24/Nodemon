const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

const password = "4!xjgbYE7r2SDru"

const app = express()
// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))


const uri = "mongodb+srv://BDuser:4!xjgbYE7r2SDru@cluster0.zbtoj.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

client.connect(err => {
  const collection = client.db("organicdb").collection("products");
//read
  app.get('/products', (req, res) =>{
    collection.find({})
    .toArray( (err, documents) =>{
      res.send(documents)
    })
  })

// single product
app.get('/product/:id', (req, res) =>{
  collection.find({_id: ObjectId(req.params.id)})
  .toArray( (err, documents) =>{
    res.send(documents[0])
  })
})

  // post method
  app.post('/addProduct', (req, res) => {
    const product = req.body;
    collection.insertOne(product)
    .then(result =>{
      console.log('product added');
      res.send('success')
    })
  })

  app.delete('/delete/:id', (req, res)=>{
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(err, result =>{
      console.log(result);
    })
  })

  


});

app.listen(3000)













// perform actions on the collection object
// const product = {name: 'Kejor', price: 100, quentity: 1}
// collection.insertOne(product)
// .then(result => {
//   // process result
//   console.log("product added");
// })
// console.log("database connected");