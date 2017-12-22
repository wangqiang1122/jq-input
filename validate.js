/**
 * Created by wang on 2017/12/18.
 */
(function(window){
  window.code=function (Numder,callback){//默认为六个
    var messageNum=[],fun,shu;//计算宽度
    var num=0;//索引记录
    var str1='  <div class="vaildate-v2" id="vaildateV2"> <input type="tel"   pattern="[0-9]*" size="1" maxlength="1" id="input"/> </div>';
    console.log(typeof Numder)
    if(typeof Numder=="number"){
      shu=Numder
    }else{
      shu=6
    }
    if(Numder&&typeof(Numder)=="function"){
      fun=Numder
    }else{
      fun=callback
    }
    for(var a=0;a<shu;a++){
      str1+="<span></span>"
    }
    $(".vaildate-v1").append(str1);//添加节点
    var input=document.getElementById("input");
    var blockSize=(100/shu).toFixed(4);//计算宽度
    input.style.width= $(".vaildate-v1").find("span")[0].offsetWidth-10+"px"
    input.focus()
    $(input).keyup(function(ev){
      if(ev.which==8){
        if(messageNum.length==shu){
          $(".vaildate-v1").find("span").eq(shu-1).text("");
          messageNum.pop();
          return
        }
        num--;
        num=num<0?0:num;
        messageNum.pop();
        $("#vaildateV2").css("left",blockSize*num+"%");
        $(".vaildate-v1").find("span").eq(num).text("")
      }else{
        if(this.value==" "||this.value==""){
          this.value="";
          return
        }
        ++num;
        if(num>=shu){
          num=num-1;
          messageNum[shu-1]=this.value;
          $(".vaildate-v1").find("span").eq(num).text(messageNum[num])
        }else{
          messageNum.push(this.value);
          this.value="";
          $("#vaildateV2").css("left",blockSize*num+"%")
          $(".vaildate-v1").find("span").eq(num-1).text(messageNum[num-1])
        }
      }
    });
    $(".vaildate-v1").click(function(){//获取焦点
      input.focus()
      $("#vaildateV2").css("z-index",10)
    });
    $(input).blur(function(){//失去焦点
      if(fun&&typeof(fun)=="function"){
        if(messageNum.length==6){
          fun({code:1,message:messageNum.join("")})
        }else{
          fun({code:0,message:"验证码输入错误"})
        }
      }
      $("#vaildateV2").css("z-index",0)
    })
  }
})(window)