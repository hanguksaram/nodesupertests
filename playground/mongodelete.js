const {MongoClient, ObjectID} = require('mongodb')

const obj = new ObjectID()
console.log (obj);

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    //deleteMany
    db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result))
    //deleteOne
    //findOneandDelete
    client.close()
})