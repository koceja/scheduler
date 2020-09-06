import React from 'react';
import './tasks.css';

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputs: (props.tasks && props.tasks.length > 0) ? props.tasks : [{id: 0, task: "", difficulty: "very easy", questions: 1}]};
        this.handleChange = this.handleChange.bind(this);
        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    addField(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            inputs: [...prevState.inputs, {id: prevState.inputs.length, task: "", difficulty: "very easy", questions: 1}]
        }))
    }

    removeField(id) {
        let copy = [...this.state.inputs];
        copy[id] = null;
        this.setState({
            inputs: copy
        });
    }

    handleChange = (event) => {
        const id = event.target.dataset.id;
        let name = event.target.name;
        if (name.charAt(0) === 'd') {
            name = name.substring(0, 10);
        }
        const value = event.target.value;
        let copy = [...this.state.inputs];
        copy[id][name] = value;
        this.setState({
            inputs: copy
        });
    }

    clearAll() {
        this.props.clear();
        this.setState({
            inputs: [{id: 0, task: "", difficulty: "very easy", questions: 1}]
        });
    }

    render() {
        return (
            <div id="tasks">
                <div>
                    {this.state.inputs.map(input => (input) ? (
                        <div key={input.id} className="form-field">
                            <div className="texts">
                                <div>
                                <label>
                                <span className="text-label">Task</span>
                                <input type="text" data-id={input.id} name="task" onChange={this.handleChange} value={input.task} />
                            </label>
                                    </div>
                                <div>
                            <label>
                            <span className="text-label">Questions</span>
                                <input type="number" data-id={input.id} name="questions" onChange={this.handleChange} value={input.questions} min="1" />
                            </label>
                            </div>
                            </div>
                            <label>
                                <ul className="difficulty">
                                <li><input type="radio" data-id={input.id} name={"difficulty"+input.id} onChange={this.handleChange} checked={(input.difficulty === "very easy") ? true : false} value={"very easy"} />very easy</li>
                                <li><input type="radio" data-id={input.id} name={"difficulty"+input.id} onChange={this.handleChange} checked={(input.difficulty === "easy") ? true : false} value={"easy"} />easy</li>
                                <li><input type="radio" data-id={input.id} name={"difficulty"+input.id} onChange={this.handleChange} checked={(input.difficulty === "medium") ? true : false} value={"medium"} />medium</li>
                                <li><input type="radio" data-id={input.id} name={"difficulty"+input.id} onChange={this.handleChange} checked={(input.difficulty === "hard") ? true : false} value={"hard"} />hard</li>
                                <li><input type="radio" data-id={input.id} name={"difficulty"+input.id} onChange={this.handleChange} checked={(input.difficulty === "very hard") ? true : false} value={"very hard"} />very hard</li>
                                </ul>                          
                            </label>
                            
                            <button className="remove-button" onClick={() => this.removeField(input.id)}>X</button>
                        </div>) : null
                    )}
                    <div className="submit-buttons">
                        <button onClick={() => this.props.submit(this.state.inputs)}>Schedule</button>
                        <button onClick={this.addField}>Add Task</button>
                        <button onClick={this.clearAll}>Clear</button>

                    </div>
                </div>
            </div>
        );
    }


}

export default Tasks;