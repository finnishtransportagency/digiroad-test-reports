const SCHEMA = {
    "type": "array",
    "minItems": 1,
    "items": {
        "type": "object",
        "required": ["endAddrMValue", "roadPartNumber", "roadwayNumber", "startAddrMValue", "administrativeClass", "track", "roadNumber", "validFrom", "id", "ely", "roadType", "terminated", "createdBy", "startDate", "reversed", "discontinuity"],
        "properties": {
            "endAddrMValue": {
                "type": "integer", 
                "minimum": 0
            },
            "roadPartNumber": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 999
            },
            "endDate": {
                "type": "string", 
                "pattern": "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2]).\\d{4}$"
            },
            "roadwayNumber": {
                "type": "integer", 
                "minimum": 0
            },
            "startAddrMValue": {
                "type": "integer", 
                "minimum": 0
            },
            "administrativeClass": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 3
            },
            "track": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 2
            },
            "validTo": {
                "type": "string", 
                "pattern": "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2]).\\d{4}$"
            },
            "roadNumber": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 99999
            },
            "validFrom": {
                "type": "string", 
                "pattern": "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2]).\\d{4}$"
            },
            "id": {
                "type": "integer", 
                "minimum": 1
            },
            "ely": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 14
            },
            "roadType": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 5
            },
            "terminated": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 2
            },
            "createdBy": {
                "type": "string"
            },
            "roadName": {
                "type": "string"
            },
            "startDate": {
                "type": "string", 
                "pattern": "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2]).\\d{4}$"
            },
            "reversed": {
                "type": "boolean"
            },
            "discontinuity": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 5
            }
        }
    }
}

module.exports = SCHEMA;
