const SCHEMA = {
    "type": "object", 
    "required": ["message"], 
    "properties": {
        "message": {
            "type": "string", 
            "enum": ["Forbidden"]
        }
    }
}

module.exports = SCHEMA;