import { FamilyName, GivenName, Sex, User } from "./user";
import { createRandomDate, dateToString } from "../Common/util";

const HumanFamilyNames: Array<FamilyName> = [
  {
    familyName: "佐藤",
    familyNameKana: "サトウ",
    familyNameRome: "sato"
  },
  {
    familyName: "鈴木",
    familyNameKana: "スズキ",
    familyNameRome: "suzuki"
  },
  {
    familyName: "高橋",
    familyNameKana: "タカハシ",
    familyNameRome: "takahashi"
  },
  {
    familyName: "田中",
    familyNameKana: "タナカ",
    familyNameRome: "tanaka"
  },
  {
    familyName: "伊藤",
    familyNameKana: "イトウ",
    familyNameRome: "ito"
  },
  {
    familyName: "山本",
    familyNameKana: "ヤマモト",
    familyNameRome: "yamamoto"
  },
  {
    familyName: "渡辺",
    familyNameKana: "ワタナベ",
    familyNameRome: "watanabe"
  },
  {
    familyName: "中村",
    familyNameKana: "ナカムラ",
    familyNameRome: "nakamura"
  },
  {
    familyName: "小林",
    familyNameKana: "コバヤシ",
    familyNameRome: "kobayashi"
  },
  {
    familyName: "加藤",
    familyNameKana: "カトウ",
    familyNameRome: "kato"
  },
  {
    familyName: "吉田",
    familyNameKana: "ヨシダ",
    familyNameRome: "yoshida"
  },
  {
    familyName: "山田",
    familyNameKana: "ヤマダ",
    familyNameRome: "yamada"
  },
  {
    familyName: "佐々木",
    familyNameKana: "ササキ",
    familyNameRome: "sasaki"
  },
  {
    familyName: "山口",
    familyNameKana: "ヤマグチ",
    familyNameRome: "yamaguchi"
  },
  {
    familyName: "松本",
    familyNameKana: "マツモト",
    familyNameRome: "matsumoto"
  },
  {
    familyName: "井上",
    familyNameKana: "イノウエ",
    familyNameRome: "inoue"
  },
  {
    familyName: "木村",
    familyNameKana: "キムラ",
    familyNameRome: "kimura"
  },
  {
    familyName: "林",
    familyNameKana: "ハヤシ",
    familyNameRome: "hayashi"
  },
  {
    familyName: "斎藤",
    familyNameKana: "サイトウ",
    familyNameRome: "saito"
  },
  {
    familyName: "清水",
    familyNameKana: "シミズ",
    familyNameRome: "shimizu"
  },
  {
    familyName: "山崎",
    familyNameKana: "ヤマザキ",
    familyNameRome: "yamazaki"
  },
  {
    familyName: "阿部",
    familyNameKana: "アベ",
    familyNameRome: "abe"
  },
  {
    familyName: "森",
    familyNameKana: "モリ",
    familyNameRome: "mori"
  },
  {
    familyName: "池田",
    familyNameKana: "イケダ",
    familyNameRome: "ikeda"
  },
  {
    familyName: "橋本",
    familyNameKana: "ハシモト",
    familyNameRome: "hashimoto"
  },
  {
    familyName: "山下",
    familyNameKana: "ヤマモト",
    familyNameRome: "yamamoto"
  },
  {
    familyName: "石川",
    familyNameKana: "イシカワ",
    familyNameRome: "ishikawa"
  },
  {
    familyName: "中島",
    familyNameKana: "ナカジマ",
    familyNameRome: "nakajima"
  },
  {
    familyName: "前田",
    familyNameKana: "マエダ",
    familyNameRome: "maeda"
  },
  {
    familyName: "藤田",
    familyNameKana: "フジタ",
    familyNameRome: "fujita"
  },
  {
    familyName: "後藤",
    familyNameKana: "ゴトウ",
    familyNameRome: "goto"
  },
  {
    familyName: "小川",
    familyNameKana: "オガワ",
    familyNameRome: "ogawa"
  },
  {
    familyName: "岡田",
    familyNameKana: "オカダ",
    familyNameRome: "okada"
  },
  {
    familyName: "村上",
    familyNameKana: "ムラカミ",
    familyNameRome: "murakami"
  },
  {
    familyName: "長谷川",
    familyNameKana: "ハセガワ",
    familyNameRome: "hasegawa"
  },
  {
    familyName: "近藤",
    familyNameKana: "コンドウ",
    familyNameRome: "kondo"
  },
  {
    familyName: "石井",
    familyNameKana: "イシイ",
    familyNameRome: "ishii"
  },
  {
    familyName: "斉藤",
    familyNameKana: "サイトウ",
    familyNameRome: "saito"
  },
  {
    familyName: "坂本",
    familyNameKana: "サカモト",
    familyNameRome: "sakamoto"
  },
  {
    familyName: "遠藤",
    familyNameKana: "エンドウ",
    familyNameRome: "endo"
  },
  {
    familyName: "藤井",
    familyNameKana: "フジイ",
    familyNameRome: "fujii"
  },
  {
    familyName: "青木",
    familyNameKana: "アオキ",
    familyNameRome: "aoki"
  },
  {
    familyName: "福田",
    familyNameKana: "フクダ",
    familyNameRome: "fukuda"
  },
  {
    familyName: "三浦",
    familyNameKana: "ミウラ",
    familyNameRome: "miura"
  },
  {
    familyName: "西村",
    familyNameKana: "ニシムラ",
    familyNameRome: "nishimura"
  },
  {
    familyName: "藤原",
    familyNameKana: "フジワラ",
    familyNameRome: "fujiwara"
  },
  {
    familyName: "太田",
    familyNameKana: "オオタ",
    familyNameRome: "ota"
  },
  {
    familyName: "松田",
    familyNameKana: "マツダ",
    familyNameRome: "matsuda"
  },
  {
    familyName: "原田",
    familyNameKana: "ハラダ",
    familyNameRome: "harada"
  },
  {
    familyName: "岡本",
    familyNameKana: "オカモト",
    familyNameRome: "okamoto"
  },
  {
    familyName: "中野",
    familyNameKana: "ナカノ",
    familyNameRome: "nakano"
  },
  {
    familyName: "中川",
    familyNameKana: "ナカガワ",
    familyNameRome: "nakagawa"
  },
  {
    familyName: "小野",
    familyNameKana: "オノ",
    familyNameRome: "ono"
  },
  {
    familyName: "田村",
    familyNameKana: "タムラ",
    familyNameRome: "tamura"
  },
  {
    familyName: "竹内",
    familyNameKana: "タケウチ",
    familyNameRome: "takeuchi"
  },
  {
    familyName: "金子",
    familyNameKana: "カネコ",
    familyNameRome: "kaneko"
  },
  {
    familyName: "中山",
    familyNameKana: "ナカヤマ",
    familyNameRome: "nakayama"
  },
  {
    familyName: "和田",
    familyNameKana: "ワダ",
    familyNameRome: "wada"
  },
  {
    familyName: "石田",
    familyNameKana: "イシダ",
    familyNameRome: "ishida"
  },
  {
    familyName: "工藤",
    familyNameKana: "クドウ",
    familyNameRome: "kudo"
  },
  {
    familyName: "上田",
    familyNameKana: "ウエダ",
    familyNameRome: "ueda"
  },
  {
    familyName: "原",
    familyNameKana: "ハラ",
    familyNameRome: "hara"
  },
  {
    familyName: "森田",
    familyNameKana: "モリタ",
    familyNameRome: "morita"
  },
  {
    familyName: "酒井",
    familyNameKana: "サカイ",
    familyNameRome: "sakai"
  },
  {
    familyName: "横山",
    familyNameKana: "ヨコヤマ",
    familyNameRome: "yokoyama"
  },
  {
    familyName: "柴田",
    familyNameKana: "シバタ",
    familyNameRome: "shibata"
  },
  {
    familyName: "宮崎",
    familyNameKana: "ミヤザキ",
    familyNameRome: "miyazaki"
  },
  {
    familyName: "宮本",
    familyNameKana: "ミヤモト",
    familyNameRome: "miyamoto"
  },
  {
    familyName: "内田",
    familyNameKana: "ウチダ",
    familyNameRome: "uchida"
  },
  {
    familyName: "高木",
    familyNameKana: "タカギ",
    familyNameRome: "takagi"
  },
  {
    familyName: "谷口",
    familyNameKana: "タニグチ",
    familyNameRome: "taniguchi"
  },
  {
    familyName: "安藤",
    familyNameKana: "アンドウ",
    familyNameRome: "ando"
  },
  {
    familyName: "丸山",
    familyNameKana: "マルイ",
    familyNameRome: "marui"
  },
  {
    familyName: "今井",
    familyNameKana: "イマノ",
    familyNameRome: "imano"
  },
  {
    familyName: "大野",
    familyNameKana: "オオノ",
    familyNameRome: "ohno"
  },
  {
    familyName: "高田",
    familyNameKana: "タカダ",
    familyNameRome: "takada"
  },
  {
    familyName: "菅原",
    familyNameKana: "スガワラ",
    familyNameRome: "sugawara"
  },
  {
    familyName: "河野",
    familyNameKana: "カワノ",
    familyNameRome: "kawano"
  },
  {
    familyName: "武田",
    familyNameKana: "タケダ",
    familyNameRome: "takeda"
  },
  {
    familyName: "藤本",
    familyNameKana: "フジモト",
    familyNameRome: "fujimoto"
  },
  {
    familyName: "上野",
    familyNameKana: "ウエノ",
    familyNameRome: "ueno"
  },
  {
    familyName: "杉山",
    familyNameKana: "スギヤマ",
    familyNameRome: "sugiyama"
  },
  {
    familyName: "千葉",
    familyNameKana: "チバ",
    familyNameRome: "chiba"
  },
  {
    familyName: "村田",
    familyNameKana: "ムラタ",
    familyNameRome: "murata"
  },
  {
    familyName: "増田",
    familyNameKana: "マスダ",
    familyNameRome: "masuda"
  },
  {
    familyName: "小島",
    familyNameKana: "コジマ",
    familyNameRome: "kojima"
  },
  {
    familyName: "小山",
    familyNameKana: "コヤマ",
    familyNameRome: "koyama"
  },
  {
    familyName: "大塚",
    familyNameKana: "オオツカ",
    familyNameRome: "otsuka"
  },
  {
    familyName: "平野",
    familyNameKana: "ヒラノ",
    familyNameRome: "hirano"
  },
  {
    familyName: "久保",
    familyNameKana: "クボ",
    familyNameRome: "kubo"
  },
  {
    familyName: "渡部",
    familyNameKana: "ワタベ",
    familyNameRome: "watabe"
  },
  {
    familyName: "松井",
    familyNameKana: "マツイ",
    familyNameRome: "matsui"
  },
  {
    familyName: "菊地",
    familyNameKana: "キクチ",
    familyNameRome: "kikuchi"
  },
  {
    familyName: "岩崎",
    familyNameKana: "イワサキ",
    familyNameRome: "iwasaki"
  },
  {
    familyName: "松尾",
    familyNameKana: "マツオ",
    familyNameRome: "matsuo"
  },
  {
    familyName: "佐野",
    familyNameKana: "サノ",
    familyNameRome: "sano"
  },
  {
    familyName: "木下",
    familyNameKana: "キノシタ",
    familyNameRome: "kinoshita"
  },
  {
    familyName: "野口",
    familyNameKana: "ノグチ",
    familyNameRome: "noguchi"
  },
  {
    familyName: "野村",
    familyNameKana: "ノムラ",
    familyNameRome: "nomura"
  },
  {
    familyName: "新井",
    familyNameKana: "アライ",
    familyNameRome: "arai"
  }
];

