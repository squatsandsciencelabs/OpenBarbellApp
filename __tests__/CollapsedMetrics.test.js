import * as sut from 'app/utility/transforms/CollapsedMetrics';

// Velocity

describe('getAvgVelocities', () => {

    test('[] when empty', () => {
        let set = {
            reps: [],
        };

        let result = sut.getAvgVelocities(set);

        expect(result).toEqual([]);
    });

    test('returns average velocities from set with reps', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }
            ]
        }

        let result = sut.getAvgVelocities(set);

        expect(result).toEqual([1.83, 1.82, 1.08]);
    });

    test('return [] when rep is invalid', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                }
            ]
        }

        let result = sut.getAvgVelocities(set);

        expect(result).toEqual([]);
    });

    test('return [] when rep is removed', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: true,
                }
            ]
        }

        let result = sut.getAvgVelocities(set);

        expect(result).toEqual([]);
    });        
});

describe('getAvgofAvgVelocities', () => {

    test('null when no avg velocities', () => {
        let set = {
            reps: [],
        }

        let result = sut.getAvgofAvgVelocities(set);

        expect(result).toBe(null);
    });

    test('return avg of avg velocities', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
            ]
        }

        let result = sut.getAvgofAvgVelocities(set);

        expect(result).toBe(1.58);
    });
});

describe('getAbsLossVelocity', () => {

    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
        
        let result = sut.getAbsLossVelocity(set);
        
        expect(result).toBe(null);        
    });

    test('returns abslossvelocity', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.10]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
            ]
        }
        
        let result = sut.getAbsLossVelocity(set);

        expect(result).toBe(0.75);
    });
});

describe('getFirstRepAvgVelocity', () => {
    
    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getFirstRepAvgVelocity(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns first rep avg velocity', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                }, 
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
            ]
        }
            
        let result = sut.getFirstRepAvgVelocity(set);
    
        expect(result).toBe(1.83);
    });
});
    
describe('getLastRepAvgVelocity', () => {
    
    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getLastRepAvgVelocity(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns last rep avg velocity', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 1.00]
                },  
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 0.15]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 1.12]
                },  
            ]
        };
            
        let result = sut.getLastRepAvgVelocity(set);
    
        expect(result).toBe(1.08);
    });
});

describe('getMinAvgVelocity', () => {
    
    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMinAvgVelocity(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns min avg velocity', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 36, 1.03]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
            ]
        };
            
        let result = sut.getMinAvgVelocity(set);
    
        expect(result).toBe(1.03);
    });
});

describe('getMaxAvgVelocity', () => {
    
    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMaxAvgVelocity(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns max avg velocity', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08]
                },
            ]
        };
            
        let result = sut.getMaxAvgVelocity(set);
    
        expect(result).toBe(1.83);
    });
});

// ROM

describe('getROMs', () => {
    
        test('[] when empty', () => {
            let set = {
                reps: [],
            };
    
            let result = sut.getROMs(set);
    
            expect(result).toEqual([]);
        });
    
        test('returns roms from set with reps', () => {
            let set = {
                reps: [
                    {
                        isValid: false,
                        removed: false,
                        data: [-3456, 40, 5.15]
                    },
                    {
                        isValid: true,
                        removed: true,
                        data: [-3456, 40, 1.15]
                    },
                    {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.833368, 200]
                    }, 
                    {
                        isValid: true,
                        removed: false,
                        data: [-3456, 38, 1.821198, 250]
                    },
                    {
                        isValid: false,
                        removed: true,
                        data: [-3456, 40, 2.15]
                    }, 
                    {
                        isValid: true,
                        removed: false,
                        data: [-3456, 39, 1.08, 300]
                    },
                ]
            }
    
            let result = sut.getROMs(set);
    
            expect(result).toEqual([200, 250, 300]);
        });
    
        test('return [] when rep is invalid', () => {
            let set = {
                reps: [
                    {
                        isValid: false,
                        removed: false,
                    }
                ]
            }
    
            let result = sut.getROMs(set);
    
            expect(result).toEqual([]);
        });
    
        test('return [] when rep is removed', () => {
            let set = {
                reps: [
                    {
                        isValid: true,
                        removed: true,
                    }
                ]
            }
    
            let result = sut.getROMs(set);
    
            expect(result).toEqual([]);
    });        
});

describe('getAvgofROMs', () => {
    
    test('null when no reps', () => {
        let set = {
            reps: [],
        }

        let result = sut.getAvgofROMs(set);

        expect(result).toBe(null);
    });

    test('return avg of roms', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 4.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 220]
                },                     
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300]
                },
            ]
        }

        let result = sut.getAvgofROMs(set);

        expect(result).toBe(242.5);
    });
});

describe('getAbsLossROM', () => {
        
        test('return null when roms empty', () => {
            let set = {
                reps: [],
            };
                
            let result = sut.getAbsLossROM(set);
                
            expect(result).toBe(null);        
        });
        
        test('returns abslossROM', () => {
            let set = {
                reps: [
                    {
                        isValid: false,
                        removed: false,
                        data: [-3456, 40, 3.15]
                    },
                    {
                        isValid: true,
                        removed: true,
                        data: [-3456, 40, 1.15]
                    },
                    {
                        isValid: true,
                        removed: false,
                        data: [-3456, 37, 1.833368, 200]
                    },
                    {
                        isValid: false,
                        removed: true,
                        data: [-3456, 40, 2.15]
                    }, 
                    {
                        isValid: true,
                        removed: false,
                        data: [-3456, 38, 1.821198, 250]
                    }, 
                    {
                        isValid: true,
                        removed: false,
                        data: [-3456, 39, 1.08, 300]
                    },
                    {
                        isValid: false,
                        removed: true,
                        data: [-3456, 40, 5.15]
                    }, 
                ]
            }
                
            let result = sut.getAbsLossROM(set);
        
            expect(result).toBe(100);
        });
});    

describe('getFirstRepROM', () => {
    
    test('return null when roms empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getFirstRepROM(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns first rep ROM', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15, 150]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15, 300]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300]
                },
            ]
        }
            
        let result = sut.getFirstRepROM(set);
    
        expect(result).toBe(200);
    });
});

describe('getLastRepROM', () => {
    
    test('return null when roms empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getLastRepROM(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns last rep avg ROM', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15, 150]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15, 312]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300]
                },
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15, 150]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15, 210]
                },
            ]
        };
            
        let result = sut.getLastRepROM(set);
    
        expect(result).toBe(300);
    });
});

describe('getMinROM', () => {
    
    test('return null when roms empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMinROM(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns min rom', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15, 150]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15, 300]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300]
                },
            ]
        };
            
        let result = sut.getMinROM(set);
    
        expect(result).toBe(200);
    });
});

describe('getMaxROM', () => {
    
    test('return null when roms empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMaxROM(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns max rom', () => {
        let set = {
            reps: [
                {
                    isValid: false,
                    removed: false,
                    data: [-3456, 40, 3.15, 150]
                },
                {
                    isValid: true,
                    removed: true,
                    data: [-3456, 40, 1.15, 300]
                },
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200]
                },
                {
                    isValid: false,
                    removed: true,
                    data: [-3456, 40, 2.15]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300]
                },
            ]
        };
            
        let result = sut.getMaxROM(set);
    
        expect(result).toBe(300);
    });
});
