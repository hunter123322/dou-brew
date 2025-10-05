<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { Facebook, Instagram, Twitter, CirclePlus, ShoppingCart, Trash2, X, CreditCard, QrCode } from 'lucide-vue-next';
import QrcodeVue from "qrcode.vue";
import { BrowserQRCodeReader } from '@zxing/browser'
import { menu } from '@/refData/menu';

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

type Cart = {
    id: string;
    size: string;
    pcs: number;
}


type Product = {
    id: string;
    name: string;
    prices: any;
};

type CartHelper = MenuItem & {
    size: string;
    pcs: number;
}
type QrCode = {
    n: string;
    o: {
        i: number[];
        s: string[];
        p: number[];
    };
    t: number;
}
// Selected size
const selectedSize = ref<string | null>(null);

// Handle click
const selectSize = (size: string) => {
    selectedSize.value = size;
};

const cart = ref<Cart[]>([])
const producsts = ref<Product | null>(null)
const quantity = ref<number>(1)
const cartHelper = ref<CartHelper[] | null>([])

function viewCart() {
    const allItem: MenuItem[] = []
    const itemCartId: CartHelper[] = [];

    // collect all items from menu
    menu.value.forEach(item => {
        allItem.push(...item.items)
    });

    // map products from cart with menu items
    cart.value.forEach(product => {
        allItem.forEach(element => {
            if (element.id === product.id) {
                const newElement = { ...element, size: product.size, pcs: product.pcs }
                itemCartId.push(newElement)
            }
        });
    });

    cartHelper.value = itemCartId;

    const mergedCart = computed(() => {
        if (!cartHelper.value) return [];

        return Object.values(
            cartHelper.value.reduce((acc, curr) => {
                const key = `${curr.id}-${curr.size}`;
                if (!acc[key]) {
                    acc[key] = { ...curr };
                } else {
                    acc[key].pcs += curr.pcs;
                }
                return acc;
            }, {} as Record<string, CartHelper>)
        );
    });
    cartHelper.value = mergedCart.value;
}


function addToCart() {
    const item: Cart = {
        id: producsts.value?.id as string,
        size: selectedSize.value as string,
        pcs: quantity.value
    }
    if (!item) return;
    cart.value.push(item)
}

function buy() {
    isShowingCartItem.value = true;
    isPaying.value = true;
    viewCart();
    generateQrCode();
}

const qrCode: QrCode = {
    n: "Aldrin",          // name
    o: { i: [], s: [], p: [] },  // order
    t: 0                // totalPrice
}

function generateQrCode() {
    if (!cartHelper.value) return;
    qrCode.o = { i: [], s: [], p: [] }
    qrCode.t = 0
    const item = cartHelper.value;
    item.forEach(e => {
        qrCode.o.i.push(Number(e.id))
        qrCode.o.s.push(e.size)
        qrCode.o.p.push(Number(e.pcs))
        if (e.prices) {
            qrCode.t += e.prices[e.size] * e.pcs;
        } else if (e.price) {
            qrCode.t += e.price * e.pcs;
        }
    });
}

function removeItem(id: string, size?: string) {
    if (!cartHelper.value) return
    let index: number | null = null
    if (size) {
        index = cartHelper.value.findIndex(item => item.id === id && item.size === size);
    } else {
        index = cartHelper.value.findIndex(item => item.id === id);
    }

    if (index !== -1) {
        cartHelper.value.splice(index, 1);
        cart.value.splice(index, 1);
    }
}

function subtractPcs(id: string, size: string) {
    if (!cartHelper.value) return
    const item = cartHelper.value.find(i => i.id === id && i.size === size);
    const cartItem = cart.value.find(i => i.id === id && i.size === size) as Cart;
    const cartItemIndex = cart.value.findIndex(e => e.id === id && e.size === size)
    if (item && item.pcs > 1) {
        item.pcs = Math.max(0, item.pcs - 1);
        cartItem.pcs = Math.max(0, cartItem.pcs - 1);
        cart.value[cartItemIndex] = cartItem;
    }
}

function addPcs(id: string, size: string) {
    if (!cartHelper.value) return;
    const item = cartHelper.value.find(i => i.id === id && i.size === size);
    const cartItem = cart.value.find(i => i.id === id && i.size === size) as Cart;
    const cartItemIndex = cart.value.findIndex(e => e.id === id && e.size === size);

    if (item && item.pcs < 100) {
        item.pcs = Math.max(0, item.pcs + 1);
        cartItem.pcs = Math.max(0, cartItem.pcs + 1);
        cart.value[cartItemIndex] = cartItem;
    }
}

const isMilkTea = ref(false)
const isIcedCoffee = ref(false)
const isFrappe = ref(false)
const isFruitTea = ref(false)
const isYogurt = ref(false)
const isCoffeeFrappe = ref(false)
const isIcedLatte = ref(false)
const isHotDrink = ref(false)

