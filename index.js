//initialise telegram bot
const token    = "nothing:here";
const TelegramBot = require('node-telegram-bot-api');
const telegram = new TelegramBot(token, {polling: true});
//declare user object
var request = require('request');
const botID = 1340428877;
const botadmin1 = 987743454;
const botadmin2 = 1098124951;
const botadmin3 = 105088602;

const { Sequelize, DataTypes, Model, json } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
});


  telegram.on("polling_error", (err) => console.log(err));

telegram.onText(/\/sqlitetest/, async function(msg){
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
      telegram.promoteChatMember(chatID, botadmin1, {can_pin_messages: true, can_delete_messages: true}).then(  
         telegram.setChatAdministratorCustomTitle(chatID, botadmin1, 'ARI SUPPORT')
        );
      telegram.sendMessage(chatID, 'اجازه ها و فرمان های مدیریتی برای شما به عنوان پشتیبان ربات صادر شد.');
    }
    if (fromID == botadmin2) {
      telegram.promoteChatMember(chatID, botadmin2, {can_pin_messages: true, can_delete_messages: true}).then(
         telegram.setChatAdministratorCustomTitle(chatID, botadmin2, 'ARI SUPPORT')
        );
      telegram.sendMessage(chatID, 'اجازه ها و فرمان های مدیریتی برای شما به عنوان پشتیبان ربات صادر شد.');
    } else {
    telegram.sendMessage(chatID, 'فقط اعضای تیم پشتیبانی قابلیت استفاده از این دستور را دارند.')
    }
  } else {
  telegram.sendMessage(chatID, 'اجازه کافی برای این کار را ندارم!');
  }
})

