const SCHEMA = {
    "type": "array",
    "minItems": 1,
    "items": {
        "type": "object",
        "required": ["road_number", "names"],
        "properties": {
            "road_number": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 99999
            },
            "names": {
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "object",
                    "required": ["created_by", "start_date", "road_name", "end_date", "change_date"], 
                    "properties": {
                        "created_by": {
                            "type": "string"
                        },
                        "start_date": {
                            "anyOf": [
                                {
                                    "type": "string", 
                                    "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                                }, 
                                {
                                    "type": "string", 
                                    "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                                }
                            ]
                        },
                        "road_name": {
                            "type": ["string",  "null"]
                        },
                        "end_date": {
                            "anyOf": [
                                {
                                    "type": "null"
                                }, 
                                {
                                    "type": "string", 
                                    "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                                }
                            ]
                        },
                        "change_date": {
                            "type": "string", 
                            "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                        }
                    }
                }
            }
        }
    }
}

module.exports = SCHEMA;
