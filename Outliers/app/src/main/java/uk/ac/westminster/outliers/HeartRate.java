package uk.ac.westminster.outliers;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.Random;

public class HeartRate extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_heart_rate);

        final Random myRandom = new Random();

        Button buttonGenerate = (Button)findViewById(R.id.generate);
        final TextView textGenerateNum = (TextView)findViewById(R.id.generateNum);

        buttonGenerate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textGenerateNum.setText(String.valueOf(myRandom.nextInt(100)));
            }
        });

    }
}