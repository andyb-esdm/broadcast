import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordService } from '../record.service';
import { Observable, switchMap } from 'rxjs';
import { IRecord } from '../record.model';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.css']
})
export class MainFormComponent {
  record$: Observable<IRecord | undefined>;
  recordId: number | undefined;
  constructor(private route: ActivatedRoute, private recordService: RecordService) {
    this.record$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.recordId = Number(params.get('id'));
        return this.recordService.getRecord(this.recordId)
      })
    );
  }
}
