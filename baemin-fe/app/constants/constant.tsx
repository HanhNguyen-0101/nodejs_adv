export const fees = {
    shippingFee: 17,
    discount: 15,
    service: 14,
};
export const shippingInfo = {
    address: "123 Lê Lợi, Quận 1",
    city: "Ho Chi Minh City",
    state: "State",
    postal_code: "12345",
    country: "Vietnam",
};
export const methods = [
    {
        id: "momo",
        name: "MoMo",
    },
    {
        id: "zalopay",
        name: "ZaloPay",
    },
    {
        id: "card",
        name: "Thẻ tín dụng/ Thẻ ghi nợ",
    },
    {
        id: "cash",
        name: "Thanh toán khi nhận hàng",
    },
];
export const banneritems = [
    {
        id: '1',
        name: 'anh 1',
        url: '/images/map1.png',
    },
    {
        id: '2',
        name: 'anh 2',
        url: '/images/map2.png',
    },
    {
        id: '3',
        name: 'anh 32',
        url: '/images/map3.png',
    },
    {
        id: '3',
        name: 'anh 32',
        url: '/images/map4.png',
    }
];
export const groupByFunc = (data, attrs) => {
    const groupedByData = data?.reduce((result, item) => {
        let id = {...item};
        attrs.forEach(a => {
            id = id[a];
        });
      
        if (!result[id]) {
          result[id] = {
            items: [],
          };
        }
        result[id].items.push(item);
        return result;
      }, {});
    return groupedByData ? Object.values(groupedByData) : [];
}

  