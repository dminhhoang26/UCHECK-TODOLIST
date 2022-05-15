import { Component, OnInit } from '@angular/core'
import { Todo } from '../shared/todo.model'
import { DataService } from '../shared/data.service'
import { NgForm } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component'
import * as moment from 'moment'
import { UserService } from '../shared/user.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  currentDate = moment(new Date()).format('YYYY-MM-DD')
  todos: Todo[]
  showValidationErrors: boolean
  user

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private userService: UserService,
    ) { }

  async ngOnInit(): Promise<void> {
    this.user = this.userService.getUser()
    this.reload()
  }

  reload = async () => {
    try {
      this.todos = await this.dataService.search({createdDate: this.currentDate, userId: this.user.id})
    } catch (error) {
      console.log(error)
      this.todos = []
    }
  }

  async onFormSubmit(form: NgForm) {
    if (form.invalid) return this.showValidationErrors = true
    let todo = new Todo(form.value.text)
    todo.createdDate = this.currentDate
    todo.userId = this.user.id
    try {
      this.todos = await this.dataService.addTodo(todo)
      this.showValidationErrors = false
      form.reset()
    } catch (error) {
      console.log('onFormSubmit error: ', error)
    }
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

    dialogRef.afterClosed().subscribe(async (result) => {
      console.log('dialog result: ', result)
      if (result) {
        if (result.actionDelete) {
          await this.dataService.deleteTodo(result.id)
        } else {
          await this.dataService.updateTodo(index, result)
        }
        this.reload()
      }
    })
  }

  async deleteTodo(taskId) {
    if (await this.dataService.deleteTodo(taskId)) {
      this.reload()
    }
  }

  onEditClicked = (todo: Todo) => {
    this.editTodo(todo)
  }

  currentDateChanged = ($event) => {
    // "2022-05-18"
    this.currentDate = $event?.target?.value
    if (!this.currentDate || this.currentDate == '') {
      this.currentDate = moment(new Date()).format('YYYY-MM-DD')
      $event.target.value = this.currentDate
    }
    this.reload()
  }
}
