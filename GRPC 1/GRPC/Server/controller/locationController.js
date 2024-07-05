const location = require('../model/location')

module.exports.get_data = async () => {
    try{
        const locations = await location.find({});
        return locations
    } catch(error){
        return res.status(401).json(error);
    }
}