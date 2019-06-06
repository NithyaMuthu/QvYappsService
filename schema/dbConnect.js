(function () {
    let mongoose = require('mongoose');
    const mongoUser = process.env.MONGO_USER;
    const mongoPWD = process.env.MONGO_KEY;
    const mongoDB = process.env.MONGO_DB || 'test';
    let mongoURI = `mongodb+srv://${mongoUser}:${mongoPWD}@quickview-7rdgl.mongodb.net/${mongoDB}?retryWrites=true`;
    mongoose.connect(mongoURI, {useNewUrlParser: true, useFindAndModify:false});
    module.exports = mongoose;
})();
