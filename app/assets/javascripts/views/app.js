var app = app || {};
$(function($){
	app.AppView = Backbone.View.extend({
		el: '#todoapp',
		statsTemplate: JST['todos/stats'],
		events: {
			'keypress #new-todo': 'createOnEnter',
			'click #clear-completed': 'clearCompleted',
			'click #toggle-all': 'toggleAllComplete'
		},
		initialize: function(){
			this.input = this.$('#new-todo');
			this.allCheckbox = this.$('#toggle-all')[0];
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');

			app.Todos.on('add', this.addOne, this);
			app.Todos.on('reset', this.addAll, this);
			app.Todos.on('change:completed', this.filterOne, this);
			app.Todos.on('filter', this.filterAll, this);
			app.Todos.on('all', this.render, this);

			app.Todos.fetch();
		},
		render: function(){
			var completed = app.Todos.completed().length;
			var remaining = app.Todos.remaining().length;

			if ( app.Todos.length ) {
				this.$main.show();
				this.$footer.show();
				this.$footer.html(this.statsTemplate({
					completed: completed,
					remaining: remaining
				}));
				this.$('#filters li a').removeClass('selected')
				.filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
				.addClass('selected');
			}
			else {
				this.$main.hide();
				this.$footer.hide();
			}
			this.allCheckbox.checked = !remaining;
		},
  // Generate the attributes for a new Todo item.
  newAttributes: function() {
  	return {
  		title: this.input.val().trim(),
  		order: app.Todos.nextOrder(),
  		completed: false
  	};
  },
  createOnEnter: function( e ) {
  	if ( e.which !== ENTER_KEY || !this.input.val().trim() ) {
  		return;
  	}
  	app.Todos.create( this.newAttributes() );
  	this.input.val('');
  },
  // **Important Method**
  addOne: function( todo ) {
  	var view = new app.TodoView({ model: todo });
  	$('#todo-list').append( view.render().el );
  },
// Add all items in the **Todos** collection at once.
addAll: function() {
	this.$('#todo-list').html('');
	app.Todos.each(this.addOne, this);
},
filterOne : function (todo) {
	todo.trigger('visible');
},
filterAll : function () {
	app.Todos.each(this.filterOne, this);
},
clearCompleted: function() {
	_.each( app.Todos.completed(), function( todo ) {
		todo.destroy();
	});

	return false;
},

toggleAllComplete: function() {
	var completed = this.allCheckbox.checked;
	app.Todos.each(function( todo ) {
		todo.save({
			'completed': completed
		});
	});
}
});
});