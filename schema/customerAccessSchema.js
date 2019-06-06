(function () {
    let mongoose = require('./dbConnect');
    let customerConfigSchema = mongoose.Schema({
        shop: String,
        // id:{type:String,unique:true},
        // token: {type:String,unique:true},
        id: String,
        token: String,
        config:Object,
        createdAt:Number,
        modifiedAt: Number
    });

    let CustomerConfig = mongoose.model("customer-config", customerConfigSchema);

    module.exports = CustomerConfig;
})();
