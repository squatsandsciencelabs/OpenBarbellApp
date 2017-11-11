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
            ]
        }

        let result = sut.getAvgofAvgVelocities(set);

        expect(result).toBe("1.58");
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
            ]
        };
            
        let result = sut.getMinAvgVelocity(set);
    
        expect(result).toBe(1.08);
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
                        isValid: true,
                        removed: false,
                        data: [-3456, 39, 1.08, 300]
                    },
                ]
            }
    
            let result = sut.getAvgofROMs(set);
    
            expect(result).toBe("250.00");
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
                        isValid: true,
                        removed: false,
                        data: [-3456, 39, 1.08, 300]
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
    
    test('returns first rep rom', () => {
        let set = {
            reps: [
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
    
    test('returns last rep rom', () => {
        let set = {
            reps: [
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
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300]
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
    
    test('returns max avg velocity', () => {
        let set = {
            reps: [
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

// peak velocity

describe('getPKVs', () => {
    
    test('[] when empty', () => {
        let set = {
            reps: [],
        };

        let result = sut.getPKVs(set);

        expect(result).toEqual([]);
    });

    test('returns pkvs from set with reps', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        }

        let result = sut.getPKVs(set);

        expect(result).toEqual([20, 25, 30]);
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

        let result = sut.getPKVs(set);

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

        let result = sut.getPKVs(set);

        expect(result).toEqual([]);
    });        
});

describe('getAvgofPKVs', () => {
    
    test('null when no reps', () => {
        let set = {
            reps: [],
        }

        let result = sut.getAvgofPKVs(set);

        expect(result).toBe(null);
    });

    test('return avg of pkvs', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        }

        let result = sut.getAvgofPKVs(set);

        expect(result).toBe("25.00");
    });
});

describe('getAbsLossPKV', () => {
        
    test('return null when pkvs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getAbsLossPKV(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns abslossPKV', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        }
            
        let result = sut.getAbsLossPKV(set);
    
        expect(result).toBe(10);
    });
});    

describe('getFirstRepPKV', () => {
    
    test('return null when pkvs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getFirstRepPKV(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns first rep pkv', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        }
            
        let result = sut.getFirstRepPKV(set);
    
        expect(result).toBe(20);
    });
});

describe('getLastRepPKV', () => {
    
    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getLastRepPKV(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns last rep pkv', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        };
            
        let result = sut.getLastRepPKV(set);
    
        expect(result).toBe(30);
    });
});

describe('getMinPKV', () => {
    
    test('return null when pkvs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMinPKV(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns min pkv', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        };
            
        let result = sut.getMinPKV(set);
    
        expect(result).toBe(20);
    });
});

describe('getMaxPKV', () => {
    
    test('return null when pkvs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMaxPKV(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns max pkv', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30]
                },
            ]
        };
            
        let result = sut.getMaxPKV(set);
    
        expect(result).toBe(30);
    });
});

// peak height

describe('getPKHs', () => {
    
    test('[] when empty', () => {
        let set = {
            reps: [],
        };

        let result = sut.getPKHs(set);

        expect(result).toEqual([]);
    });

    test('returns pkhs from set with reps', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        }

        let result = sut.getPKHs(set);

        expect(result).toEqual([30, 35, 40]);
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

        let result = sut.getPKHs(set);

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

        let result = sut.getPKHs(set);

        expect(result).toEqual([]);
    });        
});

describe('getAvgofPKHs', () => {
    
    test('null when no reps', () => {
        let set = {
            reps: [],
        }

        let result = sut.getAvgofPKHs(set);

        expect(result).toBe(null);
    });

    test('return avg of pkhs', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        }

        let result = sut.getAvgofPKHs(set);

        expect(result).toBe("35.00");
    });
});

describe('getAbsLossPKH', () => {
        
    test('return null when pkhs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getAbsLossPKH(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns abslossPKH', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        }
            
        let result = sut.getAbsLossPKH(set);
    
        expect(result).toBe(10);
    });
});    

describe('getFirstRepPKH', () => {
    
    test('return null when pkhs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getFirstRepPKH(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns first rep pkh', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        }
            
        let result = sut.getFirstRepPKH(set);
    
        expect(result).toBe(30);
    });
});

describe('getLastRepPKH', () => {
    
    test('return null when avgVs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getLastRepPKH(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns last rep pkh', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        };
            
        let result = sut.getLastRepPKH(set);
    
        expect(result).toBe(40);
    });
});

describe('getMinPKH', () => {
    
    test('return null when pkhs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMinPKH(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns min pkh', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        };
            
        let result = sut.getMinPKH(set);
    
        expect(result).toBe(30);
    });
});

describe('getMaxPKH', () => {
    
    test('return null when pkhs empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMaxPKH(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns max pkh', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40]
                },
            ]
        };
            
        let result = sut.getMaxPKH(set);
    
        expect(result).toBe(40);
    });
});

// duration

describe('getDurations', () => {
    
    test('[] when empty', () => {
        let set = {
            reps: [],
        };

        let result = sut.getDurations(set);

        expect(result).toEqual([]);
    });

    test('returns durations from set with reps', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 3]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 5]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 1, 4]
                },
            ]
        }

        let result = sut.getDurations(set);

        expect(result).toEqual([3,5,4]);
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

        let result = sut.getDurations(set);

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

        let result = sut.getDurations(set);

        expect(result).toEqual([]);
    });        
});

describe('getAvgofDurations', () => {
    
    test('null when no reps', () => {
        let set = {
            reps: [],
        }

        let result = sut.getAvgofDurations(set);

        expect(result).toBe(null);
    });

    test('return avg of durations', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 3]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 5]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 1, 4]
                },
            ]
        }

        let result = sut.getAvgofDurations(set);

        expect(result).toBe("4.00");
    });
});

describe('getAbsLossDuration', () => {
        
    test('return null when durations empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getAbsLossDuration(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns abslossDuration', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 3]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 2]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 1, 6]
                },
            ]
        }
            
        let result = sut.getAbsLossDuration(set);
    
        expect(result).toBe(4);
    });
});    

describe('getFirstRepDuration', () => {
    
    test('return null when durations empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getFirstRepDuration(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns first rep duration', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 3]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 4]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 1, 7]
                },
            ]
        };
            
        let result = sut.getFirstRepDuration(set);
    
        expect(result).toBe(3);
    });
});

describe('getLastRepDuration', () => {
    
    test('return null when durations empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getLastRepDuration(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns last rep duration', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 3]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 4]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 1, 7]
                },
            ]
        };
            
        let result = sut.getLastRepDuration(set);
    
        expect(result).toBe(7);
    });
});

describe('getMinDuration', () => {
    
    test('return null when durations empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMinDuration(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns min duration', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 3]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 5]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 1, 8]
                },
            ]
        };
            
        let result = sut.getMinDuration(set);
    
        expect(result).toBe(3);
    });
});

describe('getMaxDuration', () => {
    
    test('return null when durations empty', () => {
        let set = {
            reps: [],
        };
            
        let result = sut.getMaxDuration(set);
            
        expect(result).toBe(null);        
    });
    
    test('returns max duration', () => {
        let set = {
            reps: [
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 37, 1.833368, 200, 20, 30, 1, 5]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 38, 1.821198, 250, 25, 35, 1, 2]
                }, 
                {
                    isValid: true,
                    removed: false,
                    data: [-3456, 39, 1.08, 300, 30, 40, 2, 9]
                },
            ]
        };
            
        let result = sut.getMaxDuration(set);
    
        expect(result).toBe(9);
    });
});
