from celery import Celery

celery = Celery('flask_celery', broker='redis://localhost:6379/0', backend='redis://localhost:6379/0')