import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTodoDialogComponent } from './edit-todo-dialog/edit-todo-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ToolTipDirective } from './shared/tool-tip.directive';
import { ToolTipSingletonDirective } from './shared/tool-tip-singleton.directive';
import {MatChipsModule} from '@angular/material/chips';

import {NgxMatTuiCalendarModule} from 'ngx-mat-tui-calendar';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    EditTodoDialogComponent,
    ToolTipDirective,
    ToolTipSingletonDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgxMatTuiCalendarModule,
    MatToolbarModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }