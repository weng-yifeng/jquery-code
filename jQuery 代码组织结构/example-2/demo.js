$(function() {
	// 计算器组件
	new ComputeComponent('计算器组件', 5).init();
	
});

// 引入公共组件
var common = new Common();

// 全局组件声明
// 弹窗提示组件
var alertMsg = common.alertMsg;

/**
 * 计算组件
 * 
 * @class
 * @param {string} com_name 组件名称
 * @param {number} limit_long 限制的长度
 */
function ComputeComponent(com_name, limit_long) {
	this.com_name = com_name;
	this.limit_long = limit_long;
}

ComputeComponent.prototype = {
	constructor: ComputeComponent,

	/**
	 * 初始化
	 */
	init: function() {

		var that = this;

		/**
		 * 计算事件
		 *
		 * @event .num-input, .select
		 */
		$('.num-input, .select').on('input propertychange', function() {
			
			var el_result = $('#result');

			var el_input_1  = $('#input_1');
			var input_1 = el_input_1.val();
			// 检测输入是否完整
			if (input_1 === '') {
				el_result.text('');
				return;
			}

			var el_input_2 = $('#input_2');
			var input_2 = el_input_2.val();
			// 检测输入是否完整
			if (input_2 === '') {
				el_result.text('');
				return;
			}

			input_1 = Number(input_1);
			// 检测是否符合规定长度
			var check = that.checkVal(input_1, el_input_1);
			if (!check) return;

			input_2 = Number(input_2);
			// 检测是否符合规定长度
			check = that.checkVal(input_2, el_input_2);
			if (!check) return;	
			
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
						content: that.com_name + '：符号错误',
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
	},

	/**
	 * 处理输入值
	 * 
	 * @param {string} val 输入值
	 * @param {object} el DOM 节点，数值输入框
	 * @return {boolean} 检测是否通过
	 */
	checkVal: function(val, el) {
		var check = this._checkNum(val);
		if (!check) {
			alertMsg({
				content: this.com_name + '：输入超出范围',
				type: 'error'
			});
			el.val(this._subNumber(this.limit_long, val));
		}
		return check;
	},	

	/**
	 * 检测数值有效性
	 * 
	 * @param {number} num 数值
	 * @return {boolean} 检测是否通过
	 */
	_checkNum: function(num) {
		return num / 100000 < 1;
	},

	/**
	 * 数字删减
	 * 
	 * @param {number} long 保留长度
	 * @param {number} num 待处理的数字
	 * @return {number} 处理完成的数字
	 */
	_subNumber: function(long, num) {
		var num_long = num.toString().length;
		if (num_long <= long) {
			return num;
		}
		return Math.floor(num / Math.pow(10, (num_long - long)));
	}

}


