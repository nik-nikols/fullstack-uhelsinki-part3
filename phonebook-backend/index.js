const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person');

const app = express()


morgan.token('body', (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : ' ')
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    let maxId = Math.round((Math.random() * 10000))

    while (persons.find(person => person.id === maxId)) {
        maxId = Math.round((Math.random() * 10000))
    }

    return maxId
}

app.get('/info', (request, response) => {
    const dateNow = new Date(Date.now())
    const reply = `<p>Phonebook has info for ${persons.length} people</p><p>${dateNow}</p>`

    response.send(reply)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people);
    });
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        }
        else {
            response.status(404).end();
        }
    })
    .catch(error => {
        next(error);
    });
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        return response.status(204).end()
    })
    .catch(error => {
        next(error);
    });
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).send('name is missing')
    }

    if (!body.number) {
        return response.status(400).send('number is missing')
    }

    // if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    //     return response.status(400).send('name must be unique')
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson);
    });

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
        response.json(updatedPerson);
    })
    .catch(error => {
        next(error);
    });
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
}

app.use(errorHandler);

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
