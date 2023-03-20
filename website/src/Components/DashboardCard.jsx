import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics } from '../Actions/statisticsAction';
import { Card, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const periodIntervals = {
  day: 'hour',
  week: 'day',
  month: 'week',
  year: 'month',
};

const intervals = {
  day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
};

function getChartData(data, period) {
  const labels = [];
  const values = [];
  const interval = periodIntervals[period];

  data.forEach((item) => {
    let unit;

    switch (interval) {
      case 'hour':
        unit = item.periodName + ':00';
        break;
      case 'week':
        unit = item.periodName;
        break;
      case 'month':
        unit = intervals[interval][item.periodName - 1];
        break;
      case 'day':
        // days of week
        unit = intervals[interval][item.periodName];
        break;
      default:
        unit = item.periodName;
    }
    labels.push(unit);
    values.push(item.count);
  });
  return {
    labels,
    datasets: [
      {
        label: 'Orders',
        data: values,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
      },
    ],
  };
}

export default function DashboardCard() {
  const [period, setPeriod] = useState('week');
  const [chartData, setChartData] = useState(null);
  const dispatch = useDispatch();

  const { info, loading } = useSelector((state) => state.statistics);

  useEffect(() => {
    dispatch(getStatistics(period));
  }, [dispatch, period]);

  useEffect(() => {
    if (info?.orderByPeriod) {
      setChartData(getChartData(info.orderByPeriod, info.timeQuery));
    }
  }, [info]);

  const handlePeriodChange = (event, newPeriod) => {
    newPeriod && setPeriod(newPeriod);
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: 'Order count',
          color: '#ff4b00',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time unit',
          color: '#ff4b00',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Orders per ' + periodIntervals[period],
      },
    },
  };

  return (
    <div className="dashboard__card statistics">
      <div className="dashboard__card-header statistics__header">
        <h2 className="dashboard__card-title">Dashboard</h2>
        <div>
          <span>In the last</span>
          <ToggleButtonGroup
            className="statistics__toggle-group"
            disabled={loading}
            size="small"
            value={period}
            exclusive
            onChange={handlePeriodChange}
          >
            <ToggleButton className="statistics__toggle-btn" value="day">
              Day
            </ToggleButton>
            <ToggleButton className="statistics__toggle-btn" value="week">
              Week
            </ToggleButton>
            <ToggleButton className="statistics__toggle-btn" value="month">
              Month
            </ToggleButton>
            <ToggleButton className="statistics__toggle-btn" value="year">
              Year
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="statistics__content">
        <div className="statistics__chart">
          {chartData && <Line data={chartData} options={options} />}
        </div>
        <div className="statistics__cards">
          <Card className="statistics__card" variant="outlined">
            <h3 className="statistics__card-title">Total Order</h3>
            <p className="statistics__card-value">{loading ? 'Loading...' : info?.totalOrders}</p>
          </Card>
          <Card className="statistics__card" variant="outlined">
            <h3 className="statistics__card-title">Total Revenue</h3>
            <p className="statistics__card-value">
              {loading ? 'Loading...' : `${info?.totalRevenue} so'm`}{' '}
            </p>
          </Card>
          <Card className="statistics__card" variant="outlined">
            <h3 className="statistics__card-title">Total Customer</h3>
            <p className="statistics__card-value">
              {loading ? 'Loading...' : info?.totalCustomers}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
