const CreditCard = require('../models/credit_card');
const PhoneCard = require('../models/phone_card');

const creditCards = [
    {
        cardNumber: '111111',
        expiredDate: '10/10/2022',
        cvv: '411'
    },
    {
        cardNumber: '222222',
        expiredDate: '11/11/2022',
        cvv: '443',
        limitation: 1000000
    },
    {
        cardNumber: '333333',
        expiredDate: '12/12/2022',
        cvv: '577',
        notification: 'thẻ hết tiền'
    }
]

const phoneCard = [
    {
        hostId: '11111',
        hostName: 'Viettel'
    },
    {
        hostId: '22222',
        hostName: 'Mobifone'
    },
    {
        hostId: '33333',
        hostName: 'Vinaphone'
    }
]

const defaultCreditCard = (req, res) => {
    creditCards.map(card => {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        CreditCard.findOneAndUpdate({ cardNumber: card.cardNumber }, card, options, (error, result) => {
            if (error) {
                console.log(error);
            }
        });
    });
};

const defaultPhoneCard = (req, res) => {
    phoneCard.map(host => {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        PhoneCard.findOneAndUpdate({ hostId: host.hostId }, host, options, (error, result) => {
            if (error) {
                console.log(error);
            }
        });
    });
};

module.exports = {
    defaultCreditCard,
    defaultPhoneCard
}