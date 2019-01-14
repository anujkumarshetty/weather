import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    card: {
        minWidth: 275,
        width: '90%',
        marginLeft: '5%'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      align:{
          textAlign :'center'
      }
  });


function WeatherDetail(props) {
   
  const { classes, weatherData} = props;
  const bull = <span className={classes.bullet}>•</span>;
  const h = 'h';

  return (
    <div>
       {weatherData.consolidated_weather ?  
       <Card className={classes.card}>
      <CardContent>
        
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={4} sm={2}>
                <h3>{weatherData.title}</h3>
                    <Typography >
                    Current temperature : {weatherData.consolidated_weather ? Math.floor(weatherData.consolidated_weather[0].the_temp)+'°C' : ""}
                    </Typography>
                </Grid>
                {
                    props.weatherData.consolidated_weather && props.weatherData.consolidated_weather.map((item,index) => {
                    if(index<5)
                        return (
                            <Grid className= {classes.align} key = {index} item xs={4} sm={2}>
                                {index==0? <h4>Today</h4>: ""}
                                {index==1 ? <h4>Tomorrow</h4>: ""}
                                {index!=0 && index!=1 ? <h4>{weatherData.consolidated_weather[index].applicable_date}</h4> : ""}
                                <img widht="50px" height="50px" src={ require(`./weatherIcons/${weatherData.consolidated_weather ? weatherData.consolidated_weather[index].weather_state_abbr : "l"}.svg`) } />
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {weatherData.consolidated_weather ? weatherData.consolidated_weather[index].weather_state_name : ""}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Min : {Math.floor(weatherData.consolidated_weather[index].min_temp)+'°C'}
                                </Typography>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Max : {Math.floor(weatherData.consolidated_weather[index].max_temp)+'°C'}
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
      </CardContent>
    </Card>: ""}
   
    </div>
  );
}

WeatherDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeatherDetail);