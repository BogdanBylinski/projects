import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewTask } from "../store/tasks";

class AddTaskClass extends Component {
    constructor(props) {
        super(props);
        this.state = { task: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ task: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.addNewTask({ task: this.state.task });
        this.setState({ task: "" });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type='text'
                    name='task'
                    placeholder='Enter new task...'
                    value={this.state.task}
                    onChange={this.handleChange}
                />
                <button type='submit'>Add Task</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    addNewTask: (task) => dispatch(addNewTask(task)),
});

export default connect(null, mapDispatchToProps)(AddTaskClass);
