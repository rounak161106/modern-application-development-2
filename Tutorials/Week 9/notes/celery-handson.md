# Celery + Redis: Hands-on Guide

This guide demonstrates:

1. Running Celery with Redis (without Flask)
2. Integrating Celery with Flask
3. Handling failures in background tasks

---

# 1. Setup (Linux)

## Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

## Install Dependencies

```bash
pip install "celery[redis]" flask
```

## Install Redis

```bash
sudo apt update
sudo apt install redis-server
```

## Start Redis

```bash
redis-server
```
## If redis throws error or port usage
```bash
sudo systemctl close redis
```

Check:

```bash
redis-cli ping
```

Expected:

```text
PONG
```

---

# 2. Celery WITHOUT Flask

## Project Structure

```text
celery-basic/
│
├── tasks.py
└── app.py
```

---

## tasks.py

```python
from celery import Celery

celery = Celery(
    "basic",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery.task
def add(a, b):
    return a + b
```

---

## Start Worker

```bash
celery -A tasks worker --loglevel=INFO
```

---

## app.py (Trigger Task)

```python
from tasks import add

result = add.delay(10, 20)

print("Task ID:", result.id)
print("Status:", result.status)
print("Result:", result.get())
```

---

## Run

```bash
python app.py
```

---

## Expected Flow

```text
App → Redis → Worker → Execute → Redis → Result
```

---

# 3. Key Concept: delay vs normal call

```python
add(10, 20)        # Runs immediately
add.delay(10, 20)  # Queues task
```

---

# 4. Celery WITH Flask

## Project Structure

```text
celery-flask/
│
├── app.py
├── celery_app.py
└── tasks.py
```

---

## celery_app.py

```python
from celery import Celery

celery = Celery(
    "flask_app",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)
```

---

## tasks.py

```python
import time
from celery_app import celery

@celery.task
def generate_report(name):
    print(f"Starting report for {name}")

    time.sleep(10)

    print(f"Finished report for {name}")

    return f"Report for {name} generated successfully"
```

---

## app.py

```python
from flask import Flask, jsonify
from tasks import generate_report

app = Flask(__name__)

@app.route("/report/<name>", methods=["POST"])
def create_report(name):
    task = generate_report.delay(name)

    return jsonify({
        "message": "Report generation started",
        "task_id": task.id
    }), 202


@app.route("/report/status/<task_id>")
def get_status(task_id):
    task = generate_report.AsyncResult(task_id)

    response = {
        "task_id": task_id,
        "status": task.status
    }

    if task.successful():
        response["result"] = task.result

    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
```

---

## Run the System

### Terminal 1 – Redis

```bash
redis-server
```

### Terminal 2 – Celery Worker

```bash
celery -A celery_app.celery worker --loglevel=INFO
```

### Terminal 3 – Flask App

```bash
python app.py
```

---

## Test API

### Create Task

```bash
curl -X POST http://localhost:5000/report/Adarsh
```

Response:

```json
{
  "message": "Report generation started",
  "task_id": "abc123"
}
```

---

### Check Status

```bash
curl http://localhost:5000/report/status/<task_id>
```

Example:

```json
{
  "task_id": "abc123",
  "status": "SUCCESS",
  "result": "Report for Adarsh generated successfully"
}
```

---

# 5. Error Handling Demo

## Add Failing Task

```python
from celery_app import celery

@celery.task
def failing_task():
    raise ValueError("Something went wrong!")
```

---

## Trigger Task

```python
task = failing_task.delay()

print("Task ID:", task.id)
```

---

## Check Status

```python
from tasks import failing_task

task = failing_task.AsyncResult("<task_id>")

print(task.status)
```

---

## Possible States

```text
PENDING   → Task not started
STARTED   → Task running
SUCCESS   → Completed
FAILURE   → Error occurred
```

---

## Optional: Get Error

```python
print(task.result)
```

Output:

```text
ValueError: Something went wrong!
```

---

# 6. Important Observations

### 1. Async execution

```text
Flask returns immediately
Worker executes later
```

---

### 2. Worker logs show execution

```text
Task received
Task started
Task finished
```

---

### 3. Redis is not executing tasks

```text
Redis → stores messages
Worker → executes code
```

---

### 4. Never block using .get() in Flask

❌ Bad:

```python
result = generate_report.delay()
return result.get()
```

✅ Good:

```python
return {"task_id": result.id}
```

---

# 7. Summary

* Celery handles background tasks
* Redis acts as a broker
* Workers execute tasks
* Flask triggers tasks
* Tasks run asynchronously

---

## Final Mental Model

```text
Client → Flask → Redis → Worker → Execution → Result
```

---
