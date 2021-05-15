import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Season } from "src/model/season";
import { SeasonCrudService } from "./service/season-crud.service";

export class SeasonsDataSource implements DataSource<Season> {

    private seasonsSubject = new BehaviorSubject<Season[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private seasonService: SeasonCrudService) {}

    connect(collectionViewer: CollectionViewer): Observable<Season[]> {
        return this.seasonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.seasonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadSeasons(year: string) {

        this.loadingSubject.next(true);

        this.seasonService.getListSeasonsByYear(year).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(seasons => this.seasonsSubject.next(seasons));
    }    
}