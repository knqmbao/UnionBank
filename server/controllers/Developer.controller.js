const DeveloperModel = require('../models/Developer.model')
const TransactionModel = require('../models/Transactions.model')
const AccountModel = require('../models/Account.model')
const AuditLog = require('../models/Auditlog.model')

const { exec } = require('child_process')

const Log = async ({ userId, action, collectionName, documentId, changes, description }) => {
    await AuditLog.create({ userId, action, collectionName, documentId, changes, description })
}

const dbName = 'unionbank';
const mongodumpPath = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongodump"';
const mongorestorePath = '"C:\\Program Files\\MongoDB\\Tools\\100\\bin\\mongorestore"';

const DeveloperController = {
    CreateDeveloperToken: async (req, res) => {
        try {
            const { userId } = req.params
            const token = await req.hashedToken
            const newToken = await DeveloperModel.create({ user: userId, token })
            Log({
                userId,
                action: 'create',
                collectionName: 'Developer',
                documentId: newToken?._id,
                changes: {
                    user: userId, token: token
                },
                description: `${userId} created a token.`
            })

            res.json({ success: true, message: 'Tokens created successfully!', newToken })
        } catch (error) {
            res.json({ error: `CreateDeveloperToken in developer controller error ${error}` });
        }
    },
    GetUserTokens: async (req, res) => {
        try {
            const { userId } = req.params
            const data = await DeveloperModel.find({ user: userId })
            res.json({ success: true, message: 'Fetch tokens successfully!', data })
        } catch (error) {
            res.json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
    GetRequestAccountNo: async (req, res) => {
        try {
            const { accountno } = req.params
            const data = await AccountModel.findOne({ accountno: accountno })
            if (data) return res.json({ success: true, message: 'Account exist!' })
            res.json({ success: false, message: 'Account does not exist!' })
        } catch (error) {
            res.json({ error: `GetAllTokens in developer controller error ${error}` });
        }
    },
    TransferTransaction: async (req, res) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader && authHeader.split(' ')[1]

            const { user: developerUserId, _id: developerId } = await DeveloperModel.findOne({ token: token })

            const { debitAccount, creditAccount, amount } = req.body
            const transferAmount = parseFloat(amount)
            const tax = 150

            const { _id: debitAccountId } = await AccountModel.findOne({ accountno: debitAccount })
            const { _id: creditAccountId } = await AccountModel.findOne({ accountno: creditAccount })

            const { balance: debitBalance } = await AccountModel.findById(debitAccountId)
            const { balance: creditBalance } = await AccountModel.findById(creditAccountId)

            const taxAmount = transferAmount + tax
            if (taxAmount > debitBalance) return res.json({ success: false, message: 'Insufficient Balance!', servicefee: tax, transferAmount: transferAmount, total: taxAmount })

            const debitFutureBalance = debitBalance - taxAmount
            const creditFutureBalance = creditBalance + transferAmount

            const { _id: debitTransactionId } = await TransactionModel.create({ account: debitAccountId, fee: tax, amount: taxAmount, transactionType: 'transfer_debit', description: `${debitAccount} transferred to ${creditAccount}`, status: 'completed', balance: debitFutureBalance, token: token })
            const { _id: creditTransactionId } = await TransactionModel.create({ account: creditAccountId, fee: tax, amount: transferAmount, transactionType: 'transfer_credit', description: `Received from ${debitAccount}`, status: 'completed', balance: creditFutureBalance, token: token })

            await AccountModel.findByIdAndUpdate(debitAccountId, { balance: debitFutureBalance }, { new: true })
            await AccountModel.findByIdAndUpdate(creditAccountId, { balance: creditFutureBalance }, { new: true })

            Log({
                userId: developerUserId,
                action: 'create',
                collectionName: 'Transaction',
                documentId: debitTransactionId,
                changes: { balance: debitFutureBalance },
                description: `Foreign user: ${developerUserId} with developer document id of ${developerId} attempted to transfer. ${debitAccount} transferred an amount of ${transferAmount} with a service fee of ${tax}, totaling ${taxAmount}. The balance changed from ${debitBalance} to ${debitFutureBalance}.`
            })

            Log({
                userId: developerUserId,
                action: 'update',
                collectionName: 'Transaction',
                documentId: creditTransactionId,
                changes: { balance: creditFutureBalance },
                description: `Foreign user: ${developerUserId} with developer document id of ${developerId} attempted to transfer. ${creditAccount} credited an amount of ${transferAmount} The balance changed from ${creditBalance} to ${creditFutureBalance}`
            })

            res.json({ success: true, message: 'Transfer transaction successfully!', reference: debitTransactionId })
        } catch (error) {
            res.json({ error: `TransferTransaction in transaction controller error ${error}` });
        }
    },
    GetAllAuditLog: async (req, res) => {
        try {
            const data = await AuditLog.find()

            const formattedData = data.map(item => {
                const { _id, userId, action, collectionName, documentId, changes, description, createdAt } = item;

                const formattedCreatedAt = new Date(createdAt).toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return { _id, userId, action, collectionName, documentId, changes, description, date: formattedCreatedAt };
            });

            res.json({ success: true, message: 'Auditlog fetched successfully!', data: formattedData })
        } catch (error) {
            res.json({ error: `DeleteToken in developer controller error ${error}` });
        }
    },
    DeleteToken: async (req, res) => {
        try {
            const { tokenId } = req.params
            res.json({ success: true, message: 'Token deleted successfully!', tokenId })
        } catch (error) {
            res.json({ error: `DeleteToken in developer controller error ${error}` });
        }
    },
    BackUp: async (req, res) => {
        try {
            exec(`${mongodumpPath} --db ${dbName} --out ${dbName}backup`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error}`);
                    return res.json({ success: false, message: 'Failed to backup database!' });
                }
                res.json({ success: true, message: 'Backup completed successfully!' });
            });
        } catch (error) {
            res.json({ success: false, message: `Error backup in developer controller: ${error}` });
        }
    },

    Restore: async (req, res) => {
        try {
            exec(`${mongorestorePath} ${dbName}backup`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error restoring backup: ${stderr}`);
                    return res.json({ success: false, message: `Error restoring backup: ${stderr}` });
                }
                res.json({ success: true, message: 'Restore completed successfully!' });
            });
        } catch (error) {
            res.json({ success: false, message: `Error restore controller: ${error}` });
        }
    }
}

module.exports = DeveloperController