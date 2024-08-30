package com.nc13.StayHo.service.origin;

import com.nc13.StayHo.model.model.HotelImgDTO;
import com.nc13.StayHo.model.model.ReviewImgDTO;
import com.nc13.StayHo.model.model.RoomImgDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImgService {
    private final SqlSession SESSION;
    private final String NAMESPACE = "mapper.ImgMapper";
    private final String STATIC_PATH = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String ROOM_PATH = "room";

    public void insertRoom(List<MultipartFile> files, Long roomId) {
        File pathDir = new File(ROOM_PATH);
        if (!pathDir.exists()) {
            new File(ROOM_PATH).mkdirs();
        }

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."));
            String uploadName = UUID.randomUUID() + extension;
            String path = STATIC_PATH + ROOM_PATH;
            RoomImgDTO roomImgDTO = new RoomImgDTO(ROOM_PATH, uploadName, roomId);
            File target = new File(path, uploadName);
            try {
                file.transferTo(target);
            } catch (IOException e) {
                e.printStackTrace();
            }
            SESSION.insert(NAMESPACE + ".insertRoom", roomImgDTO);
        }
    }

    public List<RoomImgDTO> selectRoom(Long id) {
        return SESSION.selectList(NAMESPACE + ".selectRoom", id);
    }

    public void insertHotel(HotelImgDTO hotelImgDTO) {
        SESSION.insert(NAMESPACE + ".insertHotel", hotelImgDTO);
    }

    public List<HotelImgDTO> selectHotel(int id) {
        return SESSION.selectList(NAMESPACE + ".selectHotel", id);
    }

    public List<HotelImgDTO> selectAllHotel() {
        return SESSION.selectList(NAMESPACE + ".selectAllHotel");
    }

    public void delete(int id) {
        SESSION.delete(NAMESPACE + ".delete", id);
    }

    public void insertReviewImg(ReviewImgDTO reviewImgDTO) {
        SESSION.insert(NAMESPACE + ".insertReview", reviewImgDTO);
    }

    public List<ReviewImgDTO> selectReviewImg(int reviewId) {
        return SESSION.selectList(NAMESPACE + ".selectReview", reviewId);
    }

    public void deleteReviewImgByReviewId(int reviewId) {
        SESSION.delete(NAMESPACE + ".deleteReview", reviewId);
    }


}
