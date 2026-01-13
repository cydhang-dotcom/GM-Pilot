import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data: comparison of daily balance between current month and last month
const data = [
  { day: '1', current: 142500, last: 138000 },
  { day: '3', current: 141000, last: 137500 },
  { day: '6', current: 139500, last: 136000 },
  { day: '9', current: 145000, last: 134000 }, // Income came in
  { day: '12', current: 142000, last: 148000 }, // Last month had big income here
  { day: '15', current: 142590, last: 146000 }, // Today
  { day: '18', current: null, last: 144000 },
  { day: '21', current: null, last: 141000 },
  { day: '24', current: null, last: 139000 },
  { day: '27', current: null, last: 135000 },
  { day: '30', current: null, last: 132000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const current = payload.find((p: any) => p.name === 'current');
    const last = payload.find((p: any) => p.name === 'last');

    const curVal = current ? current.value : null;
    const lastVal = last ? last.value : null;
    
    let diff = 0;
    let percent = 0;
    
    if (curVal !== null && lastVal !== null) {
        diff = curVal - lastVal;
        percent = (diff / lastVal) * 100;
    }

    return (
      <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl text-xs">
        <p className="text-gray-400 font-bold mb-2">{label}日 对比</p>
        
        {curVal !== null && (
            <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-gray-500">本月:</span>
                <span className="font-mono font-bold text-gray-900">¥{(curVal/10000).toFixed(2)}w</span>
            </div>
        )}
        
        {lastVal !== null && (
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                <span className="text-gray-500">上月:</span>
                <span className="font-mono font-bold text-gray-500">¥{(lastVal/10000).toFixed(2)}w</span>
            </div>
        )}

        {curVal !== null && lastVal !== null && (
            <div className={`mt-2 pt-2 border-t border-gray-50 flex justify-between gap-4 font-bold ${diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                <span>差额: {diff >= 0 ? '+' : ''}{(diff/10000).toFixed(2)}w</span>
                <span>{diff >= 0 ? '↑' : '↓'} {Math.abs(percent).toFixed(1)}%</span>
            </div>
        )}
      </div>
    );
  }
  return null;
};

interface Props {
  className?: string;
}

const CashFlowComparisonChart: React.FC<Props> = ({ className }) => {
  return (
    <div className={`w-full ${className || 'h-48'}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F9FAFB" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 10, fill: '#D1D5DB' }} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(val) => `${val}`}
            interval={5}
          />
          {/* Hide Y Axis values to emphasize trend shape over absolute numbers */}
          <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
          
          <Tooltip content={<CustomTooltip />} />
          
          {/* Last Month: Gray dashed line area */}
          <Area 
            type="monotone" 
            dataKey="last" 
            stroke="#D1D5DB" 
            strokeDasharray="4 4" 
            strokeWidth={1.5} 
            fillOpacity={0} 
            name="last"
          />
          {/* Current Month: Blue solid line area */}
          <Area 
            type="monotone" 
            dataKey="current" 
            stroke="#3B82F6" 
            strokeWidth={2.5} 
            fillOpacity={1} 
            fill="url(#colorCurrent)" 
            name="current"
            activeDot={{ r: 4, strokeWidth: 0, fill: '#2563EB' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowComparisonChart;