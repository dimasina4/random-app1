import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmps } from "../actions/employeActions";

export class List extends Component {
  componentDidMount() {
    this.props.getEmps();
  }
  render() {
    console.log(this.props.employe.emps);
    return <div>List</div>;
  }
}

List.propTypes = {
  getEmps: PropTypes.func.isRequired,
  employe: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  employe: state.employe
});

export default connect(
  mapStateToProps,
  { getEmps }
)(List);