const HumanGivenNamesMale: Array<GivenName> = [
  { givenName: "翔太", givenNameKana: "ショウタ", givenNameRome: "shota" },
  { givenName: "蓮", givenNameKana: "レン", givenNameRome: "ren" },
  { givenName: "陸", givenNameKana: "リク", givenNameRome: "riku" },
  { givenName: "颯太", givenNameKana: "フウタ", givenNameRome: "huta" },
  { givenName: "悠斗", givenNameKana: "ユウト", givenNameRome: "yuto" },
  { givenName: "大翔", givenNameKana: "ダイト", givenNameRome: "daito" },
  { givenName: "翔", givenNameKana: "ショウ", givenNameRome: "sho" },
  { givenName: "翼", givenNameKana: "ツバサ", givenNameRome: "tsubasa" },
  { givenName: "樹", givenNameKana: "イツキ", givenNameRome: "itsuki" },
  { givenName: "奏太", givenNameKana: "ソウタ", givenNameRome: "souta" },
  { givenName: "大和", givenNameKana: "ヤマト", givenNameRome: "yamato" },
  { givenName: "大輝", givenNameKana: "ダイキ", givenNameRome: "daiki" },
  { givenName: "悠", givenNameKana: "ユウ", givenNameRome: "yu" },
  { givenName: "隼人", givenNameKana: "ハヤト", givenNameRome: "hayato" },
  { givenName: "健太", givenNameKana: "ケンタ", givenNameRome: "kenta" },
  { givenName: "大輔", givenNameKana: "ダイスケ", givenNameRome: "daisuke" },
  { givenName: "駿", givenNameKana: "シュン", givenNameRome: "shun" },
  { givenName: "陽斗", givenNameKana: "ハルト", givenNameRome: "haruto" },
  { givenName: "優", givenNameKana: "ユウ", givenNameRome: "yu" },
  { givenName: "陽", givenNameKana: "ヨウ", givenNameRome: "yo" },
  { givenName: "悠人", givenNameKana: "ユウト", givenNameRome: "yuto" },
  { givenName: "誠", givenNameKana: "マコト", givenNameRome: "makoto" },
  { givenName: "拓海", givenNameKana: "タクミ", givenNameRome: "takumi" },
  { givenName: "仁", givenNameKana: "ジン", givenNameRome: "jin" },
  { givenName: "悠太", givenNameKana: "ユウタ", givenNameRome: "yuta" },
  { givenName: "悠真", givenNameKana: "ユウマ", givenNameRome: "yuma" },
  { givenName: "大地", givenNameKana: "ダイチ", givenNameRome: "daichi" },
  { givenName: "健", givenNameKana: "ケン", givenNameRome: "ken" },
  { givenName: "遼", givenNameKana: "リョウ", givenNameRome: "ryo" },
  { givenName: "大樹", givenNameKana: "ダイキ", givenNameRome: "daiki" },
  { givenName: "諒", givenNameKana: "リョウ", givenNameRome: "ryo" },
  { givenName: "響", givenNameKana: "ヒビキ", givenNameRome: "hibiki" },
  { givenName: "太一", givenNameKana: "タイチ", givenNameRome: "taichi" },
  { givenName: "一郎", givenNameKana: "イチロウ", givenNameRome: "ichiro" },
  { givenName: "優斗", givenNameKana: "ユウト", givenNameRome: "yuto" },
  { givenName: "亮", givenNameKana: "リョウ", givenNameRome: "ryo" },
  { givenName: "海斗", givenNameKana: "カイト", givenNameRome: "kaito" },
  { givenName: "颯", givenNameKana: "ハヤト", givenNameRome: "hayato" },
  { givenName: "亮太", givenNameKana: "リョウタ", givenNameRome: "ryota" },
  { givenName: "匠", givenNameKana: "タクミ", givenNameRome: "takumi" },
  { givenName: "陽太", givenNameKana: "ヨウタ", givenNameRome: "yota" },
  { givenName: "航", givenNameKana: "ワタル", givenNameRome: "wataru" },
  { givenName: "瑛太", givenNameKana: "エイタ", givenNameRome: "eita" },
  { givenName: "直樹", givenNameKana: "ナオキ", givenNameRome: "naoki" },
  { givenName: "空", givenNameKana: "ソラ", givenNameRome: "sora" },
  { givenName: "光", givenNameKana: "ヒカル", givenNameRome: "hikaru" },
  { givenName: "輝", givenNameKana: "アキラ", givenNameRome: "akira" },
  { givenName: "一輝", givenNameKana: "カズキ", givenNameRome: "kazuki" },
  { givenName: "健一", givenNameKana: "ケンイチ", givenNameRome: "kenichi" },
  { givenName: "浩二", givenNameKana: "コウジ", givenNameRome: "yuji" },
  { givenName: "哲也", givenNameKana: "テツヤ", givenNameRome: "tetsuya" },
  { givenName: "剛", givenNameKana: "ツヨシ", givenNameRome: "tsuyoshi" },
  { givenName: "修", givenNameKana: "オサム", givenNameRome: "osamu" },
  { givenName: "徹", givenNameKana: "テツ", givenNameRome: "tetsu" },
  { givenName: "秀樹", givenNameKana: "ヒデキ", givenNameRome: "hideki" },
  { givenName: "隆", givenNameKana: "タカシ", givenNameRome: "takashi" },
  { givenName: "蒼", givenNameKana: "アオイ", givenNameRome: "aoi" }
];

