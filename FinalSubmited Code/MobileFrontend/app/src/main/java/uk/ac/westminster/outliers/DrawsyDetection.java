package uk.ac.westminster.outliers;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.RatingBar;
import android.widget.Toast;
import android.widget.VideoView;

public class DrawsyDetection extends AppCompatActivity {

        Handler handler;

 //  Button startbutton = (Button) findViewById(R.id.start_button);

        @Override
        protected void onCreate (Bundle savedInstanceState){
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_drawsy_detection);

       //    startbutton.setOnClickListener(new View.OnClickListener() {

                // VideoView videoView = findViewById(R.id.imageView8);

          /*      @Override
                public void onClick(View v) {
                    //  display toast
                    String ratingmsj ="Checking Heart Rate.....";
                    Toast.makeText(getApplicationContext(),  ratingmsj, Toast.LENGTH_LONG).show();
                }
            });
*/

            handler = new Handler();
            handler.postDelayed(new Runnable() {

                @Override
                public void run() {
                    String lowmsj ="Lowing Heart Rate.....";
                    Toast.makeText(getApplicationContext(),lowmsj, Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(
                            DrawsyDetection.this, DrowsyTime.class);

                    startActivity(intent);
                    finish();
                    //wait for 5  seconds
                }
            }, 5000);

    }
}