const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('you must provide password');
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://nikyarunindev:${password}@cluster0.vgo8niq.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
});

const Person = mongoose.model('Person', personSchema);

const addPerson = (name, number) => {
    const person = new Person({
        name: name,
        number: number
    });

    person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    });
};

const fetchPersons = (filter) => {
    Person.find(filter || {}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
};

if (process.argv.length === 3) {
    fetchPersons();
}
else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    addPerson(name, number);
}
else {
    console.log('wrong number of arguments');
    process.exit(2);
}