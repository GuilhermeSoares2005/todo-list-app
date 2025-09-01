package com.todolist.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    
    @GetMapping("/")
    public String home() {
        return "Todo List App está funcionando!";
    }
    
    @GetMapping("/test")
    public String test() {
        return "Teste OK!";
    }
}
