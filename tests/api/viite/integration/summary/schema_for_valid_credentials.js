const SCHEMA = {
    "type": "array", 
    "minItems": 1, 
    "items": {
        "type": "object", 
        "required": ["roadnumber", "roadname", "roadparts"], 
        "properties": {
            "roadnumber": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 99999
            }, 
            "roadname": {
                "type": ["string",  "null"]
            }, 
            "roadparts": {
                "type": "array", 
                "minItems": 1, 
                "items": {
                    "type": "object", 
                    "required": ["roadpartnumber", "ely", "administrative_class",  "tracks"], 
                    "properties": {
                        "roadpartnumber": {
                            "type": "integer", 
                            "minimum": 1,
                            "maximum": 999
                        }, 
                        "ely": {
                            "type": "integer", 
                            "minimum": 1, 
                            "maximum": 14
                        }, 
                        "administrative_class": {
                            "type": "integer", 
                            "minimum": 1, 
                            "maximum": 3
                        }, 
                        "tracks": {
                            "type": "array", 
                            "minItems": 1, 
                            "items": {
                                "type": "object", 
                                "required": ["track", "startaddressM", "endaddressM"], 
                                "properties": {
                                    "track": {
                                        "type": "integer", 
                                        "minimum": 0, 
                                        "maximum": 2
                                    }, 
                                    "startaddressM": {
                                        "type": "integer", 
                                        "minimum": 0, 
                                        "maximum": 99999
                                    }, 
                                    "endaddressM": {
                                        "type": "integer", 
                                        "minimum": 0, 
                                        "maximum": 99999
                                    }, 
                                    "continuity": {
                                        "type": "integer", 
                                        "minimum": 1, 
                                        "maximum": 4 
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = SCHEMA;
