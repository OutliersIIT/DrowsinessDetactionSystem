package uk.ac.westminster.outliers;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;


public class MainActivity extends AppCompatActivity {

    Handler handler;

            @Override
            protected void onCreate (Bundle savedInstanceState){
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_welcome);

                handler = new Handler();
                handler.postDelayed(new Runnable() {

                    @Override
                    public void run() {
                        Intent intent = new Intent(MainActivity.this, welcome.class);
                        startActivity(intent);
                        finish();
                        //wait for 3  seconds
                    }
                }, 3000);

            }
        }


