const TransactionModel = require('../models/Transactions.model')
const AccountModel = require('../models/Account.model')
const UserModel = require('../models/Users.model')

const TransactionController = {
    DepositTransaction: async (req, res) => {
        try {
            const { account, amount } = req.body
            const depositAmount = parseFloat(amount)

            console.log('Deposit Transaction Controller: ', { account, amount })

            const { _id: accountId } = await AccountModel.findOne({ accountno: account })

            const { balance } = await AccountModel.findById(accountId)

            const currentBalance = balance + depositAmount

            await TransactionModel.create({ account: accountId, amount: depositAmount, transactionType: 'deposit' })
            await AccountModel.findByIdAndUpdate(accountId, { balance: currentBalance }, { new: true })

            res.json({ success: true, message: 'Deposit transaction successfully!' })
        } catch (error) {
            res.status(400).json({ error: `DepositTransaction in transaction controller error ${error}` });
        }
    },
    WithdrawTransaction: async (req, res) => {
        try {
            const { account, amount } = req.body
            const withdrawAmount = parseFloat(amount)
            const tax = 150

            console.log('Withdrawal Transaction Controller: ', { account, amount })

            const { _id: accountId } = await AccountModel.findOne({ accountno: account })
            const { balance } = await AccountModel.findById(accountId)

            const taxAmount = withdrawAmount + tax

            if (taxAmount > balance) return res.json({ success: false, message: 'Insufficient Balance', balance: balance, taxPayable: tax, total: taxAmount })

            const currentBalance = balance - taxAmount

            await TransactionModel.create({ account: accountId, amount: taxAmount, transactionType: 'withdrawal' })

            await AccountModel.findByIdAndUpdate(accountId, { balance: currentBalance }, { new: true })

            res.json({ success: true, message: 'Withdrawal transaction successfully!' })
        } catch (error) {
            res.status(400).json({ error: `WithdrawTransaction in transaction controller error ${error}` });
        }
    },
    TransferTransaction: async (req, res) => {
        try {
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

            await TransactionModel.create({ account: debitAccountId, amount: taxAmount, transactionType: 'transfer_debit', description: `${debitAccount} transferred to ${creditAccount}`, status: 'completed' })
            await TransactionModel.create({ account: creditAccountId, amount: transferAmount, transactionType: 'transfer_credit', description: `Received from ${debitAccount}`, status: 'completed' })

            await AccountModel.findByIdAndUpdate(debitAccountId, { balance: debitFutureBalance }, { new: true })
            await AccountModel.findByIdAndUpdate(creditAccountId, { balance: creditFutureBalance }, { new: true })

            res.json({ success: true, message: 'Transfer transaction successfully!' })
        } catch (error) {
            res.status(400).json({ error: `TransferTransaction in transaction controller error ${error}` });
        }
    },
    GetAllTransaction: async (req, res) => {
        try {
            const data = await TransactionModel.find()
            const formattedData = data.map(transaction => {
                let debit
                let credit
                const { createdAt, _id, amount, description, transactionType } = transaction;
                const formattedCreatedAt = new Date(createdAt).toLocaleDateString('en-US');
                return { _id, amount, description, createdAt: formattedCreatedAt, transactionType };
            });
            res.json({ success: true, message: 'Fetch transactions successfully!', data: formattedData })
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