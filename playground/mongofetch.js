const {MongoClient, ObjectID} = require('mongodb')

const obj = new ObjectID()
console.log (obj);

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    db.collection('Users').find({name: 'Jen'}).count().then((count) => {
        console.log(`Todos count: ${count}`)
       
    }, (err) => {
        console.log('Unbable to fetch, err')
    })

    client.close()
})