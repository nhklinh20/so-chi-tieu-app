# Sổ Chi Tiêu

App ghi chép chi tiêu: gõ nhanh tự nhận danh mục, ngân sách, dự báo cuối tháng, lịch, báo cáo, màu theo mệnh, đồng bộ mọi máy qua Firebase.

- **Android:** cài file `SoChiTieu.apk` ở mục *Releases* của repo này.
- **iPhone / máy tính:** mở trang GitHub Pages của repo (Settings → Pages), rồi "Thêm vào màn hình chính".

## 1. Tạo Firebase (làm một lần, ~10 phút)
1. Vào https://console.firebase.google.com → **Add project** → đặt tên (vd `so-chi-tieu`) → tắt Google Analytics → Create.
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
3. **Build → Firestore Database → Create database** → chọn vùng `asia-southeast1` → *Start in production mode*.
4. Trong Firestore, tab **Rules**: xóa hết, dán nội dung file `firestore.rules` → **Publish**.
5. Bánh răng **Project settings → General → Your apps → biểu tượng `</>` (Web)** → đặt tên → Register. Sao chép đoạn `const firebaseConfig = { ... }`.
6. Cấu hình Firebase đã được cài sẵn trong app. Mở app → **Cài đặt → Đồng bộ mọi máy** → **Tạo tài khoản** (lần đầu) hoặc **Đăng nhập** (các máy sau).

## 2. Build APK bằng GitHub
1. Tạo repo mới trên GitHub, đẩy toàn bộ thư mục này lên nhánh `main`.
2. Repo → **Settings → Pages → Source: GitHub Actions**.
3. Tab **Actions** sẽ tự chạy "Build APK & web" (~6–8 phút). Xong thì vào **Releases** tải `SoChiTieu.apk`.
4. Trên Samsung: mở file APK → cho phép "Cài ứng dụng không rõ nguồn gốc" → Cài đặt.

Mỗi lần sửa code và đẩy lên `main`, GitHub tự build bản mới.
