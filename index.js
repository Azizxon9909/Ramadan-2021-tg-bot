const telegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const keyboard = require("./src/keyboard");
const kb = require("./src/keyboard-buttons");
const duo = require("./src/duolar");
const bot = new telegramBot(process.env.TOKEN, {
  polling: true,
});
bot.onText(/\/start/, (msg) => {
  const text = `Assalomu alaykum ${JSON.stringify(
    msg.from.first_name,
    null,
    4
  )}, \n Ramazon oyingiz muborak bo'lsin!`;
  bot.sendMessage(msg.chat.id, text, {
    reply_markup: {
      keyboard: keyboard.home,
    },
  });
});
bot.on("message", (msg) => {
  switch (msg.text) {
    case kb.home.ogiz_yopish:
      bot.sendMessage(msg.chat.id, duo.ogiz_yopish, {
        parse_mode: "HTML",
      });
      break;
    case kb.home.ogiz_ochish:
      bot.sendMessage(msg.chat.id, duo.ogiz_ochish, {
        parse_mode: "HTML",
      });
      break;
    case kb.home.taroveh:
      bot.sendMessage(msg.chat.id, duo.taroveh, {
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Taroveh namozi (to'liq)",
                url: "https://ukkosha.shosh.uz/uz/2020/04/15/taroveh-namozi/",
              },
            ],
          ],
        },
      });
      break;
    case kb.home.taqvim:
      bot.sendPhoto(msg.chat.id, "./src/img/taqvim.jpg", {
        caption: "Toshkent vaqti",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Buxoro",
                url: "https://namozvaqti.uz/ramazon/buxoro",
              },
              {
                text: "Farg'ona",
                url: "https://namozvaqti.uz/ramazon/fargona",
              },
            ],
            [
              {
                text: "Sirdaryo",
                url: "https://namozvaqti.uz/ramazon/sirdaryo",
              },
              {
                text: "Jizzah",
                url: "https://namozvaqti.uz/shahar/jizzax",
              },
            ],
            [
              {
                text: "Navoiy",
                url: "https://namozvaqti.uz/ramazon/navoiy",
              },
              {
                text: "Nukus",
                url: "https://namozvaqti.uz/shahar/nukus",
              },
            ],
            [
              {
                text: "Samarqand",
                url: "https://namozvaqti.uz/shahar/samarqand",
              },
              {
                text: "Surxondaryo",
                url: "https://namozvaqti.uz/shahar/termiz",
              },
            ],
            [
              {
                text: "Qashqadaryo",
                url: "https://namozvaqti.uz/shahar/qarshi",
              },
              {
                text: "Andijon",
                url: "https://namozvaqti.uz/shahar/andijon",
              },
            ],
            [
              {
                text: "Namangan",
                url: "https://namozvaqti.uz/shahar/pop1",
              },
              {
                text: "Xorazm",
                url: "https://namozvaqti.uz/shahar/urganch",
              },
            ],
          ],
        },
      });
      break;
    default:
      break;
  }
});
bot.on("inline_query", (query) => {
  const result = [
    {
      type: "article",
      id: "1",
      title: kb.home.ogiz_yopish,
      input_message_content: {
        message_text:
          "Навайту ан асувма совма шаҳри рамазона минал фажри илал мағриби, холисан лиллаҳи таъаалаа Аллоҳу акбар",
      },
    },
    {
      type: "article",
      id: "2",
      title: kb.home.ogiz_ochish,
      input_message_content: {
        message_text:
          "Аллоҳумма лака сумту ва бика ааманту ва аълайка таваккалту ва аълаа ризқика афтарту, фағфирлий ма қоддамту ва маа аххорту бироҳматика йаа арҳамар рооҳимийн  ",
      },
    },
  ];
  bot.answerInlineQuery(query.id, result, {
    cache_time: 0,
  });
});
