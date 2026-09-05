from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, current_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'

db = SQLAlchemy(app)
jwt = JWTManager(app)
app.app_context().push()

app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key in production

@jwt.user_identity_loader
def load(user):
    return user.username ## This function with that decorator will be used to load the identity of the user when creating a JWT. It takes a user object as input and returns the username of that user, which will be stored in the JWT as the subject (sub) claim. This allows us to identify the user associated with a given JWT when it is sent back to the server in subsequent requests.

@jwt.user_lookup_loader
def user_lookup(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(username=identity).one_or_none()  ##  This function with that decorator will be used to look up the user associated with a given JWT. It takes the JWT header and data as input, extracts the subject (sub) claim from the JWT data, and queries the database for a user with that username. If a matching user is found, it is returned; otherwise, None is returned.

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

@app.route('/')
def index():
    return 'Welcome to the Flask API!'

@app.route('/api/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    # creds = request.get_json()

    user = User.query.filter_by(username=username, password=password).first()
    if not user:
        return {'message': 'Invalid credentials'}, 400
    else:
        if password == user.password:
            # return {'message': 'Login successful'}, 200
            access_token = create_access_token(identity=user) # triggers the load function to get the username of the user and store it in the JWT
            # return {'access_token': access_token}, 200
            return jsonify(access_token=access_token), 200
        else:
            return {'message': 'Invalid credentials'}, 400

@app.route("/api/dashboard", methods=["GET"])
@jwt_required()  # triggers the user_lookup_loader function to get the user object from the JWT
def dashboard():
    # return {
    #     "username" : "rounak", 
    #     "password" : "123"
    # }
    return {
        "username": current_user.username,
        "password": current_user.password
    }

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)