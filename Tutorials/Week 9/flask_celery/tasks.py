import time
from celery_app import celery

@celery.task
def generate_report(name):
    print(f"Starting report for {name}")

    time.sleep(20)

    print(f"Finished report for {name}")

    return f"Report for {name} generated successfully"