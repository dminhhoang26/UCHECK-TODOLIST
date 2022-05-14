import { Component, OnInit, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../shared/todo.model';
import priorities from '../shared/priority'

@Component({
  selector: 'app-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTodoDialogComponent implements OnInit {
  priorities = priorities()
  constructor(
    public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: Todo) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return

    const updatedTodo = {
      ...this.todo,
      ...form.value
    }
    console.log('updatedTodo: ', updatedTodo)
    this.dialogRef.close(updatedTodo)
  }
}
