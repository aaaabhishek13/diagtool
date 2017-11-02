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

    public deleteRma(rma:string){
        return this.http.get('assets/true.txt').map((res:Response)=>(res.json()));
    }

    public modifyRma(rma:string,request:string){
        return this.http.get('assets/true.txt').map((res:Response)=>(res.json()));
    }

    public acceptCh(guid:string,request:string){
        //console.log(request);
        return this.http.get('assets/true.txt').map((res:Response)=>(res.json()));
    }

    public rejectCh(guid:string,request:string){
        console.log(request);
        return this.http.get('assets/true.txt').map((res:Response)=>(res.json()));
    }

    public deleteGuid(guid:string){
        return this.http.get('assets/true.txt').map((res:Response)=>(res.json()));
    }

    public saveTestOutcome(guid:string,date:Date,outcome:string){
        console.log(date+" "+outcome);
        var testOutcome=outcome=='NFF'?2:1;
        this.http.put("/device/+'guid'+/retestoutcome",JSON.stringify({'testOutcome':testOutcome})).subscribe((response=>{
            //call another to update time
        }))
    }

}

