// AAHM 
//made by Yuyuko

let counter = 0;//后砸计数
let timer;//后砸统计重置时间
let print = true;//二王HP提示开关

let SPAWNING_FIRST_CIRCLE_FLOWERS = [];
let SPAWNING_SECOND_CIRCLE_FLOWERS = [];

const TIMER_DELAY = 600;
const ITEM_SPAWNED_ON_SWIPE_ID = 576;
const ITEM_SPAWNED_ON_SWIPE_SUB_DELAY = 2500;
const ITEM_SPAWNED_ON_SWIPE_DISTANCE = 150;

const stepone = 2 * Math.PI / 40;//40 flowers in total
const steptwo = 2 * Math.PI / 72;//72 flowers in total

//内圈
for(let angle = -Math.PI; angle <= Math.PI; angle += stepone) {
    
	SPAWNING_FIRST_CIRCLE_FLOWERS.push({
        "type": "spawn",
        "id": 603,
        "sub_delay": 6000,
        "distance": 143,
        "offset": angle
    });
	
	SPAWNING_SECOND_CIRCLE_FLOWERS.push({
        "type": "spawn",
        "id": 603,
        "sub_delay": 6000,
        "distance": 157,
        "offset": angle
    });
}
//外圈
for(let angle = -Math.PI; angle <= Math.PI; angle += steptwo) {
	
	SPAWNING_FIRST_CIRCLE_FLOWERS.push({
	    "type": "spawn",
        "id": 603,
        "sub_delay": 6000,
        "distance": 293,
        "offset": angle
	});
	
	SPAWNING_SECOND_CIRCLE_FLOWERS.push({
		"type": "spawn",
        "id": 603,
        "sub_delay": 6000,
        "distance": 307,
        "offset": angle
	});
}


//剑舞前戳+逆时针旋转+右手扇形攻击+外到内甜甜圈 
SPAWNING_FIRST_CIRCLE_FLOWERS.push({"type": "text","class_position":"tank","sub_type": "notification","message": "&#x53F3;&#x2192; + &#x4ECE;&#x5916;&#x5230;&#x5185;"});
SPAWNING_FIRST_CIRCLE_FLOWERS.push({"type": "text","class_position":"dps","sub_type": "notification","message": "&#x5DE6;&#x2190; + &#x4ECE;&#x5916;&#x5230;&#x5185;"});
SPAWNING_FIRST_CIRCLE_FLOWERS.push({"type": "text","class_position":"heal","sub_type": "notification","message": "&#x5DE6;&#x2190; + &#x4ECE;&#x5916;&#x5230;&#x5185;"});
SPAWNING_FIRST_CIRCLE_FLOWERS.push({"type": "spawn","id": ITEM_SPAWNED_ON_SWIPE_ID,"sub_delay": ITEM_SPAWNED_ON_SWIPE_SUB_DELAY,"distance": ITEM_SPAWNED_ON_SWIPE_DISTANCE,"offset": -1});
SPAWNING_FIRST_CIRCLE_FLOWERS.push({"type": "spawn","id": ITEM_SPAWNED_ON_SWIPE_ID,"sub_delay": ITEM_SPAWNED_ON_SWIPE_SUB_DELAY,"distance": ITEM_SPAWNED_ON_SWIPE_DISTANCE,"offset": -2.3});

//剑舞前戳+顺时针旋转+左手扇形攻击+内到外甜甜圈
SPAWNING_SECOND_CIRCLE_FLOWERS.push({"type": "text","class_position":"tank","sub_type": "notification","message": "&#x5DE6;&#x2190; + &#x4ECE;&#x5185;&#x5230;&#x5916;"});
SPAWNING_SECOND_CIRCLE_FLOWERS.push({"type": "text","class_position":"dps","sub_type": "notification","message": "&#x53F3;&#x2192; + &#x4ECE;&#x5185;&#x5230;&#x5916;"});
SPAWNING_SECOND_CIRCLE_FLOWERS.push({"type": "text","class_position":"heal","sub_type": "notification","message": "&#x53F3;&#x2192; + &#x4ECE;&#x5185;&#x5230;&#x5916;"});
SPAWNING_SECOND_CIRCLE_FLOWERS.push({"type": "spawn","id": ITEM_SPAWNED_ON_SWIPE_ID,"sub_delay": ITEM_SPAWNED_ON_SWIPE_SUB_DELAY,"distance": ITEM_SPAWNED_ON_SWIPE_DISTANCE,"offset": 1});
SPAWNING_SECOND_CIRCLE_FLOWERS.push({"type": "spawn","id": ITEM_SPAWNED_ON_SWIPE_ID,"sub_delay": ITEM_SPAWNED_ON_SWIPE_SUB_DELAY,"distance": ITEM_SPAWNED_ON_SWIPE_DISTANCE,"offset": 2.3});

