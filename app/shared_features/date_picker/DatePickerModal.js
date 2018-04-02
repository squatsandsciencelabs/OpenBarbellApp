import React, {Component} from 'react';
import DatePicker from 'react-native-datepicker'

class DatePickerModal extends Component {
    render() {
        const todaysDate = new Date().toISOString().slice(0,10); 

        return (
            <DatePicker
              style={{ width: 150 }}
              date={this.props.date}
              mode="date"
              showIcon={false}
              placeholder={this.props.placeholder}
              format="YYYY-MM-DD"
              minDate="2016-06-17"
              maxDate={todaysDate}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                // ... You can check the source to find the other keys.
                placeholderText: {
                  color: 'rgba(189, 189, 189, 1)',
                },
                dateInput: {
                  backgroundColor: 'rgba(239, 239, 239, 1)',
                  borderColor: 'rgba(239, 239, 239, 1)',
                  borderWidth: 3,
                  borderRadius: 3,
                  marginBottom: 5,
                  zIndex: 2,
                  minHeight: 35,
                  height: 29,
                  paddingTop: 6,
                  paddingLeft: 4,
                  fontSize: 13,
                  paddingRight: 30,
                  color: 'rgba(77, 77, 77, 1)',
                },
              }}
              onDateChange={(date) => {this.props.changeDate(date)}}
            />
        );
    };
};

// const styles = StyleSheet.create({
//   field: {
//       backgroundColor: 'rgba(239, 239, 239, 1)',
//       borderColor: 'rgba(239, 239, 239, 1)',
//       borderWidth: 3,
//       borderRadius: 3,
//       marginBottom: 5,
//       zIndex: 2,
//       minHeight: 35,
//   },
//   tagText: {
//       height: 29,
//       paddingTop: 6,
//       paddingLeft: 4,
//       fontSize: 13,
//       paddingRight: 30,
//       color: 'rgba(77, 77, 77, 1)',
//   },
//   placeholderText: {
//       color: 'rgba(189, 189, 189, 1)'
//   },
// });

export default DatePickerModal;
