"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface HabitChartProps {
  data: {
    fitness: number
    mente: number
    nutricion: number
    saludDigital: number
  }
}

const COLORS = {
  fitness: "#01D9AA",
  mente: "#09ABE0",
  nutricion: "#FF6B6B",
  saludDigital: "#A855F7",
}

const HABIT_LABELS = {
  fitness: "Fitness",
  mente: "Mente",
  nutricion: "Nutrición",
  saludDigital: "Salud Digital",
}

export function HabitChart({ data }: HabitChartProps) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: HABIT_LABELS[key as keyof typeof HABIT_LABELS],
    value,
    color: COLORS[key as keyof typeof COLORS],
  }))

  const total = Object.values(data).reduce((sum, value) => sum + value, 0)

  if (total === 0) {
    return <div className="h-64 flex items-center justify-center text-white">No hay datos de hábitos disponibles</div>
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-[#161B22] border border-[#30363D] p-3 rounded-lg shadow-lg">
          <p className="font-medium text-white">{`${data.name}: ${data.value} día${data.value !== 1 ? "s" : ""} cumpliendo`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => <span style={{ color: entry.color }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
