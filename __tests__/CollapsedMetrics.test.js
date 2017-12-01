import * as sut from 'app/utility/transforms/CollapsedMetrics';

describe('collapsed metrics', () => {
    const set = {
        reps: [
            {
                isValid: false,
                removed: false,
                data: [-3456, 37, 2.833368, 110, 20, 35, 1, 5]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 37, 1.833368, 280, 43, 41, 1, 5]
            },
            {
                isValid: true,
                removed: false,
                data: [-3456, 39, 1.03, 205, 34, 28, 3, 7]
            },            
            {
                isValid: false,
                removed: true,
                data: [-3456, 37, 3.833368, 410, 21, 26, 1, 5]
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
            {
                isValid: false,
                removed: true,
                data: [-3456, 37, 4.833368, 210, 20, 32, 1, 5]
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
    
            expect(result).toEqual([280, 205, 300, 280]);
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

    // Avg Velocity

    describe('getAvgOfAvgVelocities', () => {

        test('null when no Avg Velocity', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getAvgOfAvgVelocities(set);
    
            expect(result).toBe(null);
        });
    
        test('return avg of Avg Velocity', () => {
            const result = sut.getAvgOfAvgVelocities(set);
    
            expect(result).toBe(1.44);
        });

    });

    describe('getAbsLossOfAvgVelocities', () => {
    
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfAvgVelocities(set);
            
            expect(result).toBe(null);
        });
    
        test('returns abslossvelocity', () => {
            const result = sut.getAbsLossOfAvgVelocities(set);
    
            expect(result).toBe(0.8);
        });

    });
    
    describe('getFirstAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstAvgVelocity(set);
            
            expect(result).toBe(null);
        });
        
        test('returns first rep avg velocity', () => {
            const result = sut.getFirstAvgVelocity(set);
        
            expect(result).toBe(1.83);
        });

    });
        
    describe('getLastAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastAvgVelocity(set);
            
            expect(result).toBe(null);
        });
        
        test('returns last rep avg velocity', () => {
            const result = sut.getLastAvgVelocity(set);
        
            expect(result).toBe(1.08);
        });

    });
    
    describe('getMinAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinAvgVelocity(set);
            
            expect(result).toBe(null);
        });
        
        test('returns min avg velocity', () => {
            const result = sut.getMinAvgVelocity(set);
        
            expect(result).toBe(1.03);
        });

    });
    
    describe('getMaxAvgVelocity', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxAvgVelocity(set);
            
            expect(result).toBe(null);
        });
        
        test('returns max avg velocity', () => {
            const result = sut.getMaxAvgVelocity(set);
        
            expect(result).toBe(1.83);
        });

    });

    // best pkvs

    describe('getAvgPKV', () => {
        
        test('null when no PKVs', () => {
            const set = {
                reps: [],
            };
    
            const result = sut.getAvgPKV(set);
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg PKVs', () => {
            const result = sut.getAvgPKV(set);
    
            expect(result).toBe(41.25);
        });

    });
    
    describe('getAbsLossOfPKVs', () => {
    
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfPKVs(set);
            
            expect(result).toBe(null);
        });
    
        test('returns abslossPKVs', () => {
            const result = sut.getAbsLossOfPKVs(set);
    
            expect(result).toBe(26);
        });

    });
    
    describe('getFirstPKV', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstPKV(set);
            
            expect(result).toBe(null);
        });
        
        test('returns first rep PKVs', () => {
            const result = sut.getFirstPKV(set);
        
            expect(result).toBe(43);
        });

    });
        
    describe('getLastPKV', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastPKV(set);
            
            expect(result).toBe(null);
        });
        
        test('returns last rep PKV', () => {
            const result = sut.getLastPKV(set);
        
            expect(result).toBe(31);
        });

    });
    
    describe('getMinPKV', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinPKV(set);
            
            expect(result).toBe(null);
        });
        
        test('returns min PKV', () => {
            const result = sut.getMinPKV(set);
        
            expect(result).toBe(31);
        });

    });
    
    describe('getMaxPKV', () => {
        
        test('return null when PKV empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxPKV(set);
            
            expect(result).toBe(null);
        });
        
        test('returns max PKV', () => {
            const result = sut.getMaxPKV(set);
        
            expect(result).toBe(57);
        });

    });
    
    // PKH
    
    describe('getFirstPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstPKH(set);
            
            expect(result).toBe(null);
        });
        
        test('returns first rep PKHs', () => {
            const result = sut.getFirstPKH(set);
        
            expect(result).toBe(41);
        });

    });
        
    describe('getLastPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastPKH(set);
            
            expect(result).toBe(null);
        });
        
        test('returns last rep PKH', () => {
            const result = sut.getLastPKH(set);
        
            expect(result).toBe(32);
        });

    });
    
    describe('getMinPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinPKH(set);
            
            expect(result).toBe(null);
        });
        
        test('returns min PKH', () => {
            const result = sut.getMinPKH(set);
        
            expect(result).toBe(28);
        });

    });
    
    describe('getMaxPKH', () => {
        
        test('return null when PKHs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxPKH(set);
            
            expect(result).toBe(null);
        });
        
        test('returns max PKH', () => {
            const result = sut.getMaxPKH(set);
        
            expect(result).toBe(65);
        });

    });

    // ROMs
    
    describe('getAvgROM', () => {
        
        test('null when no ROMs', () => {
            const set = {
                reps: [],
            }
    
            const result = sut.getAvgROM(set);
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg ROMs', () => {
            const result = sut.getAvgROM(set);
    
            expect(result).toBe(266.25);
        });

    });
        
    describe('getAbsLossOfROMs', () => {
    
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfROMs(set);
            
            expect(result).toBe(null);
        });
    
        test('returns abslossROMs', () => {
            const result = sut.getAbsLossOfROMs(set);
    
            expect(result).toBe(95);
        });

    });
    
    describe('getFirstROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
                
            const result = sut.getFirstROM(set);
                
            expect(result).toBe(null);
        });
        
        test('returns first rep ROMs', () => {
            const result = sut.getFirstROM(set);
        
            expect(result).toBe(280);
        });

    });
        
    describe('getLastROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastROM(set);
            
            expect(result).toBe(null);
        });
        
        test('returns last rep ROM', () => {
            const result = sut.getLastROM(set);
        
            expect(result).toBe(280);
        });

    });
    
    describe('getMinROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinROM(set);
            
            expect(result).toBe(null);        
        });
        
        test('returns min ROM', () => {
            const result = sut.getMinROM(set);
        
            expect(result).toBe(205);
        });

    });
    
    describe('getMaxROM', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxROM(set);
            
            expect(result).toBe(null);
        });
        
        test('returns max ROM', () => {
            const result = sut.getMaxROM(set);
        
            expect(result).toBe(300);
        });

    });
    
    // Durations

    describe('getAvgDuration', () => {
        
        test('null when no Durations', () => {
            const set = {
                reps: [],
            }
    
            const result = sut.getAvgDuration(set);
    
            expect(result).toBe(null);
        });
    
        test('return avg of avg Durations', () => {
            const result = sut.getAvgDuration(set);
    
            expect(result).toBe(5.75);
        });

    });
        
    describe('getAbsLossOfDurations', () => {
    
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getAbsLossOfDurations(set);
            
            expect(result).toBe(null);
        });
    
        test('returns abslossDurations', () => {
            const result = sut.getAbsLossOfDurations(set);
    
            expect(result).toBe(7);
        });

    });
    
    describe('getFirstDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getFirstDuration(set);
            
            expect(result).toBe(null);
        });
        
        test('returns first rep Durations', () => {
            const result = sut.getFirstDuration(set);
        
            expect(result).toBe(5);
        });

    });
        
    describe('getLastDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getLastDuration(set);
            
            expect(result).toBe(null);
        });
        
        test('returns last rep Duration', () => {
            const result = sut.getLastDuration(set);
        
            expect(result).toBe(2);
        });

    });
    
    describe('getMinDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMinDuration(set);
            
            expect(result).toBe(null);
        });
        
        test('returns min Duration', () => {
            const result = sut.getMinDuration(set);
        
            expect(result).toBe(2);
        });

    });
    
    describe('getMaxDuration', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getMaxDuration(set);
            
            expect(result).toBe(null);
        });
        
        test('returns max Duration', () => {
            const result = sut.getMaxDuration(set);
            
            expect(result).toBe(9);
        });

    });

    describe('getAvgVelocityPeakEnd', () => {
        
        test('return null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getPeakEndOfAvgVelocities(set);

            expect(result).toBe(null);
        });
        
        test('returns peak end velocity', () => {
            const result = sut.getPeakEndOfAvgVelocities(set);

            expect(result).toBe(1.06);
        });

    });

    describe('getPKVPeakEnd', () => {
        
        test('return null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getPeakEndOfPKVs(set);

            expect(result).toBe(null);
        });
        
        test('returns peak end PKV', () => {
            const result = sut.getPeakEndOfPKVs(set);

            expect(result).toBe(31);
        });
    });

    describe('getROMPeakEnd', () => {
        
        test('return null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getPeakEndOfROMs(set);

            expect(result).toBe(null);
        });
        
        test('returns peak end ROM', () => {
            const result = sut.getPeakEndOfROMs(set);

            expect(result).toBe(242.5);
        });

    });

    describe('getDurationPeakEnd', () => {
        
        test('return null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getPeakEndOfDurations(set);

            expect(result).toBe(null);
        });
        
        test('returns peak end Duration', () => {
            const result = sut.getPeakEndOfDurations(set);

            expect(result).toBe(2);
        });
    });    

    describe('getAvgVelocitySetLoss', () => {

        test('returns null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getSetLossOfAvgVelocities(set);

            expect(result).toBe(null);
        });

        test('returns average velocity set loss', () => {
            const result = sut.getSetLossOfAvgVelocities(set);

            expect(result).toBe(-0.75);
        });
    });

    describe('getPKVSetLoss', () => {
        
        test('returns null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getSetLossOfPKVs(set);

            expect(result).toBe(null);
        });

        test('returns PKV set loss', () => {
            const result = sut.getSetLossOfPKVs(set);

            expect(result).toBe(-12);
        });
    });

    describe('getROMSetLoss', () => {
        
        test('returns null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getSetLossOfROMs(set);

            expect(result).toBe(null);
        });

        test('returns ROM set loss', () => {
            const result = sut.getSetLossOfROMs(set);

            expect(result).toBe(0);
        });
    });

    describe('getDurationSetLoss', () => {
        
        test('returns null when empty', () => {
            const set = {
                reps: [],
            };

            const result = sut.getSetLossOfDurations(set);

            expect(result).toBe(null);
        });

        test('returns Duration set loss', () => {
            const result = sut.getSetLossOfDurations(set);

            expect(result).toBe(-3);
        });
    });
    
});
