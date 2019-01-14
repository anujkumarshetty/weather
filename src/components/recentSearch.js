import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: 320,
    width: 250
  },

  header: {
   marginLeft: '45%'
  },
  spanClass: {
    marginTop: "100px"
  },
  tempSize : {
      fontSize : '13px'
  },
  date : {
    marginTop:'5px', 
    fontSize:"13px"
  }
});

class RecentSearch extends React.Component {
  state = {
    spacing: "16"
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value
    });
  };

  render() {
    const { classes,searchResult } = this.props;
    const { spacing } = this.state;

    return (
        <div>
            { searchResult.length ===0 ? "": <h4 className={classes.header}>Recent Searches</h4>}
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                <Grid
                    container
                    className={classes.demo}
                    justify="center"
                    spacing={Number(spacing)}
                >
                    {searchResult.map(value => (
                    <Grid key={value} item>
                        <Paper className={classes.paperRoot} elevation={1}>
                        {value.consolidated_weather.map((day, index) => (
                            <div>
                                {index === 0 ? value.title : ""}
                                {index === 0 ? <hr /> : ""}
                                <Grid container spacing={24}>
                                
                                <Grid item xs={4}>
                                <span className={classes.date}>
                                    {index === 0 ? "Today":""}
                                    {index === 1 ? "Tomorrow":""}
                                    {(index === 0) || (index === 1) ? "": day.applicable_date} 
                                    
                                </span>
                                </Grid>
                                <Grid item xs={2} >
                                <img
                                    widht="30px"
                                    height="30px"
                                    src={require(`./weatherIcons/${
                                        day.weather_state_abbr
                                    }.svg`)}
                                    style={{marginLeft: '-13px'}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <span className={classes.tempSize}>
                                    {day.weather_state_name}
                                    <br/>
                                    ↑ {Math.floor(day.max_temp)}℃  ↓{Math.floor(day.min_temp)}℃
                                    </span> 
                                </Grid>
                            </Grid>
                            </div>
                        ))}
                        </Paper>
                    </Grid>
                    ))}
                </Grid>
                </Grid>
            </Grid>
      </div>
    );
  }
}

RecentSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RecentSearch);
