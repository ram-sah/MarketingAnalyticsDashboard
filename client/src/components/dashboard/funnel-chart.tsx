import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface FunnelChartProps {
  data?: {
    visitors: number;
    mqls: number;
    sqls: number;
    opportunities: number;
    customers: number;
  };
}

export default function FunnelChart({ data }: FunnelChartProps) {
  if (!data) {
    return (
      <div className="bg-card-bg rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-dashboard-text">Lead Generation Funnel</h3>
        </div>
        <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  const chartData = [
    { name: "Visitors", value: data.visitors, color: "hsl(217, 91%, 60%)" },
    { name: "MQLs", value: data.mqls, color: "hsl(142, 76%, 36%)" },
    { name: "SQLs", value: data.sqls, color: "hsl(38, 92%, 50%)" },
    { name: "Opportunities", value: data.opportunities, color: "hsl(20, 100%, 50%)" },
    { name: "Customers", value: data.customers, color: "hsl(0, 84%, 60%)" },
  ];

  const COLORS = chartData.map(item => item.color);

  return (
    <div className="bg-card-bg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-dashboard-text">Lead Generation Funnel</h3>
        <button 
          className="text-sm text-google-blue hover:text-blue-700"
          data-testid="button-view-funnel-details"
        >
          View Details →
        </button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}