$(window).on('load', function(){
	typeLayout.init();
});

var typeLayout = {
	val : {
		typeKeyNav : "",							//Ű�����̵� ����� ���º���
		conts_loc : $(window).scrollTop(),			//scrolltop
	},
	init : function(){
		typeLayout.layoutSet();
		typeLayout.gnb.init();
		typeLayout.snb();
	},
	layoutSet : function(){
		/*** GNB/SNB ***/
	
		/*** Contents ***/

		/*** snbOn ***/
		$("#snb_nav").each(function(){
			if("N" == snbCrt1Is || "N" == snbCrt2Is || "N" == snbCrt3Is){
				return
			}

			var snbBtn1 = $('<button type="button" class="dep1"><h1>' + snbCrt1.text() + '</h1></button>');
			var snbBtn2 = $('<button type="button" class="dep2"><h1>' + snbCrt2.text() + '</h1></button>');
			var snbBtn3 = $('<button type="button" class="dep3"><h1>' + snbCrt3.text() + '</h1></button>');

			snbBtn1.insertBefore($("#snb"));
			
			if(gnbDep2 == 0) {
				$("#snb_nav .snb_area>button:nth-of-type(1)").addClass("on");
			}else if(gnbDep3 == 0){
				snbBtn2.insertBefore($("#snb"));
				$("#snb_nav .snb_area>button:nth-of-type(2)").addClass("on");
			}else{
				snbBtn2.insertBefore($("#snb"));
				snbBtn3.insertBefore($("#snb"));
				$("#snb_nav .snb_area>button:nth-of-type(3)").addClass("on");
			}
		});

		/*** Footer ***/
		/* ž��ư */
		$("#btn_top").click(function(){
			$("html, body").stop().animate({
				scrollTop : 0
			}, 150);
		});

		//scroll
		$(window).scroll(function(){
			typeLayout.val.conts_loc = $(window).scrollTop();
			
			// sticky();

			//ž��ư Ǫ������
			if(typeLayout.val.conts_loc > 50){
				$("#btn_top").fadeIn()
			}else{
				$("#btn_top").fadeOut()
			}

			var stickyBtmWrap = $('body .stickyBtm_wrap');
			var topBtn = $('body .topBtn');

			if (stickyBtmWrap.length > 0) {
				if (stickyBtmWrap.hasClass('off')) {
					topBtn.removeClass('upBtn');
				} else {
					topBtn.addClass('upBtn');
				}
			}
		});

		//����� GNB ��ũ�ѽ� ���̰Ի�ó��
		// $("header>nav #gnb").scroll(function(){
		// 	mobileGnb();
		// });
		// function mobileGnb(){
		// 	$("header>nav #gnb").css({
		// 		"height": window.innerHeight - $("header .top_util").innerHeight()
		// 	});
		// }

		// sticky();
		// function sticky(){
		// 	if(ui.lockBody.val.mobileBodyLock == "N"){	
		// 		if($(window).scrollTop() > 60){
		// 			$("body").addClass('stickyFix');
		// 		}else{
		// 			$("body").removeClass('stickyFix');
		// 		}

		// 		if($(window).scrollTop() > 200){
		// 			$("body").addClass("snbSticky")
		// 		} else{
		// 			$("body").removeClass("snbSticky")
		// 		}
		// 	}
		// }
	},
	//GNB �̺�Ʈ
	gnb  : {
		init : function(){
			$("#dock .dock_gnb").click(function(){
				//�ʱ�ȭ
				$("body").removeAttr('style');
				$("header>nav #gnb").removeAttr('style');
				$("header>nav #gnb ul.menuM>li").removeClass('act');
				$("header>nav #gnb>li.on").addClass('act');
				$("header>nav #gnb ul.menuM>li.on").addClass('act');
				$("header>nav #gnb ul.menuM>li>a").removeAttr("style");

				// �����϶�, ���� �޴��϶� GNB Ŭ�� �� ù��° �޴� ����
				if($('body').hasClass('typeMain')){
					$('#header nav #gnb>li:first-child>a').trigger('click')
				}
				
				if($('#header nav #gnb>li.hidden').hasClass('on')){
					$('#header nav #gnb>li:first-child>a').trigger('click')
				}
				
				//����
				ui.lockBody.lock();
				
				$("#gnb_dim").addClass('on');
				$("#header").addClass('gnbOn');
				// $("header>nav #gnb").css({
				// 	"height": window.innerHeight - $("header .top_util").innerHeight()
				// });

				//���� ���ټ� �ڵ�
				ui.accessibility.focusloop("header>nav");
			});

			// 1���� Ŭ�� �̺�Ʈ
			$("header>nav #gnb>li>a").click(function(event){
				if($(this).parent('li').hasClass('child')){
					if(!$(this).parent('li').hasClass('act')){
						$("header>nav #gnb>li, header>nav #gnb li").removeClass('act');
						// $("header>nav #gnb>li, header>nav #gnb li").removeClass('on');

						$(this).parent('li').addClass('act');
						return false;
					}else{
						// $("header>nav #gnb>li, header>nav #gnb li").removeClass('act');
						// $("header>nav #gnb>li, header>nav #gnb li").removeClass('on');
						return false;
					}
				}
			});

			//2���� Ŭ�� �̺�Ʈ
			$("header>nav #gnb ul.menuM>li>a:first-of-type").click(function(event){
				if($(this).parent('li').hasClass('child')){
					if(!$(this).parent('li').hasClass('act')){
						$("header>nav #gnb ul.menuM>li").removeClass('act');

						$(this).parent('li').addClass('act');
						$(this).siblings('ul').slideDown(200);
						return false;
					}else{
						$("header>nav #gnb ul.menuM>li").removeClass('act');
						return false;
					}
				}else{
					return true;
				}
			});

			//�޴� �ݱ�
			$("header nav .btn_close").click(function(){
				typeLayout.gnb.mBtnClose();
			});
			/*********************************/
		},
		//����� GNB �ݱ�
		mBtnClose : function(){
			ui.lockBody.unlock();
			
			$("#gnb_dim").removeClass('on');
			$("#header").removeClass('gnbOn');
			$("header>nav #gnb li").removeClass('act');

			//���� ���ټ� �ڵ�
			ui.accessibility.focusloopClose();
			$("header>nav").attr("aria-hidden", true);
		}
	},
	snb : function(){
		$("#snb_nav .snb_area>button").click(function(){
			$("#snb_nav").removeClass("active1 active2 active3");

			if($(this).index() == 0) {
				$("#snb_nav").addClass("active1");
			}else if(($(this).index() == 1)){
				$("#snb_nav").addClass("active2");
			}else{
				$("#snb_nav").addClass("active3");
			}
	
			if($(this).hasClass("active")) {
				$(this).removeClass("active");
				$("#snb").slideUp(50);
				//ui.accessibility.focusloopClose();
			}else{
				$("#snb_nav .snb_area>button").removeClass("active");
				$(this).addClass("active");

				if(window.innerWidth <= typeLayout.val.gnbBrakePoint){
					$("#snb").slideDown(100).css({"width" : "", "left" : ""});
					$("#dim").addClass('on').css('top','0px');
					$("#snb_nav #snb").css("max-height",($(window).innerHeight() - 111) * 0.9+"px");
				} else {
					$("#snb").slideDown(100).css({"width" : $(this).outerWidth() + 1, "left" : $(this).position().left - 1});
				}
			}
	
			if($("#snb_nav").hasClass("active1")) {
				if($(this).hasClass("active")){
					$(this).attr("title","1�����޴� Ȯ���");
				}else{
					$(this).attr("title","1�����޴� ��ҵ�");
				}
			}
			if($("#snb_nav").hasClass("active2")) {
				if($(this).hasClass("active")){
					$(this).attr("title","2�����޴� Ȯ���");
				}else{
					$(this).attr("title","2�����޴� ��ҵ�");
				}
			}
			if($("#snb_nav").hasClass("active3")) {
				if($(this).hasClass("active")){
					$(this).attr("title","3�����޴� Ȯ���");
				}else{
					$(this).attr("title","3�����޴� ��ҵ�");
				}
			}
		});
	}
}
