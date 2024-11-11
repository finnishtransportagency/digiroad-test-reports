const SCHEMA = {
    "type": "object", 
    "required": ["muutos_tieto"], 
    "properties": {
        "muutos_tieto": {
            "type": "array", 
            "minItems": 1, 
            "items": {
                "type": "object", 
                "required": ["projektin_hyvaksymispaiva", "muutostyyppi", "muutostunniste", "kaannetty", "voimaantulopaiva", "kohde", "lahde"], 
                "properties": {
                    "projektin_hyvaksymispaiva": {
                        "type": "string", 
                        "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9][+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                    },
                    "muutostyyppi": {
                        "type": "integer", 
                        "minimum": 0, 
                        "maximum": 99
                    },
                    "muutostunniste": {
                        "type": "integer",
                        "minimum": 1
                    },
                    "kaannetty": {
                        "type": "integer",
                        "minimum": 0, 
                        "maximum": 2
                    },
                    "voimaantulopaiva": {
                        "type": "string", 
                        "pattern": "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9][+-](0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                    },
                    "kohde": {
                        "type": "object", 
                        "required": ["tie", "ajorata", "hallinnollinen_luokka", "ely", "etaisyys_loppu", "jatkuvuuskoodi", "etaisyys", "osa", "tietyyppi"], 
                        "properties": {
                            "tie": {
                                "type": "integer",
                                "minimum": 0,
                                "maximum": 99999
                            }, 
                            "ajorata": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 2
                            }, 
                            "hallinnollinen_luokka": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 3
                            }, 
                            "ely": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 14
                            }, 
                            "etaisyys_loppu": {
                                "type": "integer",
                                "minimum": 0
                            }, 
                            "jatkuvuuskoodi": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 6
                            }, 
                            "etaisyys": {
                                "type": "integer",
                                "minimum": 0
                            }, 
                            "osa": {
                                "type": "integer",
                                "minimum": 0
                            }, 
                            "tietyyppi": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 99
                            }
                        }
                    },
                    "lahde": {
                        "type": "object", 
                        "required": ["tie", "ajorata", "hallinnollinen_luokka", "ely", "etaisyys_loppu", "jatkuvuuskoodi", "etaisyys", "osa", "tietyyppi"], 
                        "properties": {
                            "tie": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 99999
                            }, 
                            "ajorata": {
                                "type": "integer", 
                                "minimum": 0, 
                                "maximum": 2
                            }, 
                            "hallinnollinen_luokka": {
                                "type": "integer", 
                                "minimum": 0, 
                                "maximum": 3
                            }, 
                            "ely": {
                                "type": "integer", 
                                "minimum": 0, 
                                "maximum": 14
                            }, 
                            "etaisyys_loppu": {
                                "type": "integer", 
                                "minimum": 0
                            }, 
                            "jatkuvuuskoodi": {
                                "type": "integer", 
                                "minimum": 0, 
                                "maximum": 5
                            }, 
                            "etaisyys": {
                                "type": "integer", 
                                "minimum": 0
                            }, 
                            "osa": {
                                "type": "integer", 
                                "minimum": 0
                            }, 
                            "tietyyppi": {
                                "type": "integer",
                                "minimum": 0, 
                                "maximum": 99
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = SCHEMA;
