<script setup lang="ts">
import { Buffer } from 'buffer'
import {brotliDecode} from "./brotli"
import { inflate } from 'pako'
const songList = [
  "letting go",
  "six feet under",
  "if",
  "52",
  "I Love You",
  "卑",
  "微",
  "花",
  "笼",
  "囹圄",
  "落海",
  "下落",
  "下潜",
  "海风",
  "房间",
  "撒野",
  "三月",
  "赤伶",
  "游京",
  "告石",
  "大鱼",
  "画皮",
  "像鱼",
  "蔓延",
  "瑕疵",
  "呓语",
  "儿歌",
  "昔言",
  "谪仙",
  "海底",
  "指纹",
  "保留",
  "小宇",
  "故梦",
  "山眠",
  "野火",
  "后来",
  "百利甜",
  "难生恨",
  "两点半",
  "孽海记",
  "蝶恋花",
  "静悄悄",
  "七里香",
  "莫妮卡",
  "罗刹鸟",
  "伪善者",
  "童话镇",
  "喜欢你",
  "肯定否",
  "黑桃A",
  "鲁冰花",
  "花与马",
  "晚来客",
  "错位时空",
  "爱人错过",
  "等等等等",
  "那么骄傲",
  "易安难安",
  "气象站台",
  "往后余生",
  "漠河舞厅",
  "狂热忏悔",
  "人间指南",
  "夏天的风",
  "星空剪影",
  "命有波澜",
  "再见深海",
  "我是透明",
  "深海幻境",
  "从未背离",
  "乌梅子酱",
  "第三人称",
  "等雾散去",
  "别怕有光",
  "一爱难求",
  "我死我生",
  "遥远的你",
  "遗憾也值得",
  "在夜里跳舞",
  "晚来天欲雪",
  "所念皆星河",
  "丹青倦华容",
  "把爱情当真",
  "被驯服的象",
  "别找我麻烦",
  "江湖撰事录",
  "一直很安静",
  "白马入芦花",
  "我好喜欢你",
  "红色高跟鞋",
  "最后的旅行",
  "梦遣看花人",
  "阿拉斯加海湾",
  "化身孤岛的鲸",
  "推开世界的门",
  "人类饲养指南",
  "永不失联的爱",
  "热爱105℃的你",
  "一身诗意千寻瀑",
  "想找个人来爱我",
  "像你这样的朋友",
  "天生反骨的鸵鸟",
  "陪你度过漫长岁月",
  "我的一个道姑朋友",
  "孤独是生命的礼物",
  "夜是克莱因蓝的忧伤",
  "曾经我也想一了百了",
  "就让这大雨全都落下",
  "燕子 没有你我要怎么活",
  "遇见你的时候所有星星都落到我头上",
  "公主殿下"
];


const cutBuffer = (buffer: Buffer) => {
  const bufferPacks: Buffer[] = []
  let size: number
  try{
        for (let i = 0; i < buffer.length; i += size) {
            
            size = buffer.readInt32BE(i);
            bufferPacks.push(buffer.slice(i, i + size))
        }
    }catch(e){
        
    }
  return bufferPacks
}

