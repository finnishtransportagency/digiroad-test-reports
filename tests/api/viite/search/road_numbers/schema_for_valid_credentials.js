const SCHEMA = {
    "type": "array", 
    "minItems": 1, 
    "items": {
        "type": "integer", 
        "minimum": 1, 
        "maximum": 99999
    }
}

module.exports = SCHEMA;
