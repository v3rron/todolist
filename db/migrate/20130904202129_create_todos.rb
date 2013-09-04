class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title
      t.boolean :completed
      t.datetime :completed_at

      t.timestamps
    end
  end
end
