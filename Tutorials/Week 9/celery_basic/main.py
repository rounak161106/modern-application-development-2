from tasks import add

result = add.delay(10, 20)

print("Task ID:", result.id)
print("Status:", result.status)
print("Result:", result.get())  # we should wait for the result to be ready before printing it. we should avoid calling get() immediately after delay() as it will block the execution until the result is ready. Instead, we can use a loop to check the status of the task and print the result when it's ready.
print(result)