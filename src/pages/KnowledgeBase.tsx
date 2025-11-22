import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface KnowledgeItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    usageCount: number;
    isFavorite: boolean;
}

interface Category {
    id: string;
    name: string;
    count: number;
}

const mockKnowledgeItems: KnowledgeItem[] = [{
    id: "1",
    question: "请问商品支持七天无理由退换货吗？",
    answer: "亲，我们的商品支持七天无理由退换货，但请确保商品及包装完好，不影响二次销售。如有质量问题，我们将承担来回运费。",
    category: "商品咨询",
    usageCount: 125,
    isFavorite: true
}, {
    id: "2",
    question: "什么时候可以发货？",
    answer: "您好，我们会在您下单后48小时内安排发货。如有特殊情况导致延迟，我们会第一时间与您联系。",
    category: "物流问题",
    usageCount: 230,
    isFavorite: false
}, {
    id: "3",
    question: "收到的商品有质量问题，怎么办？",
    answer: "非常抱歉给您带来不好的体验。请您提供商品问题的照片，我们会尽快为您安排退换货或提供相应的补偿方案。",
    category: "售后纠纷",
    usageCount: 95,
    isFavorite: false
}, {
    id: "4",
    question: "有没有优惠券可以使用？",
    answer: "您好，目前我们店铺有满200减20的优惠券活动，您可以在店铺首页领取。另外，新用户还可以额外获得一张5元无门槛优惠券哦！",
    category: "优惠活动",
    usageCount: 156,
    isFavorite: true
}, {
    id: "5",
    question: "商品的保修期是多久？",
    answer: "我们的商品提供一年质保服务，从您收到商品之日起计算。在保修期内，非人为损坏的质量问题，我们将为您免费维修或更换。",
    category: "商品咨询",
    usageCount: 89,
    isFavorite: false
}, {
    id: "6",
    question: "包裹什么时候能到？",
    answer: "您好，您的订单已经发出，预计1-3天内送达。物流信息可以在订单详情页查看，或者您也可以提供订单号，我为您查询具体的物流状态。",
    category: "物流问题",
    usageCount: 187,
    isFavorite: true
}, {
    id: "7",
    question: "想申请退款，应该怎么操作？",
    answer: "请您登录账户，找到订单详情页，点击申请退款按钮，按照提示填写相关信息即可。我们会在收到申请后24小时内处理。",
    category: "售后纠纷",
    usageCount: 143,
    isFavorite: false
}, {
    id: "8",
    question: "店铺最近有什么促销活动吗？",
    answer: "您好，我们店铺正在进行年中大促活动，全场商品低至5折，还有满300减50的优惠券可以领取。活动截止到本周末，欢迎选购！",
    category: "优惠活动",
    usageCount: 112,
    isFavorite: false
}, {
    id: "9",
    question: "商品和描述的一样吗？",
    answer: "请您放心，我们的商品均如实描述，图片均为实物拍摄。如有任何不符，您可以申请退换货，我们会承担来回运费。",
    category: "商品咨询",
    usageCount: 76,
    isFavorite: false
}, {
    id: "10",
    question: "可以更换收货地址吗？",
    answer: "如果您的订单还未发货，您可以联系我们为您修改收货地址。如果订单已经发货，则无法修改地址，建议您可以联系物流公司尝试更改。",
    category: "物流问题",
    usageCount: 65,
    isFavorite: false
}];

const mockCategories: Category[] = [{
    id: "all",
    name: "全部",
    count: mockKnowledgeItems.length
}, {
    id: "商品咨询",
    name: "商品咨询",
    count: mockKnowledgeItems.filter(item => item.category === "商品咨询").length
}, {
    id: "物流问题",
    name: "物流问题",
    count: mockKnowledgeItems.filter(item => item.category === "物流问题").length
}, {
    id: "售后纠纷",
    name: "售后纠纷",
    count: mockKnowledgeItems.filter(item => item.category === "售后纠纷").length
}, {
    id: "优惠活动",
    name: "优惠活动",
    count: mockKnowledgeItems.filter(item => item.category === "优惠活动").length
}];

