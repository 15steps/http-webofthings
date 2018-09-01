// Mock de um banco de dados
const randomInt = (low, high) => {
    return Math.floor(Math.random() * (high - low) + low);
}

const randomDouble = (low, high) => {
    return (Math.random() * (high - low) + low).toFixed(2);
}

const _db = {
    pi: {
        id: 1,
        name: "Raspberry Pi B+",
        url: "localhost:8080/pi",
        resources: {
            actuators: {
                leds: {
                    rbgled01: {
                        id: 1,
                        name: "RGB Led 01",
                        r: 0,
                        g: 0,
                        b: 255
                    },
                    rgbled02: {
                        id: 2,
                        name: "RGB Led 02",
                        r: 0,
                        g: 255,
                        b: 0
                    },
                    rbgled03: {
                        id: 3,
                        name: "RGB Led 03",
                        r: 255,
                        g: 0,
                        b: 0
                    }
                }
            },
            sensors: {
                light: {
                    id: 1,
                    name: "Light Sensor 01",
                    value: randomInt(600, 1200)
                },
                temperature: {
                    id: 1,
                    name: "Temperature sensor 01",
                    value: randomDouble(20, 40)
                },
                buttons: {
                    button01: {
                        id: 1,
                        name: "Button 01",
                        value: 0
                    },
                    button02: {
                        id: 2,
                        name: "Button 02",
                        value: 1
                    }
                },
                accel: {
                    id: 1,
                    name: "Accelerometer Sensor 01",
                    x: 10,
                    y: 100,
                    z: 4
                },
                tilt: {
                    id: 1,
                    name: "Gyroscope Sensor 01",
                    x: 5,
                    y: 120,
                    z: 42
                }
            }
        }
    }
}

const DB = {};

DB.findDevices = () => {
    return _db;
}

DB.findActuators = () => {
    return _db.pi.resources.actuators;
}

DB.findLEDs = () => {
    return _db.pi.resources.actuators.leds;
}

DB.findOneLED = (id=0) => {
    const leds = _db.pi.resources.actuators.leds;
    for (key in leds) {
        if(leds[key].id === +id) return leds[key];
    }
    return null;
}

DB.updateOneLED = (id=0, newLed) => {
    const led = DB.findOneLED(id);
    const leds = _db.pi.resources.actuators.leds;
    if (led) {
        for (const [key, value] of Object.entries(leds)) {
            if (value.id === +id) {
                leds[key].r = newLed.r || value.r;
                leds[key].g = newLed.g || value.g;
                leds[key].b = newLed.b || value.b;
                return leds[key];
            }
        }
    }
    return null;
}

DB.findSensors = (name="", id=0) => {
    if (name) {
        if (id) {
            for (const [key, value] of Object.entries(_db.pi.resources.sensors[name])) {
                if (value.id === +id) return value;
            }
            return null;
        }
        return _db.pi.resources.sensors[name];
    }
    return _db.pi.resources.sensors;
}

DB.getSensorValue = (name="", component="") => {
    if (name && component) {
        return _db.pi.resources.sensors[name][component];
    }
    return null;
}

module.exports.DB = DB;