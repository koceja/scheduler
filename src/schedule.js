import React from 'react';
import TimeRange from 'react-time-range';

import './schedule.css';

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        const start = new Date();
        start.setHours(8);
        start.setMinutes(0);
        start.setMilliseconds(0);
        const end = new Date(start);
        end.setHours(22);
        this.state = {startTime: (localStorage.getItem("start")) ? localStorage.getItem("start") : start,
        endTime: (localStorage.getItem("end")) ? localStorage.getItem("end") : end};
        this.changeTimes = this.changeTimes.bind(this);
    }

    allotTimes() {
        
    }

    roundTimeQuarterHour(time) {
        var timeToReturn = new Date(time);
    
        timeToReturn.setMilliseconds(0);
        timeToReturn.setSeconds(0);
        timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 15) * 15);
        return timeToReturn;
    }

    changeTimes(event) {
        let start = new Date(event.startTime);
        let end = new Date(event.endTime);
        if (start.getTime() >= end.getTime()) {
            end.setDate(end.getDate() + 1);
        }
        localStorage.setItem("start", start);
        localStorage.setItem("end", end);
        this.setState({
            startTime: start,
            endTime: end
        });
    }

    render() {
        let currentTime = this.roundTimeQuarterHour(new Date());
        let start = this.roundTimeQuarterHour(new Date(this.state.startTime));
        let end = this.roundTimeQuarterHour(new Date(this.state.endTime));
        const schedule = [];
        const tasks = this.props.schedule;
        for (let i = 0, j = 0; i < tasks.length; i++) {
            const curr = tasks[i];
            let startTime = currentTime;
            if (startTime.getTime() < start.getTime() || startTime.getTime() >= end.getTime()) {
                start.setDate(start.getDate() + 1);
                end.setDate(end.getDate() + 1);
                currentTime = new Date(start.getTime());
                startTime = start;
            }
            let endTime = this.roundTimeQuarterHour(new Date(currentTime.getTime() + curr.time*60000));
            while (endTime.getTime() > end.getTime()) {
                const diff = endTime.getTime() - end.getTime();
                const event = {
                    name: curr.name,
                    startTime: startTime,
                    endTime: end,
                    id: j
                }
                j++;
                schedule.push(event);
                start.setDate(start.getDate() + 1);
                end.setDate(end.getDate() + 1);
                currentTime = new Date(start.getTime() + diff);
                startTime = start;
                endTime = this.roundTimeQuarterHour(new Date(currentTime.getTime()));
            }
            currentTime = endTime;
            const event = {
                name: curr.name,
                startTime: startTime,
                endTime: endTime,
                id: j
            }
            j++;
            schedule.push(event);
        }
        return (
            <div id="schedule">
                <div id="range">
                    <TimeRange
                        startMoment={this.state.startTime}
                        endMoment={this.state.endTime}
                        onChange={this.changeTimes}
                    />
                </div>
                
                {schedule.map(event => 
                    <div key={event.id} className="event">
                        <ul className="event-list">
                            <li className="name">{event.name}</li>
                            <li className="start">{event.startTime.toLocaleTimeString()}</li>
                            <li className="dash">{"-"}</li>
                            <li className="end">{event.endTime.toLocaleTimeString()}</li>
                        </ul>
                    </div>    
                )}
            </div>
        );
    }
}

export default Schedule;