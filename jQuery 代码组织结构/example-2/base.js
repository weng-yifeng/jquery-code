/**
 * @file 公共方法，公共组件，全局变量
 */


/**
 * 公共方法
 * 
 * @class
 */
function Common() {
}

Common.prototype = {
	constructor: Common,

	/**
	 * 弹窗提示组件
	 * 
	 * @param {object} params 
	 * @param {string} params.content 提示语
	 * @param {string=} params.type 类型(info 普通[默认], success 成功, error 错误)
	 * @param {string=} params.bg_color 背景颜色 	
	 */
	alertMsg: function(params) {
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
}