const addList = (userName,englishCount,chineseCount,songName)=>{
    let itemList = document.getElementById('itemList');
    // 创建新的列表项并添加到列表中
    const li = document.createElement('li');
    li.setAttribute('class', 'list-style-zero p-relative over-hidd text-nowrap font-md');
    let divString;
    if((chineseCount*2+englishCount)>=23){
      let length = chineseCount*2+englishCount;
      var scrollDistance = -((length-23)*5) + "px";
      let animation = `animation: scrollText_${length} linear infinite;`
      
      var dynamicKeyframes = `@keyframes scrollText_${length} {
        0% {
          text-indent: 0;
        }
        50% {
          text-indent: ${scrollDistance};
        }
        100% {
          text-indent: 0;
        }
      }`;

      // 创建 <style> 元素并将当前 <li> 元素的动态 @keyframes 规则添加到其中
      var styleElement = document.createElement("style");
      styleElement.innerHTML = dynamicKeyframes;
      document.head.appendChild(styleElement);
      divString = {div:'<div class="dis-inline-block p-absolute over-hidd marg-4" style="'+animation+' animation-duration: 20s;animation-timing-function: linear;"><div class="dis-inline-block song-styles-lis-anime p-relative"><span class="song-styles-anime-title pad-4 font-md" style="color:undefined;"> '+songName+'   </span><span class="song-styles-anime-username font-mini-md">'+userName+'</span></div></div>',songName: songName};
    }else{
      divString = {div:'<div class="dis-inline-block p-absolute over-hidd marg-4"><div class="dis-inline-block song-styles-lis-anime p-relative"><span class="song-styles-anime-title pad-4 font-md" style="color:undefined;"> '+songName+'   </span><span class="song-styles-anime-username font-mini-md">'+userName+'</span></div></div>',songName: songName};
    }
    
    li.innerHTML = divString.div;
    const button = document.createElement('button');
    button.setAttribute('class','btn btn1');
    button.setAttribute('songName',songName);
    button.addEventListener('click', () => {
        // 获取要复制的内容
        const content = button.getAttribute('songName');
        // 创建临时的文本输入框
        const input = document.createElement('input');
        input.style.position = 'fixed';

        input.style.opacity = "0";
        if(content!=null){
            input.value = content;
        }
        document.body.appendChild(input);
        // 选择文本
        input.select();
        input.setSelectionRange(0, input.value.length);    
        // 复制文本到剪贴板
        document.execCommand('copy');  
        // 移除临时文本输入框
        document.body.removeChild(input);  
        // 在控制台输出复制的内容
        console.log('已复制到剪贴板：', content);

    });
    li.appendChild(button);
    const buttonDel = document.createElement('button');
    buttonDel.setAttribute('class','btn-del btn1-del');
    buttonDel.addEventListener('click', () => {
       const li = button.parentNode;
       if(li!=null && li.parentNode!=null){
        // 从列表中删除该列表项
        li.parentNode.removeChild(li);
       }
    });
    li.appendChild(buttonDel);
    if(itemList!=null){
        itemList.appendChild(li);
    }
}

const makeDecoder = () => {
  const decoder = async (buffer: Buffer) => {
    const packs = await Promise.all(cutBuffer(buffer)
      .map(async buf => {
        const body = buf.slice(16)
        const protocol = buf.readInt16BE(6)
        const operation = buf.readInt32BE(8)
        function adjustArrayBuffer(arrayBuffer) {
            const byteLength = arrayBuffer.byteLength;
            const adjustedLength = Math.ceil(byteLength / 8) * 8;
            if (byteLength === adjustedLength) {
              return arrayBuffer;
            }
          
            const adjustedArrayBuffer = new ArrayBuffer(adjustedLength);
            const sourceArray = new Uint8Array(arrayBuffer);
            const targetArray = new Uint8Array(adjustedArrayBuffer);
            targetArray.set(sourceArray);
          
            return adjustedArrayBuffer;
        }
        let type = 'unknow'
        if (operation === 3) {
          type = 'heartbeat'
        } else if (operation === 5) {
          type = 'message'
        } else if (operation === 8) {
          type = 'welcome'
        }
        
        let data: any
        if (protocol === 0) {
          data = JSON.parse(String(body))
        }
        if (protocol === 1 && body.length === 4) {
          data = body.readUIntBE(0, 4)
        }
        if (protocol === 2) {
            data = await decoder(await Buffer.from(inflate(body)))
        }
        if (protocol === 3) {
            console.log("body3",body);
            data = await decoder(Buffer.from(brotliDecode(new Int8Array(body))))
        }
        if(protocol == 0 && data['cmd']=="DANMU_MSG"){
            console.log("data_result",data["info"]);
            
            const pattern = /^点歌\s+(.*)$/;
            const match = data["info"][1].match(pattern);
            var songName;
            if (match){
                songName = match[1];
            }else if(data["info"][1]==="随机点歌"){
                const randomIndex = Math.floor(Math.random() * songList.length);
                songName = songList[randomIndex];
            }
            if(songName){
                let size = data["info"][2][1].length + songName.length;
                var englishCount = (data["info"][2][1] + songName).replace(/[\u4e00-\u9fa5]/g, "").length;

                // 统计中文字符数量
                var chineseCount = (data["info"][2][1] + songName).match(/[\u4e00-\u9fa5]/g)?.length || 0;
                let userName = data["info"][2][1];
                
                addList(userName,englishCount,chineseCount,songName);
            }
        }
        return { buf, type, protocol, data }
      }))

    return packs.flatMap(pack => {
      if (pack.protocol === 2 || pack.protocol === 3) {
        return pack.data as typeof packs
      }
      return pack
    })
  }

  return decoder
}

