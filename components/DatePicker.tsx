import React, { Component, createRef } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Keyboard, View } from "react-native";
import { Text, TextInput, TouchableRipple } from "react-native-paper";
import Colors from "../constants/Colors";

interface DatePickerState {
  date: Date;
  open: boolean;
}

interface StandardProps {
  onDateChange: (Date) => void;
  style: any;
  mode?: any;
  date: Date;
}

class DatePicker extends Component<StandardProps, DatePickerState> {
  _textInput: React.RefObject<any>;
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

  handleChange = (date: Date) => {
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
    const value = date
      ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      : "";

    return (
      <View style={this.props.style}>
        <TextInput
          label="Date"
          ref={this._textInput}
          render={this.renderTouchText}
          value={value}
          mode={this.props.mode ? this.props.mode : "flat"}
          underlineColor={Colors.accentColor}
          selectionColor={Colors.secondaryColor}
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