function categoryHelper() {
    if (!cartHelper.value) return;

    isMilkTea.value = false;
    isIcedCoffee.value = false;
    isFrappe.value = false;
    isFruitTea.value = false;
    isYogurt.value = false;
    isCoffeeFrappe.value = false;
    isIcedLatte.value = false;
    isHotDrink.value = false;

    for (const e of cartHelper.value) {
        const id = Number(e.id);
        if (id <= 25) isMilkTea.value = true;
        if (id >= 26 && id <= 30) isIcedCoffee.value = true;
        if (id >= 31 && id <= 46) isFrappe.value = true;
        if (id >= 47 && id <= 58) isFruitTea.value = true;
        if (id >= 59 && id <= 70) isYogurt.value = true;
        if (id >= 71 && id <= 75) isCoffeeFrappe.value = true;
        if (id >= 76 && id <= 80) isIcedLatte.value = true;
        if (id >= 81 && id <= 91) isHotDrink.value = true;
    }
}

const scanning = ref(false)
const result = ref<string | null>(null)

let codeReader: BrowserQRCodeReader | null = null

async function startScan() {
    scanning.value = true
    codeReader = new BrowserQRCodeReader()

    try {
        const videoElement = document.getElementById('video') as HTMLVideoElement

        const resultObj = await codeReader.decodeOnceFromVideoDevice(undefined, videoElement)
        result.value = resultObj.getText()

        cart.value = parseQrCode(result.value, menu.value)
        viewCart()
        isShowingCartItem.value = true

        console.log(result.value)

        // ✅ Stop camera after scan
        const stream = videoElement.srcObject as MediaStream
        if (stream) {
            stream.getTracks().forEach(track => track.stop())
        }

        videoElement.srcObject = null
        BrowserQRCodeReader.releaseAllStreams() // releases resources used by the reader
        isResultOfScan.value = true;
        scanning.value = false

    } catch (e) {
        console.error('Scan error:', e)
    } finally {
        scanning.value = false
    }
}


onBeforeUnmount(() => {
    if (codeReader) {
        const videoElement = document.getElementById('video') as HTMLVideoElement;
        if (videoElement) {
            videoElement.srcObject = null;
        }
    }
})

function parseQrCode(qrData: string, menuItems: MenuItem[]): CartHelper[] {
    menuItems = []
    menu.value.forEach(item => {
        menuItems.push(...item.items)
    });

    const parsed: QrCode = JSON.parse(qrData)
    const cart: CartHelper[] = []

    parsed.o.i.forEach((id, index) => {
        const menuItem = menuItems.find(m => Number(m.id) === id)
        if (!menuItem) return

        cart.push({
            ...menuItem,
            size: parsed.o.s[index],
            pcs: parsed.o.p[index],
        });
    });
    console.table(cart);
    cartHelper.value = cart

    return cart
}




const mobileDropDown = ref<boolean>(false);
const sideMobileNav = ref<boolean>(false);
const isBuying = ref(false)
const isShowingCartItem = ref(false)
const isPaying = ref(false)
const isResultOfScan = ref(false)
</script>

