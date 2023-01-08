const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;

console.log("Connecting");

mongoose
    .connect(url)
    .then((result) => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, "Name required."],
        unique: true,
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d{1,9}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid phone number`,
        },
        required: [true, "Number required."],
    },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
