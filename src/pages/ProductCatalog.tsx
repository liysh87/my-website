import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Product {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    sales: number;
    highlights: string[];
    specifications: string[];
    faqs: string[];
    description: string;
    detailImages: string[];
}

const mockProducts: Product[] = [{
    id: 1,
    name: "智能手表 Pro Max",
    category: "电子产品",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=smart%20watch%20with%20fitness%20tracking%20features&sign=e6a5cbc3327c346dcf9f70fa0350adc1",
    sales: 1250,
    highlights: ["全天候健康监测", "14天超长续航", "50米防水"],
    specifications: ["屏幕尺寸: 1.78英寸", "电池容量: 420mAh", "材质: 铝合金表壳"],
    faqs: ["支持七天无理由退换", "提供一年质保服务", "支持无线充电"],
    description: "这款智能手表采用最新技术，支持心率、血氧、睡眠等多项健康监测功能，配备1.78英寸AMOLED触控屏，14天超长续航，让您随时掌握健康状况。",

    detailImages: [
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=smart%20watch%20with%20different%20watch%20faces&sign=934d3e58d7c7a89c3b46a5bbf58734b1",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=smart%20watch%20fitness%20tracking%20interface&sign=2d8ef83498c549db71bad9aaa3d5f1cf",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=smart%20watch%20charging%20dock&sign=e95f11319635098b41be571e58ed22f3"
    ]
}, {
    id: 2,
    name: "无线蓝牙耳机",
    category: "电子产品",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=wireless%20bluetooth%20headphones%20with%20noise%20cancellation&sign=4b34083ea187980bf1f661e85a033dc6",
    sales: 2100,
    highlights: ["主动降噪技术", "40小时续航", "触控操作"],
    specifications: ["驱动单元: 11mm", "蓝牙版本: 5.2", "防水等级: IPX4"],
    faqs: ["支持单耳使用", "支持语音助手唤醒", "支持快充功能"],
    description: "这款无线蓝牙耳机搭载先进的主动降噪技术，有效隔绝外界噪音，提供沉浸式听觉体验。40小时超长续航，让您尽情享受音乐的魅力。",

    detailImages: [
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=wireless%20earbuds%20in%20charging%20case&sign=ef147d3311a6bfbc338caa25b5681917",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=wireless%20earbuds%20noise%20cancellation%20technology&sign=9faf4d05e6728c1daf0eec85b9fec5b9",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=wireless%20earbuds%20waterproof%20feature&sign=4febc3384cb4f307d94cfe5c5adde168"
    ]
}, {
    id: 3,
    name: "便携式充电宝",
    category: "电子产品",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=portable%20power%20bank%20with%20fast%20charging&sign=a14556141e7de0e2c9c529e4ae782f0f",
    sales: 3500,
    highlights: ["20000mAh大容量", "120W超级快充", "多接口输出"],
    specifications: ["容量: 20000mAh", "输入: Type-C 65W", "输出: 双USB-A + Type-C"],
    faqs: ["支持PD/QC等快充协议", "内置多重安全保护", "赠送Type-C数据线"],
    description: "这款便携式充电宝拥有20000mAh大容量电池，支持120W超级快充，配备多接口设计，满足您多设备同时充电的需求，是出行必备的好帮手。",

    detailImages: [
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=power%20bank%20charging%20multiple%20devices&sign=7a5f113c521f5f99c0ed44ae57164d98",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=power%20bank%20fast%20charging%20technology&sign=9232acc68480cd18412b5298a73045aa",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=power%20bank%20compact%20design&sign=5275901c6ad5d25a684f52fe92ffe5cb"
    ]
}, {
    id: 4,
    name: "超薄笔记本电脑",
    category: "电子产品",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=ultra-thin%20laptop%20with%20touch%20screen&sign=bb67d48a2d5e01ebc411e727704a5995",
    sales: 850,
    highlights: ["13.3英寸全面屏", "11代酷睿处理器", "16GB大内存"],
    specifications: ["处理器: Intel i7-1165G7", "内存: 16GB LPDDR4X", "存储: 512GB NVMe SSD"],
    faqs: ["预装Windows 11系统", "支持触控操作", "提供两年质保"],
    description: "这款超薄笔记本电脑采用全金属机身设计，厚度仅14.9mm，重量轻至1.2kg，搭载11代酷睿处理器和16GB大内存，性能强劲，满足您的办公和娱乐需求。",

    detailImages: [
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=ultra-thin%20laptop%20keyboard%20and%20touchpad&sign=8fde9e1ad89a722bd2a286dd70a2a85b",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=laptop%20multitasking%20performance&sign=8864cade80e4ea390fdd055f6199e8b5",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=laptop%20portable%20design&sign=67fb1e8d21599ac2a52f1cc6027b899a"
    ]
}, {
    id: 5,
    name: "智能空气净化器",
    category: "家用电器",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=smart%20air%20purifier%20with%20HEPA%20filter&sign=4440d202d2fc20540e3c7cc6e2a575e6",
    sales: 1200,
    highlights: ["HEPA13级滤网", "智能感应控制", "静音运行"],
    specifications: ["适用面积: 40-60㎡", "CADR值: 400m³/h", "噪音: 25-55dB"],
    faqs: ["滤网更换周期约6-12个月", "支持手机APP控制", "支持除甲醛功能"],
    description: "这款智能空气净化器采用HEPA13级滤网，有效过滤PM2.5、花粉、细菌等空气中的污染物，智能感应空气质量并自动调节风速，为您创造健康舒适的生活环境。",

    detailImages: [
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=air%20purifier%20control%20panel&sign=15122d5a467adf3cfa28423af2685135",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=air%20purifier%20filter%20structure&sign=32cfa9b46870f0832a0175b0e4fc2232",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=air%20purifier%20smart%20app%20control&sign=d34926b96d7e5048e9d3ff20ab59cb7c"
    ]
}, {
    id: 6,
    name: "多功能料理机",
    category: "厨房电器",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=multifunctional%20food%20processor%20with%20blender&sign=4cf656e8e87629e61b6833297a9ce905",
    sales: 980,
    highlights: ["8种功能合一", "不锈钢刀片", "智能定时"],
    specifications: ["功率: 1200W", "容量: 2L", "材质: BPA-free塑料"],
    faqs: ["支持绞肉、榨汁、研磨等功能", "配件可 dishwasher清洗", "提供食谱手册"],
    description: "这款多功能料理机集榨汁、绞肉、研磨、搅拌等8种功能于一体，配备不锈钢刀片和智能定时功能，让您轻松制作各种美食，是厨房的好帮手。",

    detailImages: [
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=food%20processor%20various%20attachments&sign=25ff873da222e1b9d974652605a968a3",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=food%20processor%20blending%20fruits&sign=d696069fd3d7d83c47418862d154270b",
        "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=food%20processor%20easy%20cleaning&sign=8cf615092649547b7d9113d4b743bcc8"
    ]
}];

const ProductCatalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
    const [selectedCategory, setSelectedCategory] = useState<string>("全部");
    const [sortBy, setSortBy] = useState<string>("default");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [categories, setCategories] = useState<string[]>(["全部"]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    
    const [newProduct, setNewProduct] = useState({
        name: "",
        category: "",
        imageUrl: "",
        sales: 0,
        highlights: ["", "", ""],
        specifications: ["", "", ""],
        faqs: ["", "", ""],
        description: "",
        detailImages: ["", "", ""]
    });

    useEffect(() => {
        const allCategories = ["全部", ...Array.from(new Set(mockProducts.map(p => p.category)))];
        setCategories(allCategories);
    }, []);

    useEffect(() => {
        let result = [...products];

        if (selectedCategory !== "全部") {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (sortBy === "sales") {
            result = result.sort((a, b) => b.sales - a.sales);
        }

        setFilteredProducts(result);
    }, [selectedCategory, sortBy, products]);

    const openProductDetail = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeProductDetail = () => {
        setSelectedProduct(null);
    };

    const copyFaq = (faq: string) => {
        navigator.clipboard.writeText(faq);
         toast("已复制到剪贴板");
    };

    // 检查并添加新分类
    const checkAndAddCategory = (categoryName: string) => {
        if (!categoryName || categories.includes(categoryName)) {
            return categoryName;
        }
        // 创建新分类
        const updatedCategories = [...categories];
        if (!updatedCategories.includes(categoryName)) {
            updatedCategories.push(categoryName);
            setCategories(updatedCategories);
        }
        return categoryName;
    };

    // 添加商品
    const handleAddProduct = () => {
        // 验证必填字段
        if (!newProduct.name || !newProduct.category || !newProduct.imageUrl || !newProduct.description) {
            toast("请填写商品名称、分类、图片URL和描述");
            return;
        }
        
        // 检查并添加分类
        const finalCategory = checkAndAddCategory(newProduct.category);
        
        // 创建新商品
        const product: Product = {
            id: products.length + 1,
            name: newProduct.name,
            category: finalCategory,
            imageUrl: newProduct.imageUrl,
            sales: newProduct.sales || 0,
            highlights: newProduct.highlights.filter(h => h.trim() !== ""),
            specifications: newProduct.specifications.filter(s => s.trim() !== ""),
            faqs: newProduct.faqs.filter(f => f.trim() !== ""),
            description: newProduct.description,
            detailImages: newProduct.detailImages.filter(img => img.trim() !== "")
        };
        
        // 添加到商品列表
        setProducts([product, ...products]);
        
        // 重置表单
        setNewProduct({
            name: "",
            category: "",
            imageUrl: "",
            sales: 0,
            highlights: ["", "", ""],
            specifications: ["", "", ""],
            faqs: ["", "", ""],
            description: "",
            detailImages: ["", "", ""]
        });
        
        // 关闭模态框
        setShowAddProduct(false);
        toast("商品添加成功");
    };

    return (
        <div className="space-y-6">
            <div>
                <></>
                <></>
            </div>
            {}
            <div
            className="bg-white p-4 rounded-lg shadow-sm border border-[#e8d9c3] flex flex-wrap items-center justify-between gap-4 card-shadow">
            <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">商品分类:</span>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => <button
                            key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${selectedCategory === category ? "bg-[#d93025] text-white" : "bg-[#f9f2e8] hover:bg-white"}`}>
                                {category}
                         </button>)}
                        <button
                            onClick={() => setShowAddProduct(true)}
                            className="px-3 py-1 rounded-full text-sm bg-[#d93025] text-white hover:bg-[#b92a1f] transition-colors duration-200 flex items-center btn-primary">
                            <i className="fa-solid fa-plus mr-1 text-xs"></i>
                            <span>增加商品</span>
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">排序方式:</span>
                    <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="px-3 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="default">默认排序</option>
                        <option value="sales">按销量从高到低</option>
                    </select>
                </div>
            </div>
            {}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? filteredProducts.map(product => <motion.div
                    key={product.id}
                    whileHover={{
                        scale: 1.02
                    }}
                     className="bg-white rounded-lg shadow-sm border border-[#e8d9c3] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md card-shadow"
                    onClick={() => openProductDetail(product)}>
                    {}
                    <div className="h-48 overflow-hidden bg-[#f9f2e8]">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" />
                    </div>
                    {}
                    <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                        {}
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">核心卖点</div>
                            <ul className="text-sm space-y-1">
                                {product.highlights.slice(0, 3).map((highlight, index) => <li key={index} className="flex items-start">
                                    <i className="fa-solid fa-circle-check text-blue-500 mr-1 mt-1 text-xs"></i>
                                    <span>{highlight}</span>
                                </li>)}
                            </ul>
                        </div>
                        {}
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">规格参数</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                                {product.specifications[0]}
                            </div>
                        </div>
                        {}
                        <div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">常见咨询</div>
                            <div className="space-y-1">
                                {product.faqs.slice(0, 2).map((faq, index) => <div key={index} className="text-sm flex items-center">
                                    <i className="fa-solid fa-question-circle text-blue-500 mr-1 text-xs"></i>
                                    <span>{faq}</span>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </motion.div>) : <div
                 className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl text-[#e8d9c3] mb-4">
                    <i className="fa-solid fa-box-open"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">暂无商品</h3>
                <p className="text-slate-500 max-w-md">当前分类下暂无商品，请尝试其他分类或联系管理员添加商品
                                    </p>
            </div>}
        </div>
             {}
            <AnimatePresence>
                {selectedProduct && <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{
                            scale: 0.9,
                            y: 20
                        }}
                        animate={{
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            scale: 0.9,
                            y: 20
                        }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-[#e8d9c3]">
                        {}
                         <div
                            className="flex items-center justify-between p-4 border-b border-[#e8d9c3]">
                            <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                            <button
                                onClick={closeProductDetail}
                                className="p-2 rounded-full text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        {}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {}
                                <div>
                                 <div className="bg-[#f9f2e8] rounded-lg p-4 mb-4">
                                    <img
                                        src={selectedProduct.imageUrl}
                                            alt={selectedProduct.name}
                                            className="w-full h-auto max-h-80 object-contain" />
                                    </div>
                                    {}
                                     {selectedProduct.detailImages.length > 0 && <div className="grid grid-cols-3 gap-2">
                                        {selectedProduct.detailImages.map((img, index) => <div
                                            key={index}
                                            className="bg-[#f9f2e8] rounded-lg p-2 cursor-pointer hover:opacity-80 transition-opacity duration-200">
                                            <img
                                                src={img}
                                                alt={`详情图片 ${index + 1}`}
                                                className="w-full h-20 object-cover rounded" />
                                        </div>)}
                                    </div>}
                                    {}
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center">
                                            <span className="text-sm text-slate-500 dark:text-slate-400 w-20">商品分类:</span>
                                            <span className="text-sm">{selectedProduct.category}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm text-slate-500 dark:text-slate-400 w-20">销量:</span>
                                            <span className="text-sm">{selectedProduct.sales}件</span>
                                        </div>
                                    </div>
                                </div>
                                {}
                                <div>
                                    {}
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-2">商品描述</h4>
                                        <p className="text-slate-600 dark:text-slate-400">{selectedProduct.description}</p>
                                    </div>
                                    {}
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-2">核心卖点</h4>
                                        <ul className="space-y-2">
                                            {selectedProduct.highlights.map((highlight, index) => <li key={index} className="flex items-start">
                                                <i className="fa-solid fa-circle-check text-blue-500 mr-2 mt-1"></i>
                                                <span>{highlight}</span>
                                            </li>)}
                                        </ul>
                                    </div>
                                    {}
                                    <div className="mb-6">
                                        <h4 className="font-semibold mb-2">规格参数</h4>
                                        <ul className="space-y-2">
                                            {selectedProduct.specifications.map((spec, index) => <li key={index} className="flex items-start">
                                                <i className="fa-solid fa-tag text-blue-500 mr-2 mt-1"></i>
                                                <span>{spec}</span>
                                            </li>)}
                                        </ul>
                                    </div>
                                    {}
                                    <div>
                                        <h4 className="font-semibold mb-2">常见咨询点</h4>
                                        <ul className="space-y-2">
                                            {selectedProduct.faqs.map(
                                                (faq, index) => <li key={index} className="flex items-start justify-between">
                                                    <div className="flex items-start flex-1">
                                                        <i className="fa-solid fa-question-circle text-blue-500 mr-2 mt-1"></i>
                                                        <span>{faq}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => copyFaq(faq)}
                                                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 transition-colors duration-200">
                                                        <i className="fa-solid fa-copy"></i>
                                                    </button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {}
                        <div
                            className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                            <button
                                onClick={closeProductDetail}
                                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg transition-colors duration-200">关闭
                                                </button>
                        </div>
                    </motion.div>
                 </motion.div>}
            </AnimatePresence>
            
            {/* 添加商品模态框 */}
            <AnimatePresence>
                {showAddProduct && <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{
                            scale: 0.9,
                            y: 20
                        }}
                        animate={{
                            scale: 1,
                            y: 0
                        }}
                        exit={{
                            scale: 0.9,
                            y: 20
                        }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-[#e8d9c3]">
                        <div
                            className="flex items-center justify-between p-4 border-b border-[#e8d9c3]">
                            <h3 className="text-xl font-bold">增加商品</h3>
                            <button
                                onClick={() => setShowAddProduct(false)}
                                className="p-2 rounded-full text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                {/* 商品基本信息 */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">商品名称 <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="请输入商品名称"
                                        value={newProduct.name}
                                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                                        className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">商品分类 <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="请输入商品分类（如果不存在会自动创建）"
                                        value={newProduct.category}
                                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                                        className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">主图URL <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        placeholder="请输入商品主图URL"
                                        value={newProduct.imageUrl}
                                        onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})}
                                        className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">销量</label>
                                    <input
                                        type="number"
                                        min="0"
                                        placeholder="请输入商品销量"
                                        value={newProduct.sales}
                                        onChange={e => setNewProduct({...newProduct, sales: parseInt(e.target.value) || 0})}
                                        className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium mb-1">商品描述 <span className="text-red-500">*</span></label>
                                    <textarea
                                        placeholder="请输入商品描述"
                                        value={newProduct.description}
                                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                                        rows={3}
                                        className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                </div>
                                
                                {/* 核心卖点 */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">核心卖点</label>
                                    {newProduct.highlights.map((highlight, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`卖点 ${index + 1}`}
                                            value={highlight}
                                            onChange={e => {
                                                const newHighlights = [...newProduct.highlights];
                                                newHighlights[index] = e.target.value;
                                                setNewProduct({...newProduct, highlights: newHighlights});
                                            }}
                                            className="w-full p-2 mb-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                    ))}
                                </div>
                                
                                {/* 规格参数 */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">规格参数</label>
                                    {newProduct.specifications.map((spec, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`参数 ${index + 1}（例如：屏幕尺寸: 1.78英寸）`}
                                            value={spec}
                                            onChange={e => {
                                                const newSpecs = [...newProduct.specifications];
                                                newSpecs[index] = e.target.value;
                                                setNewProduct({...newProduct, specifications: newSpecs});
                                            }}
                                            className="w-full p-2 mb-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                    ))}
                                </div>
                                
                                {/* 常见咨询 */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">常见咨询</label>
                                    {newProduct.faqs.map((faq, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`常见问题 ${index + 1}（例如：支持七天无理由退换）`}
                                            value={faq}
                                            onChange={e => {
                                                const newFaqs = [...newProduct.faqs];
                                                newFaqs[index] = e.target.value;
                                                setNewProduct({...newProduct, faqs: newFaqs});
                                            }}
                                            className="w-full p-2 mb-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                    ))}
                                </div>
                                
                                {/* 详情图片 */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">详情图片URL（选填）</label>
                                    {newProduct.detailImages.map((img, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            placeholder={`详情图片 ${index + 1} URL`}
                                            value={img}
                                            onChange={e => {
                                                const newImages = [...newProduct.detailImages];
                                                newImages[index] = e.target.value;
                                                setNewProduct({...newProduct, detailImages: newImages});
                                            }}
                                            className="w-full p-2 mb-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className="p-4 border-t border-[#e8d9c3] flex justify-end space-x-3">
                            <button
                                onClick={() => setShowAddProduct(false)}
                                className="px-4 py-2 bg-[#f9f2e8] hover:bg-white text-[#d93025] rounded-lg transition-colors duration-200">取消
                            </button>
                            <button
                                onClick={handleAddProduct}
                                className="px-4 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 btn-primary">添加商品
                            </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
     );
};

export default ProductCatalog;