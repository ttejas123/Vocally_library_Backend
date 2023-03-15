const UserDB = require('../DBs/user');
const QuoteModel = require('../Models/Quotes')
const UserModel = require('../Models/User')

const resolvers = {
    Query: {
      users: async() => await UserModel.find({}),
      user: async(parent, args) => await UserModel.findById(args.id),
      quotes: async() => await QuoteModel.find({}),
      quote: async(parent, args) => await QuoteModel.findById(args.id)
    },
    Mutation: {
      createUser: async(parent, args) => {
          const NewUser = new UserModel({
            ...args.userNew
          })

          const register = await NewUser.save();
  
          return register;
      },
      deleteUser: (parent, args) => {
        
        let indeX = -1;
        UserDB.find((val, index) => {
          if(val.id == args.id) indeX = index;
        });
        console.log(indeX)
        if(indeX != -1) UserDB.splice(indeX, 1);
  
        return "Deletion Succesful"
        
      },
      createQuote: async(parent, args) => {

            const newQuote = new QuoteModel({
                ...args.quoteNew
            })

            const register = await newQuote.save();

            return register;
      }
    },
    User: {
      quotes: async(ur)=> await QuoteModel.find({by: ur._id})
    }
}

module.exports = resolvers;