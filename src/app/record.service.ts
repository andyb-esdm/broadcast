import { Injectable } from '@angular/core';
import { IRecord } from './record.model';
import { ILinkedRecord } from './linked-record.model';
import { Observable, of } from 'rxjs';
export const broadCastChannel = new BroadcastChannel('record-id');

@Injectable({
  providedIn: 'root'
})
export class RecordService {


  private records: IRecord[] = [
    { id: 1, name: 'record1', description: 'description of record 1' },
    { id: 2, name: 'record2', description: 'description of record 2' }
  ];

  private linkedRecords: ILinkedRecord[] = [
    { id: 1, recordId: 1, name: 'linked to record 1 - 1' },
    { id: 2, recordId: 1, name: 'linked to record 1 - 2' },
    { id: 3, recordId: 2, name: 'linked to record 2 - 1' },
    { id: 4, recordId: 2, name: 'linked to record 2 - 2' },
    { id: 5, recordId: 2, name: 'linked to record 2 - 2' },
  ]

  constructor() { }

  getRecord(id: number): Observable<IRecord | undefined> {
    broadCastChannel.postMessage(id);
    return of(this.records.find(record => record.id === id));
  }

  getLinkedRecords(recordId: number): Observable<ILinkedRecord[]> {
    return of(this.linkedRecords.filter(linkedRecord => linkedRecord.recordId === recordId));
  }
}
