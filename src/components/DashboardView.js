import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
  DonutLarge as DonutLargeIcon
} from '@mui/icons-material';
import { Chart } from 'react-google-charts';

const DashboardView = () => {
  const [timeRange, setTimeRange] = useState('week');

  const pendingWorkData = [
    ['Priority', 'Tasks'],
    ['High', 11],
    ['Medium', 25],
    ['Low', 12],
  ];

  const performanceData = [
    ['Week', 'Your Performance', 'Team Average'],
    ['1', 65, 60],
    ['2', 70, 65],
    ['3', 75, 68],
    ['4', 80, 72],
    ['5', 85, 75],
  ];

  const completedWorkData = [
    ['Category', 'Bugs Fixed', 'Features Developed', 'Documents Completed'],
    ['Jan', 5, 3, 2],
    ['Feb', 7, 4, 3],
    ['Mar', 8, 5, 4],
    ['Apr', 6, 6, 5],
  ];

  const notificationsData = [
    ['Type', 'Count'],
    ['Mentions', 5],
    ['Meeting Reminders', 12],
    ['Deadlines', 8],
    ['Project Updates', 15],
  ];

  return (
    <Box>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">Dashboard</Typography>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label="Time Range"
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <Grid container spacing={3}>
        {/* Pending Work Tracker */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <PieChartIcon color="primary" />
                <Typography variant="h6" ml={1}>Pending Work</Typography>
              </Box>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={pendingWorkData}
                options={{
                  pieHole: 0.4,
                  colors: ['#EF5350', '#FFA726', '#66BB6A'],
                  legend: { position: 'bottom' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Performance Improvement */}
        <Grid item xs={12} md={6} lg={8}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TimelineIcon color="primary" />
                <Typography variant="h6" ml={1}>Performance Trends</Typography>
              </Box>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={performanceData}
                options={{
                  hAxis: { title: 'Week' },
                  vAxis: { title: 'Score' },
                  series: {
                    0: { color: '#2563EB' },
                    1: { color: '#9E9E9E' },
                  },
                  legend: { position: 'bottom' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Completed Work Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <BarChartIcon color="primary" />
                <Typography variant="h6" ml={1}>Completed Work</Typography>
              </Box>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={completedWorkData}
                options={{
                  isStacked: true,
                  hAxis: { title: 'Count' },
                  vAxis: { title: 'Month' },
                  colors: ['#7E57C2', '#42A5F5', '#26C6DA'],
                  legend: { position: 'bottom' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Notifications Dashboard */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <DonutLargeIcon color="primary" />
                <Typography variant="h6" ml={1}>Notifications</Typography>
              </Box>
              <Chart
                width={'100%'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={notificationsData}
                options={{
                  pieHole: 0.6,
                  colors: ['#FF7043', '#29B6F6', '#EC407A', '#66BB6A'],
                  legend: { position: 'bottom' },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardView;