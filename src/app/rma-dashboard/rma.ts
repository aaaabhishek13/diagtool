export class rma {
    public id: number;
    public rmaNo: string;
    public creationTime: string;

    constructor(id: number, rmaNo: string, creationTime: string) {
        this.id = id;
        this.rmaNo = rmaNo;
        this.creationTime = creationTime;

    }
}