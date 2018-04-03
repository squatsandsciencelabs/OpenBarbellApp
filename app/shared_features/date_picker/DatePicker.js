import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

class DatePicker extends Component {
  render () {
    return (
      <DateTimePicker
        isVisible={this.props.isVisible}
        onConfirm={this.props.changeDate}
        onCancel={this.props.closePicker}
      />
    );
  }

}

export default DatePicker;