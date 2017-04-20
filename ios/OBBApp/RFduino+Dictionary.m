//
//  RFduino+Dictionary.m
//  RFDuinoTest
//
//  Created by John Lin on 8/10/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RFduino+Dictionary.h"

@implementation RFduino (Dictionary)

- (NSDictionary *) toDictionary {
  return @{
           @"name" : self.name,
           @"identifier" : self.peripheral.identifier.UUIDString,
  };
}

@end
