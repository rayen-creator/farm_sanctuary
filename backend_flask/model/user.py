from bson import ObjectId
import json


class User:
    def __init__(self, data):
        self._id = str(data.get('_id'))
        self.username = data.get('username')
        self.isActive = data.get('isActive')
        self.isBlocked = data.get('isBlocked')
        self.role = data.get('role')
        self.image = data.get('image')
        self.two_FactAuth_Option = data.get('two_FactAuth_Option')
        self.faceID = data.get('faceID')

    def to_json(self):
            json_data = {
                '_id': str(self._id),
                'username': self.username,
                'isActive': self.isActive,
                'isBlocked': self.isBlocked,
                'role': self.role,
                'image': self.image,
                'two_FactAuth_Option': self.two_FactAuth_Option,
                'faceID': self.faceID,
                }
            if self._id:
                  json_data['_id'] = str(self._id)  # convert ObjectId to string
            return json.dumps(json_data)