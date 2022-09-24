import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GetDayWiseScanCount } from '../../../../services/dashboard/dto/getDayWiseScanCount';

type PrivateProps = {
  items: GetDayWiseScanCount[];
};

const LineChartExample: React.SFC<PrivateProps> = (props: PrivateProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={props.items} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="scanFormattedViewDate" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Scan Count" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartExample;
