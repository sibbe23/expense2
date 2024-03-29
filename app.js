//requires
const path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database')
const cors = require('cors');
const dotenv = require('dotenv')
const app = express();

dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(cors())
app.use(express.json())

//routes
const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const resetPasswordRoutes = require('./routes/resetpassword')
const premiumFeatureRoutes = require('./routes/premiumFeature')

//models
const Expense = require('./models/expenses');
const User = require('./models/users');
const Order = require('./models/orders')
const Forgotpassword = require('./models/forgotpassword')

//controllers
app.use('/user',userRoutes)
app.use('/expense',expenseRoutes)
app.use('/purchase',purchaseRoutes)
app.use('/premium',premiumFeatureRoutes)
app.use('/password', resetPasswordRoutes);

app.use((req, res) => {
    console.log('urlllll',req.url)
    console.log('Success.')
      res.sendFile(path.join(__dirname, `views/${req.url}`));
    })

//userid
User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);




sequelize.sync().then(res=>{
    app.listen(4000);
})
.catch(err=>{
    console.log(err);
})
