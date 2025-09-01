package com.todolist.controller;

import com.todolist.model.Todo;
import com.todolist.service.TodoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    
    @Autowired
    private TodoService todoService;
    
    @GetMapping
    public ResponseEntity<List<Todo>> getAllTodos() {
        List<Todo> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        Optional<Todo> todo = todoService.getTodoById(id);
        return todo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Todo> createTodo(@Valid @RequestBody Todo todo) {
        Todo createdTodo = todoService.createTodo(todo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTodo);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @Valid @RequestBody Todo todoDetails) {
        Optional<Todo> updatedTodo = todoService.updateTodo(id, todoDetails);
        return updatedTodo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggleTodoStatus(@PathVariable Long id) {
        Optional<Todo> toggledTodo = todoService.toggleTodoStatus(id);
        return toggledTodo.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        boolean deleted = todoService.deleteTodo(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/status/{completed}")
    public ResponseEntity<List<Todo>> getTodosByStatus(@PathVariable boolean completed) {
        List<Todo> todos = todoService.getTodosByStatus(completed);
        return ResponseEntity.ok(todos);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Object> getStats() {
        long total = todoService.getTotalCount();
        long completed = todoService.getCompletedCount();
        long pending = total - completed;
        
        return ResponseEntity.ok(new Object() {
            public final long totalCount = total;
            public final long completedCount = completed;
            public final long pendingCount = pending;
        });
    }
}
