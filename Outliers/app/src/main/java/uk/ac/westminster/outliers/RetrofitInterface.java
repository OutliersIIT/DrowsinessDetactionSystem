package uk.ac.westminster.outliers;

import java.util.HashMap;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface RetrofitInterface {

    @POST("/signin")
    Call<SigninResult> executeSignin(@Body HashMap<String, String> map);

    @POST("/heartRate")
    Call<HeartRAteResult> executeHeartRate(@Body HashMap<String, String>data);
}
