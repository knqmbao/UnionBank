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
    GetAllTokens: async (req, res) => {
        try {
            const data = await DeveloperModel.find()
            res.json({ success: true, message: 'Fetch tokens successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
    DeleteToken: async (req, res) => {
        try {
            const { tokenId } = req.params
            res.json({ success: true, message: 'Token deleted successfully!', tokenId })
        } catch (error) {
            res.status(400).json({ error: `DeleteToken in developer controller error ${error}` });
        }
    },
    DepositTransaction: async (req, res) => {
        try {
            const { account, amount, transactionType } = req.body
            console.log('Deposit Transaction Controller: ', { account, amount, transactionType })

            const { _id: accountId } = await AccountModel.findOne({ user: account })

            await TransactionModel.create({ account: accountId, amount, transactionType })

            const depositAmount = parseFloat(amount)
            const { balance } = await AccountModel.findById(accountId)
            let currentBalance = balance + depositAmount

            const data = await AccountModel.findByIdAndUpdate(
                accountId,
                {
                    balance: currentBalance
                },
                { new: true }
            )

            res.json({ success: true, message: 'Deposit transaction successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `DepositTransaction in transaction controller error ${error}` });
        }
    },
    WithdrawTransaction: async (req, res) => {
        try {
            const { account, amount, transactionType } = req.body
            console.log('Withdrawal Transaction Controller: ', { account, amount, transactionType })

            const { _id: accountId } = await AccountModel.findOne({ user: account })

            await TransactionModel.create({ account: accountId, amount, transactionType })

            const withdrawAmount = parseFloat(amount)
            const { balance } = await AccountModel.findById(accountId)
            const currentBalance = balance - withdrawAmount

            const data = await AccountModel.findByIdAndUpdate(
                accountId,
                {
                    balance: currentBalance
                },
                { new: true }
            )

            res.json({ success: true, message: 'Withdrawal transaction successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `WithdrawTransaction in transaction controller error ${error}` });
        }
    },
    TransferTransaction: async (req, res) => {
        try {
            const { debitAccount, creditAccount, amount, transactionType } = req.body
            console.log('Transfer Transaction Controller: ', { debitAccount, creditAccount, amount, transactionType })

            const { _id: debitAccountId } = await AccountModel.findOne({ user: debitAccount })
            const { _id: creditAccountId } = await AccountModel.findOne({ user: creditAccount })

            await TransactionModel.create({ account: debitAccountId, amount, transactionType })

            const transferAmount = parseFloat(amount)
            const { balance: debitBalance } = await AccountModel.findById(debitAccountId)
            const { balance: creditBalance } = await AccountModel.findById(creditAccountId)
            const debitFutureBalance = debitBalance - transferAmount
            const creditFutureBalance = creditBalance + transferAmount


            const debitData = await AccountModel.findByIdAndUpdate(
                debitAccountId,
                {
                    balance: debitFutureBalance
                },
                { new: true }
            )

            const creditData = await AccountModel.findByIdAndUpdate(
                creditAccountId,
                {
                    balance: creditFutureBalance
                },
                { new: true }
            )

            res.json({ success: true, message: 'Withdrawal transaction successfully!', debitData, creditData })
        } catch (error) {
            res.status(400).json({ error: `TransferTransaction in transaction controller error ${error}` });
        }
    }
}

module.exports = DeveloperController