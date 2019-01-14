import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchButton from "./searchButton";

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
  }
});

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }

  handleChange = event => {
    this.setState({
      location: event.target.value
    });
  };

  render() {
    let { classes } = this.props;
    return (
      <div>
        <form className={classes.container} noValidate autoComplete="off">
          {this.state.name}
          <TextField
            required
            id="outlined-required"
            label="City"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            onChange={event => this.handleChange(event)}
          />
        </form>

        <SearchButton location={this.state.location} />
      </div>
    );
  }
}

TextBox.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(TextBox);
