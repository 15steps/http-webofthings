const express = require('express');
const router = express.Router();

const { DB } = require('../db');

router.get('/pi/sensors', (req, res) => {
    res.status(200).json(DB.findSensors());
});

router.get('/pi/sensors/temperature', (req, res) => {
    res.status(200).json(DB.findSensors('temperature'));
});

router.get('/pi/sensors/light', (req, res) => {
    res.status(200).json(DB.findSensors('light'));
});

router.get('/pi/sensors/buttons', (req, res) => {
    res.status(200).json(DB.findSensors('buttons'));
});

router.get('/pi/sensors/buttons/:id', (req, res) => {
    const button = DB.findSensors('buttons', +req.params.id);
    if (button) res.status(200).json(button);
    else res.status(404).json({
        error: 'Button not found'
    });
});

router.get('/pi/sensors/accel', (req, res) => {
    res.status(200).json(DB.findSensors('accel'));
});

router.get('/pi/sensors/accel/:component', (req, res) => {
    const value = null || DB.getSensorValue('accel', req.params.component);
    if (value !== null) {
        res.status(200).json({value})
    } else {
        res.status(404).json({
            error: 'Component not found'
        });
    }
});

router.get('/pi/sensors/tilt', (req, res) => {
    res.status(200).json(DB.findSensors('tilt'));
});

router.get('/pi/sensors/tilt/:component', (req, res) => {
    const value = null || DB.getSensorValue('tilt', req.params.component);
    if (value !== null) {
        res.status(200).json({value})
    } else {
        res.status(404).json({
            error: 'Component not found'
        });
    }
});

module.exports = exports = router;