const KnowledgeBase: React.FC = () => {
    const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(mockKnowledgeItems);
    const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>(mockKnowledgeItems);
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("usageCount");
    const [showAddItem, setShowAddItem] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const [newItem, setNewItem] = useState({
        question: "",
        answer: "",
        category: ""
    });

    const [newCategoryName, setNewCategoryName] = useState<string>("");

    useEffect(() => {
        let result = [...knowledgeItems];

        if (selectedCategory !== "all") {
            result = result.filter(item => item.category === selectedCategory);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();

            result = result.filter(
                item => item.question.toLowerCase().includes(term) || item.answer.toLowerCase().includes(term)
            );
        }

        if (sortBy === "usageCount") {
            result = result.sort((a, b) => b.usageCount - a.usageCount);
        }

        setFilteredItems(result);
    }, [selectedCategory, searchTerm, sortBy, knowledgeItems]);

    const copyAnswer = (answer: string, itemId: string) => {
        navigator.clipboard.writeText(answer);
        toast("话术已复制到剪贴板");

        setKnowledgeItems(prevItems => prevItems.map(item => item.id === itemId ? {
            ...item,
            usageCount: item.usageCount + 1
        } : item));
    };

    const toggleFavorite = (itemId: string, e: React.MouseEvent) => {
        e.stopPropagation();

        setKnowledgeItems(prevItems => prevItems.map(item => item.id === itemId ? {
            ...item,
            isFavorite: !item.isFavorite
        } : item));

        toast(
            knowledgeItems.find(item => item.id === itemId)?.isFavorite ? "已取消收藏" : "已添加到收藏"
        );
    };

    const handleAddItem = () => {
        if (!newItem.question || !newItem.answer || !newItem.category) {
            toast("请填写完整的问题、回答和分类");
            return;
        }

        const newKnowledgeItem: KnowledgeItem = {
            id: `item_${Date.now()}`,
            question: newItem.question,
            answer: newItem.answer,
            category: newItem.category,
            usageCount: 0,
            isFavorite: false
        };

        setKnowledgeItems([newKnowledgeItem, ...knowledgeItems]);

        setCategories(
            prevCategories => prevCategories.map(cat => cat.name === newItem.category ? {
                ...cat,
                count: cat.count + 1
            } : cat === prevCategories[0] ? {
                ...cat,
                count: cat.count + 1
            } : cat)
        );

        setShowAddItem(false);

        setNewItem({
            question: "",
            answer: "",
            category: ""
        });

        toast("话术添加成功");
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) {
            toast("请输入分类名称");
            return;
        }

        if (categories.some(cat => cat.name === newCategoryName.trim())) {
            toast("该分类已存在");
            return;
        }

        const newCategory: Category = {
            id: `category_${Date.now()}`,
            name: newCategoryName.trim(),
            count: 0
        };

        setCategories([...categories.slice(0, 1), newCategory, ...categories.slice(1)]);
        setShowAddCategory(false);
        setNewCategoryName("");
        toast("分类添加成功");
    };

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <></>
                        <></>
                    </div>
                    <button
                        onClick={() => setShowAddItem(true)}
                        className="px-4 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 flex items-center btn-primary">
                        <i className="fa-solid fa-plus mr-2"></i>
                        <span>新增话术</span>
                    </button>
                </div>
            </div>
            {}
            <div
                className="bg-white p-4 rounded-lg shadow-sm border border-[#e8d9c3] card-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="搜索问题关键词..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <i
                            className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                    {}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {categories.map(
                                category => <option key={category.id} value={category.id === "all" ? "all" : category.name}>
                                    {category.name}({category.count})
                                                    </option>
                            )}
                        </select>
                        <i
                            className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                        <i
                            className="fa-solid fa-tags absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                        <button
                            onClick={() => setShowAddCategory(true)}
                            className="absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors duration-200"
                            title="添加分类">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    {}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="usageCount">按使用频率排序</option>
                            <option value="question">按问题名称排序</option>
                        </select>
                        <i
                            className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                        <i
                            className="fa-solid fa-sort absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                    </div>
                </div>
            </div>
            {}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors duration-200",
                        selectedCategory === "all" ? "bg-[#d93025] text-white" : "bg-[#f9f2e8] hover:bg-white"
                    )}>全部
                            </button>
                {categories.slice(1).map(category => <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={cn(
                        "px-3 py-1 rounded-full text-sm transition-colors duration-200",
                        selectedCategory === category.name ? "bg-[#d93025] text-white" : "bg-[#f9f2e8] hover:bg-white"
                    )}>
                    {category.name}({category.count})
                              </button>)}
            </div>
            {}
            <div
                className="bg-white rounded-lg shadow-sm border border-[#e8d9c3] overflow-hidden card-shadow">
                {filteredItems.length > 0 ? <div className="divide-y divide-[#e8d9c3]">
                    {filteredItems.map(item => <motion.div
                        key={item.id}
                        whileHover={{
                            backgroundColor: "rgba(241, 245, 249, 0.7)"
                        }}
                        className="p-4 transition-colors duration-200">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-0.5">
                                    <i className="fa-solid fa-circle-question"></i>
                                </span>
                                <h3 className="font-medium">{item.question}</h3>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={e => toggleFavorite(item.id, e)}
                                    className={`p-1.5 rounded-full transition-colors duration-200 ${item.isFavorite ? "text-yellow-600 bg-yellow-50" : "text-slate-400 hover:text-yellow-600 hover:bg-yellow-50"}`}
                                    title={item.isFavorite ? "取消收藏" : "添加收藏"}>
                                    <i className={`fa-solid ${item.isFavorite ? "fa-star" : "fa-star-o"}`}></i>
                                </button>
                                <div
                                    className="text-xs text-slate-500 bg-[#f9f2e8] px-2 py-0.5 rounded-full">
                                    <i className="fa-solid fa-eye mr-1"></i>
                                    {item.usageCount}
                                </div>
                            </div>
                        </div>
                        <div className="pl-7 mb-3">
                            <div className="flex items-start space-x-2 text-slate-600 dark:text-slate-400">
                                <span className="text-green-500 mt-0.5">
                                    <i className="fa-solid fa-circle-check"></i>
                                </span>
                                <p className="text-sm">{item.answer}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <span
                                className="text-xs px-2 py-0.5 rounded-full bg-[#f9f2e8]">
                                {item.category}
                            </span>
                            <button
                                onClick={() => copyAnswer(item.answer, item.id)}
                                className="px-3 py-1 text-sm text-[#d93025] hover:bg-[#f9f2e8] rounded-lg transition-colors duration-200 flex items-center">
                                <i className="fa-solid fa-copy mr-1"></i>
                                <span>复制回复</span>
                            </button>
                        </div>
                    </motion.div>)}
                </div> : <div className="p-8 text-center">
                    <div className="text-6xl text-slate-300 dark:text-slate-600 mb-4">
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">暂无话术</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">当前分类下暂无话术，请尝试其他分类或添加新的话术
                                    </p>
                </div>}
            </div>
            {}
            <AnimatePresence>
                {showAddItem && <motion.div
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
                        transition={{
                            duration: 0.3
                        }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-[#e8d9c3]">
                        {}
                        <div
                            className="flex items-center justify-between p-4 border-b border-[#e8d9c3]">
                            <h3 className="text-xl font-bold">新增话术</h3>
                            <button
                                onClick={() => setShowAddItem(false)}
                                className="p-2 rounded-full text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        {}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">客户问题</label>
                                    <textarea
                                        value={newItem.question}
                                        onChange={e => setNewItem({
                                            ...newItem,
                                            question: e.target.value
                                        })}
                                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={2}
                                        placeholder="请输入客户可能提出的问题"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">客服回复</label>
                                    <textarea
                                        value={newItem.answer}
                                        onChange={e => setNewItem({
                                            ...newItem,
                                            answer: e.target.value
                                        })}
                                        className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={4}
                                        placeholder="请输入标准回复话术"></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">分类</label>
                                    <div className="relative">
                                        <select
                                            value={newItem.category}
                                            onChange={e => setNewItem({
                                                ...newItem,
                                                category: e.target.value
                                            })}
                                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option value="">请选择分类</option>
                                            {categories.slice(1).map(category => <option key={category.id} value={category.name}>
                                                {category.name}
                                            </option>)}
                                        </select>
                                        <i
                                            className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {}
                        <div
                            className="p-4 border-t border-[#e8d9c3] flex justify-end space-x-3">
                            <button
                                onClick={() => setShowAddItem(false)}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg transition-colors duration-200">取消
                                                </button>
                            <button
                                onClick={handleAddItem}
                                className="px-4 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 btn-primary">添加话术
                                                </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
            {}
            <AnimatePresence>
                {showAddCategory && <motion.div
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
                        transition={{
                            duration: 0.3
                        }}
                        className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col border-2 border-[#e8d9c3]">
                        {}
                        <div
                            className="flex items-center justify-between p-4 border-b border-[#e8d9c3]">
                            <h3 className="text-xl font-bold">添加分类</h3>
                            <button
                                onClick={() => setShowAddCategory(false)}
                                className="p-2 rounded-full text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        {}
                        <div className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">分类名称</label>
                                <input
                                    type="text"
                                    placeholder="请输入分类名称"
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        {}
                        <div
                            className="p-4 border-t border-[#e8d9c3] flex justify-end space-x-3">
                            <button
                                onClick={() => setShowAddCategory(false)}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg transition-colors duration-200">取消
                                                </button>
                            <button
                                onClick={handleAddCategory}
                                className="px-4 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 btn-primary">添加
                                                </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default KnowledgeBase;