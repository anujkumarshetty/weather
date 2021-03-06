import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Search from "@material-ui/icons/Search";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


import WeatherDetail from "./weatherDetail";
import RecentSearch from "./recentSearch";

const styles = theme => ({
  container: {
    position: "absolute",
    marginLeft: "60%",
    top: "115px"
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
    position: "absolute",
    marginLeft: "50%",
    marginTop: "10%"
  },
   close: {
    padding: theme.spacing.unit / 2,
  },
});

class SearchButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {},
      loader: false,
      searchResult: [],
      open: false,
      
    };
  }

  handleClick = () => {
    this.setState({ open: true });
    setTimeout(this.handleClose, 3000)
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleChange = event => {
    console.log(this.props.location);
    this.setState({ loader: true });
    if(this.props.location){
      axios.get(`http://localhost:8000/city/${this.props.location}`).then(res => {
        console.log(res.data[0]);
      if(res.data.length>0){
        axios
        .get(`http://localhost:8000/woeid/${res.data[0].woeid}`)
        .then(res => {
          console.log(res.data);
          this.setState({ weatherData: res.data });
          this.setState({
            searchResult: [...this.state.searchResult, res.data]
          });
          console.log(this.state.searchResult);
          this.setState({ loader: false });
        });
      }else{
        this.handleClick();
        this.setState({ loader: false });   
      }
      });
  } else {
    this.handleClick();
    this.setState({ loader: false });
  }
  };

  render() {
    let { classes } = this.props;
    return (
      <div>
        <div className={classes.loader}>
          {this.state.loader ? (
            <img
              widht="50px"
              height="50px"
              src={require(`./weatherIcons/pinwheel.svg`)}
            />
          ) : (
            ""
          )}
        </div>
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
        <RecentSearch
          searchResult={this.state.searchResult ? this.state.searchResult : {}}
          searchResult={
            this.state.searchResult ? this.state.searchResult : []
          }
        />
        <div>
        {/* <Button onClick={this.handleClick}>Open simple snackbar</Button> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.props.location==-"" ? "Cannot be empty, Please try a city name.":<span id="message-id">Oops!! cannot find data for <span style={{color:'red'}}>  {this.props.location}</span>, Try rephrasing.</span> }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
      </div>
    );
  }
}

SearchButton.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SearchButton);