telegram.on("new_chat_members", async function(msg){
  if(msg.chat.id == '-1001479372715'){
    telegram.sendMessage(msg.chat.id, `سلام [${msg.new_chat_member.first_name}](tg://user?id=${msg.new_chat_member.id}) به گروه ساپورت آری خوش اومدی. لطفا سوال یا مشکلتون رو مطرح کنیم، در سریع ترین زمان ممکن پاسخگو خواهیم بود.`, {parse_mode: "Markdown"})
  } else {
  if(msg.new_chat_member.id == botID){
    telegram.sendMessage(msg.chat.id, 'سلام، من آری هستم 😄\nگروه شما هنوز در دیتابیس من به ثبت نرسیده است، *به همین دلیل برخی از قابلیت های ربات ممکن است به درستی کار نکنند.* لطفا با تیم پشتیبانی تماس بگیرید تا این تنظیمات را به طور دستی برای شما انجام دهند.\n\nگروه پشتیبانی: @AriBotTalk', {parse_mode: "Markdown"})
    telegram.sendMessage('-1001479372715', `I see a new group in my database, but it's not configured yet!\n*Group name:* \`${msg.chat.title}\`\n*Group ID:* \`${msg.chat.id}\``, {parse_mode: "Markdown"})
  } else {
  const project = await Groups.findByPk(msg.chat.id);
  if(project != null){
  request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
    if(!error && response.statusCode == 200){
      var res = JSON.parse(body);
      if(res.gamesPlayed < 20){
        telegram.sendMessage(`${project.supportid}`,'کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'اخیرا وارد گروه شده است. این بازیکن دارای استتس پایین تر از حد مجاز است، لطفا از مسلط بودن او به روند بازی اطمینان حاصل کنید!' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "Markdown", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
      }
    }
  }
)}
}}
});

  telegram.onText(/\/gamble (.+)/, async function(msg, match){
    const gamblevalue = match[1];
    if(gamblevalue == ''){
      telegram.sendMessage(msg.chat.id, 'لطفا مشخص کنید چه مقدار از پولتان را میخواهید ریسک کنید، مثال:\n */gamble 100*', {parse_mode: "Markdown"})
    } else {
      const project = await Users.findByPk(msg.from.id);
      if(project.balance >= gamblevalue){
    function between(min, max) {  
      return Math.floor(
        Math.random() * (max - min) + min
      )
    }
    const randomnum = between(-gamblevalue, gamblevalue);
    const check = randomnum.toString().startsWith('-')
    if(check == true){
      await project.update({ balance: project.balance + randomnum })
      telegram.sendMessage(msg.chat.id, '*باختی!*\n' + `${randomnum}- سکه ازت کم کردم :(`, {parse_mode: "Markdown"})
    } else {
      await project.update({ balance: project.balance + randomnum })
      telegram.sendMessage(msg.chat.id, '*بردی!*\n' + `-${randomnum}- سکه بهت اضافه کردم :)`, {parse_mode: "Markdown"})
    } } else {
      telegram.sendMessage(msg.chat.id, 'جیبت پر شد برگرد 🕸️')
    }
    telegram.sendMessage(msg.chat.id, randomnum)
    }
  })

  telegram.onText(/\-leavechat (.+) (.+)/, function(msg, match){
    if(msg.from.id == botadmin1){
      const gpid = match[1];
      const reason = match[2];
      telegram.sendMessage(gpid, 'با سلام،\n' + 'این ربات از طرف تیم سازنده برای گروه شما غیرفعال شد و خارج میشود. لطفا برای اطلاعات بیشتر وارد [گروه پشتیبانی](https://t.me/aribottalk) شوید. \n*دلیل:*' + `\`${reason}\``, {parse_mode: "Markdown"}).then(
      telegram.leaveChat(gpid));
      telegram.sendMessage(msg.chat.id, `از ${gpid} خارج شدم. \n reason: ${reason}`)
    }
    if(msg.from.id == botadmin2){
      const gpid = match[1];
      const reason = match[2];
      telegram.sendMessage(gpid, 'با سلام،\n' + 'این ربات از طرف تیم سازنده برای گروه شما غیرفعال شد و خارج میشود. لطفا برای اطلاعات بیشتر وارد [گروه پشتیبانی](https://t.me/aribottalk) شوید. \n*دلیل:*' + `\`${reason}\``, {parse_mode: "Markdown"}).then(
      telegram.leaveChat(gpid));
      telegram.sendMessage(msg.chat.id, `از ${gpid} خارج شدم. \n reason: ${reason}`)
    }
  })

  telegram.onText(/\/start/, function(msg){
    if(msg.text == '/start'){
      const check = msg.chat.id.toString().startsWith('-')
      if(check == false){
        const opts = {
          reply_to_message_id: msg.message_id,
          reply_markup: JSON.stringify({
            keyboard: [
              ['🍭 ثبت هشتگ اختصاصی 🍭']
            ]
          })
        };
      telegram.sendMessage(msg.from.id, 'چطور میتونم کمکت کنم؟ :)\n برای دیدن لیست دستورات اینجا کلیک کنید: /help', opts)
      } else {
        telegram.sendMessage(msg.chat.id, 'این دستور فقط توی پیوی قابل استفاده ست.')
      }
    }
  });
  telegram.onText(/\🍭 ثبت هشتگ اختصاصی \🍭/, async function(msg){
    const check = msg.chat.id.toString().startsWith('-')
    if(check == false){
      const project1 = await Users.findByPk(msg.from.id)
      const project2 = await Groups.findByPk(project1.chatid)
      if (project2 != null){
        const opts = {
          reply_to_message_id: msg.message_id,
          reply_markup: JSON.stringify({
            keyboard: [
              ['بله، هشتگ من رو ثبت کن.'],
              ['نه، منصرف شدم!']
            ]
          })
        }; 
        telegram.sendMessage(msg.from.id, 'برای انجام اینکار به 3000 سکه یا 500 امتیاز چالش نیاز دارید. بعد از ثبت این مقدار از حساب شما کم خواهد شد (اولویت با سکه است) \n\n' + `توجه کنید شما در حال ثبت یک هشتگ درگروه ${project2.name} هستید. آیا مایلید ادامه دهید؟`, opts)
      } else {
        telegram.sendMessage(msg.from.id, 'یک خطا رخ داده است!\n`[ERROR: 1001]`',{parse_mode: "Markdown"})
      }
    }
  });

  telegram.onText(/نه\، منصرف شدم\!/, function(msg){
    telegram.sendMessage(msg.from.id,'حله!',{reply_markup: {remove_keyboard: true}})
  })

  telegram.onText(/بله\، هشتگ من رو ثبت کن\./, async function(msg){
    const check = msg.chat.id.toString().startsWith('-')
    if(check == false){
      const project1 = await Users.findByPk(msg.from.id)
      const project2 = await Groups.findByPk(project1.chatid);
      if(project1.balance >= 3000){
        await project1.update({ balance: project1.balance - 3000 })
    telegram.sendMessage(msg.from.id, 'لطفا نام هشتگ خود را وارد کنید (برای مثال #یک_هشتگ) هشتگ شما باید با # شروع شود و شامل حروف فارسی یا انگلیسی و آندرلاین شود، فاصله در هشتگ مجاز نیست:', {reply_markup: {remove_keyboard: true}})
    telegram.on("text", function(msg2) {
      if(msg2.chat.id == project1.identifier){
        if(msg2.text != "بله، هشتگ من رو ثبت کن."){
      if(msg2.text.startsWith('#') == true){
        telegram.sendMessage(msg2.from.id, 'لطفا محتوای هشتگ را ارسال کنید (میتواند متن، ویس، گیف یا رسانه باشد):');
        telegram.on("message", function(msg3){
          if(msg3.chat.id == project1.identifier){
          telegram.sendMessage(project2.supportid, `[این کاربر](tg://user?id=${msg.from.id}) (@${msg.from.username}) یک هشتگ در گروه ثبت کرده است: \n نام هشتگ: \`${msg2.text}\`` + '\n*درصورت تایید این هشتگ آنرا با دستور /extra در گروه اصلی ثبت کنید.*',{parse_mode: "Markdown"});
          telegram.forwardMessage(project2.supportid, msg3.chat.id, msg3.message_id);
          telegram.sendMessage(msg.from.id, 'هشتگ شما با موفقیت ثبت شد و پس از تایید مدیران گروه قابل استفاده است.');
        }}); 
      } else {
        telegram.sendMessage(msg.from.id, 'هشتگ شما باید با # شروع شود.')
      }}
      return; 
    }
    })} else {
      telegram.sendMessage(msg.from.id, `موجودی شما کافی نیست!\n` + `*موجودی شما*: ${project1.balance}\n` + `*قیمت:* \`3000\``, {parse_mode: "Markdown"})
    }    
    }
  });

  telegram.onText(/\/pay (.+)/, async function(msg, match){
    const chatmember = await telegram.getChatMember(msg.chat.id, msg.from.id)
    if(chatmember.status == "administrator"){
      const project1 = await Users.findByPk(msg.reply_to_message.from.id);
      if(project1.chatid == msg.chat.id){
        await project1.update({balance: project1.balance + match[1]})
      telegram.sendMessage(msg.chat.id, `به [این کاربر](tg://user?id=${msg.reply_to_message.from.id}) به مقدار ${match[1]} سکه اضافه شد.`, {parse_mode: "Markdown"})
    } else {
      telegram.sendMessage(msg.chat.id, "این کاربر در گروه شما به ثبت نرسیده است. باید از دستور /addme استفاده کند.", {parse_mode: "Markdown"})
    }
    } else {
      telegram.sendMessage(msg.chat.id, "شما ادمین نیستید.");
    }
  });

  telegram.onText(/\/help/, function(msg){
    telegram.sendMessage(msg.from.id, "یک دسته بندی انتخاب کنید:", {parse_mode: "Markdown", reply_markup: {inline_keyboard: [[{text: 'سکــ💰ـه و امتیاز', url: 'https://telegra.ph/%D8%AF%D8%B3%D8%AA%D9%88%D8%B1%D8%A7%D8%AA-%D8%B3%DA%A9%D9%87-%D8%A7%D9%85%D8%AA%DB%8C%D8%A7%D8%B2-%D9%88-%D8%AF%DB%8C%D8%AA%D8%A7%D8%A8%DB%8C%D8%B3-07-29'}, {text: 'سایر خدمات و دستورات بیشتر...', url: `https://t.me/${msg.from.username}`}]]}})
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
    if(msg.from.id == botadmin3){
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
    }
  });
  telegram.onText(/\/addme/, async function(msg){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
    const newuser = await Users.create({ identifier: msg.from.id, firstName: msg.from.first_name, balance: '100', chatid: msg.chat.id});
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

  telegram.on("text", async function(msg){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
      if(msg.chat.id != '-1001479372715'){
    const newuser = await Users.create({ identifier: msg.from.id, firstName: msg.from.first_name, balance: '100', chatid: msg.chat.id});

    }}
  });

  telegram.onText(/\/b/, async function(msg){
    if(msg.text == "/b"){
    const project = await Users.findByPk(msg.from.id);
    const project2 = await Groups.findByPk(project.chatid);
    if (project === null) {
      telegram.sendMessage(msg.chat.id, 'من تورو میشناسم؟')
    } else {
      telegram.sendMessage(msg.chat.id, `👤 ${project.firstName}\nگروه: ${project2.name}\nموجودی: ${project.balance}💰\nامتیاز چالش: ${project.tbalance}🕹️`) 
  }}
  });

  telegram.onText(/\/complete (.+) (.+)/, async function(msg, match){
    const uid = match[1];
    const task = match[2];
    const SUPPORTID = '-1001187919974';
    const MAINGP = '-1001418366073';
    const project = await Users.findByPk(uid);
    if(msg.chat.id == SUPPORTID){
      if(task == 'task1'){
        const taskname = "دعوت کننده";
        const taskreward = 20;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task2'){
        const taskname = "تنهای پرو";
        const taskreward = 50;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP, `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      } 
      if(task == 'task3'){
        const taskname = "Pro Hunter";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }    
       if(task == 'task4'){
        const taskname = "کمر که نیس";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      } 
      if(task == 'task5'){
        const taskname = "محافظ چوسان قدیم";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task6'){
        const taskname = "ملی و راه های نرفته اش";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task7'){
        const taskname = "شانس مایه";
        const taskreward = 100;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task8'){
        const taskname = "روستایی نوب";
        const taskreward = 30;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task9'){
        const taskname = "بنای پروو";
        const taskreward = 20;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task10'){
        const taskname = "به نوعی فاحشه";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task11'){
        const taskname = "جومونگ واید";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task12'){
        const taskname = "یک عدد نوب";
        const taskreward = 20;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task13'){
        const taskname = "عاشقانه های من و تو";
        const taskreward = 60;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task14'){
        const taskname = "خوش شانسی";
        const taskreward = 30;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task15'){
        const taskname = "بابک زنجانی (قاتل)";
        const taskreward = 70;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task16'){
        const taskname = "بابک زنجانی (شکار)";
        const taskreward = 30;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task17'){
        const taskname = "کارمند وایلد";
        const taskreward = 150;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task18'){
        const taskname = "لوک خوش شانس";
        const taskreward = 45;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task19'){
        const taskname = "مشارکت";
        const taskreward = 30;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task20'){
        const taskname = "مشارکت و برنده شدن";
        const taskreward = 60;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }       
      if(task == 'task21'){
        const taskname = "قاتل پروو";
        const taskreward = 40;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
      if(task == 'task22'){
        const taskname = "درگاز";
        const taskreward = 30;
        await project.update({ tbalance: project.tbalance + taskreward })
        telegram.sendMessage(msg.chat.id, `امتیاز با موفقیت واریز شد.`)
        telegram.sendMessage(MAINGP `کاربر [${project.firstName}](tg://user?id=${project.identifier}) ` + 'ماموریت زیر رو انجام داد: \n\n' + `✨ *${taskname}*\n` + ` به همین خاطر بهش ${taskreward} امتیاز دادم!`, {parse_mode: "Markdown"})
        telegram.sendMessage(uid, `*تبریک!*\n` + 'شما ماموریت زیر رو با موفقیت انجام دادید:\n' + `*${taskname}*` + `\nحالا ${project.tbalance} امتیاز دارید.`, {parse_mode: "Markdown"})
      }
    } else {
      telegram.sendMessage(msg.chat.id, 'این دستور فقط از طریق گروه مدیریتی قابل اجرا است.')
    }
  })

  telegram.onText(/\/s/), async function(msg){
    if (msg.text == '/s'){
      
    }
  }

  telegram.onText(/\/chatid/, function(msg){
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
      telegram.sendMessage(chatID, '*User:* ' + `[${msg.reply_to_message.from.first_name}](tg://user?id=${msg.reply_to_message.from.id})` + '\n*Numberical ID:* ' + `${msg.reply_to_message.from.id}`, {parse_mode: "Markdown"});

  });

  telegram.onText(/\/ping/, function(msg){
    var chatID = msg.chat.id
    telegram.sendMessage(chatID,'Pong!');
  });

  telegram.onText(/\/echo (.+)/, function(msg,match){
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

  telegram.onText(/\/preport/, async function(msg){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    var slicedcid = chatID.toString().slice(4);
    telegram.sendMessage(chatID, 'یک درخواست گزارش خصوصی برای ادمین ها ارسال شد، اولین ادمین در دسترس به پیوی شما مراجعه خواهد کرد!', {reply_to_message_id: msg.message_id})
    telegram.forwardMessage(`${project.supportid}`, chatID, msg.message_id)
    telegram.sendMessage(`${project.supportid}`, 'کاربر: ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id})` + '\nدرخواست پشتیبانی خصوصی دارد\nلطفا یک پیام خصوصی برای او ارسال کنید' + `\n[Jump to message](https://t.me/c/${slicedcid}/${msg.message_id})`, {parse_mode: "Markdown"})
  });
/*
  telegram.onText(/\@admin/, async function(msg){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    var slicedcid = chatID.toString().slice(4);
    telegram.sendMessage(chatID, 'گزارش شد!', {reply_to_message_id: msg.message_id})
    telegram.sendMessage(`${project.supportid}`, 'کاربر: ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id})` + '\nیک گزارش در گروه ثبت کرد' + `\n[Jump to message](https://t.me/c/${slicedcid}/${msg.message_id})`, {parse_mode: "Markdown"})
  });
*/
  telegram.onText(/\#ch/, async function(msg){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    telegram.pinChatMessage(chatID, msg.message_id)
    telegram.sendMessage(chatID, 'هشتگ شکارچی با موفقیت شناسایی و پین شد!', {reply_markup: {inline_keyboard: [[{text: '💂 مکمل پیوی 💂', url: `https://t.me/${msg.from.username}`}]]}})
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        if(res.gamesPlayed < 100){
          telegram.sendMessage(`${project.supportid}`,'کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'شکارچی فعلی بازی تاکنون کمتر از 100 بازی انجام داده است، لطفا از مسلط بودن بازیکن به روند بازی اطمینان حاصل کنید' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "Markdown", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
        }
      }
    }
  )});

  telegram.onText(/\#شکارچی/, async function(msg){
    if(msg.text == "#شکارچی"){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    telegram.pinChatMessage(chatID, msg.message_id)
    telegram.sendMessage(chatID, 'هشتگ شکارچی با موفقیت شناسایی و پین شد!', {reply_markup: {inline_keyboard: [[{text: '💂 مکمل پیوی 💂', url: `https://t.me/${msg.from.username}`}]]}})
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        if(res.gamesPlayed < 100){
          telegram.sendMessage(`${project.supportid}`,'کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'شکارچی فعلی بازی تاکنون کمتر از 100 بازی انجام داده است، لطفا از مسلط بودن بازیکن به روند بازی اطمینان حاصل کنید' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "Markdown", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
        }
      }
    }
  )}});

  telegram.onText(/\#شکارم/, async function(msg){
    if(msg.text == "#شکارم"){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    telegram.pinChatMessage(chatID, msg.message_id)
    telegram.sendMessage(chatID, 'هشتگ شکارچی با موفقیت شناسایی و پین شد!', {reply_markup: {inline_keyboard: [[{text: '💂 مکمل پیوی 💂', url: `https://t.me/${msg.from.username}`}]]}})
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        if(res.gamesPlayed < 100){
          telegram.sendMessage(`${project.supportid}`,'کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'شکارچی فعلی بازی تاکنون کمتر از 100 بازی انجام داده است، لطفا از مسلط بودن بازیکن به روند بازی اطمینان حاصل کنید' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "Markdown", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
        }
      }
    }
  )}});

  telegram.onText(/\#شکار/, async function(msg){
    if(msg.text == "#شکار"){
    const project = await Groups.findByPk(msg.chat.id);
    var chatID = msg.chat.id
    telegram.pinChatMessage(chatID, msg.message_id)
    telegram.sendMessage(chatID, 'هشتگ شکارچی با موفقیت شناسایی و پین شد!', {reply_markup: {inline_keyboard: [[{text: '💂 مکمل پیوی 💂', url: `https://t.me/${msg.from.username}`}]]}})
    request(`http://blackwerewolf.com/Stats/PlayerStats/?pid=${msg.from.id}&json=true`,function(error,response,body){
      if(!error && response.statusCode == 200){
        var res = JSON.parse(body);
        if(res.gamesPlayed < 100){
          telegram.sendMessage(`${project.supportid}`,'کاربر ' + `[${msg.from.first_name}](tg://user?id=${msg.from.id}) ` + 'شکارچی فعلی بازی تاکنون کمتر از 100 بازی انجام داده است، لطفا از مسلط بودن بازیکن به روند بازی اطمینان حاصل کنید' + '\n\n *کل بازی های انجام شده*: ' + res.gamesPlayed + '\n *برد*: ' + res.won.total , {parse_mode: "Markdown", reply_markup: {inline_keyboard: [[{text: '🧑‍💻🦾 مدیریت هوشمند گروه 🧑‍💻🦾', callback_data: ':)'}]]}})
        }
      }
    }
  )}});

/*
  telegram.on("text", async function(msg){
    const project = await Users.findByPk(msg.from.id);
    if (project === null) {
    const newuser = await Users.create({ identifier: msg.from.id, firstName: msg.from.first_name, balance: '100'});
    }
  });
*/
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
        if(res.gamesPlayed != null){
           telegram.sendMessage(chatID, 'Total: ' + res.gamesPlayed + '\nWon: ' + res.won.total + ' (' + res.won.percent + '%)\nLost: ' + res.lost.total + ' (' + res.lost.percent + '%)');
        }else{
          telegram.sendMessage(chatID, `${ID} has no stats yet!`)
        }
      }
    });

    telegram.onText(/\/echo (.+)/, function(msg,match){
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

