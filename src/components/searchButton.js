import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Search from "@material-ui/icons/Search";
import axios from "axios";

import WeatherDetail from "./weatherDetail";

const styles = theme => ({
  container: {
    
    position: "absolute",
    marginLeft: '60%',
    top: '15%',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  fab: {
    margin: theme.spacing.unit
  },
  loader: {
    position:'absolute',
    marginLeft: '50%',
    marginTop:'10%'
  }
});

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      loader: false
    };
  }

  handleChange = event => {
    console.log(this.props.location);
    this.setState({loader:true})
    axios.get(`http://localhost:8000/city/${this.props.location}`).then(res => {
      console.log(res.data[0]);

      axios
        .get(`http://localhost:8000/woeid/${res.data[0].woeid}`)
        .then(res => {
          console.log(res.data);
          this.setState({ weatherData: res.data });
          this.setState({loader:false})
        });
    });
  };

  render() {
    let { classes } = this.props;
    return (
      <div>
        <div className={classes.container}>
          <Fab
            variant="extended"
            aria-label="Delete"
            className={classes.fab}
            onClick={() => this.handleChange()}
          >
            <Search className={classes.extendedIcon} />
            Search
          </Fab>
        </div>
        <WeatherDetail
          weatherData={this.state.weatherData ? this.state.weatherData : {}}
        />
        <div className={classes.loader}>
          {this.state.loader ? <img widht="50px" height="50px" src={ require(`./weatherIcons/pinwheel.svg`) } /> : ""}
        </div>
      </div>
    );
  }
}

SearchButton.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SearchButton);
