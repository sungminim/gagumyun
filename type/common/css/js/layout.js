$(document).ready(function() {
	ui.init();
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
			// 하단 고정 버튼
			$("body *").each(function (e) {
				if ($(this).hasClass("stickyBtm_wrap")) {
					$(this).find('.stickyCont').each(function(e){
						

						let btnH = $(this).innerHeight();
						$(this).parent('.stickyBtm_wrap').css('height', btnH)

						// Default
						var conts_Btmloc = $(window).scrollTop() + $(window).innerHeight();
						if(conts_Btmloc - 65 > $("#footer").offset().top){
							$('.stickyBtm_wrap').addClass('off')
						} else{
							$('.stickyBtm_wrap').removeClass('off')
						}

						// typeSearch

						var nextSibling = $(".stickyBtm_wrap").next(':visible');

						// 다음 형제 요소가 존재하는지 확인
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

							setTimeout(function() {
								if(conts_Btmloc - 65 > $("#footer").offset().top){
									$('.stickyBtm_wrap').addClass('off')
								} else{
									$('.stickyBtm_wrap').removeClass('off')
								}
							}, 100);

							if (stickyBtmWrap.length > 0) {
								if (stickyBtmWrap.hasClass('off')) {
								topBtn.removeClass('upBtn');
								} else {
								topBtn.addClass('upBtn');
								}
							}
						});

						// let btmOffset_top = $('.stickyCont').parent('.stickyBtm_wrap:visible').offset().top;
						// let btmOffset_h = $('.stickyCont').innerHeight();

						// if($(this).parents('article').find('.AccordionBase').length > 0){
						// 	$(".AccordionBtn").on("click", function(e){
						// 		$('.stickyBtm_wrap').removeClass('off');

						// 		setTimeout(function(){
						// 			btmOffset_top = $('.stickyBtm_wrap').offset().top;
						// 		},400)
						// 	});
						// }


						// $(window).scroll(function() {
						// 	let conts_loc = $(window).scrollTop();
							
						// 	if(conts_loc + $(window).innerHeight() - btmOffset_h - 75 > btmOffset_top ){
						// 		$('.stickyBtm_wrap').addClass('off')
						// 	} else{
						// 		$('.stickyBtm_wrap').removeClass('off')
						// 	}
						// });

						// let conts_loc = $(window).scrollTop();

						// if(conts_loc + $(window).innerHeight() - btmOffset_h - 75 > btmOffset_top ){
						// 	$('.stickyBtm_wrap').addClass('off')
						// } else{
						// 	$('.stickyBtm_wrap').removeClass('off')
						// }
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
						buttonLabel: "날짜 선택",
						selectedDateMessage: "선택한 날짜는",
						prevMonthLabel: "이전 달",
						nextMonthLabel: "다음 달",
						monthSelectLabel: "달",
						yearSelectLabel: "년",
						closeLabel: "창 닫기",
						keyboardInstruction: "화살표 키를 사용하여 날짜를 탐색 할 수 있습니다.",
						calendarHeading: "날짜 선택",
						dayNames: ["토", "일", "월", "화", "수", "목", "금"],
						monthNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
						monthNamesShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
						// yearSelectOptions: generateYearOptions(new Date("-30Y").getFullYear(), new Date("+30Y").getFullYear())
					};
					
					// document.addEventListener('duetOpen', function () {
					// 	var dim = document.createElement('div');
					// 	dim.classList.add('datepicker-layer');

					// 	document.body.appendChild(dim);
					// 	ui.lockBody.lock();
					// });

					// document.addEventListener('duetClose', function () {
					// 	$('.datepicker-layer').remove();
					// 	ui.lockBody.unlock();
					// });

					document.addEventListener('DOMContentLoaded', function() {
						const datePickers = document.querySelectorAll(".duet-date-picker");
					
						const commonMinDate = "1970-01-01";
						const commonMaxDate = "2033-01-01";
					
						for (const datePicker of datePickers) {
							datePicker.setAttribute("min", commonMinDate);
							datePicker.setAttribute("max", commonMaxDate);
						}
					});

					// function generateYearOptions(minYear, maxYear) {
					// 	const options = [];
					// 	for (let year = maxYear; year >= minYear; year--) {
					// 		options.push(year.toString());
					// 	}
					// 	return options;
					// }
				}
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
	},
	Accordion: {
		init: function () {
			$("body .AccordionBase li").each(function () {
				var accordionItem = $(this);
				var accordionBtn = accordionItem.find(".AccordionBtn");
				if (accordionItem.hasClass("on")) {
					accordionBtn.attr({ "aria-expanded": true, "title": "확장됨" });
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
				$(target).parents("li").find(".AccordionBtn").attr({ "aria-expanded": true, "title": "확장됨" });
	
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

			// 스낵바
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

			// 툴팁
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
			//닫기 실행시 포커스 리턴값 셋팅
			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			}

			//팝업실행
			$(PopID).find(".popLayout").css("max-width", PopSize + "px");
			$(PopID).addClass('on');
			ui.lockBody.lock();

			ui.LayerPop.centerAlign(PopID);

			// 팝업 두개 이상일때 설정
			// var onElements = $('.pop_wrap.bottomSheet.on');
			// if (onElements.length >= 2) {

			// 	onElements.not(':first').css('background-color', 'rgba(0,0,0,0)');
			// }

			//팝업 높이 최대값 설정
			ui.LayerPop.MaxHeight(PopID);

			//첫뻔재, 마지막 타겟 셋팅시 예외상태 추가
			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			//첫번째, 마지막 포커스 셋팅 전 css로 display:none 처리 되어있는 타겟 분리
			$(PopID).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			//팝업 내에 첫번째, 마지막 타겟 지정
			$(PopID).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(PopID).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			//팝업뒤 포커스 이동할 객제가 하나도 없을경우 브라우저 밖으로 포커스 이탈 방지를 위한 히든영역
			$(PopID).append("<div class='focuseouthidden' tabindex='0'></div>");

			//팝업내 버튼이 없을경우 팝업영역을 첫번째 포커스로 잡음
			if($(PopID).find("a, button, input, select").length == 1){
				$(PopID).find(".popLayout").attr({"tabindex" : "0", "data-pop-focus":"first"});	
			}

			$(PopID).find('[data-pop-focus=first]').focus();
			
			$("body *").not(PopID).not(PopID + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
			//html 깊이 구해서 aria-hidden 처리 삭제
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

			//오픈 콜백
			if(open_callbackfcn != undefined){
				eval(open_callbackfcn)(open_Pram);
			}

			//팝업 닫기
			// $(PopID).find('.btn_popClose').on("click",function(e){
			// 	ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			// });
			$(document).on('click', PopID + ' .btn_popClose', function(e) {
				ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			});
			

			//접근성 : 첫번째탭에서 shift + tab 경우 마지막버튼으로 (팝업내 포커스 루프)
			$(PopID).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(PopID).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			//접근성 : 마지막탭에서 tab 경우 첫번째 버튼 (팝업내 포커스 루프)
			$(PopID).find("[data-pop-focus=last]").on("keydown", function(e){
				if(e.shiftKey == false && e.which == 9){
					$(PopID).find("[data-pop-focus=first]").focus();
					return false;
				}
			});

			// BottomSheet 팝업 영역 제외한 영역 클릭 시 닫기
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
			


			// BottomSheet 스크롤 길 경우 스크롤 처리
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

			//아이프레임체크
			if ( self !== top ) {
				$("[data-retrunFocus=Y]", parent.document).focus().removeAttr("data-retrunFocus");
				$($(PopID).attr("data-iframeid"), parent.document).removeClass("on").remove();
			}

			$("body *").removeAttr("data-retrunFocus");
			$("[data-hidden=hidden]").removeAttr("data-hidden").removeAttr("aria-hidden");

			$(".pop_wrap.addHtmlPop").remove();
			$(".pop_wrap .scroll-gradient").remove();
			
			/* 닫기 콜백 */
			if(closed_callbackfcn != undefined){
				eval(closed_callbackfcn)(closed_Pram);
			}
		},
		MaxHeight : function(PopID){
			var bottomHeight = $(PopID).find(".popBtnArea").innerHeight();
			if(bottomHeight == undefined){bottomHeight = 0}
			//팝업 높이 최대값 설정
			// $(PopID).find(".popLayout").css({
			// 	"max-height": $(window).height() - bottomHeight
			// });
			//console.log(bottomHeight);
			//리사이즈 팝업 높이 최대값 설정
			// $(window).bind('resize load', function () {
			// 	$(PopID).find(".popLayout").css({
			// 		"max-height": $(window).height() - bottomHeight
			// 	});
			// });
		},
		centerAlign : function(PopID){
			//팝업 센터정렬(transform 정렬할경우 흐릿하게 나오는 케이스 발생)
			setTimeout(function(){
				$(PopID).find(".popLayout").css({
					"opacity" : "1"
				});
			},100)
		
			//리사이즈
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
			// PopHtml += '		<button type="button" class="btn_popClose"><span class="hidden">창닫기</span></button>';
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
			// 				$(this).find("a").attr({"aria-selected": true, "title":"선택됨"});
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
							"title": "선택됨"
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
			$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"선택됨"});

			//초기화활 탭 ID 추출
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
				$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"선택됨"});
			}
		},
		clickRadio :function(target){			
			if($(target).parents("li").hasClass("on")){
				$(target).parents("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
			} else{
				$(target).parents("ul").find("li").removeClass("on").find("a").attr("aria-selected", false).removeAttr("title");
				$(target).parents("li").addClass("on").find("a").attr({"aria-selected": true, "title":"선택됨"});
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
	contAutoHeight : function(target, point){
		//테블릿, 모바일 분기점 디폴트
		var tabletPoint = "1024",
			mobilePoint = "768";

		if(point[0][1] != undefined){tabletPoint = point[0][1]}
		if(point[1][1] != undefined){mobilePoint = point[1][1]}

		// console.log(tabletPoint);
		// console.log(mobilePoint);

        $(window).bind('load resize', function () {
			//pc
            if(window.innerWidth >= tabletPoint){
                ui.contAutoSetion(target, point[0][0]);
            } 
			//테블릿
            else if(window.innerWidth >= mobilePoint){
                ui.contAutoSetion(target, point[1][0]);
            } 
			//모바일
            else{
				if(point[2][0] == 1){
					//console.log("1개");
					$(target).removeAttr("style");
				}
				else{
					ui.contAutoSetion(target, point[2][0]);
				}
            }
        });
	},
	contAutoSetion : function(target, length){
		$(target).removeAttr("style");
        var listLine = $(target).length;
        var arry = [];
        for (i = 0; i < listLine; i++) {
            var p_list = $(target).eq(i).innerHeight();
            arry.push(p_list);
        }
        for (i = 0; i < listLine; i++) {
            if (i < length * 1) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(0, length)));
            }
            else if (i < length * 2) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length, length * 2)));
            }
            else if (i < length * 3) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 2, length * 3)));
            }
            else if (i < length * 4) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 3, length * 4)));
            }
            else if (i < length * 5) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 4, length * 5)));
            }
            else if (i < length * 6) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 5, length * 6)));
            }
            else if (i < length * 7) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 6, length * 7)));
            }
            else if (i < length * 8) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 7, length * 8)));
            }
            else if (i < length * 9) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 8, length * 9)));
            }
            else if (i < length * 10) {
                $(target).eq(i).css("height", Math.max.apply(null, arry.slice(length * 9, length * 10)));
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
	//접근성 개별 코드
	accessibility : {
		//레이어 영역내 포커스 루프 이벤트
		focusloop : function(area){

			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			} else {
				$("#skip_menu a").eq(0).attr("data-retrunFocus","Y");
			}

			//첫뻔재, 마지막 타겟 셋팅시 예외상태 추가
			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			//첫번째, 마지막 포커스 셋팅 전 css로 display:none 처리 되어있는 타겟 분리
			$(area).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			//팝업 내에 첫번째, 마지막 타겟 지정
			$(area).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(area).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			
			$("body *").not(area).not(area + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
			//html 깊이 구해서 aria-hidden 처리 삭제
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

			//팝업내 버튼이 없을경우 팝업영역을 첫번째 포커스로 잡음
			if($(area).find("[data-pop-focus=first]").length == "0"){
				$(area).attr({"tabindex" : "0", "data-pop-focus":"first"});	
				$(area).focus();
			} else{
				$(area).find('[data-pop-focus=first]').focus();
			}
			
			//접근성 : 첫번째탭에서 shift + tab 경우 마지막버튼으로 (팝업내 포커스 루프)
			$(area).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(area).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			//접근성 : 마지막탭에서 tab 경우 첫번째 버튼 (팝업내 포커스 루프)
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
		//GNB 키보드 운용
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
				//snb 포커스이벤트
				$("#snb_nav .snb_area > button").on("keydown", function (e) {
					var focusIndex = $(this).index();
					console.log(focusIndex)
					if (e.shiftKey == true && e.which == 9) {
						ui.accessibility.SNB.SNBfocusout();
					}

					else if (e.shiftKey == false && e.which == 9) {
						if($("#snb").css("display") == "block"){
							//1뎁스
							if(focusIndex == 1){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD1=true] > a").focus();
								},0);
							}
							//2뎁스
							else if(focusIndex == 2){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD2=true] > a").focus();
								},0);
							}
							//3뎁스
							else if(focusIndex == 3){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD3=true] > a").focus();
								},0);
							}
							//4뎁스
							else if(focusIndex == 4){
								setTimeout(function(){
									$("li[data-SnbfirstTargetD4=true] > a").focus();
								},0);
							}
						}
					}
				});
				//SNB 첫번째 / 마지막 포커스 제어 이벤트
				ui.accessibility.SNB.firstFocuseout();
				ui.accessibility.SNB.lastFocuseout();
			},
			//SNB 첫번째 포커스 제어
			firstFocuseout : function(){
				//각 SNB중 CMS에서 display none 처리할경우 해당객체를 제외한 나머지 중 첫번째 타겟 셋팅
				//CMS 에서 display:none << 띄어쓰기가 브라우져 별로 상이해서 2개 타입 추가
				//1뎁스
				$("#snb_nav #snb > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD1',"true");
				//2뎁스
				$("#snb_nav #snb li.on .menuM > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD2',"true");
				//3뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS > li").not("[style*='display:none']").not("[style*='display: none']").first().attr('data-SnbfirstTargetD3',"true");
				//4뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS li.on .menuSS > li").first("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbfirstTargetD4',"true");

				//1뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD1=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(1)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(1);
					}
				});

				//2뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD2=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(2)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(2);
					}
				});

				//3뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD3=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(3)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(3);
					}
				});

				//4뎁스 첫번째포커스 이벤트
				$("li[data-SnbfirstTargetD4=true] > a").on("keydown", function (e) {
					if (e.shiftKey == true && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(4)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(4);
					}
				});
			},
			//SNB 마지막 포커스 셋팅 후 이벤트 제어
			lastFocuseout : function(){
				//각 SNB중 CMS에서 display none 처리할경우 해당객체를 제외한 나머지 중 마지막 타겟 셋팅
				//CMS 에서 display:none << 띄어쓰기가 브라우져 별로 상이해서 2개 타입 추가
				//1뎁스
				$("#snb_nav #snb > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD1',"true");
				//2뎁스
				$("#snb_nav #snb li.on .menuM > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD2',"true");
				//3뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD3',"true");
				//4뎁스
				$("#snb_nav #snb li.on .menuM li.on .menuS li.on .menuSS > li").not("[style*='display:none']").not("[style*='display: none']").last().attr('data-SnbLastTargetD4',"true");

				//1뎁스 마지막포커스 이벤트
				$("li[data-SnbLastTargetD1=true] > a").on("keydown", function (e) {
					if (e.shiftKey == false && e.which == 9) {
						setTimeout(function () {
							$("#snb_nav .snb_area > button:nth-of-type(2)").focus();
						}, 0);
						ui.accessibility.SNB.SNBfocusout(1);
					}
				});

				//2뎁스 마지막포커스 이벤트
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

				//3뎁스 마지막포커스 이벤트
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

				//4뎁스 마지막포커스 이벤트
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
	touchDim : function(){
		//가로 스크롤바 체크
		// $.fn.hasHorizontalScrollBar = function() {
		// 	return this.get(0) ? Math.ceil(this.get(0).scrollWidth) > Math.ceil(this.innerWidth()) : false;
		// }

		//테이블 가로 스크롤 발생시 터치 보조 딤 생성
		// $(".contTable").each(function(index){
		// 	if($(this).hasHorizontalScrollBar() == true){
		// 		var touchHtml = '<div class="tableTouchArea"><button type="button" class="tableScrollTouch"><span class="hidden">터치하면 테이블 스크롤 할 수 있습니다.</span></button></div>';
		// 		if($(this).find(".tableTouchArea").length != "1"){
		// 			$(this).append(touchHtml);
		// 			$(".contTable .tableTouchArea, .contTable .tableScrollTouch").on("click", function(e){
		// 				$(this).parents(".contTable").find(".tableTouchArea").hide();
		// 			});
		// 		}
		// 	} else{
		// 		$(this).find(".tableTouchArea").remove();
		// 	}
		// });

		//테이블 가로 스크롤 발생시 터치 보조 딤 생성
		// $(".limitX").each(function(index){
		// 	if($(this).hasHorizontalScrollBar() == true){
		// 		var touchHtml = '<div class="tableTouchArea"><button type="button" class="tableScrollTouch"><span class="hidden">터치하면 스크롤 할 수 있습니다.</span></button></div>';
		// 		if($(this).find(".tableTouchArea").length != "1"){
		// 			$(this).append(touchHtml);
		// 			$(".limitX .tableTouchArea, .limitX .tableScrollTouch").on("click", function(e){
		// 				$(this).parents(".limitX").find(".tableTouchArea").hide();
		// 			});
		// 		}
		// 	} else{
		// 		$(this).find(".tableTouchArea").remove();
		// 	}
		// });

		// $(".contTable, .limitX").on("scroll", function(e){
		// 	$(this).find(".tableTouchArea").hide();
		// });
	
	},
	stepRows : function(target, item, point, pointItem){
		//지정포인트
		if(window.innerWidth >= point){
			$(target).removeClass("rowItem3 rowItem2");
			ui.contAutoSetion(""+target+">ul .item", item);
			//console.log(1);
		} 
		
		else if(window.innerWidth >= 768){
			if(pointItem == 3){
				$(target).addClass("rowItem3");
				ui.contAutoSetion(""+target+">ul .item", "3");
			}
			if(pointItem == 2){
				$(target).addClass("rowItem2");
				ui.contAutoSetion(""+target+">ul .item", "2");
			}
		} 
		//모바일
		else{
			$(target).removeClass("rowItem3 rowItem2");
			ui.contAutoSetion(""+target+">ul .item", "1");
			//console.log(3);
		}
	},
	//모바일 본문 스크롤 방지
	lockBody : {
		val : {
			mobileBodyLock : "N",						//모바일 body 스크롤 락 여부
			LockEl : 'html, body',						//scroll 타겟
			contWrap : '#header, #container, footer',	//컨텐츠 영역
			LockScrollTop : "", 						//스크롤 락 시도시 현재 스크롤 값
		},
		//잠그기
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
		//해지
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
	},
	//SNB PC 뎁스별 최대 넓이값 구하기
	snbDept : {
		init  : function(breakPoint){

			onePoint = "";
			if(window.innerWidth <= breakPoint){
				onePoint = "PC";
			} else{
				onePoint = "MOBIE";
			}

			ui.snbDept.set(breakPoint);
			$(window).bind('resize', function(){
				ui.snbDept.set(breakPoint);
			});
		},
		set : function(breakPoint){
			//SNB 각 뎁스별 최대 넓이 갑 구하기
			//+58은 ul의 padding 값 + 보더 양끝 2 더한 값 / 30은 앞에 58값과 버튼 좌 우 패딩 값을 - 한 나머지 값을 + 해줘야 가장 넓은 뎁스가 활성화 되었을때 텍스트가 잘리지 않음
			var margin = 58 + 30;
			if(window.innerWidth <= breakPoint){
				if(onePoint == "PC"){	
					onePoint = "MOBIE";
					$("#snb_nav .snb_area>button").removeAttr("style");
					//console.log("모바일");
				}
			}else{
				if(onePoint == "MOBIE"){
					//1뎁스 			
					$("#snb_nav").removeAttr("class").addClass("active1");
					$("#snb").show().css({"width":"auto","visibility":"hidden"});
					$("#snb_nav .snb_area>button.dep1").css("width", $("#snb>li.on").outerWidth() + margin+"px");

					//2뎁스
					$("#snb_nav").removeAttr("class").addClass("active2");
					$("#snb").show().css("width","auto");
				
					$("#snb_nav .snb_area>button.dep2").css("width", $("#snb>li.on>.menuM").outerWidth() + margin + "px");

					//3뎁스
					$("#snb_nav").removeAttr("class").addClass("active3");
					$("#snb").show().css("width","auto");
					$("#snb_nav .snb_area>button.dep3").css("width", $("#snb>li.on>.menuM>li.on>.menuS").outerWidth() + margin + "px");

					$("#snb_nav").removeAttr("class");
					$("#snb").hide().removeAttr("style");
					//console.log("PC");

					onePoint = "PC";
				}
				
			}
		}
	}
}

