const login = async (req, res) => {
 res.send('Fake Login/Register/Signup Route')
}


const dashboard = async (req, res) => {
 const luckNumber = Math.floor(Math.random() * 100);
 res.status(200).json({
  msg: `Hello, khaled Ebrahim`,
  secret: `Here is your authorized data, your luck number is ${luckNumber}`
 })
}

module.exports = {
 login,
 dashboard
}