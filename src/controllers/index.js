const actuators = require('./actuators');
const sensors = require('./sensors');
const index = require('express').Router();
const { DB } = require('../db');

index.get('/pi', (req, res) => {
    return res.status(200).json(DB.findDevices());
});

module.exports = exports = [
    index,
    actuators,
    sensors
];