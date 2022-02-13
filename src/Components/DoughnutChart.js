import React, { Component } from "react";
import Chart from "react-apexcharts";

class DoughnutChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                labels: ['Lectures', "Sleep", "Eat", "Self Study", "Free Time"]
            },
            series: [6, 8, 1, 2, 2],
            labels: ['A', 'B', 'C', 'D', 'E']
        }
    }

    render() {

        return (
            <div className="donut">
                <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
            </div>
        );
    }
}


export default DoughnutChart;