(function () {
    let mongoose = require('./dbConnect');
    let customerShopSchema = mongoose.Schema({
        shop: String,
        token:String,
        id:Number,
        name:String,
        email:String,
        domain:String,
        province:String,
        country:String,
        address1:String,
        zip:String,
        city:String,
        shop_owner:String,
        money_format:String,
        money_with_currency_format:String,
        myshopify_domain:String,
        createdAt:Number,
        modifiedAt: Number
    });

    let CustomerShop = mongoose.model("customer-shop", customerShopSchema);

    module.exports = CustomerShop;
})();
