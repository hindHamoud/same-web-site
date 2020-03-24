const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incidentSchema = mongoose.Schema({
    name: {
        type:String,
    },
    admin:{
        type: Schema.Types.ObjectId,
       ref: 'User'
    },
    responsibles:{
        type: [Schema.Types.ObjectId],
       ref: 'User'
    },
    degree:{
        type:String,
    },
    probability:{
        type:String,
    },

    process : {
        type:String,
    }
})
const Incident = mongoose.model('Incident', incidentSchema);

module.exports = { Incident }