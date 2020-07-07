
//initialise telegram bot
const BotToken    = "1283080234:AAF6e9MrSLBQPdc_d0YnYsA_DMo-L_BiU4o";
var   TelegramBot = require('node-telegram-bot-api'),
      telegram    = new TelegramBot(BotToken, { polling: true });


//declare user object

var request = require('request');
const htmlToText = require('html-to-text');

const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});
/*
function start() {
  return myfunction();
}

// Call start
(async() => {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
};
*/
/*
  telegram.onText(/\-start/ && /\/start/, function(msg){
    telegram.sendMessage(msg.from.id, 'hello, how can i help you? ^^');
  });
*/

  telegram.on("polling_error", (err) => console.log(err));

telegram.onText(/\-sqlitetest/, async function(msg){
  if(msg.from.id = 987743454){
try{
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    telegram.sendMessage(msg.chat.id, 'Connection has been established successfully.')
 } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
});

  telegram.onText(/\/start/, function(msg){
    if(msg.text == '/start'){
      telegram.sendMessage(msg.from.id, 'چطور میتونم کمکت کنم؟ :)')
    }
  });

  const Users = sequelize.define('Users', {
    // Model attributes are defined here
   identifier: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
      firstName: {
        type: DataTypes.STRING
      },
      balance: {
        type: DataTypes.INTEGER
      },
      tbalance: {
        type: DataTypes.INTEGER
      }
    });
  
  // `sequelize.define` also returns the model
  console.log(Users === sequelize.models.Users); // true

  telegram.onText(/\-addme/, async function(msg){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
    const newuser = await Users.create({ identifier: msg.from.id, firstName: msg.from.first_name, balance: '100'});
    telegram.sendMessage(msg.chat.id, 'تورو به حافظه ام اضافه کردم،\nو صد سکه به موجودیت اضافه کردم. امیدوارم درست ازش استفاده کنی 😄')
    } else {
      telegram.sendMessage(msg.chat.id, 'نیازی نیست! همین الانشم تورو میشناسم :D')
    }
  });

  telegram.onText(/\-b/, async function(msg){
    if (msg.text == '-b'){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
      telegram.sendMessage(msg.chat.id, 'من تورو میشناسم؟')
    } else {
      telegram.sendMessage(msg.chat.id, `👤 ${project.firstName}\nموجودی: ${project.balance}💰\nامتیاز چالش: ${project.tbalance}🕹️`) 
}
    }
  });

  telegram.onText(/\-s/), async function(msg){
    if (msg.text == '-s'){
      
    }
  }

  telegram.onText(/\-chatid/, function(msg){
    var chatID = msg.chat.id
    telegram.sendMessage(chatID, `${chatID}`)
  });

  telegram.on("voice", function(msg){
    var chatID = msg.chat.id
    if(chatID == '-1001314805517'){
    telegram.sendMessage(chatID, `${msg.voice.file_id}`)
    }
  });

  
  telegram.onText(/\-id/, function(msg){
    var chatID = msg.chat.id
      telegram.sendMessage(chatID, '*User:* ' + `[${msg.reply_to_message.from.first_name}](tg://user?id=${msg.reply_to_message.from.id})` + '\n*Numberical ID:* ' + `${msg.reply_to_message.from.id}`, {parse_mode: "MarkdownV2"});

    telegram.sendMessage(chatID, '*User:* ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id})` + '\n*Numberical ID:* ' + `${msg.from.id}`, {parse_mode: "MarkdownV2"});

  });

  telegram.onText(/\-ping/, function(msg){
    var chatID = msg.chat.id
    ogg_url = "AwACAgQAAx0CTl5XDQADFl7ZfokiEmK7f8_AJ82YliV6y25KAALlBwAC-qWRUoczBzBjtxtrGgQ"
    telegram.sendVoice(chatID, ogg_url, {caption: 'آنلاین هستم 🙋', reply_to_message_id: msg.message_id})
    console.log('pong!')
  });

  telegram.onText(/\-echo (.+)/, function(msg,match){
    var chatID = msg.chat.id;
    var CID = msg.from.id;
    var echo = match[1];
    if(CID == '993040642' || '987743454'){
    telegram.sendMessage(chatID, echo)
    telegram.deleteMessage(chatID, msg.message_id)
    }
    /*
    if(CID == '987743454'){
      telegram.sendMessage(chatID, `${PM}`)
    }
    */
  });

  telegram.onText(/\-attack (.+)/, function(msg,match){
    var chatID = msg.chat.id;
    var CID = msg.from.id;
    var gpname = match[1];
    var wwinpersian = '[گروه گرگینه به فارسی](https://t.me/joinchat/Ot_E3lgtb6sQR-3b0WMW0w)'
    if (CID == '993040642' || '987743454') {
      if(gpname == 'mafiagame'){
        telegram.sendMessage(chatID,'پیام مخصوص اتک به گروه Mafia ɢᴀᴍᴇ🐺:')
        telegram.sendMessage(chatID, 'پرو پلیر عزیز گروه Mafia ɢᴀᴍᴇ🐺\nگروهی که شما در آن عضو هستید به دلیل *نقض قوانین ربات بلک* وارد لیست سیاه این ربات شده و *دیگر قادر به استفاده از رباتهای این مجموعه نیست*\!\n\n\nاگر هنوز مایل به استفاده از ربات بلک هستید\. میتوانید به ' + wwinpersian + ' بپیوندید و بجز لذت بردن از بازی، از جوایز نقدی و قدرت های اختصاصی این گروه استفاده کنید\.\n\n' + '[👥برای عضو شدن کلیک کنید👥](https://t.me/joinchat/Ot_E3lgtb6sQR-3b0WMW0w)', {parse_mode: "Markdown"})
       } else {
      telegram.sendMessage(chatID, 'نه، ما فقط بک  میزنیم :)')
      };
    } else {
      telegram.sendMessage(chatID, 'شما دسترسی به این دستور را از دست داده اید!')
    }

    /*
    if(CID == '987743454'){
      telegram.sendMessage(chatID, `${PM}`)
    }
    */
  });

  telegram.onText(/\-howto/, function(msg){
    var chatID = msg.chat.id
    ogg = "AwACAgQAAx0CTl5XDQADJF7dDg-vUF9TKfMQREF8a0XVr7XjAAIMCAACEFvoUrTOUr7a7linGgQ"
    telegram.sendVoice(chatID, ogg, {
      reply_to_message_id: msg.message_id,
      reply_markup: {inline_keyboard: [[{text: 'ورود به گروه آموزشی', url: 'https://t.me/ww_totu'}]]}
    })
    
    console.log('Asked an HowTo')
  });

  telegram.onText(/\-preport/, function(msg){
    var chatID = msg.chat.id
    telegram.sendMessage(chatID, 'یک درخواست گزارش خصوصی برای ادمین ها ارسال شد، اولین ادمین در دسترس به پیوی شما مراجعه خواهد کرد!', {reply_to_message_id: msg.message_id})
    telegram.forwardMessage('-1001224159953', chatID, msg.message_id)
    telegram.sendMessage('-1001224159953', 'کاربر: ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id})` + '\nدرخواست پشتیبانی خصوصی دارد\nلطفا یک پیام خصوصی برای او ارسال کنید' + `\n[Jump to message](https://t.me/c/1479372715/${msg.message_id})`, {parse_mode: "MarkdownV2"})
  });

  telegram.onText(/\#شکارچی/ && /\#شکارم/ && /\#شکار/, function(msg){
    var chatID = msg.chat.id
    telegram.pinChatMessage(chatID, msg.message_id)
    telegram.sendMessage(chatID, 'هشتگ شکارچی با موفقیت شناسایی و پین شد!', {reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        if(res.gamesPlayed < 100){
          telegram.sendMessage('-1001224159953','کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'شکارچی فعلی بازی تاکنون کمتر از 100 بازی انجام داده است، لطفا از مسلط بودن بازیکن به روند بازی اطمینان حاصل کنید' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "MarkdownV2", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
        }
      }
    }
  )});

  telegram.onText(/\-getchat/, function(msg){
    var chatID = msg.chat.id
    telegram.exportChatInviteLink(chatID)
    telegram.getChat(chatID)
  })

/*
  telegram.on("new_chat_members", function(msg){
    var chatID = msg.chat.id
    if(msg.from.id != 987743454 && msg.new_chat_members.id == 1283080234){
      telegram.sendVoice(chatID, "AwACAgQAAx0CTl5XDQADGF7ZhQkQwFSxNjDCM9JJES9ng3i1AALDCAACa37IUoQjcrvI2_jBGgQ", {caption: '*Powered by:*' + '\n@werewolf_in_persian', parse_mode: "Markdown"})
      telegram.leaveChat(chatID)
      console.log(`${msg.from.first_name} [@${msg.from.username}] (${msg.from.id}) Added me to ${msg.chat.title} (${msg.chat.id})`)
    }else{
      telegram.sendMessage(chat`hi ${msg.new_chat_members.id}`)
    }
  });
*/
  telegram.onText(/\-stats (.+)/, function(msg,match){
    var chatID = msg.chat.id
    var ID = match[1];
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${ID}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        var totalStats = body.gamesPlayed;
        if(res.gamesPlayed != null){
           telegram.sendMessage(chatID, 'Total: ' + res.gamesPlayed + '\nWon: ' + res.won.total + ' (' + res.won.percent + '%)\nLost: ' + res.lost.total + ' (' + res.lost.percent + '%)');
        }else{
          telegram.sendMessage(chatID, `${ID} has no stats yet!`)
        }
        console.log(`requested stats for ${ID}`);
        return;
      }
    });

    telegram.onText(/\-echo (.+)/, function(msg,match){
      var chatID = msg.chat.id;
      var echo = match[1];
      telegram.sendMessage(chatID, echo)
      /*
      if(CID == '987743454'){
        telegram.sendMessage(chatID, `${PM}`)
      }
      */
    });
  }); 


