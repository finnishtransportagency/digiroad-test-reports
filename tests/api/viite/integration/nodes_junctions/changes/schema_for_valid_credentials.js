const SCHEMA = {
    "type": "array",
    "minItems": 1,
    "items": {
        "type": "object",
        "required": ["x", "name", "start_date", "y", "published_date", "end_date", "node_number", "type", "change_date", "user"],
        "properties": {
            "x": {
                "type": "number", 
                "minimum": 0, 
                "maximum": 800000
            },
            "name": {
                "type": "string"
            },
            "start_date": {
                "type": "string", 
                "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                  
            },
            "node_points": {
                "type": "array",
                "minItems": 0,
                "items": {
                    "type": "object",
                    "required": ["start_date", "before_after", "track", "road_part", "end_date", "road", "user", "distance"], 
                    "properties": {
                        "start_date": {
                            "type": "string", 
                            "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                        },
                        "before_after": {
                            "type": "string", 
                            "enum": ["E", "J"]
                        },
                        "track": {
                            "type": "integer", 
                            "minimum": 0, 
                            "maximum": 2
                        },
                        "road_part": {
                            "type": "integer", 
                            "minimum": 1, 
                            "maximum": 999
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
                        "road": {
                            "type": "integer", 
                            "minimum": 1,
                            "maximum": 99999
                        },                        
                        "user": {
                            "type": "string"
                        },
                        "distance": {
                            "type": "integer", 
                            "minimum": 0
                        }
                    }
                }
            }, 
            "y": {
                "type": "number", 
                "minimum": 6000000, 
                "maximum": 8000000
            }, 
            "published_date": {
                "type": "string", 
                "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
            }, 
            "junctions": {
                "type": "array",
                "minItems": 0,
                "items": {
                    "type": "object",
                    "required": ["start_date", "junction_points", "end_date", "junction_number", "user"],
                    "properties": {
                        "start_date": {
                            "type": "string", 
                            "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                        },
                        "junction_points": {
                            "type": "array", 
                            "minItems": 0, 
                            "items": {
                                "type": "object", 
                                "required": ["start_date", "before_after", "track", "road_part", "end_date", "road", "user", "distance"], 
                                "properties": {
                                    "start_date": {
                                        "type": "string", 
                                        "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                                    },
                                    "before_after": {
                                        "type": "string", 
                                        "enum": ["E", "J"]
                                    },
                                    "track": {
                                        "type": "integer", 
                                        "minimum": 0, 
                                        "maximum": 2
                                    },
                                    "road_part": {
                                        "type": "integer", 
                                        "minimum": 1, 
                                        "maximum": 999
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
                                    "road": {
                                        "type": "integer", 
                                        "minimum": 1, 
                                        "maximum": 99999
                                    },
                                    "user": {
                                        "type": "string"
                                    },
                                    "distance": {
                                        "type": "integer", 
                                        "minimum": 0
                                    }
                                }
                            }
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
                        "junction_number": {
                            "type": "integer", 
                            "minimum": 1
                        },
                        "user": {
                            "type": "string"
                        }
                    }
                }
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
            "node_number": {
                "type": "integer", 
                "minimum": 1
            }, 
            "type": {
                "type": "integer", 
                "minimum": 1, 
                "maximum": 18
            }, 
            "change_date": {
                "anyOf": [
                    { 
                        "type": "string", 
                        "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                    },
                    { 
                        "type": "string", 
                        "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]\\.\\d{3}[+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                    }
                ]

            }, 
            "user": {
                "type": "string"
            }
        }
    }
}

module.exports = SCHEMA;
