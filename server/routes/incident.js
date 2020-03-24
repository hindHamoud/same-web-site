const express = require('express');
const router = express.Router();
const { Incident} = require("../models/incident");

router.route('/').get((req,res)=>{
    Incident.find()
    .then(incident=>res.json(incident))
    .catch(err=>res.status(400).json('Error: '+err));
    });

    router.route("/add").post((req, res) => {
        const name =req.body.name;
        const admin =req.body.admin;
        const responsibles =req.body.responsibles;
        const degree =req.body.degree;
        const process =req.body.process;
        const probability =req.body.probability;

        const newIncident= new Incident({
            name,
            admin,
            responsibles,
            process,
            degree,
            probability ,
            
        })
    
        newIncident.save() 
            .then(()=>res.json('Incident add'))
            .catch((err=>res.status(400).json('Error: '+err)))
            });
        

    module.exports = router;