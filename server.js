require('./config')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/users')
const app = express()

app.use(bodyParser.json())
app.use((reqs, resp, next) => {
    console.log(reqs.params)
    next()
})
app.get('/todos/:id', (reqs, resp) => {
    if (!ObjectID.isValid(reqs.params.id))
        return resp.status(400).send('Bad data request')
    Todo.findById(reqs.params.id)
        .then((todo) => {
            if (!todo) {
                resp.status(404).send('Todo was not found')
            } else {
                resp.status(200).json(todo)} }, 
        (e) => resp.status(500).send('Server error'))
})
app.get('/todos', (request, response) => {
    
    Todo.find().then((data) => {
        response.json(data)
    }, (err) => {
        response.status(500).send(err)
    })
})
app.post('/todos', (request, response) => {
    const todo = new Todo({
        text: request.body.text
    })
    todo.save().then((doc) => {
        response.send(doc)
    }, (err) => {
        response.status(400).send(err)
    })
})
//best practice for patch's body: {"op": "replace", "path": /model'sPropertyName, "value": ...}
app.patch('/todos/:id', (reqs, resp) => {
    debugger;
    if (!ObjectID.isValid(reqs.params.id))
        return resp.status(400).send('Bad data request')
    Todo.findByIdAndUpdate(reqs.params.id, 
                    {$set: {[reqs.body.path.replace('/', '')]: reqs.body.value}},
                    {new: true})
        .then((todo) => {
            if (!todo)
                return resp.status(404).send('Todos dosnt exist') 
            resp.status(200).json(todo)
        }, e => resp.status(500).send('Internal server error'))
    }
    
)
app.delete('/todos/:id', (reqs, resp) => {

    if (!ObjectID.isValid(reqs.params.id))
        return resp.status(400).send('Bad data request')
    Todo.findByIdAndRemove(reqs.params.id)
        .then((todo) => {
            if (!todo)
                return resp.status(404).send('Todos not found')
            resp.status(200).send('Todo was deeleted')
        }, 
        (e) => resp.status(500).send('Internal server error')
        )
})
app.listen(process.env.PORT, () => {
    console.log('Started on port 3000')
})
// const hbs = require('hbs')
module.exports = {app}

// const newTodo = new Todo({
//     text: '     Edit this video   '
// })

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc)
// }, (e) => {
//     console.log('Unable to save todo')
// })





// const app = express()
// const fs = require('fs')

// hbs.registerPartials(__dirname + '/views/partials')
// app.set('view engine', 'hbs')
// //middleware for hosting static files
// app.use(express.static(__dirname + '/public'))
// app.use((request, response, next) => {
//     var now = new Date().toString();
//     var log = `${now}: ${request.method} ${request.url}`
//     console.log(log)
//     fs.appendFile('server.log', log + '\n', (err) => {
//         if (err) console.log('Unable to append to server.log')
//     })
//     next()
// })
// // app.use((request, responfse, next) => {
// //     response.render('something.hbs')
// // })
// hbs.registerHelper('getCurrentYear', () => {
//     return new Date().getFullYear()
// })
// hbs.registerHelper('screamIt', (text) => {
//     return text.toUpperCase();
// })
// app.get('/', (request, response) => {
//     response.render('home.hbs', {
//         headerText: 'Homeheader',
//         pageTitle: 'Hom page',
//         welcomeMessage: 'Hello World'
//     })
// })
// app.get('/about', (request, response) => {
//     response.render('about.hbs', {
//         headerText: 'aboutHeader',
//         pageTitle: 'About Page',
        
//     })
// })
// // app.get('/help', (request, response) => {
// //     response.send()
// // })
// app.listen(3000, () => {
//     console.log('server was started')
// })
//User
