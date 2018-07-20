const {MongoClient, ObjectID} = require('mongodb')

const obj = new ObjectID()
console.log (obj);

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    db.collection('Users').findOneAndUpdate(
        {_id: new ObjectID("5b50a0fbda21fb312cd26d4a")},
        {
            $set:{ name: 'Arthur' },
            $inc:{ age: 1}
        },
        {returnOriginal: false}).then((result) => {
            console.log(result)
        })

    client.close()
})