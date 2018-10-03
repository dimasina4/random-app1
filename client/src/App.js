import React, { Component } from "react";
import PropType from "prop-types";
import Service from "./components/Service";
import List from "./components/List";
import { Provider } from "react-redux";
import store from "./store";

// Material
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Person, ListAlt } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import { Refresh } from "@material-ui/icons";
// CSS
import "./css/style.css";

const styles = theme => ({
  mainContent: {
    marginTop: 64,
    height: "calc(100vh - 56px - 64px)",
    overflow: "auto"
  },
  botNav: {
    position: "fixed",
    width: "100%",
    bottom: 0
  },
  serviceTitle: {
    flexGrow: 1
  }
});

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  }
});

class App extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        value: 0
      });
  }
  // state = {
  //   value: 0,

  // };

  componentDidMount() {}

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleRefreshChild = () => {
    this.child.refreshContent();
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <div className="App">
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <AppBar id="mainAppBar" position="fixed">
              {this.state.value === 0 ? (
                <ToolBar>
                  <Typography
                    className={classes.listTitle}
                    color="inherit"
                    variant="title"
                  >
                    List
                  </Typography>
                </ToolBar>
              ) : (
                <ToolBar>
                  <Typography
                    color="inherit"
                    variant="title"
                    className={classes.serviceTitle}
                  >
                    Service
                  </Typography>
                  <IconButton color="inherit" onClick={this.handleRefreshChild}>
                    <Refresh />
                  </IconButton>
                </ToolBar>
              )}
            </AppBar>
            <div className={classes.mainContent}>
              {this.state.value === 0 ? (
                <List />
              ) : (
                <Service onRef={ref => (this.child = ref)} />
              )}
            </div>
            <Paper id="mainBottomNav" elevation={2} className={classes.botNav}>
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
      </Provider>
    );
  }
}

App.propType = {
  classes: PropType.object.isRequired
};

export default withStyles(styles)(App);
