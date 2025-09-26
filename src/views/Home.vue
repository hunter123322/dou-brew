<script setup lang="ts">
import { ref } from 'vue';
import { Facebook, Instagram, Twitter, CirclePlus } from 'lucide-vue-next';

// --- TYPE DEFINITIONS ---
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

type Cart = {
    id: string;
    size: string;
    pcs: number;
}

const cart = ref<Cart[]>([])

const menu = ref<MenuCategory[]>([
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
            { id: "81", name: 'Café Americano', price: 30 },
            { id: "82", name: 'Café Macchiato', price: 30 },
            { id: "83", name: 'Hazelnut Macchiato', price: 30 },
            { id: "84", name: 'Mochaccino', price: 30 },
        ]
    },
    {
        id: 'hot-tea',
        name: 'Hot Tea',
        image: '/img/hotdrinks.jpg',
        sizes: null,
        items: [
            { id: "85", name: 'Black Tea', price: 30 },
            { id: "86", name: 'Mocha', price: 30 },
            { id: "87", name: 'Lemon', price: 30 },
            { id: "88", name: 'Honey Peach', price: 30 },
        ]
    },
    {
        id: 'hot-choco',
        name: 'Hot Chocolate',
        image: '/img/hotdrinks.jpg',
        sizes: null,
        items: [
            { id: "89", name: 'Chocolate', price: 30 },
            { id: "90", name: 'Dark Chocolate', price: 30 },
            { id: "91", name: 'Choco Mousse', price: 30 },
        ]
    }
]);

const mobileDropDown = ref<boolean>(false);
const sideMobileNav = ref<boolean>(false);
</script>

