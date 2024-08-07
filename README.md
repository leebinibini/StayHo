### 호텔 프로젝트
- 조건: 싱글페이지 애플리케이션

- member(table) -> 로그인, 회원가입, 수정, 삭제
  - (Columns) id(INT), 
  - name(VARCHAR(50)), 
  - tel(VARCHAR(13)),
  - email(VARCHAR(50)), 
  - password(VARCHAR(60)), 
  - role(ENUM('ROLE_USER','ROLE_REGISTRANT','ROLE_ADMIN')) 
    - default 'ROLE_USER'
*******
- hotel(table) -> (수정, 삭제, 추가)
  - (Columns) id(INT),
  - member_id(FK), 
  - name(VARCHAR(50)), 
  - tel(VARCHAR(13)), 
  - rating(FLOAT)
*******
- hotel_description(table) ->
  - hotel_id(FK)
  - swimming_pool(TINYINT)
  - parking(TINYINT)
  - restaurant(TINYINT)
  - no_smoking(TINYINT)
  - Laundry_facilities(TINYINT)
  - fitness_center(TINYINT)
*******
- location(table) -> (수정, 삭제, 추가)
  - hotel_id(FK)
  - (구현 하는 사람 알아서)
*******
- room(table) -> (수정, 삭제, 추가)
  - (Columns) id(INT), 
  - limit_people(INT), 
  - type(VARCHAR(50)),
  - hotel_id(FK)
*******
- room_description(table)
  - room_id(FK), 
  - bath(TINYINT), 
  - bed(TINYINT), 
  - view(TEXT)
*******
- review(table) -> (수정, 삭제, 추가)
  - (Columns) id, 
  - reservation_id(FK),
  - comment(LONGTEXT)
  - rating(FLOAT)
  - created_at(DATE)
  - updated_at(DATE)
*******
- reservation(table) -> (수정, 삭제, 추가)
  - (Columns) id, 
  - check_in(DATE), 
  - check_out(DATE), 
  - room_id(FK), 
  - member_id(FK), 
  - confirmed(TINYINT), 
  - status(TINYINT)
*******
- price(table) -> (수정, 삭제, 추가)
  - room_id(FK)
  - price(INT)
  - surcharge(INT)
*******
- wishlist(table) -> (수정, 삭제, 추가)
  - hotel_id(FK)
  - member_id(FK)
*******
- img(table) -> (수정, 삭제, 추가)
  - id(INT)
  - filepath(LONGTEXT)
  - filename(LONGTEXT)
  - hotel_id(FK)
  - room_id(FK)
  - review_id(FK)

### 24-08-07
- DB 정보(예약 정보, 호텔, 호텔 정보)
- 객실 갯수를 넣을지 말지