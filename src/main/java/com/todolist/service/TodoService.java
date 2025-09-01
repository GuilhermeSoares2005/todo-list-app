package com.todolist.service;

import com.todolist.model.Todo;
import com.todolist.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    
    @Autowired
    private TodoRepository todoRepository;
    
    public List<Todo> getAllTodos() {
        return todoRepository.findAllByOrderByCreatedAtDesc();
    }
    
    public Optional<Todo> getTodoById(Long id) {
        return todoRepository.findById(id);
    }
    
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }
    
    public Optional<Todo> updateTodo(Long id, Todo todoDetails) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setTitle(todoDetails.getTitle());
                    todo.setDescription(todoDetails.getDescription());
                    todo.setCompleted(todoDetails.isCompleted());
                    return todoRepository.save(todo);
                });
    }
    
    public Optional<Todo> toggleTodoStatus(Long id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todo.setCompleted(!todo.isCompleted());
                    return todoRepository.save(todo);
                });
    }
    
    public boolean deleteTodo(Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Todo> getTodosByStatus(boolean completed) {
        return todoRepository.findByCompletedOrderByCreatedAtDesc(completed);
    }
    
    public long getCompletedCount() {
        return todoRepository.countByCompleted(true);
    }
    
    public long getTotalCount() {
        return todoRepository.count();
    }
}
