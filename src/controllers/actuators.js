const express = require('express');
const router = express.Router();
const { DB } = require('../db');

router.get('/pi/actuators', (req, res) => {
    res.status(200).json(DB.findActuators());
});

router.get('/pi/actuators/leds', (req, res) => {
    res.status(200).json(DB.findLEDs());
});

router.get('/pi/actuators/leds/:id', (req, res) => {
    const led = DB.findOneLED(req.params.id);
    if (led) {
        res.status(200).json(led);
    } else {
        res.status(404).json({
            error: 'LED not found'
        });
    }
});

router.put('/pi/actuators/leds/:id', (req, res) => {
    const newLed = DB.updateOneLED(req.params.id, req.body);
    if (newLed) {
        res.status(200).json(newLed);
    } else {
        res.status(404).json({
            error: "LED not found"
        })
    }
});

module.exports = exports = router;