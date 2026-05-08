# SOL English Land Landing Page

Đây là landing page tĩnh cung cấp chương trình tặng Voucher cho cán bộ Đoàn - Hội - Đội của trung tâm tiếng Anh SOL English Land. Dự án hoàn toàn được xây dựng bằng HTML, CSS (flexbox/grid) và Javascript thuần, không phát sinh quá trình build. Đảm bảo tốc độ nhanh nhất, tương thích mọi thiết bị và không phụ thuộc thư viện ngoài.

## Cấu trúc thư mục

```
/
├── index.html     ─ File duy nhất chứa toàn bộ code (HTML, CSS variables, JS). Mở là chạy!
└── README.md      ─ Hướng dẫn triển khai
```

## Các tính năng

- **Single-file Architecture:** Mọi CSS, JS, hiệu ứng đều được gộp thẳng trong `index.html`. Không gặp lỗi 404 về asset hay cross-origin policies.
- **Hoàn toàn Responsiveness:** Sử dụng Flexbox, CSS Grid và Media Queries phù hợp. Tự động chuyển đổi layout linh hoạt từ Mobile -> Tablet -> Desktop.
- **Hiệu ứng mượt mà (Animations):** Button pulse, fadeIn, trượt số liệu tự động bằng Vanilla Javascript (IntersectionObserver), sticky menu khi cuộn chuột.
- **Form gửi không tải lại trang:** JS sẽ xử lý hiển thị trạng thái thành công sau khi nhấn nộp đơn trực tiếp.
- **Không load-blocking:** Tích hợp fallback content, hiển thị tốt kể cả khi có vấn đề loading.
- **Màu sắc và Tương phản:** Tối ưu hóa màu cho chủ đề Giáo dục (Navy + Orange + Cobalt), chống chói và chìm.

## Hướng dẫn Deploy (khuyên dùng Vercel/Netlify/Github Pages)

Bởi vì codebase này không chứa logic Server-Side hay Build Step phức tạp, việc deploy lên nền tảng miễn phí chỉ mất 1 phút:

### Deploy trên Vercel:
1. Đẩy repo này của bạn lên tài khoản **GitHub**.
2. Đăng nhập vào [Vercel dashboard](https://vercel.com/new).
3. Bấm nút **Add New... -> Project** và **Import** repository GitHub đó.
4. Ở phần thiết lập (Configure Project): 
   - Framework Preset chọn **Other** (mặc định No Build).
   - Không cần thiết lập Environment Variables.
5. Cuối cùng bấm **Deploy**. Đợi khoảng 10 giây và bạn sẽ có đường link live sống ngay lập tức.

### Mở cục bộ (Local Run):
Rất đơn giản, bạn chỉ cần nhấp đúp (Double click) vào tệp `index.html` để khởi chạy Landing Page trên trình duyệt bất kì mà không cần cài thêm node.js, liveserver.
