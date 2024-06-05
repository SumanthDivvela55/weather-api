import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, Container,
  TextField, Button, Card, CardContent, Grid, Box, Paper
} from '@mui/material';


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
                {weather.name}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                        Latitude: {weather.coord.lat}°
                      </Typography>
                      <Typography variant="body1">
                        Longitude: {weather.coord.lon}°
                      </Typography>
                      <Typography variant="body1">
                     Humidity: {weather.main.humidity}%
                      </Typography>
                      <Typography variant="body1">
                        Pressure: {weather.main.pressure} hPa
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body1">
                         Temperature: {weather.main.temp}°F
                      </Typography>
                      <Typography variant="body1">
                        Max Temp: {weather.main.temp_max}°F
                      </Typography>
                      <Typography variant="body1">
                        Min Temp: {weather.main.temp_min}°F
                      </Typography>
                      <Typography variant="body1">
                        Feels like: {weather.main.feels_like}°F
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                         Wind direction: {weather.wind.deg}°
                      </Typography>
                      <Typography variant="body1">
                        Wind speed: {weather.wind.speed} m/s
                      </Typography>
                      <Typography variant="body1">
                        Weather: {weather.weather[0].main}
                      </Typography>
                      <Typography variant="body1">
                        Description: {weather.weather[0].description}
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
