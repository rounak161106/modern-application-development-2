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
