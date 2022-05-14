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
      false,
      undefined,
      undefined,
      '',
      '2',
      '1',
      new Date(),
      new Date(),
      new Date(),
    ))

    this.showValidationErrors = false
    form.reset()
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
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
}
