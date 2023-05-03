from bson import ObjectId
import json

class User:
    def __init__(self, data):
        self._id = data.get('_id', ObjectId())
        self.username = data.get('username')
        self.email = data.get('email')
        self.password = data.get('password')
        self.phone = data.get('phone')
        self.location = data.get('location')
        self.createdAt = data.get('createdAt')
        self.updatedAt = data.get('updatedAt')
        self.isActive = data.get('isActive')
        self.isBlocked = data.get('isBlocked')
        self.gender = data.get('gender')
        self.role = data.get('role')
        self.image = data.get('image')
        self.resetpwdToken = data.get('resetpwdToken')
        self.two_FactAuth_Option = data.get('two_FactAuth_Option')
        self.two_FactAuth = data.get('two_FactAuth')
        self.emailChange = data.get('emailChange')
        self.email_change_option = data.get('email_change_option')
        self.likedPost = data.get('likedPost')
        self.badges = data.get('badges')
        self.notifications = data.get('notifications')
        self.faceID = data.get('faceID')

    def to_json(self):
        json_data = {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'phone': self.phone,
            'location': self.location,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'isActive': self.isActive,
            'isBlocked': self.isBlocked,
            'gender': self.gender,
            'role': self.role,
            'image': self.image,
            'resetpwdToken': self.resetpwdToken,
            'two_FactAuth_Option': self.two_FactAuth_Option,
            'two_FactAuth': self.two_FactAuth,
            'emailChange': self.emailChange,
            'email_change_option': self.email_change_option,
            'likedPost': self.likedPost,
            'badges': self.badges,
            'notifications': self.notifications,
            'faceID': self.faceID,
        }
        if self._id:
            json_data['_id'] = str(self._id)
        return json.dumps(json_data)

    @staticmethod
    def from_json(json_data):
        data = json.loads(json_data)
        if '_id' in data:
            data['_id'] = ObjectId(data['_id'])
        return User(data)

    def to_bson(self):
        bson_data = {
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'phone': self.phone,
            'location': self.location,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'isActive': self.isActive,
            'isBlocked': self.isBlocked,
            'gender': self.gender,
            'role': self.role,
            'image': self.image,
            'resetpwdToken': self.resetpwdToken,
            'two_FactAuth_Option': self.two_FactAuth_Option,
            'two_FactAuth': self.two_FactAuth,
            'emailChange': self.emailChange,
            'email_change_option': self.email_change_option,
            'likedPost': self.likedPost,
            'badges': self.badges,
            'notifications': self.notifications,
            'faceID': self.faceID,
        }
        if self._id:
            bson_data['_id'] = self._id
        return bson_data
