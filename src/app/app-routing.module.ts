import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChartsComponent } from './charts/charts.component';
import { MapsComponent } from './maps/maps.component';


const routes: Routes = [
    {
//        path: '',
//        component: AdminComponent,
//        children: [
//            {
//                path: '',
//                redirectTo: 'dashboard',
//                pathMatch: 'full'
//            }, 
//            {
//                path: 'dashboard',
//                loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
//            }
//        ]
        path:'home',
        component:HomeComponent
    },{
        path:'charts',
        component:ChartsComponent
    },{
        path:'maps',
        component:MapsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
