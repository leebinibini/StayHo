package com.nc13.StayHo.service.impl;

import com.nc13.StayHo.model.mapper.ImgMapper;
import com.nc13.StayHo.model.model.RoomImgDTO;
import com.nc13.StayHo.service.ImgService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImgServiceImpl implements ImgService {
    private final ImgMapper mapper;
    private final String STATIC_PATH = "D:\\NC13\\StayHo_NC13\\src\\main\\resources\\static\\image\\";
    private final String ROOM_PATH = "room";

    @Override
    public Integer insertRoom(List<MultipartFile> files, Long roomId) {
        int result = 1;
        if (!(new File(ROOM_PATH)).exists()) {
            new File(ROOM_PATH).mkdirs();
        }

        for (MultipartFile file : files) {
            var fileName = file.getOriginalFilename();
            var uploadName = UUID.randomUUID() + fileName.substring(fileName.lastIndexOf("."));

            try {
                file.transferTo(new File(STATIC_PATH + ROOM_PATH, uploadName));
            } catch (IOException e) {
                e.printStackTrace();
            }
            result *= mapper.insertRoom(new RoomImgDTO(ROOM_PATH, uploadName, roomId));
        }
        return result;
    }

    @Override
    public Integer insertHotel(List<MultipartFile> files, Long hotelId) {
        return 0;
    }

    @Override
    public Integer insertReview(List<MultipartFile> files, Long reviewId) {
        return 0;
    }

    @Override
    public Integer delete(int id) {
        return mapper.delete(id);
    }

    @Override
    public Integer deleteReviewImgByReviewId(int reviewId) {
        return mapper.deleteReview(reviewId);
    }

    @Override
    public List<?> selectRoom(Long id) {
        return mapper.selectRoom(id);
    }

    @Override
    public List<?> selectReview(int id) {
        return mapper.selectReview(id);
    }

    @Override
    public List<?> selectHotel(int id) {
        return  mapper.selectHotel(id);
    }

}
