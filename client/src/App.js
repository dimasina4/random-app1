import React, { Component } from "react";
import PropType from "prop-types";
import Service from "./components/Service";
import List from "./components/List";

// Material
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Person, ListAlt } from "@material-ui/icons";

// CSS
import "./css/style.css";

const styles = theme => ({
  mainContent: {
    height: "calc(100vh - 56px)",
    overflow: "auto"
  },
  botNav: {
    position: "fixed",
    width: "100%",
    bottom: 0
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

class App extends Component {
  state = {
    value: 1
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <div className="App">
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className={classes.mainContent}>
            {this.state.value === 0 ? <List /> : <Service />}
          </div>
          <Paper elevation={2} className={classes.botNav}>
            <BottomNavigation
              value={value}
              onChange={this.handleChange}
              showLabels
            >
              <BottomNavigationAction label="List" icon={<Person />} />
              <BottomNavigationAction label="Service" icon={<ListAlt />} />
            </BottomNavigation>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propType = {
  classes: PropType.object.isRequired
};

export default withStyles(styles)(App);
