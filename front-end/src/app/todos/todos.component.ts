import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { DataService } from '../shared/data.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  currentDate = new Date()
  todos: Todo[]
  showValidationErrors: boolean
  toggleCalendar: boolean = false
  options = {
    ioptions: {
      disableClick: true,
      isReadOnly: true,
      taskView: true,
      useDetailPopup: false,
      useCreationPopup: false,
    },
    buttons: {
      month: false,
      week: false,
      day: false,
    }
  }
  viewMode = {
    listView: '1',
    calendarView: '2',
  }

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.todos = this.dataService.getAllTodos()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true

    this.dataService.addTodo(new Todo(
      form.value.text,
      undefined,
      undefined,
      undefined,
      '',
      false,
      '14:59',
      '15:59',
      new Date(),
    ))

    this.showValidationErrors = false
    form.reset()
    console.log('todos: ', this.todos)
  }

  toggleCompleted(todo: Todo) {
    // todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('dialog result: ', result)
      if (result) {
        this.dataService.updateTodo(index, result)
      }
    })
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.dataService.deleteTodo(index)
  }

  onToggleView = ($event) => {
    if ($event.target.value == this.viewMode.listView) {
      this.toggleCalendar = false
    } else {
      this.toggleCalendar = true
    }
  }

  onEditClicked = (todo: Todo) => {
    this.editTodo(todo)
  }

  currentDateChanged = ($event) => {
    // "2022-05-18"
    console.log('currentDateChanged: ', $event?.target?.value)
  }
}
