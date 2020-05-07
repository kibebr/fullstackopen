require('dotenv').config();
const express = require('express');
const shortid = require('shortid');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); 
app.use(express.static('build'));

const Person = require('./models/person');

app.get('/', (req, res) => 
{
    res.send("<h1>Phonebook backend</h1>"); 
});

app.get("/api/persons", (req, res) => 
{
    Person.find({}).then(persons => res.json(persons.map(person => person.toJSON())));
});

app.post("/api/persons", (req, res) => 
{
    const body = req.body;

    if(!(body.name) || !(body.number)){
        return res.status(400).json({error: "content missing!"});
    }
    else{
        const newarr = [];

        const newPerson = new Person({
            id: body.id,
            name: body.name,
            number: body.number,
            show: true,
        });

        newPerson.save().then(savedPerson => res.json(savedPerson.toJSON()));
    }
});

app.get("/api/persons/:id", (req, res) => 
{
    Person.findById(req.params.id)
    .then(person => {
        if(person)
            res.json(person.toJSON());
        else
            res.status(404).send({error: "person not found!"});
    })
    .catch(err => {
        console.log(`*- error finding person. ${err}`);
        req.status(400).send({error: "malformatted id!"});
    });
});

app.delete("/api/persons/:id", (req, res) => 
{
    Person.findByIdAndRemove(req.params.id)
    .then(person => res.status(204).end())
    .catch(err => {
        console.log(`*- error deleting person. ${err}`);
        req.status(404).end();
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});
