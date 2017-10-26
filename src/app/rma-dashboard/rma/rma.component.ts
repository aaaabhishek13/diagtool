import { Component, OnInit } from '@angular/core';
import { rma } from '../rma';
import { ToolService } from '../../tool.service';
import { Guid } from "../guid/guid";

@Component({
  selector: 'app-rma',
  templateUrl: './rma.component.html',
  styleUrls: ['./rma.component.css']
})
export class RmaComponent implements OnInit {
  rma:rma[]=new Array();
  

  constructor(private toolService :ToolService) { }

  ngOnInit() {
    this.toolService.getRmaList().subscribe((response=>{var element=response['response']
        for (var index = 0; index < element.length; index++) {
          var row = element[index];
          this.rma.push(new rma(row.id,row.rmaNo,Guid.getTime(row.creationTime)));
        }
  
  }));
    
  }

}
