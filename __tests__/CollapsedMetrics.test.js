import * as sut from 'app/utility/transforms/CollapsedMetrics';

describe('collapsed metrics', () => {
    var set = {
        reps: [
            {
                isValid: false,
                removed: false,
                data: [-3456, 37, 1.833368, 110, 20, 35, 1, 5]
            }, 
            {
                isValid: false,
                removed: true,
                data: [-3456, 37, 1.833368, 210, 20, 32, 1, 5]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.833368, 205, 43, 41, 1, 5]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 39, 1.03, 280, 34, 28, 3, 7]
            },            
            {
                isValid: false,
                removed: true,
                data: [-3456, 37, 1.833368, 410, 21, 26, 1, 5]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 38, 1.821198, 300, 57, 65, 1, 2]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 39, 1.08, 280, 31, 32, 2, 9]
            },
        ]
    };
    
    // metrics

    describe('getAvgVelocities', () => {

        test('[] when empty', () => {
            let set = {
                reps: [],
            };
    
            let result = sut.getAvgVelocities(set);
    
            expect(result).toEqual([]);
        });
        
        test('returns average velocities from set with reps', () => {
    
            let result = sut.getAvgVelocities(set);
    
            expect(result).toEqual([1.83, 1.03, 1.82, 1.08]);        
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

    describe('getPKVs', () => {
        
        test('[] when empty', () => {
            let set = {
                reps: [],
            };
    
            let result = sut.getPKVs(set);
    
            expect(result).toEqual([]);
        });
        
        test('returns PKVs from set with reps', () => {
    
            let result = sut.getPKVs(set);
    
            expect(result).toEqual([43, 34, 57,31]);        
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
    
    describe('getPKHs', () => {
        
        test('[] when empty', () => {
            let set = {
                reps: [],
            };
    
            let result = sut.getPKHs(set);
    
            expect(result).toEqual([]);
        });
        
        test('return PKHs from set with reps', () => {
    
            let result = sut.getPKHs(set);
    
            expect(result).toEqual([41,28,65,32]);        
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
    
    describe('getROMs', () => {
        
        test('[] when empty', () => {
            let set = {
                reps: [],
            };
    
            let result = sut.getROMs(set);
    
            expect(result).toEqual([]);
        });
        
        test('return ROMs from set with reps', () => {
    
            let result = sut.getROMs(set);
    
            expect(result).toEqual([205, 280, 300, 280]);        
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
    
    describe('getDurations', () => {
        
        test('[] when empty', () => {
            let set = {
                reps: [],
            };
    
            let result = sut.getDurations(set);
    
            expect(result).toEqual([]);
        });
        
        test('return Durations from set with reps', () => {
    
            let result = sut.getDurations(set);
    
            expect(result).toEqual([5,7,2,9]);        
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

    // quantifiers

    // avg velocities

    describe('getAvgofAvgVelocities', () => {
        
            test('null when no avg velocities', () => {
                let set = {
                    reps: [],
                }
        
                let result = sut.getAvgofMetrics(sut.getAvgVelocities(set));
        
                expect(result).toBe(null);
            });
        
            test('return avg of avg velocities', () => {
        
                let result = sut.getAvgofMetrics(sut.getAvgVelocities(set));
        
                expect(result).toBe(1.44);
            });
        });
        
        describe('getAbsLossVelocity', () => {
        
            test('return null when avgVs empty', () => {
                let set = {
                    reps: [],
                };
                
                let result = sut.getAbsLossOfMetrics(sut.getAvgVelocities(set));
                
                expect(result).toBe(null);        
            });
        
            test('returns abslossvelocity', () => {
                
                let result = sut.getAbsLossOfMetrics(sut.getAvgVelocities(set));
        
                expect(result).toBe(0.8);
            });
        });
        
        describe('getFirstRepAvgVelocity', () => {
            
            test('return null when avgVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getFirstRepofMetrics(sut.getAvgVelocities(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns first rep avg velocity', () => {
                    
                let result = sut.getFirstRepofMetrics(sut.getAvgVelocities(set));
            
                expect(result).toBe(1.83);
            });
        });
            
        describe('getLastRepAvgVelocity', () => {
            
            test('return null when avgVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getLastRepMetrics(sut.getAvgVelocities(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns last rep avg velocity', () => {
                    
                let result = sut.getLastRepMetrics(sut.getAvgVelocities(set));
            
                expect(result).toBe(1.08);
            });
        });
        
        describe('getMinAvgVelocity', () => {
            
            test('return null when avgVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMinMetrics(sut.getAvgVelocities(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns min avg velocity', () => {

                let result = sut.getMinMetrics(sut.getAvgVelocities(set));
            
                expect(result).toBe(1.03);
            });
        });
        
        describe('getMaxAvgVelocity', () => {
            
            test('return null when avgVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMaxMetrics(sut.getAvgVelocities(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns max avg velocity', () => {
                    
                let result = sut.getMaxMetrics(sut.getAvgVelocities(set));
            
                expect(result).toBe(1.83);
            });
        });

        // best pkvs

        describe('getAvgofPKVs', () => {
            
                test('null when no PKVs', () => {
                    let set = {
                        reps: [],
                    }
            
                    let result = sut.getAvgofMetrics(sut.getPKVs(set));
            
                    expect(result).toBe(null);
                });
            
                test('return avg of avg PKVs', () => {
            
                    let result = sut.getAvgofMetrics(sut.getPKVs(set));
            
                    expect(result).toBe(41.25);
                });
            });
            
        describe('getAbsLossPKVs', () => {
        
            test('return null when PKVs empty', () => {
                let set = {
                    reps: [],
                };
                
                let result = sut.getAbsLossOfMetrics(sut.getPKVs(set));
                
                expect(result).toBe(null);        
            });
        
            test('returns abslossPKVs', () => {
                
                let result = sut.getAbsLossOfMetrics(sut.getPKVs(set));
        
                expect(result).toBe(26);
            });
        });
        
        describe('getFirstRepPKVs', () => {
            
            test('return null when PKVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getFirstRepofMetrics(sut.getPKVs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns first rep PKVs', () => {
                    
                let result = sut.getFirstRepofMetrics(sut.getPKVs(set));
            
                expect(result).toBe(43);
            });
        });
            
        describe('getLastRepPKV', () => {
            
            test('return null when PKVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getLastRepMetrics(sut.getPKVs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns last rep PKV', () => {
                    
                let result = sut.getLastRepMetrics(sut.getPKVs(set));
            
                expect(result).toBe(31);
            });
        });
        
        describe('getMinPKV', () => {
            
            test('return null when PKVs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMinMetrics(sut.getPKVs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns min PKV', () => {

                let result = sut.getMinMetrics(sut.getPKVs(set));
            
                expect(result).toBe(31);
            });
        });
        
        describe('getMaxPKV', () => {
            
            test('return null when PKV empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMaxMetrics(sut.getPKVs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns max PKV', () => {
                    
                let result = sut.getMaxMetrics(sut.getPKVs(set));
            
                expect(result).toBe(57);
            });
        });
        
        // PKH

        describe('getAvgofPKHs', () => {
            
                test('null when no PKHs', () => {
                    let set = {
                        reps: [],
                    }
            
                    let result = sut.getAvgofMetrics(sut.getPKHs(set));
            
                    expect(result).toBe(null);
                });
            
                test('return avg of avg PKHs', () => {
            
                    let result = sut.getAvgofMetrics(sut.getPKHs(set));
            
                    expect(result).toBe(41.5);
                });
            });
            
        describe('getAbsLossPKHs', () => {
        
            test('return null when PKHs empty', () => {
                let set = {
                    reps: [],
                };
                
                let result = sut.getAbsLossOfMetrics(sut.getPKHs(set));
                
                expect(result).toBe(null);        
            });
        
            test('returns abslossPKHs', () => {
                
                let result = sut.getAbsLossOfMetrics(sut.getPKHs(set));
        
                expect(result).toBe(37);
            });
        });
        
        describe('getFirstRepPKHs', () => {
            
            test('return null when PKHs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getFirstRepofMetrics(sut.getPKHs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns first rep PKHs', () => {
                    
                let result = sut.getFirstRepofMetrics(sut.getPKHs(set));
            
                expect(result).toBe(41);
            });
        });
            
        describe('getLastRepPKH', () => {
            
            test('return null when PKHs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getLastRepMetrics(sut.getPKHs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns last rep PKH', () => {
                    
                let result = sut.getLastRepMetrics(sut.getPKHs(set));
            
                expect(result).toBe(32);
            });
        });
        
        describe('getMinPKH', () => {
            
            test('return null when PKHs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMinMetrics(sut.getPKHs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns min PKH', () => {

                let result = sut.getMinMetrics(sut.getPKHs(set));
            
                expect(result).toBe(28);
            });
        });
        
        describe('getMaxPKH', () => {
            
            test('return null when PKHs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMaxMetrics(sut.getPKHs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns max PKH', () => {
                    
                let result = sut.getMaxMetrics(sut.getPKHs(set));
            
                expect(result).toBe(65);
            });
        });

        // ROMs
        
        describe('getAvgofROMs', () => {
            
                test('null when no ROMs', () => {
                    let set = {
                        reps: [],
                    }
            
                    let result = sut.getAvgofMetrics(sut.getROMs(set));
            
                    expect(result).toBe(null);
                });
            
                test('return avg of avg ROMs', () => {
            
                    let result = sut.getAvgofMetrics(sut.getROMs(set));
            
                    expect(result).toBe(266.25);
                });
            });
            
        describe('getAbsLossROMs', () => {
        
            test('return null when ROMs empty', () => {
                let set = {
                    reps: [],
                };
                
                let result = sut.getAbsLossOfMetrics(sut.getROMs(set));
                
                expect(result).toBe(null);        
            });
        
            test('returns abslossROMs', () => {
                
                let result = sut.getAbsLossOfMetrics(sut.getROMs(set));
        
                expect(result).toBe(95);
            });
        });
        
        describe('getFirstRepROMs', () => {
            
            test('return null when ROMs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getFirstRepofMetrics(sut.getROMs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns first rep ROMs', () => {
                    
                let result = sut.getFirstRepofMetrics(sut.getROMs(set));
            
                expect(result).toBe(205);
            });
        });
            
        describe('getLastRepROM', () => {
            
            test('return null when ROMs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getLastRepMetrics(sut.getROMs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns last rep ROM', () => {
                    
                let result = sut.getLastRepMetrics(sut.getROMs(set));
            
                expect(result).toBe(280);
            });
        });
        
        describe('getMinROM', () => {
            
            test('return null when ROMs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMinMetrics(sut.getROMs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns min ROM', () => {

                let result = sut.getMinMetrics(sut.getROMs(set));
            
                expect(result).toBe(205);
            });
        });
        
        describe('getMaxROM', () => {
            
            test('return null when ROMs empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMaxMetrics(sut.getROMs(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns max ROM', () => {
                    
                let result = sut.getMaxMetrics(sut.getROMs(set));
            
                expect(result).toBe(300);
            });
        });
        
        // Durations

        describe('getAvgofDurations', () => {
            
                test('null when no Durations', () => {
                    let set = {
                        reps: [],
                    }
            
                    let result = sut.getAvgofMetrics(sut.getDurations(set));
            
                    expect(result).toBe(null);
                });
            
                test('return avg of avg Durations', () => {
            
                    let result = sut.getAvgofMetrics(sut.getDurations(set));
            
                    expect(result).toBe(5.75);
                });
            });
            
        describe('getAbsLossDurations', () => {
        
            test('return null when Durations empty', () => {
                let set = {
                    reps: [],
                };
                
                let result = sut.getAbsLossOfMetrics(sut.getDurations(set));
                
                expect(result).toBe(null);        
            });
        
            test('returns abslossDurations', () => {
                
                let result = sut.getAbsLossOfMetrics(sut.getDurations(set));
        
                expect(result).toBe(7);
            });
        });
        
        describe('getFirstRepDurations', () => {
            
            test('return null when Durations empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getFirstRepofMetrics(sut.getDurations(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns first rep Durations', () => {
                    
                let result = sut.getFirstRepofMetrics(sut.getDurations(set));
            
                expect(result).toBe(5);
            });
        });
            
        describe('getLastRepDuration', () => {
            
            test('return null when Durations empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getLastRepMetrics(sut.getDurations(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns last rep Duration', () => {
                    
                let result = sut.getLastRepMetrics(sut.getDurations(set));
            
                expect(result).toBe(9);
            });
        });
        
        describe('getMinDuration', () => {
            
            test('return null when Durations empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMinMetrics(sut.getDurations(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns min Duration', () => {

                let result = sut.getMinMetrics(sut.getDurations(set));
            
                expect(result).toBe(2);
            });
        });
        
        describe('getMaxDuration', () => {
            
            test('return null when Durations empty', () => {
                let set = {
                    reps: [],
                };
                    
                let result = sut.getMaxMetrics(sut.getDurations(set));
                    
                expect(result).toBe(null);        
            });
            
            test('returns max Duration', () => {
                    
                let result = sut.getMaxMetrics(sut.getDurations(set));
            
                expect(result).toBe(9);
            });
        });                    
});
