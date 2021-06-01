import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER  } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { ChartsModule } from 'ng2-charts';

import { AgmCoreModule } from '@agm/core';
//import { MapsComponent } from './maps/maps.component';

import { HttpClientModule } from '@angular/common/http';
//import { CrudOpsService } from './service/RestApis';
import { ConfigService } from './service/config/config.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverviewComponent } from './overview/overview.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCQoPGJddjhRxXzErKnu2L9gE4PbypDymU'
    }),
    AppRoutingModule,
    ChartsModule,
      HttpClientModule,
      FontAwesomeModule 
  ],
  providers: [{ 
	  provide : APP_INITIALIZER, 
		multi : true, 
		 deps : [ConfigService], 
		 useFactory : (configService : ConfigService) =>  () => configService.loadAppConfig()
	},{ 
	  provide : APP_INITIALIZER, 
		multi : true, 
		 deps : [ConfigService], 
		 useFactory : (configService : ConfigService) =>  () => configService.loadAppUrlConfig()
	}],
  bootstrap: [AppComponent]
})
export class AppModule { }