<template>

    <div class="antialiased bg-[#a0512d8b] text-amber-700-dark">
        <!-- Cart section -->
        <section :class="isShowingCartItem ? 'fixed' : 'hidden'" class="w-full h-full bg-white/90 top-0 left-0 z-50">
            <div class="flex justify-center items-center w-full h-full">
                <div class="flex flex-col relative p-2 h-1/2 w-2/3 bg-[#cd6b3eff] rounded-lg">
                    <div :class="isResultOfScan ? 'hidden' : ''"
                        class="absolute top-0 right-0 bg-[#cd6b3eff] py-2 px-3 rounded-lg"
                        @click="[isShowingCartItem = false, isResultOfScan = false]">
                        <X :size="20" />
                    </div>

                    <header class="flex justify-center items-center w-full h-1/8 bg-white rounded-lg">
                        <ShoppingCart :size=20 class="mx-2 text-[#cd6b3eff]" />
                        <h1 :class="isResultOfScan ? 'hidden' : ''"
                            class="font-serif font-extrabold text-[#cd6b3eff] text-2xl">Your Cart</h1>
                        <h1 :class="isResultOfScan ? '' : 'hidden'"
                            class="font-serif font-extrabold text-[#cd6b3eff] text-2xl">The Order</h1>
                    </header>
                    <div :class="isPaying ? 'hidden' : 'flex'" class="flex-col py-2 text-xs h-full">

                        <!-- Milk Tea -->
                        <span :class="isMilkTea ? '' : 'hidden'" class="font-bold">Milk Tea</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) <= 25" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Iced Coffee -->
                        <span :class="isIcedCoffee ? '' : 'hidden'" class="font-bold">Iced Coffee</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 26 && Number(item.id) <= 30" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Frappe -->
                        <span :class="isFrappe ? '' : 'hidden'" class="font-bold">Frappe</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 31 && Number(item.id) <= 46" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Fruit Tea -->
                        <span :class="isFruitTea ? '' : 'hidden'" class="font-bold">Fruit Tea</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 47 && Number(item.id) <= 58" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Yogurt -->
                        <span :class="isYogurt ? '' : 'hidden'" class="font-bold">Yogurt</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 59 && Number(item.id) <= 70" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Coffee Frappe -->
                        <span :class="isCoffeeFrappe ? '' : 'hidden'" class="font-bold">Coffee Frappe</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 71 && Number(item.id) <= 75" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Iced Latte -->
                        <span :class="isIcedLatte ? '' : 'hidden'" class="font-bold">Iced Latte</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 76 && Number(item.id) <= 80" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Hot Drinks -->
                        <span :class="isHotDrink ? '' : 'hidden'" class="font-bold">Hot Drinks</span>
                        <div v-for="item in cartHelper" :key="item.id" class="flex flex-col">
                            <div v-if="Number(item.id) >= 81 && Number(item.id) <= 91" class="flex flex-col">
                                <div class="flex justify-between items-center my-1">
                                    <div class="w-1/2 h-auto">
                                        <span class="ml-2">{{ item.name }}</span>
                                    </div>
                                    <span>{{ item.size }}</span>
                                    <div class="flex flex-row px-1 bg-white rounded-full">
                                        <button class="text-red-600 pr-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="subtractPcs(item.id, item.size)">-</button>
                                        <span class="px-1 bg-gray-200"
                                            :class="isResultOfScan ? 'py-1 rounded-full' : ''">{{ item.pcs }}</span>
                                        <button class="text-gray-800 pl-2" :class="isResultOfScan ? 'hidden' : ''"
                                            @click="addPcs(item.id, item.size)">+</button>
                                    </div>
                                    <div class="rounded-full p-1 h-5 bg-white ml-3"
                                        :class="isResultOfScan ? 'hidden' : ''" @click="removeItem(item.id, item.size)">
                                        <Trash2 :size="12" color="red" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div :class="isPaying ? 'flex' : 'hidden'"
                        class="flex-col items-center justify-center w-full h-full bg-white rounded-lg p-6 mt-2">
                        <h1 class="text-2xl font-bold text-gray-800 mb-6">Scan Me!</h1>

                        <QrcodeVue :value="JSON.stringify(qrCode)"
                            :options="{ width: 400, margin: 1, errorCorrectionLevel: 'H' }" />

                        <button class="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg"
                            @click="[isShowingCartItem = false, isPaying = false]">
                            ok
                        </button>
                    </div>

                    <div :class="isPaying ? 'hidden' : 'flex'"
                        class="flex-row justify-between items-center w-full bg-white/90 p-2 mt-auto rounded-lg text-sm">
                        <!-- Remove All Button -->
                        <button :class="isResultOfScan ? 'hidden' : ''"
                            class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            <Trash2 class="w-5 h-5" />
                            Remove All
                        </button>
                        <button :class="isResultOfScan ? '' : 'hidden'"
                            @click="[cartHelper = [], cart = [], isShowingCartItem = false, isResultOfScan = false]"
                            class="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                            Done
                        </button>

                        <!-- Pay Button -->
                        <button :class="isResultOfScan ? 'hidden' : ''"
                            @click="[viewCart(), generateQrCode(), categoryHelper(), isPaying = true]"
                            class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            <CreditCard class="w-5 h-5" />
                            Pay
                        </button>
                    </div>


                </div>
            </div>
        </section>
        <section :class="isBuying ? 'fixed' : 'hidden'"
            class="h-1/4 w-full bg-[#A0522D] text-white shadow-lg bottom-0 z-50 rounded-t-xl p-4">
            <!-- Product Name -->
            <div class="flex flex-row justify-between">
                <h2 class="text-lg font-bold mb-3">{{ producsts?.name }}</h2>
                <svg class="w-4 h-4 ml-2 transition-transform duration-300" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24" @click="isBuying = false">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
            <!-- Options -->
            <div class="w-full h-auto text-xs ">
                <div class="grid grid-cols-4 gap-1">
                    <button v-for="(price, size) in producsts?.prices" :key="size" @click="selectSize(size.toString())"
                        class="p-3 rounded-lg text-center transition" :class="[
                            selectedSize === size.toString()
                                ? 'bg-gray-200 text-black'
                                : 'bg-white hover:bg-gray-200 text-black'
                        ]">
                        {{ size }} - ₱{{ price }}
                    </button>
                </div>
            </div>

            <!-- Selected Info -->
            <div v-if="selectedSize" class="flex justify-between mt-4 text-sm text-gray-300">
                <div class="flex flex-row items-center">
                    Selected:
                    <span class="ml-1 font-semibold text-white">{{ selectedSize }}</span>
                </div>
                <div class="flex items-center space-x-3">
                    <button class="bg-red-400 px-3 py-1 rounded" @click="quantity = Math.max(0, quantity - 1)">
                        -
                    </button>
                    <span class="text-lg font-semibold">{{ quantity }}</span>
                    <button class="bg-white text-black px-3 py-1 rounded" @click="quantity++">
                        +
                    </button>
                    <div class="ml-2 py-1 px-2 bg-white rounded-lg text-black" @click="[addToCart(), isBuying = false]">
                        <ShoppingCart :size=20 />
                    </div>
                    <div class="mr-2 py-1 px-2 bg-white rounded-lg text-black"
                        @click="[addToCart(), buy(), isBuying = false]">
                        BUY
                    </div>
                </div>
            </div>
        </section>

        <!-- Header -->
        <header class="bg-white/60 backdrop-blur-md shadow-lg sticky top-0 z-49 rounded-b-xl">
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
                                    d="M19 9l-7 7-7-7">
                                </path>
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
                    <a href="#footer"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Contact</a>
                    <a href="#about-us"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">About
                        us</a>
                </div>

                <!-- Right side icons -->
                <div class="flex items-center space-x-4">
                    <!-- Shopping Cart -->
                    <button class="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        @click="[isShowingCartItem = true, viewCart(), generateQrCode(), categoryHelper()]">
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
                                d="M6 18L18 6M6 6l12 12">
                            </path>
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
                                    d="M19 9l-7 7-7-7">
                                </path>
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

                    <a href="#" @click="sideMobileNav = !sideMobileNav"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">franchise</a>
                    <a href="#footer" @click="sideMobileNav = !sideMobileNav"
                        class="text-gray-700 font-medium hover:text-amber-700 transition-colors duration-300">Contact</a>
                    <a href="#about-us" @click="sideMobileNav = !sideMobileNav"
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
                <!-- Button -->
                <div @click="startScan"
                    class="mt-8 rounded-lg bg-white text-black font-bold py-2 px-2 hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 cursor-pointer">
                    <span>📷 Scan QR</span>
                </div>

                <!-- Camera -->
                <video id="video" :class="scanning ? 'fixed' : 'hidden'"
                    class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg border border-gray-300"
                    style="width: 100%; max-width: 400px; height: auto;" autoplay></video>

                <button @click="[BrowserQRCodeReader.releaseAllStreams(), scanning = false]"
                    :class="scanning ? 'fixed' : 'hidden'"
                    class="top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 rounded-lg shadow-lg bg-red-600 p-2 border border-gray-300">Close</button>

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
                            <div class="overflow-x-hidden min-h-100 max-h-165">
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
                                                <CirclePlus :size="20" class="cursor-pointer" @click="[producsts = {
                                                    id: item.id,
                                                    name: item.name,
                                                    prices: item.prices
                                                }, isBuying = true]" />
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
        <section id="about-us" class="bg-white/30 text-gray-800 py-12 px-6 md:px-20">
            <div class="max-w-4xl mx-auto text-center space-y-6">
                <!-- Title -->
                <h2 class="text-3xl font-bold text-gray-900">About Duo Brew</h2>
                <div class="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>

                <!-- Description -->
                <p class="text-lg leading-relaxed text-gray-600">
                    Duo Brew is a proudly Filipino coffee and milk tea brand serving refreshing drinks
                    that bring people together. From rich coffee blends to creamy milk teas, frappes,
                    and fruit teas — every cup is crafted to deliver quality taste at an affordable price.
                </p>

                <!-- Mission Section -->
                <div class="bg-gray-50/50 p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-semibold mb-2 text-gray-900">Our Mission</h3>
                    <p class="text-gray-600">
                        To make quality beverages accessible to everyone, while supporting local communities
                        through sustainable and fair business practices.
                    </p>
                </div>

                <!-- Vision Section -->
                <div class="bg-gray-50/50 p-6 rounded-lg shadow-sm">
                    <h3 class="text-xl font-semibold mb-2 text-gray-900">Our Vision</h3>
                    <p class="text-gray-600">
                        To become the go-to neighborhood drink hub across the Philippines — where every sip
                        sparks connection, comfort, and joy.
                    </p>
                </div>

                <!-- Signature Line -->
                <div class="pt-8">
                    <p class="italic text-gray-500">
                        “Brewed with care, served with joy.”
                    </p>
                </div>
            </div>
        </section>
        <!-- Footer -->
        <footer id="footer" class="bg-[#A0522D] text-white">
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
