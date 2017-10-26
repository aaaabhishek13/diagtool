import { Component, OnInit } from '@angular/core';
import { Guid } from "./guid";
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-guid',
  templateUrl: './guid.component.html',
  styleUrls: ['./guid.component.css']
})
export class GuidComponent implements OnInit {

  rmaid:string;
  date:string;
  guid:Guid[] = new Array();
  list=[];
  isSelected:boolean=false;
  testPage:boolean=false;
  selectedGuid:Guid;

  constructor(private route:ActivatedRoute,private service:ToolService,private router:Router) {
   
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.rmaid=params['rma'];
      this.date=params['date'];
      this.service.getAllCh(this.rmaid).subscribe((response=>{this.list=response['response'];
            for (var index = 0; index < this.list.length; index++) {
              var element = this.list[index];
              this.guid.push(new Guid(this.rmaid,element['rmaId'],element['id'],element['physicalInspectionResult'],Guid.getRejectReason(element['rejectReason']),Guid.getTime(element['completionTime']),element['ReTestResult'].testOutcome,element['testBenchResults'],element['ReTestResult'].reTestResults));
            }
    
    }));
    });
    
  }

  public displayResults(i:number){
    this.isSelected=true;
    this.selectedGuid=this.guid[i];
  }

  public routeRMA(){
    this.router.navigate(['']);
  }

  public routeGUID(){
    this.isSelected=false;
  }

  public getTestName(id:number){
    return Guid.getTestName(id);
  }

  public getResultType(i:number){
    if(i==1) return "PASS";
    else if(i==2) return "FAIL";
    else return "-";
  }

  public routeResults(){
    this.isSelected=true;
    this.testPage=false;
  }

  public displayTestPage(i:number){
    this.isSelected=false;
    this.testPage=true;
  }

  public onAccept(i:number){
    this.guid[i].physicalInspectionResult=1;
  }
 
  public onReject(i:number){
    this.guid[i].physicalInspectionResult=2;
  }
}
