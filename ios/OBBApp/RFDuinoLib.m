//
//  RFDuinoLib.m
//  RFDuinoTest
//
//  Created by John Lin on 8/2/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RFDuinoLib.h"
#import "RFduinoManager.h"
#import "RFduino.h"
#import "RFduino+Dictionary.h"
#import <CoreBluetooth/CoreBluetooth.h>

@interface RFDuinoLib () <RFduinoManagerDelegate, RFduinoDelegate, CBCentralManagerDelegate>
@property (nonatomic, strong) RFduinoManager *manager;
@property (nonatomic, strong) RFduino *connectedRFduino;
@property (nonatomic, strong) CBCentralManager *bluetoothManager;
@property (nonatomic, strong) NSMutableDictionary <NSString *, RFduino *> *rfduinos;
@end

@implementation RFDuinoLib

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(start)
{
  self.rfduinos = [NSMutableDictionary new];
  self.manager = [RFduinoManager sharedRFduinoManager];
  self.bluetoothManager = [[CBCentralManager alloc] initWithDelegate:self queue:dispatch_get_main_queue()];
  self.manager.delegate = self;
}

RCT_EXPORT_METHOD(startScan)
{
  [self.manager startScan];
}

RCT_EXPORT_METHOD(stopScan)
{
  [self.manager stopScan];
}

RCT_EXPORT_METHOD(connectDevice:(NSString *)rfduinoID)
{
  self.connectedRFduino = [self.rfduinos objectForKey:rfduinoID];
  if (self.connectedRFduino) {
    NSLog(@"%@ attempt to connect to %@", self, rfduinoID);
    [self sendEventWithName:@"Connecting" body:[self.connectedRFduino toDictionary]];
    [self.manager connectRFduino:self.connectedRFduino];
  }
}

RCT_EXPORT_METHOD(disconnectDevice)
{
  RFduino *rfduino = self.connectedRFduino;
  self.connectedRFduino = nil;
  [self.manager disconnectRFduino:rfduino];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"BluetoothOff", @"Found", @"Updated", @"Connecting", @"Connected", @"Disconnected", @"Message", @"Data"];
}

#pragma mark - Manager delegate functions

- (void)didDiscoverRFduino:(RFduino *)rfduino {
  // TODO: use the identifier instead of the name
  NSLog(@"%@ discovered %@", self, [rfduino toDictionary]);
  [self.rfduinos setObject:rfduino forKey:rfduino.name];
  [self sendEventWithName:@"Found" body:[rfduino toDictionary]];
}

- (void)didUpdateDiscoveredRFduino:(RFduino *)rfduino {
  [self sendEventWithName:@"Updated" body:[rfduino toDictionary]];
}

- (void)didConnectRFduino:(RFduino *)rfduino {
  NSLog(@"%@ connected to %@", self, [rfduino toDictionary]);
  rfduino.delegate = self;
  [self sendEventWithName:@"Connected" body:[rfduino toDictionary]];
}

- (void)didLoadServiceRFduino:(RFduino *)rfduino {
  // don't think this is needed, looks like rfduino.m is already handling service and characteristics, so leaving it empty for now
}

- (void)didDisconnectRFduino:(RFduino *)rfduino {
  NSLog(@"%@ disconnected from %@", self, [rfduino toDictionary]);
  rfduino.delegate = nil;
  [self sendEventWithName:@"Disconnected" body:[rfduino toDictionary]];
}
- (void)shouldDisplayAlertTitled:(NSString *)title messageBody:(NSString *)body {
  [self sendEventWithName:@"Message" body:@{@"text":body}];
}

#pragma mark - RFduino delegate functions

- (void)didReceive:(NSData *)data {
  float z;
  [data getBytes:&z length:data.length];
  
  // this method truncated early
//  NSString *stringData = [[NSString stringWithFormat:@"%.2f", z] componentsSeparatedByString:@".00"][0];
//  NSString *stringData = [NSString stringWithFormat:@"%f", z];
  NSString *stringData = [[NSNumber numberWithFloat:z] stringValue];
  
  NSLog(@"%@ received data %@ %f sending data %@", self, data, z, stringData);
  [self sendEventWithName:@"Data" body:stringData];
}

#pragma mark - Bluetooth delegate functions

- (void)centralManagerDidUpdateState:(CBCentralManager *)central {
  if (central.state != CBCentralManagerStatePoweredOn) {
    [self sendEventWithName:@"BluetoothOff" body:nil];
  }else {
    [self sendEventWithName:@"Disconnected" body:nil];
  }
}

@end
