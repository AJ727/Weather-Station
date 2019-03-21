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
          maxDay: moment(),
          minDay: moment().subtract(7, 'days'),
        }
    }

    render() {

        return (
            <SingleDatePicker
                //showClearDate={true}
                initialDate={{ _isAMomentObject: true }}
                small={true}
                block={false}
                numberOfMonths={2}
                date={this.state.date}
                placeholder={this.props.id }
                onDateChange={date => this.setState({ date })}
                focused={this.state.focused}
                onFocusChange={({ focused }) =>
                    this.setState({ focused })
                }
                hideKeyboardShortcutsPanel={true}
                //firstDayOfWeek={{ firstDayOfWeek: moment().weekday().day(moment().get('date'))}}
                isOutsideRange={() => false}
                withPortal={true}
                //onClose={}
            />
        )
        
    }
}

export default DatePicker;