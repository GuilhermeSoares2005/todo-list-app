import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  @Input() todo?: Todo;
  @Input() isEditing = false;
  @Output() save = new EventEmitter<Todo>();
  @Output() cancel = new EventEmitter<void>();

  todoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.todoForm = this.fb.group({
      title: [this.todo?.title || '', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      description: [this.todo?.description || '', [Validators.maxLength(1000)]]
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      const todoData: Todo = {
        ...this.todoForm.value,
        completed: this.todo?.completed || false
      };
      
      if (this.todo?.id) {
        todoData.id = this.todo.id;
      }
      
      this.save.emit(todoData);
      this.todoForm.reset();
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.todoForm.reset();
  }
}

