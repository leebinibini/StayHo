package com.nc13.StayHo.domain.wishList.controller;

import com.nc13.StayHo.domain.wishList.model.WishListDTO;
import com.nc13.StayHo.domain.wishList.service.WishListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@CrossOrigin
@RequestMapping("/wishlist/")
public class WishListController {
    private final WishListService WISHLIST_SERVICE;

    public WishListController(WishListService wishlistService) {
        WISHLIST_SERVICE = wishlistService;
    }

    // WishListController.java
    @PostMapping("insert")
    public ResponseEntity<String> addToWishlist(@RequestParam("hotelId") int hotelId, @RequestParam("memberId") int memberId) {
        WishListDTO wishListDTO = new WishListDTO(hotelId, memberId);
        if (WISHLIST_SERVICE.selectOne(wishListDTO) == null) {
            try {
                WISHLIST_SERVICE.insert(wishListDTO);
                return ResponseEntity.ok("Added to wishlist");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add to wishlist");
            }
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Already in wishlist");
        }
    }

    @GetMapping("showWishList")
    public HashMap<String, Object> showWishList(@RequestParam("memberId") int memberId) {
        HashMap<String, Object> resultMap = new HashMap<>();
        resultMap.put("wishLists", WISHLIST_SERVICE.selectAll(memberId));

        return resultMap;
    }

    @GetMapping("check")
    public ResponseEntity<Boolean> checkWishlist(@RequestParam("hotelId") int hotelId, @RequestParam("memberId") int memberId) {
        WishListDTO wishListDTO = new WishListDTO(hotelId, memberId);
        boolean exists = WISHLIST_SERVICE.selectOne(wishListDTO) != null;
        return ResponseEntity.ok(exists);
    }


    @PostMapping("delete")
    public ResponseEntity<String> removeFromWishlist(@RequestParam("hotelId") int hotelId, @RequestParam("memberId") int memberId) {
        WishListDTO wishListDTO = new WishListDTO(hotelId, memberId);
        if (WISHLIST_SERVICE.selectOne(wishListDTO) != null) {
            try {
                WISHLIST_SERVICE.delete(wishListDTO);
                return ResponseEntity.ok("Deleted from wishlist");
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete from wishlist");
            }
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Do not exist in wishlists");
        }

    }
}
