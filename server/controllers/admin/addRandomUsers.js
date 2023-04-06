import User from "../../models/User.js"
import UserInfo from "../../models/UserInfo.js"
import { faker } from '@faker-js/faker';
import moment from 'moment';
import PremiumUser from "../../models/PremiumUsers.js";
import Transaction from "../../models/Transactions.js";

export const addRandomUsers = async (req, res) => {
    try {
        const numDocuments = 20;
        // throw null

        const addUsers = async () => {
            // Set the password hash for all users
            const passwordHash = '$2a$10$9P43pXa7V5KBrw5M6cwPveXz1FT7tTInQd9WV4Y5dS1KRhicRscHC';

            // Create an array to store the documents
            const documents = [];

            // Loop through the desired number of documents
            for (let i = 0; i < numDocuments; i++) {
                // Generate a random name and email address
                const name = faker.name.fullName().split(' ')[0];
                const email = faker.internet.email();

                // Generate a random createdAt date between 10 months ago and now
                const createdAt = moment(faker.date.between(moment().subtract(0, 'months').toDate(), new Date())).toISOString();

                // Create the document object and add it to the array
                documents.push({
                    name,
                    email,
                    password: passwordHash,
                    role: 'user',
                    createdAt,
                });
            }
            await User.insertMany(documents)
            res.status(200).json({ documents })
        }

        const addProUsers = async () => {
            try {
                const users = await User.find({}).select(['_id'])
                const ids = users.map(doc => doc._id)

                // res.status(200).json(ids)

                function generateMongoDates() {
                    // Generate a random integer between 1 and 2
                    const randomInt = Math.floor(Math.random() * 2) + 1;

                    // Generate a random date within the past 24 months
                    const createdAt = new Date(Date.now() - Math.floor(Math.random() * 1 * 365 * 24 * 60 * 60 * 1000));

                    let validUntil;
                    if (randomInt === 1) {
                        // Valid until 30 days from createdAt
                        validUntil = new Date(createdAt.getTime() + 30 * 24 * 60 * 60 * 1000);
                    } else {
                        // Valid until 1 year from createdAt
                        validUntil = new Date(createdAt.getTime() + 365 * 24 * 60 * 60 * 1000);
                    }

                    // Return the createdAt and validUntil dates as an array
                    const plan = randomInt === 1 ? 'monthly' : 'yearly'
                    return [createdAt, validUntil, plan];
                }
                const document = []

                for (let i = 0; i < 200; i++) {

                    const [createdAt, validUntil, plan] = generateMongoDates()

                    const isPremium = await PremiumUser.findOne({ userId: ids[i] })

                    if (isPremium) continue


                    document.push({
                        userId: ids[i],
                        isPremium: validUntil < new Date() ? false : true,
                        plan: plan,
                        validUntil: validUntil,
                        createdAt: createdAt,
                    })

                }
                // await PremiumUser.insertMany(document)

                res.status(200).json(document)
            }
            catch (err) {
                res.status(500).json(err.message)
            }
        }
        // addProUsers()

        // Add random transactions
        const addTransactions = async () => {
            try {

                const premiumUsers = await PremiumUser.find()

                const transactions = []
                // {
                //     "plan": "monthly",
                //     "_id": "642ac11a011db8e5bc3eb1bc",
                //     "userId": "63f065753149bc5f0fe642ca",
                //     "isPremium": true,
                //     "validUntil": "2024-04-03T12:05:46.274Z",
                //     "createdAt": "2023-04-03T12:05:46.279Z",
                //     "updatedAt": "2023-04-03T12:05:46.279Z",
                //     "__v": 0
                // },

                premiumUsers.forEach((user) => {
                    transactions.push({
                        userId: user.userId,
                        amount: user.plan == 'monthly' ? 5 : 50,
                        method: 'card',
                        plan: user.plan,
                        status: 'success',
                        createdAt: user.createdAt,
                    })
                })

                // await Transaction.insertMany(transactions)

                res.status(200).json(transactions)
            }
            catch (err) {
                console.log(err.message)
                res.status(500).json(err.message)
            }
        }
        // addTransactions()

        const insertRandomUserInfo = async () => {

            const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]

            function getRandomCountry() {
                const randomIndex = Math.floor(Math.random() * countries.length - 1);
                return countries[randomIndex];
            }

            function capitalize(s) {
                return s[0].toUpperCase() + s.slice(1);
            }

            const users = await User.find()

            const doc = []


            for (const user of users) {

                const userInfo = await UserInfo.findOne({ _id: user._id })

                if (!userInfo) {
                    doc.push({
                        _id: user._id,
                        firstName: capitalize(user.name),
                        lastName: faker.name.lastName(),
                        about: `Hey there, it's me ${capitalize(user.name)}.`,
                        location: getRandomCountry()
                    })
                }

            }


            await UserInfo.insertMany(doc)
            res.status(200).json(doc)

        }
        // insertRandomUserInfo()

    }
    catch (error) {
        console.log(error.message)
    }
}