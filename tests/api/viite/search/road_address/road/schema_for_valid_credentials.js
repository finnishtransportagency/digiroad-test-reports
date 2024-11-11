const SCHEMA = {
    "type": "array", 
    "minItems": 1, 
    "items": {
        "type": "object", 
        "required": ["linkId", "roadPartNumber", "startAddrM", "endAddrM", "track", "roadNumber", "sideCode", "id", "startMValue", "endMValue"], 
        "properties": {
            "linkId": {
                "type": "string", 
                "pattern": "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}:[0-9]$"
            }, 
            "roadPartNumber": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 999
            }, 
            "startAddrM": {
                "type": "integer", 
                "minimum": 0
            }, 
            "endAddrM": {
                "type": "integer", 
                "minimum": 0
            }, 
            "track": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 2
            }, 
            "roadNumber": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 99999
            }, 
            "sideCode": {
                "type": "integer", 
                "minimum": 2, 
                "maximum": 3
            }, 
            "id": {
                "type": "integer", 
                "minimum": 1
            }, 
            "startMValue": {
                "type": "number", 
                "minimum": 0
            }, 
            "endMValue": {
                "type": "number", 
                "minimum": 0
            }
        }
    }
}

module.exports = SCHEMA;