import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../record.service';
import { Observable, switchMap } from 'rxjs';
import { ILinkedRecord } from '../linked-record.model';

import { broadCastChannel } from '../record.service';

@Component({
  selector: 'app-linked-records',
  templateUrl: './linked-records.component.html',
  styleUrls: ['./linked-records.component.css']
})
export class LinkedRecordsComponent {
  linkedRecords$: Observable<ILinkedRecord[]> | undefined;
  recordId: number | undefined;
  constructor(private route: ActivatedRoute, private recordService: RecordService, private cdRef: ChangeDetectorRef) {
    this.linkedRecords$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.recordId = Number(params.get('recordId'));
        return this.recordService.getLinkedRecords(this.recordId)
      })
    );

    broadCastChannel.onmessage = (event) => {
      this.recordId = Number(event.data);
      console.log(this.recordId);
      this.linkedRecords$ = this.recordService.getLinkedRecords(this.recordId);
      cdRef.detectChanges();
    }

  }
}
