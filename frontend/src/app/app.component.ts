import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Todo, TodoStats } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  stats: TodoStats = { totalCount: 0, completedCount: 0, pendingCount: 0 };
  loading = false;
  error = '';
  filterStatus: 'all' | 'pending' | 'completed' = 'all';
  editingTodo: Todo | undefined = undefined;
  showForm = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
    this.loadStats();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = '';
    
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.applyFilter();
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar tarefas. Tente novamente.';
        this.loading = false;
        console.error('Error loading todos:', error);
      }
    });
  }

  loadStats(): void {
    this.todoService.getStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  applyFilter(): void {
    switch (this.filterStatus) {
      case 'pending':
        this.filteredTodos = this.todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(todo => todo.completed);
        break;
      default:
        this.filteredTodos = this.todos;
    }
  }

  onFilterChange(status: 'all' | 'pending' | 'completed'): void {
    this.filterStatus = status;
    this.applyFilter();
  }

  onSaveTodo(todo: Todo): void {
    if (this.editingTodo) {
      this.updateTodo(todo);
    } else {
      this.createTodo(todo);
    }
  }

  createTodo(todo: Todo): void {
    this.todoService.createTodo(todo).subscribe({
      next: (newTodo) => {
        this.todos.unshift(newTodo);
        this.applyFilter();
        this.loadStats();
        this.showForm = false;
      },
      error: (error) => {
        this.error = 'Erro ao criar tarefa. Tente novamente.';
        console.error('Error creating todo:', error);
      }
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo.id!, todo).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
          this.applyFilter();
          this.loadStats();
        }
        this.editingTodo = undefined;
        this.showForm = false;
      },
      error: (error) => {
        this.error = 'Erro ao atualizar tarefa. Tente novamente.';
        console.error('Error updating todo:', error);
      }
    });
  }

  onToggleTodo(id: number): void {
    this.todoService.toggleTodoStatus(id).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
          this.applyFilter();
          this.loadStats();
        }
      },
      error: (error) => {
        this.error = 'Erro ao alterar status da tarefa. Tente novamente.';
        console.error('Error toggling todo:', error);
      }
    });
  }

  onEditTodo(todo: Todo): void {
    this.editingTodo = { ...todo };
    this.showForm = true;
  }

  onDeleteTodo(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== id);
          this.applyFilter();
          this.loadStats();
        },
        error: (error) => {
          this.error = 'Erro ao excluir tarefa. Tente novamente.';
          console.error('Error deleting todo:', error);
        }
      });
    }
  }

  onCancelEdit(): void {
    this.editingTodo = undefined;
    this.showForm = false;
  }

  showAddForm(): void {
    this.editingTodo = undefined;
    this.showForm = true;
  }

  hideForm(): void {
    this.showForm = false;
    this.editingTodo = undefined;
  }

  clearError(): void {
    this.error = '';
  }
}

