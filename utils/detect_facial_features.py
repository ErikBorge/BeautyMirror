# USAGE
# python detect_face_parts.py --shape-predictor shape_predictor_68_face_landmarks.dat --image images/example_01.jpg

# import the necessary packages
from imutils.video import VideoStream
from imutils import face_utils
import numpy as np
import argparse
import imutils
import dlib
import cv2
import matplotlib.pyplot as plt
import json

pi = 3.14159265359

# initialize dlib's face detector (HOG-based) and then create the facial landmark predictor
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('./assets/data/shape_predictor_68_face_landmarks.dat')

class DetectFacialFeatures:
    def __init__(self):
        print("hello world")

    def detect_face(self, image):
        return self.getFacialFeatures(image)
        # return "thats not a face"

    def unit_vector(self, vector):
        #Returns the unit vector of the vector.
        return vector / np.linalg.norm(vector)

    def angle_between(self, v1, v2):
        #Returns the angle in radians between vectors 'v1' and 'v2'
        v1_u = self.unit_vector(v1)
        v2_u = self.unit_vector(v2)
        return np.arccos(np.clip(np.dot(v1_u, v2_u), -1.0, 1.0))

    def getForeheadArea(self, image, gray, rects):
    	if rects:
    		for (i, rect) in enumerate(rects):
    			shape = predictor(gray, rect)
    			shape = face_utils.shape_to_np(shape)
    			x1, y1 = shape[19]
    			x2, y2 = shape[24]
    			cv2.circle(image, (x1, y1), 1, (0, 0, 255), -1)
    			cv2.circle(image, (x2, y2), 1, (0, 0, 255), -1)
    			distance = x2 - x1
    			topleftx = x1
    			toplefty = int((y1+y2)/2-distance/2)
    			topleft = (topleftx, toplefty)
    			bottomrightx = x2
    			bottomrighty = int((y1+y2)/2-20)
    			bottomright = (bottomrightx, bottomrighty)
    			roi = image[toplefty:bottomrighty, topleftx:bottomrightx]
    			roi = cv2.blur(roi,(25,25))
    			cv2.rectangle(image,topleft, bottomright, (0,255,0), 1)
    	else:
    		roi = np.zeros((10,10,3), np.uint8)
    	return roi, image

    def getAverageColor(self, image):
    	avg_color_per_row = np.average(image, axis=0)
    	avg_color = np.average(avg_color_per_row, axis=0)
    	avg_color = (int(avg_color[0]),int(avg_color[1]),int(avg_color[2]))
    	return avg_color

    def getEyes(self, image, gray, rects):
    	if rects:
    		for (i, rect) in enumerate(rects):
    			shape = predictor(gray, rect)
    			shape = face_utils.shape_to_np(shape)

    			x1, y1 = shape[36]
    			x2, y2 = shape[39]
    			cv2.circle(image, (x1, y1), 1, (0, 0, 255), -1)
    			cv2.circle(image, (x2, y2), 1, (0, 0, 255), -1)
    			LRvector=[x2-x1,y2-y1]
    			refvector=[1,0]
    			anglerad=self.angle_between(LRvector,refvector)
    			lengthofLRvector = np.linalg.norm(LRvector)
    			irisx=(lengthofLRvector*np.cos(anglerad))/2
    			irisy=(lengthofLRvector*np.sin(anglerad))/2
    			iris = (int(x1+irisx),int(y1+irisy))
    			newx1 = int(iris[0]-0.2*lengthofLRvector)
    			newx2 = int(iris[0]+0.2*lengthofLRvector)
    			newy1 = int(iris[1]-0.2*lengthofLRvector)
    			newy2 = int(iris[1]+0.2*lengthofLRvector)
    			roi = image[newy1:newy2, newx1:newx2]
    			roi = cv2.blur(roi,(3,3))
    	else:
    		roi = np.zeros((10,10,3), np.uint8)
    	return roi, image

    def getDominantColor(self, image):
    	pixels = np.float32(image.reshape(-1, 3))
    	n_colors = 5
    	criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 200, .1)
    	flags = cv2.KMEANS_RANDOM_CENTERS

    	_, labels, palette = cv2.kmeans(pixels, n_colors, None, criteria, 10, flags)
    	_, counts = np.unique(labels, return_counts=True)
    	dominant = palette[np.argmax(counts)]
    	dominant = (int(dominant[0]),int(dominant[1]),int(dominant[2]))
    	return dominant

    # load the input image, resize it, and convert it to grayscale
    def getFacialFeatures(self,image):
        #image = imutils.resize(image, width=800)
        image = image[0:720, 300:980]
        cv2.imwrite("cropped.jpg",image)
        print ("came this far...")
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # detect faces in the grayscale image
        rects = detector(gray, 1)

        #skin color
        roiforehead, img = self.getForeheadArea(image, gray, rects)
        skincolor = self.getAverageColor(roiforehead)
        cv2.rectangle(roiforehead,(0,0),(20,20), skincolor,-1)
        skincolorimg = np.zeros((10,10,3), np.uint8)
        cv2.rectangle(skincolorimg,(0,0),(10,10),skincolor,-1)

        #eye color
        roiiris, image = self.getEyes(image, gray, rects)
        width, height, channels = roiiris.shape
        if not width or not height:
                roiiris = np.zeros((10,10,3), np.uint8)
        eyecolor = self.getDominantColor(roiiris)
        eyecolorimg = np.zeros((10,10,3), np.uint8)
        cv2.rectangle(eyecolorimg,(0,0),(10,10),eyecolor,-1)

        print ("Eye color: " + str(eyecolor))
        print ("Skin color: " + str(skincolor))
        #eyecolor = [eyecolor[0],eyecolor[1],eyecolor[2]]
        #skincolor = [skincolor[0],skincolor[1],skincolor[2]]
        result = {}
        result['eyecolor']=eyecolor
        result['skincolor']=skincolor
        return json.dumps(result)

        #show images
        #cv2.imshow("Image", image)
        #cv2.imshow("ROIforehead", roiforehead)
        #cv2.imshow("skincolor",skincolorimg)
        #cv2.imshow("ROIiris", roiiris)
        #cv2.imshow("DominantEyeColor",eyecolorimg)
        #cv2.waitKey(0)
        #cv2.destroyAllWindows()
