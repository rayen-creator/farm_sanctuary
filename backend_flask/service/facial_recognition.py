from flask import request, jsonify
import re
import base64
import face_recognition
import os
from datetime import datetime
import jwt
from config.jwt_config import JWT_EXPIRE_IN
from config.jwt_config import JWT_ALGORITHM, SECRET_KEY
from db.index import dbConnect
from model.user import User
from datetime import datetime

UPLOAD_FOLDER = "./temp/"
FACES_FOLDER = "./faces/"


def uploadService():
    file = request.files['image']
    filepath = os.path.join(FACES_FOLDER, file.filename)

    if os.path.exists(filepath):
        os.remove(filepath)

    file.save(filepath)
    return jsonify({'message': 'Image saved successfully'})


def recognize_face_service():
    data_json = request.get_json()
    img_decoded = base64.b64decode(
        re.sub("data:image/jpeg;base64,", "", data_json["img_base64"]))

    img_name = str(datetime.now().strftime("%m-%d-%Y-%H-%M-%S")) + ".jpg"
    unknown_image_path = os.path.join(UPLOAD_FOLDER, img_name)
    known_image_path = os.path.join(FACES_FOLDER, data_json["login"] + ".jpg")

    with open(unknown_image_path, 'wb') as f:
        f.write(img_decoded)

    known_image = face_recognition.load_image_file(known_image_path)
    unknown_image = face_recognition.load_image_file(unknown_image_path)

    person_encoding = face_recognition.face_encodings(known_image)[0]

    try:
        unknown_encoding = face_recognition.face_encodings(unknown_image)[0]
        results = face_recognition.compare_faces(
            [person_encoding], unknown_encoding)
    except IndexError:
        os.remove(unknown_image_path)
        return jsonify({
            "valid": False,
            "message": "No face found",
        })
    if True in results:
        os.remove(unknown_image_path)
        collection = dbConnect()
        loggedInUser = collection['users'].find_one(
            {'username': data_json["login"]})
        user = User(loggedInUser)
        json_data = user.to_json()
        # generate token
        payload = {
            'exp': JWT_EXPIRE_IN,
            'iat': datetime.utcnow(),
            'id': user._id
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALGORITHM)
        print("User valid")
        return {
            "valid": True,
            "message": "User valid",
            "token": token,
            "expireIn": JWT_EXPIRE_IN,
            "user": json_data, }, 200, {"Content-Type": "application/json"}
    else:
        os.remove(unknown_image_path)
        print("User invalid")
        return {
            "valid": False,
            "message": "User invalid"}, 200, {"Content-Type": "application/json"}
