import os
from flask import Flask, send_from_directory, render_template
from utils.detect_facial_features import DetectFacialFeatures
from flask import request
import io
import base64
from PIL import Image
import numpy as np
import cv2
import skimage.io
#from io import StringIO
from io import BytesIO
import re
from base64 import b64decode

app = Flask(__name__, static_folder='react_app/build')

@app.route("/api/detect", methods=['GET','POST'])
def api():
    detector = DetectFacialFeatures()
    image = request.form.get('file')
    #nparr = np.fromstring(image, np.uint8)
    #img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # imgstr = re.search(r'base64,(.*)', image).group(1)
    # image_bytes = io.BytesIO(base64.b64decode(imgstr))
    # im = Image.open(image_bytes)
    # arr = np.array(im)[:,:,0]
    # print (type(arr))

    # image_bytes = BytesIO(b64decode(re.sub("data:image/jpeg;base64", '', image)))
    # im = Image.open(image_bytes)
    # arr = np.array(im)[:,:,0]
    # print (type(arr))

    imgstr = re.search(r'base64,(.*)', image).group(1)
    output = open('picture.jpeg', 'wb')
    output.write(base64.b64decode(imgstr))
    output.close()
    image = cv2.imread("./picture.jpeg")
    print (type(image))
    return detector.detect_face(image)

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("react_app/build/" + path):
        return send_from_directory('react_app/build', path)
    else:
        return send_from_directory('react_app/build', 'index.html')

if __name__ == '__main__':
    app.run(use_reloader=True, port=5000, threaded=True)
