function getCurrentTime(){
  let date=new Date().toTimeString().split(" ")[0].split(":")
  return date.map((val,idx)=>{
    let temp=parseInt(val)
    if(idx==0 && val>12) temp-=12
    if(idx==0 && val<1) temp+=12
    return temp
  })
}

const ORIGINX=250
const ORIGINY=250
const HLEN=110
const MLEN=180
const SLEN=180
const PI=Math.PI

const canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

setInterval(()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height)
  const HMS=getCurrentTime()
  console.log(HMS)
  ctx = canvas.getContext("2d");

  // Draw clock circle
  ctx.beginPath()
  ctx.lineWidth=3
  ctx.arc(ORIGINX,ORIGINY,200,0,2*Math.PI)
  ctx.strokeStyle="black"
  ctx.stroke()
  ctx.closePath()

  // Draw minute arm of length 180
  ctx.beginPath()
  ctx.lineWidth=6
  ctx.moveTo(ORIGINX,ORIGINY)
  ctx.lineTo(Math.round(MLEN*Math.sin(HMS[1]*PI/30+HMS[2]*PI/1800))+ORIGINX,
            Math.round(-MLEN*Math.cos(HMS[1]*PI/30+HMS[2]*PI/1800))+ORIGINY)
  ctx.strokeStyle="blue"
  ctx.stroke()
  ctx.closePath()

  // Draw hour arm of length 110
  ctx.beginPath()
  ctx.lineWidth=6
  ctx.moveTo(ORIGINX,ORIGINY)
  ctx.lineTo(Math.round(HLEN*Math.sin(HMS[0]*PI/6+HMS[1]*PI/360+HMS[2]*PI/21600))+ORIGINX,
            Math.round(-HLEN*Math.cos(HMS[0]*PI/6+HMS[1]*PI/360+HMS[2]*PI/21600))+ORIGINY)
  ctx.strokeStyle="green"
  ctx.stroke()
  ctx.closePath()

  // Draw second arm of length 180
  ctx.beginPath()
  ctx.lineWidth=3
  ctx.moveTo(ORIGINX,ORIGINY)
  ctx.lineTo(Math.round(SLEN*Math.sin(HMS[2]*PI/30))+ORIGINX,
            Math.round(-SLEN*Math.cos(HMS[2]*PI/30))+ORIGINY)
  ctx.strokeStyle="red"
  ctx.stroke()
  ctx.closePath()
},1000)