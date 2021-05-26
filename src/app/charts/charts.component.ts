import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions, ChartOptions } from 'chart.js';
import { Label,Color,MultiDataSet,SingleDataSet } from 'ng2-charts';

import Melbourne_SA2_obj from '../../assets/mapBoundry/Melbourne.json';
import Adelaide_SA2_obj from '../../assets/mapBoundry/Adelaide.json';
import Brisbane_SA2_obj from '../../assets/mapBoundry/Brisbane.json';
import Perth_SA2_obj from '../../assets/mapBoundry/Perth.json';
import Sydney_SA2_obj from '../../assets/mapBoundry/Sydney.json';

import { GetMapDataService } from '../service/dataFetch/get-map-data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
    
    private Melbourne_SA2_count:number = 0;
    private Melbourne_population:number = 0;
    private Melbourne_homeless:number = 0;
    private Melbourne_income:number = 0;
    private Melbourne_homeless_rate:number = 0;
    private Melbourne_density:number = 0;
    
    private Sydney_SA2_count:number = 0;
    private Sydney_population:number = 0;
    private Sydney_homeless:number = 0;
    private Sydney_income:number = 0;
    private Sydney_homeless_rate:number = 0;
    private Sydney_density:number = 0; 
    
    private Brisbane_SA2_count:number = 0;
    private Brisbane_population:number = 0;
    private Brisbane_homeless:number = 0;
    private Brisbane_income:number = 0;
    private Brisbane_homeless_rate:number = 0;
    private Brisbane_density:number = 0;
    
    private Perth_SA2_count:number = 0;
    private Perth_population:number = 0;
    private Perth_homeless:number = 0;
    private Perth_income:number = 0;
    private Perth_homeless_rate:number = 0;
    private Perth_density:number = 0;

    
    private Adelaide_SA2_count:number = 0;
    private Adelaide_population:number = 0;
    private Adelaide_homeless:number = 0;
    private Adelaide_income:number = 0;
    private Adelaide_homeless_rate:number = 0;
    private Adelaide_density:number = 0;
    
    //    BarChart
    barChartOptions: ChartOptions = {
        responsive: true,
      };
      barChartLabels: Label[] = ['Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide'];
      barChartType: ChartType = 'bar';
      barChartLegend = true;
      barChartPlugins = [];

      barChartData: ChartDataSets[] = [];
    
        //RadarChart
    public radarChartOptions: RadialChartOptions = {
        responsive: true,
      };
      public radarChartLabels: Label[] = ['Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide'];

      public radarChartData: ChartDataSets[] = [];
      public radarChartType: ChartType = 'radar';
    
  constructor(private _getMapData: GetMapDataService,) { 
      
  }
    
      

  ngOnInit(): void {
      
      for (let j = 0; j < Melbourne_SA2_obj.features.length; j++){

			let SA2_name = Melbourne_SA2_obj.features[j].properties.sa2_name16
			let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
			let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
			let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)
			
			this.Melbourne_population += SA2_population
			this.Melbourne_homeless += SA2_homeless
			this.Melbourne_income += SA2_population * SA2_income
			this.Melbourne_SA2_count = this.Melbourne_SA2_count + 1 

		}
		

		this.Melbourne_income = this.Melbourne_income / this.Melbourne_population

		this.Melbourne_homeless_rate = this.Melbourne_homeless / this.Melbourne_population

		this.Melbourne_density = this.Melbourne_population / 9992

		console.log("Melbourne")
		console.log(this.Melbourne_SA2_count);
		console.log(this.Melbourne_population);
		console.log(this.Melbourne_homeless);
		console.log(this.Melbourne_income);
		console.log(this.Melbourne_homeless_rate);
		console.log(this.Melbourne_density);

      
      //Sydney----------------------

		for (let j = 0; j < Sydney_SA2_obj.features.length; j++){

			let SA2_name = Sydney_SA2_obj.features[j].properties.sa2_name16;
			let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name);
			let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name);
			let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name);
			
			this.Sydney_population += SA2_population
			this.Sydney_homeless += SA2_homeless
			this.Sydney_income += SA2_population * SA2_income
			this.Sydney_SA2_count = this.Sydney_SA2_count + 1 

		}


		this.Sydney_income = this.Sydney_income / this.Sydney_population

		this.Sydney_homeless_rate = this.Sydney_homeless / this.Sydney_population
		this.Sydney_density = this.Sydney_population / 12368

		console.log("Sydney")

		console.log(this.Sydney_SA2_count)
		console.log(this.Sydney_population)
		console.log(this.Sydney_homeless)
		console.log(this.Sydney_income)
		console.log(this.Sydney_homeless_rate)
		console.log(this.Sydney_density)



		//Brisbane--------------------------------------------------------------------------------------
		for (var j = 0; j < Brisbane_SA2_obj.features.length; j++){

			let SA2_name = Brisbane_SA2_obj.features[j].properties.sa2_name16
			let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
			let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
			let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)
			
			this.Brisbane_population += SA2_population
			this.Brisbane_homeless += SA2_homeless
			this.Brisbane_income += SA2_population * SA2_income
			this.Brisbane_SA2_count = this.Brisbane_SA2_count + 1 

		}


		this.Brisbane_income = this.Brisbane_income / this.Brisbane_population

		this.Brisbane_homeless_rate = this.Brisbane_homeless / this.Brisbane_population
		this.Brisbane_density = this.Brisbane_population / 15842

		console.log("Brisbane")
		console.log(this.Brisbane_SA2_count)
		console.log(this.Brisbane_population)
		console.log(this.Brisbane_homeless)
		console.log(this.Brisbane_income)
		console.log(this.Brisbane_homeless_rate)
		console.log(this.Brisbane_density)

		//Perth----------

		for (var j = 0; j < Perth_SA2_obj.features.length; j++){

			let SA2_name = Perth_SA2_obj.features[j].properties.sa2_name16
			let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
			let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
			let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)
			
			this.Perth_population += SA2_population
			this.Perth_homeless += SA2_homeless
			this.Perth_income += SA2_population * SA2_income
			this.Perth_SA2_count = this.Perth_SA2_count + 1 

		}


		this.Perth_income = this.Perth_income / this.Perth_population

		this.Perth_homeless_rate = this.Perth_homeless / this.Perth_population
		this.Perth_density = this.Perth_population / 6300

		console.log("Perth")
		console.log(this.Perth_SA2_count)
		console.log(this.Perth_population)
		console.log(this.Perth_homeless)
		console.log(this.Perth_income)
		console.log(this.Perth_homeless_rate)
		console.log(this.Perth_density)



		//Adelaide--------------------------------------------------------------------------------------

		for (var j = 0; j < Adelaide_SA2_obj.features.length; j++){

			let SA2_name = Adelaide_SA2_obj.features[j].properties.sa2_name16
			let SA2_population = this._getMapData.getDataFromSA2NamePopulation(SA2_name)
			let SA2_income = this._getMapData.getDataFromSA2NameIncome(SA2_name)
			let SA2_homeless = this._getMapData.getDataFromSA2NameHomeless(SA2_name)
			
			this.Adelaide_population += SA2_population
			this.Adelaide_homeless += SA2_homeless
			this.Adelaide_income += SA2_population * SA2_income
			this.Adelaide_SA2_count = this.Adelaide_SA2_count + 1 

		}


		this.Adelaide_income = this.Adelaide_income / this.Adelaide_population

		this.Adelaide_homeless_rate = this.Adelaide_homeless / this.Adelaide_population
		this.Adelaide_density = this.Adelaide_population / 3259


		console.log("Adelaide")
		console.log(this.Adelaide_SA2_count)
		console.log(this.Adelaide_population)
		console.log(this.Adelaide_homeless)
		console.log(this.Adelaide_income)
		console.log(this.Adelaide_homeless_rate)
		console.log(this.Adelaide_density)

        this.barChartData = [{ data: [this.Melbourne_density, this.Sydney_density, this.Brisbane_density, this.Perth_density, this.Adelaide_density], label: 'Density' }];

        this.radarChartData = [{ data: [this.Melbourne_homeless_rate, this.Sydney_homeless_rate, this.Brisbane_homeless_rate, this.Perth_homeless_rate, this.Adelaide_homeless_rate], label: 'homeless_rate' }];

  }
    

    
    
    
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
    
    
    
////    BarChart
//    barChartOptions: ChartOptions = {
//        responsive: true,
//      };
//      barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
//      barChartType: ChartType = 'bar';
//      barChartLegend = true;
//      barChartPlugins = [];
//
//      barChartData: ChartDataSets[] = [
//        { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
//      ];
//    
    
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
