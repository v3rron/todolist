var app = app || {};
$(function($){
	'use strict';
	app.TodoView = Backbone.View.extend({
		tagName: 'li',
		template: JST["todos/todo"],
		initialize: function(){
			this.model.on('change', this.render, this);
			this.model.on('destroy', this.remove, this);
			this.model.on('visible', this.toggleVisible, this);
		},
		events:{
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'dblclick label': 'edit',
			'blur .edit': 'restore',
			'click .toggle': 'toggleCompleted'
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.input = this.$('.edit');
			return this;
		},
		toggleVisible: function(){
			this.$el.toggleClass('hidden', this.isHidden());
		},
		isHidden: function(){
			var isCompleted = this.model.get('completed');
			return (
				(!isCompleted && app.TodoFilter === 'completed')
				|| (isCompleted && app.TodoFilter === 'active')
				);
		},
		clear: function () {
			this.model.destroy();	
		},
		toggleCompleted: function(){
			this.model.toggle();
		},
		updateOnEnter: function(e){
			if(e.which === ENTER_KEY){
				this.close();
			}
		},
		close: function(){
			var value = this.input.val().trim();
			if(value){
				this.model.save({title: value})
			}else{
				this.clear();
			}
			this.$el.removeClass('editing');
		},
		edit: function(){
			this.$el.addClass('editing');
			this.input.focus();
		},
		restore: function(){
			this.$el.removeClass('editing');
		}

	})
});