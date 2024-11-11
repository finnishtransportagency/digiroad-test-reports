const SCHEMA = {
    "type": "array",
    "minItems": 1,
    "items": {
        "type": "object",
        "required": ["start_date", "end_addr_m", "road_type", "link_source", "calibration_points", "ely_code", "start_addr_m", "muokattu_viimeksi", "id", "end_date", "road_part_number", "geometryWKT", "link_id", "side_code", "road_number", "track_code", "administrative_class", "discontinuity"],
        "properties": {
            "start_date": {
                "type": "string", 
                "pattern": "^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2]).\\d{4}$"
            },
            "end_addr_m": {
                "type": "integer", 
                "minimum": 0
            },
            "road_type": {
                "type": "integer", 
                "minimum": 0
            },
            "link_source": {
                "type": "integer", 
                "minimum": 0
            },
            "calibration_points": {
                "type": "object",
                "required": [],
                "properties": {
                    "start": {
                        "type": "object",
                        "required": ["link_id", "address_m_value", "segment_m_value"],
                        "properties": {
                            "link_id": {
                                "type": "string", 
                                "pattern": "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}:[0-9]$"
                            },
                            "address_m_value": {
                                "type": "number", 
                                "minimum": 0
                            },
                            "segment_m_value": {
                                "type": "number", 
                                "minimum": 0
                            }
                        }
                    }, 
                    "end": {
                        "type": "object",
                        "required": ["link_id", "address_m_value", "segment_m_value"],
                        "properties": {
                            "link_id": {
                                "type": "string", 
                                "pattern": "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}:[0-9]$"
                            },
                            "address_m_value": {
                                "type": "number", 
                                "minimum": 0
                            },
                            "segment_m_value": {
                                "type": "number", 
                                "minimum": 0
                            }
                        }
                    }
                }
            },
            "ely_code": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 14
            },
            "start_addr_m": {
                "type": "integer", 
                "minimum": 0
            },
            "muokattu_viimeksi": {
                "type": "string", 
                "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
            },
            "id": {
                "type": "integer", 
                "minimum": 1
            },
            "end_date": {
                "anyOf": [
                    {
                        "type": "string", 
                        "minLength": 0, 
                        "maxLength": 0
                    }, 
                    {
                        "type": "string", 
                        "pattern": "^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\\d{4}$"
                    }
                ]
            },
            "road_part_number": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 999
            },
            "geometryWKT": {
                "type": "string",
                "pattern": "^LINESTRING ZM \\((\\d+\\.\\d+ \\d+\\.\\d+ \\d+\\.\\d+ \\d+\\.\\d+, )+(\\d+\\.\\d+ \\d+\\.\\d+ \\d+\\.\\d+ \\d+\\.\\d+)\\)$"
            },
            "link_id": {
                "type": "string", 
                "pattern": "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}:[0-9]$"
            },
            "side_code": {
                "type": "integer", 
                "minimum": 2, 
                "maximum": 3
            },
            "road_number": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 99999
            },
            "track_code": {
                "type": "integer", 
                "minimum": 0, 
                "maximum": 2
            },
            "administrative_class": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 3
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
