/*
* custom alert jQuery Plugin
* author Yoon  (info@billible.co.kr) [http://billible.co.kr]
*
* version 1.0.2 [JUL. 2022]
*
* @changelog
* v 1.0.1      ->   2020.07 플러그인 완성
* v 1.0.2      ->   버튼 위치 변경 옵션 추가
* 
* 2022.05.17	비브이에스	- 디자인 변경
*/

/*
 * 사용양식 ex
 * $.confirm('내용',{
    	callEvent:function(){ },
    	cancelEvent:function(){ }
	});
	
	$.alert('내용');
 */
(function($) {

    $.fn.alert = function(msg,op) {$(this).queue(function(){$.alert(msg,op);});};
    $.fn.alertIssue = function(msg,op) {$(this).queue(function(){$.alert(msg,op);});};
    $.fn.confirm = function(msg,op) {$(this).queue(function(){$.alert(msg,op);});};
    $.fn.prompt = function(msg,op) {$(this).queue(function(){$.alert(msg,op);});};
    $.fn.yn = function(msg,op) {$(this).queue(function(){$.alert(msg,op);});};

    var con = {
        idx:'IDX'+Math.floor(Math.random()*1000),
        tt :'TT'+Math.floor(Math.random()*1000),
        tb :'TB'+Math.floor(Math.random()*1000),
        em:'EM'+Math.floor(Math.random()*1000),
        btn:'BTN'+Math.floor(Math.random()*1000),
        input:'INPUT'+Math.floor(Math.random()*1000),
        opClass:'popup_open',
        sp:'body',
        op : {
            title:'�˸�',
            em:'',
            buttonReverse:false,
            callEvent:null,
            cancelEvent:null,
            yesEvent:null,
            noEvent:null,
            confirmButton:'Ȯ��',
            cancelButton:'���',
            yesButton: '��',
            noButton: '�ƴϿ�',
            issueButton:'�߱�',
            input:'text',
            value:null
        }
    },frame = function(){
    	var obj = '<div class="modal" >'
                    + '<div id="'+con.idx+'" class="over-modal dialog alertModal" style="padding:0px;">'
                    + '<div class="pop-container">'
    				+ '<h2 class="popTit">Ȯ��</h2>'
    				+ '<p id="'+con.tb+'" class="question"></p>'
    				+ '<div class="pop-footer">'
    				+ '<div class="btn-area popup-btn close" id="'+con.btn+'">';
    				+ '</div>'
    				+ '</div>'
    				+ '</div>'
    	return $(obj);
    }
    ,input = {
        text:function(){return $('<div class="input-box">').append('<input id="'+con.input+'" type="text">')},
        tel:function(){return $('<div class="input-box">').append('<input id="'+con.input+'" type="tel">')},
        number:function(){return $('<div class="input-box">').append('<input id="'+con.input+'" type="number">')},
        password:function(){return $('<div class="input-box">').append('<input id="'+con.input+'" type="password">')}
    }
    ,button = {
        alert:function(op){return $('<button type="button" class="confirm btn btn-primary">'+op.confirmButton+'</button>')},
        alertIssue:function(op){return $('<button type="button" class="confirm btn btn-primary">'+op.issueButton+'</button>')},
        confirm:function(op){return $('<button type="button" class="close btn btn-secondary">'+op.cancelButton+'</button>' 
        								+ '<button type="button" class="confirm btn btn-primary">'+op.confirmButton+'</button>')},
        prompt:function(op){return $('<button type="button" class="close btn btn-secondary">'+op.cancelButton+'</button>' 
										+ '<button type="button" class="confirm btn btn-primary">'+op.confirmButton+'</button>')},
        yn:function(op){return $('<button type="button" class="close btn btn-secondary">'+op.noButton+'</button>' 
										+ '<button type="button" class="confirm btn btn-primary">'+op.yesButton+'</button>')},
    },event = {
        creation:function(fn){$(con.sp).append(frame());fn();},
        confirm: function(op){event.close();event.callEvent(op)},
        cancel: function(op){event.close();event.cancelEvent(op)},
        close: function(){$(con.sp).removeClass(con.opClass);$('#'+con.idx).closest('.modal').remove();$(".modal").hide();},
        show: function(){$(con.sp).addClass(con.opClass);},
        callEvent:function(op){if (typeof op.callEvent == 'function') op.callEvent(op.value);},
        cancelEvent:function(op){if (typeof op.cancelEvent == 'function') op.cancelEvent();},
        yesEvent:function(op){if (typeof op.yesEvent == 'function') op.yesEvent(op.value);},
        noEvent:function(op){if (typeof op.noEvent == 'function') op.noEvent();}
    }

    function init(){
        /*reset*/
    }

    $.alert = function(msg,op) {
    	$(".alertModal").remove();
//        if($("body").hasClass(con.opClass))return false;
        if(typeof msg =='function' || typeof msg =='object') msg='['+typeof msg+']';

        op = $.extend({}, con.op,op);
        event.creation(function(){
            $("#"+con.idx).addClass('alert');
            $("#"+con.idx).find('#'+con.btn).append(button.alert(op));
            if(op.title)$("#"+con.idx).find('#'+con.tt).html(op.title); else $("#"+con.idx).find('#'+con.tt).remove();
            $("#"+con.idx).find('#'+con.tb).html(msg.replace(/(?:\r\n|\r|\n)/g, "<br />"));
            $("#"+con.idx).find('#'+con.em).html(op.em);
            $("#"+con.idx).find('#'+con.btn).find('.confirm').unbind('click.confirm').bind('click.confirm',function(e){
                e.preventDefault()
                event.confirm(op);
            })
            $("#" + con.idx).find('.TopCloseBtn').unbind('click.close').bind('click.close', function (e) {
                e.preventDefault()
                event.cancel(op);
            })
            event.show();
        })

        $('.alertModal').show();
        $(".modal").show();
        $("button.confirm").focus();
    };

    $.alertIssue = function(msg,op) {
    	$(".alertModal").remove();
//        if($("body").hasClass(con.opClass))return false;
        if(typeof msg =='function' || typeof msg =='object') msg='['+typeof msg+']';

        op = $.extend({}, con.op,op);
        event.creation(function(){
            $("#"+con.idx).addClass('alertIssue');
            $("#"+con.idx).find('#'+con.btn).append(button.alertIssue(op));
            if(op.title)$("#"+con.idx).find('#'+con.tt).html(op.title); else $("#"+con.idx).find('#'+con.tt).remove();
            $("#"+con.idx).find('#'+con.tb).html(msg.replace(/(?:\r\n|\r|\n)/g, "<br />"));
            $("#"+con.idx).find('#'+con.em).html(op.em);
            $("#"+con.idx).find('#'+con.btn).find('.confirm').unbind('click.confirm').bind('click.confirm',function(e){
                e.preventDefault()
                event.confirm(op);
            })
            $("#" + con.idx).find('.TopCloseBtn').unbind('click.close').bind('click.close', function (e) {
                e.preventDefault()
                event.cancel(op);
            })
            event.show();
        })

        $('.alertModal').show();
        $(".modal").show();
        $("button.confirm").focus();
    };

    $.confirm = function(msg,op) {
    	$(".alertModal").remove();
//        if($("body").hasClass(con.opClass))return false;
        if(typeof msg =='function' || typeof msg =='object') msg='['+typeof msg+']';

        op = $.extend({}, con.op,op);
        event.creation(function() {
            $("#" + con.idx).addClass('confirm');
            $("#" + con.idx).find('#' + con.btn).append(button.confirm(op));
            $("#" + con.idx).find('#' + con.tt).html(op.title);
            $("#" + con.idx).find('#' + con.tb).html(msg.replace(/(?:\r\n|\r|\n)/g, "<br />"));
            $("#" + con.idx).find('#' + con.em).html(op.em);
            $("#" + con.idx).find('#' + con.btn).find('.confirm').unbind('click.confirm').bind('click.confirm', function (e) {
                e.preventDefault()
                event.confirm(op);
            })
            $("#" + con.idx).find('#' + con.btn).find('.close').unbind('click.close').bind('click.close', function (e) {
                e.preventDefault()
                event.cancel(op);
            })
            $("#" + con.idx).find('.TopCloseBtn').unbind('click.close').bind('click.close', function (e) {
                e.preventDefault()
                event.cancel(op);
            })
            event.show();
        })
        
        $('.alertModal').show();
        $(".modal").show();
        $("button.close").focus();
    };

    $.prompt = function(msg,op) {
    	$(".alertModal").remove();
//        if($("body").hasClass(con.opClass))return false;
        if(typeof msg =='function' || typeof msg =='object') msg='['+typeof msg+']';

        op = $.extend({}, con.op,op);
        event.creation(function() {
            console.log(op);
            $("#" + con.idx).addClass('prompt');
            $("#" + con.idx).find('#' + con.btn).before(input[op.input]());
            $("#" + con.idx).find('#' + con.btn).append(button.prompt(op));
            $("#" + con.idx).find('#' + con.tt).html(op.title);
            $("#" + con.idx).find('#' + con.tb).html(msg.replace(/(?:\r\n|\r|\n)/g, "<br />"));
            $("#" + con.idx).find('#' + con.em).html(op.em);
            $("#" + con.idx).find('#' + con.btn).find('.confirm').unbind('click.confirm').bind('click.confirm', function (e) {
                e.preventDefault()
                op.value =$("#" + con.idx).find('#' + con.input).val();
                event.confirm(op);
            })
            $("#" + con.idx).find('#' + con.btn).find('.close').unbind('click.close').bind('click.close', function (e) {
                e.preventDefault()
                event.cancel(op);
            })
            event.show();
        })
        
        $('.alertModal').show();
        $(".modal").show();
    };

    $.yn = function(msg,op) {
    	$(".alertModal").remove();
        if(typeof msg =='function' || typeof msg =='object') msg='['+typeof msg+']';

        op = $.extend({}, con.op,op);
        event.creation(function(){
            $("#"+con.idx).addClass('yn');
            $("#"+con.idx).find('#'+con.btn).append(button.yn(op));
            if(op.title)$("#"+con.idx).find('#'+con.tt).html(op.title); else $("#"+con.idx).find('#'+con.tt).remove();
            $("#"+con.idx).find('#'+con.tb).html(msg.replace(/(?:\r\n|\r|\n)/g, "<br />"));
            $("#"+con.idx).find('#'+con.em).html(op.em);
            $("#"+con.idx).find('#'+con.btn).find('.confirm').unbind('click.confirm').bind('click.confirm',function(e){
                e.preventDefault()
                event.confirm(op);
            })
            $("#" + con.idx).find('.TopCloseBtn').unbind('click.close').bind('click.close', function (e) {
                e.preventDefault()
                event.cancel(op);
            })
            event.show();
        })

        $('.alertModal').show();
        $(".modal").show();
        $("button.confirm").focus();
    };

    $.close = function(){
        if($("body").hasClass(con.opClass)) event.close();
    }
    
    //init()
})(jQuery);
