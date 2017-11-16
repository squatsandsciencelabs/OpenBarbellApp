import * as sut from 'app/utility/transforms/CollapsedMetrics';

describe('collapsed metrics', () => {
    const set = {
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
                data: [-3456, 38, 1.821198, 300, 57, 65, 1, 9]
            }, 
            {
                isValid: true,
                removed: false,
                data: [-3456, 39, 1.08, 280, 31, 32, 2, 2]
            },
        ]
    };
    
    // metrics

    describe('getAvgVelocities', () => {

        test('[] when empty', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getAvgVelocities(set);
    
            expect(result).toEqual([]);
        });
        
        test('returns average velocities from set with reps', () => {
            const result = sut.getAvgVelocities(set);
    
            expect(result).toEqual([1.83, 1.03, 1.82, 1.08]);
        });

        test('return [] when rep is invalid', () => {
            const set = {
                reps: [{
                    isValid: false,
                    removed: false,
                }]
            };
    
            const result = sut.getAvgVelocities(set);
    
            expect(result).toEqual([]);
        });
    
        test('return [] when rep is removed', () => {
            const set = {
                reps: [{
                    isValid: true,
                    removed: true,
                }]
            };
    
            const result = sut.getAvgVelocities(set);
    
            expect(result).toEqual([]);
        });
        
    });

    describe('getPKVs', () => {
        
        test('[] when empty', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getPKVs(set);
    
            expect(result).toEqual([]);
        });
        
        test('returns PKVs from set with reps', () => {
            const result = sut.getPKVs(set);
    
            expect(result).toEqual([43, 34, 57, 31]);
        });

        test('return [] when rep is invalid', () => {
            const set = {
                reps: [{
                    isValid: false,
                    removed: false,
                }]
            };
    
            const result = sut.getPKVs(set);
    
            expect(result).toEqual([]);
        });
    
        test('return [] when rep is removed', () => {
            const set = {
                reps: [{
                    isValid: true,
                    removed: true,
                }]
            }
    
            const result = sut.getPKVs(set);
    
            expect(result).toEqual([]);
        });
        
    });  
    
    describe('getPKHs', () => {
        
        test('[] when empty', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getPKHs(set);
    
            expect(result).toEqual([]);
        });
        
        test('return PKHs from set with reps', () => {
            const result = sut.getPKHs(set);
    
            expect(result).toEqual([41, 28, 65, 32]);
        });

        test('return [] when rep is invalid', () => {
            const set = {
                reps: [{
                    isValid: false,
                    removed: false,
                }]
            };
    
            const result = sut.getPKHs(set);
    
            expect(result).toEqual([]);
        });
    
        test('return [] when rep is removed', () => {
            const set = {
                reps: [{
                    isValid: true,
                    removed: true,
                }]
            };
    
            const result = sut.getPKHs(set);
    
            expect(result).toEqual([]);
        });
        
    });
    
    describe('getROMs', () => {
        
        test('[] when empty', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getROMs(set);
    
            expect(result).toEqual([]);
        });
        
        test('return ROMs from set with reps', () => {
            const result = sut.getROMs(set);
    
            expect(result).toEqual([205, 280, 300, 280]);
        });

        test('return [] when rep is invalid', () => {
            const set = {
                reps: [{
                    isValid: false,
                    removed: false,
                }]
            };
    
            const result = sut.getROMs(set);
    
            expect(result).toEqual([]);
        });
    
        test('return [] when rep is removed', () => {
            const set = {
                reps: [
                    {
                        isValid: true,
                        removed: true,
                    }
                ]
            }
    
            const result = sut.getROMs(set);
    
            expect(result).toEqual([]);
        });

    });
    
    describe('getDurations', () => {
        
        test('[] when empty', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getDurations(set);
    
            expect(result).toEqual([]);
        });
        
        test('return Durations from set with reps', () => {
            const result = sut.getDurations(set);
    
            expect(result).toEqual([5, 7, 9, 2]);
        });

        test('return [] when rep is invalid', () => {
            const set = {
                reps: [{
                    isValid: false,
                    removed: false,
                }]
            };
    
            const result = sut.getDurations(set);
    
            expect(result).toEqual([]);
        });
    
        test('return [] when rep is removed', () => {
            const set = {
                reps: [{
                    isValid: true,
                    removed: true,
                }]
            };
    
            const result = sut.getDurations(set);
    
            expect(result).toEqual([]);
        });

    });

    // quantifiers

    // avg velocities

    describe('getAvgofAvgVelocities', () => {

        test('null when no avg velocities', () => {
            const set = {
                reps: [],
            };
            const velocities = sut.getAvgVelocities(set);
    
            const result = sut.getAvgOfMetrics(velocities);
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg velocities', () => {
            const velocities = sut.getAvgVelocities(set);
            
            const result = sut.getAvgOfMetrics(velocities);
    
            expect(result).toBe(1.44);
        });

    });

    describe('getAbsLossVelocity', () => {
    
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            const velocities = sut.getAvgVelocities(set);
            
            const result = sut.getAbsLossOfMetrics(velocities);
            
            expect(result).toBe(null);
        });
    
        test('returns abslossvelocity', () => {
            const velocities = sut.getAvgVelocities(set);

            const result = sut.getAbsLossOfMetrics(velocities);
    
            expect(result).toBe(0.8);
        });

    });
    
    describe('getFirstRepAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstRepofMetrics(sut.getAvgVelocities(set));
            
            expect(result).toBe(null);
        });
        
        test('returns first rep avg velocity', () => {
            const result = sut.getFirstRepofMetrics(sut.getAvgVelocities(set));
        
            expect(result).toBe(1.83);
        });

    });
        
    describe('getLastRepAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastRepMetrics(sut.getAvgVelocities(set));
            
            expect(result).toBe(null);
        });
        
        test('returns last rep avg velocity', () => {
            const result = sut.getLastRepMetrics(sut.getAvgVelocities(set));
        
            expect(result).toBe(1.08);
        });

    });
    
    describe('getMinAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinMetrics(sut.getAvgVelocities(set));
            
            expect(result).toBe(null);
        });
        
        test('returns min avg velocity', () => {
            const result = sut.getMinMetrics(sut.getAvgVelocities(set));
        
            expect(result).toBe(1.03);
        });

    });
    
    describe('getMaxAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxMetrics(sut.getAvgVelocities(set));
            
            expect(result).toBe(null);
        });
        
        test('returns max avg velocity', () => {
            const result = sut.getMaxMetrics(sut.getAvgVelocities(set));
        
            expect(result).toBe(1.83);
        });

    });

    // best pkvs

    describe('getAvgofPKVs', () => {
        
        test('null when no PKVs', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getAvgOfMetrics(sut.getPKVs(set));
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg PKVs', () => {
            const result = sut.getAvgOfMetrics(sut.getPKVs(set));
    
            expect(result).toBe(41.25);
        });
    });
    
    describe('getAbsLossPKVs', () => {
    
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfMetrics(sut.getPKVs(set));
            
            expect(result).toBe(null);
        });
    
        test('returns abslossPKVs', () => {
            const result = sut.getAbsLossOfMetrics(sut.getPKVs(set));
    
            expect(result).toBe(26);
        });
    });
    
    describe('getFirstRepPKVs', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstRepofMetrics(sut.getPKVs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns first rep PKVs', () => {
            const result = sut.getFirstRepofMetrics(sut.getPKVs(set));
        
            expect(result).toBe(43);
        });
    });
        
    describe('getLastRepPKV', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastRepMetrics(sut.getPKVs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns last rep PKV', () => {
            const result = sut.getLastRepMetrics(sut.getPKVs(set));
        
            expect(result).toBe(31);
        });
    });
    
    describe('getMinPKV', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinMetrics(sut.getPKVs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns min PKV', () => {
            const result = sut.getMinMetrics(sut.getPKVs(set));
        
            expect(result).toBe(31);
        });
    });
    
    describe('getMaxPKV', () => {
        
        test('return null when PKV empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxMetrics(sut.getPKVs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns max PKV', () => {
            const result = sut.getMaxMetrics(sut.getPKVs(set));
        
            expect(result).toBe(57);
        });
    });
    
    // PKH

    describe('getAvgofPKHs', () => {
        
        test('null when no PKHs', () => {
            const set = {
                reps: [],
            }
    
            const result = sut.getAvgOfMetrics(sut.getPKHs(set));
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg PKHs', () => {
            const result = sut.getAvgOfMetrics(sut.getPKHs(set));
    
            expect(result).toBe(41.5);
        });

    });
        
    describe('getAbsLossPKHs', () => {
    
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfMetrics(sut.getPKHs(set));
            
            expect(result).toBe(null);
        });
    
        test('returns abslossPKHs', () => {
            const result = sut.getAbsLossOfMetrics(sut.getPKHs(set));
    
            expect(result).toBe(37);
        });

    });
    
    describe('getFirstRepPKHs', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstRepofMetrics(sut.getPKHs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns first rep PKHs', () => {
            const result = sut.getFirstRepofMetrics(sut.getPKHs(set));
        
            expect(result).toBe(41);
        });

    });
        
    describe('getLastRepPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastRepMetrics(sut.getPKHs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns last rep PKH', () => {
            const result = sut.getLastRepMetrics(sut.getPKHs(set));
        
            expect(result).toBe(32);
        });

    });
    
    describe('getMinPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinMetrics(sut.getPKHs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns min PKH', () => {
            const result = sut.getMinMetrics(sut.getPKHs(set));
        
            expect(result).toBe(28);
        });

    });
    
    describe('getMaxPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxMetrics(sut.getPKHs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns max PKH', () => {
            const result = sut.getMaxMetrics(sut.getPKHs(set));
        
            expect(result).toBe(65);
        });

    });

    // ROMs
    
    describe('getAvgofROMs', () => {
        
        test('null when no ROMs', () => {
            const set = {
                reps: [],
            }
    
            const result = sut.getAvgOfMetrics(sut.getROMs(set));
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg ROMs', () => {
            const result = sut.getAvgOfMetrics(sut.getROMs(set));
    
            expect(result).toBe(266.25);
        });

    });
        
    describe('getAbsLossROMs', () => {
    
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfMetrics(sut.getROMs(set));
            
            expect(result).toBe(null);
        });
    
        test('returns abslossROMs', () => {
            const result = sut.getAbsLossOfMetrics(sut.getROMs(set));
    
            expect(result).toBe(95);
        });

    });
    
    describe('getFirstRepROMs', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
                
            const result = sut.getFirstRepofMetrics(sut.getROMs(set));
                
            expect(result).toBe(null);
        });
        
        test('returns first rep ROMs', () => {
            const result = sut.getFirstRepofMetrics(sut.getROMs(set));
        
            expect(result).toBe(205);
        });

    });
        
    describe('getLastRepROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastRepMetrics(sut.getROMs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns last rep ROM', () => {
            const result = sut.getLastRepMetrics(sut.getROMs(set));
        
            expect(result).toBe(280);
        });

    });
    
    describe('getMinROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinMetrics(sut.getROMs(set));
            
            expect(result).toBe(null);        
        });
        
        test('returns min ROM', () => {
            const result = sut.getMinMetrics(sut.getROMs(set));
        
            expect(result).toBe(205);
        });

    });
    
    describe('getMaxROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxMetrics(sut.getROMs(set));
            
            expect(result).toBe(null);
        });
        
        test('returns max ROM', () => {
            const result = sut.getMaxMetrics(sut.getROMs(set));
        
            expect(result).toBe(300);
        });

    });
    
    // Durations

    describe('getAvgofDurations', () => {
        
        test('null when no Durations', () => {
            const set = {
                reps: [],
            }
    
            const result = sut.getAvgOfMetrics(sut.getDurations(set));
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg Durations', () => {
            const result = sut.getAvgOfMetrics(sut.getDurations(set));
    
            expect(result).toBe(5.75);
        });

    });
        
    describe('getAbsLossDurations', () => {
    
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfMetrics(sut.getDurations(set));
            
            expect(result).toBe(null);
        });
    
        test('returns abslossDurations', () => {
            const result = sut.getAbsLossOfMetrics(sut.getDurations(set));
    
            expect(result).toBe(7);
        });

    });
    
    describe('getFirstRepDurations', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstRepofMetrics(sut.getDurations(set));
            
            expect(result).toBe(null);
        });
        
        test('returns first rep Durations', () => {
            const result = sut.getFirstRepofMetrics(sut.getDurations(set));
        
            expect(result).toBe(5);
        });

    });
        
    describe('getLastRepDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastRepMetrics(sut.getDurations(set));
            
            expect(result).toBe(null);
        });
        
        test('returns last rep Duration', () => {
            const result = sut.getLastRepMetrics(sut.getDurations(set));
        
            expect(result).toBe(2);
        });

    });
    
    describe('getMinDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinMetrics(sut.getDurations(set));
            
            expect(result).toBe(null);
        });
        
        test('returns min Duration', () => {
            const result = sut.getMinMetrics(sut.getDurations(set));
        
            expect(result).toBe(2);
        });

    });
    
    describe('getMaxDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxMetrics(sut.getDurations(set));
            
            expect(result).toBe(null);
        });
        
        test('returns max Duration', () => {
            const result = sut.getMaxMetrics(sut.getDurations(set));
            
            expect(result).toBe(9);
        });

    });
});
