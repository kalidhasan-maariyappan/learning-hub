# Source ledger: thirtyfive.txt

SHA-256: `1a608011cb18fe950147c840ef305c16767974bbb1a4665b10409efaf335367e`

359 physical lines; 30 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00821 | 13–18 | [B-0128](../B-rails.md#b-0128) | What is Ruby on Rails, and why is it popular for web development? |
| SRC-00822 | 19–27 | [B-0269](../B-rails.md#b-0269) | What are migrations in Rails? |
| SRC-00823 | 28–36 | [B-0363](../B-rails.md#b-0363) | Describe the role of routes.rb in a Rails application. |
| SRC-00824 | 37–44 | [C-0029](../C-database-sql.md#c-0029) | What is ActiveRecord in Rails? |
| SRC-00825 | 45–57 | [D-0036](../D-coding.md#d-0036) | What will be the output of the following code snippet? |
| SRC-00826 | 58–66 | [B-0294](../B-rails.md#b-0294) | Explain the purpose of the Gemfile in a Rails application. |
| SRC-00827 | 67–77 | [B-0357](../B-rails.md#b-0357) | What is the error in this Rails route configuration? |
| SRC-00828 | 78–83 | [B-0102](../B-rails.md#b-0102) | Explain the MVC architecture in Rails. |
| SRC-00829 | 84–98 | [B-0145](../B-rails.md#b-0145) | What is the flash hash in Rails? |
| SRC-00830 | 99–109 | [B-0044](../B-rails.md#b-0044) | How do you create a new Rails application? |
| SRC-00831 | 110–115 | [B-0151](../B-rails.md#b-0151) | Explain the purpose of the Rails convention over configuration principle. |
| SRC-00832 | 116–124 | [B-0363](../B-rails.md#b-0363) | How does Rails handle routing? |
| SRC-00833 | 125–134 | [C-0024](../C-database-sql.md#c-0024) | How does Rails handle database transactions? |
| SRC-00834 | 135–145 | [D-0037](../D-coding.md#d-0037) | What will be the output of the following code? |
| SRC-00835 | 146–151 | [C-0001](../C-database-sql.md#c-0001) | What is the difference between find and find_by in Rails? |
| SRC-00836 | 152–157 | [F-0062](../F-advanced.md#f-0062) | Describe how Rails implements single-table inheritance (STI). |
| SRC-00837 | 158–162 | [B-0149](../B-rails.md#b-0149) | What is the purpose of the find_or_create_by method in Rails? |
| SRC-00838 | 163–169 | [B-0172](../B-rails.md#b-0172) | How does Rails implement strong parameters, and why is it important? |
| SRC-00839 | 170–176 | [C-0008](../C-database-sql.md#c-0008) | How do Rails scopes work? |
| SRC-00840 | 177–198 | [B-0090](../B-rails.md#b-0090) | What are Rails validations, and why are they important? |
| SRC-00841 | 199–204 | [C-0022](../C-database-sql.md#c-0022) | How would you handle a scenario where you need to optimize a Rails application's performance due to slow database queries? |
| SRC-00842 | 205–219 | [F-0064](../F-advanced.md#f-0064) | Explain the concept of Service Objects in Rails. |
| SRC-00843 | 220–231 | [B-0009](../B-rails.md#b-0009) | Explain the purpose and use of Rails' Active Storage service. |
| SRC-00844 | 232–239 | [B-0267](../B-rails.md#b-0267) | What is ActiveRecord::Enum in Rails? |
| SRC-00845 | 240–253 | [B-0004](../B-rails.md#b-0004) | Describe how to implement a Rails callback for setting a default value before creating a record. |
| SRC-00846 | 254–259 | [B-0373](../B-rails.md#b-0373) | Explain how Rails handles logging. |
| SRC-00847 | 260–266 | [B-0098](../B-rails.md#b-0098) | How does Rails support internationalization (i18n) and what is an example of using locale files for translations? |
| SRC-00848 | 267–281 | [B-0008](../B-rails.md#b-0008) | Discuss the Rails delegate method. |
| SRC-00849 | 282–297 | [B-0260](../B-rails.md#b-0260) | How does Rails handle polymorphic associations? |
| SRC-00850 | 298–305 | [B-0202](../B-rails.md#b-0202) | How does Rails' ActiveSupport::Notifications work for monitoring and debugging, and provide an example of subscribing to a notification event? |

## Complete original text

```text
Introduction to Ruby on Rails
Ruby on Rails, often referred to as Rails, is a high-level web application framework written in Ruby, first released in 2004. It is renowned for its focus on rapid development, convention over configuration, and developer-friendly features. Rails streamlines web development with its built-in ORM, ActiveRecord, a powerful scaffolding tool, a rich set of conventions, and robust testing frameworks. By emphasizing simplicity and convention, Rails reduces the need for boilerplate code and enhances productivity. Its rich ecosystem, modern syntax, and strong community support make Rails a versatile framework for building dynamic and scalable web applications.

Table of Contents
Junior-Level Ruby on Rails Interview Questions
Mid-Level Ruby on Rails Interview Questions
Expert-Level Ruby on Rails Interview Questions
Proven Strategies and Best Practices for Ruby on Rails Interview

Junior-Level Ruby on Rails Interview Questions
Here are some junior-level interview questions for Ruby on Rails:

Question 01: What is Ruby on Rails, and why is it popular for web development?

Answer: Ruby on Rails is an open-source web application framework written in Ruby that follows the Model-View-Controller (MVC) architecture. It simplifies web development by emphasizing convention over configuration and adhering to the DRY (Don't Repeat Yourself) principle, which speeds up development and reduces repetitive code.

Its popularity comes from its ease of use, built-in tools, and a strong community. Rails provides a set of conventions and defaults that streamline development, along with a rich ecosystem of gems (libraries) that enhance functionality, making it a go-to choice for building web applications efficiently.

Question 02: What are migrations in Rails?

Answer: Migrations in Rails are a way to manage and version database schema changes. They allow you to create, modify, and delete database tables and columns over time, ensuring that your schema changes are consistent and trackable. Migrations are written as Ruby classes and are run with commands like rails db:migrate. Each migration file includes methods to define changes (up method) and revert them (down method). For example:

class AddAgeToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :age, :integer
  end
end
Question 03: Describe the role of routes.rb in a Rails application.

Answer: In a Rails application, the routes.rb file (located in the config directory) defines the routing rules that map incoming HTTP requests to specific controllers and actions. It serves as the central place for managing URL patterns and their corresponding controller actions. For example:

Rails.application.routes.draw do
  resources :users
  get 'welcome/index'
end
In this example, resources :users creates standard RESTful routes for the UsersController, and get 'welcome/index' maps the /welcome/index URL to the index action in the WelcomeController.
Question 04: What is ActiveRecord in Rails?

Answer: ActiveRecord in Rails is an Object-Relational Mapping (ORM) library that connects Ruby objects to database tables. It provides a high-level interface for interacting with the database using Ruby classes and objects, abstracting away the complexities of SQL. For example:

class User < ApplicationRecord
  validates :name, presence: true
end
In this example, User is a model that maps to a users table. ActiveRecord handles database operations and validates that a name must be present.
Question 05: What will be the output of the following code snippet?

def hello(name = "World")
  "Hello, #{name}!"
end

puts hello("Rails")
puts hello
Answer: The output will be:

Hello, Rails!
Hello, World!
The hello method takes an optional argument with a default value of "World". When called with "Rails", it uses the provided argument. When called without an argument, it uses the default value.
Question 06: Explain the purpose of the Gemfile in a Rails application.

Answer: The Gemfile in a Rails application defines the Ruby gems that the application depends on, specifying their versions and any environment-specific requirements. It ensures that all developers and deployment environments use the same gem versions, avoiding discrepancies and compatibility issues. By listing gems and their versions, it helps manage dependencies effectively, allowing you to run commands like bundle install to install and update gems as needed. For example:

source 'https://rubygems.org'

gem 'rails', '6.1.4'
gem 'pg', '~> 1.2'
gem 'puma', '~> 5.0'
Question 07: What is the error in this Rails route configuration?

Rails.application.routes.draw do
  resources :users
  get 'users/:id', to: 'users#show'
end
Answer: The get 'users/:id', to: 'users#show' route is redundant because resources :users already provides a route for show. Here's the corrected route configuration:

Rails.application.routes.draw do
  resources :users
end                        
Question 08: Explain the MVC architecture in Rails.

Answer: The MVC (Model-View-Controller) architecture in Rails divides an application into three main components: Models, Views, and Controllers. Models manage the data and business logic of the application, interacting with the database and performing data-related operations. They encapsulate the application's core functionality and are defined as classes that inherit from ActiveRecord::Base.

Views are responsible for presenting the data to users, typically using HTML with embedded Ruby (ERB) to dynamically generate content based on the model's data. Controllers handle user input, coordinate between models and views, and decide which view to render based on the application's logic and user actions. This separation ensures that each component focuses on a specific aspect of the application, promoting organized and maintainable code.

Question 09: What is the flash hash in Rails?

Answer: In Rails, the flash hash is used to store temporary messages that are displayed to users after performing actions, such as form submissions or redirects. It allows you to set messages that will be available on the next request, typically to provide feedback or alerts, and then automatically clears itself. For example:

class UsersController < ApplicationController
  def create
    if @user.save
      flash[:notice] = "User successfully created."
      redirect_to @user
    else
      flash[:alert] = "There was an error creating the user."
      render :new
    end
  end
end 
Question 10: How do you create a new Rails application?

Answer: To create a new Rails application, you use the rails new command followed by the application name. This command generates a new Rails project with a default directory structure and necessary files. For example:

rails new my_app
In this example, my_app is the name of the new Rails application.


Mid-Level Ruby on Rails Interview Questions
Here are some mid-level interview questions for Ruby on Rails:

Question 01: Explain the purpose of the Rails convention over configuration principle.

Answer: The "convention over configuration" principle in Rails reduces the need for extensive setup by providing default conventions for application structure and behavior. This means that developers can follow predefined patterns rather than having to configure each aspect of their application manually.

This approach speeds up development and minimizes the amount of boilerplate code needed, making it easier to build and maintain applications. By adhering to these conventions, developers focus more on application-specific features rather than setup details.

Question 02: How does Rails handle routing?

Answer: Rails handles routing through the routes.rb file, located in the config directory. It maps incoming HTTP requests to specific controller actions based on URL patterns and HTTP methods. For example:

Rails.application.routes.draw do
  resources :articles
  get 'welcome/index'
end
In this example, resources :articles generates RESTful routes for the ArticlesController, while get 'welcome/index' maps the /welcome/index URL to the index action in the WelcomeController.
Question 03: How does Rails handle database transactions?

Answer: Rails handles database transactions using Active Record's transaction methods, which ensure that a series of database operations are executed as a single unit of work. If any part of the transaction fails, all changes are rolled back to maintain data integrity. For example:

ActiveRecord::Base.transaction do
  user = User.create!(name: 'John Doe')
  profile = Profile.create!(user: user, bio: 'Developer')
  # If an error occurs here, both user and profile will be rolled back
end
The ActiveRecord::Base.transaction block wraps two create! operations. If any of these operations fail, the entire transaction is rolled back, and neither user nor profile will be saved to the database.
Question 04: What will be the output of the following code?

class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true
end

user = User.new(email: 'test@example.com')
user.save
puts User.count
Answer: The output is 1 because the code creates and saves a new User instance with a unique email. After saving, it prints the total count of User records in the database, which is 1 since one user has been successfully added.

Question 05: What is the difference between find and find_by in Rails?

Answer: In Rails, find and find_by are methods used to retrieve records from the database, but they serve different purposes. find is used to locate a record by its primary key (usually the id). It raises an ActiveRecord::RecordNotFound exception if the record with the given primary key does not exist. For example, User.find(1) will fetch the user with an id of 1, or throw an error if no such user exists.

find_by, on the other hand, allows you to query records using any attribute, not just the primary key. It returns the first record that matches the given conditions or nil if no record is found. For instance, User.find_by(email: 'example@example.com') will find the first user with the specified email or return nil if no such user exists.

Question 06: Describe how Rails implements single-table inheritance (STI).

Answer: Rails implements Single Table Inheritance (STI) by using a single database table to store records for multiple subclasses of a parent class. This approach allows different subclasses to inherit from a common base class while sharing the same table.

In STI, a special column, typically named type, is used in the database table to differentiate between the various subclasses. This column holds the name of the subclass, enabling Rails to instantiate the correct subclass when retrieving records from the table.

Question 07: What is the purpose of the find_or_create_by method in Rails?

Answer: The find_or_create_by method attempts to find a record with the given attributes; if none is found, it creates a new record with those attributes. This method simplifies the process of ensuring a record's existence without needing to manually check if it exists first. For example:

user = User.find_or_create_by(email: 'user@example.com')
Question 08: How does Rails implement strong parameters, and why is it important?

Answer: Rails implements strong parameters as a security feature to protect against mass assignment vulnerabilities. This feature ensures that only permitted attributes are allowed to be updated or created through mass assignment, such as when handling form submissions. This is crucial for preventing unintended changes to model attributes and ensuring that users can only modify what they are allowed to. For example:

def user_params
  params.require(:user).permit(:name, :email)
end
Question 09: How do Rails scopes work?

Answer: In Rails, scopes are a way to define reusable queries that can be applied to ActiveRecord models. They help organize and encapsulate query logic, making it easier to write and maintain complex queries while keeping your models clean and readable. For example:

class Post < ApplicationRecord
  scope :published, -> { where(published: true) }
end
Question 10: What are Rails validations, and why are they important?

Answer: Rails validations are mechanisms used to ensure that data being saved to the database meets specific criteria or constraints. They are a crucial part of the Rails framework, ensuring data integrity and consistency by enforcing rules at the application level before data is persisted. For example:

class User < ApplicationRecord
  # Presence validation
  validates :name, presence: true

  # Length validation
  validates :email, length: { minimum: 5 }

  # Uniqueness validation
  validates :email, uniqueness: true

  # Format validation
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
end


Expert-Level Ruby on Rails Interview Questions
Here are some expert-level interview questions for Ruby on Rails:

Question 01: How would you handle a scenario where you need to optimize a Rails application's performance due to slow database queries?

Answer: To optimize performance, we can start by analyzing slow queries using tools like the EXPLAIN command or the Rails log for identifying bottlenecks. Consider adding appropriate indexes to the database tables and optimizing SQL queries.

Utilize caching mechanisms such as fragment caching, low-level caching, or Rails caching strategies to reduce the load on the database. Also, examine your Active Record associations and queries to ensure they are efficient and avoid N+1 query problems.

Question 02: Explain the concept of Service Objects in Rails.

Answer: Service Objects in Rails are a design pattern used to organize and encapsulate business logic that doesn't naturally fit within the model or controller layers. They help maintain a clean separation of concerns, making the code more modular, readable, and maintainable. For example:

# Example: Service Object for processing payments
class PaymentService
  def initialize(user, amount)
    @user = user
    @amount = amount
  end

  def process
    # Payment processing logic
  end
end
Question 03: Explain the purpose and use of Rails' Active Storage service.

Answer: Active Storage integrates with Rails to manage file uploads and attachments directly within the framework. It supports direct uploads to cloud services like Amazon S3 and has built-in support for image processing. Unlike other gems, it is part of Rails and tightly integrated into the framework. For example:

class User < ApplicationRecord
  has_one_attached :avatar
end

# In the controller:
def update
  @user.avatar.attach(params[:avatar])
end
Question 04: What is ActiveRecord::Enum in Rails?

Answer: ActiveRecord::Enum provides a way to map an integer column to a set of symbolic values, allowing you to use human-readable symbols instead of raw integers in your code. This simplifies working with enumerated types and improves code readability. For example:

class User < ApplicationRecord
  enum role: { guest: 0, user: 1, admin: 2 }
end
The enum method maps the role column to three symbolic values: guest, user, and admin.
Question 05: Describe how to implement a Rails callback for setting a default value before creating a record.

Answer: Rails callbacks like before_create allow you to execute code before a record is saved to the database. You can use this callback to set default values for attributes before the record is created. For example:

class User < ApplicationRecord
  before_create :set_default_status

  private

  def set_default_status
    self.status ||= 'active'
  end
end
The before_create callback invokes set_default_status before the user record is created, setting the status attribute to 'active' if it is not already set.
Question 06: Explain how Rails handles logging.

Answer: Rails uses ActiveSupport::Logger to manage logging, which records events, errors, and information to files in the log directory. It supports various log levels like DEBUG, INFO, WARN, ERROR, and FATAL, allowing developers to track different types of messages.

Logging settings can be adjusted in environment configuration files, enabling control over log verbosity and output locations. This setup helps in monitoring and debugging by providing a structured way to capture and view application logs.

Question 07: How does Rails support internationalization (i18n) and what is an example of using locale files for translations?

Answer: Rails supports internationalization (i18n) through locale files that contain translations for different languages. These files are stored in the config/locales directory and are used to provide multilingual support for your application. For example:

en:
  hello: "Hello"
The locale file en.yml defines a translation for the hello key in English.
Question 08: Discuss the Rails delegate method.

Answer: The delegate method in Rails is used to delegate method calls to an associated object, simplifying your code and reducing the need for redundant code. This is useful when you want to expose methods of an associated object directly from the parent model. For example:

class User < ApplicationRecord
  has_one :profile
  delegate :full_name, to: :profile
end

class Profile < ApplicationRecord
  def full_name
    "#{first_name} #{last_name}"
  end
end
The delegate method in the User model allows you to call user.full_name directly, which delegates the method call to the profile association. This simplifies accessing the full_name method from the Profile model.
Question 09: How does Rails handle polymorphic associations?

Answer: Polymorphic associations allow a model to belong to more than one other model using a single association. This is achieved by using type and ID columns to refer to the associated model. For example:

class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end

class Post < ApplicationRecord
  has_many :comments, as: :commentable
end

class Event < ApplicationRecord
  has_many :comments, as: :commentable
end
The Comment model can be associated with both Post and Event models using a single commentable association.
Question 10: How does Rails' ActiveSupport::Notifications work for monitoring and debugging, and provide an example of subscribing to a notification event?

Answer: ActiveSupport::Notifications is used for instrumentation and monitoring within Rails applications. It allows you to subscribe to and trigger custom notifications for various events, useful for logging and debugging. For example:

ActiveSupport::Notifications.subscribe('process_action.action_controller') do |name, start, finish, id, payload|
  Rails.logger.info("Processing time: #{finish - start} seconds")
end
The subscription logs the processing time for process_action.action_controller events, providing insight into the duration of controller actions.


Ace Your Rails Interview: Proven Strategies and Best Practices
To excel in a Ruby on Rails technical interview, it's crucial to have a strong grasp of the framework's core concepts. This includes a deep understanding of Rails syntax and semantics, ActiveRecord models, and Rails' conventions over configuration philosophy. Additionally, mastering Rails' approach to routing, controllers, and views is essential for building robust and maintainable web applications.

Core Framework Concepts: Understand syntax and semantics, ActiveRecord models (associations, validations, migrations), routing, controllers, views, and template engines (ERB, HAML).
Concurrency and Parallelism: Learn about background job processing (Sidekiq, Resque), caching mechanisms (fragment caching, HTTP caching), and optimization techniques.
Standard Library and Packages: Gain familiarity with Ruby’s core libraries, Rails modules, and commonly used gems (Devise, Pundit).
Practical Experience: Build and deploy Rails applications, solve real-world problems, and showcasing hands-on projects.
Testing and Debugging: Write unit, integration, and system tests (RSpec, Minitest), and try using debugging tools (byebug, Rails console).
Practical experience is invaluable when preparing for a technical interview. Building and contributing to projects, whether personal, open-source, or professional, helps solidify your understanding and showcases your ability to apply theoretical knowledge to real-world problems. Additionally, demonstrating your ability to effectively test and debug your applications can highlight your commitment to code quality and robustness.
Related interview questions
Ruby Interview Questions
Django Interview Questions
Spring Boot Interview Questions
Ruby on Rails on CodeInterview
Get started with CodeInterview now
No credit card required, get started with a free trial or choose one of our premium plans for hiring at scale.

Start for free See pricing
Product
Tour
Pricing
API Docs
Login
Sign Up Free
Company
About
Blog
Careers
Contact us
Customers
Guide for Interviewers
Guide for Candidates
Support
Contact Sales
Feature Requests
Compare
vs CoderPad
vs HackerRank
vs Codility
vs CodeSignal
Compilers
Online Java Compiler
Online Python Compiler
Online C Compiler
Online Go Compiler
Online Scala Compiler
Online Ruby Compiler
Legal
Privacy Policy
Terms of Services
Read CodeInterview reviews on G2

```
