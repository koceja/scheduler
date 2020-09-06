import React from 'react';
import Tasks from './tasks.js';
import Schedule from './schedule.js';

class Scheduler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: (localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : [],
            schedule: (localStorage.getItem("schedule")) ? JSON.parse(localStorage.getItem("schedule")) : []
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    onSubmit(inputs) {
        const newTasks = [];
        const newSchedule = [];
        for (let i = 0, j = 0; i < inputs.length; i++) {
            let curr = { ...inputs[i]};
            if (!curr) {continue;}
            if (curr.task === "") {
                continue;
            } else if (curr.difficulty !== "very easy" && curr.difficulty !== "easy" && curr.difficulty !== "medium" && curr.difficulty !== "hard" && curr.difficulty !== "very hard") {
                continue;
            } else if (curr.questions === 0) {
                continue;
            }
            curr.id = j;
            newTasks.push(curr);
            const task = {
                name: curr.task,
                time: this.calcTime(curr.difficulty, curr.questions)
            };
            newSchedule.push(task);
            j++;
        }
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        localStorage.setItem("schedule", JSON.stringify(newSchedule));
        this.setState({
            tasks: newTasks,
            schedule: newSchedule
        })
    }

    clearAll() {
        localStorage.removeItem("tasks");
        localStorage.removeItem("schedule");
        this.setState({
            tasks: [],
            schedule: []
        })
    }

    calcTime(difficulty, questions) {
        let tpq = 0;
        switch (difficulty) {
            case "very easy":
                tpq = 2;
                break;
            case "easy":
                tpq = 5;
                break;
            case "medium":
                tpq = 10;
                break;
            case "hard":
                tpq = 20;
                break;
            case "very hard":
                tpq = 30;
                break;
        }
        return tpq * questions;
    }

    render() {
        return (
            <div id="scheduler">
                <h1 style={{textAlign: "center"}}>Scheduler</h1>
                <Tasks submit={ this.onSubmit } tasks={ this.state.tasks } clear={ this.clearAll }/>
                <Schedule schedule={this.state.schedule} />
            </div>
        );
    }
}

export default Scheduler;