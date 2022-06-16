const mongoose = require('mongoose');
const { defaultCreditCard, defaultPhoneCard } = require('../middleware/default_data');
const MONGO_URI = "mongodb+srv://hoangdat6353:admin@usermanager.yayda.mongodb.net/webadvancedfinal?retryWrites=true";

const Connect = async () => {
    try {
        // mongodb clund connection
        const con = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        defaultCreditCard();
        defaultPhoneCard();

        console.log(`MongoDB Connected : ${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = Connect