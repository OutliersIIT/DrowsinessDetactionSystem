package uk.ac.westminster.outliers;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.content.ContextCompat;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.support.v4.os.IResultReceiver;
import android.text.style.BackgroundColorSpan;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
    private Button sign_button;
    ActionBar titleBar;
    ConstraintLayout background;
    int DefaultColor;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        titleBar= getSupportActionBar();
        titleBar.setBackgroundDrawable(new ColorDrawable(Color.parseColor("Blue")));
       // background =(ConstraintLayout) findViewById(R.id.background);
       // DefaultColor = ContextCompat.getColor(this,R.color.activity_main);


        sign_button = (Button) findViewById(R.id.button);


        sign_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                signin();
            }
        });

    }

    private void signin() {
        Intent intent=new Intent(MainActivity.this, MenuPage.class);
        startActivity(intent);
    }


}