import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { RmaDashboardComponent } from './rma-dashboard/rma-dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { RouterModule }   from '@angular/router';
import { RmaComponent } from './rma-dashboard/rma/rma.component';
import { GuidComponent } from './rma-dashboard/guid/guid.component';
import { TestResultsComponent } from './rma-dashboard/test-results/test-results.component';
import { ToolService } from './tool.service';
import { HttpModule }    from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    RmaDashboardComponent,
    ReportsComponent,
    RmaComponent,
    GuidComponent,
    TestResultsComponent
  ],
 
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',component: RmaDashboardComponent, children:[{path:'',component:RmaComponent},
                                                             {path:'guid',component:GuidComponent},
                                                             {path:'test',component:TestResultsComponent}]
      },
      {
        path:'reports',component:ReportsComponent

      }
    ])
  ],
  providers: [ToolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
