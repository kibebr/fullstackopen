const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URI;

(function connect_to_db()
{
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`*- connected to the database.`))
    .catch(err => console.log(`*- error when connecting to the database. ${err}`));
})();

const PersonSchema = new mongoose.Schema(
{
    name: String,
    number: String,
    show: Boolean
});

PersonSchema.set("toJSON", 
{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model("Person", PersonSchema);