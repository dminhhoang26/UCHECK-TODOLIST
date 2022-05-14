import { DatePipe } from '@angular/common'
import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'custom-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomDatePickerComponent implements OnInit{

  @Input() dateValue: Date
  @Output() dateChanged: EventEmitter<Date> = new EventEmitter<Date>()

  dateText: string
  maxDate: Date = new Date()

  constructor(
    private _datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.changeDateText()
  }

  changeDateText() {
    if (this.dateValue === undefined) {
      this.dateValue = new Date()
    }
    this.dateText = this._datePipe.transform(this.dateValue, 'dd/MM/yyyy')
  }

  onDateChanged(date: Date) {
    this.dateValue = date
    this.changeDateText()
    this.dateChanged.emit(this.dateValue)
  }
}
