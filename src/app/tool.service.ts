import { Injectable } from "@angular/core";
import { rma } from "./rma-dashboard/rma";
import { Guid } from "./rma-dashboard/guid/guid";
import 'rxjs/Rx';
import { Http,Headers,Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";


@Injectable()
export class ToolService{
    
    constructor(private http:Http){}
    
    public getRmaList(){
     
    return this.http.get('assets/rmalist.json').map((res:Response)=>(res.json()));
    }

    public getAllCh(rmaid:string){
        return this.http.get('assets/devicelist.json').map((res:Response)=>(res.json()));
    }

    public updateCh(){
        
    }

}

