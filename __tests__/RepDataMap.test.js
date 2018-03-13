import * as sut from 'app/utility/RepDataMap';

describe('RepDataMap', () => {

    describe('isValidData', () => {

        var repData = [
            -3456
            ,2 
            ,2.9863
            ,695
            ,6.177273
            ,57
            ,1408.402
            ,233094
            ,0
            ,6.658369e+08
            ,0
            ,130000
            ,10000
            ,150000
            ,1
            ,1
            ,3.01
            ,6666
            ,200
            ,20
            ,1
            ,-9999
            ,5
            ,10
            ,-9876
            ,195.0155
            ,125.011
            ,99.0092
            ,85.0079
            ,82.0077
            ,75.0063
            ,59.0057
            ,54.0052
            ,51.005
            ,54.0051
            ,50.005
            ,46.0045
            ,45.0044
            ,44.0045
            ,45.0044
            ,44.0047
            ,48.0049
            ,48.0049
            ,51.0052
            ,53.0055
            ,59.0064
            ,74.0084
            ,93.0103
            ,-6789
            ,73
        ];

        test('return true if !isInfinityorNegative', () => {

            const result = sut.isValidData(repData);

            expect(result).toBe(true);

        });

        test('return false if velocity is infinity', () => {
            repData[2] = 'Infinity';

            const result = sut.isValidData(repData);

            expect(result).toBe(false);
        });

        test('return false if velocity is negative', () => {
            repData[2] = -4;

            const result = sut.isValidData(repData);

            expect(result).toBe(false);
        });

    });

    describe('isValidData V2', () => {

        var repData = [
            -2345
            ,2 
            ,2.9863
            ,695
            ,6.177273
            ,57
            ,1408.402
            ,233094
            ,0
            ,6.658369e+08
            ,0
            ,130000
            ,10000
            ,150000
            ,1
            ,1
            ,3.01
            ,6666
            ,-9999
            ,20
            ,1
            ,200
            ,5
            ,10
            ,-9876
            ,195.0155
            ,125.011
            ,99.0092
            ,85.0079
            ,82.0077
            ,75.0063
            ,59.0057
            ,54.0052
            ,51.005
            ,54.0051
            ,50.005
            ,46.0045
            ,45.0044
            ,44.0045
            ,45.0044
            ,44.0047
            ,48.0049
            ,48.0049
            ,51.0052
            ,53.0055
            ,59.0064
            ,74.0084
            ,93.0103
            ,-6789
            ,73
        ];

        test('return true if !isInfinityorNegative', () => {

            const result = sut.isValidData(repData);

            expect(result).toBe(true);

        });

        test('return false if velocity is infinity', () => {
            repData[2] = 'Infinity';

            const result = sut.isValidData(repData);

            expect(result).toBe(false);
        });

        test('return false if velocity is negative', () => {
            repData[2] = -4;

            const result = sut.isValidData(repData);

            expect(result).toBe(false);
        });

    });

    describe('isValidData V1', () => {

        var repData = [
            -1234
            ,2 
            ,2.9863
            ,695
            ,6.177273
            ,57
            ,-9999
            ,233094
            ,0
            ,6.658369e+08
            ,0
            ,130000
            ,10000
            ,150000
            ,1
            ,1
            ,3.01
            ,6666
            ,1408.402
            ,20
            ,1
            ,200
            ,5
            ,10
            ,-9876
            ,195.0155
            ,125.011
            ,99.0092
            ,85.0079
            ,82.0077
            ,75.0063
            ,59.0057
            ,54.0052
            ,51.005
            ,54.0051
            ,50.005
            ,46.0045
            ,45.0044
            ,44.0045
            ,45.0044
            ,44.0047
            ,48.0049
            ,48.0049
            ,51.0052
            ,53.0055
            ,59.0064
            ,74.0084
            ,93.0103
            ,-6789
            ,73
        ];

        test('return true if !isInfinityorNegative', () => {

            const result = sut.isValidData(repData);

            expect(result).toBe(true);

        });

        test('return false if velocity is infinity', () => {
            repData[2] = 'Infinity';

            const result = sut.isValidData(repData);

            expect(result).toBe(false);
        });

        test('return false if velocity is negative', () => {
            repData[2] = -4;

            const result = sut.isValidData(repData);

            expect(result).toBe(false);
        });

    });

});
