import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Search from "@material-ui/icons/Search";
import axios from "axios";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
  }
});

class SearchButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleChange = event => {
    alert("clicked");
    console.log(this.props.location);

    axios.get(`http://localhost:8000/city/${this.props.location}`).then(res => {
      console.log(res.data[0]);

      axios.get(`http://localhost:8000/woeid/${res.data[0].woeid}`).then(res => {
        console.log(res.data);
      });
    });

    axios.get(`https://www.metaweather.com/static/img/weather/s.svg`).then(res => {
        console.log(res.data);
      });
    // https://www.metaweather.com/static/img/weather/s.svg
  };

  render() {
    let { classes } = this.props;
    return (
      <div>
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
    );
  }
}

SearchButton.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SearchButton);
