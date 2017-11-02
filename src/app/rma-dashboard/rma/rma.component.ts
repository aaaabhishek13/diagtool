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
  slNo:number=0;
  deleteText:string="Are you sure you want to delete these RMA?";
  test:string="csdc";
  filesToUpload: Array<File> = [];
  content:string[]=new Array();

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
    if((this.start+5)>=this.rmaLength){
      return false;
    }
   this.start+=5;
   this.end+=5;
  }

  
  
  public goPrevious(){
    if((this.start-5)<=0){
      return false;
    }
    this.start-=5;
    this.end-=5;
  }

  
  
  public onChange(event,id:number){
      //console.log(event.target.checked);
      var i=this.getRma(id);
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

  public createNewRma(form){
    const formData: any = new FormData();
    console.log(form.value);
    const files: Array<File> = this.filesToUpload;
    for (var i = 0; i < files.length; i++) {
      formData.append("uploads[]", files[0], files[0]['name']);
      
    }
    console.log(formData);
  }

  public deleteRma(){
    $('#deleteModal').modal('hide');
    
    for (var i = 0; i < this.rma.length; i++) {
      
      if(this.rma[i].selectionFlag==true){
        this.toolService.deleteRma(this.rma[i].rmaNo).subscribe((response=>{var element=response['response'];
        this.rma = this.rma.filter(item => item !== this.rma[0]);
      }));
      }
      
    }

  }

  public modifyRma(form){
    console.log(form.value);
    for (var i = 0; i < this.rma.length; i++) {
      if(this.rma[i].selectionFlag==true){
        this.rma[i].selectionFlag=false;
        this.toolService.modifyRma(this.rma[i].rmaNo,JSON.stringify(form.value)).subscribe((response=>{var element=response['response'];
                
      }));
      }
      
    }
    this.modifyFlag=false;
  }

  public fileChange(event){
    this.filesToUpload=<Array<File>>event.target.files;
    var fileList: FileList = event.target.files;
    console.log(fileList);
    for (var i = 0; i < fileList.length; i++) {
      this.fileToText(fileList[i], (text) => {
        console.log(text);
       });
    }

      // var file:File=fileList[0];
      // // console.log(file);
      //  var myReader:FileReader = new FileReader();
       
      //      myReader.onloadend = function(e){
      //        console.log(myReader.result);
      //      }
      //      myReader.readAsText(file);
      
    }

    public fileToText(file, callback) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        callback(reader.result);
      };
    }

  public getRma(id:number){
    for (var i = 0; i < this.rma.length; i++) {
      if(id==this.rma[i].id)
      return i;
      
    }
  }

}
