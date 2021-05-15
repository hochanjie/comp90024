import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label,Color,MultiDataSet,SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }
    //RadarChart
    public radarChartOptions: RadialChartOptions = {
        responsive: true,
      };
      public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
        'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

      public radarChartData: ChartDataSets[] = [
        { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
      ];
      public radarChartType: ChartType = 'radar';
    
    
    
//    LineChart
    
    lineChartData: ChartDataSets[] = [
        { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
      ];

      lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

      lineChartOptions = {
        responsive: true,
      };

      lineChartColors: Color[] = [
        {
          borderColor: 'black',
          backgroundColor: 'rgba(255,255,0,0.28)',
        },
      ];

      lineChartLegend = true;
      lineChartPlugins = [];
      lineChartType = 'line';
    
    
    
//    BarChart
    barChartOptions: ChartOptions = {
        responsive: true,
      };
      barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
      barChartType: ChartType = 'bar';
      barChartLegend = true;
      barChartPlugins = [];

      barChartData: ChartDataSets[] = [
        { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
      ];
    
    
//    DonutChart
    doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
      doughnutChartData: MultiDataSet = [
        [55, 25, 20]
      ];
      doughnutChartType: ChartType = 'doughnut';
    
//    PieChart
    public pieChartOptions: ChartOptions = {
        responsive: true,
      };
      public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
      public pieChartData: SingleDataSet = [30, 50, 20];
      public pieChartType: ChartType = 'pie';
      public pieChartLegend = true;
      public pieChartPlugins = [];
    
    
//    Bubble Chart
    public bubbleChartOptions: ChartOptions = {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              min: 0,
              max: 50,
            }
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 50,
            }
          }]
        }
      };
      public bubbleChartType: ChartType = 'bubble';
      public bubbleChartLegend = true;

      public bubbleChartData: ChartDataSets[] = [
        {
          data: [
            { x: 15, y: 15, r: 15 },
            { x: 25, y: 15, r: 25 },
            { x: 36, y: 12, r: 33 },
            { x: 10, y: 18, r: 18 },
          ],
          label: 'Investment Equities',
        },
      ];

}
