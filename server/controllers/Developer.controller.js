const DeveloperModel = require('../models/Developer.model')
const TransactionModel = require('../models/Transactions.model')
const AccountModel = require('../models/Account.model')

const DeveloperController = {
    CreateDeveloperToken: async (req, res) => {
        try {
            const { userId } = req.params
            const token = await req.hashedToken
            const newToken = await DeveloperModel.create({ user: userId, token })

            console.log('Create Tokens Controller: ', newToken)
            res.json({ success: true, message: 'Tokens created successfully!', newToken })
        } catch (error) {
            res.status(400).json({ error: `CreateDeveloperToken in developer controller error ${error}` });
        }
    },
    GetUserTokens: async (req, res) => {
        try {
            const { userId } = req.params
            const data = await DeveloperModel.find({ user: userId })
            res.json({ success: true, message: 'Fetch tokens successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
    GetRequestAccountNo: async (req, res) => {
        try {
            const { accountno } = req.params
            const data = await AccountModel.findOne({ accountno: accountno })
            if (data) return res.json({ success: true, message: 'Account exist!' })
            res.json({ success: false, message: 'Account does not exist!' })
        } catch (error) {
            res.status(400).json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
    TransferTransaction: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            const { debitAccount, creditAccount, amount } = req.body
            const transferAmount = parseFloat(amount)
            const tax = 150

            console.log('Transfer Transaction Controller: ', { debitAccount, creditAccount, amount })

            const { _id: debitAccountId } = await AccountModel.findOne({ accountno: debitAccount })
            const { _id: creditAccountId } = await AccountModel.findOne({ accountno: creditAccount })

            const { balance: debitBalance } = await AccountModel.findById(debitAccountId)
            const { balance: creditBalance } = await AccountModel.findById(creditAccountId)

            const taxAmount = transferAmount + tax
            if (taxAmount > debitBalance) return res.json({ success: false, message: 'Insufficient Balance!', balance: debitBalance, taxPayable: tax, debitAmount: transferAmount, total: taxAmount })

            const debitFutureBalance = debitBalance - taxAmount
            const creditFutureBalance = creditBalance + transferAmount

            await TransactionModel.create({ account: debitAccountId, amount: taxAmount, transactionType: 'transfer_debit', description: `${debitAccount} transferred to ${creditAccount}`, status: 'completed', balance: debitFutureBalance, token: token })
            await TransactionModel.create({ account: creditAccountId, amount: transferAmount, transactionType: 'transfer_credit', description: `Received from ${debitAccount}`, status: 'completed', balance: creditFutureBalance, token: token })

            await AccountModel.findByIdAndUpdate(debitAccountId, { balance: debitFutureBalance }, { new: true })
            await AccountModel.findByIdAndUpdate(creditAccountId, { balance: creditFutureBalance }, { new: true })

            res.json({ success: true, message: 'Transfer transaction successfully!' })
        } catch (error) {
            res.json({ error: `TransferTransaction in transaction controller error ${error}` });
        }
    },
    DeleteToken: async (req, res) => {
        try {
            const { tokenId } = req.params
            res.json({ success: true, message: 'Token deleted successfully!', tokenId })
        } catch (error) {
            res.status(400).json({ error: `DeleteToken in developer controller error ${error}` });
        }
    }
}

module.exports = DeveloperController