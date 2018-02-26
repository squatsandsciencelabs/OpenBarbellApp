import * as sut from 'app/math/CollapsedMetrics';

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

    describe('getPercentLossOfAvgVelocities', () => {
        
        test('return null when avgVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getPercentLossOfAvgVelocities(set);
            
            expect(result).toBe(null);
        });
    
        test('returns percentlossvelocity', () => {
            const result = sut.getPercentLossOfAvgVelocities(set);
    
            expect(result).toBe(43.72);
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

    describe('getPercentLossOfPKVs', () => {
        
        test('return null when PKVs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getPercentLossOfPKVs(set);
            
            expect(result).toBe(null);
        });
    
        test('returns percentlossPKVs', () => {
            const result = sut.getPercentLossOfPKVs(set);
    
            expect(result).toBe(45.61);
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

    describe('getPercentLossOfROMs', () => {
        
        test('return null when ROMs empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getPercentLossOfROMs(set);
            
            expect(result).toBe(null);
        });
    
        test('returns percentlossROMs', () => {
            const result = sut.getPercentLossOfROMs(set);
    
            expect(result).toBe(31.67);
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

    describe('getPercentLossOfDurations', () => {
        
        test('return null when Durations empty', () => {
            const set = {
                reps: [],
            };
            
            const result = sut.getPercentLossOfDurations(set);
            
            expect(result).toBe(null);
        });
    
        test('returns percent loss durations', () => {
            const result = sut.getPercentLossOfDurations(set);
    
            expect(result).toBe(77.78);
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
    
    describe('getRPE1rm', () => {
        const validRep = {isValid: true, removed: false};
        const invalidRep = {isValid: false, removed: true};
        const removedRep = {isValid: true, removed: true};
        const invalidAndRemovedRep = {isValid: false, removed: false};

        test('return null when rpe null', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep],
                rpe: null,
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null when rpe > 10', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep],
                rpe: '11',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null when rpe is a range', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep],
                rpe: '5,5-6',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null if RPE below 6.5', () => {
            const set = {
                weight: 345,
                reps: [validRep, validRep, validRep, validRep,],
                rpe: '5',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null)
        });

        test('return RPE 1rm if rpe has comma instead of decimal', () => {
            const set = {
                weight: 345,
                reps: [validRep, validRep, validRep, validRep],
                rpe: '6,5',
            };

            const actual = sut.getRPE1rm(set);

            expect(actual).toBe(431);
        });

        test('return null when rpe undefined', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep],
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null when weight null', () => {
            const set = {
                weight: null,
                reps: [validRep, validRep],
                rpe: '8',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null when weight undefined', () => {
            const set = {
                reps: [validRep, validRep],
                rpe: '8',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null when weight empty string', () => {
            const set = {
                weight: '',
                reps: [validRep, validRep],
                rpe: '8',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return correct 1rm value for only 1 valid reps based on RPE', () => {
            const set = {
                weight: 435,
                reps: [validRep],
                rpe: '7',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(489);
        });

        test('return correct 1rm value for only 2 valid reps based on RPE', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep],
                rpe: '9',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(473);
        });

        test('return correct 1rm value for 10 valid reps based on RPE', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep],
                rpe: '8',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(640);
        });
    
        test('return correct 1rm value for mixed valid invalid+removed 3 reps based on RPE', () => {
            const set = {
                weight: 405,
                reps: [validRep, invalidAndRemovedRep, validRep, invalidRep, validRep],
                rpe: '7',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(482);
        });

        test('return correct 1rm value for mixed valid invalid removed 7 reps based on RPE', () => {
            const set = {
                weight: 315,
                reps: [validRep, validRep, removedRep, validRep, invalidAndRemovedRep, validRep, validRep, removedRep, validRep, validRep],
                rpe: '6.5',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(438);
        });

        test('return null if 11 valid reps', () => {
            const set = {
                weight: 435,
                reps: [validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep, validRep],
                rpe: '8',
            };
    
            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null if all reps are invalid', () => {
            const set = {
                weight: 315,
                reps: [invalidRep, invalidRep, invalidRep, invalidRep],
                rpe: '6.5',
            };

            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null if all reps are removed', () => {
            const set = {
                weight: 315,
                reps: [removedRep, removedRep, removedRep],
                rpe: '6.5',
            };

            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });
    
        test('return null if all reps are removed or invalid', () => {
            const set = {
                weight: 315,
                reps: [removedRep, invalidRep, invalidRep, removedRep, removedRep],
                rpe: '6.5',
            };

            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null if all reps are removed or invalid or invalidandRemoved', () => {
            const set = {
                weight: 315,
                reps: [removedRep, invalidRep, invalidRep, invalidAndRemovedRep, removedRep, removedRep, invalidAndRemovedRep],
                rpe: '6.5',
            };

            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });

        test('return null if all reps are invalidandRemoved', () => {
            const set = {
                weight: 315,
                reps: [invalidAndRemovedRep, invalidAndRemovedRep],
                rpe: '6.5',
            };

            const actual = sut.getRPE1rm(set);
    
            expect(actual).toBe(null);
        });
    
    });
    
    describe('canCalcRPE1RM', () => {
        
        test('return if canCalcRPE', () => {
            const set = { rpe: '8' };

            const result = sut.canCalcRPE1RM(set);

            expect(result).toBe(true);
        });

        // test if no rpe
        test('set with no RPE', () => {
            const set = { rpe: null };

            const result = sut.canCalcRPE1RM(set);

            expect(result).toBe(false);
        });

        // test rpe with commas
        test('RPE with commas', () => {
            const set = { rpe: '7,5' };

            const result = sut.canCalcRPE1RM(set);

            expect(result).toBe(true);
        });

        // test NaN rpe
        test('RPE with NAN', () => {
            const set = { rpe: undefined };

            const result = sut.canCalcRPE1RM(set);

            expect(result).toBe(false);
        });

        // test under RPE 6.5
        test('RPE under 6.5', () => {
            const set = { rpe: '4.5' };

            const result = sut.canCalcRPE1RM(set);

            expect(result).toBe(false);
        });
    });
});
