<%@ page contentType="text/html;charset=euc-kr" pageEncoding="EUC-KR"%>

<!-- board -->
<div class="board_area">

	<ul class="stepArea">
		<li class="on">
			<i class="num">1</i>
			<span class="stepTit">자격증선택</span>
		</li>
		<li class="line"></li>
		<li>
			<i class="num">2</i>
			<span class="stepTit">선택확인</span>
		</li>
		<li class="line"></li>
		<li>
			<i class="num">3</i>
			<span class="stepTit">신청서작성 </span>
		</li>
		<li class="line"></li>
		<li>
			<i class="num">4</i>
			<span class="stepTit">수수료결제</span>
		</li>
	</ul>
	
	<!-- 쓰기 -->
	<div class="writeList_v">
		<b class="headLine2">소제목 영역(<span class="c_Blue">포인트</span>)</b>
		<ul class="listWrap">
			<li>
				<div class="formInput">
					<em class="guide">이름<i class="need"><span class="txtHidden">필수</span></i></em>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="입력해주세요." title="이름을 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">생년월일</em>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="입력해주세요."  title="생년월일을 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput devided">
					<em class="guide">주소</em>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="입력해주세요."  title="주소를 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="입력해주세요."  title="주소를 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput devided2">
					<em class="guide">주소</em>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="입력해주세요."  title="주소를 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="입력해주세요."  title="주소를 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">주민번호</em>
					<div class="w_dev">
						<div class="inputWrap">
							<input type="text" class="inputBase"  title="주민번호를 입력하세요">
							<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
						</div>
						-
						<div class="inputWrap">
							<input type="text" class="inputBase"  title="주민번호를 입력하세요">
							<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
						</div>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput custom">
					<em class="guide">연락처</em>
					<div class="w_tel">
						<button type="button" class="selectBase" value="" title="전화번호 첫째 자리 선택 레이어 열기"></button>
						<select name="" id="" class="selectBase">
							<option value="">선택하세요</option>
							<option value="">010</option>
							<option value="">011</option>
							<option value="">018</option>
							<option value="">017</option>
						</select>
						-
						<div class="inputWrap">
							<input type="text" class="inputBase"  title="전화번호 두번째 자리를 입력하세요">
							<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
						</div>
						-
						<div class="inputWrap">
							<input type="text" class="inputBase"  title="전화번호 세번째 자리를 입력하세요">
							<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
						</div>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">라디오/체크박스</em>
					<div class="optionGrp">
						<label class="inputBox">
							<input type="radio" name="type1">
							<span class="data">옵션 1</span>
						</label>
						<label class="inputBox">
							<input type="radio" name="type1">
							<span class="data">옵션 1</span>
						</label>
						<label class="inputBox">
							<input type="radio" name="type1">
							<span class="data">옵션 1</span>
						</label>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">라디오/체크박스 (2개)</em>
					<div class="optionGrp type2">
						<label class="inputBox">
							<input type="radio" name="type1">
							<span class="data">옵션 1</span>
						</label>
						<label class="inputBox">
							<input type="radio" name="type1">
							<span class="data">옵션 1</span>
						</label>
					</div>
				</div>
			</li>
		</ul>

		<b class="headLine2">소제목 영역</b>
		<ul class="listWrap">
			<li>
				<div class="formInput custom">
					<em class="guide">항목</em>
					<button type="button" class="selectBase" value="" title="항목 선택 레이어 열기"></button>
					<select name="" id="" class="selectBase">
						<option value="">선택하세요</option>
						<option value="">010</option>
						<option value="">011</option>
						<option value="">018</option>
						<option value="">017</option>
					</select>
				</div>
				<div class="infoTxt">
					<a href="#none" class="grayArrTxt"><span>회원정보수정</span></a>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">응시종목명</em>
					<div class="w_search">
						<div class="inputWrap">
							<input type="text" class="inputBase" title="종목을 입력하세요" disabled>
							<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
	
							<button type="button" class="btnSch black">검색</button>
						</div>
						<div class="inputWrap custom">
							<button type="button" class="selectBase" value="" title="항목 선택 레이어 열기"></button>
							<select name="" id="" class="selectBase">
								<option value="">선택하세요</option>
								<option value="">010</option>
								<option value="">011</option>
								<option value="">018</option>
								<option value="">017</option>
							</select>
						</div>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">우편번호</em>
					<div class="w_address">
						<div class="inputWrap">
							<input type="text" class="inputBase" title="우편번호를 입력하세요" disabled>
							<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
	
							<button type="button" class="btnSch">검색</button>
						</div>
					</div>
					<div class="infoTxt">
						<ul class="txtList_s dot">
							<li>면제과목:재료역학, 기계유체역학, 기계열역학</li>
							<li>응시과목:유체기계 및 유압기기, 건설기계일반 및 플랜트배관</li>
						</ul>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">주소지(직접입력불가)</em>
					<div class="inputWrap">
						<input type="text" class="inputBase" title="주소지를 입력하세요" disabled>
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">상세주소</em>
					<div class="inputWrap">
						<input type="text" class="inputBase" placeholder="내용을 입력해주세요."  title="상세주소를 입력하세요">
						<button type="button" class="keyRemove"><span class="txtHidden">입력값 삭제</span></button>
					</div>
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">날짜 선택</em>
					<div class="inputWrap">
						<div class="areahi">
							<a href="#none" class="hi" style="background-color: red;font-size: 15px;">선택하쇼</a>
						</div>
						<script>
							// hi 클래스를 가진 버튼을 클릭했을 때 이벤트 핸들러 등록
							$('.hi').on('click', function() {
								// duet-date-picker 요소 생성
								var datePicker = `<duet-date-picker name="sdfsdf" identifier="date" class="duet-date-picker" min="1970-01-03" max="2033-01-01" value="" aria-placeholder="none"></duet-date-picker>`
							
								// 생성한 요소를 #datePickerContainer 아래에 추가
								$('.areahi').append(datePicker);
							});
							</script>

						<duet-date-picker name="date" identifier="date" class="duet-date-picker" min="1970-01-01" max="2033-01-01" value="" aria-placeholder="none"></duet-date-picker> 

						<!-- <input type="text" class="inputBase typeDate" title="날짜를 선택하세요 (yyyy.mm.dd)" id="datepicker" inputmode="none">
						<script>
							var setYear = '';
							var setMonth = '';
							$(function() {
								//input을 datepicker로 선언
								$("#datepicker").datepicker({
									dateFormat: 'yy.mm.dd' //달력 날짜 형태
									,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
									,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
									,changeYear: true //option값 년 선택 가능
									,showButtonPanel: true
									,closeText: '닫기'
									,changeMonth: true //option값  월 선택 가능                
									,buttonText: "선택" //버튼 호버 텍스트              
									,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
									,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
									,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
									,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
									,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
									,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후),
									,beforeShow: function (input, obj) { 
										setYear = obj.selectedYear;
										setMonth = obj.selectedMonth + 1;
									
										ui.lockBody.lock();
										const dim = $('<div class="datepicker-layer"></div>');
										$("body").append(dim);
										
									}
									,onSelect: function () {
										ui.lockBody.unlock();
										$('.datepicker-layer').remove()
									}
									,onChangeMonthYear: function(year, month, obj){
										console.log('222222222');
										if(setYear != year){
											setYear = year;
											console.log($(obj.dpDiv).eq(0).find('.ui-datepicker-year').eq(0).val());
											$(obj.dpDiv).eq(0).find('.ui-datepicker-year').eq(0).focus();
										}else if(setMonth != month){
											setMonth = month;	
											$(obj.dpDiv).eq(0).find('.ui-datepicker-month').focus();
										}
									}
								});                    
								
								//초기값을 오늘 날짜로 설정해주기
								// $('#datepicker').datepicker('setDate', 'today');
								 //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
								 $("select").on('vmousedown', function(e) { $(this).focus().click(); })
							});
						</script> -->
					</div>

					<!-- <select name="" id="">
						<option value="1">1</option>
						<option value="1">2</option>
						<option value="1">3</option>
						<option value="1">4</option>
					</select>
					<select name="" id="">
						<option value="1">1</option>
						<option value="1">2</option>
						<option value="1">3</option>
						<option value="1">4</option>
					</select> -->
				</div>
			</li>
			<li>
				<div class="formInput">
					<em class="guide">날짜 선택 (멀티)</em>
					<div class="inputWrap">
						<div class="multiPicker">
							<duet-date-picker name="startDate" identifier="date" class="duet-date-picker" min="1970-01-01" max="2033-01-01" value="" aria-placeholder="none"></duet-date-picker> 
							<!-- <input type="text" class="inputBase typeDate" title="시작 날짜를 선택하세요 (yyyy.mm.dd)" id="datepicker2" inputmode="none"> -->
							<span>~</span>
							<duet-date-picker name="endDate" identifier="date" class="duet-date-picker" min="1970-01-01" max="2033-01-01" value="" aria-placeholder="none"></duet-date-picker> 
							<!-- <input type="text" class="inputBase typeDate" title="종료 날짜를 선택하세요 (yyyy.mm.dd)" id="datepicker3" inputmode="none"> -->
						</div>
						
						<!-- <script>
							$(function() {
								//input을 datepicker로 선언
								$("#datepicker2, #datepicker3").datepicker({
									dateFormat: 'yy.mm.dd' //달력 날짜 형태
									,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
									,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
									,changeYear: true //option값 년 선택 가능
									,showButtonPanel: true
									,closeText: '닫기'
									,changeMonth: true //option값  월 선택 가능                
									,buttonText: "선택" //버튼 호버 텍스트              
									,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
									,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
									,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
									,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
									,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
									,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후),
									,beforeShow: function () { 
										ui.lockBody.lock();
										const dim = $('<div class="datepicker-layer"></div>');
										$("body").append(dim);
										
									}
									,onSelect: function () {
										ui.lockBody.unlock();
										$('.datepicker-layer').remove()
									}
								});                    
								
								//초기값을 오늘 날짜로 설정해주기
								// $('#datepicker').datepicker('setDate', 'today');
								 //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
							});
						</script> -->
					</div>
				</div>
			</li>
		</ul>

		<b class="headLine2">50% 항목</b>
		<ul class="listWrap typeHalf">
			<li>
				<div class="formInput custom">
					<em class="guide">지역</em>
					<button type="button" class="selectBase" value="" title="항목 선택 레이어 열기"></button>
					<select name="" id="" class="selectBase">
						<option value="">선택하세요</option>
						<option value="">010</option>
						<option value="">011</option>
						<option value="">018</option>
						<option value="">017</option>
					</select>
				</div>
			</li>
			<li>
				<div class="formInput custom">
					<em class="guide">시/군/구</em>
					<button type="button" class="selectBase" value="" title="항목 선택 레이어 열기"></button>
					<select name="" id="" class="selectBase">
						<option value="">전체</option>
					</select>
				</div>
			</li>
			<li>
				<div class="formInput custom">
					<em class="guide">일자</em>
					<button type="button" class="selectBase" value="" title="항목 선택 레이어 열기"></button>
					<select name="" id="" class="selectBase">
						<option value="">전체</option>
					</select>
				</div>
			</li>
			<li>
				<div class="formInput custom">
					<em class="guide">마감시험장보기</em>
					<button type="button" class="selectBase" value="" title="항목 선택 레이어 열기"></button>
					<select name="" id="" class="selectBase">
						<option value="">전체</option>
					</select>
				</div>
			</li>
		</ul>
		
	</div>
	<!-- 쓰기 -->

	<!-- 버튼영역 -->
	<div class="btnArea">
		<button type="button" class="baseBtn typeFull"><span class="base">확인</span></button>
	</div>
	<!-- //버튼영역 -->

	<!-- 버튼영역 -->
	<div class="btnArea double">
		<button type="button" class="baseBtn"><span class="base">확인</span></button>
		<button type="button" class="baseBtn black"><span class="base">수정</span></button>
		<button type="button" class="baseBtn gray"><span class="base">취소</span></button>
	</div>
	<!-- //버튼영역 -->

	<!-- 버튼영역 -->
	<div class="btnArea double">
		<button type="button" class="baseBtn"><span class="base">확인</span></button>
		<button type="button" class="baseBtn gray"><span class="base">취소</span></button>
	</div>
	<!-- //버튼영역 -->

	<!-- 레이어 팝업 : 캘린더 -->
	<div class="pop_wrap bottomSheet" id="pop_calender">
		<section class="popLayout popLayer">
			<div class="popConts">
				<div class="popInner limit">
					<!-- 팝업 내용 입력-->
					<div class="txtG">
						<div class="popInnerCont groupCont">
							<div class="calenderWrap">
								<div class="titleArea">
									<button type="button" class="btn_prev"><span class="txtHidden">이전월</span></button>

									<div class="dateArea">
										<select name="" id="" class="inp_selDate">
											<option value="">2023</option>
											<option value="">2022</option>
											<option value="">2021</option>
										</select>
										<select name="" id="" class="inp_selDate">
											<option value="">1</option>
											<option value="">2</option>
											<option value="">3</option>
											<option value="">4</option>
											<option value="">5</option>
											<option value="">6</option>
											<option value="">7</option>
											<option value="">8</option>
										</select>
									</div>

									<button type="button" class="btn_next"><span class="txtHidden">다음월</span></button>
								</div>

								<div class="calenderTbArea">
									<div class="calenderTb">
										<table>
											<caption class="txtHidden">달력을 선택할 수 있는 테이블</caption>
											<thead>
												<tr>
													<th class="txt_red">일</th>
													<th>월</th>
													<th>화</th>
													<th>수</th>
													<th>목</th>
													<th>금</th>
													<th>토</th>
												</tr>
											</thead>
											<tbody>
											   <tr>
													<td>
														<button type="button">30</button>
													</td>
													<td>
														<button type="button">31</button>
													</td>
													<td>
														<button type="button">1</button>
													</td>
													<td>
														<button type="button">2</button>
													</td>
													<td>
														<button type="button">3</button>
													</td>
													<td>
														<button type="button">4</button>
													</td>
													<td>
														<button type="button">5</button>
													</td>
											   </tr>
											   <tr>
													<td>
														<button type="button">6</button>
													</td>
													<td>
														<button type="button">7</button>
													</td>
													<td>
														<button type="button">8</button>
													</td>
													<td>
														<button type="button">9</button>
													</td>
													<td>
														<button type="button">10</button>
													</td>
													<td>
														<button type="button">11</button>
													</td>
													<td>
														<button type="button">12</button>
													</td>
											   </tr>
											   <tr>
													<td>
														<button type="button">13</button>
													</td>
													<td>
														<button type="button">14</button>
													</td>
													<td>
														<button type="button">15</button>
													</td>
													<!-- 선택된 영역 class="on" -->
													<td class="on">
														<button type="button">16</button>
													</td>
													<td>
														<button type="button">17</button>
													</td>
													<td>
														<button type="button">18</button>
													</td>
													<td>
														<button type="button">19</button>
													</td>
											   </tr>
											   <tr>
													<td>
														<button type="button">20</button>
													</td>
													<td>
														<button type="button">21</button>
													</td>
													<td>
														<button type="button">22</button>
													</td>
													<td>
														<button type="button">23</button>
													</td>
													<td>
														<button type="button">24</button>
													</td>
													<td>
														<button type="button">25</button>
													</td>
													<td>
														<button type="button">26</button>
													</td>
											   </tr>
											   <tr>
													<td>
														<button type="button">27</button>
													</td>
													<td>
														<button type="button">28</button>
													</td>
													<td>
														<button type="button">29</button>
													</td>
													<td>
														<button type="button">30</button>
													</td>
													<td>
														<button type="button">31</button>
													</td>
													<td>
														<button type="button"></button>
													</td>
													<td>
														<button type="button"></button>
													</td>
											   </tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- //팝업 내용 입력 -->
				</div>
				<div class="btnArea">
					<button type="button" class="baseBtn typeFull  btn_popClose"><span class="base">닫기</span></button>
				</div>
			</div>
		</section>
	</div>

</div>
<!-- //board -->
