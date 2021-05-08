import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
    
    public radarChartOptions: RadialChartOptions = {
        responsive: true,
      };
      public radarChartLabels: Label[] = ['Punctuality', 'Communication', 'Problem Solving',
        'Team Player', 'Coding', 'Technical Knowledge', 'Meeting Deadlines'];

      public radarChartData: ChartDataSets[] = [
        { data: [0, 1, 2, 3, 4, 5, 6], label: 'Employee Skill Analysis' }
      ];
      public radarChartType: ChartType = 'radar';

}
