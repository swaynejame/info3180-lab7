from flask_wtf import FlaskForm
from wtforms import StringField, TextField, SubmitField
from wtforms.validators import DataRequired, Email
from flask_wtf.file import FileField, FileRequired, FileAllowed
from werkzeug.utils import secure_filename

class UploadForm(FlaskForm):
    description = TextField('Description',validators = [DataRequired()])
    photo = FileField('Photo', validators=[FileRequired(),FileAllowed(['jpg', 'png', 'Images only!'])])
