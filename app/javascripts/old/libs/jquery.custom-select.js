/*
 * CustomSelect - jQuery plugin for stylize select
 * author: Shashenko Andrei
 */

$(function(){
	'use strict';

	$.fn.CustomSelect = function(options){
		var def = {
				prefix: 'b-custom-select',
				modifier: '',
				visRows: 10,
				search: false,
				customScroll: true,
				speed: 100
			},
			KEY = {
				UP: 38,
				DOWN: 40,
				LEFT: 37,
				RIGHT: 39,
				ENTER: 13,
				SPACE: 32,
				ESC: 27
			},
			opt = $.extend({}, def, options || {});

		opt.stateClasses = {
			disabled: opt.prefix + '_disabled',
			multiple: opt.prefix + '_multiple',
			focus	: opt.prefix + '_focus',
			expanded: opt.prefix + '_expanded',
			itemDisabled: 'disabled',
			itemSelected: 'selected'
		};

		this.each(function(){
			//Initialize
			var $nativeSelect = $(this),
				defaultTitle = $nativeSelect.data('title'),
				isDisabled = $nativeSelect.attr('disabled') == 'disabled',
				isMultiple = $nativeSelect.attr('multiple') == 'multiple',
				isSearch = isMultiple ? false : opt.search,
				countSelectGroups = 0,
				countSelectItems = 0,
				defaultWidth = $nativeSelect.outerWidth(),
				scrollWidth = getScrollWidth();

			var $selectBox = $('<div>',{'class': opt.prefix + '__title', 'html': '<i class="' + opt.prefix + '__title__icon"></i>'}),
				$selectTitle = $('<div>',{'class': opt.prefix + '__title__text'}),
				$input = $('<input>',{'type':'text','class': opt.prefix + '__title__input'}).css({'width': defaultWidth - $('.' + opt.prefix + '__title__icon').outerWidth()}),
				$selectBoxContainer = $('<div>',{'class': opt.prefix + ((typeof(opt.modifier) == 'string' && opt.modifier != '') ? ' ' + opt.prefix + '_' + opt.modifier : ''), 'html': $selectBox}).css({'width': defaultWidth}),
				$selectList = $('<div>',{'class': opt.prefix + '__list'}),
				$dropDown = $('<div>',{'class': opt.prefix + '__dropdown' + ((typeof(opt.modifier) == 'string' && opt.modifier != '') ? ' ' + opt.prefix + '__dropdown_' + opt.modifier : ''), 'html': $selectList}).css({'display': 'none', 'position': 'absolute', 'width': defaultWidth, 'zIndex': 999}),
				$scrollContainer = $('<div>', {'class': opt.prefix + '__dropdown__inner'}).css({'height': '100%'}),
				$scrollBar = $('<div>', {'class': opt.prefix + '__scrollbar'}),
				$scrollBarWrapper = $('<div>', {'class': opt.prefix + '__wrap-scrollbar', 'html': $scrollBar});

			$selectList.usekey = false; //if use keys for change val

			$selectList.wrap($scrollContainer);
			$scrollContainer = $('.' + opt.prefix + '__dropdown__inner', $dropDown);

			//Create custom select
			createList();

			//Insert custom select
			$nativeSelect
				.css({'position': 'absolute', 'opacity': 0, 'width':0, 'height': 0})
				.after($selectBoxContainer);

			//Binding custom show and hide es on the dropDown
			$dropDown
				.bind('show',function(){
					if($dropDown.is(':animated')){
						return false;
					}
					if(!isSearch)
						$nativeSelect.focus();
					$('body').append($dropDown);
					$selectBoxContainer.addClass(opt.stateClasses.expanded).addClass(opt.stateClasses.focus);

					var scrollTop = 0,
						visibleItems = countSelectItems + countSelectGroups,
						selectOffset = $selectBoxContainer.offset(),
						dropDownLeft = selectOffset.left,
						dropDownTop = selectOffset.top + $selectBoxContainer.outerHeight(),
						dropDownHeight = $selectList.outerHeight() - $selectList.height();

					$dropDown
						.css({'left': dropDownLeft, 'top': dropDownTop, 'height': 0})
						.show();

					if(countSelectItems > opt.visRows){
						visibleItems = opt.visRows;
						if(opt.customScroll)
							$selectList.css({'margin-right': $scrollBarWrapper.outerWidth(true)});
					}

					for(var i=0; i < visibleItems; i++){
						dropDownHeight += $selectList.find('div:visible').eq(i).outerHeight(true);
					}

					$dropDown.animate({'height': dropDownHeight}, opt.speed, function(){
						if(countSelectItems > opt.visRows){
							$scrollBar.height($scrollContainer.height() * $scrollContainer.height() / $selectList.outerHeight());
							scrollTop = ($('.' + opt.stateClasses.itemSelected, $selectList).index() > opt.visRows) ? $('.' + opt.stateClasses.itemSelected, $selectList).position().top - parseInt($selectList.css('padding-top')) : 0;
							$scrollContainer.scrollTop(scrollTop);
							if(scrollTop == 0)
								$scrollContainer.trigger('scroll');
						}
					});
				})
				.bind('hide',function(){
					if($dropDown.is(':animated')){
						return false;
					}
					$dropDown.slideUp(opt.speed, function(){
						$selectBoxContainer.removeClass(opt.stateClasses.expanded);
						$dropDown.detach();
						if(isSearch && $input.val() == ''){
							$('.' + opt.prefix + '__item_notfound', $selectList).remove();
							$selectList.find('div').show();
						}
					});
				})
				.bind('toggle',function(){
					if($selectBoxContainer.hasClass(opt.stateClasses.expanded))
						$dropDown.trigger('hide');
					else
						$dropDown.trigger('show');
				});

			//Bind event handlers for select
			$nativeSelect
				.on('focus', function(e){
					$selectBoxContainer.addClass(opt.stateClasses.focus);
				})
				.on('blur', function(e){
					$selectBoxContainer.removeClass(opt.stateClasses.focus);
				})
				.on('keydown', function(e){
					switch(e.keyCode){
						case KEY.UP:
						case KEY.LEFT: selectItem($('.' + opt.stateClasses.itemSelected, $selectList).prevAll('.' + opt.prefix + '__item:not(.disabled):first')); break;
						case KEY.DOWN:
						case KEY.RIGHT: selectItem($('.' + opt.stateClasses.itemSelected, $selectList).nextAll('.' + opt.prefix + '__item:not(.disabled):first')); break;
						case KEY.ENTER: $('.' + opt.stateClasses.itemSelected, $selectList).click(); break;
						case KEY.SPACE: if(!$selectBoxContainer.is('.' + opt.stateClasses.expanded)) $dropDown.trigger('show'); break;
					}
				})
				//Update select
				.bind('update', function(e){
					$dropDown.trigger('hide');
					createList();
				});

			//Events of input field
			$input
				.on('focus', function(){
					$(this).select();
				})
				.on('keyup', function(e){
					switch(e.keyCode){
						case KEY.ESC: //если нажали esc
							$dropDown.trigger('hide');
						break;
						case KEY.UP,
							 KEY.DOWN:
							//e.which = KEY.DOWN;
							console.log(e);
							$nativeSelect.trigger(e);
						break;
						default:
							clearTimeout($.data(this, 'timer'));
							var wait = setTimeout(function() {searching($input.val())}, 500);
							$(this).data('timer', wait);
						break;
					}
				})
				.on('blur', function(){
					if($(this).val() == '')
						setTitle(defaultTitle);
				});

			//Create list from options
			function createList(){
				$selectList.empty();

				//Set properties
				countSelectItems = $('option', $nativeSelect).length;
				countSelectGroups = $('optgroup', $nativeSelect).length;
				defaultTitle = $nativeSelect.data('title');
				isDisabled = $nativeSelect.attr('disabled') == 'disabled';
				isMultiple = $nativeSelect.attr('multiple') == 'multiple';

				//Create items
				$('option', $nativeSelect).each(function(i){
					var $option = $(this);
					var $item = $('<div>', {'class': opt.prefix + '__item', 'title': $option.text(), 'text': $option.text()});

					if($option.is(':selected') && $option.val() != defaultTitle && defaultTitle != 'undefined'){
						setTitle($option.text());
						$item.addClass(opt.stateClasses.itemSelected).siblings().removeClass(opt.stateClasses.itemSelected);
					}

					if($option.is(':disabled')){
						$item.addClass(opt.stateClasses.itemDisabled);
					}else{
						$item.on('click', function(e){
							e.preventDefault();
							if(isMultiple){
								if(!$(this).hasClass(opt.stateClasses.itemSelected)){
									$(this).addClass(opt.stateClasses.itemSelected);
									$option.attr({'selected': 'selected'});
								}else{
									$(this).removeClass(opt.stateClasses.itemSelected);
									$option.removeAttr('selected');
								}

								setTitle('Selected [' + $('.' + opt.stateClasses.itemSelected, $selectList).length + ']');
								$nativeSelect.change();
							}else{
								if(!$(this).hasClass(opt.stateClasses.itemSelected)){
									$(this).addClass(opt.stateClasses.itemSelected).siblings().removeClass(opt.stateClasses.itemSelected);
									setTitle($option.text());
									if(!$selectList.usekey)
										$nativeSelect.val($option.val()).change();
								}

								if($selectBoxContainer.is('.' + opt.stateClasses.expanded) && !$selectList.usekey)
									$dropDown.trigger('hide');

								$selectList.usekey = false;
							}
						});
					}
					if($option.parent().is('optgroup') && $option.is(':first-child')){
						var $group = $option.parent();
						$selectList.append($('<div>', {'class': opt.prefix + '__group', 'title': $group.attr('label'), 'text': $group.attr('label')}));
					}
					$selectList.append($item);
				});
				if(countSelectItems > opt.visRows){
					initScroll();
				}else{
					destroyScroll();
				}

				if(isSearch)
					$selectBox.prepend($input);
				else
					$selectBox.prepend($selectTitle);

				if(isDisabled){
					$selectBoxContainer.addClass(opt.stateClasses.disabled);
					if(isSearch){
						$input.attr('disabled','disabled');
					}
					$selectBox.unbind('click');
				}else if(countSelectItems + countSelectGroups > 0){
					$selectBoxContainer.removeClass(opt.stateClasses.disabled);
					$input.removeAttr('disabled','disabled');
					$selectBox.on('click', function(e){
						e.preventDefault();
						$('.' + opt.prefix + '__dropdown').not($dropDown).trigger('hide');
						$dropDown.trigger('toggle');
					});
				}
				if(isMultiple){
					$selectBoxContainer.addClass(opt.stateClasses.multiple);
					if(typeof(defaultTitle) == 'undefined' || $('.' + opt.stateClasses.itemSelected, $selectList).length > 0)
						defaultTitle = 'Selected [' + $('.' + opt.stateClasses.itemSelected, $selectList).length + ']';
				}

				setTitle(defaultTitle);
			}

			function selectItem(item){
				var $targetItem = item,
					targetIndex = $targetItem.index();

				$selectList.usekey = true;

				if(targetIndex < 0) return;

				var	$currentItem = $('.' + opt.stateClasses.itemSelected, $selectList),
					itemHeight = $('.' + opt.prefix + '__item:first', $selectList).outerHeight(true),
					dropDownHeight = $dropDown.height(),
					scrollTop = -1,
					targetIndex = $targetItem.index(),
					currentIndex = $currentItem.index(),
					posTop = $targetItem.position().top;

				if(targetIndex < currentIndex && posTop <= itemHeight){
					scrollTop = $scrollContainer.scrollTop() + posTop - parseInt($selectList.css('padding-top'));
				}else if(targetIndex > currentIndex && itemHeight >= dropDownHeight - posTop){
					scrollTop = $scrollContainer.scrollTop() + posTop + itemHeight - dropDownHeight + parseInt($selectList.css('padding-bottom'));
				}

				$targetItem.click();

				if(scrollTop >= 0)
					$scrollContainer.scrollTop(scrollTop);
			}

			function setTitle(text){
				if(isSearch){
					$input.val(text);
				}else{
					$selectTitle.text(text);
				}
			}

			function initScroll(){
				$scrollContainer.css({'overflow-y': 'scroll'});
				if(opt.customScroll){
					$scrollContainer.css({'width': defaultWidth + scrollWidth + 'px'});
					var drag = false;
					var scrollerY0 = 0;
					$selectList.after($scrollBarWrapper);

					$scrollContainer.on('scroll', function(){
						$scrollBar.css({top: getBarTop() + 'px'});
					});

					$scrollBar.on('mousedown', function(e){
						drag = true;
						selection(1);
						scrollerY0 = e.clientY - getBarTop();
					});
					$(document)
						.on('mouseup blur', function(e){
							drag = false;
							selection();
						})
						.on('mousemove', function(e){
							if(drag){
								var top = ((e.clientY - scrollerY0) * ($selectList.outerHeight(true) - $scrollContainer.height()))/($scrollContainer.height() - $scrollBar.outerHeight(true));
								$scrollContainer.scrollTop(top);
							}
						});
				}
			}

			function destroyScroll(){
				$scrollContainer.css({'width': 'auto', 'overflow-y': 'visible'});
				$selectList.css({'margin-right': 0});
				$scrollBarWrapper.remove();
			}

			function getBarTop(){
				return ($scrollContainer.scrollTop() / ($selectList.outerHeight(true) - $scrollContainer.height())) * ($scrollContainer.height() - $scrollBar.outerHeight(true));
			}

			function searching(search){
				var $item,
					matches = 0,
					regexp = escapeRegExp(search);
				//exact match
				regexp = '^.*?' + regexp + '.*$';
				//RegExp object
				search = new RegExp(regexp, 'i');
				//for each item in list
				$('.' + opt.prefix + '__item', $selectList).each(function(){
					$item = $(this);
					if(search.test($item.text())){
						$item.show();
						matches++;
					}else{
						$item.hide();
					}
				});
				if(matches > opt.visRows){
					initScroll();
				}else{
					destroyScroll();
				}
				if(matches > 0){
					$('.' + opt.prefix + '__item_notfound', $selectList).remove();
					$dropDown.trigger('show');
				}else if(!$('.' + opt.prefix + '__item_notfound', $selectList).length){
					$selectList.append($('<div>', {'class': opt.prefix + '__item ' + opt.prefix + '__item_notfound', 'text': 'Ничего не найдено!'}));
				}
				$dropDown.trigger('show');
			}
		});

		//Get width of the scroller
		function getScrollWidth(){
			var $container = $('<div>', {'class': opt.prefix + '__dropdown__inner'}).css({'position': 'absolute', 'top': '-100px', 'left': '-100px', 'width': '50px', 'height': '50px'}),
				wScroll = 0,
				wNoScroll = 0;

			$('body').append($container);
			wNoScroll = $container.outerWidth();
			wScroll = $container.css({'overflow-y': 'scroll'}).get(0).clientWidth;
			$container.remove();

			return (wNoScroll - wScroll);
		}

		//Text selection start preventing
		function dontStartSelect(){
			return false;
		}

		//Text selection preventing on drag
		function selection(on){
			if(on)
				$(document).bind('selectstart', dontStartSelect);
			else
				$(document).unbind('selectstart', dontStartSelect);
		}

		function escapeRegExp(str){
			var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '^', '$'];
			var regexp = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
			return str.replace(regexp, '\\$1');
		}

		//Key action
		$(document)
			.on('keydown', function(e){
				switch(e.keyCode){
					case KEY.ESC: $('.' + opt.prefix + '__dropdown').trigger('hide');break; //if press ESC
				}
			})
			.on('click', function(e){
				if(!$(e.target).parents().filter('.' + opt.prefix + '__dropdown').length && !$(e.target).is('option')){
					$('.' + opt.prefix + '__dropdown').trigger('hide');
				}
			});
	}
});