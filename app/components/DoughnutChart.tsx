"use client"

import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJs.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
	const data = {
		labels: ["Bank 1", "Bank 2", "Bank 3"],
		datasets: [
			{
				label: "Banks",
				data: [12000, 14000, 15000],
				backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
			},
		],
	}
	return (
		<Doughnut
			data={data}
			options={{ cutout: "70%", plugins: { legend: { display: false } } }}
		/>
	)
}

export default DoughnutChart
