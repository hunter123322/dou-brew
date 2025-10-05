import { ref } from "vue";

type PriceMap = {
    [key: string]: number;
};

type MenuItem = {
    name: string;
    prices?: PriceMap;
    price?: number;
    id: string;
};

type MenuCategory = {
    id: string;
    name: string;
    image: string;
    sizes: string[] | null;
    items: MenuItem[];
};

export const menu = ref<MenuCategory[]>([
    // Data for Milk Tea
    {
        id: 'milk-tea',
        name: 'Milk Tea',
        image: '/img/milktea1.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "1", name: 'Bubble Tea', prices: { R: 20, M: 30, L: 40, 'BUY 1 TAKE 1': 38 } },
            { id: "2", name: 'Winter Melon', prices: { R: 20, M: 30, L: 40, 'BUY 1 TAKE 1': 38 } },
            { id: "3", name: 'Vanilla', prices: { R: 20, M: 30, L: 40, 'BUY 1 TAKE 1': 38 } },
            { id: "4", name: 'Strawberry', prices: { R: 20, M: 30, L: 40, 'BUY 1 TAKE 1': 38 } },
            { id: "5", name: 'Brown Sugar', prices: { R: 20, M: 30, L: 40, 'BUY 1 TAKE 1': 38 } },
            { id: "6", name: 'Chocolate', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "7", name: 'Cookies and Cream', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "8", name: 'Taro', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "9", name: 'Mocha', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "10", name: 'Avocado', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "11", name: 'Mango', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "12", name: 'Buko Pandan', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "13", name: 'Salted Caramel', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "14", name: 'Choco Nutella', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "15", name: 'Rocky Road', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "16", name: 'Banana', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "17", name: 'Blueberry', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "18", name: 'Dark Chocolate', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "19", name: 'Okinawa', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "20", name: 'Matcha', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "21", name: 'Choco Mousse', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "22", name: 'Black Forest', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "23", name: 'Red Velvet', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "24", name: 'White Rabbit', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
            { id: "25", name: 'Hokkaido', prices: { R: 25, M: 35, L: 45, 'BUY 1 TAKE 1': 48 } },
        ]
    },
    {
        id: 'iced-coffee',
        name: 'Iced Coffee',
        image: '/img/icecoffee.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "26", name: 'Ice Mocha', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "27", name: 'Caramel Macchiato', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "28", name: 'Café Macchiato', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "29", name: 'French Vanilla', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "30", name: 'Café Americano', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
        ]
    },
    {
        id: 'frappe',
        name: 'Frappe',
        image: '/img/frappe.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "31", name: 'Strawberry', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "32", name: 'Chocolate', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "33", name: 'Blueberry Oreo', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "34", name: 'Dark Chocolate', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "35", name: 'Black Forest', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "36", name: 'Mango Graham', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "37", name: 'Cheesecake', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "38", name: 'Ube Taro', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "39", name: 'Avocado', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "40", name: 'Red Velvet', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "41", name: 'Banana Split', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "42", name: 'Caramel Vanilla', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "43", name: 'Cookies and Cream', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "44", name: 'Choco Nutella', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "45", name: 'Rocky Road', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
            { id: "46", name: 'Matcha', prices: { R: 60, M: 75, L: 85, 'BUY 1 TAKE 1': 118 } },
        ]
    },
    {
        id: 'fruit-tea',
        name: 'Fruit Tea',
        image: '/img/fruittea.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "47", name: 'Grape', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "48", name: 'Passion Fruit', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "49", name: 'Mango', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "50", name: 'Watermelon', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "51", name: 'Lemon', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "52", name: 'Green Apple', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "53", name: 'Strawberry', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "54", name: 'Blueberry', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "55", name: 'Kiwi', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "56", name: 'Honey Peach', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "57", name: 'Lychee', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
            { id: "58", name: 'Pineapple', prices: { R: 20, M: 35, L: 45, 'BUY 1 TAKE 1': 38 } },
        ]
    },
    {
        id: 'yogurt',
        name: 'Yogurt',
        image: '/img/yogurt.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "59", name: 'Grape', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "60", name: 'Passion Fruit', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "61", name: 'Mango', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "62", name: 'Watermelon', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "63", name: 'Lemon', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "64", name: 'Green Apple', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "65", name: 'Strawberry', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "66", name: 'Blueberry', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "67", name: 'Kiwi', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "68", name: 'Honey Peach', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "69", name: 'Lychee', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
            { id: "70", name: 'Pineapple', prices: { R: 30, M: 45, L: 55, 'BUY 1 TAKE 1': 58 } },
        ]
    },
    {
        id: 'coffee-frappe',
        name: 'Coffee Frappe',
        image: '/img/coffeefrappe.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "71", name: 'Mocha', prices: { R: 70, M: 85, L: 95, 'BUY 1 TAKE 1': 138 } },
            { id: "72", name: 'Caramel Macchiato', prices: { R: 70, M: 85, L: 95, 'BUY 1 TAKE 1': 138 } },
            { id: "73", name: 'Coffee Macchiato', prices: { R: 70, M: 85, L: 95, 'BUY 1 TAKE 1': 138 } },
            { id: "74", name: 'French Vanilla', prices: { R: 70, M: 85, L: 95, 'BUY 1 TAKE 1': 138 } },
            { id: "75", name: 'Salted Caramel', prices: { R: 70, M: 85, L: 95, 'BUY 1 TAKE 1': 138 } },
        ]
    },
    {
        id: 'iced-latte',
        name: 'Iced Latte',
        image: '/img/icedlatte.jpg',
        sizes: ['R', 'M', 'L', 'BUY 1 TAKE 1'],
        items: [
            { id: "76", name: 'Matcha', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "77", name: 'Taro', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "78", name: 'Strawberry', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "79", name: 'Choco', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
            { id: "80", name: 'Red Velvet', prices: { R: 30, M: 40, L: 50, 'BUY 1 TAKE 1': 58 } },
        ]
    },
    {
        id: 'hot-coffee',
        name: 'Hot Coffee',
        image: '/img/hotdrinks.jpg',
        sizes: null,
        items: [
            { id: "81", name: 'Café Americano', prices: { "One Size": 30 }, price: 30 },
            { id: "82", name: 'Café Macchiato', prices: { "One Size": 30 }, price: 30 },
            { id: "83", name: 'Hazelnut Macchiato', prices: { "One Size": 30 }, price: 30 },
            { id: "84", name: 'Mochaccino', prices: { "One Size": 30 }, price: 30 },
        ]
    },
    {
        id: 'hot-tea',
        name: 'Hot Tea',
        image: '/img/hotdrinks.jpg',
        sizes: null,
        items: [
            { id: "85", name: 'Black Tea', prices: { "One Size": 30 }, price: 30 },
            { id: "86", name: 'Mocha', prices: { "One Size": 30 }, price: 30 },
            { id: "87", name: 'Lemon', prices: { "One Size": 30 }, price: 30 },
            { id: "88", name: 'Honey Peach', prices: { "One Size": 30 }, price: 30 },
        ]
    },
    {
        id: 'hot-choco',
        name: 'Hot Chocolate',
        image: '/img/hotdrinks.jpg',
        sizes: null,
        items: [
            { id: "89", name: 'Chocolate', prices: { "One Size": 30 }, price: 30 },
            { id: "90", name: 'Dark Chocolate', prices: { "One Size": 30 }, price: 30 },
            { id: "91", name: 'Choco Mousse', prices: { "One Size": 30 }, price: 30 },
        ]
    }
]);
