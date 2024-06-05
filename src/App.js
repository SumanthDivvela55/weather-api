import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Container,
  TextField, Button, Card, CardContent, Grid, Box, Paper
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const APIkey = 'b11a49a372096cd4959351832e7dcd25';

  const searchPressed = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIkey}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setWeather(result);
      });
  };

  const getValue = (value) => {
    return value !== undefined ? value : "undefined";
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Weather App
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4} display="flex" justifyContent="center">
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <TextField
                label="Enter city/town..."
                variant="outlined"
                onChange={(e) => setCity(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={searchPressed}>
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
        {typeof weather.main !== "undefined" && (
          <Box mt={4} display="flex" justifyContent="center">
            <Paper elevation={3} style={{ padding: 20, maxWidth: 600 }}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    <LocationOnIcon /> {getValue(weather.name)}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        Latitude: {getValue(weather.coord?.lat)}°
                      </Typography>
                      <Typography variant="body1">
                        Longitude: {getValue(weather.coord?.lon)}°
                      </Typography>
                      <Typography variant="body1">
                        <OpacityIcon /> Humidity: {getValue(weather.main?.humidity)}%
                      </Typography>
                      <Typography variant="body1">
                        Pressure: {getValue(weather.main?.pressure)} hPa
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        <ThermostatIcon /> Temperature: {getValue(weather.main?.temp)}°F
                      </Typography>
                      <Typography variant="body1">
                        Max Temp: {getValue(weather.main?.temp_max)}°F
                      </Typography>
                      <Typography variant="body1">
                        Min Temp: {getValue(weather.main?.temp_min)}°F
                      </Typography>
                      <Typography variant="body1">
                        Feels like: {getValue(weather.main?.feels_like)}°F
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        <AirIcon /> Wind direction: {getValue(weather.wind?.deg)}°
                      </Typography>
                      <Typography variant="body1">
                        Wind speed: {getValue(weather.wind?.speed)} m/s
                      </Typography>
                      <Typography variant="body1">
                        Weather: {getValue(weather.weather?.[0]?.main)}
                      </Typography>
                      <Typography variant="body1">
                        Description: {getValue(weather.weather?.[0]?.description)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;
