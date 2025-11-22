import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SOP {
    id: string;
    title: string;
    category: string;
    steps: {
        title: string;
        content: string;
        scripts: {
            content: string;
            purpose: string;
        }[];
    }[];
}

interface Category {
    id: string;
    name: string;
}

const mockSOPs: SOP[] = [{
    id: "1",
    title: "客户咨询商品",
    category: "咨询",

    steps: [{
        title: "热情问候",
        content: "主动向客户问好，表达乐于为其服务的态度",

        scripts: [{
            content: "您好！欢迎光临仟味神厨，很高兴为您服务！请问有什么可以帮助您的吗？",
            purpose: "标准问候语"
        }]
    }, {
        title: "了解需求",
        content: "询问客户具体想了解的商品信息或需求",

        scripts: [{
            content: "请问您对哪款商品感兴趣呢？或者您有什么具体的需求，我可以为您推荐合适的产品。",
            purpose: "了解客户需求"
        }]
    }, {
        title: "提供信息",
        content: "根据客户需求，提供详细的商品信息，包括特点、优势等",

        scripts: [{
            content: "这款商品的主要特点是XXX，它采用了XXX技术，相比同类产品具有XXX优势。非常适合您的需求。",
            purpose: "介绍商品特点"
        }, {
            content: "关于您提到的XXX问题，我们的商品是这样的：XXX。您看是否符合您的期望？",
            purpose: "解答具体问题"
        }]
    }, {
        title: "促成交易",
        content: "在客户了解足够信息后，适当引导客户下单",

        scripts: [{
            content: "目前这款商品正在促销中，现在下单还可以享受XXX优惠，非常划算呢！",
            purpose: "促销引导"
        }]
    }, {
        title: "结束服务",
        content: "确认客户无其他问题后，礼貌结束对话",

        scripts: [{
            content: "感谢您的咨询，如果还有其他问题，随时欢迎再来询问哦！祝您购物愉快！",
            purpose: "结束语"
        }]
    }]
}, {
    id: "2",
    title: "客户投诉售后",
    category: "投诉",

    steps: [{
        title: "安抚情绪",
        content: "首先安抚客户情绪，表达理解和歉意",

        scripts: [{
            content: "非常抱歉给您带来不好的体验，我们一定会尽力解决您的问题，请您消消气。",
            purpose: "安抚客户情绪"
        }]
    }, {
        title: "了解情况",
        content: "详细询问客户遇到的问题，了解具体情况",

        scripts: [{
            content: "为了更好地帮您解决问题，能请您详细描述一下具体的情况吗？比如是什么时候购买的，遇到了什么问题？",
            purpose: "了解问题详情"
        }]
    }, {
        title: "提供解决方案",
        content: "根据公司政策和客户情况，提供合理的解决方案",

        scripts: [{
            content: "针对您遇到的问题，我们可以为您提供以下解决方案：XXX。您看这样处理可以吗？",
            purpose: "提出解决方案"
        }, {
            content: "如果您对我们的解决方案不满意，我们也可以为您申请上级处理，请您稍等片刻。",
            purpose: "备选方案"
        }]
    }, {
        title: "确认解决",
        content: "确认客户问题是否得到解决，记录相关信息",

        scripts: [{
            content: "请问这个解决方案您满意吗？还有其他需要帮助的地方吗？",
            purpose: "确认解决方案"
        }]
    }, {
        title: "总结反馈",
        content: "感谢客户反馈，表达改进的决心",

        scripts: [{
            content: "非常感谢您的反馈，我们会认真反思并不断改进我们的服务，希望下次能为您提供更好的购物体验。",
            purpose: "感谢反馈"
        }]
    }]
}, {
    id: "3",
    title: "客户催发货",
    category: "物流",

    steps: [{
        title: "表达理解",
        content: "理解客户等待的心情，表达歉意",

        scripts: [{
            content: "非常理解您着急收到商品的心情，让您久等了，实在抱歉。",
            purpose: "表达理解"
        }]
    }, {
        title: "查询状态",
        content: "查询订单发货状态，了解具体情况",

        scripts: [{
            content: "我马上为您查询订单的发货状态，请稍等片刻。",
            purpose: "查询订单"
        }]
    }, {
        title: "提供信息",
        content: "根据查询结果，向客户提供准确的发货信息",

        scripts: [{
            content: "您好，经过查询，您的订单已经安排发货，物流公司是XXX，运单号是XXX，预计1-3天内送达。",
            purpose: "提供发货信息"
        }, {
            content: "非常抱歉，您的订单由于XXX原因暂时未能发货，我们正在加急处理，预计今天内可以发出，请您再耐心等待一下。",
            purpose: "解释延迟原因"
        }]
    }, {
        title: "提供帮助",
        content: "提供额外帮助，如优先处理或提供补偿",

        scripts: [{
            content: "我们已经为您的订单标记为优先处理，并为您申请了XXX补偿，希望能弥补给您带来的不便。",
            purpose: "提供补偿"
        }]
    }, {
        title: "结束服务",
        content: "确认客户无其他问题后，礼貌结束对话",

        scripts: [{
            content: "如果您还有其他问题，随时欢迎再来询问。感谢您的理解与支持！",
            purpose: "结束语"
        }]
    }]
}, {
    id: "4",
    title: "客户退换货",
    category: "售后",

    steps: [{
        title: "了解原因",
        content: "询问客户退换货的原因，了解具体情况",

        scripts: [{
            content: "请问您为什么想要退换货呢？是商品有质量问题，还是不喜欢了呢？",
            purpose: "了解退换货原因"
        }]
    }, {
        title: "解释政策",
        content: "根据公司政策，向客户解释退换货流程和要求",

        scripts: [{
            content: "我们的商品支持七天无理由退换货，但需要确保商品及包装完好，不影响二次销售。请问您的商品符合这个条件吗？",
            purpose: "解释退换货政策"
        }]
    }, {
        title: "引导流程",
        content: "引导客户按照正确的流程申请退换货",

        scripts: [{
            content: "请您登录您的账户，找到订单详情页，点击申请退换货按钮，按照提示填写相关信息即可。我们会尽快为您处理。",
            purpose: "引导申请流程"
        }]
    }, {
        title: "提供帮助",
        content: "提供额外帮助，如指导填写申请或查询进度",

        scripts: [{
            content: "如果您在申请过程中遇到任何问题，可以随时联系我们，我们会为您提供帮助。",
            purpose: "提供后续帮助"
        }]
    }, {
        title: "结束服务",
        content: "确认客户了解流程后，礼貌结束对话",

        scripts: [{
            content: "感谢您的咨询，希望我们的服务能让您满意。祝您生活愉快！",
            purpose: "结束语"
        }]
    }]
}];

