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
	},
	select : {
		init: function(){
			$('.custom select.selectBase').each(function (idx, selectObj){	
				// Create Pop Layer
				var customSelectBoxObj = $("#cutomSelectBoxTemplate").tmpl({});
				// $(customSelectBoxObj).find('.popTit').text($(selectObj).closest('div.formInput').find('.guide').text());
				var guideTxt =  $(selectObj).closest('div.formInput').siblings('.guide').clone();
				guideTxt.find('span').remove();
				$(customSelectBoxObj).find('.popTit').text(guideTxt.text()); 

				var selectTxt = '';
				$(selectObj).find('option').each(function(idx, optionObj) {
					if($(optionObj).is(':selected')){
						selectTxt = $(optionObj).text();
					}
					$(customSelectBoxObj).find('.optList').append('<button type="button" data-input="'+$(selectObj).attr('name')+'" data-val="'+$(optionObj).val()+'"><span>'+$(optionObj).text()+'</span></button>');
				});	
				
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
						var conts_Btmloc = $(window).scrollTop() + $(window).innerHeight();
						if(conts_Btmloc - 65 > $("#footer").offset().top){
							$('.stickyBtm_wrap').addClass('off')
						} else{
							$('.stickyBtm_wrap').removeClass('off')
						}

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
			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			}

			$(PopID).find(".popLayout").css("max-width", PopSize + "px");
			$(PopID).addClass('on');
			ui.lockBody.lock();

			ui.LayerPop.centerAlign(PopID);
			ui.LayerPop.MaxHeight(PopID);

			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			$(PopID).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			$(PopID).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(PopID).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			$(PopID).append("<div class='focuseouthidden' tabindex='0'></div>");

			if($(PopID).find("a, button, input, select").length == 1){
				$(PopID).find(".popLayout").attr({"tabindex" : "0", "data-pop-focus":"first"});	
			}

			$(PopID).find('[data-pop-focus=first]').focus();
			
			$("body *").not(PopID).not(PopID + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
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

			if(open_callbackfcn != undefined){
				eval(open_callbackfcn)(open_Pram);
			}

			$(document).on('click', PopID + ' .btn_popClose', function(e) {
				ui.LayerPop.Closed(PopID, closed_callbackfcn, closed_Pram);
			});
			

			$(PopID).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(PopID).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
			$(PopID).find("[data-pop-focus=last]").on("keydown", function(e){
				if(e.shiftKey == false && e.which == 9){
					$(PopID).find("[data-pop-focus=first]").focus();
					return false;
				}
			});

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
			


			if($(PopID).hasClass('bottomSheet')){

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
			$(PopID).removeClass('on');
			$(PopID).find(".focuseouthidden").remove();
			$("[data-retrunFocus=Y]").focus();
			ui.lockBody.unlock();

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

			if ( self !== top ) {
				$("[data-retrunFocus=Y]", parent.document).focus().removeAttr("data-retrunFocus");
				$($(PopID).attr("data-iframeid"), parent.document).removeClass("on").remove();
			}

			$("body *").removeAttr("data-retrunFocus");
			$("[data-hidden=hidden]").removeAttr("data-hidden").removeAttr("aria-hidden");

			$(".pop_wrap.addHtmlPop").remove();
			$(".pop_wrap .scroll-gradient").remove();
			
			if(closed_callbackfcn != undefined){
				eval(closed_callbackfcn)(closed_Pram);
			}
		},
		MaxHeight : function(PopID){
			var bottomHeight = $(PopID).find(".popBtnArea").innerHeight();
			if(bottomHeight == undefined){bottomHeight = 0}
		},
		centerAlign : function(PopID){
			setTimeout(function(){
				$(PopID).find(".popLayout").css({
					"opacity" : "1"
				});
			},100)
		
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
	contAutoHeight : function(target, point){
		var tabletPoint = "1024",
			mobilePoint = "768";

		if(point[0][1] != undefined){tabletPoint = point[0][1]}
		if(point[1][1] != undefined){mobilePoint = point[1][1]}


        $(window).bind('load resize', function () {
			//pc
            if(window.innerWidth >= tabletPoint){
                ui.contAutoSetion(target, point[0][0]);
            } 
			//�׺���
            else if(window.innerWidth >= mobilePoint){
                ui.contAutoSetion(target, point[1][0]);
            } 
			//�����
            else{
				if(point[2][0] == 1){
					//console.log("1��");
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
	accessibility : {
		focusloop : function(area){

			//console.log(event);
			if(event != undefined){
				$(event.currentTarget).attr("data-retrunFocus","Y");
			} else {
				$("#skip_menu a").eq(0).attr("data-retrunFocus","Y");
			}

			var TargetState = "[data-hidden=hidden], [style*='display:none'], [style*='display: none'], [style*='display :none'], [style*='display : none']";

			$(area).find("a, button, input, select").not(TargetState).each(function(e){
				if($(this).is(":visible") == false){
					$(this).attr("data-hidden","hidden");
				}
			});
			
			$(area).find("a, button, input, select").not(TargetState).first().attr("data-pop-focus","first");
			$(area).find("a, button, input, select").not(TargetState).last().attr("data-pop-focus","last");
			
			
			$("body *").not(area).not(area + " *").attr({
				"aria-hidden" : true,
				"data-hidden" : "hidden"
			});
			
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

			if($(area).find("[data-pop-focus=first]").length == "0"){
				$(area).attr({"tabindex" : "0", "data-pop-focus":"first"});	
				$(area).focus();
			} else{
				$(area).find('[data-pop-focus=first]').focus();
			}
			
			$(area).find("[data-pop-focus=first]").on("keydown", function(e){
				if(e.shiftKey == true && e.which == 9){
					$(area).find("[data-pop-focus=last]").focus();
					return false;
				}
			});
			
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
	},
	stepRows : function(target, item, point, pointItem){
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
		else{
			$(target).removeClass("rowItem3 rowItem2");
			ui.contAutoSetion(""+target+">ul .item", "1");
		}
	},
	lockBody : {
		val : {
			mobileBodyLock : "N",						
			LockEl : 'html, body',				
			contWrap : '#header, #container',
			LockScrollTop : "", 						
		},
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
}