//一王击飞躲避提示延迟推送
const EVENT_DELAY_FIRST_BOSS_HM = [
{
        "type": "text",
        "sub_type": "notification",
        "delay": TIMER_DELAY,
        "message": "&#x6CE8;&#x610F;&#x8EB2;&#x907F;"
    },
];



//二王血量显示
   function start_boss() {
      print = true;
}
   function print_fifty(handlers) {
      if(print) {
      handlers['text']({
            "sub_type": "notification",
            "message": "50%"
    });
  }
  print = false;
}	
   function print_twenty(handlers) {
      if(print) {
      handlers['text']({
            "sub_type": "notification",
            "message": "20%"
    });
  }
  print = false;
}

//三王后砸前置计数
   function right_left_attack_HM(handlers) {
	  clearTimeout(timer);
      counter++;
    if(counter >= 2) {
        handlers['text']({
            "sub_type": "notification",
            "message": "&#x540E;&#x7838;"
        });
    }
    timer = setTimeout(()=>{
        counter = 0;
    }, 3000);
}

//三王色鉴,针对色盲玩家的特别帮助
/* ------------------------------------------- */
let colour_to_use = null;
const COLOURS_OFFSETS = {
    "red": 0,
    "yellow": 2.5,
    "blue": -2.5,
};

function set_clockwise(clockwise, handlers, _, third_boss_entity) {
    setTimeout(()=> {
        // Get the colour rotation
        const colour_rotation = clockwise ? ["red", "yellow", "blue"] : ["blue", "yellow", "red"];

        // Loop thru the three cage rotations
        for(let i = 0; i < 3; i++) {
            let current_colour = colour_rotation[(colour_rotation.indexOf(colour_to_use) + i) % 3];

            handlers['spawn']({
                "id": 567,
                "delay": i * 2600,
                "sub_delay": (i + 1) * 3000,
                "distance": 150,
                "offset": COLOURS_OFFSETS[current_colour]
            }, third_boss_entity);
        }

        // clear out clockwise
        setTimeout(()=> {
            clockwise = null;
        }, 12000);
    }, 1000);
}

function change_colour(colour) {
    colour_to_use = colour;
}
/* ------------------------------------------- */


