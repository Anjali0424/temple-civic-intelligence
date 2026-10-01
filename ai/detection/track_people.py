from ultralytics import YOLO
import cv2
import os


# ==========================================
# AI Crowd Intelligence - ByteTrack
# ==========================================

print()
print("==========================================")
print(" AI Crowd Intelligence - ByteTrack")
print("==========================================")
print()


# ==========================================
# Project paths
# ==========================================

# detection folder
DETECTION_DIR = os.path.dirname(os.path.abspath(__file__))

# ai folder
BASE_DIR = os.path.dirname(DETECTION_DIR)

VIDEO_PATH = os.path.join(
    BASE_DIR,
    "videos",
    "crowd.mp4"
)

OUTPUT_DIR = os.path.join(
    BASE_DIR,
    "output"
)

OUTPUT_PATH = os.path.join(
    OUTPUT_DIR,
    "tracked_crowd.mp4"
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "yolo11n.pt"
)


# ==========================================
# Configuration
# ==========================================

CONFIDENCE_THRESHOLD = 0.40

WINDOW_WIDTH = 1000
WINDOW_HEIGHT = 700


# ==========================================
# Create output directory
# ==========================================

os.makedirs(
    OUTPUT_DIR,
    exist_ok=True
)


# ==========================================
# Display paths
# ==========================================

print("Project directory:")
print(BASE_DIR)
print()

print("Video:")
print(VIDEO_PATH)
print()

print("YOLO model:")
print(MODEL_PATH)
print()

print("Output:")
print(OUTPUT_PATH)
print()


# ==========================================
# Check video
# ==========================================

if not os.path.exists(VIDEO_PATH):

    print("ERROR: Video file not found!")
    print()
    print("Expected:")
    print(VIDEO_PATH)
    print()

    exit()


# ==========================================
# Check YOLO model
# ==========================================

if not os.path.exists(MODEL_PATH):

    print("ERROR: YOLOv11 model not found!")
    print()
    print("Expected:")
    print(MODEL_PATH)
    print()

    exit()


# ==========================================
# Load YOLOv11
# ==========================================

print("Loading YOLOv11 model...")

model = YOLO(
    MODEL_PATH
)

print("YOLOv11 model loaded successfully.")
print()


# ==========================================
# Open video
# ==========================================

print("Opening video...")

cap = cv2.VideoCapture(
    VIDEO_PATH
)


if not cap.isOpened():

    print("ERROR: Could not open video.")
    print()
    print("Video path:")
    print(VIDEO_PATH)

    exit()


print("Video opened successfully.")
print()


# ==========================================
# Video properties
# ==========================================

width = int(
    cap.get(cv2.CAP_PROP_FRAME_WIDTH)
)

height = int(
    cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
)

fps = cap.get(
    cv2.CAP_PROP_FPS
)

total_frames = int(
    cap.get(cv2.CAP_PROP_FRAME_COUNT)
)


if fps <= 0:

    fps = 30


print("Video information")
print("--------------------------------")
print(f"Width        : {width}")
print(f"Height       : {height}")
print(f"FPS          : {fps:.2f}")
print(f"Total frames : {total_frames}")
print("--------------------------------")
print()


# ==========================================
# Video writer
# ==========================================

fourcc = cv2.VideoWriter_fourcc(
    *"mp4v"
)

out = cv2.VideoWriter(
    OUTPUT_PATH,
    fourcc,
    fps,
    (width, height)
)


if not out.isOpened():

    print("ERROR: Could not create output video.")

    cap.release()

    exit()


# ==========================================
# OpenCV window
# ==========================================

WINDOW_NAME = (
    "AI Crowd Intelligence - ByteTrack"
)

cv2.namedWindow(
    WINDOW_NAME,
    cv2.WINDOW_NORMAL
)

cv2.resizeWindow(
    WINDOW_NAME,
    WINDOW_WIDTH,
    WINDOW_HEIGHT
)


# ==========================================
# Tracking variables
# ==========================================

frame_count = 0

unique_ids = set()


# ==========================================
# Process video
# ==========================================

