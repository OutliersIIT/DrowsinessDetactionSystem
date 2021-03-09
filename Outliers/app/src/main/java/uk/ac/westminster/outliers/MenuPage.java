package uk.ac.westminster.outliers;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MenuPage extends AppCompatActivity {

    private Retrofit retrofit;
    private RetrofitInterface retrofitInterface;
    private String BASE_URL = "";

    private Button heartrate_button,drawsy_button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu_page);

        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        retrofitInterface = retrofit.create(retrofitInterface.class);

        drawsy_button = (Button) findViewById(R.id.button1);
        heartrate_button = (Button) findViewById(R.id.button2);

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
    }


    private void signin() {
        Intent intent=new Intent(MenuPage.this, HeartRate.class);
        startActivity(intent);
        View view = getLayoutInflater().inflate(R.loyout.signin_dialog, null);

        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        Builder.setView(view).show();

        Button signinBtn = view.findViewById(R.id.signin);

        final EditText nameEdit = view.findViewById(R.id.nameEdit);
        final EditText ageEdit = view.findViewById(R.id.ageEdit);

        signinBtn.setOnClickListener(new View.OnClickListener() {
            HashMap<String, String> map = new HashMap<>();
            map.put("name", nameEdit.getText().toString());
            map.put("age", ageEdit.getText().toString());

            Call<SigninResult> call = retrofitInterface.executeLogin(map);

            call.enqueue(new Callback<SigninResult>() {
                @Override
                public void onResponse(Call<SigninResult> call, Response<LoginResult>){

                }
                @Override
                public void onFailure(Call<SignResult> call, Throwable t){
                    Toast.makeText(MainActivity.this, t.getMessage(),
                            Toast.LENGTH_LONG).show();
                }
            });
        });
    }

    private void drawsy() {
        Intent intent=new Intent(MenuPage.this, DrawsyDetection.class);
        startActivity(intent);
    }
}