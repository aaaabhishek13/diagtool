import { Component, OnInit } from '@angular/core';
import { Guid } from "./guid";
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from '../../tool.service';

declare var $: any;

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
  selectedTest:number;
  count:number=0;
  deleteText:string="Are you sure you want to delete these CHs?";

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

  public displayResults(id:number){
    var i=this.getGuid(id);
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
    this.selectedTest=i;
  }

  public onAccept(id:number){
    var i=this.getGuid(id);
    this.service.acceptCh(this.guid[i].guid,JSON.stringify({'physicalInspectionResult':1})).subscribe((response=>{}));
    this.guid[i].physicalInspectionResult=1;//comment it later
  }
 
  public onReject(id:number){
    var i=this.getGuid(id);
    if(this.guid[i].rejectSelection=='Select'){
      alert('Select a Reject Reason.');
      return;
    }
    this.service.rejectCh(this.guid[i].guid,JSON.stringify({'physicalInspectionResult':2,'rejectReason':Guid.getRejectReasonId(this.guid[i].rejectSelection)})).subscribe((response=>{}));
    this.guid[i].physicalInspectionResult=2;//comment it later
  }

  public onChange(event,id:number){
    //console.log(event.target.checked);
    var i=this.getGuid(id);
    this.guid[i].selectionFlag=event.target.checked;
  }
  public onDelete(){
    var count=this.selectionCount();
    if(count==0){
      this.deleteText="Select some CH for Deletion";
      $("#deleteModal").modal();
      return;
    }else{
      this.deleteText="Are you sure you want to delete these CHs?";
    $("#deleteModal").modal();
    return;

  }
}

  public selectionCount(){
    this.count=0;
    for (var i = 0; i < this.guid.length; i++) {
      if(this.guid[i].selectionFlag==true){
        this.count++
      }
  }
  return this.count;
  } 

  public getGuid(id:number){
    for (var i = 0; i < this.guid.length; i++) {
      if(id==this.guid[i].id)
      return i;
      
    }
  }

  public deleteGuid(){
    $('#deleteModal').modal('hide');
    
    for (var i = 0; i < this.guid.length; i++) {
      
      if(this.guid[i].selectionFlag==true){
        this.service.deleteGuid(this.guid[i].guid).subscribe((response=>{var element=response['response'];
        this.guid = this.guid.filter(item => item !== this.guid[0]);
      }));
      }
      
    }
  }


  public saveOutcome(form){
    this.service.saveTestOutcome(this.selectedGuid.guid,form.value.date,form.value.outcome);
  }

  public openImage(){
    $('#imageModal').modal();
  }
}
