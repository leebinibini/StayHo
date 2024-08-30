package com.nc13.StayHo.service.origin;

import com.nc13.StayHo.model.model.ReviewImgDTO;
import com.nc13.StayHo.model.model.ReservationDTO;
import com.nc13.StayHo.model.model.ReviewRegisterDTO;
import com.nc13.StayHo.model.model.ReviewSelectDTO;
import com.nc13.StayHo.model.model.ReviewUpdateDTO;
import com.nc13.StayHo.model.entity.Review;
import com.nc13.StayHo.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final SqlSession session;
    private final String NAMESPACE = "mapper.ReviewMapper.";
    private final String imgPath = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String reviewPath = "review";
    private final ReservationService reservationService;
    private final RoomService roomService;
    private final HotelService hotelService;
    private final ImgService imgService;


    public Boolean insert(int reservationId, ReviewRegisterDTO reviewRegisterDTO, List<MultipartFile> files) {
        reviewRegisterDTO.setReservationId(reservationId);
        try {
            session.insert(NAMESPACE + "insert", reviewRegisterDTO);
            insertImg(reviewRegisterDTO.getId(), files);

            hotelService.updateRating(
                    getStringObjectHashMap(
                            reservationService.selectOne(reservationId)
                    )
            );
        } catch (Exception e) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    private List<?> getStringObjectHashMap(ReservationDTO reservationDTO) {
        var hotelId = roomService.select(reservationDTO.getRoomId()).getHotelId();

        var result = new ArrayList<>();

        result.add(hotelId);
        result.add(averageRating(hotelId));

        return result;
    }

    private Boolean insertImg(int reviewId, List<MultipartFile> files) {
        if (!files.isEmpty()) {
            var filepath = new File(imgPath + reviewPath);
            if (!filepath.exists()) {
                new File(imgPath + reviewPath).mkdirs();
            }
            for (MultipartFile file : files) {
                var fileName = file.getOriginalFilename();
                var uploadName = UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));
                var path = imgPath + reviewPath;

                var target = new File(path, uploadName);
                try {
                    file.transferTo(target);
                    imgService.insertReviewImg(new ReviewImgDTO(path, uploadName, reviewId));
                } catch (IOException e) {
                    e.printStackTrace();
                    return Boolean.FALSE;
                }
            }
        }
        return Boolean.TRUE;
    }

    public Review selectOne(int reviewId) {
        return session.selectOne(NAMESPACE + "selectOne", reviewId);
    }

    public List<?> selectWithImg(int reviewId) {
        var result = new ArrayList<>();

        result.add(selectOne(reviewId));
        result.add(imgService.selectReviewImg(reviewId));

        return result;
    }

    public Boolean update(int reviewId, ReviewUpdateDTO reviewUpdateDTO, List<MultipartFile> files) {
        reviewUpdateDTO.setId(reviewId);
        try {
            session.update(NAMESPACE + "update", reviewUpdateDTO);
            imgService.deleteReviewImgByReviewId(reviewId);
            insertImg(reviewId, files);

            hotelService.updateRating(
                    getStringObjectHashMap(
                            reservationService.selectOne(
                                    selectOne(reviewId).getReservationId()
                            )
                    )
            );
        } catch (Exception e) {
            return Boolean.FALSE;
        }

        return Boolean.TRUE;
    }

    public Boolean delete(int reviewId) {
        try {
            session.delete(NAMESPACE + "delete", reviewId);
            imgService.deleteReviewImgByReviewId(reviewId);
        } catch (Exception e) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    public List<?> selectListByHotel(int hotelId) {
        return putResultMap(session.selectList(NAMESPACE + "selectListByHotel", hotelId));

    }

    public List<?> selectListByRoom(int roomId) {
        return putResultMap(session.selectList(NAMESPACE + "selectListByRoom", roomId));
    }

    public List<?> searchReviewsByComment(int hotelId, String keyword) {
        var params = new HashMap<>();
        params.put("hotelId", hotelId);
        params.put("keyword", keyword);

        return putResultMap(session.selectList(NAMESPACE + "searchReviewsByComment", params));
    }

    public double averageRating(int hotelId) {
        Double averageRating = session.selectOne(NAMESPACE + "averageRating", hotelId);
        return averageRating != null ? averageRating : 0.0;
    }

    public List<?> selectListByMember(int memberId) {
        return putResultMap(session.selectList(NAMESPACE + "selectListByMember", memberId));
    }


    private List<?> putResultMap(List<Review> reviewList) {
        String baseImgUrl = "http://localhost:8080/image/" + reviewPath + "/";

        List<ReviewSelectDTO> reviewDTOList = reviewList.stream()
                .map(review -> {
                    List<ReviewImgDTO> reviewImages = imgService.selectReviewImg(review.getId());

                    List<String> imgUrls = reviewImages.stream()
                            .map(img -> baseImgUrl + img.getFilename())
                            .collect(Collectors.toList());

                    return new ReviewSelectDTO(
                            review.getId(),
                            review.getComment(),
                            review.getRating(),
                            review.getCreatedAt(),
                            review.getUpdatedAt(),
                            review.getMemberId(),
                            review.getMemberName(),
                            imgUrls
                    );
                })
                .collect(Collectors.toList());

        return reviewDTOList;
    }
}
