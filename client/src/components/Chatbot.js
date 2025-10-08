import React, { useState } from 'react';


const faq = [
    { 
        q: "How long does delivery take?", 
        a: "We promise a delivery time of 10 minutes from the moment your payment is successful. You can see the live countdown in the navbar." 
    },
    { 
        q: "What payment methods are accepted?", 
        a: "We accept all major credit cards, debit cards, UPI, and net banking through our secure Razorpay payment gateway." 
    },
    { 
        q: "How can I find a specific product?", 
        a: "You can browse through our categories using the filter buttons on the homepage. A search bar feature is coming soon!" 
    },
    { 
        q: "Who can I contact for support?", 
        a: "For any issues, you can reach out to our support team at support@smartcart.com." 
    }
];

const Chatbot = () => {
    const [answer, setAnswer] = useState("Hello! Please select a question from the options below.");

    return (
        <div className="chatbot-container">
            <h3>Support Bot 🤖</h3>
            <div className="chatbot-questions">
                {faq.map((item, index) => (
                    <button key={index} onClick={() => setAnswer(item.a)} className="question-btn">
                        {item.q}
                    </button>
                ))}
            </div>
            <div className="chatbot-answer">
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default Chatbot;