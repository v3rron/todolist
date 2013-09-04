class Todo < ActiveRecord::Base
	
	def self.complete(id, attrs)
		Rails.logger.info("== Completing todo ==")
		todo = find(id)
		todo.attributes = attrs
		todo.completed_at = Time.now
		todo.save
		return todo
	end

end
