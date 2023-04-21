package com.example.strawberrydiseases2;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.strawberrydiseases2.ml.Model;

import org.tensorflow.lite.DataType;
import org.tensorflow.lite.support.common.ops.NormalizeOp;
import org.tensorflow.lite.support.image.ImageProcessor;
import org.tensorflow.lite.support.image.TensorImage;
import org.tensorflow.lite.support.image.ops.ResizeOp;
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Arrays;

public class MainActivity extends AppCompatActivity {

    Bitmap bitmap;
    TextView result;
    ImageView imageView;
    Button selectBtn, captureBtn, predictBtn;

    // Define the classification labels
    String[] labels_name = {"Angular Leaf Spot", "Anthracnose Fruit Rot",
            "Blossom Blight", "Gray Mold", "Leaf Spot",
            "Powdery Mildew Fruit", "Powdery Mildew Leaf"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Define the permission to the camera
        getPermission();

        // Define the application variables
        result = findViewById(R.id.result);
        imageView = findViewById(R.id.imageView);
        selectBtn = findViewById(R.id.selectBtn);
        predictBtn = findViewById(R.id.predictBtn);
        captureBtn = findViewById(R.id.captureBtn);


        // Define the Select button
        selectBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_GET_CONTENT);
                intent.setType("image/*");
                startActivityForResult(intent, 10);
            }
        });

        // Define the Capture button
        captureBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(intent, 12);
            }
        });

        // Define the Predict button
        predictBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                try {
                    Model model = Model.newInstance(MainActivity.this);

                    // Creates inputs for reference.
                    TensorBuffer inputFeature0 = TensorBuffer.createFixedSize(new int[]{1, 224, 224, 3}, DataType.FLOAT32);
                    bitmap = Bitmap.createScaledBitmap(bitmap, 224, 224, true);

                    // Rescale image byt 255 to fit model prediction
                    TensorImage image = resizePic(bitmap);
                    ByteBuffer byteBuffer = image.getBuffer();
                    inputFeature0.loadBuffer(byteBuffer);

                    // Runs model inference and gets result.
                    Model.Outputs outputs = model.process(inputFeature0);
                    TensorBuffer outputFeature0 = outputs.getOutputFeature0AsTensorBuffer();

                    // Extract the model prediction
                    float[] prediction = outputFeature0.getFloatArray();

                    // Display the model classification on the screen
                    result.setText(labels_name[getMax(outputFeature0.getFloatArray())]+" ");
                    System.out.print(getMax(outputFeature0.getFloatArray()));
                    Log.d("Predict", labels_name[getMax(outputFeature0.getFloatArray())]);

                    // Releases model resources if no longer used.
                    model.close();

                } catch (IOException e) {
                    Log.d("ERROR: ", "Prediction error");
                }
            }
        });
    }

    // Rescale bitmap image by 255 to fit model prediction
    private TensorImage resizePic(Bitmap bp) {
        ImageProcessor imageProcessor = new ImageProcessor.Builder()
                .add(new ResizeOp(224, 224, ResizeOp.ResizeMethod.BILINEAR))
                .add(new NormalizeOp(0f, 255f))
                .build();
        TensorImage tImage = new TensorImage(DataType.FLOAT32);
        tImage.load(bp);
        tImage = imageProcessor.process(tImage);
//        System.out.println("tensorImage1: " + tImage.getTensorBuffer().getFloatArray()[0]);
        return tImage;
    }

    // Function return max number from array
    int getMax(float[] arr){
        int max = 0;
        for(int i=0; i<arr.length; i++){
            if (arr[max] < arr[i]) max = i;
        }
        return max;
    }

    void getPermission(){
        if(checkSelfPermission(android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CAMERA}, 11);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if(requestCode == 10){
            if(data!=null){
                Uri uri = data.getData();
                try {
                    bitmap = MediaStore.Images.Media.getBitmap(this.getContentResolver(), uri);
                    imageView.setImageBitmap(bitmap);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }
        else if(requestCode == 12){
            bitmap = (Bitmap) data.getExtras().get("data");
            imageView.setImageBitmap(bitmap);
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

        if(requestCode == 11 ){
            if(0 < grantResults.length){
                if(grantResults[0] != PackageManager.PERMISSION_GRANTED){
                    this.getPermission();
                }
            }
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }


}