type EncodeType = 'heartbeat' | 'join'


const socket = new WebSocket("wss://broadcastlv.chat.bilibili.com/sub");

// 监听连接成功事件
socket.onopen = () => {
  console.log("WebSocket 连接已建立");
  const hexString = "0000003f0010000100000007000000017b22756964223a32323637373131372c22726f6f6d6964223a31313035333031302c2270726f746f766572223a307d";
  let hexStringMatch = hexString.match(/.{1,2}/g);
// 将十六进制字符串解码为字节数组
if(hexStringMatch!=null){
    const byteArray = new Uint8Array(hexStringMatch.map(byte => parseInt(byte, 16)));
    // 创建 Uint8Array 对象
    const uint8Array = new Uint8Array(byteArray);

    // 获取 ArrayBuffer
    const arrayBuffer = uint8Array.buffer;
    sendBinaryMessage(arrayBuffer);
        setInterval(() => {
            var map = "000000120010000100000002000000017b7d".match(/.{1,2}/g);
            if(map!=null){
                const byteArray = new Uint8Array(map.map(byte => parseInt(byte, 16)));

                // 创建 Uint8Array 对象
                const uint8Array = new Uint8Array(byteArray);

                // 获取 ArrayBuffer
                const arrayBuffer = uint8Array.buffer;
                sendBinaryMessage(arrayBuffer);
            }
        }, 20000);
    };
}