print("Starting ByteTrack...")
print()
print("Press Q to stop.")
print()


while True:

    ret, frame = cap.read()


    if not ret:

        break


    frame_count += 1


    # ======================================
    # YOLOv11 + ByteTrack
    # ======================================

    results = model.track(

        frame,

        persist=True,

        tracker="bytetrack.yaml",

        conf=CONFIDENCE_THRESHOLD,

        classes=[0],

        verbose=False
    )


    # ======================================
    # Current people count
    # ======================================

    current_people = 0


    # ======================================
    # Process tracking results
    # ======================================

    for result in results:

        boxes = result.boxes


        if boxes is None:

            continue


        for box in boxes:

            # --------------------------------
            # Check tracking ID
            # --------------------------------

            if box.id is None:

                continue


            # --------------------------------
            # Tracking ID
            # --------------------------------

            track_id = int(
                box.id[0]
            )


            # --------------------------------
            # Confidence
            # --------------------------------

            confidence = float(
                box.conf[0]
            )


            # --------------------------------
            # Bounding box
            # --------------------------------

            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0]
            )


            current_people += 1

            unique_ids.add(
                track_id
            )


            # =================================
            # Draw bounding box
            # =================================

            cv2.rectangle(

                frame,

                (x1, y1),

                (x2, y2),

                (0, 255, 0),

                2
            )


            # =================================
            # Person ID
            # =================================

            label = (
                f"Person ID: {track_id}"
            )


            cv2.putText(

                frame,

                label,

                (
                    x1,
                    max(y1 - 10, 20)
                ),

                cv2.FONT_HERSHEY_SIMPLEX,

                0.6,

                (0, 255, 0),

                2
            )


            # =================================
            # Confidence
            # =================================

            confidence_text = (
                f"Confidence: {confidence:.2f}"
            )


            cv2.putText(

                frame,

                confidence_text,

                (
                    x1,
                    min(y2 + 20, height - 10)
                ),

                cv2.FONT_HERSHEY_SIMPLEX,

                0.5,

                (0, 255, 255),

                2
            )


    # ======================================
    # Information panel
    # ======================================

    cv2.putText(

        frame,

        f"Current People: {current_people}",

        (20, 40),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.8,

        (0, 255, 255),

        2
    )


    cv2.putText(

        frame,

        f"Unique IDs Seen: {len(unique_ids)}",

        (20, 75),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.8,

        (0, 255, 255),

        2
    )


    cv2.putText(

        frame,

        f"Frame: {frame_count}",

        (20, 110),

        cv2.FONT_HERSHEY_SIMPLEX,

        0.7,

        (255, 255, 255),

        2
    )


    # ======================================
    # Display
    # ======================================

    cv2.imshow(

        WINDOW_NAME,

        frame
    )


    # ======================================
    # Save
    # ======================================

    out.write(
        frame
    )


    # ======================================
    # Keyboard
    # ======================================

    key = cv2.waitKey(1) & 0xFF


    if key == ord("q"):

        break


    # ======================================
    # Progress
    # ======================================

    if frame_count % 30 == 0:

        if total_frames > 0:

            progress = (
                frame_count /
                total_frames
            ) * 100

            print(
                f"Processed: "
                f"{frame_count}/{total_frames} "
                f"({progress:.1f}%) | "
                f"Current People: "
                f"{current_people} | "
                f"Unique IDs: "
                f"{len(unique_ids)}"
            )

        else:

            print(
                f"Processed: {frame_count} | "
                f"Current People: {current_people} | "
                f"Unique IDs: {len(unique_ids)}"
            )


# ==========================================
# Cleanup
# ==========================================

cap.release()

out.release()

cv2.destroyAllWindows()


# ==========================================
# Final information
# ==========================================

print()
print("==========================================")
print(" ByteTrack processing completed")
print("==========================================")
print()
print(
    f"Total frames processed : "
    f"{frame_count}"
)

print(
    f"Unique people tracked : "
    f"{len(unique_ids)}"
)

print()
print("Output video:")
print(OUTPUT_PATH)
print()
print("==========================================")