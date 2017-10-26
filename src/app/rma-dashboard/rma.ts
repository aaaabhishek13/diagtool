export class rma {
    public id: number;
    public rmaNo: string;
    public creationTime: string;
    public selectionFlag:boolean=false;

    constructor(id: number, rmaNo: string, creationTime: string) {
        this.id = id;
        this.rmaNo = rmaNo;
        this.creationTime = creationTime;

    }
}