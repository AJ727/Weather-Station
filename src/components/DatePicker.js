import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

class DatePicker extends React.Component {
    state={}
    constructor(props) {
        super(props);
        this.state ={
          date: null,
          focused: null,
        }
    }

    render() {

        return (
            <SingleDatePicker
                //showClearDate={true}
                small={true}
                block={false}
                numberOfMonths={1}
                date={this.state.date}
                placeholder={this.props.id}
                onDateChange={date => this.setState({ date })}
                focused={this.state.focused}
                onFocusChange={({ focused }) =>
                    this.setState({ focused })
                }
                hideKeyboardShortcutsPanel={true}
                isOutsideRange={() => false}
                withPortal={true}
                //onClose={}
            />
        )
    }
}

export default DatePicker;