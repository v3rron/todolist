var app = app || {};
$(function($){
	'use strict';
	var TodoList = Backbone.Collection.extend({
		url: '/api/todos',
		model: app.Todo,
		completed: function(){
			return this.filter(function(todo){
				return todo.get('completed');
			})
		}

		nextOrder: function(){
			if(!this.length){
				return 1;
			}
		}
		remaining: function(){
			return this.without.apply(this, this.completed());
		},
		comparator: function (todo) {
			return todo.get('order');
		}
	});
	app.Todos = new TodoList;
});