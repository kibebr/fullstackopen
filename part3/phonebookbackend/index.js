const express = require('express');
const shortid = require('shortid');
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan("tiny")); 
app.use(cors()); 
app.use(express.static('build'));

let persons = [
    {
        name: "Vitor Leal",
        number: "786",
        show: true,
        id: shortid.generate()
    },

    {
        name: "David J. Malan",
        number: "450",
        show: true,
        id: shortid.generate()
    },

    {
        name: "Donald J. Trump",
        number: "305",
        show: true,
        id: shortid.generate()
    }
];

app.get('/', (req, res) => 
{
    res.send("<h1>Phonebook backend</h1>");
});

app.get("/info", (req, res) => 
{
    for(var qntypeople = 0; persons[qntypeople] != void 0; ++qntypeople){}
    const date = new Date();

    res.send(`Phonebook has info for ${qntypeople} people\n${date}`);
});

app.get("/api/persons", (req, res) => 
{
    res.json(persons);
});

app.post("/api/persons", (req, res) => 
{
    console.log(req.body);
    const body = req.body;

    if(!(body.name) || !(body.number)){
        return res.status(400).json({error: "content missing!"});
    }
    else{
        const newarr = [];

        for(var i = 0, len = persons.length; i < len; ++i){
            if(persons[i].name == body.name){
                return res.status(400).json({error: "name is already added!"});
            }
            else{
                newarr[i] = persons[i];
            }
        }

        const newPerson = {
            id: body.id,
            name: body.name,
            number: body.number,
            show: body.show,
        };

        newarr[i] = newPerson;
        persons = newarr;

        res.status(204).end();
    }
});

app.get("/api/persons/:id", (req, res) => 
{
    const id = req.params.id;

    if(!(foundPerson = persons.find(person => person.id == id))){
        return res.status(404).json({error: "person not found!"});
    }
    else{
        res.json(foundPerson);
    }
});

app.delete("/api/persons/:id", (req, res) => 
{
    const id = req.params.id;
    
    persons = persons.filter(person => person.id != id);
    console.table(persons);
    res.status(204).end();
});


const PORT = 3001;
app.listen(PORT, () => 
{
  console.log(`Server running on port ${PORT}`);
});