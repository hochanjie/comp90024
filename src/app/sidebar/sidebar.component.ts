import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { faHome,faChartPie, faMapMarked } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }
    
    faHome = faHome;
    faChartPie = faChartPie;
    faMapMarked = faMapMarked;

  ngOnInit(): void {
      $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
        
  }

}
