import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();

  onToggle(): void {
    this.toggle.emit(this.todo.id!);
  }

  onEdit(): void {
    this.edit.emit(this.todo);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id!);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

