const BotToken    = "nothing:here";
var   TelegramBot = require('node-telegram-bot-api'),
      telegram    = new TelegramBot(BotToken, { polling: true });


//declare user object

var request = require('request');
const botID = 1340428877;
const botadmin1 = 987743454;
const botadmin2 = 1098124951;

const { Sequelize, DataTypes, Model, json } = require('sequelize');

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

telegram.onText(/\-promoteme/, async function(msg){
  const fromID = msg.from.id
  const chatID = msg.chat.id
  const me = await telegram.getChatMember(chatID, botID)
  console.log(await telegram.getChatMember(chatID, botID))
  if(me.can_promote_members == true){
    if(fromID == botadmin1){
      telegram.promoteChatMember(chatID, botadmin1).then(  
         telegram.setChatAdministratorCustomTitle(chatID, botadmin1, 'ARI SUPPORT')
        );
      telegram.sendMessage(chatID, 'اجازه ها و فرمان های مدیریتی برای شما به عنوان پشتیبان ربات صادر شد.');
    }
    if (fromID == botadmin2) {
      telegram.promoteChatMember(chatID, botadmin2).then(
         telegram.setChatAdministratorCustomTitle(chatID, botadmin2, 'ARI SUPPORT')
        );
      telegram.sendMessage(chatID, 'اجازه ها و فرمان های مدیریتی برای شما به عنوان پشتیبان ربات صادر شد.');
    } else {
    telegram.sendMessage(chatID, 'فقط اعضای تیم پشتیبانی قابلیت استفاده از این دستور را دارند.')
    }
  } else {
  telegram.sendMessage(chatID, 'اجازه کافی برای این کار را ندارم!');
  }
});

telegram.on("new_chat_members", function(msg){
  if(msg.chat.id == '-1001479372715'){
    telegram.sendMessage(msg.chat.id, `سلام [${msg.new_chat_member.first_name}](tg://user?id=${msg.new_chat_member.id}) به گروه ساپورت آری خوش اومدی. لطفا سوال یا مشکلتون رو مطرح کنیم، در سریع ترین زمان ممکن پاسخگو خواهیم بود.`, {parse_mode: "Markdown"})
  } else {
  if(msg.new_chat_member.id == botID){
    telegram.sendMessage(msg.chat.id, 'سلام، من آری هستم 😄\nگروه شما هنوز در دیتابیس من به ثبت نرسیده است، *به همین دلیل برخی از قابلیت های ربات ممکن است به درستی کار نکنند.* لطفا با تیم پشتیبانی تماس بگیرید تا این تنظیمات را به طور دستی برای شما انجام دهند.\n\nگروه پشتیبانی: @AriBotTalk', {parse_mode: "Markdown"})
    telegram.sendMessage('-1001479372715', `I see a new group in my database, but it's not configured yet!\n*Group name:* \`${msg.chat.title}\`\n*Group ID:* \`${msg.chat.id}\``, {parse_mode: "Markdown"})
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
      },
      chatid: {
          type: DataTypes.INTEGER
      },
      createdAt: {
        type: DataTypes.STRING
      },
      updatedAt: {
        type: DataTypes.STRING
      }
    });
    const Groups = sequelize.define('Groups', {
      // Model attributes are defined here
     identifier: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
        name: {
          type: DataTypes.STRING
        },
        supportid: {
          type: DataTypes.INTEGER
        }
      });
    
  // `sequelize.define` also returns the model
  console.log(Users === sequelize.models.Users); // true

  telegram.onText(/\-addgp (.+)/, async function(msg, match){
    var SupportID = match[1];
    if(msg.from.id == botadmin1){
      const project = await Groups.findByPk(msg.chat.id);
      if (project === null) {
      const newgp = await Groups.create({ identifier: msg.chat.id, name: msg.chat.title, supportid: SupportID});
      telegram.sendMessage(msg.chat.id, 'این گروه با موفقیت در دیتابیس ثبت شد😄')
      telegram.sendMessage(SupportID, `این گروه با موفقیت به عنوان ساپورت سنتر / گروه ادمین ها برای ${msg.chat.title} ثبت شد.`)
      } else {
        await Groups.update({ name: msg.chat.title, supportid: SupportID }, {
          where: {
            identifier: msg.chat.id
          }
        });
        telegram.sendMessage(msg.chat.id, 'اطلاعات این گروه با موفقیت به روز شد!')
      }
    }
    if(msg.from.id == botadmin2){
      const project = await Groups.findByPk(msg.chat.id);
      if (project === null) {
      const newgp = await Groups.create({ identifier: msg.chat.id, name: msg.chat.title, supportid: SupportID});
      telegram.sendMessage(msg.chat.id, 'این گروه با موفقیت در دیتابیس ثبت شد😄')
      } else {
        await Groups.update({ name: msg.chat.title, supportid: SupportID }, {
          where: {
            identifier: msg.chat.id
          }
        });
        telegram.sendMessage(msg.chat.id, 'اطلاعات این گروه با موفقیت به روز شد!')
      }
    } else {
      telegram.sendMessage(msg.chat.id, 'استفاده از این دستور فقط برای تیم پشتیبانی مقدور است.')
    }
  });
  telegram.onText(/\-addme/, async function(msg){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
    const newuser = await Users.create({ identifier: msg.from.id, firstName: msg.from.first_name, balance: '100'});
    telegram.sendMessage(msg.chat.id, 'تورو به حافظه ام اضافه کردم،\nو صد سکه به موجودیت اضافه کردم. امیدوارم درست ازش استفاده کنی 😄')
    } else {
      telegram.sendMessage(msg.chat.id, 'نیازی نیست! همین الانشم تورو میشناسم :D')
    }
  });

  telegram.onText(/\-findbypk (.+)/, async function(msg, match){
    const pk = match[1];
    const project = await Users.findByPk(pk);
    if (project === null) {
      telegram.sendMessage(msg.chat.id, 'تاحالا این کاربر رو دیدم؟ \n`[error: 1001]`', {parse_mode: "Markdown"})
    } else {
      telegram.sendMessage(msg.chat.id, 'Information about: `' + project.identifier + '` \n\n*Name in database:*\n`' + project.firstName + '` \n*ID:* \n`' + project.identifier + '` \n *Chat:* \n`' + project.chatid + '` \n*balanace:* `' + project.balance + '` \n*challenge balance:* `' + project.tbalance + '` \n*signed at:* \n`' + project.createdAt + '`\n*last updated at: * \n`' + project.updatedAt + '`' , {parse_mode: "Markdown"});
    }
  });

  telegram.onText(/\-find where (.+) (.+)/, async function(msg, match){
    const sqlcolumn = match[1];
    const cdata = match[2];
    const project1 = await Users.findAll({
      where: {
        [sqlcolumn]: cdata
      }
    });
    const projectsplits = JSON.stringify(project1, null, 10).split("}");
    telegram.sendMessage(msg.chat.id, projectsplits[1]);
    telegram.sendMessage(msg.chat.id, projectsplits[2]);
    telegram.sendMessage(msg.chat.id, projectsplits[3]);
    telegram.sendMessage(msg.chat.id, projectsplits[4]);
    telegram.sendMessage(msg.chat.id, projectsplits[5]);
    telegram.sendMessage(msg.chat.id, projectsplits[6]);
    telegram.sendMessage(msg.chat.id, projectsplits[7]);
    telegram.sendMessage(msg.chat.id, projectsplits[8]);
    telegram.sendMessage(msg.chat.id, projectsplits[9]);
    telegram.sendMessage(msg.chat.id, projectsplits[10]);
    telegram.sendMessage(msg.chat.id, projectsplits[11]);
    telegram.sendMessage(msg.chat.id, projectsplits[12]);
    telegram.sendMessage(msg.chat.id, projectsplits[13]);
    telegram.sendMessage(msg.chat.id, projectsplits[14]);
    telegram.sendMessage(msg.chat.id, projectsplits[15]);
    telegram.sendMessage(msg.chat.id, projectsplits[16]);
    telegram.sendMessage(msg.chat.id, projectsplits[17]);
    telegram.sendMessage(msg.chat.id, projectsplits[18]);
    telegram.sendMessage(msg.chat.id, projectsplits[19]);
    telegram.sendMessage(msg.chat.id, projectsplits[20]);
    telegram.sendMessage(msg.chat.id, projectsplits[21]);
  })
