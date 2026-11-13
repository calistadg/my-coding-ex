import cv2
import os

# Get the current working directory
current_directory = os.getcwd()

# Construct the full path to the image
image_path = os.path.join(current_directory, "data", "Astronaut.png")

# Decode in three different modes
image1 = cv2.imread(image_path, cv2.IMREAD_COLOR)
image2 = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
image3 = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

# Check if the image was loaded successfully
if image1 is None:
    print("Error: Image not found or unable to read.")
else: 
    print("Image loaded successfully!")
if image2 is None:
    print("Error: Image not found or unable to read.")
else: 
    print("Image loaded successfully!")
if image3 is None:
    print("Error: Image not found or unable to read.")
else: 
    print("Image loaded successfully!")  

# display all three images
cv2.imshow("Color Image", image1)
cv2.imshow("Grayscale Image", image2)
cv2.imshow("Unchanged Image", image3)

# Wait for a key press before closing the windows
cv2.waitKey(0)
cv2.destroyAllWindows()