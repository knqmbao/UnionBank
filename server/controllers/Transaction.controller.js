const TransactionModel = require('../models/Transactions.model')
const AccountModel = require('../models/Account.model')

const TransactionController = {
    DepositTransaction: async (req, res) => {
        try {
            const { account, amount, transactionType } = req.body
            console.log('Deposit Transaction Controller: ', { account, amount, transactionType })

            await TransactionModel.create({ account, amount, transactionType })

            const { balance } = await AccountModel.findById(account)
            const currentBalance = balance + amount

            const data = await AccountModel.findByIdAndUpdate(
                account,
                {
                    balance: currentBalance
                },
                { new: true }
            )

            res.json({ success: true, message: 'Deposit transaction successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `CreateTransaction in transaction controller error ${error}` });
        }
    },
    WithdrawTransaction: async (req, res) => {
        try {
            const { account, amount, transactionType } = req.body
            console.log('Withdrawal Transaction Controller: ', { account, amount, transactionType })

            await TransactionModel.create({ account, amount, transactionType })

            const { balance } = await AccountModel.findById(account)
            const currentBalance = balance - amount

            const data = await AccountModel.findByIdAndUpdate(
                account,
                {
                    balance: currentBalance
                },
                { new: true }
            )

            res.json({ success: true, message: 'Withdrawal transaction successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `CreateTransaction in transaction controller error ${error}` });
        }
    },
    TransferTransaction: async (req, res) => {
        try {
            const { debitAccount, creditAccount, amount, transactionType } = req.body
            console.log('Transfer Transaction Controller: ', { debitAccount, creditAccount, amount, transactionType })

            await TransactionModel.create({ account: debitAccount, amount, transactionType })

            const { balance: debitBalance } = await AccountModel.findById(debitAccount)
            const { balance: creditBalance } = await AccountModel.findById(creditAccount)
            const debitFutureBalance = debitBalance - amount
            const creditFutureBalance = creditBalance + amount


            const debitData = await AccountModel.findByIdAndUpdate(
                debitAccount,
                {
                    balance: debitFutureBalance
                },
                { new: true }
            )

            const creditData = await AccountModel.findByIdAndUpdate(
                creditAccount,
                {
                    balance: creditFutureBalance
                },
                { new: true }
            )

            res.json({ success: true, message: 'Withdrawal transaction successfully!', debitData, creditData })
        } catch (error) {
            res.status(400).json({ error: `CreateTransaction in transaction controller error ${error}` });
        }
    },
    GetAllTransaction: async (req, res) => {
        try {
            const data = await TransactionModel.find()
            res.json({ success: true, message: 'Fetch transactions successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `GetAllTransaction in transaction controller error ${error}` });
        }
    },
    SearchTransaction: async (req, res) => {
        try {
            const { accountId } = req.params
            console.log('Search Transaction Controller: ', accountId)
        } catch (error) {
            res.status(400).json({ error: `SearchTransaction in transaction controller error ${error}` });
        }
    }
}

module.exports = TransactionController