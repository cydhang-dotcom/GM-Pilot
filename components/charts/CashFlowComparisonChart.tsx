
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
      <div className="bg-white/90 backdrop-blur-md p-4 border border-white/50 shadow-xl rounded-2xl text-xs min-w-[140px]">
        <p className="text-gray-400 font-bold mb-3">{label}日 资金快照</p>
        
        {curVal !== null && (
            <div className="flex items-center justify-between gap-4 mb-1.5">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200"></span>
                    <span className="text-gray-600 font-medium">本月</span>
                </div>
                <span className="font-mono font-black text-gray-900">¥{(curVal/10000).toFixed(2)}w</span>
            </div>
        )}
        
        {lastVal !== null && (
            <div className="flex items-center justify-between gap-4 mb-3">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                    <span className="text-gray-400 font-medium">上月</span>
                 </div>
                <span className="font-mono font-bold text-gray-400">¥{(lastVal/10000).toFixed(2)}w</span>
            </div>
        )}

        {curVal !== null && lastVal !== null && (
            <div className={`mt-2 pt-2 border-t border-gray-100 flex justify-between items-center font-bold ${diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                <span className="bg-gray-50 px-1.5 py-0.5 rounded text-[10px] text-gray-400 font-normal">环比差异</span>
                <div className="flex items-center gap-1">
                    <span>{diff >= 0 ? '+' : ''}{(diff/10000).toFixed(2)}w</span>
                    <span className="text-[10px] opacity-80">({Math.abs(percent).toFixed(1)}%)</span>
                </div>
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
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
          <XAxis 
            dataKey="day" 
            tick={{ fontSize: 10, fill: '#9CA3AF', fontWeight: 500 }} 
            axisLine={false} 
            tickLine={false}
            tickFormatter={(val) => `${val}`}
            interval={2}
            dy={10}
          />
          {/* Hide Y Axis values to emphasize trend shape over absolute numbers */}
          <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }} />
          
          {/* Last Month: Gray dashed line area */}
          <Area 
            type="monotone" 
            dataKey="last" 
            stroke="#CBD5E1" 
            strokeDasharray="4 4" 
            strokeWidth={2} 
            fillOpacity={0} 
            name="last"
            animationDuration={1500}
          />
          {/* Current Month: Blue solid line area */}
          <Area 
            type="monotone" 
            dataKey="current" 
            stroke="#3B82F6" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorCurrent)" 
            name="current"
            activeDot={{ r: 6, strokeWidth: 3, stroke: '#FFFFFF', fill: '#2563EB', className: 'shadow-lg' }}
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CashFlowComparisonChart;