module.exports = {
    
//一王 不愤怒

    //后跳+内外圈,安全区域:站里面+站外面
     "s-920-1000-1117": [{"type": "text","sub_type": "notification","message": "&#x7AD9;&#x91CC;&#x9762;&#x2191;+&#x7AD9;&#x5916;&#x9762;&#x2193;"}],
	//原地抬腿+内外圈,安全区域:站外面+站里面
	 "s-920-1000-1116": [{"type": "text","sub_type": "notification","message": "&#x7AD9;&#x5916;&#x9762;&#x2193;+&#x7AD9;&#x91CC;&#x9762;&#x2191;"}],
    //剑戳地2下+后方挥盾
	 "s-920-1000-1109": [{"type": "text","sub_type": "notification","message": "&#x540E;&#x65B9;&#x653B;&#x51FB;"}],
	//三圈顺序:全+外+内 站里面站外面
	"s-920-1000-1130": [{"type": "text","sub_type": "notification","message": "&#x4F24;&#x5BB3;&#x987A;&#x5E8F;&#xFF1A;&#x5168;>&#x5916;>&#x5185;"}],


//一王愤怒

	//后跳+内外圈,安全区域:站里面+站外面
     "s-920-1000-2117": [{"type": "text","sub_type": "notification","message": "&#x7AD9;&#x91CC;&#x9762;&#x2191;+&#x7AD9;&#x5916;&#x9762;&#x2193;"}],
	//原地抬腿+内外圈,安全区域:站外面+站里面
	 "s-920-1000-2116": [{"type": "text","sub_type": "notification","message": "&#x7AD9;&#x5916;&#x9762;&#x2193;+&#x7AD9;&#x91CC;&#x9762;&#x2191;"}],
    //剑戳地2下+后方挥盾
	 "s-920-1000-2109": [{"type": "text","sub_type": "notification","message": "&#x540E;&#x65B9;&#x653B;&#x51FB;"}],
	//愤怒时 三圈顺序:全+内+外
     "s-920-1000-2130": [{"type": "text","sub_type": "notification","message": "&#x4F24;&#x5BB3;&#x987A;&#x5E8F;&#xFF1A;&#x5168;>&#x5185;>&#x5916;"}],
	 
//一王特殊技能
	 //击飞攻击
	 "s-920-1000-1300": EVENT_DELAY_FIRST_BOSS_HM,
	 
//二王 不愤怒
    //点名转身划刀
	"s-920-2000-1108": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5212;&#x5200;&#x653B;&#x51FB;"}],
	//点名转身划刀,左手边伤害
	"s-920-2000-1113": [{"type": "text","sub_type": "notification","message": "&#x5DE6;&#x624B;&#x4F24;&#x5BB3;"}],
	//点名转身划刀,右手边伤害
	"s-920-2000-1114": [{"type": "text","sub_type": "notification","message": "&#x53F3;&#x624B;&#x4F24;&#x5BB3;"}],
    //转圈攻击（1106）
	"s-920-2000-1106": [{"type": "text","sub_type": "notification","message": "&#x8F6C;&#x5708;&#x653B;&#x51FB;"}],
    //后方攻击（1105）
    "s-920-2000-1105": [{"type": "text","sub_type": "notification","message": "&#x540E;&#x65B9;&#x653B;&#x51FB;"}],
	//点名大跳晕人
    "s-920-2000-1104": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5927;&#x8DF3;"}],
    //眩晕攻击
	"s-920-2000-1110": [{"type": "text","sub_type": "notification","message": "&#x7729;&#x6655;&#x653B;&#x51FB;"}],
	//BOSS右手边划刀,安全区域:坦右,打左
	"s-920-2000-1112": [{"type": "text","class_position":"tank","sub_type": "notification","message": "&#x53F3;&#x2192;"},
	                    {"type": "text","class_position":"dps","sub_type": "notification","message": "&#x5DE6;&#x2190;"},
	                    {"type": "text","class_position":"heal","sub_type": "notification","message": "&#x5DE6;&#x2190;"}],
	//BOSS左手边划刀,安全区域:坦左,打右
	"s-920-2000-1111": [{"type": "text","class_position":"tank","sub_type": "notification","message": "&#x5DE6;&#x2190;"},
	                    {"type": "text","class_position":"dps","sub_type": "notification","message": "&#x53F3;&#x2192;"},
						{"type": "text","class_position":"heal","sub_type": "notification","message": "&#x53F3;&#x2192;"}],
//二王 愤怒

    //转圈攻击（2106）
	"s-920-2000-2106": [{"type": "text","sub_type": "notification","message": "&#x8F6C;&#x5708;&#x653B;&#x51FB;"}], 
    //愤怒后方攻击（2105）
    "s-920-2000-2105": [{"type": "text","sub_type": "notification","message": "&#x540E;&#x65B9;&#x653B;&#x51FB;"}], 
	//点名大跳晕人
    "s-920-2000-2104": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5927;&#x8DF3;"}],	
	//BOSS右手边划刀,安全区域:坦右,打左
	"s-920-2000-2112": [{"type": "text","class_position":"tank","sub_type": "notification","message": "&#x53F3;&#x2192;"},
	                    {"type": "text","class_position":"dps","sub_type": "notification","message": "&#x5DE6;&#x2190;"},
						{"type": "text","class_position":"heal","sub_type": "notification","message": "&#x5DE6;&#x2190;"}],
	//BOSS左手边划刀,安全区域:坦左,打右
	"s-920-2000-2111": [{"type": "text","class_position":"tank","sub_type": "notification","message": "&#x5DE6;&#x2190;"},
	                    {"type": "text","class_position":"dps","sub_type": "notification","message": "&#x53F3;&#x2192;"},
						{"type": "text","class_position":"heal","sub_type": "notification","message": "&#x53F3;&#x2192;"}],
    //眩晕攻击
	"s-920-2000-2110": [{"type": "text","sub_type": "notification","message": "&#x7729;&#x6655;&#x653B;&#x51FB;"}],
	//点名转身划刀
	"s-920-2000-2108": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5212;&#x5200;&#x653B;&#x51FB;"}],
	//点名转身划刀,左手边伤害
	"s-920-2000-2113": [{"type": "text","sub_type": "notification","message": "&#x5DE6;&#x624B;&#x4F24;&#x5BB3;"}],
	//点名转身划刀,右手边伤害
	"s-920-2000-2114": [{"type": "text","sub_type": "notification","message": "&#x53F3;&#x624B;&#x4F24;&#x5BB3;"}],
	

//二王特殊技能
    //红色鉴定,安全区域:15M外
	"s-920-2000-3119": [{"type": "text","sub_type": "notification","message": "&#x7EA2;&#x8272;&#xFF1A;&#x5916;&#x2193;"}],
    //蓝色鉴定,安全区域:15M内（3220）
	"s-920-2000-3220": [{"type": "text","sub_type": "notification","message": "&#x84DD;&#x8272;&#xFF1A;&#x5185;&#x2191;"}],
    //眩晕圈（3116）+外圈伤害（3118）
    "s-920-2000-3116": [{"type": "text","sub_type": "notification","message": "&#x8EB2;&#x907F;+&#x5185;&#x2191;"}],
	//点名喷长条毒（3107）	

//二王HP血量检测

    //BOSS血量低于50%后,左右划刀变成双面
	"h-920-2000-99": [{"type": "func","func": start_boss}],
    "h-920-2000-50": [{"type": "func","func": print_fifty}],
    //BOSS血量20%后,会有概率出现连续鉴定
	"h-920-2000-21": [{"type": "func","func": start_boss}],
    "h-920-2000-20": [	{"type": "func","func": print_twenty}],

//三王

    //进场的推人红圈
     "s-920-3000-1315": [{"type": "text","sub_type": "notification","message": "&#x5F00;&#x573A;&#x63A8;&#x4EBA;"}],
	//点名大跳晕人（1107）
    "s-920-3000-1107": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5927;&#x8DF3;"}],
	//点名出剑刃风暴（1204）
    "s-920-3000-1204": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5251;&#x6C14;"}],
    //剑舞前戳+逆时针旋转+右手扇形攻击+外到内甜甜圈 注:坦右边安全,打左边安全请自行更改
    "s-920-3000-1109": SPAWNING_FIRST_CIRCLE_FLOWERS,	
    //剑舞前戳+顺时针旋转+左手扇形攻击+内到外甜甜圈  注:坦左边安全,打右边安全请自行更改
	"s-920-3000-1111": SPAWNING_SECOND_CIRCLE_FLOWERS,
   //前后砸
	"s-920-3000-1113": [{"type": "text","sub_type": "notification","message": "&#x524D;&#x540E;&#x7838;"}],
    //旋转攻击
	"s-920-3000-1115": [{"type": "text","sub_type": "notification","message": "&#x65CB;&#x8F6C;&#x653B;&#x51FB;"}],
    
	//三重分身接旋转攻击？？？（待确定）
	//"s-920-3000-1203": [{"type": "text","sub_type": "notification","message": "后砸 请注意"}],
    //"s-920-3000-1205": [{"type": "text","sub_type": "notification","message": "分身剑刃风暴,注意躲避""}],
	//"s-920-3000-1206": [{"type": "text","sub_type": "notification","message": "黑白球,注意分配"}],
    
	//2连斜上挥（1104）后接的后砸（1119）
	"s-920-3000-1104": [{"type": "func","func": right_left_attack_HM}],
	//后闪+旋转or前后砸
	"s-920-3000-1202": [{"type": "text","sub_type": "notification","message": "&#x65CB;&#x8F6C;or&#x524D;&#x540E;&#x7838;"}],
	//蓝球+镭射
	"s-920-3000-1120": [{"type": "text","sub_type": "notification","message": "&#x5251;&#x6C14;&#x653B;&#x51FB;"}],
	
//三王 愤怒

	//愤怒:点名出剑刃风暴,手里握蓝球挥蓝球（2204）,剑刃风暴（2121）
    "s-920-3000-2204": [{"type": "text","sub_type": "notification","message": "&#x6124;&#x6012;&#xFF1A;&#x70B9;&#x540D;&#x5251;&#x6C14;"}],	
    //剑舞前戳+逆时针旋转+右手扇形攻击+外到内甜甜圈 注:坦右边安全,打左边安全请自行更改
    "s-920-3000-2109": SPAWNING_FIRST_CIRCLE_FLOWERS,
    //剑舞前戳+顺时针旋转+左手扇形攻击+内到外甜甜圈  注:坦左边安全,打右边安全请自行更改
	"s-920-3000-2111": SPAWNING_SECOND_CIRCLE_FLOWERS,	
    //前后砸
	"s-920-3000-2113": [{"type": "text","sub_type": "notification","message": "&#x524D;&#x540E;&#x7838;"}],
	
	//三重分身接旋转攻击？？？（待确定）
	//"s-920-3000-2203": [{"type": "text","sub_type": "notification","message": "后砸 请注意"}],
    //三重分身,剑刃风暴
	//"s-920-3000-2205": [{"type": "text","sub_type": "notification","message": "分身剑刃风暴,注意躲避"}],
	//黑白球,注意分配
	//"s-920-3000-2206": [{"type": "text","sub_type": "notification","message": "黑白球,注意分配"}],
    
	//2连斜上挥（2104）后接的后砸（2119）
	"s-920-3000-2104": [{"type": "func","func": right_left_attack_HM}],	
    //旋转攻击
	"s-920-3000-2115": [{"type": "text","sub_type": "notification","message": "&#x65CB;&#x8F6C;&#x653B;&#x51FB;"}],
	//点名大跳晕（2107）
    "s-920-3000-2107": [{"type": "text","sub_type": "notification","message": "&#x70B9;&#x540D;&#x5927;&#x8DF3;"}],
    //后闪+旋转or前后砸
	"s-920-3000-2202": [{"type": "text","sub_type": "notification","message": "&#x65CB;&#x8F6C;or&#x524D;&#x540E;&#x7838;"}],
	//蓝球+镭射
	"s-920-3000-2120": [{"type": "text","sub_type": "notification","message": "&#x6124;&#x6012;&#xFF1A;&#x5251;&#x6C14;&#x653B;&#x51FB;"}],

//三王特殊技能
    
	//召唤分身出点名剑气
	"s-920-3000-1400": [{"type": "text","sub_type": "notification","message": "&#x53EC;&#x5524;&#x5206;&#x8EAB;&#xFF1A;&#x70B9;&#x540D;&#x5251;&#x6C14;"}],
	//召唤分身出旋转攻击
    "s-920-3000-1401": [{"type": "text","sub_type": "notification","message": "&#x53EC;&#x5524;&#x5206;&#x8EAB;&#xFF1A;&#x65CB;&#x8F6C;&#x653B;&#x51FB;"}],
    
//三王色鉴颜色位置标识
/* -------------------------------- */        
    // 红色
    "ae-0-0-9203037": [{"type": "text","sub_type": "notification","message": "&#x7EA2;&#x8272;"},
	                   {"type": "func","func": change_colour.bind(null, 'red')}],
    // 黄色
    "ae-0-0-9203038": [{"type": "text","sub_type": "notification","message": "&#x9EC4;&#x8272;"},
					   {"type": "func","func": change_colour.bind(null, 'yellow')}],
    // 蓝色
    "ae-0-0-9203039": [{"type": "text","sub_type": "notification","message": "&#x84DD;&#x8272;"},
					   {"type": "func","func": change_colour.bind(null, 'blue')}],
    // 逆时针色鉴
    "s-920-3000-1317": [{"type": "func","func": set_clockwise.bind(null, false)}],
    // 顺时针色鉴
    "s-920-3000-1318": [{"type": "func","func": set_clockwise.bind(null, true)}]

    /* -------------------------------- */
};