import React, { useState, useEffect } from 'react';  // Add useState, useEffect
import { Box, Typography, Grid, useTheme } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StatCard from '../components/Dashboard/StatCard';
import { feeService } from '../services/api';  // Add this import

const Home = () => {
  const theme = useTheme();
  const [stats, setStats] = useState({
    totalStudents: 0,
    monthlyCollection: 0,
    yearlyCollection: 0,
    growthRate: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const monthlyData = await feeService.getStudents('monthly');
        const yearlyData = await feeService.getStudents('yearly');

        const uniqueStudents = new Set([
          ...monthlyData.map(s => s.studentNo),
          ...yearlyData.map(s => s.studentNo)
        ]);

        const monthlyTotal = monthlyData.reduce((sum, s) => sum + Number(s.payment), 0);
        const yearlyTotal = yearlyData.reduce((sum, s) => sum + Number(s.payment), 0);

        const currentMonth = new Date().getMonth();
        const currentMonthData = monthlyData.filter(s => 
          new Date(s.timestamp).getMonth() === currentMonth
        );
        const prevMonthData = monthlyData.filter(s => 
          new Date(s.timestamp).getMonth() === currentMonth - 1
        );
        const currentTotal = currentMonthData.reduce((sum, s) => sum + Number(s.payment), 0);
        const prevTotal = prevMonthData.reduce((sum, s) => sum + Number(s.payment), 0);
        const growthRate = prevTotal ? ((currentTotal - prevTotal) / prevTotal) * 100 : 0;

        setStats({
          totalStudents: uniqueStudents.size,
          monthlyCollection: monthlyTotal,
          yearlyCollection: yearlyTotal,
          growthRate: growthRate.toFixed(1)
        });
      } catch (err) {
        console.error('Failed to fetch statistics:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
        <StatCard
            title="Monthly Collection"
            value={`RM ${stats.monthlyCollection.toLocaleString('en-IN')}`}
            icon={<PaymentIcon sx={{ fontSize: 40 }} />}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Yearly Collection"
            value={`RM ${stats.yearlyCollection.toLocaleString('en-IN')}`}
            icon={<AccountBalanceIcon sx={{ fontSize: 40 }} />}
            color={theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Growth Rate"
            value={`${stats.growthRate}%`}
            icon={<TrendingUpIcon sx={{ fontSize: 40 }} />}
            color={theme.palette.warning.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;