// 监听接收消息事件
socket.onmessage = (event) => {
    const message = event;
    function promiseToArrayBuffer(promise) {
        return promise.then((result) => {
          if (result instanceof ArrayBuffer) {
            return result;
          } else if (result instanceof Blob) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
      
              reader.onload = () => {
                const arrayBuffer = reader.result;
                const adjustedArrayBuffer = adjustArrayBuffer(arrayBuffer);
                resolve(adjustedArrayBuffer);
              };
      
              reader.onerror = () => {
                const arrayBuffer = reader.result;
                const adjustedArrayBuffer = adjustArrayBuffer(arrayBuffer);
                resolve(adjustedArrayBuffer);
              };
      
              reader.readAsArrayBuffer(result);
            });
          } else {
            throw new Error('Invalid result type. Expected ArrayBuffer or Blob.');
          }
        });
      }
      
      function adjustArrayBuffer(arrayBuffer) {
        const byteLength = arrayBuffer.byteLength;
        const adjustedLength = Math.ceil(byteLength / 8) * 8;
        if (byteLength === adjustedLength) {
          return arrayBuffer;
        }
      
        const adjustedArrayBuffer = new ArrayBuffer(adjustedLength);
        const sourceArray = new Uint8Array(arrayBuffer);
        const targetArray = new Uint8Array(adjustedArrayBuffer);
        targetArray.set(sourceArray);
      
        return adjustedArrayBuffer;
      }
    promiseToArrayBuffer(event.data.arrayBuffer())
        .then((arrayBuffer) => {
            try{
                makeDecoder()(Buffer.from(arrayBuffer))
            }catch(error){
                console.log(error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    
};

// 监听连接关闭事件
socket.onclose = () => {
  console.log("WebSocket 连接已关闭");
};

// 监听连接错误事件
socket.onerror = (error) => {
  console.error("WebSocket 错误:", error);
};

// 发送消息
function sendBinaryMessage(data: ArrayBuffer | Blob) {
  socket.send(data);
}

// 关闭连接
function closeConnection() {
  socket.close();
}
</script>

<template>
    <div>
        <div  class="song-styles-retroeuro song-styles-back-retroeuro" style="width: 280px; height: 340px;">
            <ul id="itemList" style="text-align: left;border-left-width: 10px;padding-left: 20px;width: 240px; height: 320px; overflow: hidden;">
                
            </ul>
        </div>
  </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.form {
    display: flex;
    flex-direction: column;
}
.form input,
.form button {
    width: 400px;
    height: 50px;
    margin: 10px 0;
}
.song-styles-back-retroeuro {
    width: 500px;
    height: 600px;
    border-image: url(https://s8.i0f.cn/images/widget/chat/blive/retroeuro.png) stretch;
    border-image-slice: 160 fill;
    border-image-width: 160px;
    border-image-outset: 80px;
    padding: 10px 0 20px;
    z-index: 99
}
.list-container {
  overflow-y: auto;
}
.list-style-zero {
    list-style: inside decimal
}
.p-r,.p-relative {
    position: relative
}
.over-hidd {
    overflow: hidden
}
.text-nowrap {
    white-space: nowrap
}
.font-md>.footer-styles-back-watch {
    padding: 0 23px 0 74px
}
.font-md{
  font-size: 22px;
}
.footer-styles-back-watch {
    box-sizing: border-box
}
.footer-styles-back-watch>b {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    mask: url(https://s8.i0f.cn/images/widget/footer/stylers/watch-r.png) no-repeat right;
    -webkit-mask: url(https://s8.i0f.cn/images/widget/footer/stylers/watch-r.png) no-repeat right;
    mask-size: auto 100%;
    -webkit-mask-size: auto 100%;
    background-color: #0ff
}

.footer-styles-back-watch>i {
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
    mask: url(https://s8.i0f.cn/images/widget/footer/stylers/watch-c.png) no-repeat right;
    -webkit-mask: url(https://s8.i0f.cn/images/widget/footer/stylers/watch-c.png) no-repeat right;
    mask-size: 100% 100%;
    -webkit-mask-size: 100% 100%;
    background-color: #0ff
}

.footer-styles-back-watch>span {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    mask: url(https://s8.i0f.cn/images/widget/footer/stylers/watch-l.png) no-repeat left;
    -webkit-mask: url(https://s8.i0f.cn/images/widget/footer/stylers/watch-l.png) no-repeat left;
    mask-size: auto 100%;
    -webkit-mask-size: auto 100%;
    background-color: #0ff
}
.song-styles-retroeuro>ul>li {
    color: #ffe860;
    text-shadow: none;
}

.song-styles-retroeuro>ul>li>div>div>.song-styles-anime-title {
    color: #fef6c1;
    text-shadow: none
}

.dis-inline-block {
    display: inline-block
}
.over-hidd {
    overflow: hidden
}
.marg-4 {
    margin: 0 .25rem
}
.font-mini-md {
    font-size: 1rem
}

  @keyframes scrollText {
    0% {
      text-indent: 0;
    }
    50% {
      text-indent: -85px;
    }
    100% {
      text-indent: 0px;
    }
  }
.btn {
  display: none;
  position: absolute;
  top: 50%;
  right: 33px;
  width: 27px; /* 按钮宽度 */
  height: 27px; /* 按钮高度 */
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-position: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  background-size: contain; /* 图片缩放模式 */
  background-color: transparent; /* 背景透明 */
}
.btn.btn1 {
  background-image: url(https://s8.i0f.cn/images/widget/song/styles/retroeuro-copy.png);
}

.btn-del {
  display: none;
  position: absolute;
  top: 50%;
  right: 5px;
  width: 27px; /* 按钮宽度 */
  height: 27px; /* 按钮高度 */
  transform: translateY(-50%);
  background-repeat: no-repeat;
  background-position: center;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  background-size: contain; /* 图片缩放模式 */
  background-color: transparent; /* 背景透明 */
}
.btn-del.btn1-del {
  background-image: url(https://s8.i0f.cn/images/widget/song/styles/retroeuro-close.png);
}

li:hover button {
  display: inline-block;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

