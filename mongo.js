const mongoose = require("mongoose");

if (process.argv.length < 5) {
    console.log(
        "Please provide the password, name and number arguments: node mongo.js <password> <name> <number>"
    );
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook-admin:${password}@cluster0.o5pk6.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
    .connect(url)
    .then((result) => {
        console.log("Connected");

        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        });
        return person.save();
    })
    .then(() => {
        console.log("Person saved!");
    })
    .then(() => {
        Person.find({}).then((persons) => {
            console.log("persons: ");
            persons.forEach((person) =>
                console.log(`${person.name} ${person.number}`)
            );
            mongoose.connection.close();
        });
    })
    .catch((err) => console.log(err));
