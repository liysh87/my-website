import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface StartupModalProps {
    onClose: () => void;
}

const carouselProducts = [{
    id: 1,
    name: "智能手表 Pro Max",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=smart%20watch%20with%20fitness%20tracking%20features%20on%20white%20background&sign=82f11c7cb7a22e13b1d57ae166946be4"
}, {
    id: 2,
    name: "无线蓝牙耳机",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=wireless%20bluetooth%20headphones%20with%20noise%20cancellation%20on%20white%20background&sign=fef48beb1ded38610d084b87b47c948e"
}, {
    id: 3,
    name: "便携式充电宝",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=portable%20power%20bank%20with%20fast%20charging%20on%20white%20background&sign=68307f3831d5a3c895b71c299e6fa7e2"
}, {
    id: 4,
    name: "超薄笔记本电脑",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=ultra-thin%20laptop%20with%20touch%20screen%20on%20white%20background&sign=5858faf557dfbd1f921ea9293c8d753c"
}];

const StartupModal: React.FC<StartupModalProps> = (
    {
        onClose
    }
) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const [showPreview, setShowPreview] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % carouselProducts.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.offsetWidth / 2;
            const scrollPosition = currentSlide * slideWidth;

            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth"
            });
        }
    }, [currentSlide]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);

        setStartX(
            e instanceof MouseEvent ? e.pageX : e.touches && e.touches.length > 0 ? e.touches[0].pageX : 0
        );

        setScrollLeft(carouselRef.current?.scrollLeft || 0);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging)
            return;

        const x = e instanceof MouseEvent ? e.pageX : e.touches && e.touches.length > 0 ? e.touches[0].pageX : 0;
        const walk = (x - startX) * 2;

        if (carouselRef.current) {
            carouselRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handlePrevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + carouselProducts.length) % carouselProducts.length);
    };

    const handleNextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % carouselProducts.length);
    };

    const handleImageClick = (id: number) => {
        setShowPreview(id);
    };

    const handleClosePreview = () => {
        setShowPreview(null);
    };

    const handleCopyGreeting = () => {
        const greetingText = "欢迎加入 仟味神厨 客服团队！以专业服务传递品牌温度，今日也要全力以赴呀～";
        navigator.clipboard.writeText(greetingText);
    };

    return (
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.3
                    }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
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
                        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border-2 border-[#e8d9c3]">
                        {}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 bg-[#f9f2e8] p-2 rounded-full text-[#d93025] hover:bg-white transition-colors duration-200 flex items-center space-x-1">
                            <i className="fa-solid fa-times"></i>
                            <span className="text-sm font-medium">关闭</span>
                        </button>
                {}
                <div className="flex-1 p-8">
                    {}
                    <div className="mb-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                                <div
                                    className="h-12 w-12 bg-[#d93025] rounded-lg flex items-center justify-center text-white mr-3">
                                    <i className="fa-solid fa-utensils text-xl"></i>
                                </div>
                            <h2 className="text-2xl font-bold">仟味神厨</h2>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-xl">欢迎加入 仟味神厨 客服团队！以专业服务传递品牌温度，今日也要全力以赴呀～
                                              </p>
                            <></>
                        </div>
                    </div>
                    {}
                    <div className="relative">
                        <h3 className="text-xl font-semibold mb-4 text-center">近日店铺爆品</h3>
                        {}
                        <button
                            onClick={handlePrevSlide}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#f9f2e8] p-2 rounded-full text-[#d93025] hover:bg-white transition-colors duration-200 z-10">
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={handleNextSlide}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#f9f2e8] p-2 rounded-full text-[#d93025] hover:bg-white transition-colors duration-200 z-10">
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                        {}
                        <div
                            ref={carouselRef}
                            className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchStart={handleMouseDown}
                            onTouchMove={handleMouseMove}
                            onTouchEnd={handleMouseUp}>
                            {carouselProducts.map(
                                product => <div key={product.id} className="flex-shrink-0 w-1/2 snap-center">
                                    <div
                                        className="bg-slate-100 dark:bg-slate-700/50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                        onClick={() => handleImageClick(product.id)}>
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h4 className="font-medium">{product.name}</h4>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {}
                        <div className="flex justify-center mt-4 space-x-2">
                            {carouselProducts.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentSlide === index ? "bg-[#d93025]" : "bg-[#e8d9c3]"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {}
                    <div
                        className="p-6 border-t border-[#e8d9c3] flex justify-end">
                        <motion.button
                            whileHover={{
                                scale: 1.02
                            }}
                            whileTap={{
                                scale: 0.98
                            }}
                            onClick={onClose}
                            className="px-8 py-3 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 font-medium text-lg btn-primary">进入系统
                                      </motion.button>
                    </div>
            </motion.div>
            {}
            <AnimatePresence>
                {showPreview !== null && <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    exit={{
                        opacity: 0
                    }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                    onClick={handleClosePreview}>
                    <motion.div
                        initial={{
                            scale: 0.8
                        }}
                        animate={{
                            scale: 1
                        }}
                        exit={{
                            scale: 0.8
                        }}
                        className="relative max-w-4xl max-h-[90vh]"
                        onClick={e => e.stopPropagation()}>
                        <img
                            src={carouselProducts.find(p => p.id === showPreview)?.imageUrl}
                            alt="预览图片"
                            className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
                        <button
                            onClick={handleClosePreview}
                            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition-colors duration-200">
                            <i className="fa-solid fa-times"></i>
                        </button>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </motion.div>
    );
};

export default StartupModal;