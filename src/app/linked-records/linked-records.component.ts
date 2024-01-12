import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../record.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ILinkedRecord } from '../linked-record.model';

@Component({
  selector: 'app-linked-records',
  templateUrl: './linked-records.component.html',
  styleUrls: ['./linked-records.component.css']
})
export class LinkedRecordsComponent implements OnDestroy {
  private subscription = new Subscription();
  linkedRecords$: Observable<ILinkedRecord[]> | undefined;
  recordId: number | undefined;
  constructor(private route: ActivatedRoute, private recordService: RecordService, private router: Router) {
    this.linkedRecords$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.recordId = Number(params.get('recordId'));
        return this.recordService.getLinkedRecords(this.recordId)
      })
    );

    this.subscription.add(this.subscribeToMessages());
  }

  private subscribeToMessages(): Subscription {
    return this.recordService.messages$.subscribe(recordId => {
      this.router.navigate(['linked-records', recordId])
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
