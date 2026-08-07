import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

function RevenueChart({ data, mlData }) {
  if (!data || data.length === 0) return null;

  // 1. Clone the data so we don't accidentally mutate the original state
  const chartData = data.map(item => ({
    date: item.date,
    revenue: item.revenue,
    predictedRevenue: null // Null means no dashed line for historical days
  }));

  // 2. If the AI has processed the data, inject the future prediction!
  if (mlData) {
    const lastPoint = chartData[chartData.length - 1];
    lastPoint.predictedRevenue = lastPoint.revenue; // Anchor the prediction line

    const rawLastDate = lastPoint.date || lastPoint.Date;

    if (rawLastDate) {
      const lastDate = new Date(rawLastDate);

      if (!isNaN(lastDate.getTime())) {
        lastDate.setDate(lastDate.getDate() + 1);
        const nextDayString = lastDate.toISOString().split('T')[0];

        // NOTE: the backend field is `predicted_next_day_revenue`, not
        // `predicted_total_revenue` -- that mismatch was why the forecast
        // point on the chart never appeared.
        chartData.push({
          date: `${nextDayString} (AI)`,
          revenue: null, // Null means no solid line for the future
          predictedRevenue: mlData.predicted_next_day_revenue
        });
      }
    }
  }

  return (
    <div style={{ width: '100%', height: 400, marginTop: '20px' }}>
      <h3 style={{ color: '#ffffff', marginBottom: '20px' }}>Revenue Trend & Forecast</h3>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2b2b45" />
          <XAxis dataKey="date" stroke="#a0a0b5" tick={{ fill: '#a0a0b5' }} />
          <YAxis stroke="#a0a0b5" tick={{ fill: '#a0a0b5' }} />

          <Tooltip
            contentStyle={{ backgroundColor: '#161625', borderColor: '#2b2b45', color: '#fff' }}
            itemStyle={{ color: '#00d2ff' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }}/>

          <Line
            type="monotone"
            dataKey="revenue"
            name="Historical Revenue"
            stroke="#00e676"
            strokeWidth={3}
            dot={{ r: 4, fill: '#00e676', stroke: '#161625', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />

          {mlData && (
            <Line
              type="monotone"
              dataKey="predictedRevenue"
              name="AI Forecast"
              stroke="#ffea00"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 5, fill: '#ffea00', stroke: '#161625', strokeWidth: 2 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;