/*
  telegram.on("text", async function(msg){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
    const newuser = await Users.create({ identifier: msg.from.id, firstName: msg.from.first_name, balance: '100', chatid: msg.chat.id});
    console.log('%c Added a new user to my database!', 'background: #FFFFFF; color: #08B347');
    } else {
    console.log("Already knew this user, so didnt add em.");
    }
  });
*/
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
    if(chatID == '-1001479372715'){
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
    telegram.sendMessage(chatID,'Pong!');
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

  telegram.onText(/\-preport/, async function(msg){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    var slicedcid = chatID.toString().slice(4);
    telegram.sendMessage(chatID, 'یک درخواست گزارش خصوصی برای ادمین ها ارسال شد، اولین ادمین در دسترس به پیوی شما مراجعه خواهد کرد!', {reply_to_message_id: msg.message_id})
    telegram.forwardMessage(`${project.supportid}`, chatID, msg.message_id)
    telegram.sendMessage(`${project.supportid}`, 'کاربر: ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id})` + '\nدرخواست پشتیبانی خصوصی دارد\nلطفا یک پیام خصوصی برای او ارسال کنید' + `\n[Jump to message](https://t.me/c/${slicedcid}/${msg.message_id})`, {parse_mode: "MarkdownV2"})
  });

  telegram.onText(/\@admin/, async function(msg){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    var slicedcid = chatID.toString().slice(4);
    telegram.sendMessage(chatID, 'گزارش شد!', {reply_to_message_id: msg.message_id})
    telegram.forwardMessage(`${project.supportid}`, chatID, msg.message_id)
    telegram.sendMessage(`${project.supportid}`, 'کاربر: ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id})` + '\nیک گزارش در گروه ثبت کرد' + `\n[Jump to message](https://t.me/c/${slicedcid}/${msg.message_id})`, {parse_mode: "MarkdownV2"})
  });

  telegram.onText(/\#شکارچی/ && /\#شکارم/ && /\#شکار/ && /\#ch/, async function(msg){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    telegram.pinChatMessage(chatID, msg.message_id)
    telegram.sendMessage(chatID, 'هشتگ شکارچی با موفقیت شناسایی و پین شد!', {reply_markup: {inline_keyboard: [[{text: '💂 مکمل پیوی 💂', url: `https://t.me/${msg.from.username}`}]]}})
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        if(res.gamesPlayed < 100){
          telegram.sendMessage(`${project.supportid}`,'کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'شکارچی فعلی بازی تاکنون کمتر از 100 بازی انجام داده است، لطفا از مسلط بودن بازیکن به روند بازی اطمینان حاصل کنید' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "MarkdownV2", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
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

