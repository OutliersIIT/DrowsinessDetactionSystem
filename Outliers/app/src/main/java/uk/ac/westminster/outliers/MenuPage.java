package uk.ac.westminster.outliers;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MenuPage extends AppCompatActivity {

    private Button heartrate_button,drawsy_button,terms_con_button,rateus_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu_page);

        drawsy_button = (Button) findViewById(R.id.button1);
        heartrate_button = (Button) findViewById(R.id.button2);
        terms_con_button = (Button) findViewById(R.id.button3);
        rateus_button = (Button) findViewById(R.id.button4);

       heartrate_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                signin();

            }
        });

        drawsy_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                drawsy();
            }});


        terms_con_button.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            terms();
        }});


        rateus_button.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            rate();
        }});
        }

    private void signin() {
        Intent intent=new Intent(MenuPage.this, HeartRate.class);
        startActivity(intent);
    }

    private void drawsy() {
        Intent intent=new Intent(MenuPage.this, DrawsyDetection.class);
        startActivity(intent);
    }

    private void terms() {
        Intent intent=new Intent(MenuPage.this, Terms_and_Con.class);
        startActivity(intent);
    }

    private void rate() {
        Intent intent=new Intent(MenuPage.this, Rating.class);
        startActivity(intent);
    }
}