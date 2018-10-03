import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  avatar: {
    width: "50%",
    height: "auto",
    margin: "20px auto"
  },
  circularProgress: {
    position: "absolute",
    left: "calc(50% - 20px)",
    marginTop: "40px"
  },
  tableWrapper: {
    margin: "20px"
  },
  tcText: {
    textTransform: "capitalize"
  },
  tcTextBold: {
    fontWeight: "bold"
  }
});

class Service extends Component {
  state = {
    user: {},
    arrayToRender: []
  };
  getUserFromApi() {
    axios
      .get("https://randomuser.me/api")
      .then(res => {
        this.setState({ user: res.data.results[0] });
        let arrayToRender = [
          {
            field1: "First Name",
            field2: this.state.user.name.first
          },
          {
            field1: "Last name",
            field2: this.state.user.name.last
          },
          {
            field1: "Age",
            field2: this.state.user.dob.age
          },
          {
            field1: "Gender",
            field2: this.state.user.gender
          },
          {
            field1: "E-mail",
            field2: this.state.user.email
          },
          {
            field1: "Phone",
            field2: this.state.user.cell
          },
          {
            field1: "Location",
            field2:
              this.state.user.location.state +
              ", " +
              this.state.user.location.city +
              ", " +
              this.state.user.location.street
          }
        ];
        this.setState({ arrayToRender });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getUserFromApi();
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(null);
  }
  refreshContent() {
    this.setState({ user: {} });
    this.getUserFromApi();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {Object.keys(this.state.user).length === 0 &&
        this.state.user.constructor === Object ? (
          <div>
            <CircularProgress
              color="secondary"
              className={classes.circularProgress}
            />
          </div>
        ) : (
          <Grid container spacing={0}>
            <Grid item sm={4} xs={12}>
              <Avatar
                src={this.state.user.picture.large}
                className={classes.avatar}
              />
            </Grid>

            <Grid item sm={8} xs={12}>
              <Paper className={classes.tableWrapper}>
                <Table>
                  <TableBody>
                    {this.state.arrayToRender.map(item => (
                      <TableRow key={item.field1}>
                        <TableCell className={classes.tcTextBold}>
                          {item.field1}:
                        </TableCell>
                        <TableCell padding="none" className={classes.tcText}>
                          {item.field2}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

Service.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Service);
