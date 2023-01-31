import React, { Component } from "react";
import { connect } from "react-redux";

export class TestClass extends Component {
    render() {
        return <div>TestClass</div>;
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TestClass);