const mockCategories: Category[] = [{
    id: "all",
    name: "全部"
}, {
    id: "咨询",
    name: "客户咨询"
}, {
    id: "投诉",
    name: "客户投诉"
}, {
    id: "物流",
    name: "物流相关"
}, {
    id: "售后",
    name: "售后服务"
}];

const ServiceSOP: React.FC = () => {
    const [sops, setSops] = useState<SOP[]>(mockSOPs);
    
    // 删除SOP函数
    const handleDeleteSop = (sopId: string) => {
        setSops(prevSops => prevSops.filter(sop => sop.id !== sopId));
        toast("SOP删除成功");
    };
    const [filteredSops, setFilteredSops] = useState<SOP[]>(mockSOPs);
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedSop, setSelectedSop] = useState<SOP | null>(null);
    const [showAddSop, setShowAddSop] = useState(false);

    const [newSop, setNewSop] = useState({
        title: "",
        category: "",

        steps: [{
            title: "",
            content: "",

            scripts: [{
                content: "",
                purpose: ""
            }]
        }]
    });

    const [enableNewCategory, setEnableNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        let result = [...sops];

        if (selectedCategory !== "all") {
            result = result.filter(sop => sop.category === selectedCategory);
        }

        if (searchTerm) {
            const term = searchTerm.toLowerCase();

            result = result.filter(
                sop => sop.title.toLowerCase().includes(term) || sop.category.toLowerCase().includes(term) || sop.steps.some(
                    step => step.title.toLowerCase().includes(term) || step.content.toLowerCase().includes(term) || step.scripts.some(
                        script => script.content.toLowerCase().includes(term) || script.purpose.toLowerCase().includes(term)
                    )
                )
            );
        }

        setFilteredSops(result);
    }, [selectedCategory, searchTerm, sops]);

    const openSopDetail = (sop: SOP) => {
        setSelectedSop(sop);
    };

    const closeSopDetail = () => {
        setSelectedSop(null);
    };

    const copyScript = (script: string) => {
        navigator.clipboard.writeText(script);
        toast("话术已复制到剪贴板");
    };

    const handleDeleteCategory = (categoryName: string) => {
        if (categoryName === "全部") {
            toast("不能删除'全部'分类");
            return;
        }

        const hasSopsInCategory = sops.some(sop => sop.category === categoryName);

        if (hasSopsInCategory) {
            const confirmDelete = window.confirm("该分类下有SOP内容，删除分类会将相关SOP移至未分类，确定要删除吗？");

            if (!confirmDelete)
                return;

            setSops(prevSops => prevSops.map(sop => sop.category === categoryName ? {
                ...sop,
                category: "未分类"
            } : sop));
        }

        setCategories(prevCategories => prevCategories.filter(cat => cat.name !== categoryName));

        if (selectedCategory === categoryName) {
            setSelectedCategory("all");
        }

        toast("分类删除成功");
    };

    const addOrUpdateCategoryIfNeeded = (categoryName: string): boolean => {
        if (!categoryName.trim()) {
            toast("请输入分类名称");
            return false;
        }

        const existingCategory = categories.find(cat => cat.name === categoryName.trim());

        if (!existingCategory) {
            const newCategory: Category = {
                id: `category_${Date.now()}`,
                name: categoryName.trim()
            };

            setCategories(prevCategories => [...prevCategories, newCategory]);
            return true;
        }

        return true;
    };

    return (
        <div className="space-y-6">
            <div>
                <></>
                <></>
            </div>
            {}
            <div
                className="bg-white p-4 rounded-lg shadow-sm border border-[#e8d9c3] card-shadow">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="搜索SOP关键词..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                    <i
                        className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
            </div>
            {}
            <div className="flex flex-col md:flex-row gap-6">
                {}
                <div
                    className="w-full md:w-64 bg-white rounded-lg shadow-sm border border-[#e8d9c3] p-4 md:h-[calc(100vh-220px)] md:sticky md:top-6 card-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">服务场景分类</h3>
                        <button
                            onClick={() => setShowAddSop(true)}
                            className="p-1 text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200 rounded-full"
                            title="添加SOP或分类">
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <div className="space-y-2">
                        {categories.map(category => <div key={category.id} className="relative">
                            <button
                                onClick={() => setSelectedCategory(category.id === "all" ? "all" : category.name)}
                                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-between ${selectedCategory === "all" && category.id === "all" || selectedCategory !== "all" && category.name === selectedCategory ? "bg-[#f9f2e8] text-[#d93025]" : "hover:bg-[#f9f2e8]/50"}`}>
                                <span>{category.name}</span>
                                {category.id !== "all" && <span className="bg-[#f9f2e8] text-xs px-1.5 py-0.5 rounded-full">
                                    {sops.filter(sop => sop.category === category.name).length}
                                </span>}
                            </button>
                            {category.id !== "all" && <button
                                onClick={e => {
                                    e.stopPropagation();
                                    handleDeleteCategory(category.name);
                                }}
                                className="absolute right-8 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-[#d93025] transition-colors duration-200"
                                title="删除分类">
                                <i className="fa-solid fa-trash-alt text-xs"></i>
                            </button>}
                        </div>)}
                    </div>
                </div>
                {}
                <div className="mb-4">
                    <></>
                </div>
                <div className="flex-1">
                    {filteredSops.length > 0 ? <div className="space-y-4">
                        {filteredSops.map(sop => <motion.div
                            key={sop.id}
                            whileHover={{
                                scale: 1.01
                            }}
                            className="bg-white rounded-lg shadow-sm border border-[#e8d9c3] overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md card-shadow"
                            onClick={() => openSopDetail(sop)}>
                            <div
                                className="p-4 border-b border-[#e8d9c3] flex items-center justify-between relative">
                                <h3 className="font-semibold">{sop.title}</h3>
                                <div className="flex items-center">
                                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#f9f2e8] mr-2">
                                        {sop.category}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (window.confirm(`确定要删除SOP "${sop.title}"吗？此操作不可撤销。`)) {
                                                handleDeleteSop(sop.id);
                                            }
                                        }}
                                        className="text-slate-400 hover:text-[#d93025] transition-colors duration-200 p-1"
                                        title="删除SOP">
                                        <i className="fa-solid fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center text-sm text-slate-500 mb-2">
                                    <i className="fa-solid fa-list-check mr-1"></i>
                                    <span>{sop.steps.length}个步骤</span>
                                </div>
                                <div className="text-sm text-slate-600 line-clamp-2">
                                    {sop.steps[0].content}
                                </div>
                            </div>
                        </motion.div>)}
                    </div> : <div
                        className="bg-white rounded-lg shadow-sm border border-[#e8d9c3] p-8 text-center card-shadow">
                        <div className="text-6xl text-[#e8d9c3] mb-4">
                            <i className="fa-solid fa-file-lines"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">暂无SOP</h3>
                        <p className="text-slate-500 max-w-md mx-auto">当前分类下暂无SOP文档，请尝试其他分类或联系管理员添加
                                                                      </p>
                    </div>}
                </div>
            </div>
            {}
            <AnimatePresence>
                {selectedSop && <motion.div
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
                        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-[#e8d9c3]">
                        {}
                        <div
                            className="flex items-center justify-between p-4 border-b border-[#e8d9c3]">
                            <h3 className="text-xl font-bold">{selectedSop.title}</h3>
                            <button
                                onClick={closeSopDetail}
                                className="p-2 rounded-full text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        {}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="mb-6">
                                <span className="px-3 py-1 text-sm rounded-full bg-[#f9f2e8] text-[#d93025]">
                                    {selectedSop.category}
                                </span>
                            </div>
                            <div className="space-y-8">
                                {selectedSop.steps.map((step, index) => <div key={index} className="relative">
                                    {}
                                    {index < selectedSop.steps.length - 1 && <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-[#e8d9c3] z-0"></div>}
                                    {}
                                    <div className="ml-12 relative z-10">
                                        <div
                                            className="absolute -left-14 top-0 flex items-center justify-center w-10 h-10 rounded-full bg-[#d93025] text-white font-semibold">
                                            {index + 1}
                                        </div>
                                        <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                                        <div className="mb-4">
                                            <p className="text-slate-600">{step.content}</p>
                                        </div>
                                        {}
                                        {step.scripts.length > 0 && <div className="space-y-3">
                                            <div className="text-sm font-medium text-slate-500">标准话术：</div>
                                            {step.scripts.map((script, scriptIndex) => <div
                                                key={scriptIndex}
                                                className="bg-[#f9f2e8] rounded-lg p-3 border-l-4 border-[#d93025] relative">
                                                <div className="text-sm text-slate-500 mb-1">【{script.purpose}】
                                                                                                                                         </div>
                                                <p className="mb-2">{script.content}</p>
                                                <button
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        copyScript(script.content);
                                                    }}
                                                    className="text-xs text-[#d93025] hover:text-[#b92a1f] flex items-center">
                                                    <i className="fa-solid fa-copy mr-1"></i>
                                                    <span>复制话术</span>
                                                </button>
                                            </div>)}
                                        </div>}
                                    </div>
                                </div>)}
                            </div>
                        </div>
                        {}
                        <div className="p-4 border-t border-[#e8d9c3] flex justify-end">
                            <button
                                onClick={closeSopDetail}
                                className="px-4 py-2 bg-[#f9f2e8] hover:bg-white text-[#d93025] rounded-lg transition-colors duration-200">关闭
                                                                                </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
            {}
            <AnimatePresence>
                {showAddSop && <motion.div
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
                            <h3 className="text-xl font-bold">添加新SOP</h3>
                            <button
                                onClick={() => {
                                    setShowAddSop(false);
                                    setEnableNewCategory(false);
                                    setNewCategoryName("");
                                }}
                                className="p-2 rounded-full text-[#d93025] hover:bg-[#f9f2e8] transition-colors duration-200">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                {}
                                <div>
                                    <label className="block text-sm font-medium mb-1">SOP标题</label>
                                    <input
                                        type="text"
                                        placeholder="请输入SOP标题"
                                        value={newSop.title}
                                        onChange={e => setNewSop({
                                            ...newSop,
                                            title: e.target.value
                                        })}
                                        className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                </div>
                                {}
                                <div>
                                    <label className="block text-sm font-medium mb-1">选择分类</label>
                                    {!enableNewCategory ? <div className="relative">
                                        <select
                                            value={newSop.category}
                                            onChange={e => setNewSop({
                                                ...newSop,
                                                category: e.target.value
                                            })}
                                            className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#d93025]">
                                            <option value="">请选择分类</option>
                                            {categories.filter(cat => cat.id !== "all").map(
                                                category => <option key={category.id} value={category.name}>{category.name}</option>
                                            )}
                                        </select>
                                        <i
                                            className="fa-solid fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEnableNewCategory(true);

                                                setNewSop({
                                                    ...newSop,
                                                    category: ""
                                                });
                                            }}
                                            className="absolute right-10 top-1/2 -translate-y-1/2 text-[#d93025] hover:text-[#b92a1f] transition-colors duration-200"
                                            title="创建新分类">
                                            <i className="fa-solid fa-plus text-xs"></i>
                                        </button>
                                    </div> : <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            placeholder="输入新分类名称"
                                            value={newCategoryName}
                                            onChange={e => setNewCategoryName(e.target.value)}
                                            className="flex-1 p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                        <button
                                            type="button"
                                            onClick={() => setEnableNewCategory(false)}
                                            className="px-3 py-2 text-[#d93025] bg-[#f9f2e8] hover:bg-white border border-[#e8d9c3] rounded-lg transition-colors duration-200"
                                            title="取消创建新分类">
                                            <i className="fa-solid fa-times"></i>
                                        </button>
                                    </div>}
                                </div>
                                {}
                                <div>
                                    <label className="block text-sm font-medium mb-1">步骤</label>
                                    {newSop.steps.map(
                                        (step, stepIndex) => <div key={stepIndex} className="mb-4 p-4 border border-[#e8d9c3] rounded-lg">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-medium">步骤 {stepIndex + 1}</h4>
                                                {newSop.steps.length > 1 && <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newSteps = [...newSop.steps];
                                                        newSteps.splice(stepIndex, 1);

                                                        setNewSop({
                                                            ...newSop,
                                                            steps: newSteps
                                                        });
                                                    }}
                                                    className="text-[#d93025] hover:text-[#b92a1f] transition-colors duration-200"
                                                    title="删除步骤">
                                                    <i className="fa-solid fa-trash-alt"></i>
                                                </button>}
                                            </div>
                                            {}
                                            <div className="mb-3">
                                                <label className="block text-sm text-slate-500 mb-1">标题</label>
                                                <input
                                                    type="text"
                                                    placeholder="请输入步骤标题"
                                                    value={step.title}
                                                    onChange={e => {
                                                        const newSteps = [...newSop.steps];
                                                        newSteps[stepIndex].title = e.target.value;

                                                        setNewSop({
                                                            ...newSop,
                                                            steps: newSteps
                                                        });
                                                    }}
                                                    className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                            </div>
                                            {}
                                            <div className="mb-3">
                                                <label className="block text-sm text-slate-500 mb-1">内容</label>
                                                <textarea
                                                    placeholder="请输入步骤内容"
                                                    value={step.content}
                                                    onChange={e => {
                                                        const newSteps = [...newSop.steps];
                                                        newSteps[stepIndex].content = e.target.value;

                                                        setNewSop({
                                                            ...newSop,
                                                            steps: newSteps
                                                        });
                                                    }}
                                                    rows={2}
                                                    className="w-full p-2 border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                            </div>
                                            {}
                                            <div>
                                                <label className="block text-sm text-slate-500 mb-2">标准话术</label>
                                                {step.scripts.map(
                                                    (script, scriptIndex) => <div key={scriptIndex} className="mb-2 p-2 border border-[#e8d9c3] rounded-lg">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-sm">话术 {scriptIndex + 1}</span>
                                                            {step.scripts.length > 1 && <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newSteps = [...newSop.steps];
                                                                    newSteps[stepIndex].scripts.splice(scriptIndex, 1);

                                                                    setNewSop({
                                                                        ...newSop,
                                                                        steps: newSteps
                                                                    });
                                                                }}
                                                                className="text-[#d93025] hover:text-[#b92a1f] transition-colors duration-200"
                                                                title="删除话术">
                                                                <i className="fa-solid fa-trash-alt text-xs"></i>
                                                            </button>}
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                            <div className="md:col-span-1">
                                                                <label className="block text-xs text-slate-500 mb-1">目的</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="话术目的"
                                                                    value={script.purpose}
                                                                    onChange={e => {
                                                                        const newSteps = [...newSop.steps];
                                                                        newSteps[stepIndex].scripts[scriptIndex].purpose = e.target.value;

                                                                        setNewSop({
                                                                            ...newSop,
                                                                            steps: newSteps
                                                                        });
                                                                    }}
                                                                    className="w-full p-1 text-sm border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="block text-xs text-slate-500 mb-1">内容</label>
                                                                <input
                                                                    type="text"
                                                                    placeholder="话术内容"
                                                                    value={script.content}
                                                                    onChange={e => {
                                                                        const newSteps = [...newSop.steps];
                                                                        newSteps[stepIndex].scripts[scriptIndex].content = e.target.value;

                                                                        setNewSop({
                                                                            ...newSop,
                                                                            steps: newSteps
                                                                        });
                                                                    }}
                                                                    className="w-full p-1 text-sm border border-[#e8d9c3] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#d93025]" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newSteps = [...newSop.steps];

                                                        newSteps[stepIndex].scripts.push({
                                                            content: "",
                                                            purpose: ""
                                                        });

                                                        setNewSop({
                                                            ...newSop,
                                                            steps: newSteps
                                                        });
                                                    }}
                                                    className="mt-2 px-3 py-1 text-sm text-[#d93025] border border-[#e8d9c3] rounded-lg hover:bg-[#f9f2e8] transition-colors duration-200 flex items-center">
                                                    <i className="fa-solid fa-plus mr-1 text-xs"></i>
                                                    <span>添加话术</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setNewSop({
                                                ...newSop,

                                                steps: [...newSop.steps, {
                                                    title: "",
                                                    content: "",

                                                    scripts: [{
                                                        content: "",
                                                        purpose: ""
                                                    }]
                                                }]
                                            });
                                        }}
                                        className="w-full mt-2 px-4 py-2 text-sm bg-[#f9f2e8] text-[#d93025] border border-[#e8d9c3] rounded-lg hover:bg-white transition-colors duration-200 flex items-center justify-center">
                                        <i className="fa-solid fa-plus mr-1"></i>
                                        <span>添加步骤</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-[#e8d9c3] flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowAddSop(false);
                                    setEnableNewCategory(false);
                                    setNewCategoryName("");
                                }}
                                className="px-4 py-2 bg-[#f9f2e8] hover:bg-white text-[#d93025] rounded-lg transition-colors duration-200">取消
                                                                                </button>
                            <button
                                onClick={() => {
                                    if (!newSop.title) {
                                        toast("请填写SOP标题");
                                        return;
                                    }

                                    let categoryToUse = newSop.category;

                                    if (enableNewCategory) {
                                        if (!addOrUpdateCategoryIfNeeded(newCategoryName)) {
                                            return;
                                        }

                                        categoryToUse = newCategoryName.trim();
                                    } else if (!categoryToUse) {
                                        toast("请选择或创建分类");
                                        return;
                                    }

                                    const hasEmptyStep = newSop.steps.some(
                                        step => !step.title || !step.content || step.scripts.every(script => !script.content || !script.purpose)
                                    );

                                    if (hasEmptyStep) {
                                        toast("请完善所有步骤的内容");
                                        return;
                                    }

                                    const finalSop: SOP = {
                                        id: `sop_${Date.now()}`,
                                        title: newSop.title,
                                        category: categoryToUse,
                                        steps: newSop.steps
                                    };

                                    setSops([finalSop, ...sops]);
                                    setShowAddSop(false);

                                    setNewSop({
                                        title: "",
                                        category: "",

                                        steps: [{
                                            title: "",
                                            content: "",

                                            scripts: [{
                                                content: "",
                                                purpose: ""
                                            }]
                                        }]
                                    });

                                    setEnableNewCategory(false);
                                    setNewCategoryName("");
                                    toast("SOP添加成功");
                                }}
                                className="px-4 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 btn-primary">添加SOP
                                                                                </button>
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default ServiceSOP;