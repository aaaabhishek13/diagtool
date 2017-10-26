import { Component, OnInit } from '@angular/core';
import { rma } from '../rma';
import { ToolService } from '../../tool.service';
import { Guid } from "../guid/guid";
declare var $: any;
@Component({
  selector: 'app-rma',
  templateUrl: './rma.component.html',
  styleUrls: ['./rma.component.css']
})
export class RmaComponent implements OnInit {
  rma:rma[]=new Array();
  modifyFlag:boolean=false;
  start:number=0;
  end:number=5;
  rmaLength:number;
  count:number=0;
  deleteText:string="Are you sure you want to delete these RMA?";

  constructor(private toolService :ToolService) { }

  ngOnInit() {
    this.toolService.getRmaList().subscribe((response=>{var element=response['response'];
    this.rmaLength=element.length;
        for (var index = 0; index < element.length; index++) {
          var row = element[index];
          this.rma.push(new rma(row.id,row.rmaNo,Guid.getTime(row.creationTime)));
        }
  
  }));
    
  }

  public showModify(){
    var count=this.selectionCount();
    if(this.modifyFlag==true){
      this.modifyFlag=!this.modifyFlag;
      return;
    }
    if(count>1 || count==0){
      $("#modifyModal").modal()
      return;
    }
    this.modifyFlag=!this.modifyFlag;
  }
  
  
  
  public goNext(){
    if((this.start+5)>this.rmaLength){
      return false;
    }
   this.start+=5;
   this.end+=5;
  }

  
  
  public goPrevious(){
    if((this.start-5)<0){
      return false;
    }
    this.start-=5;
    this.end-=5;
  }

  
  
  public onChange(event,i:number){
      //console.log(event.target.checked);
      this.rma[i].selectionFlag=event.target.checked;
  }

  
  public onDelete(){
    var count=this.selectionCount();
    if(count==0){
      this.deleteText="Select some RMA for Deletion";
      $("#deleteModal").modal();
      return;
    }else{
      this.deleteText="Are you sure you want to delete these RMA?";
    $("#deleteModal").modal();
    return;

    }
  }


  public selectionCount(){
    this.count=0;
    for (var i = 0; i < this.rma.length; i++) {
      if(this.rma[i].selectionFlag==true){
        this.count++
      }
  }
  return this.count;
 } 
}
