// 组件名称
var com_name = '计算器组件';
// 限制长度
var limit_long = 5;


$(function() {
/**
 * 计算事件
 *
 * @event .num-input, .select
 */
$('.num-input, .select').on('input propertychange', function() {
	
	var input_1 = $('#input_1').val();
	// 检测输入是否完整
	if (input_1 === '') return;

	var input_2 = $('#input_2').val();
	// 检测输入是否完整
	if (input_2 === '') return;

	input_1 = Number(input_1);
	// 检测是否符合规定长度
	checkVal(input_1, function(data) {
		if (!data) return;
	});

	input_2 = Number(input_2);
	// 检测是否符合规定长度
	checkVal(input_2, function(data) {
		if (!data) return;
	});	
	
	var sym = $('#select').val();
	
	var result = 0;
	switch(sym) {
		case '+':
			result = input_1 + input_2;
			break;
		case '-':
			result = input_1 - input_2;
			break;
		case '*':
			result = input_1 * input_2;
			break;
		case '/':
			result = input_1 / input_2;
			break;
		default:
			alertMsg({
				content: com_name + '：符号错误',
				type: 'error'
			});
			return;
	} 

	$('#result').text(result);

});



/**
 * 重置
 *
 * @event #reset
 */
$('#reset').on('click', function() {
	$('#input_1').val('');
	$('#input_2').val('');
	$('#result').text('');
	$('#select').val('+');

	alertMsg({
		content: '重置成功',
		type: 'info'
	});
});


});


/**
 * 处理输入值
 * 
 * @param {string} val 输入值
 * @param {function} callback 回调函数
 */
function checkVal(val, callback) {
	var check = checkNum(val);
	if (!check) {
		alertMsg({
			content: com_name + '：输入超出范围',
			type: 'error'
		});
		$('#input_1').val(subNumber(limit_long, val));
	}
	callback(check);
}


/**
 * 数字删减
 * 
 * @param {number} long 保留长度
 * @param {number} num 待处理的数字
 * @return {number} 处理完成的数字
 */
function subNumber(long, num) {
	var num_long = num.toString().length;
	if (num_long <= long) {
		return num;
	}
	return Math.floor(num / Math.pow(10, (num_long - long)));
}


/**
 * 检测数值有效性
 * 
 * @param {number} num 数值
 * @return {boolean} 检测是否通过
 */
function checkNum(num) {
	return num / 100000 < 1;
}


/**
 * 弹窗提示组件
 * 
 * @param {object} params 
 * @param {string} params.content 提示语
 * @param {string=} params.type 类型(info 普通[默认], success 成功, error 错误)
 * @param {string=} params.bg_color 背景颜色 	
 */
function alertMsg(params) {
	var content = params.content,
		type = params.type || 'info',
		bg_color = params.bg_color || '',
		time = params.time || 1500;

	if (bg_color === '') {
		switch(type) {
			case 'info':
				bg_color = '#0963D8';
				break;
			case 'success':
				bg_color = '#00CD00';
				break;
			case 'error':
				bg_color = '#EE6363';
				break;
			default: 
				bg_color = '#0963D8';
		}
	}

	var alert_msg = $('#alert_msg');
	// 节点存在
	if(!!alert_msg[0]) {
		alert_msg.text(content).css('background-color', bg_color);
		alert_msg.fadeIn(300);
	} else {
		// 生成节点
		$('body').prepend(
				'<div id="alert_msg" class="alert-msg" style="background-color: ' 
				+ bg_color +'">'
				+ content
				+ '</div>'
			);
		alert_msg = $('#alert_msg');
		alert_msg.fadeIn(300);
	}

	// 隐藏提示
	setTimeout(function() {
		alert_msg.fadeOut(300);
	}, time);
}
