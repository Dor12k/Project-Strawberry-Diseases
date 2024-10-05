# Project Strawberry Diseases Classification

application that allows users to classify strawberry plant leaf diseases by selecting images from their photo library or capturing them directly with their camera. 
Additionally, we created a website that enables users to upload images of strawberry leaves and receive accurate classifications.

**Dataset Preparation and Model Building:** First, we prepared the dataset and built the model using transfer learning techniques on various architectures, including **VGG16, VGG19**, and **ResNet50**. 
We compared the performance of these models to select the optimal one for our project. We utilized Google Colab and employed TensorFlow with Keras in Python, along with libraries such as **NumPy**, **Matplotlib**, and **JSON** for data handling and visualization.

**Server Development:** Next, we established our servers. The main server is implemented using **FastAPI**, which handles all client requests and performs general calculations. While FastAPI manages these requests, the actual model predictions are delegated to a separate **TensorFlow** server that utilizes the ResNet50 model to classify the images and return the results to the user. This component was developed using **Docker** and **Python** in **PyCharm**, incorporating libraries such as **PIL**, **NumPy**, and **Uvicorn**.

**Website Development:** The third phase involved building the website with **React.js.** This site allows users to upload images of plant leaves and strawberries and receive accurate disease classifications, as illustrated in the images below. We developed this section using Visual Studio Code.

**Android Application Development:** Finally, we created the Android application using Java in Android Studio. This app empowers users to classify images of plant leaves and strawberries from their photo library or directly from the camera, as demonstrated in the accompanying video.

**Graph:**

![Graph1](https://user-images.githubusercontent.com/107938584/236171723-07a64642-6fa0-40b0-80ce-fdac242fe38d.jpg)




**Application preview:**

https://user-images.githubusercontent.com/107938584/233852448-9e6f4fb8-e9a1-470b-9ca9-ccdd5e777a2e.mp4




**Website preview 1:**

![web 7](https://user-images.githubusercontent.com/107938584/233727314-94c2b512-7465-417d-a9bb-2bedfc0622eb.jpg)



**Website preview 2:**

![web 8](https://user-images.githubusercontent.com/107938584/233727344-8c8e2b12-e4f0-4784-afc8-2d1e7283ae05.jpg)