const HumanGivenNamesFemale: Array<GivenName> = [
  { givenName: "葵", givenNameKana: "アオイ", givenNameRome: "aoi" },
  { givenName: "優那", givenNameKana: "ユウナ", givenNameRome: "yuna" },
  { givenName: "優奈", givenNameKana: "ユウナ", givenNameRome: "yuna" },
  { givenName: "凛", givenNameKana: "リン", givenNameRome: "rin" },
  { givenName: "陽菜", givenNameKana: "ヒナ", givenNameRome: "hina" },
  { givenName: "愛", givenNameKana: "アイ", givenNameRome: "ai" },
  { givenName: "結衣", givenNameKana: "ユイ", givenNameRome: "yui" },
  { givenName: "美咲", givenNameKana: "ミサキ", givenNameRome: "misaki" },
  { givenName: "楓", givenNameKana: "カエデ", givenNameRome: "kaede" },
  { givenName: "さくら", givenNameKana: "サクラ", givenNameRome: "sakura" },
  { givenName: "遥", givenNameKana: "ハルカ", givenNameRome: "haruka" },
  { givenName: "美優", givenNameKana: "ミユ", givenNameRome: "miyu" },
  { givenName: "莉子", givenNameKana: "リコ", givenNameRome: "riko" },
  { givenName: "七海", givenNameKana: "ナナミ", givenNameRome: "nanami" },
  { givenName: "美月", givenNameKana: "ミツキ", givenNameRome: "mitsuki" },
  { givenName: "結菜", givenNameKana: "ユウナ", givenNameRome: "yuna" },
  { givenName: "真央", givenNameKana: "マオ", givenNameRome: "mao" },
  { givenName: "花音", givenNameKana: "カノン", givenNameRome: "kanon" },
  { givenName: "陽子", givenNameKana: "ハルコ", givenNameRome: "haruko" },
  { givenName: "舞", givenNameKana: "マイ", givenNameRome: "mai" },
  { givenName: "美羽", givenNameKana: "ミウ", givenNameRome: "miu" },
  { givenName: "優衣", givenNameKana: "ユイ", givenNameRome: "yui" },
  { givenName: "未来", givenNameKana: "ミライ", givenNameRome: "mirai" },
  { givenName: "彩", givenNameKana: "アヤ", givenNameRome: "aya" },
  { givenName: "彩乃", givenNameKana: "アヤノ", givenNameRome: "ayano" },
  { givenName: "彩花", givenNameKana: "アヤカ", givenNameRome: "ayaka" },
  { givenName: "優", givenNameKana: "ユウ", givenNameRome: "yu" },
  { givenName: "智子", givenNameKana: "トモコ", givenNameRome: "tomoko" },
  { givenName: "奈々", givenNameKana: "ナナ", givenNameRome: "nana" },
  { givenName: "千尋", givenNameKana: "チヒロ", givenNameRome: "chihiro" },
  { givenName: "愛美", givenNameKana: "マナミ", givenNameRome: "manami" },
  { givenName: "優菜", givenNameKana: "ユウナ", givenNameRome: "yuna" },
  { givenName: "杏", givenNameKana: "アンズ", givenNameRome: "anzu" },
  { givenName: "裕子", givenNameKana: "ユウコ", givenNameRome: "yuko" },
  { givenName: "芽衣", givenNameKana: "メイ", givenNameRome: "mei" },
  { givenName: "綾乃", givenNameKana: "アヤノ", givenNameRome: "ayano" },
  { givenName: "琴音", givenNameKana: "コトネ", givenNameRome: "kotone" },
  { givenName: "桜", givenNameKana: "サクラ", givenNameRome: "sakura" },
  { givenName: "恵", givenNameKana: "メグミ", givenNameRome: "megumi" },
  { givenName: "杏奈", givenNameKana: "アンナ", givenNameRome: "anna" },
  { givenName: "美桜", givenNameKana: "ミハル", givenNameRome: "miharu" },
  { givenName: "優花", givenNameKana: "ユウカ", givenNameRome: "yuka" },
  { givenName: "玲奈", givenNameKana: "レナ", givenNameRome: "rena" },
  { givenName: "結", givenNameKana: "ユイ", givenNameRome: "yui" },
  { givenName: "茜", givenNameKana: "アカネ", givenNameRome: "akane" },
  { givenName: "美穂", givenNameKana: "ミホ", givenNameRome: "miho" },
  { givenName: "明日香", givenNameKana: "アスカ", givenNameRome: "asuka" },
  { givenName: "愛子", givenNameKana: "アイコ", givenNameRome: "aiko" },
  { givenName: "美緒", givenNameKana: "ミオ", givenNameRome: "mio" },
  { givenName: "碧", givenNameKana: "ミドリ", givenNameRome: "midori" },
  { givenName: "麻衣", givenNameKana: "マイ", givenNameRome: "mai" },
  { givenName: "友美", givenNameKana: "トモミ", givenNameRome: "tomomi" },
  { givenName: "美香", givenNameKana: "ミカ", givenNameRome: "mika" },
  { givenName: "智美", givenNameKana: "トモミ", givenNameRome: "tomomi" },
  { givenName: "麻衣子", givenNameKana: "マイコ", givenNameRome: "maiko" },
  { givenName: "香織", givenNameKana: "カオリ", givenNameRome: "kaori" },
  { givenName: "麻美", givenNameKana: "アサミ", givenNameRome: "asami" }
];

