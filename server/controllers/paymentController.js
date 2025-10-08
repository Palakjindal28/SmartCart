const Razorpay = require('razorpay');
const crypto = require('crypto');
const shortid = require('shortid');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay order
// @route   POST /api/payment/order
exports.createOrder = async (req, res) => {
    const { amount } = req.body;
    const options = {
        amount: amount * 100, // Amount in the smallest currency unit (paise)
        currency: 'INR',
        receipt: shortid.generate(),
    };

    try {
        const response = await razorpay.orders.create(options);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong!');
    }
};

// @desc    Verify payment
// @route   POST /api/payment/verify
exports.verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest === razorpay_signature) {
        // Payment is legit. Save info to your database here.
        res.json({ status: 'success', orderId: razorpay_order_id });
    } else {
        res.status(400).json({ status: 'failure' });
    }
};