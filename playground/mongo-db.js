const {MongoClient, ObjectID} = require('mongodb')

const obj = new ObjectID()
console.log (obj);

MongoClient.connect( 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server')
    }
    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert todos')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // } )
    // db.collection('Users').insertOne({
    //     name: 'javaboy',
    //     age: 26,
    //     location: 'AcademGorodok'
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // } )

    client.close()
})