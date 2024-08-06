package com.nc13.StayHo.domain.location;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class LocationController {
    private final LocationService LOCATION_SERVICE;

    public LocationController(LocationService locationService){
        this.LOCATION_SERVICE= locationService;
    }

    @PostMapping("/hotel/insert")
    public ResponseEntity<Void> insert(@RequestBody LocationDTO locationDTO){
        LOCATION_SERVICE.insert(locationDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/hotel/update")
    public ResponseEntity<Void> update(@RequestBody LocationDTO locationDTO){
        LOCATION_SERVICE.update(locationDTO);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/hotel/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id){
        LOCATION_SERVICE.delete(id);
        return ResponseEntity.ok().build();
    }
}
