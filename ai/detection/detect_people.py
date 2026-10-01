from ultralytics import YOLO
import cv2
import os


# ==========================================
# Paths
# ==========================================

# Get the folder containing this Python file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

VIDEO_PATH = os.path.join(BASE_DIR, "videos", "crowd.mp4")
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "detected_crowd.mp4")

MODEL_PATH = os.path.join(BASE_DIR, "yolo11n.pt")


# ==========================================
# Create output directory
# ==========================================

os.makedirs(OUTPUT_DIR, exist_ok=True)


print("==========================================")
print(" AI Crowd Intelligence - Person Detection")
print("==========================================")
print()

print("Video path:")
print(VIDEO_PATH)
print()

print("Output path:")
print(OUTPUT_PATH)
print()


# ==========================================
# Check video file
# ==========================================

if not os.path.exists(VIDEO_PATH):

    print("ERROR: Video file not found!")
    print()
    print("Expected video location:")
    print(VIDEO_PATH)
    print()
    print("Please put your crowd video at:")
    print("ai/videos/crowd.mp4")

    exit()


# ==========================================
# Load YOLOv11
# ==========================================

print("Loading YOLOv11 model...")

model = YOLO(MODEL_PATH)

print("YOLOv11 model loaded successfully.")
print()


# ==========================================
# Open video
# ==========================================

print("Opening video...")

cap = cv2.VideoCapture(VIDEO_PATH)

if not cap.isOpened():

    print("ERROR: Could not open video.")
    print()
    print("Video exists, but OpenCV could not read it.")
    print("Check that the video is a valid MP4 file.")

    exit()


print("Video opened successfully.")
print()


# ==========================================
# Video properties
# ==========================================

width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = cap.get(cv2.CAP_PROP_FPS)

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

if fps <= 0:
    fps = 30


print("Video information:")
print(f"Width       : {width}")
print(f"Height      : {height}")
print(f"FPS         : {fps:.2f}")
print(f"Total frames: {total_frames}")
print()


# ==========================================
# Video writer
# ==========================================

fourcc = cv2.VideoWriter_fourcc(*"mp4v")

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
# Process video
# ==========================================

frame_count = 0

print("Starting person detection...")
print("Press Q to stop.")
print()


while True:

    ret, frame = cap.read()

    if not ret:
        break

    frame_count += 1


    # --------------------------------------
    # YOLOv11 detection
    # --------------------------------------

    results = model(
        frame,
        conf=0.40,
        verbose=False
    )


    person_count = 0


    # --------------------------------------
    # Process detections
    # --------------------------------------

    for result in results:

        boxes = result.boxes

        for box in boxes:

            class_id = int(box.cls[0])

            confidence = float(box.conf[0])


            # COCO class 0 = person
            if class_id != 0:
                continue


            person_count += 1


            # Bounding box coordinates
            x1, y1, x2, y2 = map(
                int,
                box.xyxy[0]
            )


            # ----------------------------------
            # Draw bounding box
            # ----------------------------------

            cv2.rectangle(
                frame,
                (x1, y1),
                (x2, y2),
                (0, 255, 0),
                2
            )


            # ----------------------------------
            # Person label
            # ----------------------------------

            label = f"Person {confidence:.2f}"

            cv2.putText(
                frame,
                label,
                (x1, max(y1 - 10, 20)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2
            )


    # ======================================
    # Display crowd count
    # ======================================

    cv2.putText(
        frame,
        f"People detected: {person_count}",
        (20, 40),
        cv2.FONT_HERSHEY_SIMPLEX,
        1,
        (0, 255, 255),
        2
    )


    # ======================================
    # Display frame
    # ======================================

    cv2.imshow(
        "AI Crowd Intelligence - YOLOv11",
        frame
    )


    # ======================================
    # Save frame
    # ======================================

    out.write(frame)


    # ======================================
    # Progress
    # ======================================

    if frame_count % 30 == 0:

        if total_frames > 0:

            progress = (
                frame_count / total_frames
            ) * 100

            print(
                f"Processed: {frame_count}/{total_frames} "
                f"({progress:.1f}%) | "
                f"People: {person_count}"
            )

        else:

            print(
                f"Processed frames: {frame_count} | "
                f"People: {person_count}"
            )


    # ======================================
    # Press Q to stop
    # ======================================

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break


# ==========================================
# Cleanup
# ==========================================

cap.release()
out.release()
cv2.destroyAllWindows()


# ==========================================
# Final result
# ==========================================

print()
print("==========================================")
print("Processing completed!")
print("==========================================")
print()
print(f"Total frames processed: {frame_count}")
print()
print("Output video:")
print(OUTPUT_PATH)
print()