import { Component, OnInit } from '@angular/core';
import { ToolService } from '../tool.service';
import { rma } from '../rma-dashboard/rma';
import { Guid } from '../rma-dashboard/guid/guid';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  start:number=0;
  end:number=4;
  rma:rma[]=new Array();
  list=[];
  dateRange:boolean=false;
  guidNo:boolean=false;
  pInspection:boolean=false;
  component:boolean=false;
  rmaLength:number;
  testList=Guid.testList;
  public pieChartLabels:string[] = ['Sim test', 'Led test', 'zigbee test'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
  public doughnutChartLabels:string[] = ['Sim test', 'Led test', 'zigbee test'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
 
 
  constructor(private toolService :ToolService) { }

  ngOnInit() { 
    this.toolService.getRmaList().subscribe((response=>{this.list=response['response'];
    this.rmaLength=this.list.length;
  for (var index = 0; index < this.list.length; index++) {
    var element = this.list[index];
    // console.log(element);
    // console.log(element['id']);
    this.rma.push(new rma(element['id'],element['rmaNo'],Guid.getTime(element['creationTime'])));
  }

}));

    //this.goNext();

  }

  public onChange(event){
    var id=event.target.value;
    switch (id) {
      case "1": this.dateRange=true;this.guidNo=false;this.pInspection=false;this.component=false;
       break;
      case "2": this.dateRange=false;this.guidNo=true;this.pInspection=false;this.component=false;
       break;
      case "3": this.dateRange=false;this.guidNo=false;this.pInspection=false;this.component=true;
       break;
      case "4": this.dateRange=false;this.guidNo=false;this.pInspection=true;this.component=false;
       break;
    
      default:this.dateRange=false;this.guidNo=false;this.pInspection=false;this.component=false;
        break;
    }
  }

  public goNext(){
    if((this.start+4)>=this.rmaLength){
      return false;
    }
   this.start+=4;
   this.end+=4;
  }

  public goPrevious(){
    if((this.start-4)<0){
      return false;
    }
    this.start-=4;
    this.end-=4;
  }

   // events
   public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


}
