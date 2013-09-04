var app = app || {};
$(function($){
	'use strict';
	app.Todo = Backbone.Model.extend({
		defaults:{
			title: 'Empty Todo',
			completed: false
		},
		toggle: function(){
			this.url = '/api/todos' + this.attributes.id + '/completed';
			this.save({
				completed: !this.get('completed');
			});
		}
	});
});