const createRandomIndex = <T>(arr: Array<T>): number => {
  return Math.floor(Math.random() * arr.length);
};

const createRandomSex = (): Sex => {
  const seed = Math.floor(Math.random() * 2);
  if (seed === 0) return "male";
  return "female";
};

const startDate = new Date();
const endDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 40);
endDate.setFullYear(endDate.getFullYear() - 15);

export const createUserInstance = (): User => {
  const familyName: FamilyName =
    HumanFamilyNames[createRandomIndex(HumanFamilyNames)];
  const sex = createRandomSex();
  let givenName: GivenName;
  if (sex === "male") {
    givenName = HumanGivenNamesMale[createRandomIndex(HumanGivenNamesMale)];
  } else {
    givenName = HumanGivenNamesFemale[createRandomIndex(HumanGivenNamesFemale)];
  }
  const birthday = createRandomDate(startDate, endDate);
  return {
    ...familyName,
    ...givenName,
    sex: sex,
    birthday: birthday,
    email: `${givenName.givenNameRome}.${
      familyName.familyNameRome
    }${dateToString(birthday)}@testaro.com`
  };
};

export const createRandomUserInstances = (num: number): Array<User> => {
  const result = [];
  for (let i = 1; i <= num; i++) {
    result.push(createUserInstance());
  }
  return result;
};
