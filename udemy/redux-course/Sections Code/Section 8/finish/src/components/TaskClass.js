import React, { Component } from "react";
import { connect } from "react-redux";
import { loadTasks } from "../store/tasks";

class TaskClass extends Component {
    // this.props.tasks
    componentDidMount() {
        this.props.loadTasks();
    }
    render() {
        return (
            <div>
                {this.props.tasks.map((task) => (
                    <p key={task.id}>{task.task}</p>
                ))}
            </div>
        );
    }
}
// tasks: state.tasks.tasks
const mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
});

const mapDispatchToProps = (dispatch) => ({
    loadTasks: () => dispatch(loadTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskClass);
