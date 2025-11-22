import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Question {
    id: number;
    content: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface AnswerRecord {
    questionId: number;
    selectedAnswer: number | null;
    isMarked: boolean;
}

const mockQuestions: Question[] = [{
    id: 1,
    content: "当客户询问商品是否支持七天无理由退换货时，客服应该如何回答？",

    options: [
        "非常抱歉，我们的商品不支持七天无理由退换货",
        "亲，我们的商品支持七天无理由退换货，但请确保商品及包装完好",
        "这个要看具体情况而定",
        "请您查看商品详情页的说明"
    ],

    correctAnswer: 1,
    explanation: "根据公司政策，所有商品均支持七天无理由退换货，但需要确保商品及包装完好，不影响二次销售。"
}, {
    id: 2,
    content: "当客户投诉商品质量问题时，客服的第一反应应该是？",
    options: ["否认商品存在质量问题", "询问客户具体遇到了什么问题", "直接提供退款解决方案", "建议客户联系售后部门"],
    correctAnswer: 1,
    explanation: "当客户投诉质量问题时，首先应该了解具体情况，表现出同理心，让客户感受到被重视。"
}, {
    id: 3,
    content: "智能手表Pro Max的电池续航时间是多久？",
    options: ["7天", "10天", "14天", "30天"],
    correctAnswer: 2,
    explanation: "根据产品规格，智能手表Pro Max的电池续航时间为14天。"
}, {
    id: 4,
    content: "当客户催发货时，客服应该如何回应？",
    options: ["请您耐心等待，我们会尽快发货", "您的订单已经安排发货，预计1-3天内送达", "仓库正在处理您的订单，请稍候", "我们会优先处理您的订单"],
    correctAnswer: 1,
    explanation: "具体的发货信息和预计送达时间能让客户更安心，体现专业服务。"
}, {
    id: 5,
    content: "无线蓝牙耳机的防水等级是多少？",
    options: ["IPX2", "IPX4", "IPX6", "IPX8"],
    correctAnswer: 1,
    explanation: "根据产品规格，无线蓝牙耳机的防水等级为IPX4。"
}, {
    id: 6,
    content: "当客户要求额外赠品时，客服应该如何回应？",

    options: [
        "非常抱歉，我们没有额外赠品",
        "亲，目前我们的商品已经是优惠价格，没有额外赠品哦",
        "您可以关注我们的促销活动，有时候会有赠品",
        "如果您购买两件商品，我们可以考虑赠送小礼品"
    ],

    correctAnswer: 1,
    explanation: "礼貌地解释当前没有额外赠品，但保持友好态度，避免引起客户不满。"
}, {
    id: 7,
    content: "便携式充电宝的容量是多少？",
    options: ["10000mAh", "15000mAh", "20000mAh", "25000mAh"],
    correctAnswer: 2,
    explanation: "根据产品规格，便携式充电宝的容量为20000mAh。"
}, {
    id: 8,
    content: "当客户对商品功能有疑问时，客服应该？",
    options: ["建议客户查看商品说明书", "详细解释商品功能，并提供使用建议", "提供技术支持的联系方式", "简单回答客户的问题"],
    correctAnswer: 1,
    explanation: "详细解释商品功能并提供使用建议，能帮助客户更好地了解和使用商品，提升客户满意度。"
}, {
    id: 9,
    content: "超薄笔记本电脑的厚度是多少？",
    options: ["12.9mm", "14.9mm", "16.9mm", "18.9mm"],
    correctAnswer: 1,
    explanation: "根据产品规格，超薄笔记本电脑的厚度为14.9mm。"
}, {
    id: 10,
    content: "当客户表示价格太高时，客服应该如何回应？",

    options: [
        "我们的商品质量有保证，物有所值",
        "您可以考虑购买其他性价比更高的商品",
        "现在有促销活动，价格已经很优惠了",
        "我们的商品采用优质材料，所以价格较高"
    ],

    correctAnswer: 0,
    explanation: "强调商品的质量和价值，让客户理解价格的合理性。"
}, {
    id: 11,
    content: "智能空气净化器的适用面积是多少？",
    options: ["20-30㎡", "30-40㎡", "40-60㎡", "60-80㎡"],
    correctAnswer: 2,
    explanation: "根据产品规格，智能空气净化器的适用面积为40-60㎡。"
}, {
    id: 12,
    content: "当客户对售后服务不满意时，客服应该？",
    options: ["解释公司的售后服务政策", "记录客户的问题，并承诺尽快解决", "建议客户投诉到更高层", "表示这不是自己的责任"],
    correctAnswer: 1,
    explanation: "记录问题并承诺解决，能让客户感受到被重视，有助于缓解不满情绪。"
}];

const KnowledgeTest: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerRecord[]>([]);
    const [testStarted, setTestStarted] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const [wrongAnswers, setWrongAnswers] = useState<{
        question: Question;
        selectedAnswer: number | null;
    }[]>([]);

    const [showAddQuestion, setShowAddQuestion] = useState(false);

    const [newQuestion, setNewQuestion] = useState({
        content: "",
        options: ["", "", "", ""],
        correctAnswer: 0
    });

    const startTest = () => {
        const shuffledQuestions = [...mockQuestions].sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 10);
        setQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);

        const initialAnswers: AnswerRecord[] = selectedQuestions.map(question => ({
            questionId: question.id,
            selectedAnswer: null,
            isMarked: false
        }));

        setAnswers(initialAnswers);
        setTestStarted(true);
        setTestCompleted(false);
        setScore(0);
        setWrongAnswers([]);
    };

    const selectAnswer = (answerIndex: number) => {
        const updatedAnswers = [...answers];
        const questionIndex = updatedAnswers.findIndex(a => a.questionId === questions[currentQuestionIndex].id);

        if (questionIndex !== -1) {
            updatedAnswers[questionIndex].selectedAnswer = answerIndex;
            setAnswers(updatedAnswers);
        }
    };

    const toggleMark = () => {
        const updatedAnswers = [...answers];
        const questionIndex = updatedAnswers.findIndex(a => a.questionId === questions[currentQuestionIndex].id);

        if (questionIndex !== -1) {
            updatedAnswers[questionIndex].isMarked = !updatedAnswers[questionIndex].isMarked;
            setAnswers(updatedAnswers);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const submitTest = () => {
        const allAnswered = answers.every(a => a.selectedAnswer !== null);

        if (!allAnswered) {
            const confirmSubmit = window.confirm("还有未回答的题目，确定要提交吗？");

            if (!confirmSubmit)
                return;
        }

        let newScore = 0;

        const newWrongAnswers: {
            question: Question;
            selectedAnswer: number | null;
        }[] = [];

        answers.forEach(answer => {
            const question = questions.find(q => q.id === answer.questionId);

            if (question) {
                if (answer.selectedAnswer === question.correctAnswer) {
                    newScore += 10;
                } else {
                    newWrongAnswers.push({
                        question,
                        selectedAnswer: answer.selectedAnswer
                    });
                }
            }
        });

        setScore(newScore);
        setWrongAnswers(newWrongAnswers);
        setTestCompleted(true);
    };

    const retakeTest = () => {
        startTest();
    };

    const handleAddQuestion = () => {
        if (!newQuestion.content || newQuestion.options.some(opt => !opt)) {
            toast("请填写完整的题目内容和选项");
            return;
        }

        toast("题目添加成功");
        setShowAddQuestion(false);

        setNewQuestion({
            content: "",
            options: ["", "", "", ""],
            correctAnswer: 0
        });
    };

    return (
        <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
            <></>
            {!testStarted ? (
                <div
                    className="bg-white p-8 rounded-lg shadow-sm border border-[#e8d9c3] flex flex-col items-center justify-center text-center w-full max-w-2xl card-shadow">
                    <div className="text-6xl text-[#d93025] mb-6">
                        <i className="fa-solid fa-clipboard-question"></i>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">客服知识测试</h3>
                    <p
                        className="text-[#666666] mb-6 max-w-2xl"
                        style={{
                            fontFamily: "\"Noto Sans SC\", sans-serif"
                        }}>本次测试为10道单选题，每题10分，满分100分。<br />测试完成后将即时显示得分和错题解析。</p>
                    <motion.button
                        whileHover={{
                            scale: 1.05
                        }}
                        whileTap={{
                            scale: 0.95
                        }}
                        onClick={startTest}
                        className="px-8 py-3 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 font-medium text-lg btn-primary">开始测试
                    </motion.button>
                </div>
            ) : !testCompleted ? (
                <div
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">进度: {currentQuestionIndex + 1}/{questions.length}</span>
                            <button
                                onClick={toggleMark}
                                className={`px-3 py-1 rounded-full text-sm flex items-center transition-colors duration-200 ${answers.find(a => a.questionId === questions[currentQuestionIndex].id)?.isMarked ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"}`}>
                                <i
                                    className={`fa-solid ${answers.find(a => a.questionId === questions[currentQuestionIndex].id)?.isMarked ? "fa-star" : "fa-star-o"} mr-1`}></i>
                                <span>
                                    {answers.find(a => a.questionId === questions[currentQuestionIndex].id)?.isMarked ? "已标记" : "标记不确定"}
                                </span>
                            </button>
                        </div>
                            <div
                                className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#d93025] transition-all duration-300"
                                    style={{
                                        width: `${(currentQuestionIndex + 1) / questions.length * 100}%`
                                    }}></div>
                            </div>
                    </div>
                    <div className="p-6">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {currentQuestionIndex + 1}. {questions[currentQuestionIndex].content}
                            </h3>
                            <div className="space-y-3">
                                {questions[currentQuestionIndex].options.map((option, index) => {
                                    const isSelected = answers.find(a => a.questionId === questions[currentQuestionIndex].id)?.selectedAnswer === index;

                                    return (
                                        <motion.div
                                            key={index}
                                            whileHover={{
                                                scale: 1.01
                                            }}
                                            whileTap={{
                                                scale: 0.99
                                            }}
                                            onClick={() => selectAnswer(index)}
                                            className={cn(
                                                "p-4 rounded-lg border cursor-pointer transition-all duration-200 flex items-center",
                                                isSelected ? "border-[#d93025] bg-[#f9f2e8]" : "border-[#e8d9c3] hover:border-[#d93025] hover:bg-[#f9f2e8]/50"
                                            )}>
                                            <div
                                                className={cn(
                                                    "w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                                                    isSelected ? "bg-[#d93025] text-white" : "border border-[#e8d9c3]"
                                                )}>
                                                {isSelected && <i className="fa-solid fa-check text-xs"></i>}
                                            </div>
                                            <span>{option}</span>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                        <div
                            className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className={`px-6 py-2 rounded-lg transition-colors duration-200 flex items-center ${currentQuestionIndex === 0 ? "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed" : "bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200"}`}>
                                <i className="fa-solid fa-chevron-left mr-2"></i>
                                <span>上一题</span>
                            </button>
                            {currentQuestionIndex === questions.length - 1 ? (
                                <button
                                    onClick={submitTest}
                                    className="px-6 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 font-medium btn-primary">提交测试
                                </button>
                            ) : (
                                <button
                                    onClick={nextQuestion}
                                    className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg transition-colors duration-200 flex items-center">
                                    <span>下一题</span>
                                    <i className="fa-solid fa-chevron-right ml-2"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div
                        className="p-8 text-center bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900/30">
                        <div className="text-8xl mb-4">
                            {score >= 80 ? <span className="text-green-600 dark:text-green-400"><i className="fa-solid fa-trophy"></i></span> : score >= 60 ? <span className="text-yellow-600 dark:text-yellow-400"><i className="fa-solid fa-star"></i></span> : <span className="text-red-600 dark:text-red-400"><i className="fa-solid fa-face-frown"></i></span>}
                        </div>
                        <h3 className="text-3xl font-bold mb-2">测试完成！</h3>
                        <p className="text-xl mb-4">您的得分: <span
                                className={`font-bold ${score >= 80 ? "text-green-600 dark:text-green-400" : score >= 60 ? "text-yellow-600 dark:text-yellow-400" : "text-red-600 dark:text-red-400"}`}>{score}/100</span></p>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            {score >= 80 ? "优秀！您对客服知识掌握得非常好！" : score >= 60 ? "不错！继续努力，您会做得更好！" : "加油！建议您加强客服知识学习。"}
                        </p>
                        <motion.button
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            onClick={retakeTest}
                            className="px-6 py-2 bg-[#d93025] hover:bg-[#b92a1f] text-white rounded-lg transition-colors duration-200 font-medium btn-primary">重新测试
                        </motion.button>
                    </div>
                    {wrongAnswers.length > 0 && (
                        <div className="p-6">
                            <h4 className="text-xl font-semibold mb-4 flex items-center">
                                <i className="fa-solid fa-circle-exclamation text-red-500 mr-2"></i>错题解析 ({wrongAnswers.length}题)
                            </h4>
                            <div className="space-y-6">
                                {wrongAnswers.map(
                                    (item, index) => (
                                        <div key={index} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700/30">
                                            <div className="mb-3">
                                                <span className="font-medium">题目 {index + 1}:</span> {item.question.content}
                                            </div>
                                            <div className="mb-3">
                                                <span className="font-medium text-red-500">您的答案:</span> {item.selectedAnswer !== null ? item.question.options[item.selectedAnswer] : "未作答"}
                                            </div>
                                            <div className="mb-3">
                                                <span className="font-medium text-green-500">正确答案:</span> {item.question.options[item.question.correctAnswer]}
                                            </div>
                                            <div>
                                                <span className="font-medium">解析:</span> {item.question.explanation}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <AnimatePresence>
                {showAddQuestion && (
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
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                            <div
                                className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                                <h3 className="text-xl font-bold">添加新题目</h3>
                                <button
                                    onClick={() => setShowAddQuestion(false)}
                                    className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">题目内容</label>
                                        <textarea
                                            value={newQuestion.content}
                                            onChange={e => setNewQuestion({
                                                ...newQuestion,
                                                content: e.target.value
                                            })}
                                            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows={3}
                                            placeholder="请输入题目内容"></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">选项</label>
                                        <div className="space-y-2">
                                            {newQuestion.options.map(
                                                (option, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <div
                                                            className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm flex-shrink-0">
                                                            {String.fromCharCode(65 + index)}
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={e => {
                                                                const newOptions = [...newQuestion.options];
                                                                newOptions[index] = e.target.value;

                                                                setNewQuestion({
                                                                    ...newQuestion,
                                                                    options: newOptions
                                                                });
                                                            }}
                                                            className="flex-1 p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            placeholder={`选项 ${String.fromCharCode(65 + index)}`} />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">正确答案</label>
                                        <select
                                            value={newQuestion.correctAnswer}
                                            onChange={e => setNewQuestion({
                                                ...newQuestion,
                                                correctAnswer: parseInt(e.target.value)
                                            })}
                                            className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            {newQuestion.options.map((_, index) => (
                                                <option key={index} value={index}>
                                                    {String.fromCharCode(65 + index)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowAddQuestion(false)}
                                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg transition-colors duration-200">取消
                                </button>
                                <button
                                    onClick={handleAddQuestion}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">添加题目
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default KnowledgeTest;