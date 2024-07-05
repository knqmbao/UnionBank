const AccountModel = require('../models/Account.model')
const fetch = require('node-fetch')

const AccountController = {
    CreateAccount: async (req, res) => {
        try {
            const { accno } = req
            const { userId, accountType } = req.body

            const data = await AccountModel.create({ userId, accountno: accno, accountType })
            res.json({ success: true, message: 'Account created successfully!', data })
        } catch (error) {
            res.json({ error: `CreateAccount in account controller error ${error}` });
        }
    },
    GetAllAccount: async (req, res) => {
        try {
            const data = await AccountModel.find()
            res.json({ success: true, message: 'Fetch accounts successfully!', data })
        } catch (error) {
            res.json({ error: `GetAllAccount in account controller error ${error}` });
        }
    },
    GetUserAccount: async (req, res) => {
        try {
            const { uid } = req.params

            const { _id, userId, accountno, accountType, balance, isactive } = await AccountModel.findOne({ userId: uid })
            console.log({ _id, userId, accountno, accountType, balance, isactive })
            const formattedBalance = new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(balance);

            res.json({ success: true, message: 'Fetch accounts successfully!', data: { _id, userId, accountno, accountType, balance: formattedBalance, isactive } })
        } catch (error) {
            res.json({ error: `GetUserAccount in account controller error ${error}` });
        }
    },
    SearchAccount: async (req, res) => {
        try {
            const { searchId } = req.params
            console.log('Search Account Controller: ', searchId)
            const response = await fetch(`${process.env.REQUEST}/api/rbaccounts`, {
                headers: {
                    Authorization: `Bearer ${process.env.ADMIN_TOKEN}`
                }
            })

            if (!response.ok) return res.json({ success: false, message: 'API Request error from search account controller!' })

            const accounts = await response.json()
            const regex = new RegExp(searchId, 'i');

            // if (!searchId) { return res.json({ success: true, message: 'Fetched search account successfully!', data: accounts }) }

            const filteredData = accounts?.data?.filter((item) => {
                const { accountno, user } = item;
                const { name } = user;
                return regex.test(accountno) || regex.test(name);
            })

            // For Specific datas only
            // .map((item) => {
            //     const { accountno, user } = item;
            //     const { name } = user;
            //     return { accountno, name };
            // });

            console.log('the data: ', filteredData)

            res.json({ success: true, message: 'Fethced certain account successfully!', data: filteredData })
        } catch (error) {
            res.json({ error: `SearchAccount in account controller error ${error}` });
        }
    },
    UpdateAccount: async (req, res) => {
        try {
            const { accountId } = req.params
            const values = req.body
            console.log('Update Account Controller: ', values, accountId)


            res.json({ success: true, message: 'Account updated successfully!', values, accountId })
        } catch (error) {
            res.json({ error: `UpdateAccount in account controller error ${error}` });
        }
    },
    UpdateActiveAccount: async (req, res) => {
        try {
            const { accountId } = req.params
            const { isactive } = req.body
            console.log('Update Active Account Controller: ', isactive, accountId)

            const data = await AccountModel.findOneAndUpdate(
                { user: accountId },
                { isactive: isactive },
                { new: true }
            )
            res.json({ success: true, message: 'Account active updated successfully!', data })
        } catch (error) {
            res.json({ error: `UpdateActiveAccount in account controller error ${error}` });
        }
    }
}

module.exports = AccountController