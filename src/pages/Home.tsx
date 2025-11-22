import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StartupModal from "@/components/StartupModal";
import { cn } from "@/lib/utils";

interface NavItem {
    id: string;
    icon: string;
    label: string;
    path: string;
}

export default function Home() {
    const [showStartupModal, setShowStartupModal] = useState(() => {
        const hasClosedModal = localStorage.getItem("hasClosedStartupModal");
        return !hasClosedModal;
    });

    const [activeModule, setActiveModule] = useState("");
    const location = useLocation();

    const navItems: NavItem[] = [{
        id: "products",
        icon: "fa-shopping-bag",
        label: "商品卡介绍",
        path: "/products"
    }, {
        id: "test",
        icon: "fa-clipboard-question",
        label: "知识测试",
        path: "/test"
    }, {
        id: "sop",
        icon: "fa-list-check",
        label: "客服工作SOP",
        path: "/sop"
    }, {
        id: "knowledge",
        icon: "fa-book-open",
        label: "客服话术知识库",
        path: "/knowledge"
    }];

    useEffect(() => {
        const currentPath = location.pathname;
        const activeNavItem = navItems.find(item => item.path === currentPath);

        if (activeNavItem) {
            setActiveModule(activeNavItem.id);
        }
    }, [location.pathname, navItems]);

    const handleCloseModal = () => {
        setShowStartupModal(false);
        localStorage.setItem("hasClosedStartupModal", "true");
    };

    return (
        <div
            className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            {}
            <header
                className="bg-white shadow-md py-4 px-6 flex items-center justify-between border-b border-e8d9c3">
                <div className="flex items-center space-x-3">
                    <div
                        className="h-10 w-10 bg-[#d93025] rounded-lg flex items-center justify-center text-white">
                        <i className="fa-solid fa-utensils text-xl"></i>
                    </div>
                    <h1 className="text-xl font-bold">仟味神厨 - 客服管理系统</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-sm">
                        <span className="font-medium">欢迎，客服专员</span>
                    </div>
                    <div
                        className="h-10 w-10 rounded-full bg-[#f9f2e8] flex items-center justify-center text-[#d93025]">
                        <i className="fa-solid fa-user"></i>
                    </div>
                </div>
            </header>
            {}
            <div className="flex flex-1 overflow-hidden">
                {}
                <aside
                    className="w-64 bg-[#f9f2e8] border-r border-[#e8d9c3] shadow-sm p-4 flex flex-col">
                    <nav className="space-y-2 flex-1">
                        {navItems.map(item => <Link
                            key={item.id}
                            to={item.path}
                            className={cn(
                                "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                                activeModule === item.id ? "bg-[#d93025] text-white" : "hover:bg-white"
                            )}
                            onClick={() => setActiveModule(item.id)}>
                            <i className={`fa-solid ${item.icon} text-lg`}></i>
                            <span className="font-medium">{item.label}</span>
                        </Link>)}
                    </nav>
                    {}
                    <div className="mt-auto pt-4 border-t border-[#e8d9c3]">
                        <div className="text-xs text-[#666666] text-center">
                            <p>系统版本: 1.0.0</p>
                            <p>© 2025 仟味神厨</p>
                        </div>
                    </div>
                </aside>
                {}
                <main className="flex-1 overflow-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {}
                        <div className="text-center py-16">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    duration: 0.5
                                }}>
                                <div className="mb-8">
                                    <></>
                                </div>
                                <h2 className="text-3xl font-bold mb-4 text-[#d93025]">仟味神厨客服管理系统</h2>
                                <p className="text-[#666666] mb-8 max-w-2xl mx-auto">以专业服务传递品牌温度，让每一位顾客都能感受到仟味神厨的用心
                                                                                        </p>
                                <div className="mb-12">
                                    <p className="text-lg font-medium text-[#d93025]">营养源自饮食，健康源自习惯</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-6">
                                    {navItems.map(item => <motion.div
                                        key={item.id}
                                        whileHover={{
                                            scale: 1.05
                                        }}
                                        whileTap={{
                                            scale: 0.95
                                        }}>
                                        <Link
                                            to={item.path}
                                            className="bg-white shadow-md hover:shadow-lg p-6 rounded-xl flex flex-col items-center transition-all duration-200 w-48 card-shadow">
                                            <div
                                                className="h-12 w-12 rounded-full bg-[#f9f2e8] text-[#d93025] flex items-center justify-center mb-4">
                                                <i className={`fa-solid ${item.icon} text-xl`}></i>
                                            </div>
                                            <span className="font-medium">{item.label}</span>
                                        </Link>
                                    </motion.div>)}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </main>
            </div>
            {}
            <AnimatePresence>
                {showStartupModal && <StartupModal onClose={handleCloseModal} />}
            </AnimatePresence>
        </div>
    );
}