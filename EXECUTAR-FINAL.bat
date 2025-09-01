@echo off
echo ========================================
echo    INICIANDO TODO-LIST APP - FINAL
echo ========================================
echo.

echo [1/3] Parando processos anteriores...
taskkill /f /im java.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo [2/3] Iniciando backend...
start "Backend" cmd /k "cd /d C:\Users\guids\todo-list-app\todo-list-app && java -jar target/todo-list-app-0.0.1-SNAPSHOT.jar"

echo Aguardando backend...
timeout /t 15 /nobreak >nul

echo [3/3] Iniciando frontend...
start "Frontend" cmd /k "cd /d C:\Users\guids\todo-list-app\todo-list-app\frontend && npm start"

echo.
echo ========================================
echo    APLICACAO INICIADA!
echo ========================================
echo.
echo Frontend: http://localhost:4200
echo Backend:  http://localhost:8080
echo Teste:    http://localhost:8080/test
echo.
pause
