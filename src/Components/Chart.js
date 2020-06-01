import React, { Component } from 'react';
//import { Bar, Line, Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        title: 'algorithm'
    }

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: this.props.title,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Time to Execute (ms)'
                                }
                            }],
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Input Size'
                                }
                            }]
                        },
                        // backgroundColor: [
                        //     'rgba(255, 99, 132, 0.6)',
                        //     'rgba(54, 162, 235, 0.6)',
                        //     'rgba(255, 206, 86, 0.6)',
                        //     'rgba(75, 192, 192, 0.6)',
                        //     'rgba(153, 102, 255, 0.6)',
                        //     'rgba(255, 159, 64, 0.6)',
                        //     'rgba(255, 99, 132, 0.6)'
                        // ]
                        //   "Heap Sort"
                        //   "Insertion Sort"
                        //   "Merge Sort"
                        //   "Modified Quick Sort"
                        //   "Quick Sort"
                        //   "Selection Sort"
                    }}
                />
            </div>
        )
    }
}

export default Chart;