<template>
    <div class="antialiased bg-[#a0512d8b] text-amber-700-dark">
        <!-- Header -->
        <header class="bg-white/60 backdrop-blur-md shadow-lg sticky top-0 z-50 rounded-b-xl">
            <nav class="container mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center">
                <!-- Logo -->
                <div class="flex justify-center items-center">
                    <div
                        class="flex flex-row items-center text-3xl font-extrabold text-amber-700 font-serif tracking-tight">
                        <img src="/img/logo.jpg" alt="Duo Brew Logo" class="rounded-full h-15 w-auto">
                        <span class="ml-2">DUO BREW</span>
                    </div>
                </div>


                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Home</a>
                    <div class="relative group">
                        <!-- Dropdown Trigger -->
                        <button
                            class="flex items-center text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">
                            Categories
                            <svg class="w-4 h-4 ml-2 transition-transform duration-300 transform group-hover:rotate-180"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <!-- Desktop Dropdown -->
                        <div
                            class="absolute left-1/2 -translate-x-1/2 mt-2 w-48 max-h-64 overflow-y-auto rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-300 ease-in-out opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                            <div class="flex flex-col divide-y">
                                <a v-for="category in menu" :key="category.name" :href="'#' + category.id"
                                    class="px-4 py-2 text-gray-700 hover:text-amber-700 transition-colors duration-300">
                                    {{ category.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Franchise</a>
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Contact</a>
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">About
                        us</a>
                </div>

                <!-- Right side icons -->
                <div class="flex items-center space-x-4">
                    <!-- Shopping Cart -->
                    <button class="p-2 rounded-full hover:bg-gray-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-700" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.182 1.707.707 1.707H17m0 
               0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>

                    <!-- Mobile Menu Toggle -->
                    <button id="mobileMenuBtn" class="p-2 rounded-lg md:hidden hover:bg-gray-200 transition-colors"
                        @click="sideMobileNav = !sideMobileNav">
                        <svg id="menuIcon" class="w-6 h-6 text-amber-700" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                        <svg id="closeIcon" class="w-6 h-6 text-amber-700 hidden" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </nav>

            <!-- Mobile Menu -->
            <!-- Sidebar (hidden by default) -->
            <div id="mobileMenu" :class="sideMobileNav ? 'flex' : '-translate-x-full'"
                class="fixed rounded-lg top-0 left-0 h-auto w-auto bg-white/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 z-50">

                <!-- Sidebar content -->
                <div class="flex flex-col rounded-lg bg-white h-full py-6 px-4 space-y-4">
                    <!-- Close Button (optional inside sidebar) -->
                    <button id="closeSidebarBtn" class="self-end p-2 rounded hover:bg-gray-100"
                        @click="sideMobileNav = !sideMobileNav">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-amber-700" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <!-- Links -->
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Home</a>

                    <!-- Mobile Dropdown -->
                    <div>
                        <button id="mobileCategoriesBtn"
                            class="w-full py-2 flex items-center justify-between text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">
                            Categories
                            <svg id="mobileCategoriesIcon" @click="mobileDropDown = !mobileDropDown"
                                class="w-4 h-4 ml-2 transition-transform duration-300" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        <!-- Dropdown content -->
                        <div id="mobileCategoriesDropdown" :class="mobileDropDown ? 'flex' : 'hidden'"
                            class="flex-col divide-y rounded bg-white mt-2 shadow">
                            <a v-for="category in menu" :key="category.name" :href="'#' + category.id"
                                @click="[mobileDropDown = !mobileDropDown, sideMobileNav = !sideMobileNav]"
                                class="px-4 py-2 text-gray-700 hover:text-amber-700 transition-colors duration-300">
                                {{ category.name }}
                            </a>
                        </div>
                    </div>

                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">franchise</a>
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Contact</a>
                    <a href="#"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">About
                        us</a>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="relative h-[60vh] bg-cover bg-center text-white"
            style="background-image: url('/img/background.jpg')">
            <div class="absolute inset-0 bg-black/50"></div>
            <div
                class="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center h-full text-center">
                <h1 class="text-5xl md:text-7xl font-bold font-serif">Sip, Savor, and Smile</h1>
                <p class="mt-4 text-lg md:text-xl max-w-2xl">Discover your perfect brew, from rich coffees to refreshing
                    fruit teas. Every cup is a little moment of happiness.</p>
                <a href="#menu-start"
                    class="mt-8 bg-white text-amber-700 font-bold py-3 px-8 rounded-full hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105">View
                    Our Menu</a>
            </div>
        </section>

        <!-- Main Content - Menu -->
        <main class="container mx-auto px-4 md:px-6 py-12" id="menu-start">
            <div v-for="category in menu" :key="category.name" :id="category.id" class="mb-16 scroll-mt-24">
                <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div class="md:flex">
                        <!-- Image Section -->
                        <div class="md:w-1/3 flex items-center justify-center">
                            <img :src="category.image" :alt="category.name"
                                class="w-full h-full md:h-200 object-cover object-center rounded-lg" />
                        </div>

                        <!-- Menu Table Section -->
                        <div class="md:w-2/3 p-6 md:p-8">
                            <h2 class="text-3xl font-bold font-serif text-amber-700 mb-6">{{ category.name }}</h2>
                            <div class="overflow-x-hidden h-165">
                                <table class="w-full text-left">
                                    <thead>
                                        <tr class="border-b-2 border-[#D3C5B5]">
                                            <th class="py-3 pr-4 font-semibold">Item</th>
                                            <th v-if="category.sizes" v-for="size in category.sizes" :key="size"
                                                class="py-3 px-2 md:px-4 font-semibold text-center">{{ size }}</th>
                                            <th v-else class="py-3 px-4 font-semibold text-right">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in category.items" :key="item.name" :id="item.id"
                                            class="border-b border-[#EAE0D5]"
                                            :class="{ 'bg-amber-100': index % 2 === 0 }">
                                            <td class="py-4 px-4 font-medium">{{ item.name }}</td>
                                            <td v-if="category.sizes" v-for="size in category.sizes" :key="size"
                                                class="py-4 px-2 md:px-4 text-center text-gray-600">{{
                                                    item.prices?.[size] ?? '-' }}</td>
                                            <td v-else class="py-4 px-4 text-right text-gray-600">{{ item.price }}</td>
                                            <td class="pr-2">
                                                <!-- 
                                                
                                                
                                                
                                                
                                                 -->
                                                <CirclePlus :size="20" class="cursor-pointer"
                                                    @click="cart.push({ id: item.id, })" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- Footer -->
        <footer class="bg-[#A0522D] text-white">
            <div class="container mx-auto px-6 py-8">
                <div class="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div>
                        <h3 class="text-2xl font-bold font-serif">DUOBREW</h3>
                        <p class="mt-2 text-amber-100">Your daily dose of delight.</p>
                    </div>
                    <div class="flex mt-6 md:mt-0 space-x-6">
                        <a href="#" class="hover:text-amber-200 transition-colors">
                            <Facebook :size="24" />
                        </a>
                        <a href="#" class="hover:text-amber-200 transition-colors">
                            <Instagram :size="24" />
                        </a>
                        <a href="#" class="hover:text-amber-200 transition-colors">
                            <Twitter :size="24" />
                        </a>
                    </div>
                </div>
                <div class="mt-8 border-t border-amber-600 pt-6 text-center text-sm text-amber-200">
                    <p>&copy; 2024 DUOBREW. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    </div>
</template>
