import React, { Component, createRef } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Keyboard, View } from 'react-native';
import { Text, TextInput, TouchableRipple } from 'react-native-paper';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      open: false
    };
    this._textInput = createRef();
  }

  handleFocus = () => {
    this._textInput.current._root._handleFocus();
  };

  handleBlur = () => {
    setTimeout(this._textInput.current._root._handleBlur, 100);
  };

  handleChange = date => {
    this.handleClose();
    this.setState({ date });
    this.props.onDateChange(date);
  };

  handleClose = () => {
    this.setState({ open: false }, this.handleBlur);
  };

  handleOpen = () => {
    Keyboard.dismiss();
    this.handleFocus();
    this.setState({ open: true });
  };

  renderTouchText = props => {
    const { style, value } = props;

    return (
      <TouchableRipple onPress={this.handleOpen}>
        <Text style={style}>{value}</Text>
      </TouchableRipple>
    );
  };

  render() {
    const { date, open } = this.state;
    const value = date ? `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}` : '';

    return (
      <View style={this.props.style}>
        <TextInput
          label='Date'
          ref={this._textInput}
          render={this.renderTouchText}
          value={value}
          mode="outlined"
        />
        <DateTimePicker
          date={date}
          isVisible={open}
          onConfirm={this.handleChange}
          onCancel={this.handleClose}
        />
      </View>
    );
  }
}

export default DatePicker;
