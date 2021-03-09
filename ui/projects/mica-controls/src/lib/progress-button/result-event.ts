import { ResultStatus } from './result-status';

export class ResultEvent {
    private resultStatus: ResultStatus;

    public start(): void {
        this.resultStatus = ResultStatus.RUNNING;
    }

    public success(): void {
        this.resultStatus = ResultStatus.SUCCESSFULLY;
    }

    public fail(): void {
        this.resultStatus = ResultStatus.FAILED;
    }

    public clear(): void {
        this.resultStatus = ResultStatus.NONE;
    }

    public get status() {
        return this.resultStatus;
    }
}
