var MAC={
	'Url': document.URL,
	'Title': document.title,
	'Cookie': {
		'Set': function(name,value,days){
			var exp = new Date();
			exp.setTime(exp.getTime() + days*24*60*60*1000);
			var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			document.cookie=name+"="+escape(value)+";path=/;expires="+exp.toUTCString();
		},
		'Get': function(name){
			var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
			if(arr != null){ return unescape(arr[2]); return null; }
		},
		'Del': function(name){
			var exp = new Date();
			exp.setTime(exp.getTime()-1);
			var cval = this.Get(name);
			if(cval != null){ document.cookie = name+"="+escape(cval)+";path=/;expires="+exp.toUTCString(); }
		}
	},
	'Login':{
		'Display': true,
		'Init':function($id){
			if($("#"+$id).length==0){ return; }
			this.Create($id);
			$('#'+$id).hover(function(){
				MAC.Login.Show();
			}, function(){
				MAC.Login.FlagHide();
			});
			$("#loginbtn").click(function(){
				MAC.Login.In();
			});
		},
		'Show': function(){
			$('#login_box').show();
		},
		'Hide': function(){
			$('#login_box').hide();
		},
		'FlagHide': function(){
			$('#login_box').hover(function(){
				MAC.Login.Display = false;
				MAC.Login.Show();
			}, function(){
				MAC.Login.Display = true;
				MAC.Login.Hide();
			});
			if(MAC.Login.Display){
				MAC.Login.Hide();
			}
		},
		'Info':function(){
			$.ajax({type:'get',url: SitePath + 'index.php?m=user-ajaxinfo',dataType:'json',timeout: 5000,
				error: function(){
					alert('登录失败');
				},
				success: function($r){
					$("#username").html($r.u_name);
					$("#userpoint").html($r.u_points);
					$("#groupname").html($r.ug_name);
				}
			});
		},
		'Create':function($id){
			if($("#login_box").length>0){ $("#login_box").remove(); }
			html = '<div class="drop-box login_box" id="login_box" style="display: none;">';
			if(MAC.Cookie.Get('userid')!=undefined && MAC.Cookie.Get('userid')!=''){ 
				html+='<ul class="logged"><li><a target="_blank" href="'+SitePath+'index.php?m=user-index">我的资料</a></li><li class="logout"><a class="logoutbt" href="javascript:;" onclick="MAC.Login.Out(\''+$id+'\');" target="_self"><i class="ui-icon user-logout"></i>退出</a></li></ul>';
			}
			else{
				html+='<form id="loginform" onsubmit="return false;" action="'+SitePath+'index.php?user-check" method="post"><div class="formitem"><label>用户：</label><input name="username" type="text"  class="input" id="username"/></div><div class="formitem"><label>密码：</label><input name="userpass" type="password" class="input" id="userpass"/></div><div class="formitem"><a class="qq-login" href="'+SitePath+'index.php?m=user-reg-ref-qqlogin.html"></a> <input class="formbutton" id="loginbtn" type="submit" value="登 录"></div><div class="formitem"><a title="忘记密码" class="forgotpass" href="'+SitePath+'index.php?m=user-findpass.html">忘记密码?</a>  <a class="reg-btn" href="'+SitePath+'index.php?m=user-reg.html" target="_blank">还没有账号?</a></div></form>';
			}
			
			html += '</div>';
			$('#'+$id).after(html);
			var w = $('#'+$id).width();
			var h = $('#'+$id).height();
			var position = $('#'+$id).position();
			$('#login_box').css({'left':position.left,'top':(position.top+h)});
		},
		'Out':function($id){
			$.ajax({type:'get',url: SitePath + 'index.php?m=user-logout',timeout: 5000,
				success: function($r){
					MAC.Cookie.Set('userid','',0);
					MAC.Login.Create($id);
				}
			});
		},
		'In':function(){
			if($("#username").val()==''){ alert('请输入账户'); }
			if($("#userpass").val()==''){ alert('请输入密码'); }
			$.ajax({type: 'post',url: SitePath + 'index.php?m=user-check', data:'u_name='+$("#username").val()+'&u_password='+$("#userpass").val(),timeout: 5000,
				error: function(){
					alert('登录失败');
				},
				success: function($r){
					if($r.indexOf('您输入')>-1){
						alert('账户或密码错误，请重试!');
					}
					else if($r.indexOf('登录成功')){
						location.href=location.href;
					}
					else{
						
					}
				}
			});
		}
	},
	'Lazyload':{
		'Show': function(){
			$("img.lazy").lazyload();
			try {  }catch(e){};
		},
		'Box': function($id){
			$("img.lazy").lazyload({
				 container: $("#"+$id)
			});	
		}
	},
	'UserFav':function(id){
		$.get(SitePath+"inc/ajax.php?ac=userfav&id="+id+"&rnd="+Math.random(),function(r){
			if(r=="ok"){ alert("会员收藏成功"); }
			else if(r=="login"){ alert('请先登录会员中心再进行会员收藏操作'); }
			else if(r=="haved"){ alert('您已经收藏过了'); }
			else{ alert('发生错误'); }
		});
	},
	'Hits':function(tab,id){
		$.get(SitePath+"inc/ajax.php?ac=hits&tab="+tab+"&id="+id,function(r){$('#hits').html(r);});
	},
	'Error':function(tab,id,name){
		MAC.Open(SitePath+"inc/err.html?tab="+tab+"&id="+id+"&name="+ encodeURI(name),400,220);
	},
		'AdsWrap':function(w,h,n){
		document.writeln('<img width="'+w+'" height="'+h+'" alt="'+n+'" style="background-color: #CCCCCC" />');
	},
	'Js':function(){
	
	}

}
$(function(){
	//异步加载图片初始化
	MAC.Lazyload.Show();
	//用户登录初始化
	MAC.Login.Init('login');
});