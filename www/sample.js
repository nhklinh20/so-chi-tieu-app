// Dữ liệu mẫu: gia đình 4 người (bố, mẹ, bé Na 6 tuổi, bé Bin 3 tuổi), bố mẹ mỗi người ~30 triệu/tháng.
// Sinh ngẫu nhiên có kiểm soát (cùng tháng luôn ra cùng số) cho 12 tháng gần nhất.
(function (root) {
  function makeSample(now) {
    now = now || new Date();
    var out = [];
    var pad = function (n) { return String(n).padStart(2, '0'); };
    var ymd = function (d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };
    function rng(seed) {
      return function () {
        seed |= 0; seed = seed + 0x6D2B79F5 | 0;
        var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
      };
    }
    for (var mo = 11; mo >= 0; mo--) {
      var first = new Date(now.getFullYear(), now.getMonth() - mo, 1);
      var Y = first.getFullYear(), M = first.getMonth(), days = new Date(Y, M + 1, 0).getDate();
      var r = rng(Y * 100 + M + 7);
      var R = function (a, b) { return Math.round((a + (b - a) * r()) / 1000) * 1000; };
      var D = function (a, b) { return a + Math.floor(r() * (b - a + 1)); };
      var pick = function (a) { return a[Math.floor(r() * a.length)]; };
      var add = function (d, cat, amt, note, type, need) {
        var dt = new Date(Y, M, Math.min(d, days));
        if (dt > now) return;
        var t = { date: ymd(dt), cat: cat, amt: amt, note: note, type: type || 'ex' };
        if (need !== undefined) t.need = need;
        out.push(t);
      };
      var summer = M === 5 || M === 6, hot = M >= 3 && M <= 7;

      // Thu nhập
      add(10, 'luong', 32000000, 'Lương chồng', 'in');
      add(10, 'luong', 28000000, 'Lương vợ', 'in');
      if (M === 0) { add(22, 'thuong', 32000000, 'Thưởng Tết chồng', 'in'); add(22, 'thuong', 28000000, 'Thưởng Tết vợ', 'in'); }
      if (r() < 0.35) add(D(12, 26), 'phu', R(2000000, 5000000), 'Dự án freelance', 'in');

      // Cố định hằng tháng
      add(5, 'nha', 12000000, 'Trả góp nhà');
      add(8, 'nha', hot ? R(1700000, 2300000) : R(1000000, 1400000), 'Tiền điện');
      add(8, 'nha', R(220000, 320000), 'Tiền nước');
      add(12, 'nha', 220000, 'Internet');
      add(12, 'nha', 400000, 'Cước điện thoại');
      add(20, 'bh', 1500000, 'Bảo hiểm nhân thọ');
      add(1, 'hieu', 2000000, 'Biếu ông bà', 'ex', true);
      if (!summer) {
        add(3, 'con', 4500000, 'Học phí bé Na');
        add(3, 'con', 3500000, 'Học phí bé Bin');
        add(15, 'con', 1800000, 'Học tiếng Anh bé Na');
      } else if (M === 5) add(3, 'con', 3000000, 'Trại hè cho bé Na');
      add(2, 'con', R(600000, 900000), 'Sữa cho bé Bin');
      add(17, 'con', R(600000, 900000), 'Sữa cho bé Bin');

      for (var d = 1; d <= days; d++) {
        var wd = new Date(Y, M, d).getDay(), weekend = wd === 0 || wd === 6;
        if (r() < 0.5) add(d, 'cho', R(180000, 480000), pick(['Đi chợ', 'Siêu thị', 'Rau thịt cá', 'Bách Hóa Xanh']));
        if (!weekend && r() < 0.6) add(d, 'an', R(40000, 65000), 'Ăn trưa văn phòng');
        if (weekend && r() < 0.5) add(d, 'an', R(350000, 950000), pick(['Ăn tối cả nhà', 'Lẩu cuối tuần', 'Phở sáng cả nhà', 'Pizza cho bé']));
        if (r() < 0.45) add(d, 'cf', R(29000, 65000), pick(['Cà phê', 'Cà phê', 'Trà sữa']));
        if (r() < 0.12) add(d, 'xe', R(40000, 120000), 'Grab');
      }
      for (var g = D(1, 4); g <= days; g += D(5, 8)) add(g, 'xe', R(80000, 130000), 'Đổ xăng');
      if (M % 4 === 1) add(D(8, 25), 'xe', R(450000, 900000), 'Bảo dưỡng xe');

      for (var s = 0, n = D(2, 4); s < n; s++) add(D(1, 28), 'mua', R(150000, 1800000), pick(['Quần áo cho bé', 'Đồ gia dụng', 'Shopee', 'Giày dép', 'Mỹ phẩm']));
      if (r() < 0.7) add(D(5, 25), 'gt', R(300000, 500000), 'Xem phim cả nhà');
      if (r() < 0.6) add(D(5, 25), 'gt', R(200000, 400000), 'Khu vui chơi cho bé');
      if (r() < 0.6) add(D(1, 28), 'sk', R(350000, 700000), 'Khám nhi');
      if (r() < 0.7) add(D(1, 28), 'sk', R(120000, 400000), 'Thuốc');
      if (r() < 0.5) add(D(1, 28), 'hieu', R(500000, 1000000), 'Đám cưới');
      if (r() < 0.3) add(D(1, 28), 'hoc', R(150000, 300000), 'Sách');

      // Sự kiện theo mùa
      if (M === 1) { add(5, 'mua', 6000000, 'Sắm Tết'); add(8, 'hieu', 5000000, 'Lì xì Tết'); add(6, 'hieu', 4000000, 'Quà Tết biếu ông bà', 'ex', true); }
      if (M === 6) add(18, 'gt', 15000000, 'Du lịch Đà Lạt cả nhà');
      if (M === 8) add(20, 'con', 500000, 'Trung thu cho bé', 'ex', false);
      if (M === 10) add(14, 'sk', 4200000, 'Bé Bin sốt, nằm viện 3 ngày');
      if (M === 3) add(12, 'an', 1500000, 'Sinh nhật bé Na');
    }
    out.sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    return {
      tx: out,
      recurring: [
        { cat: 'nha', amt: 12000000, note: 'Trả góp nhà', type: 'ex', day: 5 },
        { cat: 'luong', amt: 32000000, note: 'Lương chồng', type: 'in', day: 10 },
        { cat: 'luong', amt: 28000000, note: 'Lương vợ', type: 'in', day: 10 }
      ],
      totalBudget: 50000000,
      budgets: { an: 4500000, cf: 1000000, cho: 8000000, xe: 2000000, mua: 3000000, gt: 2000000, con: 12000000 }
    };
  }
  root.makeSample = makeSample;
  if (typeof module !== 'undefined') module.exports = makeSample;
})(typeof window !== 'undefined' ? window : globalThis);
