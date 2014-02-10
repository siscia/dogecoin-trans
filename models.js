var mongo = require('mongoose')

var User = new mongo.Schema({
  wallet: String,
  psw: String,
  ballance: Number,
  history : [{action: String,
              date: Date,
              oldBalace: Number,
              newBalance: Number,
              from: String,
              to: String}]});

function generateReport(user, history){
  var report = {code: 1,
                wallet: user.wallet,
                ballance: user.ballance,
                action: history};
  return report;
}

var NewUser = function(wallet, psw, ballance){
  var ball = ballance || 0;
  var history = {action: "Create",
                 date: Date.now,
                 newBalance: ball};
  var u = new User({wallet: wallet,
                    psw: psw,
                    ballance: ballance});

  u.history.push(history);
  u.markModified('history');
  u.safe();
  return generateReport(u, history);
}

var Withdraw = function(wallet, ammount){
  var u = User.findOne({wallet: wallet});
  if (u.ballance > ammount) {
    var oldBallance = u.ballance;
    u.ballance -= ammount; /*I actually need to transfer the money */
    var history = {action: "Withdraw",
                   date: Date.now,
                   oldBallance: oldBallance,
                   newBallance: u.ballance};
    u.history.push(history);
    u.markModified('history');
    u.save();
    return generateReport(u, history);
  } else {
    return {code: 201,
            message: "Not enough Doge to make the Withdraw",
            ballance: u.ballance,
            ammount: ammount}
  }
}

var Deposit = function(wallet, ammount){
  var u = User.findOne({wallet: wallet});
  var oldBallance = u.ballance;
  u.ballance += ammount;
  var history = {action: "Deposit",
                 date: Date.now,
                 oldBallance: oldBallance,
                 newBallance: u.ballance};
  u.history.push(history);
  u.markModified('history');
  u.save();
  return generateReport(u, history);
}

var Ballance = function(wallet) {
  var u = User.findOne({wallet: wallet});
  var history = {action: "Ballance",
                 date: Date.now}
  u.history.push(history);
  u.markModified('history');
  u.save();
  return generateReport(u, history);
}

var Donation = function(walletFrom, walletTo, ammount){
  var from = User.findOne({wallet: walletFrom});
  var to = User.findOne({wallet: walletTo});
  if (from.ballance > ammount){
    var oldFrom = from.ballance;
    from.ballance -= ammount;
    var historyFrom = {action: "Make Donation",
                       date: Date.now,
                       oldBallance: oldFrom,
                       newBallance: from.ballance,
                       to: walletTo}
    from.history.push(historyFrom);
    from.markModified('history');
    from.save();
    var oldTo = to.ballance;
    to.ballance += ammount; /* I should keep one DOGE*/
    var historyTo = {action: "Received Donation",
                     date: Date.now,
                     oldBallance: oldTo,
                     newBallance: to.ballance,
                     from: walletFrom}
    to.history.push(historyTo);
    to.markModified('history');
    to.save();
    return generateReport(from, historyFrom);
  }
  return {code: 102,
          message: "Not enough Doge to make the Donation",
          ballance: from.ballance,
          ammount: ammount};
}