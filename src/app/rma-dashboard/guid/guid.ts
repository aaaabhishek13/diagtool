export class  Guid{
    public rmaid:string;
    public guid:string;
    public id:number;
    public physicalInspectionResult:number;
    public rejectReason:string;
    public completionTime:string;
    public testOutcome:string;
    public testBenchResults=[];
    public ReTestResult=[];
    public processedResult=[];
    public selectionFlag:boolean=false;
    public rejectSelection:string='Select';
    public static testList=["SimTest",
                            "CurrentTest",
                            "TimeTest",
                            "ComponentTestCPU",
                            "ComponentTestRam",
                            "ComponentTestFlash",
                            "ComponentTestVoltage",
                            "ComponentTesthan",
                            "ComponentTestWan",
                            "ComponentTestMesh",
                            "LedTest",
                            "MeterPresent",
                            "ChargingTest",
                            "WCDMAEXT",
                            "GPRSEXT",
                            "WCDMAINT",
                            "GPRSINT",
                            "ZigbeeTxTest",
                            "ZigbeeRxTest",
                            "MeshINT",
                            "MeshEXT",
                            "DischargingTest"
                            ];
constructor(rmaid:string,guid:string,id:number,physicalInspectionResult:number,rejectReason:string,completionTime:string,testOutcome:string,testBenchResults:any[],ReTestResult:any[]){

    this.rmaid=rmaid;
    this.guid=guid;
    this.id=id;
    this.physicalInspectionResult=physicalInspectionResult;
    this.rejectReason=rejectReason;
    this.completionTime=completionTime;
    this.testOutcome=testOutcome;
    this.testBenchResults=testBenchResults;
    this.ReTestResult=ReTestResult;
    this.preProcess();
}

    public static getTestName(i:number):string{
       
            return this.testList[i-1];
    }

    public static getRejectReason(i:number):string{
        const list=["Damaged",
            "Insufficient Packaging",
            "Non-Toshiba device",
            "Item not received",
            "No RMA claim received",
            "unavailable"
            ];
            if(i>=0 && i<=5)
            return list[i+1];
            else
            return list[5];
    }
    public static getTime(utc:number):string{
        return (new Date(utc*1000)+"").substr(3,12);
    }

    public static getRejectReasonId(reason:string){
        const list={"Damaged":1,
        "Insufficient Packaging":2,
        "Non-Toshiba device":3,
        "Item not received":4,
        "No RMA claim received":5,
        "unavailable":6
    };
    return list[reason];
    }

    public preProcess(){
    
        for (var i = 0; i < this.testBenchResults.length; i++) {
            var l=this.testBenchResults[i];
            if(l.result==2){
            for (var j = 0; j < this.ReTestResult.length; j++) {
                var k= this.ReTestResult[j];
                if(l.test_type==k.test_type){
                    this.processedResult.push({"test_type":l.test_type,"result":l.result,"reTestResult":k.result});

                }
                
            }
        }else{
            this.processedResult.push({"test_type":l.test_type,"result":l.result,"reTestResult":"-"});
        }
            
        }
        
    }

}