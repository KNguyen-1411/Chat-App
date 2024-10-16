# Chat App

Ứng dụng nhắn tin thời gian thực cho phép người dùng giao tiếp và tương tác dễ dàng.

## Giới Thiệu

Dự án này được xây dựng bằng React và Material-UI, cung cấp một giao diện người dùng thân thiện và hiện đại. Ứng dụng tích hợp Firebase để quản lý dữ liệu và xác thực người dùng, cùng với React-Bootstrap để nâng cao trải nghiệm người dùng.

#### By: Khánh Nguyên

## Công Nghệ Sử Dụng

-   **React**: ^18.3.1
-   **Material-UI**: ^6.0.2
-   **Firebase**: ^10.13.1
-   **React-Bootstrap**: ^5.3.3
-   **React Router DOM**: ^6.26.1
-   **React Hook Form**: ^7.53.0

## Tính Năng

-   **Đăng Nhập**:

    -   Người dùng có thể đăng nhập bằng tài khoản Google hoặc Facebook.
    -   Tạo tài khoản (tính năng này đang được phát triển).

-   **Tạo Phòng Trò Chuyện**:

    -   Người dùng có thể tạo phòng trò chuyện mới.
    -   Tên phòng phải là duy nhất.

-   **Thêm Người Dùng**:

    -   Thêm người dùng vào phòng bằng UID hoặc tìm kiếm theo tên.

-   **Nhắn Tin Thời Gian Thực**:

    -   Tất cả tin nhắn được gửi và nhận ngay lập tức.

-   **Quản Lý Thành Viên**:
    -   Xem danh sách thành viên trong phòng.
    -   Xóa thành viên khỏi phòng (không thể xóa thành viên cuối cùng).
-   **Quản Lý Phòng**:
    -   Xóa phòng khi không cần thiết nữa.

## Lưu Ý

-   Tên phòng phải là duy nhất; không thể tạo phòng có tên trùng với phòng đã tồn tại.
-   Không thể xóa thành viên cuối cùng trong phòng.
-   Không thể thêm thành viên đã có trong phòng.

## Cài Đặt

```bash
    npm i
    yarn dev
```
