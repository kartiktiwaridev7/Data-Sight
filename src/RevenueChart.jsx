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
  const seriesSource = mlData?.historical_series?.length ? mlData.historical_series : data;

  if (!seriesSource || seriesSource.length === 0) return null;

  // 1. Clone the data so we don't accidentally mutate the original state
  const chartData = seriesSource.map(item => ({
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

        chartData.push({
          date: `${nextDayString} (AI)`,
          revenue: null, // Null means no solid line for the future
          predictedRevenue: mlData.predicted_next_day_revenue
        });
      }
    }
  }

  return (
    <div
      style={{
        width: '100%',
        marginTop: '20px',
        backgroundColor: '#161625',
        padding: 'clamp(14px, 3vw, 24px)',
        borderRadius: '16px',
        border: '1px solid #2b2b45',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          color: '#ffffff',
          margin: '0 0 16px 0',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
        }}
      >
        Revenue Trend & Forecast
      </h3>

      {/* Dedicated height box so ResponsiveContainer never overflows the heading */}
      <div style={{ width: '100%', height: 'clamp(260px, 45vw, 380px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 16, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2b45" />
            <XAxis
              dataKey="date"
              stroke="#a0a0b5"
              tick={{ fill: '#a0a0b5', fontSize: 12 }}
              minTickGap={25}
            />
            <YAxis
              stroke="#a0a0b5"
              tick={{ fill: '#a0a0b5', fontSize: 12 }}
              width={55}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#161625',
                borderColor: '#2b2b45',
                color: '#fff',
                borderRadius: '8px',
                fontSize: '0.85rem',
              }}
              itemStyle={{ color: '#00d2ff' }}
            />
            <Legend wrapperStyle={{ paddingTop: '12px', fontSize: '0.9rem' }} />

            <Line
              type="monotone"
              dataKey="revenue"
              name="Historical Revenue"
              stroke="#00e676"
              strokeWidth={3}
              dot={{ r: 3, fill: '#00e676', stroke: '#161625', strokeWidth: 2 }}
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
    </div>
  );
}

export default RevenueChart;