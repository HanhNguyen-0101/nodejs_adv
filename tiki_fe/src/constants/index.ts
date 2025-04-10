export const STATUS_CODE = {
  CREATE_SUCCESS: 201,
  SUCCESS: 200,
  ERROR: 404,
};

export const PAGING = {
  TAKE: 6,
};

export const SHIPPING = {
  FEES: [
    { id: 1, name: 'Giao siêu tốc 2h', fee: 25 },
    { id: 2, name: 'Giao tiết kiệm', fee: 10 },
  ],
  METHODS: [
    { id: 1, name: 'Thanh toán tiền mặt', img: 'cash.svg' },
    { id: 2, name: 'Viettel Money', img: 'viettelpay.svg' },
    { id: 3, name: 'Ví Momo', img: 'momo.svg' },
    { id: 4, name: 'Ví ZaloPay', img: 'zalopay.svg' },
    { id: 5, name: 'VNPAY', img: 'vnpay.svg' },
    { id: 6, name: 'Thẻ tín dụng / Ghi nợ', img: 'atm.svg' },
  ],
};

export const banners = [
  {
    src1: 'banner-1-1.webp',
    src2: 'banner-1-2.webp',
  },
  {
    src1: 'banner-2-1.webp',
    src2: 'banner-2-2.webp',
  },
  {
    src1: 'banner-3-1.webp',
    src2: 'banner-3-2.webp',
  },
];
