import uvicorn
import requests
import numpy as np
import tensorflow as tf

from PIL import Image
from io import BytesIO
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost", "http://localhost:3000", ]

endpoint = "http://localhost:8605/v1/models/email_model:predict"

CLASS_NAMES = ["Angular Leaf Spot", "Anthracnose Fruit Rot", "Blossom Blight",
               "Gray Mold", "Leaf Spot", "Powdery Mildew Fruit", "Powdery Mildew Leaf"]

app.add_middleware(CORSMiddleware,
                   allow_origins=origins,
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"], )


@app.get("/ping")
async def ping():
    return "Hello, I am alive"


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Process image before prediction
    image = read_file_as_image(await file.read())
    image = tf.image.resize(image, (224, 224))
    image = image / 255

    img_batch = np.expand_dims(image, 0)
    json_data = {"instances": img_batch.tolist()}

    # Send request to the server
    response = requests.post(endpoint, json=json_data)

    # Extract the image prediction
    prediction = np.array(response.json()["predictions"][0])

    # Prepare the model output to be display on the screen
    predicted_class = CLASS_NAMES[np.argmax(prediction)]
    confidence = np.max(prediction)

    # Display model classification
    return {
        "class": predicted_class,
        "confidence": float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
