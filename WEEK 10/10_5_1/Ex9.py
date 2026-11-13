from ultralytics import YOLO
import random
import os

# Set the path to the best model
model_path = os.path.join("runs", "detect", "train2", "weights", "best.pt")

# Load a model
model = YOLO(model_path) # load a custom model

# Validate the model
metrics = model.val() #no arguments needed, dataset and settings remembered
print(metrics.box.map) #map50-95
print(metrics.box.map50) #map50
print(metrics.box.map75) #map75
print(metrics.box.maps) #a list containing mAP50-95 for each category

# Predict on a random image from validation set
val_images_path = "data/images/val"
images = [f for f in os.listdir(val_images_path) if f.lower().endswitch(('.jpg', '.png', '.jpeg', '.bmp', '.tiff'))]
if images:
    random_image = random.choice(images)
    image_path = os.path.join(val_images_path, random_image)
    print(f"Predicting on random validation image: {image_path}")
    results = model(image_path, save=True) #predict on the random image
    # Show the results
    results[0].show() #display the results
else:
    print("No images found in validation set.")