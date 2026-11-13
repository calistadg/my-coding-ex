from random import random, sample
import cv2
import os

DATA_DIR = os.path.join(os.getcwd(), "data")
VIDEO_DIR = os.path.join(DATA_DIR, "videos")

# Download from : https://www.youtube.com/watch?v=IVspDj02u8U
# Put the path exactly assigned
EXCAVATOR_V1 = os.path.join(VIDEO_DIR, "excavator_v1.mp4")

DATASET_DIR = os.path.join(os.getcwd(), "datasets")
EXCAVATOR_IMAGES_DIR = os.path.join(DATASET_DIR, "excavator", "images")

#Snapshot 25 random frames from the video
def snapshot_frames(video_path, output_dir, num_frames=25):
    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    print(f"Total frames in video: {total_frames}")
    frame_indices = sorted(sample(range(total_frames), num_frames))
    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES,idx)
        ret, frame = cap.read()
        if ret:
            output_path = os.path.join(output_dir, f"frame_{idx}.jpg")
            cv2.imwrite(output_path, frame)
    cap.release()

# check if theres existing images in the dataset, if not snapshot frames from the video
if not os.path.exists(EXCAVATOR_IMAGES_DIR) or len(os.listdir(EXCAVATOR_IMAGES_DIR)) == 0:
    snapshot_frames(EXCAVATOR_V1, EXCAVATOR_IMAGES_DIR)