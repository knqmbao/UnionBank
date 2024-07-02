const TransactionModel = require('../models/Transactions.model')
const AccountModel = require('../models/Account.model')
const UserModel = require('../models/Users.model')

const TransactionController = {
    DepositTransaction: async (req, res) => {
        try {
            const { account, amount } = req.body
            console.log('Deposit Transaction Controller: ', { account, amount })

            const { _id: accountId } = await AccountModel.findOne({ accountno: account })

            await TransactionModel.create({ account: accountId, amount, transactionType: 'deposit' })

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
            const { account, amount } = req.body
            const tax = 150

            console.log('Withdrawal Transaction Controller: ', { account, amount })

            const { _id: accountId } = await AccountModel.findOne({ accountno: account })
            const { balance } = await AccountModel.findById(accountId)

            const withdrawAmount = parseFloat(amount)

            const taxAmount = withdrawAmount + tax

            if (taxAmount > balance) return res.json({ success: false, message: 'Insufficient Balance', balance: balance, taxPayable: tax, total: taxAmount })

            const currentBalance = balance - withdrawAmount

            await TransactionModel.create({ account: accountId, amount: taxAmount, transactionType: 'withdrawal' })

            const data = await AccountModel.findByIdAndUpdate(
                accountId,
                {
                    balance: currentBalance
                },
                { new: true }
            )

            // const {_id, } = data

            res.json({ success: true, message: 'Withdrawal transaction successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `WithdrawTransaction in transaction controller error ${error}` });
        }
    },
    TransferTransaction: async (req, res) => {
        try {
            const { debitAccount, creditAccount, amount } = req.body
            const tax = 150

            console.log('Transfer Transaction Controller: ', { debitAccount, creditAccount, amount })

            const { _id: debitAccountId } = await AccountModel.findOne({ accountno: debitAccount })
            const { _id: creditAccountId } = await AccountModel.findOne({ accountno: creditAccount })

            const transferAmount = parseFloat(amount)
            const { balance: debitBalance } = await AccountModel.findById(debitAccountId)
            const { balance: creditBalance } = await AccountModel.findById(creditAccountId)

            const taxAmount = transferAmount + tax
            let debitFutureBalance

            if (taxAmount > debitBalance) return res.json({ success: false, message: 'Insufficient Balance!', balance: debitBalance, taxPayable: tax, debitAmount: transferAmount, total: taxAmount })

            debitFutureBalance = debitBalance - taxAmount
            const creditFutureBalance = creditBalance + taxAmount

            await TransactionModel.create({ account: creditAccountId, amount: taxAmount, transactionType: 'deposit' })
            await TransactionModel.create({ account: debitAccountId, amount: taxAmount, transactionType: 'withdrawal' })
            await TransactionModel.create({ account: debitAccountId, amount: taxAmount, transactionType: 'transfer' })

            const { _id: did, userId: duserId, accountno: daccountno, accountType: daccountType, balance: dbalance } = await AccountModel.findByIdAndUpdate(
                debitAccountId,
                {
                    balance: debitFutureBalance
                },
                { new: true }
            )

            const { _id: cid, userId: cuserId, accountno: caccountno, accountType: caccountType, balance: cbalance } = await AccountModel.findByIdAndUpdate(
                creditAccountId,
                {
                    balance: creditFutureBalance
                },
                { new: true }
            )

            res.json({
                success: true,
                message: 'Transfer transaction successfully!',
                debitData: { _id: did, userId: duserId, accountno: daccountno, accountType: daccountType, balance: dbalance, debitAmount: taxAmount },
                creditData: { _id: cid, userId: cuserId, accountno: caccountno, accountType: caccountType, balance: cbalance, creditAmount: taxAmount }
            })
        } catch (error) {
            res.status(400).json({ error: `TransferTransaction in transaction controller error ${error}` });
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

            const { _id: account } = await AccountModel.findOne({ user: accountId })
            const data = await TransactionModel.find({ account: account })
            res.json({ success: true, message: 'Search transactions successfully!', data })
        } catch (error) {
            res.status(400).json({ error: `SearchTransaction in transaction controller error ${error}` });
        }
    }
}

module.exports = TransactionController