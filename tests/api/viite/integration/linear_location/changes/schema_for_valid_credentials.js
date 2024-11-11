const SCHEMA = {
    "type": "array",
    "minItems": 1,
    "items": {
        "type": "object",
        "required": ["side", "linkId", "orderNumber", "roadwayNumber", "adjustedTimestamp", "validFrom", "id", "startMValue", "endMValue", "linkGeomSource"],
        "properties": {
            "side": {
                "type": "integer",
                "minimum": 2,
                "maximum": 3
            },
            "linkId": {
                "type": "string", 
                "pattern": "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}:[0-9]$"
            }, 
            "orderNumber": {
                "type": "number", 
                "minimum": 0
            },
            "roadwayNumber": {
                "type": "integer", 
                "minimum": 1
            }, 
            "adjustedTimestamp": {
                "type": "integer"
            }, 
            "validTo": {
                "type": "string", 
                "pattern": "^([0-2][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$"

            }, 
            "validFrom": {
                "type": "string", 
                "pattern": "^([0-2][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$"
            }, 
            "endAddrValue": {
                "type": "integer", 
                "minimum": 0
            }, 
            "startAddrValue": {
                "type": "integer", 
                "minimum": 0
            }, 
            "id": {
                "type": "integer", 
                "minimum": 1
            }, 
            "endCalibrationPoint": {
                "type": "integer", 
                "minimum": 0
            }, 
            "startMValue": {
                "type": "number", 
                "minimum": 0
            }, 
            "endMValue": {
                "type": "number", 
                "minimum": 0
            }, 
            "linkGeomSource": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 5
            }, 
            "startCalibrationPoint": {
                "type": "integer", 
                "minimum": 0
            }
        }
    }
}

module.exports = SCHEMA;
