package lk.iit.outliers.backend;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class RequestController {

    @RequestMapping(value = "/helloworld",method = RequestMethod.GET)
    public ResponseEntity<Object> helloworld(){
        return  new ResponseEntity<>("Hello world", HttpStatus.OK);
    }

    @RequestMapping(value = "/heartrate",method = RequestMethod.POST)
    public ResponseEntity<Object> getHeartRate(@RequestBody String age){
        JSONObject jsonObject = new JSONObject(age);
        Person person = new Person();
        person.setName(jsonObject.getString("name"));
        return  new ResponseEntity<>(person, HttpStatus.OK);
//        if(age.equals("25")){
//
//            return  new ResponseEntity<>("Average heart rate is 70", HttpStatus.OK);
//        }else{
//
//            return  new ResponseEntity<>("Age not in system", HttpStatus.OK);
//        }
    }
}
