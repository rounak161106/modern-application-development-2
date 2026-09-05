from celery import Celery

celery = Celery(
    "basic",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery.task
def add(a, b):
    return a + b