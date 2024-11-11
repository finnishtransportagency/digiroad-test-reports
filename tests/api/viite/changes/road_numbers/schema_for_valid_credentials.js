const SCHEMA = {
    "type": "object", 
    "required": ["type", "features"], 
    "properties": {
        "type": {
            "type": "string",
            "enum": ["FeatureCollection"]
        },
        "features": {
            "type": "array",
            "minItems": 1, 
            "items": {
                "type": "object", 
                "required": ["type", "id", "geometry", "properties"], 
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["Feature"]
                    },
                    "id": {
                        "type": "integer", 
                        "minimum": 1
                    },
                    "geometry": {
                        "type": "object", 
                        "required": ["type", "coordinates"], 
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": ["LineString"]
                            }, 
                            "coordinates": {
                                "type": "array", 
                                "minItems": 1, 
                                "items": {
                                    "type": "array", 
                                    "minItems": 3, 
                                    "maxItems": 3, 
                                    "items": [
                                        {
                                            "type": "number", 
                                            "minimum": 0,
                                            "maximum": 800000
                                        },
                                        {
                                            "type": "number", 
                                            "minimum": 6000000,
                                            "maximum": 8000000
                                        },
                                        {
                                            "type": "number", 
                                            "minimum": -10,
                                            "maximum": 1500
                                        }
                                    ]
                                }
                            }
                        }
                    }, 
                    "properties": {
                        "type": "object", 
                        "required": ["modifiedAt", "startMeasure", "changeType", "sideCode", "link", "createdAt", "createdBy", "endMeasure", "value"], 
                        "properties": {
                            "modifiedAt": {
                                "type": "string", 
                                "pattern": "^([0-2][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4} (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$"
                            }, 
                            "startMeasure": {
                                "type": "number", 
                                "minimum": 0
                            }, 
                            "changeType": {
                                "type": "string", 
                                "enum": ["Remove", "Add", "Modify"]
                            }, 
                            "sideCode": {
                                "type": "integer", 
                                "minimum": 2, 
                                "maximum": 3
                            }, 
                            "link": {
                                "type": "object", 
                                "required": ["type", "id", "geometry"], 
                                "properties": {
                                    "type": {
                                        "type": "string",
                                        "enum": ["Feature"]
                                    }, 
                                    "id": {
                                        "type": "string", 
                                        "pattern": "^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}:[0-9]$"
                                    }, 
                                    "geometry": {
                                        "type": "object", 
                                        "required": ["type", "coordinates"], 
                                        "properties": {
                                            "type": {
                                                "type": "string",
                                                "enum": ["LineString"]
                                            }, 
                                            "coordinates": {
                                                "type": "array", 
                                                "minItems": 1, 
                                                "items": {
                                                    "type": "array", 
                                                    "minItems": 3, 
                                                    "maxItems": 3, 
                                                    "items": [
                                                        {
                                                            "type": "number", 
                                                            "minimum": 0,
                                                            "maximum": 800000
                                                        },
                                                        {
                                                            "type": "number", 
                                                            "minimum": 6000000,
                                                            "maximum": 8000000
                                                        },
                                                        {
                                                            "type": "number", 
                                                            "minimum": -10,
                                                            "maximum": 1500
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }, 
                                    "properties": {
                                        "type": "object", 
                                        "required": ["functionalClass", "type", "length"], 
                                        "properties": {
                                            "functionalClass": {
                                                "type": "integer", 
                                                "minimum": 1, 
                                                "maximum": 99
                                            }, 
                                            "type": {
                                                "type": "integer", 
                                                "minimum": 1, 
                                                "maximum": 99
                                            }, 
                                            "length": {
                                                "type": "number", 
                                                "minimum": 0
                                            }
                                        }
                                    }
                                }                                    
                            }, 
                            "createdAt": {
                                "type": "string", 
                                "pattern": "^([0-2][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4} (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$"
                            }, 
                            "createdBy": {
                                "type": "string"
                            }, 
                            "endMeasure": {
                                "type": "number", 
                                "minimum": 0
                            }, 
                            "value": {
                                "type": "integer", 
                                "minimum": 1, 
                                "maximum": 99999
                            }
                        }
                    }
                }
            }
        }
    }
  }
  
module.exports = SCHEMA;
