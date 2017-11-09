import * as sut from 'app/utility/transforms/CollapsedMetrics';

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
            
        let result = sut.getMaxAvgVelocity(set);
    
        expect(result).toBe(1.83);
    });
});