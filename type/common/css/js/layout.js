$(document).ready(function() {
	ui.init();

	function goBack(){
		window.history.back();
	}
});



function popClose() {
	$(document).on('click', '.btn_popClose', function() {
		// alert('open');
		$('.pop_wrap').removeClass('on');
		$('.pop_wrap').find(".focuseouthidden").remove();
		$("[data-retrunFocus=Y]").focus();

		$(parent.document.body).css('overflow','');

		// var select = $(parent.document.body);
		// console.log(select)
	});
};

var ui = {
	init : function() {
		ui.select.init();
		ui.tabScroll.init();
		ui.LayerPop.init();
		ui.Tab.init();
		ui.loading.init();
		ui.Accordion.init();
		ui.btnSet.init();
		ui.datePick.init();
		ui.duetdatePick.init();
		ui.popPage.init();
		ui.field();
		ui.accessibility.GNB();
	},
	select : {
		init: function(){
			$('.custom select.selectBase').each(function (idx, selectObj){	
				// Create Pop Layer
				var customSelectBoxObj = $("#cutomSelectBoxTemplate").tmpl({});
				// $(customSelectBoxObj).find('.popTit').text($(selectObj).closest('div.formInput').find('.guide').text());
				var guideTxt =  $(selectObj).closest('div.formInput').find('.guide').clone();
				guideTxt.find('span').remove();
				$(customSelectBoxObj).find('.popTit').text(guideTxt.text()); 

				var selectTxt = '';
				$(selectObj).find('option').each(function(idx, optionObj) {
					if($(optionObj).is(':selected')){
						selectTxt = $(optionObj).text();
					}
					$(customSelectBoxObj).find('.optList').append('<button type="button" data-input="'+$(selectObj).attr('name')+'" data-val="'+$(optionObj).val()+'"><span>'+$(optionObj).text()+'</span></button>');
				});	
				//$(selectObj).closest('div').find('button.selectBase').data('popid','customSelectBox_'+idx);
				
				$(selectObj).closest('div').find('button.selectBase').attr('data-popid','customSelectBox_'+idx);
				$(selectObj).closest('div').find('button.selectBase').data('input',$(selectObj).attr('name'));
				$(customSelectBoxObj).attr('id','customSelectBox_'+idx);
				$(selectObj).closest('article').after($(customSelectBoxObj)); 	
				$(selectObj).closest('div').find('button.selectBase').html('<span>'+selectTxt+'</span>');

				// Create Input
				var temp_input = document.createElement('input');
				temp_input.setAttribute("type", "hidden");
				temp_input.setAttribute("name", $(selectObj).attr('name'));
				temp_input.setAttribute("value", $(selectObj).val());
				$(selectObj).closest("form").append(temp_input);

				// SelectBox Remove
				//console.log($(selectObj).length);
				$(selectObj).remove();
			});
			
			// Open Custom SelectBox
			$(document).on('click', '.custom button.selectBase', function() {
				$(this).attr("data-retrunFocus","Y");
				ui.LayerPop.Show("#"+$(this).data('popid'));

				ui.accessibility.focusloop("#"+$(this).data('popid'));
				return false;
			});
			
			// Click Custom SelectBox Option
			$(document).on('click', '[id^=customSelectBox_] div.optList button', function() {
				var popId = $(this).closest('div.bottomSheet').attr('id');
				var inputNm = $(this).data('input');
				$(this).parents('.optList').find('button').removeClass('on');
				$(this).addClass('on');

				var SelectOption = $(this).find('span').html();

				if(SelectOption != undefined){
					$('div.custom button[data-popid="'+popId+'"]').find('span').html(SelectOption);
					// Update selected input hidden
					if($('div.custom button[data-popid="'+popId+'"]').closest("form").find('[name='+inputNm+']').length>0){
						$('div.custom button[data-popid="'+popId+'"]').closest("form").find('[name='+inputNm+']').val($(this).data('val'));
					}else{
						var temp_input = document.createElement('input');
						temp_input.setAttribute("type", "hidden");
						temp_input.setAttribute("name", inputNm);
						temp_input.setAttribute("value", $(this).data('val'));
						$('div.custom button[data-popid="'+popId+'"]').closest("form").append(temp_input);
					}					
					$('div.custom button[data-popid="'+popId+'"]').val($(this).data('val'));
					$('div.custom button[data-popid="'+popId+'"]').trigger("change");
				}
				ui.LayerPop.Closed('#'+popId);
				ui.accessibility.focusloopClose();
			});
		}
	},
	btnSet : {
		init: function() {
			$("body *").each(function (e) {
				if ($(this).hasClass("stickyBtm_wrap")) {
					$(this).find('.stickyCont').each(function(e){
						let btnH = $(this).innerHeight();
						$(this).parent('.stickyBtm_wrap').css('height', btnH)

						// Default
						// var conts_Btmloc = $(window).scrollTop() + $(window).innerHeight();
						// if(conts_Btmloc - 65 > $("#footer").offset().top){
						// 	$('.stickyBtm_wrap').addClass('off')
						// } else{
						// 	$('.stickyBtm_wrap').removeClass('off')
						// }

						// typeSearch

						var nextSibling = $(".stickyBtm_wrap").next(':visible');

						if (nextSibling.length > 0) {
							$('.stickyBtm_wrap').addClass('middleBtn')
							$('.stickyBtm_wrap').css('height','')
						} else {
							$('.stickyBtm_wrap').removeClass('middleBtn')
						}

						// Scroll
						$(window).scroll(function() {
							var conts_Btmloc = $(window).scrollTop() + $(window).innerHeight();
							var stickyBtmWrap = $('body .stickyBtm_wrap'); 
							var topBtn = $('body .topBtn'); 

							$(document).on('click', '.AccordionBtn', function() {
								setTimeout(function () {
									conts_Btmloc = $(window).scrollTop() + $(window).innerHeight();
								}, 400)
							});

							// setTimeout(function() {
							// 	if(conts_Btmloc - 65 > $("#footer").offset().top){
							// 		$('.stickyBtm_wrap').addClass('off')
							// 	} else{
							// 		$('.stickyBtm_wrap').removeClass('off')
							// 	}
							// }, 100);

							if (stickyBtmWrap.length > 0) {
								if (stickyBtmWrap.hasClass('off')) {
								topBtn.removeClass('upBtn');
								} else {
								topBtn.addClass('upBtn');
								}
							}
						});

					})
				};
			});
		},
	},
	datePick : {
		init: function() {
			$("body *").each(function (e) {
				if ($(this).hasClass("typeDate")) {
					// back layer hide
					$(document).on('click', '.datepicker-layer', function() {
						ui.lockBody.unlock();
						$('.datepicker-layer').remove();
					});

					$('.ui-datepicker-year').on( "change", function() {
						alert('ok')
					});
				}
			});
		}
	},
	duetdatePick : {
		init: function() {
			const datePickerInternationalization = function () {
				const pickers = document.querySelectorAll(".duet-date-picker");
				const DATE_FORMAT = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
				
				for (let i = 0; i < pickers.length; i++) {
					const picker = pickers[i];
					
					picker.dateAdapter = {
						parse: function parse() {
							let value =
								arguments.length <= 0 || arguments[0] === undefined
									? ""
									: arguments[0];
							let createDate = arguments[1];
							
							const matches = value.match(DATE_FORMAT);
							if (matches) {
								return createDate(matches[3], matches[2], matches[1]);
							}
						},
						format: function format(date) {
							return (
								date.getFullYear() + "." +
								(date.getMonth() + 1 < 10
									? "0" + (date.getMonth() + 1)
									: date.getMonth() + 1) + "." +
								(date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
							);
						}
					};

					// picker.minDate = new Date("-30Y");
    				// picker.maxDate = new Date("+10Y");

					picker.localization = {
						buttonLabel: "��¥ ����",
						selectedDateMessage: "������ ��¥��",
						prevMonthLabel: "���� ��",
						nextMonthLabel: "���� ��",
						monthSelectLabel: "��",
						yearSelectLabel: "��",
						closeLabel: "â �ݱ�",
						keyboardInstruction: "ȭ��ǥ Ű�� ����Ͽ� ��¥�� Ž�� �� �� �ֽ��ϴ�.",
						calendarHeading: "��¥ ����",
						dayNames: ["��", "��", "��", "ȭ", "��", "��", "��"],
						monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
						monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
						// yearSelectOptions: generateYearOptions(new Date("-30Y").getFullYear(), new Date("+30Y").getFullYear())
					};
					
					document.addEventListener('DOMContentLoaded', function() {
						const datePickers = document.querySelectorAll(".duet-date-picker");
					
						const commonMinDate = "1970-01-01";
						const commonMaxDate = "2033-01-01";
					
						for (const datePicker of datePickers) {
							datePicker.setAttribute("min", commonMinDate);
							datePicker.setAttribute("max", commonMaxDate);
						}
					});

			};

			datePickerInternationalization();

			$(document).on('click', '.duet-date__toggle', function (e) {
				var dim = $('<div>', { class: 'datepicker-layer' });
				$('body').append(dim);
				ui.lockBody.lock();
			});

			$(document).on('click', '.duet-date__day', function (e) {
				$('.datepicker-layer').remove()
				ui.lockBody.unlock();
			});

			$(document).on('click', '.datepicker-layer', function (e) {
				$('.datepicker-layer').remove()
				ui.lockBody.unlock();
			});
		}
	}
	},
	Accordion: {
		init: function () {
			$("body .AccordionBase li").each(function () {
				var accordionItem = $(this);
				var accordionBtn = accordionItem.find(".AccordionBtn");
				if (accordionItem.hasClass("on")) {
					accordionBtn.attr({ "aria-expanded": true, "title": "Ȯ���" });
				} else {
					accordionBtn.attr("aria-expanded", false).removeAttr("title");
				}
			});
	
			$(document).on('click', '.AccordionBtn:not(.dataWrap)', function (e) {
				ui.Accordion.click(this);
			});
		},
		click: function (target) {
			if ($(target).parents("li").hasClass("on")) {
				$(target).parents("li").removeClass("on").find(".AccordionCont").slideUp(300);
				$(target).parents("li").find(".AccordionBtn").removeAttr("title").attr("aria-expanded", false);
			} else {
				$(target).parents("li").addClass("on").find(".AccordionCont").slideDown(300);
				$(target).parents("li").find(".AccordionBtn").attr({ "aria-expanded": true, "title": "Ȯ���" });
	
				ui.touchDim();
			}
		},
	},

	LayerPop : {
		init : function(){
			$(document).on('click', '.openLYpop', function () {
				var popTarget = $(this).attr("data-LYID"),
				popSize   = $(this).attr("data-LYsize");

				ui.LayerPop.Show(popTarget, popSize);
			});

			// ������
			$(document).on('click', '.openSnack', function () {
				var selectedTarget = $(this).attr("data-LYID");
				var snTarget = $('#' + selectedTarget);

				if($(this).is('[data-LYID]')){

					if(!snTarget.hasClass('on')){
						snTarget.addClass('on');

						setTimeout(function(){
							snTarget.removeClass('on');
						},3000)
					}
					
				}
			});

			// ����
			$(document).on('click', '.openTooltip', function () {
				var selectedTarget = $(this).attr("data-LYID");
				var tipTarget = $('#' + selectedTarget);

				if($(this).is('[data-LYID]')){
					if(!tipTarget.hasClass('on')){
						tipTarget.addClass('on');
					}
				}
			});

			$(document).on('click', '.btn_toolTipClose', function () {
				if($(this).parent('.toolTip').hasClass('on')){
					$(this).parent('.toolTip').removeClass('on')
				}
			});
		},
		iframe : function(iframeID, PopID, PopSize){
			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			}
			$(iframeID).addClass("on");

			$(iframeID).on('load', function() {
				$(iframeID).contents().find(PopID).attr("data-iframeID", iframeID);
				$(iframeID)[0].contentWindow.ui.LayerPop.Show(PopID, PopSize);
			});

			function lockPopLayout() {
				ui.lockBody.lock();
				var parentBody = window.parent.document.body;
				var parentHtml = window.parent.document.html;
				
				$(parentBody).css({
					height: "100%",
					overflow: "hidden"
				});

				$(parentHtml).css({
					height: "100%",
					overflow: "hidden"
				});
			}
			
			lockPopLayout();
		},
		Show : function(PopID, PopSize, open_callbackfcn, open_Pram, closed_callbackfcn, closed_Pram){
			//�ݱ� ����� ��Ŀ�� ���ϰ� ����
			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			}

			//�˾�����
			$(PopID).find(".popLayout").css("max-width", PopSize + "px");
			$(PopID).addClass('on');
			ui.lockBody.lock();

			ui.LayerPop.centerAlign(PopID);

			// �˾� �ΰ� �̻��϶� ����
			// var onElements = $('.pop_wrap.bottomSheet.on');
			// if (onElements.length >= 2) {

			// 	onElements.not(':first').css('background-color', 'rgba(0,0,0,0)');
			// }

			//�˾� ���� �ִ밪 ����
			ui.LayerPop.MaxHeight(PopID);

			//ù����, ������ Ÿ�� ���ý� ���ܻ��� �߰�
			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			//ù��°, ������ ��Ŀ�� ���� �� css�� display:none ó�� �Ǿ��ִ� Ÿ�� �и�
			$(PopID).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			//�˾� ���� ù��°, ������ Ÿ�� ����
			$(PopID).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(PopID).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			//�˾��� ��Ŀ�� �̵��� ������ �ϳ��� ������� ������ ������ ��Ŀ�� ��Ż ������ ���� ���翵��
			$(PopID).append("<div class='focuseouthidden' tabindex='0'></div>");

			//�˾��� ��ư�� ������� �˾������� ù��° ��Ŀ���� ����
			if($(PopID).find("a, button, input, select").length == 1){
				$(PopID).find(".popLayout").attr({"tabindex" : "0", "data-pop-focus":"first"});	
			}

			$(PopID).find('[data-pop-focus=first]').focus();
			
			$("body *").not(PopID).not(PopID + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
			//html ���� ���ؼ� aria-hidden ó�� ����
			var targetHtml = $(PopID);
			var endClass = targetHtml.parent().prop('tagName');
			
			for(var i = 0; i<20; i++){
				if(endClass != "BODY"){
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');

					targetHtml = targetHtml.parent();
					endClass = targetHtml.parent().prop('tagName');
					
					//console.log(endClass)
					
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');
				}
				else {
					break
				}
			}

			//���� �ݹ�
			if(open_callbackfcn != undefined){
				eval(open_callbackfcn)(open_Pram);
			}

			//�˾� �ݱ�
			// $(PopID).find('.btn_popClose').on("click",function(e){
			// 	ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			// });
			$(document).on('click', PopID + ' .btn_popClose', function(e) {
				ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			});
			

			//���ټ� : ù��°�ǿ��� shift + tab ��� ��������ư���� (�˾��� ��Ŀ�� ����)
			$(PopID).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(PopID).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			//���ټ� : �������ǿ��� tab ��� ù��° ��ư (�˾��� ��Ŀ�� ����)
			$(PopID).find("[data-pop-focus=last]").on("keydown", function(e){
				if(e.shiftKey == false && e.which == 9){
					$(PopID).find("[data-pop-focus=first]").focus();
					return false;
				}
			});

			// BottomSheet �˾� ���� ������ ���� Ŭ�� �� �ݱ�
			$(document).on('click', PopID + '.bottomSheet', function () {
				if (event.target === this) {
					ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
					ui.lockBody.unlock();
				}
			});

			
			// Custom SelectBox
			$(document).on("click", '[data-id=select] button', function(e) {
				$(this).parents('.optList').find('button').removeClass('on');
				$(this).addClass('on');
				
				var SelectOption = $(this).find('span').html();
				if (SelectOption != undefined) {
					$('button[data-retrunfocus="Y"] span').html(SelectOption);
				}
				
				ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			});
			


			// BottomSheet ��ũ�� �� ��� ��ũ�� ó��
			if($(PopID).hasClass('bottomSheet')){
				// $(PopID).find("h2").attr({ "tabindex": "0", "data-pop-focus": "first" });

				$.fn.hasScrollBar = function () {
					return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
				};

				if ($(PopID).find('.popInner').hasScrollBar()) {
					let $scrollArea = $(PopID).find('.popInner');

					if ($scrollArea.get(0).scrollWidth > $scrollArea.innerWidth() || $scrollArea.get(0).scrollHeight > $scrollArea.innerHeight() - 60) {
						$(PopID).find('.popInner').append("<div class='scroll-gradient'></div>");
						$(PopID).find(".scroll-gradient").show();
					}

				}

				$(PopID).find('.popInner').scroll(function() {
					var scrollTop = $(PopID).find('.popInner').scrollTop();
					var scrollHeight = $(PopID).find('.popInner').prop("scrollHeight");
					var clientHeight = $(PopID).find('.popInner').height();
					
					if (scrollTop + clientHeight >= scrollHeight) {
						$(".scroll-gradient").hide();
					} else {
						$(".scroll-gradient").show();
					}
				});

				var btnLen = $(PopID).find(".btnArea:not(.noSticky)").length;
				if( btnLen <= 0 ){
					$(".scroll-gradient").css('bottom','0')
				}
			
				var scrollTop = $(PopID).find('.popInner').scrollTop();
				var scrollHeight =$(PopID).find('.popInner').prop("scrollHeight");
				var clientHeight =$(PopID).find('.popInner').height();

				if (scrollTop + clientHeight >= scrollHeight) {
					$(".scroll-gradient").hide();
				} else {
					$(".scroll-gradient").show();
				}
			};
			
		},
		Closed : function(PopID, closed_callbackfcn, closed_Pram){

			// var firstPopup = $('.pop_wrap.bottomSheet.on').first();
			// console.log('firstPopup:', firstPopup);

			$(PopID).removeClass('on');
			$(PopID).find(".focuseouthidden").remove();
			$("[data-retrunFocus=Y]").focus();
			// $('body').css('overflow','');
			ui.lockBody.unlock();

			// if (firstPopup) {
			// 	lockPopLayout();
			// }

			function lockPopLayout() {
				ui.lockBody.unlock();
				var parentBody = window.parent.document.body; 
				var parentHtml = window.parent.document.documentElement; 

				$(parentBody).css({
					height: "",
					overflow: ""
				});

				$(parentHtml).css({
					height: "",
					overflow: ""
				});

				$(parentBody).find('#header, #container, footer').css({
					top: ""
				});
			}
			
			lockPopLayout();

			//����������üũ
			if ( self !== top ) {
				$("[data-retrunFocus=Y]", parent.document).focus().removeAttr("data-retrunFocus");
				$($(PopID).attr("data-iframeid"), parent.document).removeClass("on").remove();
			}

			$("body *").removeAttr("data-retrunFocus");
			$("[data-hidden=hidden]").removeAttr("data-hidden").removeAttr("aria-hidden");

			$(".pop_wrap.addHtmlPop").remove();
			$(".pop_wrap .scroll-gradient").remove();
			
			/* �ݱ� �ݹ� */
			if(closed_callbackfcn != undefined){
				eval(closed_callbackfcn)(closed_Pram);
			}
		},
		MaxHeight : function(PopID){
			var bottomHeight = $(PopID).find(".popBtnArea").innerHeight();
			if(bottomHeight == undefined){bottomHeight = 0}
			//�˾� ���� �ִ밪 ����
			// $(PopID).find(".popLayout").css({
			// 	"max-height": $(window).height() - bottomHeight
			// });
			//console.log(bottomHeight);
			//�������� �˾� ���� �ִ밪 ����
			// $(window).bind('resize load', function () {
			// 	$(PopID).find(".popLayout").css({
			// 		"max-height": $(window).height() - bottomHeight
			// 	});
			// });
		},
		centerAlign : function(PopID){
			//�˾� ��������(transform �����Ұ�� �帴�ϰ� ������ ���̽� �߻�)
			setTimeout(function(){
				$(PopID).find(".popLayout").css({
					"opacity" : "1"
				});
			},100)
		
			//��������
			$(window).bind('resize load', function () {
				$(PopID).find(".popLayout").css({
				})
			});
		},
		draw : function(conthtml, title, size){
			var popID = "popupDraw" + Math.round( Math.random()*100 );
			var PopHtml = "";
			PopHtml += '<div class="pop_wrap addHtmlPop" id="'+popID+'">';
			PopHtml += '	<section class="popLayout popLayer">';
			PopHtml += '		<h1 class="popTit">'+title+'</h1>';
			PopHtml += '		<div class="popConts">';
			PopHtml += '			<div class="popInner limit">';
			PopHtml += $(conthtml).html();
			PopHtml += '			</div>';
			// PopHtml += '		<button type="button" class="btn_popClose"><span class="hidden">â�ݱ�</span></button>';
			PopHtml += '		</div>';
			PopHtml += '	</section>';
			PopHtml += '</div>';

			$("body").append(PopHtml);
			ui.LayerPop.Show('#'+popID, size);
		}
	},
	popPage : {
		init : function(){
			if (document.querySelector('.pop_page')) {
				ui.lockBody.lock();
			} else {
				ui.lockBody.unlock();
			}
		}
	},
	tabScroll : {
		init : function(){
			ui.tabScroll.flexble();
		},
		flexble : function(){
			if($('[data-id=scrollTab]').length == 0){return false}
			
			var scrollTab = undefined;

			tabScrollLoc();
			
			function tabScrollLoc(){
				if (scrollTab == undefined) {
					var myScrollPos = $('[data-id=scrollTab]>ul>li.on').position().left + $('[data-id=scrollTab]>ul>li.on').outerWidth(true) / 2 + $('[data-id=scrollTab]>ul').scrollLeft() - $('[data-id=scrollTab]>ul').width() / 2;
					$("[data-id=scrollTab]>ul").scrollLeft(myScrollPos);
				}
			};

			if($('.subTabArea').length == 0){return false}
			
			var subScrollTab = undefined;

			subTabScrollLoc();
			
			function subTabScrollLoc(){
				if (subScrollTab == undefined) {
					var myScrollPos = $('#subTab>ul>li.on').position().left + $('#subTab>ul>li.on').outerWidth(true) / 2 + $('#subTab>ul').scrollLeft() - $('#subTab>ul').width() / 2;
					$("#subTab>ul").scrollLeft(myScrollPos);
				}
			}
		},
	},
	Tab : {
		init : function() {
			// $("body *").each(function(e){
			// 	if($(this).attr("role") == "tabEl"){
			// 		$(this).find("li").each(function(e){
			// 			if($(this).is(":visible") == true){
			// 				$(this).attr("role", "presentation");	
			// 				if($(window).width() < 768){
			// 					$(this).find("a").attr("role", "tab");
			// 				}
			// 			}	

			// 			if($(this).hasClass("on")){
			// 				$(this).find("a").attr({"aria-selected": true, "title":"���õ�"});
			// 			}else{
			// 				$(this).find("a").attr("aria-selected", false);
			// 				$(this).find("a").removeAttr("title");
			// 			}
			// 		});

			// 		$(this).find("ul a").on("click", function(e){
			// 			ui.Tab.click(this);
			// 		});
			// 	}
			// });
			$("body [role='tabEl']").each(function() {
				$(this).find("li").each(function() {
					if ($(this).is(":visible")) {
						$(this).attr("role", "presentation");
						if ($(window).width() < 768) {
							$(this).find("a").attr("role", "tab");
						}
					}
			
					if ($(this).hasClass("on")) {
						$(this).find("a").attr({
							"aria-selected": true,
							"title": "���õ�"
						});
					} else {
						$(this).find("a").attr("aria-selected", false);
						$(this).find("a").removeAttr("title");
					}
				});

				$(document).on('click', 'body [role="tabEl"] ul a', function(e) {
					ui.Tab.click(this);
				});
			});
		},
		click :function(target){
			$(target).parents("[role=tabEl]").find("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
			$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"���õ�"});

			//�ʱ�ȭȰ �� ID ����
			var hideID = [];
			$(target).parents("[role=tabEl]").find("a").each(function(e){
				hideID.push($(this).attr("data-tabID"));
			});
			for(i=0;i<hideID.length;i++){
				$("#" + hideID[i]).removeClass("on");
			}
			$("#"+$(target).attr("data-tabID")).addClass("on");
		},
		clickCk :function(target){
			if($(target).parents("li").hasClass("on")){
				$(target).parents("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
			} else{
				$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"���õ�"});
			}
		},
		clickRadio :function(target){			
			if($(target).parents("li").hasClass("on")){
				$(target).parents("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
			} else{
				$(target).parents("ul").find("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
				$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"���õ�"});
			}
		},
	},
	loading : {
		init: function() {
			const loadingWrap = $('.loadingWrap');

			if (loadingWrap.css('display') === 'block') {
				ui.lockBody.lock();
			} else {
				ui.lockBody.unlock();
			}
		}
	},
	field : function(){
		$('.inputBase').on('input', function() {
			toggleDeleteButton($(this));
		});

		$(document).on('click', '.keyRemove', function () {
			clearInput($(this));
		});

		function toggleDeleteButton(inputField) {
            const deleteButton = inputField.siblings('.keyRemove');

            if (inputField.val().length > 0) {
                deleteButton.css('opacity', '1');
            } else {
                deleteButton.css('opacity', '0');
            }
        }

        function clearInput(inputField) {
            inputField.prev('.inputBase').val('');
            toggleDeleteButton(inputField.prev('.inputBase'));
        }
	},
	accessibility : {
		//���̾� ������ ��Ŀ�� ���� �̺�Ʈ
		focusloop : function(area){

			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			} else {
				$("#skip_menu a").eq(0).attr("data-retrunFocus","Y");
			}

			//ù����, ������ Ÿ�� ���ý� ���ܻ��� �߰�
			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			//ù��°, ������ ��Ŀ�� ���� �� css�� display:none ó�� �Ǿ��ִ� Ÿ�� �и�
			$(area).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			//�˾� ���� ù��°, ������ Ÿ�� ����
			$(area).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(area).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			
			$("body *").not(area).not(area + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
			//html ���� ���ؼ� aria-hidden ó�� ����
			var targetHtml = $(area);
			var endClass = targetHtml.parent().prop('tagName');
			
			for(var i = 0; i<20; i++){
				if(endClass != "BODY"){
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');

					targetHtml = targetHtml.parent();
					endClass = targetHtml.parent().prop('tagName');
					
					//console.log(endClass)
					
					targetHtml.removeAttr('data-hidden').removeAttr('aria-hidden');
				}
				else {
					break
				}
			}

			//�˾��� ��ư�� ������� �˾������� ù��° ��Ŀ���� ����
			if($(area).find("[data-pop-focus=first]").length == "0"){
				$(area).attr({"tabindex" : "0", "data-pop-focus":"first"});	
				$(area).focus();
			} else{
				$(area).find('[data-pop-focus=first]').focus();
			}
			
			//���ټ� : ù��°�ǿ��� shift + tab ��� ��������ư���� (�˾��� ��Ŀ�� ����)
			$(area).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(area).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			//���ټ� : �������ǿ��� tab ��� ù��° ��ư (�˾��� ��Ŀ�� ����)
			$(area).find("[data-pop-focus=last]").on("keydown", function(e){
				if(e.shiftKey == false && e.which == 9){
					$(area).find("[data-pop-focus=first]").focus();
					return false;
				}
			});
		},
		focusloopClose : function(){
			$("[data-retrunFocus=Y]").focus();
			$("[data-hidden=hidden]").removeAttr("data-hidden").removeAttr("aria-hidden");
			$("body *").removeAttr("data-retrunFocus");
		},
		//GNB Ű���� ���
		GNB : function() {
			var TargetState = "[style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";
			
			//GNB ON
			$("#header nav>ul>li>a").on('focusin', function(e){
				$(this).trigger('mouseover');
			});

			//GNB OFF
			$("header>nav #gnb>li").not(TargetState).last().on('focusout', function(e){
				if(!$(this).hasClass("child")){
					$(this).trigger('mouseleave');	
				}	
			});
			
			$("header>nav #gnb>li").not(TargetState).last().find(".menuM>li").not(TargetState).last().find(".menuS>li").not(TargetState).last().on('focusout', function(e){
				$(this).trigger('mouseleave');
			});
			
			$("header>nav #gnb>li").not(TargetState).last().find(".menuM>li").not(TargetState).last().on('focusout', function(e){
				if(!$(this).hasClass("child")){
					$(this).trigger('mouseleave');
				}
			});
			
			$("header>nav #gnb>li>a").on('keydown', function(e){				
				if (e.shiftKey == true && e.which == 9) {
					var TargetParentIndex = $(this).parent("li").index()-1;
					if(!$("header>nav #gnb>li").eq(TargetParentIndex).find("li").not(TargetState).last().hasClass("child")){
						setTimeout(function() {
							$("header>nav #gnb>li").eq(TargetParentIndex).find("li").not(TargetState).last().find("a").focus();
						}, 1); 
					} else{
						setTimeout(function() {
							$("header>nav #gnb>li").eq(TargetParentIndex).find("li").not(TargetState).last().find(".menuS li").not(TargetState).last().find("a").focus();
						}, 1);
					}
				}
			});
		},
		SNB : {
			init : function(){
				//snb ��Ŀ���̺�Ʈ
				$("#snb_nav .snb_area > button").on("keydown", function (e) {
					var focusIndex = $(this).index();
					console.log(focusIndex)
					if (e.shiftKey == true && e.which == 9) {
						ui.accessibility.SNB.SNBfocusout();
					}

					else if (e.shiftKey == false && e.which == 9) {
						if($("#snb").css("display") == "block"){
							//1����
							if(focusIndex == 1){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD1=true] > a").focus();
								},0);
							}
							//2����
							else if(focusIndex == 2){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD2=true] > a").focus();
								},0);
							}
							//3����
							else if(focusIndex == 3){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD3=true] > a").focus();
								},0);
							}
							//4����
							else if(focusIndex == 4){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD4=true] > a").focus();
								},0);
							}
						}
					}
				});
				//SNB ù��° / ������ ��Ŀ�� ���� �̺�Ʈ
				ui.accessibility.SNB.firstFocuseout();
				ui.accessibility.SNB.lastFocuseout();
			},
			//SNB ù��° ��Ŀ�� ����
			firstFocuseout : function(){
				//�� SNB�� CMS���� display none ó���Ұ�� �ش簴ü�� ������ ������ �� ù��° Ÿ�� ����
				//CMS ���� display:none << ���Ⱑ ������ ���� �����ؼ� 2�� Ÿ�� �߰�
				//1����
				$("#snb_nav #snb > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD1',"true");
				//2����
				$("#snb_nav #snb li.on .menuM > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD2',"true");
				//3����
				$("#snb_nav #snb li.on .menuM li.on .menuS > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD3',"true");
				//4����
				$("#snb_nav #snb li.on .menuM li.on .menuS li.on .menuSS > li").first("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbfirstTargetD4',"true");

				//1���� ù��°��Ŀ�� �̺�Ʈ
				$("li[data-SnbfirstTargetD1=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(1)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(1);
					}
				});

				//2���� ù��°��Ŀ�� �̺�Ʈ
				$("li[data-SnbfirstTargetD2=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(2)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(2);
					}
				});

				//3���� ù��°��Ŀ�� �̺�Ʈ
				$("li[data-SnbfirstTargetD3=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(3)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(3);
					}
				});

				//4���� ù��°��Ŀ�� �̺�Ʈ
				$("li[data-SnbfirstTargetD4=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(4)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(4);
					}
				});
			},
			//SNB ������ ��Ŀ�� ���� �� �̺�Ʈ ����
			lastFocuseout : function(){
				//�� SNB�� CMS���� display none ó���Ұ�� �ش簴ü�� ������ ������ �� ������ Ÿ�� ����
				//CMS ���� display:none << ���Ⱑ ������ ���� �����ؼ� 2�� Ÿ�� �߰�
				//1����
				$("#snb_nav #snb > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD1',"true");
				//2����
				$("#snb_nav #snb li.on .menuM > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD2',"true");
				//3����
				$("#snb_nav #snb li.on .menuM li.on .menuS > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD3',"true");
				//4����
				$("#snb_nav #snb li.on .menuM li.on .menuS li.on .menuSS > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD4',"true");

				//1���� ��������Ŀ�� �̺�Ʈ
				$("li[data-SnbLastTargetD1=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(2)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(1);
					}
				});

				//2���� ��������Ŀ�� �̺�Ʈ
				$("li[data-SnbLastTargetD2=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						if($("#snb_nav .snb_area > button:nth-of-type(3)").index() == "-1"){
							setTimeout(function () {
								$(".typeSub .pageUtil>.btn_print").focus();
							}, 0);
						} else{
							setTimeout(function () {
								$("#snb_nav .snb_area > button:nth-of-type(3)").focus();
							}, 0);
						}
						ui.accessibility.SNB.SNBfocusout(2);
					}
				});

				//3���� ��������Ŀ�� �̺�Ʈ
				$("li[data-SnbLastTargetD3=true] > a").on("keydown", function (e) {
					console.log(111);
					if (e.shiftKey == false && e.which == 9) {
						if($("#snb_nav .snb_area > button:nth-of-type(4)").index() == "-1"){
							setTimeout(function () {
								$(".typeSub .pageUtil>.btn_print").focus();
							}, 0);
						} else{
							setTimeout(function () {
								$("#snb_nav .snb_area > button:nth-of-type(4)").focus();
							}, 0);
						}
						ui.accessibility.SNB.SNBfocusout(3);
					}
				});

				//4���� ��������Ŀ�� �̺�Ʈ
				$("li[data-SnbLastTargetD4=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						setTimeout(function () {
							$(".typeSub .pageUtil>.btn_print").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(4);
					}
				});

			},
			SNBfocusout : function(index){
				// $("#snb_nav .snb_area>button").removeClass("active");
				// $("#snb").slideUp(50);
				// $("#dim").removeClass('on').css('top','');
				// $(".sVisual").css("z-index","");

				$("#snb_nav .snb_area>button").eq(index-1).trigger("click");
			}
		}
	},
	lockBody : {
		val : {
			mobileBodyLock : "N",						
			LockEl : 'html, body',						
			contWrap : '#header, #container, footer',	//������ ����
			LockScrollTop : "", 						//��ũ�� �� �õ��� ���� ��ũ�� ��
		},
		//��ױ�
		lock : function(){
			if(window.pageYOffset) {
				ui.lockBody.val.LockScrollTop = window.pageYOffset;
				$(ui.lockBody.val.contWrap).css({
					top: - (ui.lockBody.val.LockScrollTop)
				});
			}
			$(ui.lockBody.val.LockEl).css({
				height: "100%",
				overflow: "hidden"
			});

			ui.lockBody.val.mobileBodyLock = "Y";
		},
		//����
		unlock : function(){
			$(ui.lockBody.val.LockEl).css({
				height: "",
				overflow: ""
			});

			$(ui.lockBody.val.contWrap).css({
				top: ""
			});

			window.scrollTo(0, ui.lockBody.val.LockScrollTop);
			window.setTimeout(function () {
				ui.lockBody.val.LockScrollTop = null;
			}, 0);

			ui.lockBody.val.mobileBodyLock = "N";
		}
	}
}

