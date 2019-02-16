import "react-day-picker/lib/style.css";
import React, {Component} from "react";
import DayPicker from "react-day-picker";


class Calendar extends Component {
    constructor (props) {
        super(props);
        this.state = {
            endDay: undefined,
            startDay: undefined,
        };
    }

    handleClick = (day) => {
        let {startDay, endDay} = this.state;

        if (startDay === undefined) {
            this.setState({endDay, startDay: day});
        }
        if (startDay && endDay) {
            this.setState({endDay: undefined, startDay: day});
        }
        if (startDay && endDay === undefined) {
            endDay = day;
            if (startDay > day) {
                [startDay, endDay] = [day, startDay];
            }
            if (startDay.toLocaleDateString() === endDay.toLocaleDateString()) {
                this.setState({endDay: undefined, startDay: undefined});
            } else {
                this.setState({endDay, startDay});
            }
        }
    }

    renderSelected = () => {
        const {startDay, endDay} = this.state;
        let text = "Выбери Дату";
        if (startDay) {
            text = `Ты выбрал: ${startDay.toLocaleDateString()}`;
        }
        if (endDay) {
            text += ` - ${endDay.toLocaleDateString()}`;
        }
        return <p>{text}</p>;
    }

    render () {
        const {startDay, endDay} = this.state;
        const selectedDays = [startDay, endDay];
        if (startDay && endDay) {
            selectedDays.push({
                after: startDay,
                before: endDay,
            });
        }
        return (
            <div>
                <h3>DayPicker</h3>
                <DayPicker
                    onDayClick={this.handleClick}
                    selectedDays={selectedDays}
                />
                {this.renderSelected()}
            </div>
        );
    }
}

export default Calendar;
