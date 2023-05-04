# Project Strawberry Diseases Classification

In this project we implements system of strawberry diseases classification. 
We build **Android application** wich allow users to classify strawberry plant leaf diseases by selecting image from pictures library or right from the camera.
We alse build **website** wich allow users to upload image of plant leaf strawberry and get the right classification.

First, we prepare the dataset and builds the model by using transfer learning technique on different models like **VGG16, VGG19 and ResNet50.**
We compere the models performence and choose the optimial model for our project.
We work with **Google Colab** and use **Tensorflow** with **Keras** in **Python**.
We also use libraries like **numpy, matplotlib, os, json** etc.

Second, we build our servers. the main server implement by **FastAPI** wich treat all the request from the client and make general calculates.
The **FastAPI** deosn't make the model prediction. that request sends to the **TensorFlow** server that uses ResNet50 model to predict the classification and return the results to the user.
We make this part with **Docker** and with **Python** in **PyCharm** and use libraries like **PIL, numpy, io, uvicron, FastAPI TensowFlow** etc.

Third part is building the website with **React JS**. 
The website allow users upload image of plant leafs and strawberries and  and get the right classification of its diseas as we can see in the pictures below. 
We make this part with **Visual Studio Code**.

Last part is building the application.
We build android application with **Java** in **Android Studio**.
The application allows users to classification image of plant leafs and strawberries from pictures library or from the camera as we see in the video below.

Graph:

![Graph1](https://user-images.githubusercontent.com/107938584/236171723-07a64642-6fa0-40b0-80ce-fdac242fe38d.jpg)




Application preview:

https://user-images.githubusercontent.com/107938584/233852448-9e6f4fb8-e9a1-470b-9ca9-ccdd5e777a2e.mp4




Website preview 1:
![web 7](https://user-images.githubusercontent.com/107938584/233727314-94c2b512-7465-417d-a9bb-2bedfc0622eb.jpg)



Website preview 2:
![web 8](https://user-images.githubusercontent.com/107938584/233727344-8c8e2b12-e4f0-4784-afc8-2d1e7283ae05.jpg)


