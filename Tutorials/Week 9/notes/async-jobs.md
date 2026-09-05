# Backend Jobs & Async Processing (Celery + Redis)

## 1. What Problem Are We Solving?

In a typical web application, some operations take a long time:

```python
@app.route("/send-report")
def send_report():
    generate_report()   # ~20 seconds
    send_email()        # ~3 seconds
    return "Report sent!"
```

### Problem:

* The user must wait **23 seconds** for a response.
* This leads to a **poor user experience**.

### Key Insight:

> Not all tasks need to be completed **during the HTTP request**.

### Solution:

Move heavy tasks to the **background**.

```text
User Request → Flask → Queue Task → Immediate Response
                         ↓
                     Background Worker
                         ↓
                  Execute Long Task
```

---

## 2. Synchronous vs Asynchronous Execution

### Synchronous Execution

```python
def generate_report():
    time.sleep(10)
    return "Done"

@app.route("/report")
def report():
    return generate_report()
```

### Flow:

```text
Request → Processing (10s) → Response
```

### Problem:

* Request is **blocked**
* User must wait

---

### Asynchronous Execution

```python
@app.route("/report")
def report():
    task = generate_report.delay()
    return {
        "message": "Task started",
        "task_id": task.id
    }
```

### Flow:

```text
Request → Queue Task → Immediate Response
                ↓
           Worker Executes Task
```

### Benefit:

* Fast response
* Better scalability
* Better user experience

---

## 3. What is an Async Job?

An **async job** is:

> A unit of work that is executed **outside the main request flow**, usually by a worker.

### Examples:

* Send email
* Generate report
* Resize image
* Process payments
* Run ML inference

### Key Idea:

> The web server **delegates work instead of doing it itself**

---

## 5. What is Celery?

Celery is a:

> **Distributed task queue system**

### It helps you:

* Define background tasks
* Send tasks to a queue
* Execute tasks using workers

### Example:

```python
from celery import Celery

app = Celery("tasks", broker="redis://localhost:6379/0")

@app.task
def add(a, b):
    return a + b
```

### Calling the task:

```python
add.delay(10, 20)
```

### Important:

* `add()` → runs immediately
* `add.delay()` → queues the task

---

## 6. What is Redis Doing Here?

Redis acts as a **message broker**.

### Role:

* Stores tasks temporarily
* Passes tasks from Flask → Worker

### Flow:

```text
Flask App
   ↓
Redis (Broker)
   ↓
Celery Worker
   ↓
Execute Task
```

### Important Clarification:

> Redis does NOT execute tasks.

It only:

* Holds messages
* Transfers tasks

---

## 7. Key Distinction (Very Important)

| Component      | Responsibility            |
| -------------- | ------------------------- |
| Flask          | Handles HTTP requests     |
| Celery         | Manages background tasks  |
| Redis (Broker) | Stores and forwards tasks |
| Worker         | Executes tasks            |
| Result Backend | Stores results/status     |

---

### Final Mental Model:

```text
Flask → Sends Task
Redis → Holds Task
Worker → Executes Task
```

---

## One-Line Summary

> **Flask handles requests, Redis carries tasks, Celery workers do the actual work.**

---
