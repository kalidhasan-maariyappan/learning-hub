# Part B: Ruby on Rails Interview Questions

[Master index](README.md) · [Coverage report](COVERAGE_REPORT.md)

397 consolidated questions. Original passages are kept in the source ledgers; corrected answers and distinct reviewed variants appear here.


## Additional technical topics

- [B-0001 — Can you describe a project where you implemented Ruby on Rails to solve a business problem?](#b-0001)
- [B-0002 — Consider the following:](#b-0002)
- [B-0003 — Describe a challenging bug you resolved in Rails.](#b-0003)
- [B-0004 — Describe how to implement a Rails callback for setting a default value before creating a record.](#b-0004)
- [B-0005 — Describe how you would implement a custom validator in Rails. Provide an example.](#b-0005)
- [B-0006 — Describe the use of `ActiveModel::Serializers` in Rails. When should you use it?](#b-0006)
- [B-0007 — Describe what destructive methods are.](#b-0007)
- [B-0008 — Discuss the Rails delegate method.](#b-0008)
- [B-0009 — Do you know about Activestorage in Ruby on Rails and How can you use this?](#b-0009)
- [B-0010 — Explain eager loading and lazy loading in Rails.](#b-0010)
- [B-0011 — Explain how rail implements Ajax?](#b-0011)
- [B-0012 — Explain how you would implement caching in a Rails application. What different caching strategies are available?](#b-0012)
- [B-0013 — Explain Microservices and how Rails can be part of it.](#b-0013)
- [B-0014 — Explain ORM in Ruby on Rails?](#b-0014)
- [B-0015 — Explain the concept of eager loading in Rails. Why is it important and how does it work?](#b-0015)
- [B-0016 — Explain the concept of eager loading in Ruby on Rails and why it is beneficial.](#b-0016)
- [B-0017 — Explain the Decorator Pattern in Rails.](#b-0017)
- [B-0018 — Explain the difference between before_action, around_action, and after_action.](#b-0018)
- [B-0019 — Explain the difference between dynamic and static scaffolding.](#b-0019)
- [B-0020 — Explain the importance of before_save and after_save callbacks in Rails.](#b-0020)
- [B-0021 — Explain types of Callbacks in Ruby on Rails.](#b-0021)
- [B-0022 — Explain what count does in Ruby on Rails.](#b-0022)
- [B-0023 — Explain what Delete does in Ruby on Rails.](#b-0023)
- [B-0024 — Explain what Destroy does in Ruby on Rails.](#b-0024)
- [B-0025 — Explain what dynamic finders are.](#b-0025)
- [B-0026 — Explain what harnesses are.](#b-0026)
- [B-0027 — Explain what initializers are in Ruby on Rails.](#b-0027)
- [B-0028 — Explain what length does in Ruby on Rails.](#b-0028)
- [B-0029 — Explain what load does in Ruby on Rails.](#b-0029)
- [B-0030 — Explain what observers are in Ruby on Rails.](#b-0030)
- [B-0031 — Explain what ORM means in Ruby on Rails.](#b-0031)
- [B-0032 — Explain what require does in Ruby on Rails.](#b-0032)
- [B-0033 — Explain what Ruby on Rails is.](#b-0033)
- [B-0034 — Explain what size does in Ruby on Rails.](#b-0034)
- [B-0035 — Explain what Spring is.](#b-0035)
- [B-0036 — Explain when self.up and self.down method is used?](#b-0036)
- [B-0037 — Explain whether instance methods are private or public.](#b-0037)
- [B-0038 — Explain with the help of an example Skip Callback in Rails.](#b-0038)
- [B-0039 — How can recruiters reduce time-to-hire for Rails developers?](#b-0039)
- [B-0040 — How do weekdays and weekends affect this schedule?](#b-0040)
- [B-0041 — How do you add CSS and JavaScript to your Rails application?](#b-0041)
- [B-0042 — How do you assess Ruby on Rails developer skills?](#b-0042)
- [B-0043 — How do you create a custom generator in Rails?](#b-0043)
- [B-0044 — How do you create a new Rails application?](#b-0044)
- [B-0045 — How do you create a User model with name and email attributes using generator?](#b-0045)
- [B-0046 — How do you define a User model in Rails?](#b-0046)
- [B-0047 — How do you ensure code quality in large applications?](#b-0047)
- [B-0048 — How do you ensure your code stays maintainable as a Rails app grows?](#b-0048)
- [B-0049 — How do you generate JSON responses in Rails?](#b-0049)
- [B-0050 — How do you handle errors in Rails?](#b-0050)
- [B-0051 — How do you handle exceptions and errors in Rails?](#b-0051)
- [B-0052 — How do you handle exceptions in Rails?](#b-0052)
- [B-0053 — How do you handle file downloads in Rails?](#b-0053)
- [B-0054 — How do you handle file uploads in Rails (e.g., using ActiveStorage or CarrierWave)?](#b-0054)
- [B-0055 — How do you handle time zones in Rails?](#b-0055)
- [B-0056 — How do you implement "soft deletes" in Rails?](#b-0056)
- [B-0057 — How do you implement nested resources in Rails?](#b-0057)
- [B-0058 — How do you implement pagination in Rails?](#b-0058)
- [B-0059 — How do you schedule tasks in Rails?](#b-0059)
- [B-0060 — How do you secure a Rails app?](#b-0060)
- [B-0061 — How do you secure API endpoints in a Rails application?](#b-0061)
- [B-0062 — How do you secure sensitive data in a Rails application?](#b-0062)
- [B-0063 — How do you securely handle file uploads in Rails?](#b-0063)
- [B-0064 — How do you start a Rails server?](#b-0064)
- [B-0065 — How do you validate a model’s presence in Rails?](#b-0065)
- [B-0066 — How does Rails compare to Django?](#b-0066)
- [B-0067 — How does Rails implement lazy loading?](#b-0067)
- [B-0068 — How does Ruby on Rails structure an application, and where does Ruby's design help?](#b-0068)
- [B-0069 — How does the Hotwire integration in Rails 7 improve real-time functionality in web applications?](#b-0069)
- [B-0070 — How is Ruby on Rails different from Python?](#b-0070)
- [B-0071 — How is Ruby on Rails similar to Python?](#b-0071)
- [B-0072 — How much does a Ruby on Rails developer make?](#b-0072)
- [B-0073 — HOW Web Works](#b-0073)
- [B-0074 — In Rails routing, what is the key difference between using resources :articles and resource :account?](#b-0074)
- [B-0075 — In Rails, what is the primary purpose of accepts_nested_attributes_for?](#b-0075)
- [B-0076 — In what ways is Ruby on Rails limited?](#b-0076)
- [B-0077 — Inject](#b-0077)
- [B-0078 — Is Ruby on rails good for freelancing?](#b-0078)
- [B-0079 — Is Ruby on Rails in demand?](#b-0079)
- [B-0080 — List some things you would change about Rails](#b-0080)
- [B-0081 — Mention what is the purpose of RJs in Rails?](#b-0081)
- [B-0082 — Outline three components of Rails.](#b-0082)
- [B-0083 — Tell anyone basic factor which is necessary to be followed when it comes to creating the rails application?](#b-0083)
- [B-0084 — What are Action Mailers in Rails?](#b-0084)
- [B-0085 — What are best practices for Rails development?](#b-0085)
- [B-0086 — What are callbacks and filters in Rails?](#b-0086)
- [B-0087 — What are disadvantages of using ORM?](#b-0087)
- [B-0088 — What are Filters?](#b-0088)
- [B-0089 — What are mass-assignment vulnerabilities and how are they prevented?](#b-0089)
- [B-0090 — What are Rails validations, and why are they important?](#b-0090)
- [B-0091 — What are some common anti-patterns you’ve seen in Rails apps?](#b-0091)
- [B-0092 — What are some disadvantages (real and potential)?](#b-0092)
- [B-0093 — What are the advanced features of the Ruby on Rails framework?](#b-0093)
- [B-0094 — What are the advantages of using ORM?](#b-0094)
- [B-0095 — What are the benefits of using Ruby on Rails?](#b-0095)
- [B-0096 — What are the common methods for error handling in Ruby and Rails?](#b-0096)
- [B-0097 — What are the components of Rails?](#b-0097)
- [B-0098 — What are the different ways to handle internationalization (i18n) in a Rails application?](#b-0098)
- [B-0099 — What are the features of Rails?](#b-0099)
- [B-0100 — What are the key differences between Rails 4 and Rails 5?](#b-0100)
- [B-0101 — What are the major improvements introduced in Rails 8?](#b-0101)
- [B-0102 — What are the three components of Ruby on Rails?](#b-0102)
- [B-0103 — What are the two guiding principles of the Rails framework?](#b-0103)
- [B-0104 — What could a developer do to address these disadvantages?](#b-0104)
- [B-0105 — What do you mean by Concerns in Rails?](#b-0105)
- [B-0106 — What do you understand with the ERB in Ruby on Rails?](#b-0106)
- [B-0107 — What does a Ruby on Rails developer do?](#b-0107)
- [B-0108 — What does CRUD mean?](#b-0108)
- [B-0109 — What does CRUD stand for? Give examples of how CRUD actions relate to a 'User' model.](#b-0109)
- [B-0110 — What exactly are the pre-software requirements for developing a project with Ruby on Rails?](#b-0110)
- [B-0111 — What experience is required for a senior Rails developer?](#b-0111)
- [B-0112 — What happen if you try to create a column named id which is not the primary key?](#b-0112)
- [B-0113 — What is a plugin in Ruby on Rails?](#b-0113)
- [B-0114 — What is a rack?](#b-0114)
- [B-0115 — What is a Rails model, and what does it do?](#b-0115)
- [B-0116 — What is a serializer in Rails?](#b-0116)
- [B-0117 — What is Callback in Ruby on Rails?](#b-0117)
- [B-0118 — What is CRUD in the context of Rails?](#b-0118)
- [B-0119 — What is CRUD, and how is it implemented in Rails?](#b-0119)
- [B-0120 — What is PORO?](#b-0120)
- [B-0121 — What is Rails good at?  What is it not so good at?](#b-0121)
- [B-0122 — What is Rails middleware, and how does it work?](#b-0122)
- [B-0123 — What is Rails Scaffolding?](#b-0123)
- [B-0124 — What is Rails? Explain it like I'm five.](#b-0124)
- [B-0125 — What is Rails? Explain it like you're talking to a friend who knows nothing about web development.](#b-0125)
- [B-0126 — What is Rails' "DRY" principle, and how is it implemented?](#b-0126)
- [B-0127 — What is Ruby on Rails, and what are its main features?](#b-0127)
- [B-0128 — What is Ruby on Rails?](#b-0128)
- [B-0129 — What is Sharding, and how can it be implemented in Rails?](#b-0129)
- [B-0130 — What is something you like about working with Rails?](#b-0130)
- [B-0131 — What is the difference between After_save and After_commit?](#b-0131)
- [B-0132 — What is the difference between delete and destroy_all?](#b-0132)
- [B-0133 — What is the difference between deleting and destroying?](#b-0133)
- [B-0134 — What is the difference between dependent: :destroy and :delete?](#b-0134)
- [B-0135 — What is the difference between has_many :through and has_and_belongs_to_many and which one is better?](#b-0135)
- [B-0136 — What is the difference between has_many and belongs_to?](#b-0136)
- [B-0137 — What is the difference between link_to and button_to in Rails?](#b-0137)
- [B-0138 — What is the difference between Ruby and Ruby on Rails?](#b-0138)
- [B-0139 — What is the difference between Ruby on Rails and Sinatra?](#b-0139)
- [B-0140 — What is the difference between save and save!?](#b-0140)
- [B-0141 — What is the difference between the Observers and Callbacks?](#b-0141)
- [B-0142 — What is the enum feature in Rails, and how do you use it?](#b-0142)
- [B-0143 — What is the naming convention in Ruby on Rails?](#b-0143)
- [B-0144 — What is the primary purpose of config.autoload_paths in a Rails application's config/application.rb file?](#b-0144)
- [B-0145 — What is the purpose of a 'flash' message in Rails?](#b-0145)
- [B-0146 — What is the purpose of the 'rails console'?](#b-0146)
- [B-0147 — What is the purpose of the application.rb file?](#b-0147)
- [B-0148 — What is the purpose of the before_action callback in Rails?](#b-0148)
- [B-0149 — What is the purpose of the find_or_create_by method in Rails?](#b-0149)
- [B-0150 — What is the purpose of validates_uniqueness_of in Rails models?](#b-0150)
- [B-0151 — What is the Rails convention over configuration principle?](#b-0151)
- [B-0152 — What is the role of ActiveSupport?](#b-0152)
- [B-0153 — What is the role of an API-only application in Rails, and when would you use it?](#b-0153)
- [B-0154 — What is the significance of the db/seeds.rb file?](#b-0154)
- [B-0155 — What is Turbolinks in Rails?](#b-0155)
- [B-0156 — What is your understanding of the DRY code?](#b-0156)
- [B-0157 — What's the difference between 'rails new' and 'rails generate'?](#b-0157)
- [B-0158 — What’s wrong with the code below and why?](#b-0158)
- [B-0159 — When do you use self.down and self.up in Ruby on Rails?](#b-0159)
- [B-0160 — Which of the following best describes the primary purpose of a Rails Engine?](#b-0160)
- [B-0161 — Which skills do developers need to use Ruby on Rails?](#b-0161)
- [B-0162 — While writing the Rails Application, what are the tasks to which you need to pay attention?](#b-0162)
- [B-0163 — Why is Ruby on Rails popular for startups?](#b-0163)
- [B-0164 — Why is skill-based hiring important for Rails roles?](#b-0164)
- [B-0165 — Why Ruby on Rails](#b-0165)
- [B-0166 — Your application needs to send thousands of confirmation emails after users register. How would you prevent slow response times?](#b-0166)
- [B-0167 — Your Rails application becomes slow after adding a dashboard that displays users, their orders, and payment history. How would you identify and fix the issue?](#b-0167)

## Algorithms and data structures

- [B-0168 — Explain how you would implement a complex search functionality with filtering, sorting, and pagination in a Rails application.](#b-0168)
- [B-0169 — How do you implement a search functionality in Rails (e.g., using Elasticsearch or pg_search)?](#b-0169)

## Authentication, authorization and security

- [B-0170 — Explain how Rails manages sessions and cookies. How can developers use sessions for user authentication?](#b-0170)
- [B-0171 — Explain how you would implement a RESTful API in Rails, including versioning, authentication, and documentation.](#b-0171)
- [B-0172 — Explain what Strong Parameters are.](#b-0172)
- [B-0173 — How can you implement authentication and authorization in a Rails application? What gems or techniques would you consider?](#b-0173)
- [B-0174 — How do you handle API authentication?](#b-0174)
- [B-0175 — How do you handle file uploads and storage in a Rails application, and what are some considerations for security and scalability?](#b-0175)
- [B-0176 — How do you handle security issues such as XSS (Cross-site Scripting) and CSRF (Cross-site Request Forgery) in Rails?](#b-0176)
- [B-0177 — How do you implement OAuth authentication in Rails?](#b-0177)
- [B-0178 — How do you implement security measures in a Ruby on Rails application?](#b-0178)
- [B-0179 — How do you implement simple authentication in Rails?](#b-0179)
- [B-0180 — How do you implement user authentication using Devise in Rails?](#b-0180)
- [B-0181 — How do you secure session management?](#b-0181)
- [B-0182 — How does Rails handle security vulnerabilities?](#b-0182)
- [B-0183 — How does Rails handle security, and what are some best practices for securing a Rails application?](#b-0183)
- [B-0184 — How does Rails handle user authentication and authorization? Provide an overview of commonly used gems or techniques for implementing these functionalities.](#b-0184)
- [B-0185 — How have you implemented authorization in the past?](#b-0185)
- [B-0186 — What are common security attacks, and how Ruby addresses them?](#b-0186)
- [B-0187 — What are Rails sessions and cookies used for?](#b-0187)
- [B-0188 — What are some security best practices for Ruby on Rails applications?](#b-0188)
- [B-0189 — What is a session in Rails, and how is it managed?](#b-0189)
- [B-0190 — What is CSRF and how does Rails protect against it?](#b-0190)
- [B-0191 — What is CSRF, and how does Rails prevent it?](#b-0191)
- [B-0192 — What is STS (Strict Transport Security) in Rails?](#b-0192)
- [B-0193 — What is the has_secure_password method in Rails?](#b-0193)
- [B-0194 — What is the primary purpose of a CSRF token in a Rails application?](#b-0194)
- [B-0195 — What is the primary purpose of strong parameters in Rails?](#b-0195)
- [B-0196 — What is the purpose of using gems like `Pundit` or `CanCanCan` in Rails? How do they help with authorization?](#b-0196)

## Background work and real-time features

- [B-0197 — Explain the concept of Action Cable in Ruby on Rails and how it facilitates real-time features in web applications.](#b-0197)
- [B-0198 — Have you worked with WebSockets in Rails (e.g., ActionCable)?](#b-0198)
- [B-0199 — How do you handle background jobs in Ruby applications?](#b-0199)
- [B-0200 — How do you implement real-time notifications using Rails?](#b-0200)
- [B-0201 — How do you use WebSockets or ActionCable in Rails to build real-time features?](#b-0201)
- [B-0202 — How does Rails' ActiveSupport::Notifications work for monitoring and debugging, and provide an example of subscribing to a notification event?](#b-0202)
- [B-0203 — What are ActionCable and WebSockets in Rails?](#b-0203)
- [B-0204 — What are the benefits of using `ActiveJob` in Rails, and how does it work with different queueing backends?](#b-0204)
- [B-0205 — What is Active Job?](#b-0205)
- [B-0206 — What is Solid Queue in Rails?](#b-0206)
- [B-0207 — What is the ActiveJob framework, and how does it work?](#b-0207)
- [B-0208 — What skills are needed for a Rails developer job?](#b-0208)

## Blocks, callables and iteration

- [B-0209 — Describe your experience with different Rails caching techniques (e.g., fragment caching, Russian doll caching) and when you would use each one.](#b-0209)
- [B-0210 — Explain the Rails initialization process.](#b-0210)
- [B-0211 — Explain the use of yield in Rails layouts.](#b-0211)
- [B-0212 — Explain what blocks are in Ruby on Rails.](#b-0212)
- [B-0213 — How do you handle file uploads in Rails? What gems or techniques would you use for image processing?](#b-0213)
- [B-0214 — Map](#b-0214)
- [B-0215 — What are the benefits of using the importmap-rails gem introduced in Rails 7 for managing JavaScript dependencies?](#b-0215)
- [B-0216 — What does the term “Yield” refer to in the context of Ruby on Rails?](#b-0216)

## Classes, modules and OOP

- [B-0217 — Explain how you would implement a role-based access control (RBAC) system in a Rails application.](#b-0217)
- [B-0218 — Explain the difference between ActiveSupport’s "HashWithIndifferentAccess" and Ruby’s "Hash"?](#b-0218)
- [B-0219 — Explain what is ORM (Object-Relationship-Model) in Rails?](#b-0219)
- [B-0220 — In a Rails application, what is the primary purpose of the flash object?](#b-0220)
- [B-0221 — The following Ruby on Rails code is intended to define a validation for the name attribute in the Product model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.](#b-0221)
- [B-0222 — What are polymorphic routes in Rails?](#b-0222)
- [B-0223 — What is a Rails concern vs. a module?](#b-0223)
- [B-0224 — What is ORM(Object-Relationship-Model).](#b-0224)
- [B-0225 — What is the concern gem in Rails, and how does it differ from standard modules?](#b-0225)
- [B-0226 — What is the difference between class methods and instance methods?](#b-0226)
- [B-0227 — What is the Object Relationship Model (ORM) in Rails?](#b-0227)
- [B-0228 — What is the params object in Rails?](#b-0228)
- [B-0229 — What is the purpose of the ApplicationRecord class in Rails?](#b-0229)
- [B-0230 — What is the Rails.cache object, and how do you use it for caching data?](#b-0230)
- [B-0231 — Where one should look for the controller classes for handling the web request in Ruby?](#b-0231)

## Data, querying and integrity

- [B-0232 — Explain how you can run Rails application without creating databases?](#b-0232)
- [B-0233 — Explain Ruby’s ActiveRecord and how it is used in Rails applications.](#b-0233)
- [B-0234 — Explain the purpose of Active Record in Ruby on Rails and how it simplifies database interactions.](#b-0234)
- [B-0235 — Explain what ActiveRecord is in Ruby on Rails and how it simplifies database interactions.](#b-0235)
- [B-0236 — How Convention over Configuration works in Active Record?](#b-0236)
- [B-0237 — How do you integrate multiple databases in a Rails application?](#b-0237)
- [B-0238 — How does Rails handle database migrations, and why is it important for the development process?](#b-0238)
- [B-0239 — How does Rails manage database state?](#b-0239)
- [B-0240 — How does the has_many :through association work?](#b-0240)
- [B-0241 — How many types of Association relationships does a Model have?](#b-0241)
- [B-0242 — How to override primary key in Active Record?](#b-0242)
- [B-0243 — How to override table name in Active Record?](#b-0243)
- [B-0244 — How to run and rollback Active Record migration?](#b-0244)
- [B-0245 — How would you handle a large number of database records in Rails (e.g., pagination, batch processing)?](#b-0245)
- [B-0246 — List out what can Rails Migration do.](#b-0246)
- [B-0247 — Mention what is the command to create a migration?](#b-0247)
- [B-0248 — The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code.](#b-0248)
- [B-0249 — The following Ruby on Rails code is intended to create a new article record and save it to the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.](#b-0249)
- [B-0250 — The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error …](#b-0250)
- [B-0251 — The following Ruby on Rails code is intended to define a simple controller action to retrieve and display a list of products from the database. However, it contains a syntax error and doesn’t work as expected. Identif…](#b-0251)
- [B-0252 — The following Ruby on Rails code is intended to delete an article record from the database when the user clicks the “Delete” link. However, it contains a logical error and doesn’t delete the article. Identify the erro…](#b-0252)
- [B-0253 — The following Ruby on Rails code is intended to display a list of articles and their corresponding authors on the index page. However, it contains a logical error and doesn’t display the authors correctly. Identify th…](#b-0253)
- [B-0254 — The following Ruby on Rails code is intended to fetch a list of articles from the database and display their titles. However, it contains a logical error and doesn’t display any articles. Identify the error and fix th…](#b-0254)
- [B-0255 — The following Ruby on Rails code is intended to update an existing article’s title and content in the database. However, it contains a logical error and doesn’t update the article as expected. Identify the error and f…](#b-0255)
- [B-0256 — What are migrations, and how do you roll back a migration in Rails?](#b-0256)
- [B-0257 — What are the common data types in Rails migrations?](#b-0257)
- [B-0258 — What are the differences between create! and create in ActiveRecord?](#b-0258)
- [B-0259 — What are the optional reserved column names you can use in Active Record?](#b-0259)
- [B-0260 — What do you mean by Polymorphic Association in Rails?](#b-0260)
- [B-0261 — What do you mean by the term Rail Migration?](#b-0261)
- [B-0262 — What do you understand about Rails Active Record in ROR?](#b-0262)
- [B-0263 — What does it mean that Active Record migrations are database-agnostic?](#b-0263)
- [B-0264 — What exactly do you know about the Active Records Rail?](#b-0264)
- [B-0265 — What is a migration rollback? How do you use it?](#b-0265)
- [B-0266 — What is a polymorphic has_many association, and how does it differ from a regular has_many?](#b-0266)
- [B-0267 — What is ActiveRecord::Enum in Rails?](#b-0267)
- [B-0268 — What is an Active Record in Rails?](#b-0268)
- [B-0269 — What is Rails Migration?](#b-0269)
- [B-0270 — What is the difference between Active Record and Active Model?](#b-0270)
- [B-0271 — What is the difference between Active Record and ORM?](#b-0271)
- [B-0272 — What is the difference between save and create in ActiveRecord?](#b-0272)
- [B-0273 — What is the purpose of the config/database.yml file?](#b-0273)
- [B-0274 — What is the Rails router's scope?](#b-0274)
- [B-0275 — Where Rails keeps track of which migrations have been committed?](#b-0275)
- [B-0276 — Which of the following Rails migration commands is the most efficient and conventional way to add an index to an existing column named email on a table named users?](#b-0276)
- [B-0277 — Why it’s not recommended to use non-primary key columns in Active Record?](#b-0277)

## Dependencies, deployment and operations

- [B-0278 — Describe how you would implement API versioning in a Rails application.](#b-0278)
- [B-0279 — Describe your experience with different Rails code analysis tools (e.g., RuboCop, Brakeman) and how they help improve code quality.](#b-0279)
- [B-0280 — Explain the differences between gems and plugins in Ruby on Rails.](#b-0280)
- [B-0281 — Explain what is Gems and Gemset in Ruby on Rails.](#b-0281)
- [B-0282 — Explain what is rake in Rails?](#b-0282)
- [B-0283 — How do you check the current version of Rails?](#b-0283)
- [B-0284 — How do you install gems in a Rails project?](#b-0284)
- [B-0285 — How would you migrate a Rails application from an old version (e.g., Rails 4 to Rails 6)?](#b-0285)
- [B-0286 — Name the three default environments in Rails.](#b-0286)
- [B-0287 — What are Gems and how do you use them in a Rails project?](#b-0287)
- [B-0288 — What are some of your favorite gems? What are their alternatives?](#b-0288)
- [B-0289 — What are the different ways to manage configuration settings across environments in Rails?](#b-0289)
- [B-0290 — What gems do you consider essential in most Rails projects?](#b-0290)
- [B-0291 — What is a 'rake' task in Rails, and give an example?](#b-0291)
- [B-0292 — What is a 'rake' task? Can you describe a common rake task?](#b-0292)
- [B-0293 — What is a Rails gem?](#b-0293)
- [B-0294 — What is Gemfile in Ruby on Rails?](#b-0294)
- [B-0295 — What is Gemfile.lock?](#b-0295)
- [B-0296 — What is Rake?](#b-0296)
- [B-0297 — What is the difference between a plugin and a gem?](#b-0297)
- [B-0298 — What is the purpose of environment.rb in Rails?](#b-0298)
- [B-0299 — What is the role of the strong_parameters gem in Rails?](#b-0299)

## HTTP, MVC and presentation

- [B-0300 — Can you describe a real-world scenario where you used MVC, and what challenges did you encounter?](#b-0300)
- [B-0301 — Create a Rails controller action to find a User by their email address and render their profile. If the user is not found, render a 404 error.](#b-0301)
- [B-0302 — Describe the difference between 'GET' and 'POST' HTTP methods.](#b-0302)
- [B-0303 — Discuss the use of partials and layouts in Rails views.](#b-0303)
- [B-0304 — Explain how you can list all routes for an application?](#b-0304)
- [B-0305 — Explain the concept of RESTful routes in Rails.](#b-0305)
- [B-0306 — Explain the purpose of a Rails controller.](#b-0306)
- [B-0307 — Explain the Rails asset pipeline, and what are the advantages of using Webpacker over the asset pipeline?](#b-0307)
- [B-0308 — Explain the Rails controller action lifecycle.](#b-0308)
- [B-0309 — Explain the role of the sub-directory app/controller and app/helper.](#b-0309)
- [B-0310 — Explain the use of respond_to in controllers.](#b-0310)
- [B-0311 — How can you create a controller in Rails?](#b-0311)
- [B-0312 — How can you perform CRUD (Create, Read, Update, Delete) operations in Rails?](#b-0312)
- [B-0313 — How do I prepare for a Rails interview?](#b-0313)
- [B-0314 — How do you create a new controller in Rails using the command line?](#b-0314)
- [B-0315 — How do you define a route in config/routes.rb for a controller action?](#b-0315)
- [B-0316 — How do you handle form submissions in Rails?](#b-0316)
- [B-0317 — How do you handle form submissions with nested attributes in Rails?](#b-0317)
- [B-0318 — How do you handle parameters in a controller action?](#b-0318)
- [B-0319 — How do you handle server-side rendering (SSR) in Rails?](#b-0319)
- [B-0320 — How do you implement nested forms in Rails?](#b-0320)
- [B-0321 — How do you implement RESTful APIs in Rails?](#b-0321)
- [B-0322 — How do you pass data from a controller to a view?](#b-0322)
- [B-0323 — How do you perform eager loading in Rails?](#b-0323)
- [B-0324 — How do you use nested layouts?](#b-0324)
- [B-0325 — How does Rails handle request-response cycles?](#b-0325)
- [B-0326 — How does Rails handle routing and request flow?](#b-0326)
- [B-0327 — Import GraphQL data, model it in Rails, and expose RESTful CRUD endpoints](#b-0327)
- [B-0328 — In a Rails application, what is the primary purpose of a layout?](#b-0328)
- [B-0329 — In a Rails controller, what is the key difference between using redirect_to and render?](#b-0329)
- [B-0330 — In a Rails controller, what is the primary purpose of a before_action filter?](#b-0330)
- [B-0331 — In a Rails controller, what is the primary purpose of the render method?](#b-0331)
- [B-0332 — In Rails, what is the primary purpose of using render partial?](#b-0332)
- [B-0333 — In Ruby on Rails, what is the fundamental difference between using a _path helper and a _url helper when generating URLs?](#b-0333)
- [B-0334 — In Ruby on Rails, what is the primary purpose of the content_tag helper method?](#b-0334)
- [B-0335 — In Ruby on Rails, what is the primary purpose of the form_with helper?](#b-0335)
- [B-0336 — In Ruby on Rails, what is the primary purpose of the url_for helper method?](#b-0336)
- [B-0337 — What are Helpers and How do use Helpers in Ruby on Rails?](#b-0337)
- [B-0338 — What are Models, Views, and Controllers in Rails?](#b-0338)
- [B-0339 — What are the key differences between GET, POST, PUT, and DELETE HTTP methods?](#b-0339)
- [B-0340 — What are the main parts of a Rails view?](#b-0340)
- [B-0341 — What are the most common Ruby on Rails interview questions?](#b-0341)
- [B-0342 — What are the most important Ruby on Rails interview questions?](#b-0342)
- [B-0343 — What command can you use to create a controller for the subject?](#b-0343)
- [B-0344 — What do you mean by Render and Redirect_to?](#b-0344)
- [B-0345 — What does “fat models, skinny controllers” mean?](#b-0345)
- [B-0346 — What does “skinny controllers, skinny models” mean?](#b-0346)
- [B-0347 — What is a 'form' in HTML, and how does it relate to a Rails application?](#b-0347)
- [B-0348 — What is a partial in Rails views? Why would you use one?](#b-0348)
- [B-0349 — What is a Rails form, and how do you create one?](#b-0349)
- [B-0350 — What is a Rails view, and how does it relate to the controller?](#b-0350)
- [B-0351 — What is an Asset Pipeline in Rails?](#b-0351)
- [B-0352 — What is Nested Layout in Ruby on Rails?](#b-0352)
- [B-0353 — What is request.xhr?](#b-0353)
- [B-0354 — What is REST in Rails?](#b-0354)
- [B-0355 — What is restful in rails](#b-0355)
- [B-0356 — What is the difference between form_for and form_with?](#b-0356)
- [B-0357 — What is the error in this Rails route configuration?](#b-0357)
- [B-0358 — What is the primary purpose of the content_for helper in Rails?](#b-0358)
- [B-0359 — What is the problem with the following controller code? How would you fix it?](#b-0359)
- [B-0360 — What is the purpose of Rails layouts?](#b-0360)
- [B-0361 — What is the purpose of the assets folder in Rails?](#b-0361)
- [B-0362 — What is the Rails request lifecycle?](#b-0362)
- [B-0363 — What is the role of the 'routes.rb' file in a Rails application?](#b-0363)
- [B-0364 — Which of the following statements best describes the primary function of the Rails asset pipeline?](#b-0364)

## Object model and metaprogramming

- [B-0365 — How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...)](#b-0365)
- [B-0366 — What is the difference between before_validation and before_save callbacks?](#b-0366)

## Performance, memory and concurrency

- [B-0367 — Explain how you would implement a search functionality in a Rails application. What are some performance considerations?](#b-0367)
- [B-0368 — Explain the role of background jobs and queues in enhancing Ruby application performance.](#b-0368)
- [B-0369 — How do you cache partials and pages in Rails?](#b-0369)
- [B-0370 — How do you handle performance monitoring and alerting in a Rails application, and what tools do you use for this purpose?](#b-0370)
- [B-0371 — How do you optimize asset loading in Rails?](#b-0371)

## Testing, debugging and observability

- [B-0372 — Describe your experience with different Rails testing frameworks (e.g., RSpec, Minitest) and your preferred testing strategies.](#b-0372)
- [B-0373 — Explain how Rails handles logging.](#b-0373)
- [B-0374 — Explain what functional testing is:](#b-0374)
- [B-0375 — How do you mock external APIs in tests?](#b-0375)
- [B-0376 — How do you test a Rails application with integration tests, and what tools would you use?](#b-0376)
- [B-0377 — How do you test models in Rails?](#b-0377)
- [B-0378 — How do you write tests in Ruby with RSpec or Minitest?](#b-0378)
- [B-0379 — How does Rails support testing, and what testing frameworks are commonly used?](#b-0379)
- [B-0380 — Mention the log that has to be seen to report errors in Ruby Rails?](#b-0380)
- [B-0381 — What are fixtures in Ruby on Rails?](#b-0381)
- [B-0382 — What are some best practices for writing Rails tests?](#b-0382)
- [B-0383 — What are the differences between unit, functional, and integration tests in Rails?](#b-0383)
- [B-0384 — What is testing in the context of Ruby on Rails? Why is it important?](#b-0384)
- [B-0385 — What is the logic behind the helper?](#b-0385)
- [B-0386 — What is the RSpec framework and how do you use it for testing?](#b-0386)
- [B-0387 — What testing libraries have you used with Rails (e.g., RSpec, Capybara, FactoryBot)?](#b-0387)
- [B-0388 — What’s your favorite testing tool? Rspec, FactoryGirl, Capybara, and Cucumber.](#b-0388)
- [B-0389 — What’s your strategy for writing maintainable tests?](#b-0389)

## Values, collections and language basics

- [B-0390 — Explain the differences between nil and false in Ruby on Rails.](#b-0390)
- [B-0391 — Explain what a string is in Ruby on Rails.](#b-0391)
- [B-0392 — Explain what a symbol is in Ruby on Rails.](#b-0392)
- [B-0393 — What are some common data types you might use in a Rails model (e.g., string, integer)?](#b-0393)
- [B-0394 — What is the difference between nil?, empty?, and blank? in Ruby/Rails?](#b-0394)
- [B-0395 — What is the difference between string and text in Rails?](#b-0395)
- [B-0396 — What values are "falsey" in Rails?  Or, which values are "truthy"?  What is the result of `a = 0 || 1`?](#b-0396)
- [B-0397 — Which of the following validators in a Rails model ensures that a specified attribute is not empty, meaning it is neither nil nor a blank string?](#b-0397)

---

<a id="b-0001"></a>

### B-0001 — Can you describe a project where you implemented Ruby on Rails to solve a business problem?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Can you describe a project where you implemented Ruby on Rails to solve a business problem?

**Direct answer**

Describe an actual project using situation, responsibility, action and verified result; do not present the source’s invented 40% improvement as your personal experience.

**Detailed explanation**

Pick a real Rails feature, explain the constraints, models/data flow, authorization, failure handling and tests, and state only metrics you measured. If no numeric measurement exists, describe observable changes and how you would measure them.

**Practical example**

```text
Template: “Our onboarding flow required __. I owned __. I implemented __ using __, tested __, and verified __ through __. The main trade-off was __.”
```

**Important points and follow-ups**

- An interview answer should accurately represent your work and responsibility.

**Corrections and source limitations**

- Labelled the source’s project story and 40% figure as illustrative, not established personal evidence.

**Source references**

- SRC-00423 — [ten.txt:333–335](../ruby/ten.txt) (52) · [complete source](sources/ten.md)


---

<a id="b-0002"></a>

### B-0002 — Consider the following:

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Consider the following:

**Direct answer**

& converts the supplied object through to_proc; Symbol#to_proc creates a callable that sends that symbol-named method to its first argument.

**Detailed explanation**

For reduce(&:*) the accumulator is the receiver and the next element is the multiplication argument. A two-positional-argument lambda is not a general Symbol#to_proc replacement. The correct method forwarding shape needs a receiver plus arbitrary positional arguments, keywords and a block; exact arity/introspection/visibility details also matter. Do not globally monkey-patch Symbol just to solve the exercise.

**Practical example**

```ruby
def symbol_callable(name)
  proc { |receiver, *args, **kwargs, &block| receiver.public_send(name, *args, **kwargs, &block) }
end
(1..5).reduce(&symbol_callable(:*)) # 120
%w[ruby rails].map(&symbol_callable(:upcase)) # ["RUBY", "RAILS"]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source inference: calling (1..42).each(&:*) is invalid even with the genuine Symbol#to_proc because Integer#* still requires an argument; it is not a valid positive test of a repaired converter.

**Source references**

- SRC-00637 — [eighteen.txt:200–240](../ruby/eighteen.txt) (7) · [complete source](sources/eighteen.md)


---

<a id="b-0003"></a>

### B-0003 — Describe a challenging bug you resolved in Rails.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe a challenging bug you resolved in Rails.

**Direct answer**

Describe a real bug using the symptom, evidence, root cause, fix, verification and prevention; do not invent an experience.

**Detailed explanation**

A useful answer explains what you measured and why the final change addressed the cause. If practicing without a real example, label the scenario as hypothetical. Include a regression test or operational alert that would catch recurrence.

**Practical example**

```text
Hypothetical practice: a page emits 101 SQL queries for 100 posts; logs show repeated author lookups; preload authors and verify both correctness and the reduced query count.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01219 — [twentyfive.txt:108–110](../ruby/twentyfive.txt) (21) · [complete source](sources/twentyfive.md)


---

<a id="b-0004"></a>

### B-0004 — Describe how to implement a Rails callback for setting a default value before creating a record.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe how to implement a Rails callback for setting a default value before creating a record.

**Direct answer**

Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.

**Detailed explanation**

Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.

**Practical example**

```ruby
before_validation :normalize_name
private
def normalize_name
  self.name = name.to_s.strip
end
# External side effect after persistence:
# after_commit :enqueue_notification, on: :create
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Source references**

- SRC-00845 — [thirtyfive.txt:240–253](../ruby/thirtyfive.txt) (05) · [complete source](sources/thirtyfive.md)


---

<a id="b-0005"></a>

### B-0005 — Describe how you would implement a custom validator in Rails. Provide an example.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

Describe how you would implement a custom validator in Rails. Provide an example.

**Direct answer**

A custom validator adds validation errors according to a domain rule, using a model method, ActiveModel::EachValidator or ActiveModel::Validator.

**Detailed explanation**

Choose EachValidator for an attribute-oriented rule and Validator for a rule involving the record. Treat missing values explicitly. Rails applications should use Date.current for the configured application time zone rather than assuming the system date is correct.

**Practical example**

```ruby
class FutureDateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if value.nil? || value <= Date.current
      record.errors.add(attribute, "must be in the future")
    end
  end
end
# validates :expires_on, future_date: true
```

**Important points and follow-ups**

- This example checks the domain policy; combine it with appropriate address validation and verification.
- Combine a presence validator or explicit nil behavior with the business rule.
- Reference: https://guides.rubyonrails.org/active_record_validations.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00917 — [thirtyfour.txt:87–87](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01214 — [twentyfive.txt:71–87](../ruby/twentyfive.txt) (16) · [complete source](sources/twentyfive.md)
- SRC-01260 — [twentyfive.txt:382–400](../ruby/twentyfive.txt) (62) · [complete source](sources/twentyfive.md)
- SRC-01499 — [twentyseven.txt:450–466](../ruby/twentyseven.txt) (Open-56) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00917 (thirtyfour.txt)</summary>

**Original prompt:** How do you implement a custom validation in Rails?

**Answer:** Register a model method with validate, or implement a reusable validator, and add errors when a rule fails.

Custom validators should be deterministic and focus on the model’s valid state. Handle nil and blank inputs deliberately. An email substring check is not a reliable domain check: alice@example.com.evil.test contains example.com but is a different domain.

```ruby
class User < ApplicationRecord
  validate :company_email
  private
  def company_email
    domain = email.to_s.split("@", 2).last
    errors.add(:email, "must use example.com") unless domain == "example.com"
  end
end
```

</details>


---

<a id="b-0006"></a>

### B-0006 — Describe the use of `ActiveModel::Serializers` in Rails. When should you use it?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe the use of `ActiveModel::Serializers` in Rails. When should you use it?

**Direct answer**

Serialization converts objects to an API representation; ActiveModel::Serializers is a separate gem, while Rails also exposes built-in serialization methods.

**Detailed explanation**

Specify an explicit response contract to avoid exposing secrets or internal fields. Choose built-in as_json/serializable_hash, a view builder, or a serializer library according to complexity. Authorization, association loading and version compatibility remain application responsibilities.

**Practical example**

```text
render json: user.as_json(only: [:id, :name])
```

**Important points and follow-ups**

- Do not assume the ActiveModel::Serializers gem ships as a required Rails component.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01519 — [twentyseven.txt:631–641](../ruby/twentyseven.txt) (Open-76) · [complete source](sources/twentyseven.md)


---

<a id="b-0007"></a>

### B-0007 — Describe what destructive methods are.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Describe what destructive methods are.

**Direct answer**

A destructive method mutates its receiver; Ruby often uses a ! suffix when a more surprising or dangerous variant exists.

**Detailed explanation**

The suffix is a convention, not a universal guarantee of mutation or a requirement that every mutating method end in !. For example Array#push mutates without a bang. Some bang methods return nil when no change occurred.

**Practical example**

```ruby
name = "ruby"
name.upcase # "RUBY", name unchanged
name.upcase! # mutates name
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00767 — [thirtyeight.txt:128–129](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0008"></a>

### B-0008 — Discuss the Rails delegate method.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Discuss the Rails delegate method.

**Direct answer**

delegate forwards selected methods to a named object, reducing repetitive forwarding code.

**Detailed explanation**

This exposes a smaller interface without inheritance. Choose prefix: when forwarding could clash with local methods, and allow_nil: only if missing targets should return nil. Delegation does not automatically remove all domain or framework coupling.

**Practical example**

```ruby
class User < ApplicationRecord
  has_one :profile
  delegate :full_name, to: :profile, prefix: true, allow_nil: true
end
user.profile_full_name
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00848 — [thirtyfive.txt:267–281](../ruby/thirtyfive.txt) (08) · [complete source](sources/thirtyfive.md)


---

<a id="b-0009"></a>

### B-0009 — Do you know about Activestorage in Ruby on Rails and How can you use this?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Do you know about Activestorage in Ruby on Rails and How can you use this?

**Direct answer**

Active Storage attaches files to Active Record models and delegates storage to a configured service, such as local disk or S3.

**Detailed explanation**

Install its tables, configure the storage service, declare has_one_attached or has_many_attached, and authorize upload/download operations. Image variants use an image processor such as libvips. Validate size and actual content, and use safe serving/scanning policies. Rails 8.1 removed the built-in Azure service; older lists of supported services need version context.

**Practical example**

```bash
bin/rails active_storage:install
bin/rails db:migrate
# In User: has_one_attached :avatar
user.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png")
user.avatar.variant(resize_to_limit: [100, 100])
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_storage_overview.html
- Signed blob URLs are not a complete application authorization policy.
- Direct uploads still require server-side validation and cleanup of unattached blobs.
- Reference: https://guides.rubyonrails.org/v8.1/active_storage_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Qualified Azure storage support: the built-in service was removed in Rails 8.1.

**Source references**

- SRC-00843 — [thirtyfive.txt:220–231](../ruby/thirtyfive.txt) (03) · [complete source](sources/thirtyfive.md)
- SRC-01430 — [twentythree.txt:326–336](../ruby/twentythree.txt) (Q38) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00843 (thirtyfive.txt)</summary>

**Original prompt:** Explain the purpose and use of Rails' Active Storage service.

**Answer:** Active Storage attaches files to models and supports local or cloud-backed storage, direct uploads, metadata and image variants.

Authorize uploads/downloads, impose size and content-type policies, and do not rely only on a supplied filename or browser MIME type. Isolate uploaded content and process expensive image/video work asynchronously. Direct uploads reduce web-server bandwidth but still require access controls, lifecycle cleanup and malware/content checks appropriate to the application.

```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
user.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png", content_type: "image/png")
```

</details>


---

<a id="b-0010"></a>

### B-0010 — Explain eager loading and lazy loading in Rails.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain eager loading and lazy loading in Rails.

**Direct answer**

joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.

**Detailed explanation**

N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.

**Practical example**

```ruby
posts = Post.includes(:author).limit(20)
posts.each { |post| puts post.author.name }
# Filtering via a join without loading all comments:
Post.joins(:comments).where(comments: { approved: true }).distinct
```

**Important points and follow-ups**

- includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- includes can use separate queries or a join, and joins alone does not preload an association.

**Source references**

- SRC-01209 — [twentyfive.txt:50–55](../ruby/twentyfive.txt) (11) · [complete source](sources/twentyfive.md)


---

<a id="b-0011"></a>

### B-0011 — Explain how rail implements Ajax?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain how rail implements Ajax?

**Direct answer**

Rails can respond to asynchronous browser requests using HTML fragments, JSON or Turbo Stream representations; the client decides how to update the page.

**Detailed explanation**

Modern applications often use fetch or Turbo rather than old automatically generated Prototype/RJS JavaScript. Explicitly define the response contract, retain authorization and CSRF defenses for browser-authenticated mutations, and handle request errors on the client.

**Practical example**

```text
fetch("/posts/1.json", { headers: { Accept: "application/json" } })
  .then(response => response.json())
  .then(post => console.log(post.title))
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01356 — [twentytwo.txt:223–229](../ruby/twentytwo.txt) (11) · [complete source](sources/twentytwo.md)


---

<a id="b-0012"></a>

### B-0012 — Explain how you would implement caching in a Rails application. What different caching strategies are available?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 6

**Interview question**

Explain how you would implement caching in a Rails application. What different caching strategies are available?

**Direct answer**

Choose cache boundaries from measured expensive work, and define invalidation, key scope, expiry and failure behavior before adding a cache.

**Detailed explanation**

Fragment caching stores portions of rendered views; Russian doll caching nests fragments. Parent cache versions must change when relevant children change, often through touch: true. Low-level caching stores application data; HTTP caching uses validators or response headers. Page/action caching are historical extracted features, not simply built-in equivalents of all current caching.

**Practical example**

```erb
<% cache [current_user.role, @product] do %>
  <%= render @product %>
<% end %>
# class Comment < ApplicationRecord
#   belongs_to :article, touch: true
# end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/caching_with_rails.html
- Include tenant/permission dimensions when results differ between users.
- Avoid caching live Active Record instances; cache stable values or IDs where practical.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Page/action caching are historical/extracted features; current Rails supports fragment/low-level/HTTP caching, with extra gems required for legacy page/action APIs.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00654 — [fifteen.txt:96–96](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00902 — [thirtyfour.txt:72–72](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01144 — [twenty.txt:415–421](../ruby/twenty.txt) (47) · [complete source](sources/twenty.md)
- SRC-01218 — [twentyfive.txt:101–107](../ruby/twentyfive.txt) (20) · [complete source](sources/twentyfive.md)
- SRC-01265 — [twentyfive.txt:440–458](../ruby/twentyfive.txt) (67) · [complete source](sources/twentyfive.md)
- SRC-01509 — [twentyseven.txt:536–540](../ruby/twentyseven.txt) (Open-66) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00654 (fifteen.txt)</summary>

**Original prompt:** What techniques do you use for caching in Rails?

**Answer:** Caching stores reusable results to avoid repeating database, rendering or computation work; choose keys, expiry and invalidation based on the data’s lifetime.

Use fragment/collection caching for views, low-level Rails.cache.fetch for computed values, and HTTP conditional caching where suitable. Include relevant tenant/user permissions in keys when content differs by audience. Russian-doll caching nests fragment caches with dependencies. Page/action caching are historical features extracted from Rails core; they are not universal modern defaults.

```ruby
Rails.cache.fetch(["product", product.id, product.updated_at], expires_in: 10.minutes) do
  expensive_summary(product)
end
# View:
<% cache @product do %><%= render @product %><% end %>
```

</details>


---

<a id="b-0013"></a>

### B-0013 — Explain Microservices and how Rails can be part of it.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain Microservices and how Rails can be part of it.

**Direct answer**

A microservice is an independently deployable service responsible for a coherent business capability; Rails can implement its API and domain behavior.

**Detailed explanation**

A modular monolith may be simpler for many teams. Splitting services adds network failures, versioned contracts, tracing, data ownership and distributed consistency concerns. Choose boundaries from ownership and change/scale needs, not from the desire to label an architecture modern.

**Practical example**

```text
Example: a billing Rails service owns invoices and exposes a versioned HTTP API; it consumes an order-created event idempotently rather than sharing arbitrary database tables with every service.
```

**Important points and follow-ups**

- Remote calls need timeouts, bounded retries and clear ownership of side effects.

**Source references**

- SRC-00394 — [ten.txt:131–133](../ruby/ten.txt) (23) · [complete source](sources/ten.md)


---

<a id="b-0014"></a>

### B-0014 — Explain ORM in Ruby on Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

Explain ORM in Ruby on Rails?

**Direct answer**

Active Record is Rails’ Object-Relational Mapping layer: model classes usually represent tables, instances represent rows, and attributes represent columns.

**Detailed explanation**

It supplies query relations, persistence, type casting, associations, validations, callbacks, and migrations. It does not remove the need to understand SQL, indexes, transaction boundaries, or database constraints. Model objects can also be non-persistent Active Model objects, so not every Rails model must map to a table.

**Practical example**

```ruby
class User < ApplicationRecord
  validates :email, presence: true
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html
- ORM means Object-Relational Mapping, not Object Relationship Model.
- Application validations alone cannot enforce uniqueness under concurrency.

**Corrections and source limitations**

- ORM is Object-Relational Mapping; class/table and object/row conventions do not mean classes themselves are rows.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The original expands ORM incorrectly; it means Object-Relational Mapping.

**Source references**

- SRC-00723 — [thirty.txt:155–157](../ruby/thirty.txt) (39) · [complete source](sources/thirty.md)
- SRC-01023 — [thirtyseven.txt:12–16](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01080 — [thirtytwo.txt:82–84](../ruby/thirtytwo.txt) (13) · [complete source](sources/thirtytwo.md)
- SRC-01195 — [twentyeight.txt:378–380](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01395 — [twentythree.txt:29–31](../ruby/twentythree.txt) (Q3) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00723 (thirty.txt)</summary>

**Original prompt:** What is the object relationship model in Ruby on Rails?

**Answer:** ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

</details>


---

<a id="b-0015"></a>

### B-0015 — Explain the concept of eager loading in Rails. Why is it important and how does it work?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the concept of eager loading in Rails. Why is it important and how does it work?

**Direct answer**

Eager loading retrieves associations in a bounded set of queries before iteration to prevent N+1 database round trips.

**Detailed explanation**

preload fetches associations separately; eager_load uses a LEFT OUTER JOIN; includes chooses an approach based on relation conditions and references. Joining alone does not necessarily populate association caches. Loading too much data can increase memory, so select a strategy based on the access pattern.

**Practical example**

```ruby
authors = Author.preload(:books).limit(20)
authors.each { |author| puts author.books.size }
```

**Important points and follow-ups**

- “Eager loading always means one query” is incorrect.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01522 — [twentyseven.txt:655–660](../ruby/twentyseven.txt) (Open-79) · [complete source](sources/twentyseven.md)


---

<a id="b-0016"></a>

### B-0016 — Explain the concept of eager loading in Ruby on Rails and why it is beneficial.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the concept of eager loading in Ruby on Rails and why it is beneficial.

**Direct answer**

joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.

**Detailed explanation**

N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.

**Practical example**

```ruby
posts = Post.includes(:author).limit(20)
posts.each { |post| puts post.author.name }
# Filtering via a join without loading all comments:
Post.joins(:comments).where(comments: { approved: true }).distinct
```

**Important points and follow-ups**

- includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- includes can use separate queries or a join, and joins alone does not preload an association.

**Source references**

- SRC-01011 — [thirtyone.txt:503–532](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0017"></a>

### B-0017 — Explain the Decorator Pattern in Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the Decorator Pattern in Rails.

**Direct answer**

A decorator wraps an object to add a focused layer of behavior while delegating the underlying interface.

**Detailed explanation**

In Rails, decorators are often used for presentation formatting that does not belong in persistence rules. This can be implemented with plain composition or a library; Rails does not mandate a universal decorator base class.

**Practical example**

```ruby
require "delegate"
class UserPresenter < SimpleDelegator
  def display_name = name.to_s.strip
end
```

**Important points and follow-ups**

- Do not hide important business mutations in a presentation wrapper.

**Source references**

- SRC-00391 — [ten.txt:116–121](../ruby/ten.txt) (20) · [complete source](sources/ten.md)


---

<a id="b-0018"></a>

### B-0018 — Explain the difference between before_action, around_action, and after_action.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the difference between before_action, around_action, and after_action.

**Direct answer**

Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.

**Detailed explanation**

Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.

**Practical example**

```ruby
before_validation :normalize_name
private
def normalize_name
  self.name = name.to_s.strip
end
# External side effect after persistence:
# after_commit :enqueue_notification, on: :create
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Source references**

- SRC-01316 — [twentysix.txt:19–21](../ruby/twentysix.txt) (3) · [complete source](sources/twentysix.md)


---

<a id="b-0019"></a>

### B-0019 — Explain the difference between dynamic and static scaffolding.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain the difference between dynamic and static scaffolding.

**Direct answer**

Scaffolding generates starter model, migration, controller, view and test code for a resource’s CRUD behavior.

**Detailed explanation**

Modern Rails generates files that you review and customize. Historical dynamic scaffolding generated behavior at runtime and is not a current standard feature. Add authorization, valid input rules, suitable constraints and intentional UI behavior before relying on generated code in production.

**Practical example**

```bash
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01367 — [twentytwo.txt:276–280](../ruby/twentytwo.txt) (4) · [complete source](sources/twentytwo.md)


---

<a id="b-0020"></a>

### B-0020 — Explain the importance of before_save and after_save callbacks in Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain the importance of before_save and after_save callbacks in Rails.

**Direct answer**

Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.

**Detailed explanation**

Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.

**Practical example**

```ruby
before_validation :normalize_name
private
def normalize_name
  self.name = name.to_s.strip
end
# External side effect after persistence:
# after_commit :enqueue_notification, on: :create
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00914 — [thirtyfour.txt:84–84](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01035 — [thirtyseven.txt:95–101](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0021"></a>

### B-0021 — Explain types of Callbacks in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain types of Callbacks in Ruby on Rails.

**Direct answer**

Active Record callbacks hook into validation, saving, creation, updating, destruction and loading; transaction callbacks run after commit or rollback.

**Detailed explanation**

Create and update save flows validate, run before/around save callbacks, then operation-specific callbacks, followed by after_save. Destroy has its own callback chain. around callbacks wrap their operation and must yield. after_find and after_initialize cover loading/instantiation. Bulk APIs can bypass callback chains.

**Practical example**

```ruby
class Post < ApplicationRecord
  before_validation :normalize_title
  after_create_commit :announce
  private
  def normalize_title = self.title = title.to_s.strip
  def announce = AnnouncementJob.perform_later(id)
end
```

**Important points and follow-ups**

- Use throw :abort to halt a before callback intentionally.
- Avoid hiding large multi-step workflows in callbacks.
- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01427 — [twentythree.txt:274–304](../ruby/twentythree.txt) (Q35) · [complete source](sources/twentythree.md)


---

<a id="b-0022"></a>

### B-0022 — Explain what count does in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain what count does in Ruby on Rails.

**Direct answer**

For an Active Record collection, count usually runs SQL, length loads records and counts them in memory, and size uses loaded state or an available counter cache before querying.

**Detailed explanation**

These methods behave differently from Array#size and Array#length, which are aliases. count with a block must enumerate. Collection size may include unsaved association members and may use a configured counter cache. Choose based on whether the records will be used and whether you need an explicit database count.

**Practical example**

```ruby
posts = user.posts
posts.count   # typically SELECT COUNT(*)
posts.length  # loads records
posts.size    # uses loaded records now
```

**Important points and follow-ups**

- The source claim that Active Record size is always an alias for length is wrong.
- Reference: https://api.rubyonrails.org/classes/ActiveRecord/Associations/CollectionProxy.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00778 — [thirtyeight.txt:150–151](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00787 — [thirtyeight.txt:172–174](../ruby/thirtyeight.txt) (2) · [complete source](sources/thirtyeight.md)


---

<a id="b-0023"></a>

### B-0023 — Explain what Delete does in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

Explain what Delete does in Ruby on Rails.

**Direct answer**

delete removes an Active Record row directly without model destruction callbacks; delete_all performs a relation-level bulk DELETE.

**Detailed explanation**

Deletion still obeys database constraints and database triggers. It bypasses model-level dependent destruction logic. Use destroy when destruction callbacks or dependent association actions are needed, and choose bulk deletion deliberately for large datasets.

**Practical example**

```ruby
user = User.find(1)
user.delete
User.where(inactive: true).delete_all
```

**Important points and follow-ups**

- destroy runs destruction callbacks, not normal model validations.
- A transaction can roll back a database deletion before it commits.
- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- The source supplies a prompt without an answer; answer prepared independently.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected the claim that destroy invokes normal validations; it invokes destruction callbacks.

**Source references**

- SRC-00759 — [thirtyeight.txt:88–92](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00763 — [thirtyeight.txt:102–104](../ruby/thirtyeight.txt) (4) · [complete source](sources/thirtyeight.md)
- SRC-01416 — [twentythree.txt:165–175](../ruby/twentythree.txt) (Q24) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00759 (thirtyeight.txt)</summary>

**Original prompt:** Explain what delete does in Ruby on Rails.

**Answer:** delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.

destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.

```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
Post.find(1).destroy
# Direct deletion bypasses those model callbacks:
Post.where(id: 2).delete_all
```

</details>


---

<a id="b-0024"></a>

### B-0024 — Explain what Destroy does in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain what Destroy does in Ruby on Rails.

**Direct answer**

destroy runs destruction callbacks and deletes a persisted record if the callbacks allow it; dependent association behavior follows its configuration.

**Detailed explanation**

A before_destroy callback can throw :abort, in which case destroy returns false; destroy! raises on a callback-aborted destruction. Existing database constraints still apply. Destroying a parent does not automatically destroy every child merely because has_many is declared.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  before_destroy { throw :abort if admin? }
end
user.destroy!
```

**Important points and follow-ups**

- Normal save validations are not the protection used during destroy.
- Database deletion inside a transaction is reversible until commit.
- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected unconditional cascading deletion, validations, and transaction irreversibility claims.

**Source references**

- SRC-00775 — [thirtyeight.txt:144–145](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01436 — [twentythree.txt:546–564](../ruby/twentythree.txt) (Q44) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00775 (thirtyeight.txt)</summary>

**Original prompt:** Explain what destroy does in Ruby on Rails.

**Answer:** delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.

destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.

```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
Post.find(1).destroy
# Direct deletion bypasses those model callbacks:
Post.where(id: 2).delete_all
```

</details>


---

<a id="b-0025"></a>

### B-0025 — Explain what dynamic finders are.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain what dynamic finders are.

**Direct answer**

Dynamic finders such as User.find_by_email(value) infer a lookup from the method name; explicit find_by(email: value) is usually clearer.

**Detailed explanation**

A supported find_by_* method builds attribute conditions and returns a match or nil. Older find_all_by_* and find_or_create_by_* forms belong to historical APIs and should not be assumed present. Prefer explicit relation composition when queries grow complex.

**Practical example**

```text
User.find_by_email("dev@example.com")
User.find_by(email: "dev@example.com")
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00798 — [thirtyeight.txt:202–203](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0026"></a>

### B-0026 — Explain what harnesses are.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain what harnesses are.

**Direct answer**

A test harness runs tests and reports results; fixtures supply reproducible test data, commonly from YAML in Rails.

**Detailed explanation**

Fixtures and factories are alternative ways of preparing model state. Keep data small and relevant, avoid order-dependent shared state, and make important scenario setup visible. A fixture is not simply every kind of supporting test code.

**Practical example**

```ruby
# test/fixtures/users.yml
ada:
  name: Ada
# In a Rails test:
user = users(:ada)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00771 — [thirtyeight.txt:136–137](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0027"></a>

### B-0027 — Explain what initializers are in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

Explain what initializers are in Ruby on Rails.

**Direct answer**

config/application.rb defines application-wide settings; environment configuration specializes them, and initializers run during application boot.

**Detailed explanation**

config/environment.rb loads the application and initializes it. Initializers configure libraries or integrations and normally require a restart after changes. Reloadable constants should not be permanently captured during boot; use supported reload hooks such as to_prepare when needed. Keep boot work fast and free of avoidable external dependencies.

**Practical example**

```ruby
# config/application.rb
config.time_zone = "UTC"
# config/initializers/filter_parameter_logging.rb
Rails.application.config.filter_parameters += [:password]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- The source supplies a prompt without an answer; answer prepared independently.

**Source references**

- SRC-00785 — [thirtyeight.txt:164–168](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01036 — [thirtyseven.txt:102–106](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01233 — [twentyfive.txt:194–196](../ruby/twentyfive.txt) (35) · [complete source](sources/twentyfive.md)


---

<a id="b-0028"></a>

### B-0028 — Explain what length does in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain what length does in Ruby on Rails.

**Direct answer**

For an Active Record collection, count usually runs SQL, length loads records and counts them in memory, and size uses loaded state or an available counter cache before querying.

**Detailed explanation**

These methods behave differently from Array#size and Array#length, which are aliases. count with a block must enumerate. Collection size may include unsaved association members and may use a configured counter cache. Choose based on whether the records will be used and whether you need an explicit database count.

**Practical example**

```ruby
posts = user.posts
posts.count   # typically SELECT COUNT(*)
posts.length  # loads records
posts.size    # uses loaded records now
```

**Important points and follow-ups**

- The source claim that Active Record size is always an alias for length is wrong.
- Reference: https://api.rubyonrails.org/classes/ActiveRecord/Associations/CollectionProxy.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00779 — [thirtyeight.txt:152–153](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00788 — [thirtyeight.txt:175–177](../ruby/thirtyeight.txt) (3) · [complete source](sources/thirtyeight.md)


---

<a id="b-0029"></a>

### B-0029 — Explain what load does in Ruby on Rails.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain what load does in Ruby on Rails.

**Direct answer**

load executes a Ruby file each time; require loads a feature once and tracks it; require_relative resolves relative to the calling file.

**Detailed explanation**

require can search configured load paths and load supported native extensions. require returns false when the feature is already loaded. load is useful for deliberate repeated execution but is not a substitute for Rails’ Zeitwerk reloader. Never load a path controlled by untrusted input.

**Practical example**

```ruby
require "json"
require_relative "lib/parser"
load "./script.rb" # executes again on the next load
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00741 — [thirtyeight.txt:52–53](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0030"></a>

### B-0030 — Explain what observers are in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain what observers are in Ruby on Rails.

**Direct answer**

Callbacks attach lifecycle hooks to a model; observers were a legacy mechanism for separating reaction code into observer objects.

**Detailed explanation**

Observers were removed from Rails core into a separate gem in Rails 4. Modern applications often use explicit services, domain events, after_commit or an outbox instead. The difference is organization and coupling, not a short versus long lifetime for callback behavior.

**Practical example**

```ruby
# Explicit application service:
ApplicationRecord.transaction do
  user.save!
end
WelcomeJob.perform_later(user.id)
```

**Important points and follow-ups**

- The source lifetime-based explanation of observers versus callbacks is misleading.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00769 — [thirtyeight.txt:132–133](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0031"></a>

### B-0031 — Explain what ORM means in Ruby on Rails.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain what ORM means in Ruby on Rails.

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00735 — [thirtyeight.txt:40–41](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0032"></a>

### B-0032 — Explain what require does in Ruby on Rails.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain what require does in Ruby on Rails.

**Direct answer**

load executes a Ruby file each time; require loads a feature once and tracks it; require_relative resolves relative to the calling file.

**Detailed explanation**

require can search configured load paths and load supported native extensions. require returns false when the feature is already loaded. load is useful for deliberate repeated execution but is not a substitute for Rails’ Zeitwerk reloader. Never load a path controlled by untrusted input.

**Practical example**

```ruby
require "json"
require_relative "lib/parser"
load "./script.rb" # executes again on the next load
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00742 — [thirtyeight.txt:54–55](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0033"></a>

### B-0033 — Explain what Ruby on Rails is.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain what Ruby on Rails is.

**Direct answer**

Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.

**Detailed explanation**

Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.

**Practical example**

```bash
bin/rails new shop
cd shop
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
bin/rails server
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00737 — [thirtyeight.txt:44–45](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00760 — [thirtyeight.txt:93–95](../ruby/thirtyeight.txt) (1) · [complete source](sources/thirtyeight.md)


---

<a id="b-0034"></a>

### B-0034 — Explain what size does in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain what size does in Ruby on Rails.

**Direct answer**

For an Active Record collection, count usually runs SQL, length loads records and counts them in memory, and size uses loaded state or an available counter cache before querying.

**Detailed explanation**

These methods behave differently from Array#size and Array#length, which are aliases. count with a block must enumerate. Collection size may include unsaved association members and may use a configured counter cache. Choose based on whether the records will be used and whether you need an explicit database count.

**Practical example**

```ruby
posts = user.posts
posts.count   # typically SELECT COUNT(*)
posts.length  # loads records
posts.size    # uses loaded records now
```

**Important points and follow-ups**

- The source claim that Active Record size is always an alias for length is wrong.
- Reference: https://api.rubyonrails.org/classes/ActiveRecord/Associations/CollectionProxy.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Active Record collection size adapts to loaded state/counter cache; it is not universally the same as length.

**Source references**

- SRC-00780 — [thirtyeight.txt:154–155](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00789 — [thirtyeight.txt:178–180](../ruby/thirtyeight.txt) (4) · [complete source](sources/thirtyeight.md)


---

<a id="b-0035"></a>

### B-0035 — Explain what Spring is.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

Explain what Spring is.

**Direct answer**

Spring is an optional development application preloader that can speed repeated commands by keeping an application process available.

**Detailed explanation**

It is not the Spring Java framework and not a guarantee that every server or configuration change reloads automatically. Commands and framework boot can use the preloader when installed/configured; restart it when stale process state causes problems.

**Practical example**

```text
bin/spring status
bin/spring stop
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-00784 — [thirtyeight.txt:162–163](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00790 — [thirtyeight.txt:181–187](../ruby/thirtyeight.txt) (5) · [complete source](sources/thirtyeight.md)
- SRC-01239 — [twentyfive.txt:231–233](../ruby/twentyfive.txt) (41) · [complete source](sources/twentyfive.md)


---

<a id="b-0036"></a>

### B-0036 — Explain when self.up and self.down method is used?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Explain when self.up and self.down method is used?

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Distinguished historical self.up/self.down from modern migration instance methods.

**Source references**

- SRC-00696 — [thirty.txt:52–54](../ruby/thirty.txt) (12) · [complete source](sources/thirty.md)
- SRC-01440 — [twentythree.txt:631–658](../ruby/twentythree.txt) (Q48) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00696 (thirty.txt)</summary>

**Original prompt:** Explain when self.up and self.down method is used?

**Answer:** Legacy migration up methods applied changes and down methods reversed them; modern versioned migrations normally use instance methods or a reversible change method.

Use change when Rails can infer the reverse operation. Use explicit up/down or reversible when a data/schema change needs custom logic. Reversing a schema change does not magically recover deleted data.

```ruby
class AddCodeToProducts < ActiveRecord::Migration[8.0]
  def up
    add_column :products, :code, :string
  end
  def down
    remove_column :products, :code
  end
end
```

</details>


---

<a id="b-0037"></a>

### B-0037 — Explain whether instance methods are private or public.

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain whether instance methods are private or public.

**Direct answer**

Ruby methods can be public, protected or private; visibility controls ordinary method-call access rather than object security.

**Detailed explanation**

Public methods accept ordinary explicit receivers. Protected methods may be called with an explicit compatible receiver from the defining class/subclass context. Private methods normally use an implicit receiver; modern Ruby permits literal self in private calls. send bypasses visibility; public_send enforces public access. Instance methods are usually public by default, while initialize is private.

**Practical example**

```ruby
class Account
  def visible = balance
  private
  def balance = 10
end
Account.new.visible # 10
Account.new.public_send(:balance) # raises NoMethodError
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00804 — [thirtyeight.txt:214–215](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0038"></a>

### B-0038 — Explain with the help of an example Skip Callback in Rails.

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Explain with the help of an example Skip Callback in Rails.

**Direct answer**

skip_callback changes a class’s registered callback chain; it is not a temporary switch for one record.

**Detailed explanation**

Changing callbacks during a request affects other instances and can race with concurrent requests. For an exceptional per-record path, define an explicit condition or a service operation instead. Bulk update/delete APIs bypass callbacks but also skip associated model safeguards.

**Practical example**

```ruby
class User < ApplicationRecord
  attr_accessor :skip_notification
  after_save :notify, unless: :skip_notification
  def notify
    NotificationJob.perform_later(id)
  end
end
user.skip_notification = true
user.save!
```

**Important points and follow-ups**

- Do not mutate a shared callback registry to control one request.
- Reference: https://api.rubyonrails.org/classes/ActiveSupport/Callbacks/ClassMethods.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected skip_callback as class-wide registration mutation, not an instance-only temporary switch.

**Source references**

- SRC-01434 — [twentythree.txt:469–500](../ruby/twentythree.txt) (Q42) · [complete source](sources/twentythree.md)


---

<a id="b-0039"></a>

### B-0039 — How can recruiters reduce time-to-hire for Rails developers?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How can recruiters reduce time-to-hire for Rails developers?

**Direct answer**

Evaluate demonstrated technical judgment, project responsibility, communication and practical problem-solving rather than treating years of experience as a fixed skill score.

**Detailed explanation**

Use a consistent job-relevant rubric, realistic coding/debugging exercises and discussion of previous work. Seniority varies by organization; a source estimate such as four to seven years is not a technical requirement or universal hiring rule. Keep interviews accessible and avoid unnecessary repeated assessments.

**Practical example**

```text
Rubric example: identify the root cause of an N+1 endpoint, implement a fix, verify query behavior and explain the chosen trade-offs.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00670 — [fifteen.txt:248–249](../ruby/fifteen.txt) (5) · [complete source](sources/fifteen.md)


---

<a id="b-0040"></a>

### B-0040 — How do weekdays and weekends affect this schedule?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do weekdays and weekends affect this schedule?

**Direct answer**

A delayed job and a recurring business-calendar schedule are different requirements; a one-day delay does not automatically skip weekends or holidays.

**Detailed explanation**

The source weekday/weekend question omits the schedule and timezone, so there is no unique exact answer. Clarify recurrence, business hours, timezone, holidays and daylight-saving rules, then configure the selected scheduler. For a one-off delay use set(wait:) or wait_until:. Solid Queue recurring schedules and cron-backed tools require explicit schedule configuration.

**Practical example**

```text
MyJob.set(wait_until: Time.zone.parse("2026-11-02 09:00")).perform_later
```

**Important points and follow-ups**

- Missing source context: the referenced schedule is not supplied.

**Source references**

- SRC-01121 — [twenty.txt:169–175](../ruby/twenty.txt) (23) · [complete source](sources/twenty.md)


---

<a id="b-0041"></a>

### B-0041 — How do you add CSS and JavaScript to your Rails application?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you add CSS and JavaScript to your Rails application?

**Direct answer**

An asset pipeline manages static asset discovery and fingerprinted URLs; exact bundling and preprocessing behavior depends on the configured tools and Rails version.

**Detailed explanation**

Rails 8 uses Propshaft by default. Propshaft does not itself perform general-purpose JavaScript/CSS bundling or minification; specialized tools can be added. Sprockets and Webpacker descriptions in older answers must be read in their historical context.

**Practical example**

```erb
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
<%= javascript_importmap_tags %>
# bin/rails assets:precompile
```

**Important points and follow-ups**

- Webpacker is not the universal modern Rails default.
- Do not assume every application concatenates all assets into exactly two files.
- Reference: https://guides.rubyonrails.org/asset_pipeline.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01459 — [twentyseven.txt:142–146](../ruby/twentyseven.txt) (Open-16) · [complete source](sources/twentyseven.md)


---

<a id="b-0042"></a>

### B-0042 — How do you assess Ruby on Rails developer skills?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you assess Ruby on Rails developer skills?

**Direct answer**

Prepare Ruby semantics, Rails request/data flow, SQL, testing, security, debugging and clear explanations of actual project decisions.

**Detailed explanation**

For around three years’ experience, practice implementing an endpoint, diagnosing N+1 queries, writing a migration with constraints, testing authorization, and explaining a production issue. Support answers with a real example rather than claiming tools or incidents you have not used.

**Practical example**

```text
Practice: build POST /orders with permitted input, a transaction, inventory checks, an authorization policy and request tests for success and failure.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00667 — [fifteen.txt:239–241](../ruby/fifteen.txt) (2) · [complete source](sources/fifteen.md)


---

<a id="b-0043"></a>

### B-0043 — How do you create a custom generator in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you create a custom generator in Rails?

**Direct answer**

Create a generator under lib/generators using Rails::Generators::Base and supported file/template actions.

**Detailed explanation**

A generator creates or modifies application files from arguments and options. Define a source_root for templates, make names predictable and test generation in a temporary destination. The generated artifact still needs application-specific review.

**Practical example**

```ruby
class GreetingGenerator < Rails::Generators::Base
  argument :name, type: :string
  def create_file
    create_file "app/services/#{name.underscore}.rb", "class #{name.camelize}; end\n"
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01293 — [twentyfive.txt:680–686](../ruby/twentyfive.txt) (95) · [complete source](sources/twentyfive.md)


---

<a id="b-0044"></a>

### B-0044 — How do you create a new Rails application?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

How do you create a new Rails application?

**Direct answer**

Install/select a compatible Ruby and Rails version, then run rails new with an application name and any required options.

**Detailed explanation**

To create a new Rails application, you can use the Rails new command followed by the desired application name. For example, rails new MyAwesomeApp. This command generates a new Rails application with a basic directory structure, configuration files, and initial files for setting up the app's environment. You can also include various options to customize the application's setup, like specifying the database to use or skipping unnecessary files.

**Practical example**

```bash
rails new shop --database=postgresql
cd shop
bin/rails db:create
bin/rails server
```

**Important points and follow-ups**

- These are terminal commands. Choose an application-specific supported version rather than blindly upgrading dependencies.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- The source supplies a prompt without an answer; an independently prepared answer is required.
- Asset behavior is version-specific: Rails 8 defaults to Propshaft; bundling/transpilation/minification may require separate tooling.

**Source references**

- SRC-00042 — [first.txt:284–286](../ruby/first.txt) (12) · [complete source](sources/first.md)
- SRC-00830 — [thirtyfive.txt:99–109](../ruby/thirtyfive.txt) (10) · [complete source](sources/thirtyfive.md)
- SRC-00853 — [thirtyfour.txt:22–22](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00973 — [thirtyfour.txt:177–208](../ruby/thirtyfour.txt) (3) · [complete source](sources/thirtyfour.md)
- SRC-01058 — [thirtysix.txt:197–225](../ruby/thirtysix.txt) (6) · [complete source](sources/thirtysix.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00830 (thirtyfive.txt)</summary>

**Original prompt:** How do you create a new Rails application?

**Answer:** Install compatible Ruby/Rails and generate the application with rails new, then prepare the database and start the development server.

Select the database with -d and inspect rails new --help for options supported by the installed version. Modern default servers use Puma; WEBrick is historical. JavaScript options change by Rails version; --dev is not a web-server selector. An API-only or --skip-active-record application has different defaults.

```bash
rails new shop -d postgresql
cd shop
bin/rails db:prepare
bin/rails server -p 3000
```

</details>


---

<a id="b-0045"></a>

### B-0045 — How do you create a User model with name and email attributes using generator?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you create a User model with name and email attributes using generator?

**Direct answer**

Use Rails generators to create the relevant model or controller files, then inspect the generated code and routes.

**Detailed explanation**

Generators provide a starting point, not business-complete application behavior. A model generator creates a migration; a controller generator only creates the requested actions/views/routes rather than a complete database resource.

**Practical example**

```bash
bin/rails generate model User name:string email:string
bin/rails generate controller Subjects index show
bin/rails db:migrate
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01070 — [thirtytwo.txt:32–36](../ruby/thirtytwo.txt) (3) · [complete source](sources/thirtytwo.md)


---

<a id="b-0046"></a>

### B-0046 — How do you define a User model in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you define a User model in Rails?

**Direct answer**

Define User as a subclass of ApplicationRecord; ApplicationRecord is the application’s abstract Active Record base class.

**Detailed explanation**

The User class maps to users by convention. Shared model configuration can live in ApplicationRecord. Defining a Ruby class alone does not create a database table; use a migration. Keep application-wide callbacks in the base class rare because they affect every model.

**Practical example**

```ruby
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end
class User < ApplicationRecord
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01069 — [thirtytwo.txt:26–31](../ruby/thirtytwo.txt) (2) · [complete source](sources/thirtytwo.md)


---

<a id="b-0047"></a>

### B-0047 — How do you ensure code quality in large applications?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you ensure code quality in large applications?

**Direct answer**

Organize code around cohesive business responsibilities, keep request coordination small, and add explicit service, query, form or policy objects when they clarify real complexity.

**Detailed explanation**

Avoid replacing every method with a pattern just to satisfy a slogan. Establish clear module boundaries and dependency direction, test the boundaries, monitor coupling and use automated formatting/static analysis. Engines are useful for reusable bounded components but add integration cost. State what changed in a real project and why it improved maintainability.

**Practical example**

```text
app/services/checkout.rb
app/queries/recent_orders.rb
app/policies/order_policy.rb
app/models/order.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; answer prepared independently.

**Source references**

- SRC-00661 — [fifteen.txt:105–106](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)


---

<a id="b-0048"></a>

### B-0048 — How do you ensure your code stays maintainable as a Rails app grows?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you ensure your code stays maintainable as a Rails app grows?

**Direct answer**

Organize code around cohesive business responsibilities, keep request coordination small, and add explicit service, query, form or policy objects when they clarify real complexity.

**Detailed explanation**

Avoid replacing every method with a pattern just to satisfy a slogan. Establish clear module boundaries and dependency direction, test the boundaries, monitor coupling and use automated formatting/static analysis. Engines are useful for reusable bounded components but add integration cost. State what changed in a real project and why it improved maintainability.

**Practical example**

```text
app/services/checkout.rb
app/queries/recent_orders.rb
app/policies/order_policy.rb
app/models/order.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01345 — [twentysix.txt:110–111](../ruby/twentysix.txt) (31) · [complete source](sources/twentysix.md)


---

<a id="b-0049"></a>

### B-0049 — How do you generate JSON responses in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you generate JSON responses in Rails?

**Direct answer**

JSON is a data interchange format; Rails can render structured JSON directly or use a chosen serializer/template layer.

**Detailed explanation**

Expose an explicit public representation so sensitive database fields do not leak. ActiveModel::Serializer is supplied by a separate library, not a mandatory Rails built-in serializer. Include appropriate status codes, pagination and version/error contracts for APIs.

**Practical example**

```text
render json: { id: @user.id, name: @user.name }, status: :ok
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01272 — [twentyfive.txt:507–513](../ruby/twentyfive.txt) (74) · [complete source](sources/twentyfive.md)


---

<a id="b-0050"></a>

### B-0050 — How do you handle errors in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you handle errors in Rails?

**Direct answer**

Handle expected failures explicitly and map known exceptions to appropriate responses, while letting unexpected failures reach centralized reporting.

**Detailed explanation**

rescue_from can map a specific controller-level exception to a response. Avoid blanket rescue of StandardError that hides bugs or returns success for failures. Keep detailed traces in protected logs and return safe error messages with meaningful status codes.

**Practical example**

```text
rescue_from ActiveRecord::RecordNotFound do
  render json: { error: "Not found" }, status: :not_found
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00878 — [thirtyfour.txt:47–47](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0051"></a>

### B-0051 — How do you handle exceptions and errors in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you handle exceptions and errors in Rails?

**Direct answer**

Rescue known application failures at the layer that can translate or recover from them, and report unexpected exceptions with sufficient diagnostic context.

**Detailed explanation**

Controllers can use rescue_from for selected classes to return a consistent response. Avoid rescuing all exceptions and returning success, suppressing authorization failures or leaking stack traces/secrets. Jobs, model transactions and external calls need their own appropriate recovery boundaries.

**Practical example**

```text
rescue_from ActiveRecord::RecordNotFound do
  render json: { error: "not found" }, status: :not_found
end
```

**Important points and follow-ups**

- Do not broadly rescue Exception or ignore failures just to keep a request apparently successful.

**Source references**

- SRC-00406 — [ten.txt:184–188](../ruby/ten.txt) (35) · [complete source](sources/ten.md)


---

<a id="b-0052"></a>

### B-0052 — How do you handle exceptions in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

How do you handle exceptions in Rails?

**Direct answer**

Handle expected failures explicitly and map known exceptions to appropriate responses, while letting unexpected failures reach centralized reporting.

**Detailed explanation**

rescue_from can map a specific controller-level exception to a response. Avoid blanket rescue of StandardError that hides bugs or returns success for failures. Keep detailed traces in protected logs and return safe error messages with meaningful status codes.

**Practical example**

```text
rescue_from ActiveRecord::RecordNotFound do
  render json: { error: "Not found" }, status: :not_found
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00920 — [thirtyfour.txt:90–90](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01258 — [twentyfive.txt:360–378](../ruby/twentyfive.txt) (60) · [complete source](sources/twentyfive.md)


---

<a id="b-0053"></a>

### B-0053 — How do you handle file downloads in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you handle file downloads in Rails?

**Direct answer**

Use send_data for generated bytes or send_file for an authorized file, or serve authorized Active Storage blobs through its supported delivery paths.

**Detailed explanation**

Check ownership before locating or sending the file and never accept a raw user-supplied filesystem path. Use a safe filename/content type and content-disposition. Large generated exports are often better created in a job and served from object storage.

**Practical example**

```text
authorize @report, :download?
send_data report_csv, filename: "report.csv", type: "text/csv", disposition: "attachment"
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00906 — [thirtyfour.txt:76–76](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0054"></a>

### B-0054 — How do you handle file uploads in Rails (e.g., using ActiveStorage or CarrierWave)?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

How do you handle file uploads in Rails (e.g., using ActiveStorage or CarrierWave)?

**Direct answer**

Active Storage attaches files to models and supports local or cloud-backed storage, direct uploads, metadata and image variants.

**Detailed explanation**

Authorize uploads/downloads, impose size and content-type policies, and do not rely only on a supplied filename or browser MIME type. Isolate uploaded content and process expensive image/video work asynchronously. Direct uploads reduce web-server bandwidth but still require access controls, lifecycle cleanup and malware/content checks appropriate to the application.

**Practical example**

```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
user.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png", content_type: "image/png")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_storage_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00904 — [thirtyfour.txt:74–74](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01141 — [twenty.txt:398–402](../ruby/twenty.txt) (44) · [complete source](sources/twenty.md)
- SRC-01215 — [twentyfive.txt:88–90](../ruby/twentyfive.txt) (17) · [complete source](sources/twentyfive.md)
- SRC-01242 — [twentyfive.txt:247–253](../ruby/twentyfive.txt) (44) · [complete source](sources/twentyfive.md)
- SRC-01274 — [twentyfive.txt:517–519](../ruby/twentyfive.txt) (76) · [complete source](sources/twentyfive.md)


---

<a id="b-0055"></a>

### B-0055 — How do you handle time zones in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you handle time zones in Rails?

**Direct answer**

Use Rails time-zone-aware APIs for application/user time and store timestamps consistently, typically in UTC.

**Detailed explanation**

Configure config.time_zone, use Time.current/Time.zone.now, and convert to the user’s zone for display. Scope per-request user zones with Time.use_zone. Calendar days are not always 24 hours around daylight-saving changes, so distinguish wall-clock schedules from elapsed durations.

**Practical example**

```text
Time.use_zone(user.time_zone) { Time.current }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01234 — [twentyfive.txt:197–202](../ruby/twentyfive.txt) (36) · [complete source](sources/twentyfive.md)


---

<a id="b-0056"></a>

### B-0056 — How do you implement "soft deletes" in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

How do you implement "soft deletes" in Rails?

**Direct answer**

delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.

**Detailed explanation**

destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.

**Practical example**

```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
Post.find(1).destroy
# Direct deletion bypasses those model callbacks:
Post.where(id: 2).delete_all
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00927 — [thirtyfour.txt:97–97](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01338 — [twentysix.txt:88–90](../ruby/twentysix.txt) (24) · [complete source](sources/twentysix.md)


---

<a id="b-0057"></a>

### B-0057 — How do you implement nested resources in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

How do you implement nested resources in Rails?

**Direct answer**

Nested routes express a parent-child URL relationship; nested forms edit associated models using fields_for and accepts_nested_attributes_for.

**Detailed explanation**

For routes, authorize the child through its parent rather than trusting unrelated IDs. Keep nesting shallow. For forms, permit the nested attribute keys explicitly and consider validation/error handling and reject_if/allow_destroy behavior.

**Practical example**

```ruby
resources :posts do
  resources :comments, shallow: true
end
# Controller lookup:
@comment = current_user.posts.find(params[:post_id]).comments.find(params[:id])
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00924 — [thirtyfour.txt:94–94](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01247 — [twentyfive.txt:274–284](../ruby/twentyfive.txt) (49) · [complete source](sources/twentyfive.md)


---

<a id="b-0058"></a>

### B-0058 — How do you implement pagination in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

How do you implement pagination in Rails?

**Direct answer**

Pagination returns a bounded page of records rather than loading an entire relation.

**Detailed explanation**

Offset pagination is simple but gets expensive at large offsets and can shift under concurrent writes. Keyset pagination uses an indexed stable sort key and cursor for scalable sequential access. Always apply a deterministic order and cap page size.

**Practical example**

```ruby
Post.order(id: :desc).where("id < ?", cursor).limit(25)
# With a pagination library: Post.order(:id).page(params[:page]).per(25)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00909 — [thirtyfour.txt:79–79](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01243 — [twentyfive.txt:254–260](../ruby/twentyfive.txt) (45) · [complete source](sources/twentyfive.md)


---

<a id="b-0059"></a>

### B-0059 — How do you schedule tasks in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you schedule tasks in Rails?

**Direct answer**

A delayed job and a recurring business-calendar schedule are different requirements; a one-day delay does not automatically skip weekends or holidays.

**Detailed explanation**

The source weekday/weekend question omits the schedule and timezone, so there is no unique exact answer. Clarify recurrence, business hours, timezone, holidays and daylight-saving rules, then configure the selected scheduler. For a one-off delay use set(wait:) or wait_until:. Solid Queue recurring schedules and cron-backed tools require explicit schedule configuration.

**Practical example**

```text
MyJob.set(wait_until: Time.zone.parse("2026-11-02 09:00")).perform_later
```

**Important points and follow-ups**

- Missing source context: the referenced schedule is not supplied.

**Source references**

- SRC-01277 — [twentyfive.txt:530–532](../ruby/twentyfive.txt) (79) · [complete source](sources/twentyfive.md)


---

<a id="b-0060"></a>

### B-0060 — How do you secure a Rails app?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you secure a Rails app?

**Direct answer**

Secure Rails applications with authentication, per-resource authorization, constrained input, safe output/SQL handling, CSRF defenses where applicable, HTTPS, secrets management and tested access controls.

**Detailed explanation**

Framework defaults help but do not establish application-specific permissions. For APIs choose an appropriate session, scoped token or OAuth model; validate token signature, issuer, audience and expiry when applicable. Limit request sizes and rates, filter secrets from logs, and test cross-user and cross-tenant access. Scan dependencies and apply supported security updates.

**Practical example**

```ruby
# Scope lookup to the authenticated user, then enforce the action policy:
@post = current_user.posts.find(params[:id])
authorize @post
@post.update!(params.require(:post).permit(:title))
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-01140 — [twenty.txt:389–397](../ruby/twenty.txt) (43) · [complete source](sources/twenty.md)


---

<a id="b-0061"></a>

### B-0061 — How do you secure API endpoints in a Rails application?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you secure API endpoints in a Rails application?

**Direct answer**

Secure Rails applications with authentication, per-resource authorization, constrained input, safe output/SQL handling, CSRF defenses where applicable, HTTPS, secrets management and tested access controls.

**Detailed explanation**

Framework defaults help but do not establish application-specific permissions. For APIs choose an appropriate session, scoped token or OAuth model; validate token signature, issuer, audience and expiry when applicable. Limit request sizes and rates, filter secrets from logs, and test cross-user and cross-tenant access. Scan dependencies and apply supported security updates.

**Practical example**

```ruby
# Scope lookup to the authenticated user, then enforce the action policy:
@post = current_user.posts.find(params[:id])
authorize @post
@post.update!(params.require(:post).permit(:title))
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00967 — [thirtyfour.txt:138–138](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0062"></a>

### B-0062 — How do you secure sensitive data in a Rails application?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you secure sensitive data in a Rails application?

**Direct answer**

Keep credentials outside source code, use supported encrypted credentials or a secret manager, restrict access and filter secrets from logs.

**Detailed explanation**

Environment variables are a delivery mechanism, not intrinsically encrypted storage. Encryption at rest, access control, redaction, rotation and safe error messages address different risks. Strong Parameters prevents unwanted assignment but does not encrypt data.

**Practical example**

```bash
bin/rails credentials:edit
# config.filter_parameters += [:password, :access_token]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01240 — [twentyfive.txt:234–240](../ruby/twentyfive.txt) (42) · [complete source](sources/twentyfive.md)


---

<a id="b-0063"></a>

### B-0063 — How do you securely handle file uploads in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you securely handle file uploads in Rails?

**Direct answer**

Active Storage attaches files to models and supports local or cloud-backed storage, direct uploads, metadata and image variants.

**Detailed explanation**

Authorize uploads/downloads, impose size and content-type policies, and do not rely only on a supplied filename or browser MIME type. Isolate uploaded content and process expensive image/video work asynchronously. Direct uploads reduce web-server bandwidth but still require access controls, lifecycle cleanup and malware/content checks appropriate to the application.

**Practical example**

```ruby
class User < ApplicationRecord
  has_one_attached :avatar
end
user.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png", content_type: "image/png")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_storage_overview.html

**Source references**

- SRC-01335 — [twentysix.txt:78–80](../ruby/twentysix.txt) (21) · [complete source](sources/twentysix.md)


---

<a id="b-0064"></a>

### B-0064 — How do you start a Rails server?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

How do you start a Rails server?

**Direct answer**

Run bin/rails server (or bin/rails s) in the application directory; modern generated applications normally use Puma.

**Detailed explanation**

The development default port is usually 3000; override it with -p. bin/rails uses the application’s bundled Rails version. Production requires appropriate process supervision, networking, secrets and database configuration.

**Practical example**

```bash
bin/rails server -p 4000
# Open http://localhost:4000
```

**Important points and follow-ups**

- WEBrick as the default is historical, not a general statement about current Rails.
- Reference: https://guides.rubyonrails.org/command_line.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00856 — [thirtyfour.txt:25–25](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00975 — [thirtyfour.txt:250–265](../ruby/thirtyfour.txt) (6) · [complete source](sources/thirtyfour.md)
- SRC-01462 — [twentyseven.txt:158–162](../ruby/twentyseven.txt) (Open-19) · [complete source](sources/twentyseven.md)
- SRC-01482 — [twentyseven.txt:313–317](../ruby/twentyseven.txt) (Open-39) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00856 (thirtyfour.txt)</summary>

**Original prompt:** What is the purpose of the rail's server command?

**Answer:** bin/rails server starts the application’s web server, ordinarily Puma in a modern generated application.

It listens on port 3000 by default; -p chooses a different port and -e selects an environment. Bind addresses, TLS/reverse proxy configuration and production worker sizing are separate deployment decisions.

```bash
bin/rails server -p 4000
bin/rails server -e production
```

</details>


---

<a id="b-0065"></a>

### B-0065 — How do you validate a model’s presence in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How do you validate a model’s presence in Rails?

**Direct answer**

Declare validates :attribute, presence: true on the model.

**Detailed explanation**

Presence uses blank? semantics, so false is considered blank. For a Boolean that must be either true or false, use inclusion in [true,false]. A database NOT NULL constraint addresses storage integrity but does not reject an empty String by itself.

**Practical example**

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
end
```

**Important points and follow-ups**

- Validation messages and database constraints solve related but different problems.

**Source references**

- SRC-00409 — [ten.txt:201–205](../ruby/ten.txt) (38) · [complete source](sources/ten.md)


---

<a id="b-0066"></a>

### B-0066 — How does Rails compare to Django?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How does Rails compare to Django?

**Direct answer**

Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

**Detailed explanation**

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

**Practical example**

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

**Important points and follow-ups**

- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Source references**

- SRC-01161 — [twenty.txt:519–521](../ruby/twenty.txt) (4) · [complete source](sources/twenty.md)


---

<a id="b-0067"></a>

### B-0067 — How does Rails implement lazy loading?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How does Rails implement lazy loading?

**Direct answer**

A relation or association is normally loaded only when its records are needed.

**Detailed explanation**

Constructing User.where(active: true) builds a relation. Iterating it executes SQL. Once an association has loaded, later access can reuse its in-memory target. Accessing an unloaded association inside a collection loop causes N+1 queries; preload the associations you need.

**Practical example**

```ruby
users = User.where(active: true) # builds a relation
users.to_a # executes SQL
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00913 — [thirtyfour.txt:83–83](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0068"></a>

### B-0068 — How does Ruby on Rails structure an application, and where does Ruby's design help?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How does Ruby on Rails structure an application, and where does Ruby's design help?

**Direct answer**

Rails is a Ruby web framework following Model–View–Controller and convention over configuration. Models represent domain behavior, controllers handle HTTP requests, and views present responses.

**Detailed explanation**

Active Record supplies database mapping for models that use it; domain models need not all inherit from Active Record. Routing selects a controller action based on both path and HTTP method. Controllers coordinate work and render HTML, JSON or other responses, while keeping substantial business rules in reusable model or application-service code.

**Practical example**

```ruby
# config/routes.rb
resources :articles, only: [:index, :show]
# GET /articles/5 routes to ArticlesController#show
```

**Important points and follow-ups**

- MVC separates responsibilities but does not prescribe that every rule lives in a single Active Record class.

**Source references**

- SRC-00555 — [nineteen.txt:974–986](../ruby/nineteen.txt) (54) · [complete source](sources/nineteen.md)


---

<a id="b-0069"></a>

### B-0069 — How does the Hotwire integration in Rails 7 improve real-time functionality in web applications?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How does the Hotwire integration in Rails 7 improve real-time functionality in web applications?

**Direct answer**

Hotwire combines Turbo’s navigation, frames and stream updates with Stimulus controllers for small client-side behavior.

**Detailed explanation**

Turbo Drive handles navigation, frames update isolated regions, and streams describe DOM changes delivered over HTTP or WebSockets. Turbolinks is the predecessor to Turbo Drive and belongs to older applications. Real-time broadcasting still needs authorization, safe stream subscriptions and reliable server operations.

**Practical example**

```erb
<%= turbo_stream_from @conversation %>
<%= turbo_frame_tag "messages" do %>
  <%= render @messages %>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01149 — [twenty.txt:444–450](../ruby/twenty.txt) (52) · [complete source](sources/twenty.md)


---

<a id="b-0070"></a>

### B-0070 — How is Ruby on Rails different from Python?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

How is Ruby on Rails different from Python?

**Direct answer**

Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

**Detailed explanation**

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

**Practical example**

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

**Important points and follow-ups**

- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00806 — [thirtyeight.txt:218–219](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01134 — [twenty.txt:324–333](../ruby/twenty.txt) (36) · [complete source](sources/twenty.md)


---

<a id="b-0071"></a>

### B-0071 — How is Ruby on Rails similar to Python?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How is Ruby on Rails similar to Python?

**Direct answer**

Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

**Detailed explanation**

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

**Practical example**

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

**Important points and follow-ups**

- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00805 — [thirtyeight.txt:216–217](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0072"></a>

### B-0072 — How much does a Ruby on Rails developer make?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

How much does a Ruby on Rails developer make?

**Direct answer**

Ruby is a general-purpose language commonly used on the backend; Rails supports server-side full-stack web development and API-only applications.

**Detailed explanation**

A Rails developer may design APIs/data models, implement interfaces and domain rules, write tests, diagnose production problems and manage deployments. Demand, salaries and freelance suitability vary by market, date, project and experience. The salary figures in the pasted source are historical/unverified and are not presented as a current estimate.

**Practical example**

```text
Rails can render an ERB page or return JSON to a separate JavaScript/mobile client.
```

**Important points and follow-ups**

- Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.

**Source references**

- SRC-01379 — [twentytwo.txt:383–385](../ruby/twentytwo.txt) (3) · [complete source](sources/twentytwo.md)


---

<a id="b-0073"></a>

### B-0073 — HOW Web Works

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

HOW Web Works

**Direct answer**

A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.

**Detailed explanation**

The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.

**Practical example**

```text
GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-01192 — [twentyeight.txt:358–360](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0074"></a>

### B-0074 — In Rails routing, what is the key difference between using resources :articles and resource :account?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

In Rails routing, what is the key difference between using resources :articles and resource :account?

**Direct answer**

Option 2: `resources :articles` creates routes for working with multiple articles, while `resource :account` creates routes for a single account.

**Detailed explanation**

The correct choice is `resources :articles` creates routes for working with multiple articles, while `resource :account` creates routes for a single account. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: `resources :articles` creates routes for working with multiple articles, while `resource :account` creates routes for a single account.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01552 — [twentyseven.txt:906–917](../ruby/twentyseven.txt) (MCQ-4) · [complete source](sources/twentyseven.md)


---

<a id="b-0075"></a>

### B-0075 — In Rails, what is the primary purpose of accepts_nested_attributes_for?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

In Rails, what is the primary purpose of accepts_nested_attributes_for?

**Direct answer**

Option 2: To enable you to create, update, and delete associated records through the parent record.

**Detailed explanation**

The correct choice is To enable you to create, update, and delete associated records through the parent record. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To enable you to create, update, and delete associated records through the parent record.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01572 — [twentyseven.txt:1154–1165](../ruby/twentyseven.txt) (MCQ-24) · [complete source](sources/twentyseven.md)


---

<a id="b-0076"></a>

### B-0076 — In what ways is Ruby on Rails limited?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

In what ways is Ruby on Rails limited?

**Direct answer**

Rails is an opinionated web framework with trade-offs in runtime resources, conventions and coupling; it is not limited by a blanket inability to use foreign keys or multiple databases.

**Detailed explanation**

Modern Rails supports foreign keys, multiple databases and API applications. Specialized real-time, CPU-heavy or unusual deployment requirements may call for other components, but evaluate actual requirements rather than treating old limitations as current facts.

**Practical example**

```ruby
add_foreign_key :orders, :users
# Multiple database configurations are supported through database.yml and connects_to.
```

**Important points and follow-ups**

- The source claims about no foreign-key support and no multiple-database support are outdated or false.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Corrected obsolete or database-dependent limitation claims; modern Rails supports foreign keys/multiple databases and text has no universal 30,000-character cap.

**Source references**

- SRC-00740 — [thirtyeight.txt:50–51](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01370 — [twentytwo.txt:287–293](../ruby/twentytwo.txt) (7) · [complete source](sources/twentytwo.md)


---

<a id="b-0077"></a>

### B-0077 — Inject

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Inject

**Direct answer**

inject/reduce folds a sequence using an accumulator and returns the final accumulator.

**Detailed explanation**

Supply an initial value when empty-input behavior matters. Without an initial value an empty reduction returns nil. Enumerable#sum is often the clearest numeric summation API.

**Practical example**

```text
[1, 2, 3].inject(0) { |sum, n| sum + n } # 6
[].inject(0, :+) # 0
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01190 — [twentyeight.txt:348–354](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0078"></a>

### B-0078 — Is Ruby on rails good for freelancing?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Is Ruby on rails good for freelancing?

**Direct answer**

Ruby is a general-purpose language commonly used on the backend; Rails supports server-side full-stack web development and API-only applications.

**Detailed explanation**

A Rails developer may design APIs/data models, implement interfaces and domain rules, write tests, diagnose production problems and manage deployments. Demand, salaries and freelance suitability vary by market, date, project and experience. The salary figures in the pasted source are historical/unverified and are not presented as a current estimate.

**Practical example**

```text
Rails can render an ERB page or return JSON to a separate JavaScript/mobile client.
```

**Important points and follow-ups**

- Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.

**Source references**

- SRC-01380 — [twentytwo.txt:386–388](../ruby/twentytwo.txt) (4) · [complete source](sources/twentytwo.md)


---

<a id="b-0079"></a>

### B-0079 — Is Ruby on Rails in demand?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Is Ruby on Rails in demand?

**Direct answer**

Ruby is a general-purpose language commonly used on the backend; Rails supports server-side full-stack web development and API-only applications.

**Detailed explanation**

A Rails developer may design APIs/data models, implement interfaces and domain rules, write tests, diagnose production problems and manage deployments. Demand, salaries and freelance suitability vary by market, date, project and experience. The salary figures in the pasted source are historical/unverified and are not presented as a current estimate.

**Practical example**

```text
Rails can render an ERB page or return JSON to a separate JavaScript/mobile client.
```

**Important points and follow-ups**

- Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.

**Source references**

- SRC-01378 — [twentytwo.txt:380–382](../ruby/twentytwo.txt) (2) · [complete source](sources/twentytwo.md)


---

<a id="b-0080"></a>

### B-0080 — List some things you would change about Rails

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

List some things you would change about Rails

**Direct answer**

Choose a concrete maintainability or performance issue and explain a measured improvement, its tradeoffs and backwards compatibility. There is no canonical list of changes to Rails.

**Detailed explanation**

Choose a concrete maintainability or performance issue and explain a measured improvement, its tradeoffs and backwards compatibility. There is no canonical list of changes to Rails. Distinguish personal preference from language/framework facts.

**Practical example**

```ruby
# Example interview discussion: replace a callback-heavy purchase workflow with an explicit transactional service and reliable event delivery.
```

**Important points and follow-ups**

- Distinguish personal preference from language/framework facts.

**Corrections and source limitations**

- Original answer is absent or incomplete; the answer below is an authored completion.
- Original incomplete/outdated claim corrected: Choose a concrete maintainability or performance issue and explain a measured improvement, its tradeoffs and backwards compatibility. There is no canonical list of changes to Rails.

**Source references**

- SRC-00175 — [five.txt:62–62](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="b-0081"></a>

### B-0081 — Mention what is the purpose of RJs in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Mention what is the purpose of RJs in Rails?

**Direct answer**

RJS was a historical Rails template mechanism for generating JavaScript responses, associated with the Prototype-era Rails stack.

**Detailed explanation**

Treat it as legacy knowledge. Modern Rails commonly uses Turbo Streams/Frames, standard JavaScript modules and JSON responses rather than returning strings for eval. Evaluate the existing application’s Rails and frontend version before migrating it.

**Practical example**

```ruby
# Modern replacement example:
render turbo_stream: turbo_stream.replace(@post, partial: "posts/post", locals: { post: @post })
```

**Important points and follow-ups**

- Outdated source topic: RJS is not a modern Rails default.

**Source references**

- SRC-00705 — [thirty.txt:91–93](../ruby/thirty.txt) (21) · [complete source](sources/thirty.md)


---

<a id="b-0082"></a>

### B-0082 — Outline three components of Rails.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Outline three components of Rails.

**Direct answer**

MVC separates domain/data behavior in models, presentation in views, and request coordination in controllers.

**Detailed explanation**

The router dispatches a request to a controller action. The action loads or changes domain objects and renders a view or another representation, or returns a redirect. Active Record models often provide persistence, but a model need not inherit from Active Record. Views should avoid database queries, and complex workflows can live in services or other domain objects.

**Practical example**

```ruby
# app/controllers/posts_controller.rb
def show
  @post = Post.find(params[:id])
end
# app/views/posts/show.html.erb
<h1><%= @post.title %></h1>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00745 — [thirtyeight.txt:60–61](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0083"></a>

### B-0083 — Tell anyone basic factor which is necessary to be followed when it comes to creating the rails application?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Tell anyone basic factor which is necessary to be followed when it comes to creating the rails application?

**Direct answer**

Start with the domain and user workflows, define the data/constraints and HTTP interface, and implement a tested, secure vertical feature in the Rails application structure.

**Detailed explanation**

app/models holds domain/persistence classes, app/controllers request coordinators, app/views templates, config configuration and db migrations/schema/seeds. PostgreSQL is one supported choice, not a mandatory database for every Rails application. Database-driven behavior comes from persistence code, not merely choosing MVC.

**Practical example**

```text
app/models/product.rb
app/controllers/products_controller.rb
app/views/products/index.html.erb
config/routes.rb
db/migrate/..._create_products.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00720 — [thirty.txt:146–148](../ruby/thirty.txt) (36) · [complete source](sources/thirty.md)


---

<a id="b-0084"></a>

### B-0084 — What are Action Mailers in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are Action Mailers in Rails?

**Direct answer**

Action Mailer builds and delivers email messages using mailer classes and templates; deliver_later integrates delivery with Active Job.

**Detailed explanation**

Configure a delivery method/provider, sender identity and URL host, test content and recipient selection, and monitor delivery failures. Modern inbound email processing is handled by Action Mailbox; saying Action Mailer is the complete modern inbound system is misleading.

**Practical example**

```ruby
class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    mail(to: user.email, subject: "Welcome")
  end
end
UserMailer.welcome_email(user).deliver_later
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Modern Rails uses Action Mailer for message construction/delivery and Action Mailbox for inbound email routing.

**Source references**

- SRC-01298 — [twentyfive.txt:708–727](../ruby/twentyfive.txt) (100) · [complete source](sources/twentyfive.md)


---

<a id="b-0085"></a>

### B-0085 — What are best practices for Rails development?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are best practices for Rails development?

**Direct answer**

Follow Rails conventions while keeping domain workflows explicit, input/authorization checks correct, database constraints authoritative and side effects reliable. Profile queries, paginate and test failure paths.

**Detailed explanation**

Follow Rails conventions while keeping domain workflows explicit, input/authorization checks correct, database constraints authoritative and side effects reliable. Profile queries, paginate and test failure paths. Uniqueness validation needs a database unique constraint for races; callbacks/jobs are not exactly-once delivery. Use authorization-aware cache keys, avoid caching unbounded User.all objects, sanitize LIKE wildcards when needed and protect secrets.

**Practical example**

```ruby
# Application model sketch:
class Order < ApplicationRecord
  after_create_commit :enqueue_receipt
  private
  def enqueue_receipt; ReceiptJob.perform_later(id); end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Uniqueness validation needs a database unique constraint for races; callbacks/jobs are not exactly-once delivery. Use authorization-aware cache keys, avoid caching unbounded User.all objects, sanitize LIKE wildcards when needed and protect secrets.

**Source references**

- SRC-00206 — [six.txt:2829–2982](../ruby/six.txt) (Q30) · [complete source](sources/six.md)


---

<a id="b-0086"></a>

### B-0086 — What are callbacks and filters in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are callbacks and filters in Rails?

**Direct answer**

A model callback hooks into persistence/validation lifecycle events; controller callbacks run before, after or around a request action.

**Detailed explanation**

Use normalization before validation, keep callbacks local/cohesive, and use after_commit/outbox for external side effects. Callback APIs differ between model and controller contexts and are not interchangeable.

**Practical example**

```ruby
before_validation :normalize_email
private
def normalize_email
  self.email = email&.strip&.downcase
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00645 — [fifteen.txt:84–85](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)


---

<a id="b-0087"></a>

### B-0087 — What are disadvantages of using ORM?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are disadvantages of using ORM?

**Direct answer**

ORM can hide expensive queries, add allocation/translation overhead, and make complex database-specific operations less obvious.

**Detailed explanation**

Developers must learn both SQL and the ORM, inspect N+1 queries and plans, and sometimes use carefully bound SQL for specialized queries. ORM is not always slower than handwritten SQL; the generated query and workload decide.

**Practical example**

```ruby
posts = Post.all
posts.each { |post| puts post.author.name } # potential N+1
# Use preload/includes when those associations are needed.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01083 — [thirtytwo.txt:94–97](../ruby/thirtytwo.txt) (16) · [complete source](sources/thirtytwo.md)


---

<a id="b-0088"></a>

### B-0088 — What are Filters?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 6

**Interview question**

What are Filters?

**Direct answer**

Controller callbacks run before, around, or after actions; current APIs are before_action, around_action and after_action.

**Detailed explanation**

Use before_action for authentication or loading shared resources, and around_action for logic that wraps the action and yields. Rendering or redirecting from a before callback halts the remaining action chain, but does not automatically stop Ruby statements within that same method. Use return where needed.

**Practical example**

```ruby
before_action :require_login
private
def require_login
  return if current_user
  redirect_to login_path
end
```

**Important points and follow-ups**

- Older before_filter/after_filter names are historical.
- Reference: https://guides.rubyonrails.org/active_record_callbacks.html
- before_filter and related filter names are historical APIs.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Ruby public visibility does not bypass authentication callbacks; routes, not a default action verb, decide HTTP access.
- Do not expose destructive database administration through a request route; use controlled operational tasks. The example reset_database call is not established as a supported standalone public API.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Qualified legacy filter names with current before_action/after_action/around_action APIs.

**Source references**

- SRC-00380 — [ten.txt:64–67](../ruby/ten.txt) (9) · [complete source](sources/ten.md)
- SRC-00768 — [thirtyeight.txt:130–131](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00797 — [thirtyeight.txt:200–201](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01067 — [thirtysix.txt:630–720](../ruby/thirtysix.txt) (15) · [complete source](sources/thirtysix.md)
- SRC-01262 — [twentyfive.txt:407–415](../ruby/twentyfive.txt) (64) · [complete source](sources/twentyfive.md)
- SRC-01420 — [twentythree.txt:186–195](../ruby/twentythree.txt) (Q28) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00380 (ten.txt)</summary>

**Original prompt:** What are filters in Rails?

**Answer:** Controller callbacks run before, after or around an action. Use before_action, after_action and around_action in modern Rails.

before_action commonly loads context or authenticates. An around callback must yield to run the action and can use ensure for cleanup. after_action is not a substitute for ensure on every exception path, and a callback that renders or redirects can halt later action processing.

```ruby
before_action :authenticate_user!
around_action :track_request
def track_request
  yield
ensure
  Rails.logger.info("request finished")
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00768 (thirtyeight.txt)</summary>

**Original prompt:** What is a filter in Ruby on Rails?

**Answer:** A controller filter is now called a controller callback, such as before_action, after_action or around_action.

before_action is useful for authentication or loading an authorized resource. around_action wraps the action and must yield. after_action observes a successfully processed action and should not be mistaken for guaranteed cleanup after exceptions. Old before_filter naming is legacy.

```ruby
before_action :require_admin!
private
def require_admin!
  head :forbidden unless current_user&.admin?
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00797 (thirtyeight.txt)</summary>

**Original prompt:** Give an example of a filter in Ruby on Rails.

**Answer:** A before_action can require an authenticated administrator before a controller action is permitted to run.

The callback centralizes a request-level policy; resource-specific authorization may still be required. Render or head sets the response and halts the before-action chain. Keep the authorization rule testable and do not rely on hiding UI links.

```ruby
before_action :require_admin!
private
def require_admin!
  head :forbidden unless current_user&.admin?
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01067 (thirtysix.txt)</summary>

**Original prompt:** What filters are available in Rails controllers and how do you use them?

**Answer:** Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.

Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.

```ruby
before_validation :normalize_name
private
def normalize_name
  self.name = name.to_s.strip
end
# External side effect after persistence:
# after_commit :enqueue_notification, on: :create
```

</details>


---

<a id="b-0089"></a>

### B-0089 — What are mass-assignment vulnerabilities and how are they prevented?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are mass-assignment vulnerabilities and how are they prevented?

**Direct answer**

Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.

**Detailed explanation**

Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.

**Practical example**

```ruby
def user_params
  params.require(:user).permit(:name, :email)
end
# Rails 8+: params.expect(user: [:name, :email])
# Ownership must still be checked: current_user.posts.find(params[:id])
```

**Important points and follow-ups**

- Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Source references**

- SRC-01336 — [twentysix.txt:81–84](../ruby/twentysix.txt) (22) · [complete source](sources/twentysix.md)


---

<a id="b-0090"></a>

### B-0090 — What are Rails validations, and why are they important?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

What are Rails validations, and why are they important?

**Direct answer**

Model validations check whether an object meets application rules before normal persistence; database constraints enforce integrity across every writer.

**Detailed explanation**

Use validates for presence, length, numericality and other checks. valid? populates errors without saving. save returns false for validation failure; save! raises. Bulk SQL operations such as update_all bypass validations and callbacks, so important constraints must also exist in the database.

**Practical example**

```ruby
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
user = User.new
user.valid? # false
user.errors.full_messages
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_validations.html

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00840 — [thirtyfive.txt:177–198](../ruby/thirtyfive.txt) (10) · [complete source](sources/thirtyfive.md)
- SRC-00874 — [thirtyfour.txt:43–43](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01091 — [thirtytwo.txt:125–127](../ruby/thirtytwo.txt) (24) · [complete source](sources/thirtytwo.md)
- SRC-01113 — [twenty.txt:106–118](../ruby/twenty.txt) (15) · [complete source](sources/twenty.md)
- SRC-01276 — [twentyfive.txt:523–529](../ruby/twentyfive.txt) (78) · [complete source](sources/twentyfive.md)


---

<a id="b-0091"></a>

### B-0091 — What are some common anti-patterns you’ve seen in Rails apps?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are some common anti-patterns you’ve seen in Rails apps?

**Direct answer**

Organize code around cohesive business responsibilities, keep request coordination small, and add explicit service, query, form or policy objects when they clarify real complexity.

**Detailed explanation**

Avoid replacing every method with a pattern just to satisfy a slogan. Establish clear module boundaries and dependency direction, test the boundaries, monitor coupling and use automated formatting/static analysis. Engines are useful for reusable bounded components but add integration cost. State what changed in a real project and why it improved maintainability.

**Practical example**

```text
app/services/checkout.rb
app/queries/recent_orders.rb
app/policies/order_policy.rb
app/models/order.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01342 — [twentysix.txt:101–103](../ruby/twentysix.txt) (28) · [complete source](sources/twentysix.md)


---

<a id="b-0092"></a>

### B-0092 — What are some disadvantages (real and potential)?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are some disadvantages (real and potential)?

**Direct answer**

Runtime interface mistakes may appear only on an exercised path, and performance cannot be predicted solely from the language’s typing model.

**Detailed explanation**

Duck typing is flexible, but an object can lack a required method or return a surprising value. Tests and explicit contracts help. Profile the actual implementation and workload before optimizing; Ruby implementations and JIT options differ. The source’s Ruby-versus-Java speed claim is not universally valid.

**Practical example**

```ruby
empty?(Object.new) # NoMethodError when #size is absent
# Test the intended protocol, including invalid inputs.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00682 — [sixteen.txt:305–308](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)


---

<a id="b-0093"></a>

### B-0093 — What are the advanced features of the Ruby on Rails framework?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the advanced features of the Ruby on Rails framework?

**Direct answer**

Rails offers jobs, real-time channels, engines, rich persistence, caching and other facilities. Service objects are an application design pattern, not a built-in Rails subsystem.

**Detailed explanation**

Rails offers jobs, real-time channels, engines, rich persistence, caching and other facilities. Service objects are an application design pattern, not a built-in Rails subsystem. Framework/version and deployment backend determine actual behavior; avoid calling every application pattern a framework feature.

**Practical example**

```text
# Example app structure: ApplicationJob subclasses for jobs, ApplicationCable channels for real-time messaging.
```

**Important points and follow-ups**

- Framework/version and deployment backend determine actual behavior; avoid calling every application pattern a framework feature.

**Source references**

- SRC-00209 — [twelve.txt:7–9](../ruby/twelve.txt) · [complete source](sources/twelve.md)


---

<a id="b-0094"></a>

### B-0094 — What are the advantages of using ORM?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the advantages of using ORM?

**Direct answer**

ORM reduces repetitive persistence code, provides composable queries and associations, and improves developer productivity through a consistent object interface.

**Detailed explanation**

Parameter binding can reduce injection risk and adapters offer partial portability, but raw interpolation can still be unsafe. Evaluate maintainability and SQL behavior rather than assuming an ORM guarantees security or the fastest query.

**Practical example**

```ruby
User.where(active: true).order(:id).limit(20)
# Instead of hand-writing repetitive row-to-object mapping.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01082 — [thirtytwo.txt:88–93](../ruby/thirtytwo.txt) (15) · [complete source](sources/thirtytwo.md)


---

<a id="b-0095"></a>

### B-0095 — What are the benefits of using Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

What are the benefits of using Ruby on Rails?

**Direct answer**

Rails is a Ruby web application framework with conventions for routing, MVC, database access, views, jobs and other common application needs.

**Detailed explanation**

Convention over configuration provides sensible defaults; DRY encourages shared rules. These can speed development when the application fits the framework. Performance, security and scalability depend on implementation and operations, so the framework does not guarantee them. Domain models may use Active Record or ordinary Ruby objects.

**Practical example**

```bash
bin/rails new bookstore
cd bookstore
bin/rails generate model Book title:string
bin/rails db:migrate
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html
- Benchmark real workloads and understand generated code.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00751 — [thirtyeight.txt:72–73](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01200 — [twentyfive.txt:11–18](../ruby/twentyfive.txt) (2) · [complete source](sources/twentyfive.md)
- SRC-01300 — [twentynine.txt:19–21](../ruby/twentynine.txt) (2) · [complete source](sources/twentynine.md)
- SRC-01413 — [twentythree.txt:144–155](../ruby/twentythree.txt) (Q21) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00751 (thirtyeight.txt)</summary>

**Original prompt:** What are the benefits of using Ruby on Rails?

**Answer:** Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.

Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.

```bash
bin/rails new shop
cd shop
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
bin/rails server
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01300 (twentynine.txt)</summary>

**Original prompt:** What are some of the advantages of Ruby on Rails?

**Answer:** Rails’ integrated conventions and tools can reduce initial feature-development and integration work for a team comfortable with Ruby.

Scaffolding, Active Record, migrations, routing and testing support help deliver a web application quickly. Productivity is contextual: consider the team, workload and operational needs rather than assuming a framework guarantees business success or scalability.

```text
Build an initial CRUD feature with routes, a model migration and request tests, then replace generated defaults with the required authorization and domain behavior.
```

</details>


---

<a id="b-0096"></a>

### B-0096 — What are the common methods for error handling in Ruby and Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the common methods for error handling in Ruby and Rails?

**Direct answer**

Rescue expected exception types near a useful recovery boundary; controllers can translate application errors using rescue_from. Log context safely and re-raise unexpected failures.

**Detailed explanation**

Rescue expected exception types near a useful recovery boundary; controllers can translate application errors using rescue_from. Log context safely and re-raise unexpected failures. Avoid Exception-wide rescue, unbounded retries and logging secrets or personal data unnecessarily.

**Practical example**

```ruby
begin
  Integer("invalid")
rescue ArgumentError => e
  warn e.message
end
```

**Important points and follow-ups**

- Avoid Exception-wide rescue, unbounded retries and logging secrets or personal data unnecessarily.

**Source references**

- SRC-00215 — [twelve.txt:25–27](../ruby/twelve.txt) · [complete source](sources/twelve.md)


---

<a id="b-0097"></a>

### B-0097 — What are the components of Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the components of Rails?

**Direct answer**

MVC separates domain/data behavior in models, presentation in views, and request coordination in controllers.

**Detailed explanation**

The router dispatches a request to a controller action. The action loads or changes domain objects and renders a view or another representation, or returns a redirect. Active Record models often provide persistence, but a model need not inherit from Active Record. Views should avoid database queries, and complex workflows can live in services or other domain objects.

**Practical example**

```ruby
# app/controllers/posts_controller.rb
def show
  @post = Post.find(params[:id])
end
# app/views/posts/show.html.erb
<h1><%= @post.title %></h1>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Source references**

- SRC-01105 — [twenty.txt:61–67](../ruby/twenty.txt) (7) · [complete source](sources/twenty.md)


---

<a id="b-0098"></a>

### B-0098 — What are the different ways to handle internationalization (i18n) in a Rails application?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 6

**Interview question**

What are the different ways to handle internationalization (i18n) in a Rails application?

**Direct answer**

Use locale files and I18n.t for translations, and localization helpers for dates and numbers.

**Detailed explanation**

Choose a locale from an explicit allowlist and scope it to the request using I18n.with_locale. Setting thread-local locale without restoring it can leak state to another request on the same worker. Keep translation of interface strings separate from translation of stored user content.

**Practical example**

```ruby
around_action :with_locale
private
def with_locale(&action)
  locale = params[:locale].to_s.in?(%w[en fr]) ? params[:locale] : :en
  I18n.with_locale(locale, &action)
end
```

**Important points and follow-ups**

- pluralize is not a complete translation strategy; use locale-specific pluralization keys.
- Reference: https://guides.rubyonrails.org/i18n.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Smart quote characters in pasted examples need ordinary Ruby/YAML quoting before execution.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00847 — [thirtyfive.txt:260–266](../ruby/thirtyfive.txt) (07) · [complete source](sources/thirtyfive.md)
- SRC-00954 — [thirtyfour.txt:125–125](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01145 — [twenty.txt:422–426](../ruby/twenty.txt) (48) · [complete source](sources/twenty.md)
- SRC-01281 — [twentyfive.txt:568–584](../ruby/twentyfive.txt) (83) · [complete source](sources/twentyfive.md)
- SRC-01515 — [twentyseven.txt:603–609](../ruby/twentyseven.txt) (Open-72) · [complete source](sources/twentyseven.md)
- SRC-01534 — [twentyseven.txt:734–742](../ruby/twentyseven.txt) (Open-91) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00847 (thirtyfive.txt)</summary>

**Original prompt:** How does Rails support internationalization (i18n) and what is an example of using locale files for translations?

**Answer:** Rails uses the I18n library and locale data to translate messages and localize dates, numbers and other presentation.

Keep translations in config/locales, use t/l helpers, and select a permitted locale per request with I18n.with_locale so it does not leak between requests. Handle pluralization and missing translations, and keep timezone selection separate from language selection.

```ruby
# config/locales/en.yml
en:
  hello: "Hello"
# Ruby:
I18n.with_locale(:en) { I18n.t(:hello) }
```

</details>


---

<a id="b-0099"></a>

### B-0099 — What are the features of Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the features of Rails?

**Direct answer**

Rails provides MVC, Active Record, routing, views, migrations, generators, testing integrations, jobs, mail and real-time features with strong conventions.

**Detailed explanation**

Rails provides MVC, Active Record, routing, views, migrations, generators, testing integrations, jobs, mail and real-time features with strong conventions. Default environments are development, test and production. Framework conventions reduce configuration but do not remove it.

**Practical example**

```bash
rails new shop
# Run this in a terminal with the selected Rails version installed.
```

**Important points and follow-ups**

- Default environments are development, test and production. Framework conventions reduce configuration but do not remove it.

**Source references**

- SRC-00018 — [first.txt:146–154](../ruby/first.txt) (18) · [complete source](sources/first.md)


---

<a id="b-0100"></a>

### B-0100 — What are the key differences between Rails 4 and Rails 5?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the key differences between Rails 4 and Rails 5?

**Direct answer**

Rails 5 introduced major additions including Action Cable, API-only application generation, and ApplicationRecord as the application’s model base class.

**Detailed explanation**

Rails 5 also made belongs_to required by default for new applications, subject to configuration. Explain this as historical version knowledge; both lines are old, so a production upgrade needs current maintenance/security review rather than stopping at Rails 5.

**Practical example**

```ruby
# Rails 5+ application-level base model:
class User < ApplicationRecord
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/5_0_release_notes.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00883 — [thirtyfour.txt:52–52](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0101"></a>

### B-0101 — What are the major improvements introduced in Rails 8?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the major improvements introduced in Rails 8?

**Direct answer**

Rails 8 introduced modern defaults including Propshaft, Solid Queue, Solid Cache, Solid Cable, Kamal 2/Thruster deployment support and an authentication generator.

**Detailed explanation**

Differentiate a framework release’s features from a particular app’s settings: upgrading does not require every application to replace its existing adapters immediately. Solid Queue is database-backed and can use SQLite, PostgreSQL or MySQL. Confirm Ruby and database requirements against the chosen Rails minor version.

**Practical example**

```bash
bin/rails generate authentication
# New applications can use the database-backed Solid adapters without Redis.
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/8_0_release_notes.html

**Source references**

- SRC-01151 — [twenty.txt:458–468](../ruby/twenty.txt) (54) · [complete source](sources/twenty.md)


---

<a id="b-0102"></a>

### B-0102 — What are the three components of Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 23

**Interview question**

What are the three components of Ruby on Rails?

**Direct answer**

MVC separates domain data and rules in models, presentation in views, and HTTP coordination in controllers.

**Detailed explanation**

A request passes through Rack middleware and routing to a controller action. The controller authorizes the operation, invokes models or services, and renders a response, often using a view. Database-backed models use Active Record, while JSON APIs may render without an HTML view. Keep domain operations reusable outside controllers.

**Practical example**

```ruby
# config/routes.rb
resources :articles, only: :show
# ArticlesController#show
@article = Article.find(params[:id])
# app/views/articles/show.html.erb
# <%= @article.title %>
```

**Important points and follow-ups**

- MVC does not require every business operation to live in a single large model.
- MVC separates responsibilities but does not prescribe that every rule lives in a single Active Record class.
- Reference: https://guides.rubyonrails.org/getting_started.html
- A real project example should describe your own work; source anecdotes are illustrative only.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00041 — [first.txt:281–283](../ruby/first.txt) (11) · [complete source](sources/first.md)
- SRC-00370 — [nine.txt:805–813](../ruby/nine.txt) (99) · [complete source](sources/nine.md)
- SRC-00373 — [ten.txt:33–40](../ruby/ten.txt) (2) · [complete source](sources/ten.md)
- SRC-00642 — [fifteen.txt:81–81](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00718 — [thirty.txt:135–140](../ruby/thirty.txt) (34) · [complete source](sources/thirty.md)
- SRC-00748 — [thirtyeight.txt:66–67](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00749 — [thirtyeight.txt:68–69](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00828 — [thirtyfive.txt:78–83](../ruby/thirtyfive.txt) (08) · [complete source](sources/thirtyfive.md)
- SRC-00895 — [thirtyfour.txt:65–65](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00993 — [thirtyone.txt:40–50](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01003 — [thirtyone.txt:244–254](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01013 — [thirtyone.txt:586–596](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01031 — [thirtyseven.txt:64–70](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01054 — [thirtysix.txt:41–85](../ruby/thirtysix.txt) (2) · [complete source](sources/thirtysix.md)
- SRC-01076 — [thirtytwo.txt:70–72](../ruby/thirtytwo.txt) (9) · [complete source](sources/thirtytwo.md)
- SRC-01100 — [twenty.txt:27–34](../ruby/twenty.txt) (2) · [complete source](sources/twenty.md)
- SRC-01194 — [twentyeight.txt:369–377](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01201 — [twentyfive.txt:19–25](../ruby/twentyfive.txt) (3) · [complete source](sources/twentyfive.md)
- SRC-01363 — [twentytwo.txt:260–266](../ruby/twentytwo.txt) (18) · [complete source](sources/twentytwo.md)
- SRC-01407 — [twentythree.txt:92–113](../ruby/twentythree.txt) (Q15) · [complete source](sources/twentythree.md)
- SRC-01409 — [twentythree.txt:117–126](../ruby/twentythree.txt) (Q17) · [complete source](sources/twentythree.md)
- SRC-01445 — [twentyseven.txt:30–34](../ruby/twentyseven.txt) (Open-2) · [complete source](sources/twentyseven.md)
- SRC-01473 — [twentyseven.txt:243–247](../ruby/twentyseven.txt) (Open-30) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00041 (first.txt)</summary>

**Original prompt:** Explain the model-view-controller (MVC) architecture in Ruby on Rails.

**Answer:** MVC separates domain/data behavior in models, presentation in views and request coordination in controllers. The router selects an action before this flow.

The model-view-controller (MVC) architecture is a design pattern commonly used in web development, including Ruby on Rails. Here, the model represents the application's data and business logic, and the view handles the presentation and user interface. The controller acts as an intermediary between the model and the view, handling user input, data manipulation, and flow control. This separation of concerns makes applications more maintainable and scalable.

```text
# Request: GET /products/1 -> ProductsController#show
# Model: Product.find(1) -> View: products/show.html.erb
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00370 (nine.txt)</summary>

**Original prompt:** How does Ruby on Rails use the Model View Controller (MVC) framework?

**Answer:** Rails is a Ruby web framework following Model–View–Controller and convention over configuration. Models represent domain behavior, controllers handle HTTP requests, and views present responses.

Active Record supplies database mapping for models that use it; domain models need not all inherit from Active Record. Routing selects a controller action based on both path and HTTP method. Controllers coordinate work and render HTML, JSON or other responses, while keeping substantial business rules in reusable model or application-service code.

```ruby
# config/routes.rb
resources :articles, only: [:index, :show]
# GET /articles/5 routes to ArticlesController#show
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00642 (fifteen.txt)</summary>

**Original prompt:** Explain MVC architecture in Ruby on Rails with an example.

**Answer:** MVC separates domain/data behavior in models, presentation in views, and request coordination in controllers.

The router dispatches a request to a controller action. The action loads or changes domain objects and renders a view or another representation, or returns a redirect. Active Record models often provide persistence, but a model need not inherit from Active Record. Views should avoid database queries, and complex workflows can live in services or other domain objects.

```ruby
# app/controllers/posts_controller.rb
def show
  @post = Post.find(params[:id])
end
# app/views/posts/show.html.erb
<h1><%= @post.title %></h1>
```

</details>


---

<a id="b-0103"></a>

### B-0103 — What are the two guiding principles of the Rails framework?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What are the two guiding principles of the Rails framework?

**Direct answer**

Convention over configuration supplies predictable defaults; DRY avoids duplicating the same knowledge across the application.

**Detailed explanation**

For example, User maps to users and UsersController conventionally renders views under users. Configure exceptions explicitly. DRY is about keeping one authoritative rule, not forcing unrelated code into a shared abstraction solely because two lines look alike.

**Practical example**

```ruby
class User < ApplicationRecord
  # Convention: users table, id primary key
end
# Exception:
class LegacyUser < ApplicationRecord
  self.table_name = "people_archive"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01106 — [twenty.txt:68–72](../ruby/twenty.txt) (8) · [complete source](sources/twenty.md)


---

<a id="b-0104"></a>

### B-0104 — What could a developer do to address these disadvantages?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What could a developer do to address these disadvantages?

**Direct answer**

Use representative tests, explicit interface expectations where useful, optional static checking and profiling of actual bottlenecks.

**Detailed explanation**

Test behavior with compatible and incompatible values instead of scattering respond_to? checks without a policy. Tools such as Benchmark and an allocation/CPU profiler can identify costs. A runtime guard can improve an error message but is not a substitute for validating the method’s complete contract.

**Practical example**

```ruby
require "benchmark"
puts Benchmark.measure { 100_000.times { [1, 2, 3].size } }
```

**Important points and follow-ups**

- Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.

**Source references**

- SRC-00683 — [sixteen.txt:309–318](../ruby/sixteen.txt) · [complete source](sources/sixteen.md)


---

<a id="b-0105"></a>

### B-0105 — What do you mean by Concerns in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 11

**Interview question**

What do you mean by Concerns in Rails?

**Direct answer**

A Rails concern is a module used to share a cohesive behavior; ActiveSupport::Concern adds inclusion hooks and class-method support.

**Detailed explanation**

Place model or controller concerns in their conventional directories. Use included for declarations needed on the including class, class_methods for class-level behavior, and instance methods for record/controller behavior. Concerns can reduce duplication, but a module that depends on many hidden methods can increase coupling.

**Practical example**

```ruby
module Publishable
  extend ActiveSupport::Concern
  included do
    scope :published, -> { where(published: true) }
  end
  def publish!
    update!(published: true)
  end
end
# class Article < ApplicationRecord; include Publishable; end
```

**Important points and follow-ups**

- Prefer a meaningful responsibility over an arbitrary “miscellaneous” module.
- Reference: https://api.rubyonrails.org/classes/ActiveSupport/Concern.html
- Ruby keywords are lowercase; the source’s End does not close a definition.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected uppercase End and broken pasted code in the concern example.

**Source references**

- SRC-00382 — [ten.txt:77–79](../ruby/ten.txt) (11) · [complete source](sources/ten.md)
- SRC-00893 — [thirtyfour.txt:63–63](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00958 — [thirtyfour.txt:129–129](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01124 — [twenty.txt:189–207](../ruby/twenty.txt) (26) · [complete source](sources/twenty.md)
- SRC-01217 — [twentyfive.txt:98–100](../ruby/twentyfive.txt) (19) · [complete source](sources/twentyfive.md)
- SRC-01263 — [twentyfive.txt:416–432](../ruby/twentyfive.txt) (65) · [complete source](sources/twentyfive.md)
- SRC-01282 — [twentyfive.txt:585–601](../ruby/twentyfive.txt) (84) · [complete source](sources/twentyfive.md)
- SRC-01292 — [twentyfive.txt:677–679](../ruby/twentyfive.txt) (94) · [complete source](sources/twentyfive.md)
- SRC-01317 — [twentysix.txt:22–26](../ruby/twentysix.txt) (4) · [complete source](sources/twentysix.md)
- SRC-01435 — [twentythree.txt:501–545](../ruby/twentythree.txt) (Q43) · [complete source](sources/twentythree.md)
- SRC-01498 — [twentyseven.txt:445–449](../ruby/twentyseven.txt) (Open-55) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00382 (ten.txt)</summary>

**Original prompt:** What is a concern in Rails?

**Answer:** A concern is a module used to share a coherent slice of behavior; ActiveSupport::Concern helps express inclusion dependencies and class methods.

Use concerns when several models/controllers share the same domain capability. A concern does not automatically reduce coupling: a large module depending on hidden methods can be harder to reason about than explicit composition.

```ruby
module Archivable
  extend ActiveSupport::Concern
  included do
    scope :archived, -> { where(archived: true) }
  end
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00893 (thirtyfour.txt)</summary>

**Original prompt:** What are concerns in Rails, and how do you use them?

**Answer:** A concern is a module, often using ActiveSupport::Concern, that groups cohesive reusable behavior; services and other objects separate workflows that do not belong to persistence models.

A concern can add associations or callbacks through included blocks and class methods through class_methods. It remains coupled to its host and does not reduce the host’s responsibilities merely by moving code into another file. Use composition/delegation for business workflows, validators for validation policy and form objects for multi-model input. These are design choices, not mandatory Rails layers.

```ruby
module Noteable
  extend ActiveSupport::Concern
  included do
    has_many :notes, as: :noteable, dependent: :destroy
  end
end
```

</details>


---

<a id="b-0106"></a>

### B-0106 — What do you understand with the ERB in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What do you understand with the ERB in Ruby on Rails?

**Direct answer**

ERB means Embedded Ruby and evaluates Ruby within a text template.

**Detailed explanation**

<% ... %> executes without inserting its result; <%= ... %> inserts the expression result. Rails escapes normal string output to reduce XSS. <%+= and >% are not the correct tag delimiters.

**Practical example**

```erb
<% if @user %>
  <p>Hello <%= @user.name %></p>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00708 — [thirty.txt:100–102](../ruby/thirty.txt) (24) · [complete source](sources/thirty.md)


---

<a id="b-0107"></a>

### B-0107 — What does a Ruby on Rails developer do?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What does a Ruby on Rails developer do?

**Direct answer**

Ruby is a general-purpose language commonly used on the backend; Rails supports server-side full-stack web development and API-only applications.

**Detailed explanation**

A Rails developer may design APIs/data models, implement interfaces and domain rules, write tests, diagnose production problems and manage deployments. Demand, salaries and freelance suitability vary by market, date, project and experience. The salary figures in the pasted source are historical/unverified and are not presented as a current estimate.

**Practical example**

```text
Rails can render an ERB page or return JSON to a separate JavaScript/mobile client.
```

**Important points and follow-ups**

- Career/salary claims are contextual source material rather than stable technical facts; no current salary claim is made.

**Source references**

- SRC-01377 — [twentytwo.txt:369–379](../ruby/twentytwo.txt) (1) · [complete source](sources/twentytwo.md)


---

<a id="b-0108"></a>

### B-0108 — What does CRUD mean?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What does CRUD mean?

**Direct answer**

CRUD stands for Create, Read, Update and Delete, the basic operations on persisted data.

**Detailed explanation**

Active Record supplies create/new+save, find/where, update and destroy/delete. HTTP routes often map POST, GET, PATCH/PUT and DELETE to these operations; form-display actions new/edit are separate from the actual writes.

**Practical example**

```ruby
post = Post.create!(title: "Draft")
Post.find(post.id)
post.update!(title: "Published")
post.destroy!
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01090 — [thirtytwo.txt:122–124](../ruby/thirtytwo.txt) (23) · [complete source](sources/thirtytwo.md)


---

<a id="b-0109"></a>

### B-0109 — What does CRUD stand for? Give examples of how CRUD actions relate to a 'User' model.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What does CRUD stand for? Give examples of how CRUD actions relate to a 'User' model.

**Direct answer**

CRUD means Create, Read, Update and Delete; Active Record exposes these through persistence and query methods.

**Detailed explanation**

Use create!/save! and update! when validation failures should raise, and inspect errors when using non-bang methods. find raises for a missing ID; find_by can return nil. destroy runs destruction callbacks; delete bypasses them. Database constraints remain essential.

**Practical example**

```ruby
user = User.create!(name: "Ada", email: "ada@example.test")
user = User.find(user.id)
user.update!(name: "Grace")
user.destroy!
```

**Important points and follow-ups**

- The source’s User.query and db.session snippets are Python/SQLAlchemy, not Rails.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01487 — [twentyseven.txt:347–366](../ruby/twentyseven.txt) (Open-44) · [complete source](sources/twentyseven.md)


---

<a id="b-0110"></a>

### B-0110 — What exactly are the pre-software requirements for developing a project with Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What exactly are the pre-software requirements for developing a project with Ruby on Rails?

**Direct answer**

Install compatible Ruby/Rails and generate the application with rails new, then prepare the database and start the development server.

**Detailed explanation**

Select the database with -d and inspect rails new --help for options supported by the installed version. Modern default servers use Puma; WEBrick is historical. JavaScript options change by Rails version; --dev is not a web-server selector. An API-only or --skip-active-record application has different defaults.

**Practical example**

```bash
rails new shop -d postgresql
cd shop
bin/rails db:prepare
bin/rails server -p 3000
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.

**Source references**

- SRC-00716 — [thirty.txt:127–129](../ruby/thirty.txt) (32) · [complete source](sources/thirty.md)


---

<a id="b-0111"></a>

### B-0111 — What experience is required for a senior Rails developer?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What experience is required for a senior Rails developer?

**Direct answer**

Evaluate demonstrated technical judgment, project responsibility, communication and practical problem-solving rather than treating years of experience as a fixed skill score.

**Detailed explanation**

Use a consistent job-relevant rubric, realistic coding/debugging exercises and discussion of previous work. Seniority varies by organization; a source estimate such as four to seven years is not a technical requirement or universal hiring rule. Keep interviews accessible and avoid unnecessary repeated assessments.

**Practical example**

```text
Rubric example: identify the root cause of an N+1 endpoint, implement a fix, verify query behavior and explain the chosen trade-offs.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00668 — [fifteen.txt:242–244](../ruby/fifteen.txt) (3) · [complete source](sources/fifteen.md)


---

<a id="b-0112"></a>

### B-0112 — What happen if you try to create a column named id which is not the primary key?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What happen if you try to create a column named id which is not the primary key?

**Direct answer**

A non-primary-key column named id conflicts with Active Record’s id abstraction; avoid that schema when possible or use id_value to access that column.

**Detailed explanation**

The issue is specifically a column called id that is not the model’s primary key, rather than a prohibition on ordinary non-primary-key columns. Migrations create an id primary key by default; disable the generated primary key with id: false before defining a different layout.

**Practical example**

```text
create_table :legacy_rows, id: false do |t|
  t.string :external_key, null: false
  t.string :id
end
```

**Important points and follow-ups**

- Check the installed Rails version when using legacy primary keys or composite keys.

**Source references**

- SRC-01089 — [thirtytwo.txt:119–121](../ruby/thirtytwo.txt) (22) · [complete source](sources/thirtytwo.md)


---

<a id="b-0113"></a>

### B-0113 — What is a plugin in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is a plugin in Ruby on Rails?

**Direct answer**

A gem is a Ruby package; a Rails plugin adds Rails-specific behavior and is commonly distributed as a gem with a railtie or engine.

**Detailed explanation**

The historical distinction between vendor/plugins and globally installed gems does not describe modern Bundler-based Rails projects. Dependency versions and load paths are selected per application bundle, even when installed gems share disk storage.

**Practical example**

```text
Gemfile → gem dependency → optional Railtie/Engine hooks into the Rails application
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00753 — [thirtyeight.txt:76–77](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0114"></a>

### B-0114 — What is a rack?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is a rack?

**Direct answer**

Rack defines the Ruby interface between web servers and web applications/middleware.

**Detailed explanation**

A Rack application responds to call(env) with a status, headers and body. Middleware wraps another Rack application to process requests/responses. Rails is a Rack application, and Puma is a server able to host Rack applications. Rack is an interface and ecosystem, not a transparent interchange of arbitrary servers at runtime.

**Practical example**

```ruby
app = ->(env) { [200, {"content-type" => "text/plain"}, ["Hello"]] }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01049 — [thirtyseven.txt:195–199](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0115"></a>

### B-0115 — What is a Rails model, and what does it do?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

What is a Rails model, and what does it do?

**Direct answer**

A Rails model is a Ruby object representing domain data and behavior; a database-backed model normally inherits from ApplicationRecord.

**Detailed explanation**

Migrations define database columns and Rails exposes typed attribute methods from the schema. Models can declare validations, associations, scopes and domain operations. Non-persistent models can use Active Model, so the term model is broader than a database table.

**Practical example**

```ruby
class Product < ApplicationRecord
  validates :name, presence: true
  validates :price, numericality: { greater_than: 0 }
end
# products table: name:string, price:decimal
```

**Important points and follow-ups**

- On live large tables, assess locking and data-backfill behavior separately.
- Use a decimal or integer minor units for money rather than a binary float.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00408 — [ten.txt:195–200](../ruby/ten.txt) (37) · [complete source](sources/ten.md)
- SRC-01447 — [twentyseven.txt:40–51](../ruby/twentyseven.txt) (Open-4) · [complete source](sources/twentyseven.md)
- SRC-01454 — [twentyseven.txt:102–106](../ruby/twentyseven.txt) (Open-11) · [complete source](sources/twentyseven.md)
- SRC-01477 — [twentyseven.txt:273–284](../ruby/twentyseven.txt) (Open-34) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00408 (ten.txt)</summary>

**Original prompt:** How would you create a simple model in Rails?

**Answer:** Generate the model and migration, then apply the migration and inspect the resulting schema.

A model generator does not automatically create a fully designed domain or a safe production migration. Add appropriate validations, constraints and associations according to the requirements.

```bash
bin/rails generate model User name:string email:string
bin/rails db:migrate
```

</details>


---

<a id="b-0116"></a>

### B-0116 — What is a serializer in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is a serializer in Rails?

**Direct answer**

JSON is a data interchange format; Rails can render structured JSON directly or use a chosen serializer/template layer.

**Detailed explanation**

Expose an explicit public representation so sensitive database fields do not leak. ActiveModel::Serializer is supplied by a separate library, not a mandatory Rails built-in serializer. Include appropriate status codes, pagination and version/error contracts for APIs.

**Practical example**

```text
render json: { id: @user.id, name: @user.name }, status: :ok
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- ActiveModel::Serializer belongs to an optional external library; render json and other representations do not require it.

**Source references**

- SRC-01297 — [twentyfive.txt:699–707](../ruby/twentyfive.txt) (99) · [complete source](sources/twentyfive.md)


---

<a id="b-0117"></a>

### B-0117 — What is Callback in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 9

**Interview question**

What is Callback in Ruby on Rails?

**Direct answer**

Active Record callbacks hook into validation, saving, creation, updating, destruction and loading; transaction callbacks run after commit or rollback.

**Detailed explanation**

Create and update save flows validate, run before/around save callbacks, then operation-specific callbacks, followed by after_save. Destroy has its own callback chain. around callbacks wrap their operation and must yield. after_find and after_initialize cover loading/instantiation. Bulk APIs can bypass callback chains.

**Practical example**

```ruby
class Post < ApplicationRecord
  before_validation :normalize_title
  after_create_commit :announce
  private
  def normalize_title = self.title = title.to_s.strip
  def announce = AnnouncementJob.perform_later(id)
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_callbacks.html
- Use throw :abort to halt a before callback intentionally.
- Avoid hiding large multi-step workflows in callbacks.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Qualified callback coverage: delete and bulk methods can bypass lifecycle callbacks.

**Source references**

- SRC-00770 — [thirtyeight.txt:134–135](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01009 — [thirtyone.txt:445–464](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01018 — [thirtyone.txt:654–709](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01034 — [thirtyseven.txt:86–94](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01074 — [thirtytwo.txt:55–66](../ruby/thirtytwo.txt) (7) · [complete source](sources/thirtytwo.md)
- SRC-01092 — [thirtytwo.txt:128–130](../ruby/thirtytwo.txt) (25) · [complete source](sources/thirtytwo.md)
- SRC-01208 — [twentyfive.txt:47–49](../ruby/twentyfive.txt) (10) · [complete source](sources/twentyfive.md)
- SRC-01268 — [twentyfive.txt:471–481](../ruby/twentyfive.txt) (70) · [complete source](sources/twentyfive.md)
- SRC-01426 — [twentythree.txt:269–273](../ruby/twentythree.txt) (Q34) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00770 (thirtyeight.txt)</summary>

**Original prompt:** Explain what callbacks are in Ruby on Rails.

**Answer:** Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.

Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.

```ruby
before_validation :normalize_name
private
def normalize_name
  self.name = name.to_s.strip
end
# External side effect after persistence:
# after_commit :enqueue_notification, on: :create
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01034 (thirtyseven.txt)</summary>

**Original prompt:** What are callbacks?

**Answer:** A model callback hooks into persistence/validation lifecycle events; controller callbacks run before, after or around a request action.

Use normalization before validation, keep callbacks local/cohesive, and use after_commit/outbox for external side effects. Callback APIs differ between model and controller contexts and are not interchangeable.

```ruby
before_validation :normalize_email
private
def normalize_email
  self.email = email&.strip&.downcase
end
```

</details>


---

<a id="b-0118"></a>

### B-0118 — What is CRUD in the context of Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is CRUD in the context of Rails?

**Direct answer**

CRUD stands for create, read, update and delete. Rails resource routes map these operations into conventional controller actions.

**Detailed explanation**

A resource has index/show for reads, create for insertion, update for changes and destroy for removal; new/edit typically display forms. HTTP method semantics matter: GET should not perform destructive mutations. Validation and authorization still apply to each operation.

**Practical example**

```ruby
resources :posts
# POST /posts -> create
# PATCH /posts/:id -> update
# DELETE /posts/:id -> destroy
```

**Important points and follow-ups**

- Database delete and Rails destroy have different callback behavior.

**Source references**

- SRC-00381 — [ten.txt:68–76](../ruby/ten.txt) (10) · [complete source](sources/ten.md)


---

<a id="b-0119"></a>

### B-0119 — What is CRUD, and how is it implemented in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is CRUD, and how is it implemented in Rails?

**Direct answer**

CRUD stands for Create, Read, Update and Delete, the basic operations on persisted data.

**Detailed explanation**

Active Record supplies create/new+save, find/where, update and destroy/delete. HTTP routes often map POST, GET, PATCH/PUT and DELETE to these operations; form-display actions new/edit are separate from the actual writes.

**Practical example**

```ruby
post = Post.create!(title: "Draft")
Post.find(post.id)
post.update!(title: "Published")
post.destroy!
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01062 — [thirtysix.txt:411–443](../ruby/thirtysix.txt) (10) · [complete source](sources/thirtysix.md)


---

<a id="b-0120"></a>

### B-0120 — What is PORO?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is PORO?

**Direct answer**

PORO means Plain Old Ruby Object: a regular Ruby object without a framework-specific inheritance requirement.

**Detailed explanation**

Use it for value objects, services or domain behavior that does not need Active Record persistence. PORO is a design description, not a Ruby keyword, and such an object can still collaborate with Rails when its dependencies are explicit.

**Practical example**

```ruby
class Price
  attr_reader :cents
  def initialize(cents) = @cents = Integer(cents)
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01051 — [thirtyseven.txt:211–217](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01285 — [twentyfive.txt:618–620](../ruby/twentyfive.txt) (87) · [complete source](sources/twentyfive.md)


---

<a id="b-0121"></a>

### B-0121 — What is Rails good at?  What is it not so good at?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Rails good at?  What is it not so good at?

**Direct answer**

Rails is strong at convention-driven database web applications and APIs. Workloads demanding tiny runtimes, hard real-time behavior or specialist numerical kernels need separate evaluation.

**Detailed explanation**

Rails is strong at convention-driven database web applications and APIs. Workloads demanding tiny runtimes, hard real-time behavior or specialist numerical kernels need separate evaluation. This is an architectural recommendation with tradeoffs, not a guarantee that Rails cannot handle a particular scale.

**Practical example**

```text
# Scenario: Rails owns an order API; specialized CPU-intensive processing runs in a measured worker component.
```

**Important points and follow-ups**

- This is an architectural recommendation with tradeoffs, not a guarantee that Rails cannot handle a particular scale.

**Corrections and source limitations**

- Original answer is absent or incomplete; the answer below is an authored completion.
- Original incomplete/outdated claim corrected: Rails is strong at convention-driven database web applications and APIs. Workloads demanding tiny runtimes, hard real-time behavior or specialist numerical kernels need separate evaluation.

**Source references**

- SRC-00174 — [five.txt:61–61](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="b-0122"></a>

### B-0122 — What is Rails middleware, and how does it work?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Rails middleware, and how does it work?

**Direct answer**

Rails uses a Rack middleware stack, where each layer can inspect a request, call the next application and modify the response.

**Detailed explanation**

A Rack-compatible application normally responds to call(env) with status, headers and body. Middleware can implement request IDs, logging, sessions or policy checks, and order determines which behavior wraps which. Use bin/rails middleware to inspect the deployed stack; not every concern belongs in middleware.

**Practical example**

```ruby
class RequestTimer
  def initialize(app) = @app = app
  def call(env)
    started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    @app.call(env)
  ensure
    elapsed = Process.clock_gettime(Process::CLOCK_MONOTONIC) - started
    warn "request seconds=#{elapsed}"
  end
end
```

**Important points and follow-ups**

- Preserve the body contract and close behavior when wrapping streaming responses.

**Source references**

- SRC-00407 — [ten.txt:189–194](../ruby/ten.txt) (36) · [complete source](sources/ten.md)


---

<a id="b-0123"></a>

### B-0123 — What is Rails Scaffolding?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 5

**Interview question**

What is Rails Scaffolding?

**Direct answer**

A Rails scaffold generator creates an initial model, migration, controller, views, routes, and tests for resource CRUD.

**Detailed explanation**

It accelerates an application’s first implementation, but generated code still needs authorization, domain validation, accessible views, security review, and meaningful tests. The generated files vary with Rails version and installed generators.

**Practical example**

```bash
bin/rails generate scaffold Article title:string body:text
bin/rails db:migrate
```

**Important points and follow-ups**

- Review generated migrations and routes before applying them.
- Inspect generated routes and permitted parameters before exposing CRUD.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00400 — [ten.txt:158–160](../ruby/ten.txt) (29) · [complete source](sources/ten.md)
- SRC-00746 — [thirtyeight.txt:62–63](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00747 — [thirtyeight.txt:64–65](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00879 — [thirtyfour.txt:48–48](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01405 — [twentythree.txt:78–85](../ruby/twentythree.txt) (Q13) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00400 (ten.txt)</summary>

**Original prompt:** What are Scaffolds in Rails?

**Answer:** The scaffold generator creates a model/migration, controller, routes, views and tests for a basic resource.

It is useful for a conventional starting point, but generated code still needs authorization, permitted attributes, user-facing design and production-specific behavior. The exact files vary by Rails version and application mode.

```bash
bin/rails generate scaffold Article title:string body:text
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00746 (thirtyeight.txt)</summary>

**Original prompt:** Explain what “scaffolding” is.

**Answer:** Scaffolding generates starter model, migration, controller, view and test code for a resource’s CRUD behavior.

Modern Rails generates files that you review and customize. Historical dynamic scaffolding generated behavior at runtime and is not a current standard feature. Add authorization, valid input rules, suitable constraints and intentional UI behavior before relying on generated code in production.

```bash
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
```

</details>


---

<a id="b-0124"></a>

### B-0124 — What is Rails? Explain it like I'm five.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Rails? Explain it like I'm five.

**Direct answer**

Rails is a Ruby web application framework with conventions for routing, MVC, database access, views, jobs and other common application needs.

**Detailed explanation**

Convention over configuration provides sensible defaults; DRY encourages shared rules. These can speed development when the application fits the framework. Performance, security and scalability depend on implementation and operations, so the framework does not guarantee them. Domain models may use Active Record or ordinary Ruby objects.

**Practical example**

```bash
bin/rails new bookstore
cd bookstore
bin/rails generate model Book title:string
bin/rails db:migrate
```

**Important points and follow-ups**

- Benchmark real workloads and understand generated code.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01444 — [twentyseven.txt:25–29](../ruby/twentyseven.txt) (Open-1) · [complete source](sources/twentyseven.md)


---

<a id="b-0125"></a>

### B-0125 — What is Rails? Explain it like you're talking to a friend who knows nothing about web development.

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Rails? Explain it like you're talking to a friend who knows nothing about web development.

**Direct answer**

Rails is a Ruby web application framework with conventions for routing, MVC, database access, views, jobs and other common application needs.

**Detailed explanation**

Convention over configuration provides sensible defaults; DRY encourages shared rules. These can speed development when the application fits the framework. Performance, security and scalability depend on implementation and operations, so the framework does not guarantee them. Domain models may use Active Record or ordinary Ruby objects.

**Practical example**

```bash
bin/rails new bookstore
cd bookstore
bin/rails generate model Book title:string
bin/rails db:migrate
```

**Important points and follow-ups**

- Benchmark real workloads and understand generated code.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01472 — [twentyseven.txt:238–242](../ruby/twentyseven.txt) (Open-29) · [complete source](sources/twentyseven.md)


---

<a id="b-0126"></a>

### B-0126 — What is Rails' "DRY" principle, and how is it implemented?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Rails' "DRY" principle, and how is it implemented?

**Direct answer**

DRY means keeping one authoritative representation of each piece of knowledge so changes do not require synchronizing multiple copies.

**Detailed explanation**

In Rails this can mean a model validation, a helper for repeated presentation, a shared partial, or a service for a repeated operation. Similar-looking code with different reasons to change should not be coupled prematurely.

**Practical example**

```ruby
# Shared presentation:
<%= render "users/form", user: @user %>
# Shared domain rule:
validates :email, presence: true
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00892 — [thirtyfour.txt:62–62](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0127"></a>

### B-0127 — What is Ruby on Rails, and what are its main features?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is Ruby on Rails, and what are its main features?

**Direct answer**

Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.

**Detailed explanation**

Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.

**Practical example**

```bash
bin/rails new shop
cd shop
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
bin/rails server
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Asset behavior is version-specific: Rails 8 defaults to Propshaft; bundling/transpilation/minification may require separate tooling.

**Source references**

- SRC-00851 — [thirtyfour.txt:20–20](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00971 — [thirtyfour.txt:143–159](../ruby/thirtyfour.txt) (1) · [complete source](sources/thirtyfour.md)


---

<a id="b-0128"></a>

### B-0128 — What is Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 12

**Interview question**

What is Ruby on Rails?

**Direct answer**

Rails is a Ruby web application framework with conventions for routing, MVC, database access, views, jobs and other common application needs.

**Detailed explanation**

Convention over configuration provides sensible defaults; DRY encourages shared rules. These can speed development when the application fits the framework. Performance, security and scalability depend on implementation and operations, so the framework does not guarantee them. Domain models may use Active Record or ordinary Ruby objects.

**Practical example**

```bash
bin/rails new bookstore
cd bookstore
bin/rails generate model Book title:string
bin/rails db:migrate
```

**Important points and follow-ups**

- MVC separates responsibilities but does not prescribe that every rule lives in a single Active Record class.
- Reference: https://guides.rubyonrails.org/getting_started.html
- Benchmark real workloads and understand generated code.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00335 — [nine.txt:523–526](../ruby/nine.txt) (64) · [complete source](sources/nine.md)
- SRC-00372 — [ten.txt:30–32](../ruby/ten.txt) (1) · [complete source](sources/ten.md)
- SRC-00686 — [thirty.txt:10–14](../ruby/thirty.txt) (1) · [complete source](sources/thirty.md)
- SRC-00706 — [thirty.txt:94–96](../ruby/thirty.txt) (22) · [complete source](sources/thirty.md)
- SRC-00821 — [thirtyfive.txt:13–18](../ruby/thirtyfive.txt) (01) · [complete source](sources/thirtyfive.md)
- SRC-01025 — [thirtyseven.txt:22–28](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01053 — [thirtysix.txt:6–40](../ruby/thirtysix.txt) (1) · [complete source](sources/thirtysix.md)
- SRC-01099 — [twenty.txt:22–26](../ruby/twenty.txt) (1) · [complete source](sources/twenty.md)
- SRC-01199 — [twentyfive.txt:8–10](../ruby/twentyfive.txt) (1) · [complete source](sources/twentyfive.md)
- SRC-01299 — [twentynine.txt:16–18](../ruby/twentynine.txt) (1) · [complete source](sources/twentynine.md)
- SRC-01355 — [twentytwo.txt:220–222](../ruby/twentytwo.txt) (10) · [complete source](sources/twentytwo.md)
- SRC-01393 — [twentythree.txt:17–22](../ruby/twentythree.txt) (Q1) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00335 (nine.txt)</summary>

**Original prompt:** What Is Rails?

**Answer:** Rails is a Ruby web framework following Model–View–Controller and convention over configuration. Models represent domain behavior, controllers handle HTTP requests, and views present responses.

Active Record supplies database mapping for models that use it; domain models need not all inherit from Active Record. Routing selects a controller action based on both path and HTTP method. Controllers coordinate work and render HTML, JSON or other responses, while keeping substantial business rules in reusable model or application-service code.

```ruby
# config/routes.rb
resources :articles, only: [:index, :show]
# GET /articles/5 routes to ArticlesController#show
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00686 (thirty.txt)</summary>

**Original prompt:** Explain what is Ruby on Rails?

**Answer:** Ruby on Rails is a web application framework written in Ruby, with integrated MVC structure, routing, persistence, rendering, testing and jobs.

It follows convention over configuration and DRY. Rails is not a mixture of programming languages and is not itself a programming language. Describe productivity and operational trade-offs for the actual application.

```bash
rails new shop
cd shop
bin/rails db:prepare
bin/rails server
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00821 (thirtyfive.txt)</summary>

**Original prompt:** What is Ruby on Rails, and why is it popular for web development?

**Answer:** Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.

Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.

```bash
bin/rails new shop
cd shop
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
bin/rails server
```

</details>


---

<a id="b-0129"></a>

### B-0129 — What is Sharding, and how can it be implemented in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Sharding, and how can it be implemented in Rails?

**Direct answer**

Sharding splits data across independently addressed databases, usually by a routing key such as tenant. Rails supports multiple-database and horizontal-shard connection configuration.

**Detailed explanation**

Define shard connections and use connects_to/connected_to for the supported Rails version. The application must choose the correct shard consistently, handle migrations and operations on all shards and plan cross-shard reads. Transactions and foreign keys do not automatically span independent shards.

**Practical example**

```ruby
class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true
  connects_to shards: { default: { writing: :primary }, shard_one: { writing: :primary_shard_one } }
end
```

**Important points and follow-ups**

- Replication/read-role switching is related but is not the same as partitioning data.

**Source references**

- SRC-00396 — [ten.txt:141–143](../ruby/ten.txt) (25) · [complete source](sources/ten.md)


---

<a id="b-0130"></a>

### B-0130 — What is something you like about working with Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is something you like about working with Rails?

**Direct answer**

Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.

**Detailed explanation**

Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.

**Practical example**

```bash
bin/rails new shop
cd shop
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
bin/rails server
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Source references**

- SRC-01381 — [twentytwo.txt:389–391](../ruby/twentytwo.txt) (5) · [complete source](sources/twentytwo.md)


---

<a id="b-0131"></a>

### B-0131 — What is the difference between After_save and After_commit?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between After_save and After_commit?

**Direct answer**

after_save runs after a create/update save within its surrounding transaction; after_commit runs only when that transaction has committed, including configured destroy events.

**Detailed explanation**

The distinction is transaction timing, not just which operations trigger them. Work in after_save can still be rolled back by a later error. after_commit observes committed data, but its own failure cannot undo the commit. External side effects need retries or an outbox if delivery must be reliable.

**Practical example**

```ruby
class Order < ApplicationRecord
  after_create_commit :enqueue_receipt
  def enqueue_receipt
    ReceiptJob.perform_later(id)
  end
end
```

**Important points and follow-ups**

- after_commit does not make an external API and database update atomic.
- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected the missing transaction-timing distinction between after_save and after_commit.

**Source references**

- SRC-01424 — [twentythree.txt:256–258](../ruby/twentythree.txt) (Q32) · [complete source](sources/twentythree.md)


---

<a id="b-0132"></a>

### B-0132 — What is the difference between delete and destroy_all?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between delete and destroy_all?

**Direct answer**

delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.

**Detailed explanation**

destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.

**Practical example**

```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
Post.find(1).destroy
# Direct deletion bypasses those model callbacks:
Post.where(id: 2).delete_all
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01271 — [twentyfive.txt:501–506](../ruby/twentyfive.txt) (73) · [complete source](sources/twentyfive.md)


---

<a id="b-0133"></a>

### B-0133 — What is the difference between deleting and destroying?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the difference between deleting and destroying?

**Direct answer**

delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.

**Detailed explanation**

destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.

**Practical example**

```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
Post.find(1).destroy
# Direct deletion bypasses those model callbacks:
Post.where(id: 2).delete_all
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01037 — [thirtyseven.txt:107–113](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01241 — [twentyfive.txt:241–246](../ruby/twentyfive.txt) (43) · [complete source](sources/twentyfive.md)


---

<a id="b-0134"></a>

### B-0134 — What is the difference between dependent: :destroy and :delete?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between dependent: :destroy and :delete?

**Direct answer**

delete removes a row without model destruction callbacks; destroy instantiates/runs the destruction lifecycle and honors configured dependent behavior.

**Detailed explanation**

destroy does not mean validation occurs, and it does not automatically remove every associated row. dependent options and database foreign keys determine association handling. For has_many, dependent: :delete_all is a common direct-delete option; :delete is used only by association types that support it. destroy_all runs each record’s destroy callbacks, while delete_all issues direct SQL.

**Practical example**

```ruby
class Post < ApplicationRecord
  has_many :comments, dependent: :destroy
end
Post.find(1).destroy
# Direct deletion bypasses those model callbacks:
Post.where(id: 2).delete_all
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01126 — [twenty.txt:221–225](../ruby/twenty.txt) (28) · [complete source](sources/twenty.md)


---

<a id="b-0135"></a>

### B-0135 — What is the difference between has_many :through and has_and_belongs_to_many and which one is better?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

What is the difference between has_many :through and has_and_belongs_to_many and which one is better?

**Direct answer**

Use has_and_belongs_to_many for a simple many-to-many join table; use has_many :through when the relationship needs its own model, behavior, validations, or extra data.

**Detailed explanation**

Both need a database join structure. HABTM does not automatically create the table from model declarations; use a migration. With a join model, treat membership itself as an entity, such as Enrollment holding joined_at or status. A uniqueness index can prevent duplicate memberships.

**Practical example**

```ruby
class Enrollment < ApplicationRecord
  belongs_to :student
  belongs_to :course
end
class Student < ApplicationRecord
  has_many :enrollments
  has_many :courses, through: :enrollments
end
```

**Important points and follow-ups**

- Neither association is universally better.
- Reference: https://guides.rubyonrails.org/association_basics.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected the implication that declaring HABTM automatically creates its join table.

**Source references**

- SRC-00897 — [thirtyfour.txt:67–67](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01295 — [twentyfive.txt:690–695](../ruby/twentyfive.txt) (97) · [complete source](sources/twentyfive.md)
- SRC-01429 — [twentythree.txt:308–325](../ruby/twentythree.txt) (Q37) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00897 (thirtyfour.txt)</summary>

**Original prompt:** What is the difference between has many: through and has_and_belongs_to_many associations?

**Answer:** has_many :through uses an explicit join model; has_and_belongs_to_many uses a join table without a model for the relationship.

Use a join model when a relationship has attributes, validations, callbacks or its own identity. A HABTM join table conventionally has no id and contains the two foreign keys. Both sides still need appropriate database indexes and constraints.

```ruby
class User < ApplicationRecord
  has_many :memberships
  has_many :groups, through: :memberships
end
class Membership < ApplicationRecord
  belongs_to :user
  belongs_to :group
end
```

</details>


---

<a id="b-0136"></a>

### B-0136 — What is the difference between has_many and belongs_to?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between has_many and belongs_to?

**Direct answer**

Associations describe model relationships using belongs_to, has_one, has_many, has_many :through, has_one :through, or has_and_belongs_to_many.

**Detailed explanation**

A belongs_to normally places the foreign key on the declaring model; has_many places it on the associated rows. belongs_to alone does not imply a one-to-one relationship. Use a unique foreign-key index for a true one-to-one relationship. Migrations must create the required columns and constraints; declaring association macros alone does not alter the schema.

**Practical example**

```ruby
class Author < ApplicationRecord
  has_many :books
end
class Book < ApplicationRecord
  belongs_to :author
end
# books.author_id references authors.id
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/association_basics.html

**Source references**

- SRC-01111 — [twenty.txt:94–100](../ruby/twenty.txt) (13) · [complete source](sources/twenty.md)


---

<a id="b-0137"></a>

### B-0137 — What is the difference between link_to and button_to in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the difference between link_to and button_to in Rails?

**Direct answer**

link_to produces an anchor for navigation; button_to generates a form with a submit button and is suitable for state-changing actions.

**Detailed explanation**

An ordinary anchor makes a GET request. Rails-UJS and Turbo use different data attributes to issue other methods from links. Prefer button_to for deletion when possible, preserve CSRF protection, and use a 303 redirect after destructive form actions when appropriate.

**Practical example**

```erb
<%= link_to "Read", post_path(@post) %>
<%= button_to "Delete", post_path(@post), method: :delete %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00865 — [thirtyfour.txt:34–34](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00984 — [thirtyfour.txt:434–449](../ruby/thirtyfour.txt) (15) · [complete source](sources/thirtyfour.md)


---

<a id="b-0138"></a>

### B-0138 — What is the difference between Ruby and Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

What is the difference between Ruby and Ruby on Rails?

**Direct answer**

Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

**Detailed explanation**

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

**Practical example**

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

**Important points and follow-ups**

- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00852 — [thirtyfour.txt:21–21](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00972 — [thirtyfour.txt:160–176](../ruby/thirtyfour.txt) (2) · [complete source](sources/thirtyfour.md)
- SRC-01102 — [twenty.txt:40–50](../ruby/twenty.txt) (4) · [complete source](sources/twenty.md)


---

<a id="b-0139"></a>

### B-0139 — What is the difference between Ruby on Rails and Sinatra?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the difference between Ruby on Rails and Sinatra?

**Direct answer**

Rails supplies integrated full-stack conventions; Sinatra supplies a smaller Rack-oriented routing DSL. Either can serve APIs, and application size alone is not a strict rule.

**Detailed explanation**

Rails supplies integrated full-stack conventions; Sinatra supplies a smaller Rack-oriented routing DSL. Either can serve APIs, and application size alone is not a strict rule. Rails is also Rack-based; the source’s MVC-versus-Rack distinction compares different layers. Its User examples require explicit models, persistence and input validation.

**Practical example**

```ruby
require "sinatra"
get("/health") { "ok" }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- Rails is also Rack-based; the source’s MVC-versus-Rack distinction compares different layers. Its User examples require explicit models, persistence and input validation.

**Source references**

- SRC-00188 — [six.txt:1139–1224](../ruby/six.txt) (Q12) · [complete source](sources/six.md)


---

<a id="b-0140"></a>

### B-0140 — What is the difference between save and save!?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

What is the difference between save and save!?

**Direct answer**

The non-bang persistence method reports validation failure without raising; its bang counterpart raises an exception on failure.

**Detailed explanation**

save returns true or false and save! raises ActiveRecord::RecordInvalid for invalid data. create returns the instantiated object, which may be unpersisted; create! raises on validation failure. Database errors may raise even for non-bang calls, and callback aborts have their own failure behavior.

**Practical example**

```ruby
user = User.create(email: nil)
user.persisted? # false if email is required
User.create!(email: nil) # raises ActiveRecord::RecordInvalid
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01119 — [twenty.txt:155–159](../ruby/twenty.txt) (21) · [complete source](sources/twenty.md)
- SRC-01212 — [twentyfive.txt:62–67](../ruby/twentyfive.txt) (14) · [complete source](sources/twentyfive.md)
- SRC-01261 — [twentyfive.txt:401–406](../ruby/twentyfive.txt) (63) · [complete source](sources/twentyfive.md)


---

<a id="b-0141"></a>

### B-0141 — What is the difference between the Observers and Callbacks?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the difference between the Observers and Callbacks?

**Direct answer**

Callbacks run at defined model lifecycle points; observers separate reactions into another object. They are about responsibility placement, not a guaranteed difference in lifespan.

**Detailed explanation**

A callback is a lifecycle hook, while an observer is a separate object reacting to events. Neither is defined by being short-lived or long-lived. Rails 4 extracted Active Record observers from the framework into a separate gem. Prefer clearly owned transactional work and explicit events/jobs for cross-cutting side effects.

**Practical example**

```ruby
# Modern Rails lifecycle hook:
class Order < ApplicationRecord
  after_commit :publish_event, on: :create
  def publish_event; OrderCreatedJob.perform_later(id); end
end
```

**Important points and follow-ups**

- Rails observers were extracted from core; check the rails-observers gem for legacy applications. after_commit avoids publishing before commit, but reliable delivery still needs an outbox or equivalent.
- Verification: https://guides.rubyonrails.org/v4.0.0/4_0_release_notes.html
- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Corrections and source limitations**

- Source correction: A callback is a lifecycle hook, while an observer is a separate object reacting to events. Neither is defined by being short-lived or long-lived. Rails 4 extracted Active Record observers from the framework into a separate gem. Prefer clearly owned transactional work and explicit events/jobs for cross-cutting side effects.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-00010 — [first.txt:64–68](../ruby/first.txt) (10) · [complete source](sources/first.md)
- SRC-01371 — [twentytwo.txt:294–297](../ruby/twentytwo.txt) (8) · [complete source](sources/twentytwo.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01371 (twentytwo.txt)</summary>

**Original prompt:** What is the difference between observers and callbacks in Ruby on rails?

**Answer:** Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

</details>


---

<a id="b-0142"></a>

### B-0142 — What is the enum feature in Rails, and how do you use it?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the enum feature in Rails, and how do you use it?

**Direct answer**

Rails enum maps an attribute to named states backed by explicit integer or string values.

**Detailed explanation**

Use explicit mappings so adding or reordering names does not reinterpret existing database values. Modern Rails uses positional name/value arguments. Ruby itself has no general enum keyword corresponding to this Rails macro.

**Practical example**

```text
enum :status, { draft: 0, published: 1 }
post.published?
post.published!
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00928 — [thirtyfour.txt:98–98](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0143"></a>

### B-0143 — What is the naming convention in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

What is the naming convention in Ruby on Rails?

**Direct answer**

Rails conventionally maps a singular CamelCase model such as BookClub to a plural snake_case table such as book_clubs; controller classes usually use plural CamelCase names.

**Detailed explanation**

Methods, variables, and filenames use snake_case. Constants and class/module names begin with an uppercase letter. These are conventions, not universal restrictions: irregular inflections and explicit table names are supported. Zeitwerk expects the file path to match the constant it defines.

**Practical example**

```ruby
class BookClub < ApplicationRecord
end
# app/models/book_club.rb; table: book_clubs
# BookClubsController: app/controllers/book_clubs_controller.rb
```

**Important points and follow-ups**

- The correct paths are app/controllers and app/helpers.
- Keep the model/table convention separate from association naming.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00794 — [thirtyeight.txt:194–195](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01301 — [twentynine.txt:22–29](../ruby/twentynine.txt) (3) · [complete source](sources/twentynine.md)
- SRC-01347 — [twentytwo.txt:18–23](../ruby/twentytwo.txt) (2) · [complete source](sources/twentytwo.md)
- SRC-01394 — [twentythree.txt:23–28](../ruby/twentythree.txt) (Q2) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00794 (thirtyeight.txt)</summary>

**Original prompt:** Explain what naming conventions are in Rails.

**Answer:** Ruby classes/modules use CamelCase constants, methods/variables use snake_case, model names are singular and conventional table/controller names are plural.

For example, BlogPost maps to blog_posts and BlogPostsController. File paths follow underscored constant names for autoloading. Custom names are possible through explicit configuration; conventions reduce that configuration.

```text
app/models/blog_post.rb → BlogPost → blog_posts
app/controllers/blog_posts_controller.rb → BlogPostsController
```

</details>


---

<a id="b-0144"></a>

### B-0144 — What is the primary purpose of config.autoload_paths in a Rails application's config/application.rb file?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the primary purpose of config.autoload_paths in a Rails application's config/application.rb file?

**Direct answer**

Option 1: To specify directories that Rails should automatically load classes and modules from.

**Detailed explanation**

The correct choice is To specify directories that Rails should automatically load classes and modules from. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To specify directories that Rails should automatically load classes and modules from.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01566 — [twentyseven.txt:1078–1091](../ruby/twentyseven.txt) (MCQ-18) · [complete source](sources/twentyseven.md)


---

<a id="b-0145"></a>

### B-0145 — What is the purpose of a 'flash' message in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

What is the purpose of a 'flash' message in Rails?

**Direct answer**

flash carries temporary values across the current and next request, commonly for a one-time notice after a redirect.

**Detailed explanation**

Use flash.now when rendering in the current request so the message does not linger into a following request; use flash.keep to preserve it for another request. Rendering does not itself perform the same request-cycle transition as redirecting.

**Practical example**

```ruby
redirect_to articles_path, notice: "Saved"
# On validation failure with a render:
flash.now[:alert] = "Please fix the errors"
```

**Important points and follow-ups**

- Flash lifetime follows requests, not the number of view templates rendered.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html
- flash is normally available for the current and next request; use flash.now for a current render and flash.keep when preserving it further.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00829 — [thirtyfive.txt:84–98](../ruby/thirtyfive.txt) (09) · [complete source](sources/thirtyfive.md)
- SRC-00887 — [thirtyfour.txt:56–56](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01275 — [twentyfive.txt:520–522](../ruby/twentyfive.txt) (77) · [complete source](sources/twentyfive.md)
- SRC-01493 — [twentyseven.txt:406–410](../ruby/twentyseven.txt) (Open-50) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00829 (thirtyfive.txt)</summary>

**Original prompt:** What is the flash hash in Rails?

**Answer:** flash stores temporary messages available to the current and following request; use flash.now for messages intended only for the current render.

Flash is useful after redirecting following a successful update. If rendering an invalid form, flash.now avoids the message appearing again on the next request. Do not put sensitive or large data in a cookie-backed flash/session.

```ruby
redirect_to @post, notice: "Saved"
# On validation failure without redirect:
flash.now[:alert] = "Please correct the errors"
render :new, status: :unprocessable_entity
```

</details>


---

<a id="b-0146"></a>

### B-0146 — What is the purpose of the 'rails console'?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

What is the purpose of the 'rails console'?

**Direct answer**

bin/rails console loads an interactive Ruby session with the application environment, so you can query models and inspect behavior.

**Detailed explanation**

The normal console can persist database changes. The --sandbox option wraps database work in a transaction that rolls back on exit, but it does not undo emails, file writes or external calls. Use explicit limits when exploring large datasets.

**Practical example**

```bash
bin/rails console --sandbox
User.where(active: true).limit(5).pluck(:id, :email)
```

**Important points and follow-ups**

- Prefer read-only queries when investigating production behavior.
- Reference: https://guides.rubyonrails.org/debugging_rails_applications.html
- A regular console is not an isolated security sandbox.
- Reference: https://guides.rubyonrails.org/command_line.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00403 — [ten.txt:170–172](../ruby/ten.txt) (32) · [complete source](sources/ten.md)
- SRC-00912 — [thirtyfour.txt:82–82](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01483 — [twentyseven.txt:318–329](../ruby/twentyseven.txt) (Open-40) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00403 (ten.txt)</summary>

**Original prompt:** What does the rails console do?

**Answer:** bin/rails console opens an interactive Ruby session with the Rails application loaded.

It is useful for inspecting models and reproducing behavior. A production console has real database and service access; a console session is not automatically a sandbox. The --sandbox option wraps supported database work in a rollback transaction but cannot undo arbitrary external side effects.

```bash
bin/rails console
# In console: User.where(active: true).limit(5).pluck(:id)
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00912 (thirtyfour.txt)</summary>

**Original prompt:** What is the rails console, and how is it useful for debugging?

**Answer:** Use structured request/error context, logs, traces, metrics and focused debugging to identify the failing operation, then add a regression check.

Log to the configured destination, often stdout in containers or log/<environment>.log locally. Filter secrets and personal data. Track latency, error rate, queue age, database saturation and resource usage. Use the debug gem or a local console for interactive inspection; do not expose development error consoles publicly. Apache logs live wherever the web server is configured, not at a universal Rails path.

```ruby
Rails.logger.info(event: "order_created", order_id: order.id, request_id: request.request_id)
# config.filter_parameters += [:password, :token]
```

</details>


---

<a id="b-0147"></a>

### B-0147 — What is the purpose of the application.rb file?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

What is the purpose of the application.rb file?

**Direct answer**

config/application.rb defines application-wide settings; environment configuration specializes them, and initializers run during application boot.

**Detailed explanation**

config/environment.rb loads the application and initializes it. Initializers configure libraries or integrations and normally require a restart after changes. Reloadable constants should not be permanently captured during boot; use supported reload hooks such as to_prepare when needed. Keep boot work fast and free of avoidable external dependencies.

**Practical example**

```ruby
# config/application.rb
config.time_zone = "UTC"
# config/initializers/filter_parameter_logging.rb
Rails.application.config.filter_parameters += [:password]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00864 — [thirtyfour.txt:33–33](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00983 — [thirtyfour.txt:413–433](../ruby/thirtyfour.txt) (14) · [complete source](sources/thirtyfour.md)
- SRC-01115 — [twenty.txt:124–128](../ruby/twenty.txt) (17) · [complete source](sources/twenty.md)


---

<a id="b-0148"></a>

### B-0148 — What is the purpose of the before_action callback in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 3

**Interview question**

What is the purpose of the before_action callback in Rails?

**Direct answer**

Model callbacks hook into persistence lifecycle events; controller callbacks run before, after or around actions. Keep their responsibilities explicit.

**Detailed explanation**

Use before_validation to normalize values before validation and before_save/before_create for appropriate persistence preparation. after_save still runs within the transaction; prefer after_commit or an outbox for external side effects. An around_action must yield to run the action. after_action is not an ensure block and is not guaranteed after exceptions. Controller rendering/redirecting from a before action can halt the callback chain.

**Practical example**

```ruby
before_validation :normalize_name
private
def normalize_name
  self.name = name.to_s.strip
end
# External side effect after persistence:
# after_commit :enqueue_notification, on: :create
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_callbacks.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00870 — [thirtyfour.txt:39–39](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00989 — [thirtyfour.txt:512–541](../ruby/thirtyfour.txt) (20) · [complete source](sources/thirtyfour.md)
- SRC-01244 — [twentyfive.txt:261–267](../ruby/twentyfive.txt) (46) · [complete source](sources/twentyfive.md)


---

<a id="b-0149"></a>

### B-0149 — What is the purpose of the find_or_create_by method in Rails?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the purpose of the find_or_create_by method in Rails?

**Direct answer**

find_or_create_by first looks up a matching row, then attempts creation if no match exists.

**Detailed explanation**

It can race between the read and insert. Enforce uniqueness in the database; choose find_or_create_by! when validation failure should raise. create_or_find_by is another option when a suitable database unique constraint is present, with its own insert-first trade-offs.

**Practical example**

```ruby
add_index :users, :email, unique: true
# Application code:
User.find_or_create_by!(email: "dev@example.com")
```

**Important points and follow-ups**

- A model uniqueness validation alone does not make concurrent creation safe.

**Source references**

- SRC-00837 — [thirtyfive.txt:158–162](../ruby/thirtyfive.txt) (07) · [complete source](sources/thirtyfive.md)


---

<a id="b-0150"></a>

### B-0150 — What is the purpose of validates_uniqueness_of in Rails models?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the purpose of validates_uniqueness_of in Rails models?

**Direct answer**

A uniqueness validation improves feedback, but a unique database index is required to prevent duplicates under concurrent requests.

**Detailed explanation**

The validator checks existing rows before an insert/update, leaving a race between two requests. Match the index to the business scope and normalization rule. Handle ActiveRecord::RecordNotUnique at a sensible boundary. Case handling and NULL semantics depend on the database and index definition.

**Practical example**

```ruby
validates :email, presence: true, uniqueness: true
# Migration:
add_index :users, :email, unique: true
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_validations.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00915 — [thirtyfour.txt:85–85](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01248 — [twentyfive.txt:285–291](../ruby/twentyfive.txt) (50) · [complete source](sources/twentyfive.md)


---

<a id="b-0151"></a>

### B-0151 — What is the Rails convention over configuration principle?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 4

**Interview question**

What is the Rails convention over configuration principle?

**Direct answer**

Convention over configuration means Rails uses predictable defaults so ordinary applications need less explicit wiring.

**Detailed explanation**

For example User normally maps to users, a conventional controller action can render its matching view and resources generates standard routes. Defaults can be overridden for real requirements. Conventions reduce decisions but require understanding the inferred behavior when debugging.

**Practical example**

```ruby
class User < ApplicationRecord
  # Default table: users
end
# self.table_name = "legacy_people" overrides the mapping when needed.
```

**Important points and follow-ups**

- This is mainly a framework design principle, not a Ruby grammar feature.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00418 — [ten.txt:312–314](../ruby/ten.txt) (47) · [complete source](sources/ten.md)
- SRC-00831 — [thirtyfive.txt:110–115](../ruby/thirtyfive.txt) (01) · [complete source](sources/thirtyfive.md)
- SRC-00891 — [thirtyfour.txt:61–61](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01059 — [thirtysix.txt:226–230](../ruby/thirtysix.txt) (7) · [complete source](sources/thirtysix.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00831 (thirtyfive.txt)</summary>

**Original prompt:** Explain the purpose of the Rails convention over configuration principle.

**Answer:** Convention over configuration supplies predictable defaults; DRY avoids duplicating the same knowledge across the application.

For example, User maps to users and UsersController conventionally renders views under users. Configure exceptions explicitly. DRY is about keeping one authoritative rule, not forcing unrelated code into a shared abstraction solely because two lines look alike.

```ruby
class User < ApplicationRecord
  # Convention: users table, id primary key
end
# Exception:
class LegacyUser < ApplicationRecord
  self.table_name = "people_archive"
end
```

</details>


---

<a id="b-0152"></a>

### B-0152 — What is the role of ActiveSupport?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the role of ActiveSupport?

**Direct answer**

Active Support is Rails’ collection of utility classes, extensions and support APIs such as time helpers, notifications, inflections and concerns.

**Detailed explanation**

Some extensions can be required selectively outside Rails. Know the semantics rather than relying only on convenient names: blank? and present? differ from nil? and empty?, and time/calendar operations carry timezone assumptions.

**Practical example**

```ruby
require "active_support/core_ext/object/blank"
"   ".blank? # true
false.blank? # true
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01146 — [twenty.txt:427–431](../ruby/twenty.txt) (49) · [complete source](sources/twenty.md)
- SRC-01252 — [twentyfive.txt:305–307](../ruby/twentyfive.txt) (54) · [complete source](sources/twentyfive.md)


---

<a id="b-0153"></a>

### B-0153 — What is the role of an API-only application in Rails, and when would you use it?

**Difficulty:** Advanced · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is the role of an API-only application in Rails, and when would you use it?

**Direct answer**

An API-only Rails application uses ActionController::API and a smaller middleware/view stack focused on serving data rather than full browser pages.

**Detailed explanation**

It retains models, routing and other Rails components. Add session/cookie/CSRF or other middleware deliberately if the API uses browser cookie authentication. Authentication, authorization, error handling and a stable response contract are still application responsibilities.

**Practical example**

```bash
rails new service --api
# Controller:
render json: { status: "ok" }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00939 — [thirtyfour.txt:110–110](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0154"></a>

### B-0154 — What is the significance of the db/seeds.rb file?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What is the significance of the db/seeds.rb file?

**Direct answer**

bin/rails db:seed loads db/seeds.rb to populate baseline application data.

**Detailed explanation**

Make seeds safe to rerun and distinguish reference data from test fixtures and production data backfills. Seeds are not automatically a safe migration mechanism for large changing datasets.

**Practical example**

```ruby
Role.find_or_create_by!(name: "admin")
# Run:
bin/rails db:seed
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00873 — [thirtyfour.txt:42–42](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01075 — [thirtytwo.txt:67–69](../ruby/thirtytwo.txt) (8) · [complete source](sources/thirtytwo.md)


---

<a id="b-0155"></a>

### B-0155 — What is Turbolinks in Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is Turbolinks in Rails?

**Direct answer**

Hotwire combines Turbo’s navigation, frames and stream updates with Stimulus controllers for small client-side behavior.

**Detailed explanation**

Turbo Drive handles navigation, frames update isolated regions, and streams describe DOM changes delivered over HTTP or WebSockets. Turbolinks is the predecessor to Turbo Drive and belongs to older applications. Real-time broadcasting still needs authorization, safe stream subscriptions and reliable server operations.

**Practical example**

```erb
<%= turbo_stream_from @conversation %>
<%= turbo_frame_tag "messages" do %>
  <%= render @messages %>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01213 — [twentyfive.txt:68–70](../ruby/twentyfive.txt) (15) · [complete source](sources/twentyfive.md)


---

<a id="b-0156"></a>

### B-0156 — What is your understanding of the DRY code?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What is your understanding of the DRY code?

**Direct answer**

DRY means keeping each piece of knowledge or business rule in one authoritative place.

**Detailed explanation**

It reduces the risk that repeated rules drift apart. Extract a shared abstraction when the behavior represents the same underlying concept. Similar-looking code with different reasons to change may be clearer when kept separate.

**Practical example**

```ruby
def total_with_tax(net, rate:)
  net * (1 + rate)
end
```

**Important points and follow-ups**

- Avoid premature abstractions that require many boolean options.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01412 — [twentythree.txt:141–143](../ruby/twentythree.txt) (Q20) · [complete source](sources/twentythree.md)


---

<a id="b-0157"></a>

### B-0157 — What's the difference between 'rails new' and 'rails generate'?

**Difficulty:** Intermediate · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

What's the difference between 'rails new' and 'rails generate'?

**Direct answer**

rails new creates an application; rails generate creates a component within an existing application.

**Detailed explanation**

The application generator establishes the project and dependency setup. Component generators create models, migrations, controllers, jobs, channels or scaffolds. Inspect generated code rather than treating it as finished business behavior.

**Practical example**

```bash
rails new bookstore
cd bookstore
bin/rails generate model Book title:string
bin/rails generate controller Books index show
```

**Important points and follow-ups**

- Use bin/rails inside a project to use its bundled Rails.
- Reference: https://guides.rubyonrails.org/command_line.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01450 — [twentyseven.txt:76–80](../ruby/twentyseven.txt) (Open-7) · [complete source](sources/twentyseven.md)
- SRC-01475 — [twentyseven.txt:259–263](../ruby/twentyseven.txt) (Open-32) · [complete source](sources/twentyseven.md)


---

<a id="b-0158"></a>

### B-0158 — What’s wrong with the code below and why?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

What’s wrong with the code below and why?

**Direct answer**

The do/end block binds to puts, so Benchmark.measure receives no block and raises LocalJumpError. Parenthesize the measured call or use braces.

**Detailed explanation**

Ruby block-binding precedence makes braces bind more tightly than do/end in this call form. Benchmark.measure yields to a supplied block; it cannot measure the loop if the block belongs to puts. A deterministic bounded operation is a better repeatable timing example than a random infinite loop.

**Practical example**

```ruby
require "benchmark"
puts(Benchmark.measure do
  1000.times { 2 * 3 }
end)
# Or:
puts Benchmark.measure { 1000.times { 2 * 3 } }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00638 — [eighteen.txt:241–250](../ruby/eighteen.txt) (8) · [complete source](sources/eighteen.md)


---

<a id="b-0159"></a>

### B-0159 — When do you use self.down and self.up in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

When do you use self.down and self.up in Ruby on Rails?

**Direct answer**

Legacy migration up methods applied changes and down methods reversed them; modern versioned migrations normally use instance methods or a reversible change method.

**Detailed explanation**

Use change when Rails can infer the reverse operation. Use explicit up/down or reversible when a data/schema change needs custom logic. Reversing a schema change does not magically recover deleted data.

**Practical example**

```ruby
class AddCodeToProducts < ActiveRecord::Migration[8.0]
  def up
    add_column :products, :code, :string
  end
  def down
    remove_column :products, :code
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.

**Source references**

- SRC-01311 — [twentynine.txt:61–63](../ruby/twentynine.txt) (13) · [complete source](sources/twentynine.md)


---

<a id="b-0160"></a>

### B-0160 — Which of the following best describes the primary purpose of a Rails Engine?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Which of the following best describes the primary purpose of a Rails Engine?

**Direct answer**

Option 1: To provide a way to isolate and reuse parts of an application or even entire applications.

**Detailed explanation**

The correct choice is To provide a way to isolate and reuse parts of an application or even entire applications. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To provide a way to isolate and reuse parts of an application or even entire applications.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01565 — [twentyseven.txt:1066–1077](../ruby/twentyseven.txt) (MCQ-17) · [complete source](sources/twentyseven.md)


---

<a id="b-0161"></a>

### B-0161 — Which skills do developers need to use Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 2

**Interview question**

Which skills do developers need to use Ruby on Rails?

**Direct answer**

Prepare Ruby semantics, Rails request/data flow, SQL, testing, security, debugging and clear explanations of actual project decisions.

**Detailed explanation**

For around three years’ experience, practice implementing an endpoint, diagnosing N+1 queries, writing a migration with constraints, testing authorization, and explaining a production issue. Support answers with a real example rather than claiming tools or incidents you have not used.

**Practical example**

```text
Practice: build POST /orders with permitted input, a transaction, inventory checks, an authorization policy and request tests for success and failure.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-00758 — [thirtyeight.txt:86–87](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00764 — [thirtyeight.txt:105–123](../ruby/thirtyeight.txt) (5) · [complete source](sources/thirtyeight.md)


---

<a id="b-0162"></a>

### B-0162 — While writing the Rails Application, what are the tasks to which you need to pay attention?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

While writing the Rails Application, what are the tasks to which you need to pay attention?

**Direct answer**

Start with the domain and user workflows, define the data/constraints and HTTP interface, and implement a tested, secure vertical feature in the Rails application structure.

**Detailed explanation**

app/models holds domain/persistence classes, app/controllers request coordinators, app/views templates, config configuration and db migrations/schema/seeds. PostgreSQL is one supported choice, not a mandatory database for every Rails application. Database-driven behavior comes from persistence code, not merely choosing MVC.

**Practical example**

```text
app/models/product.rb
app/controllers/products_controller.rb
app/views/products/index.html.erb
config/routes.rb
db/migrate/..._create_products.rb
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00717 — [thirty.txt:130–134](../ruby/thirty.txt) (33) · [complete source](sources/thirty.md)


---

<a id="b-0163"></a>

### B-0163 — Why is Ruby on Rails popular for startups?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Why is Ruby on Rails popular for startups?

**Direct answer**

Rails’ integrated conventions and tools can reduce initial feature-development and integration work for a team comfortable with Ruby.

**Detailed explanation**

Scaffolding, Active Record, migrations, routing and testing support help deliver a web application quickly. Productivity is contextual: consider the team, workload and operational needs rather than assuming a framework guarantees business success or scalability.

**Practical example**

```text
Build an initial CRUD feature with routes, a model migration and request tests, then replace generated defaults with the required authorization and domain behavior.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01162 — [twenty.txt:522–523](../ruby/twenty.txt) (5) · [complete source](sources/twenty.md)


---

<a id="b-0164"></a>

### B-0164 — Why is skill-based hiring important for Rails roles?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Why is skill-based hiring important for Rails roles?

**Direct answer**

Evaluate demonstrated technical judgment, project responsibility, communication and practical problem-solving rather than treating years of experience as a fixed skill score.

**Detailed explanation**

Use a consistent job-relevant rubric, realistic coding/debugging exercises and discussion of previous work. Seniority varies by organization; a source estimate such as four to seven years is not a technical requirement or universal hiring rule. Keep interviews accessible and avoid unnecessary repeated assessments.

**Practical example**

```text
Rubric example: identify the root cause of an N+1 endpoint, implement a fix, verify query behavior and explain the chosen trade-offs.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00669 — [fifteen.txt:245–247](../ruby/fifteen.txt) (4) · [complete source](sources/fifteen.md)


---

<a id="b-0165"></a>

### B-0165 — Why Ruby on Rails

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Why Ruby on Rails

**Direct answer**

Rails is an open-source web application framework written in Ruby, organized around MVC, convention over configuration, and avoiding duplicated knowledge.

**Detailed explanation**

Its integrated routing, Active Record, templates, migrations, jobs and testing support reduce routine application setup. Conventions provide useful defaults, while configuration allows exceptions. Rails can be used for HTML applications or JSON APIs. Describe the benefit using an actual feature you built, and discuss costs such as framework conventions, memory usage and database dependence for persistence.

**Practical example**

```bash
bin/rails new shop
cd shop
bin/rails generate scaffold Product name:string price:decimal
bin/rails db:migrate
bin/rails server
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Source references**

- SRC-01193 — [twentyeight.txt:361–368](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0166"></a>

### B-0166 — Your application needs to send thousands of confirmation emails after users register. How would you prevent slow response times?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Your application needs to send thousands of confirmation emails after users register. How would you prevent slow response times?

**Direct answer**

Queue email delivery with Active Job and an appropriately configured durable backend, rather than sending thousands of messages inside an HTTP request.

**Detailed explanation**

Enqueue after the user transaction commits, monitor delivery failures and queue age, respect provider rate limits, and make the action idempotent where possible. Break bulk campaigns into manageable batches and do not assume a successful enqueue means the email was delivered.

**Practical example**

```text
UserMailer.with(user: user).confirmation.deliver_later
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01155 — [twenty.txt:489–493](../ruby/twenty.txt) (58) · [complete source](sources/twenty.md)


---

<a id="b-0167"></a>

### B-0167 — Your Rails application becomes slow after adding a dashboard that displays users, their orders, and payment history. How would you identify and fix the issue?

**Difficulty:** Beginner · **Topic:** Additional technical topics · **Source occurrences:** 1

**Interview question**

Your Rails application becomes slow after adding a dashboard that displays users, their orders, and payment history. How would you identify and fix the issue?

**Direct answer**

Find the bottleneck with measurements before changing code: request timings, SQL count/plans, allocation/memory data, and external-service latency.

**Detailed explanation**

A dashboard often introduces N+1 queries or expensive aggregation, but verify the cause. Fix association loading, bounded data retrieval and indexes first; cache suitable aggregates and offload independent work. Recheck latency and throughput under realistic load. Memory retained after GC may reflect live objects, native allocations or allocator fragmentation, not just a Ruby object leak.

**Practical example**

```ruby
User.includes(orders: :payments).limit(50)
# Capture request duration, SQL duration/count and allocation count before/after.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01153 — [twenty.txt:479–483](../ruby/twenty.txt) (56) · [complete source](sources/twenty.md)


---

<a id="b-0168"></a>

### B-0168 — Explain how you would implement a complex search functionality with filtering, sorting, and pagination in a Rails application.

**Difficulty:** Advanced · **Topic:** Algorithms and data structures · **Source occurrences:** 1

**Interview question**

Explain how you would implement a complex search functionality with filtering, sorting, and pagination in a Rails application.

**Direct answer**

Build search with an authorized base relation, explicit filter and sort allowlists, bounded pagination, and indexes aligned with the search strategy.

**Detailed explanation**

Simple structured filters fit Active Record. PostgreSQL full-text search or an external search service may be suitable for ranked text search. Inspect query plans and deep-pagination behavior. Never pass arbitrary client input as an ORDER BY expression; advanced search libraries also need attribute and association allowlists.

**Practical example**

```ruby
sorts = { "newest" => { created_at: :desc }, "name" => { name: :asc } }
records = current_user.tenant.products.where(active: true)
records = records.order(sorts.fetch(params[:sort], sorts["newest"]))
records = records.limit(25)
```

**Important points and follow-ups**

- Keyset pagination can avoid expensive large offsets.
- Escape LIKE wildcard characters when they should be literal.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01525 — [twentyseven.txt:671–679](../ruby/twentyseven.txt) (Open-82) · [complete source](sources/twentyseven.md)


---

<a id="b-0169"></a>

### B-0169 — How do you implement a search functionality in Rails (e.g., using Elasticsearch or pg_search)?

**Difficulty:** Advanced · **Topic:** Algorithms and data structures · **Source occurrences:** 1

**Interview question**

How do you implement a search functionality in Rails (e.g., using Elasticsearch or pg_search)?

**Direct answer**

Use a search approach matched to requirements: indexed database queries/full-text search for simpler cases, or a separate search engine for richer ranking and scale.

**Detailed explanation**

For PostgreSQL, tsvector/full-text search or pg_search can provide stemming and ranking. Elasticsearch adds an external index, requiring asynchronous indexing, retries, reindexing and consistency planning. Enforce tenant/authorization filtering in both indexing and result retrieval.

**Practical example**

```text
Post.where("search_vector @@ plainto_tsquery(?)", params[:q].to_s)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00959 — [thirtyfour.txt:130–130](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0170"></a>

### B-0170 — Explain how Rails manages sessions and cookies. How can developers use sessions for user authentication?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

Explain how Rails manages sessions and cookies. How can developers use sessions for user authentication?

**Direct answer**

Rails’ default CookieStore keeps encrypted and authenticated session data in the browser cookie; other session stores keep data server-side behind a session identifier.

**Detailed explanation**

Store a small user identifier, not passwords, and rotate/reset the session after authentication to mitigate fixation. Use HTTPS and suitable Secure, HttpOnly and SameSite settings. Ordinary unsigned cookies are client-controlled and must not be trusted as proof of identity. Cookie sessions have a small size limit and different revocation trade-offs from server-side sessions.

**Practical example**

```ruby
if user.authenticate(params[:password])
  reset_session
  session[:user_id] = user.id
end
# Logout:
reset_session
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- Default Rails CookieStore stores encrypted/authenticated session data on the client; server-side stores are alternative configurations.

**Source references**

- SRC-01022 — [thirtyone.txt:786–823](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0171"></a>

### B-0171 — Explain how you would implement a RESTful API in Rails, including versioning, authentication, and documentation.

**Difficulty:** Advanced · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

Explain how you would implement a RESTful API in Rails, including versioning, authentication, and documentation.

**Direct answer**

To implement a RESTful API in Rails, I would start by using rails new my_api --api to create an API-only application. For versioning, I'd use namespace-based versioning (e.g., api/v1/) or custom media types in the Accept header. Controllers would inherit from ApplicationController, rendering JSON responses using render json: @object. Authentication can be achieved using token-based authentication like JWT (using gems like jwt and bcrypt) or OAuth with gems such as omniauth. Clients would send tokens in the Authorization header.

**Detailed explanation**

To implement a RESTful API in Rails, I would start by using rails new my_api --api to create an API-only application. For versioning, I'd use namespace-based versioning (e.g., api/v1/) or custom media types in the Accept header. Controllers would inherit from ApplicationController, rendering JSON responses using render json: @object. Authentication can be achieved using token-based authentication like JWT (using gems like jwt and bcrypt) or OAuth with gems such as omniauth. Clients would send tokens in the Authorization header.

For documentation, I'd use a tool like rswag or apipie-rails to generate Swagger/OpenAPI specifications from code comments or dedicated DSLs. This allows automated documentation and interactive API exploration. Error handling would involve rescue blocks in the ApplicationController to return standardized JSON error responses with appropriate HTTP status codes. I would also implement request validations in the controller using strong parameters or form objects.

**Practical example**

```text
To implement a RESTful API in Rails, I would start by using rails new my_api --api to create an API-only application. For versioning, I'd use namespace-based versioning (e.g., api/v1/) or custom media types in the Accept header. Controllers would inherit from ApplicationController, rendering JSON responses using render json: @object. Authentication can be achieved using token-based authentication like JWT (using gems like jwt and bcrypt) or OAuth with gems such as omniauth. Clients would send tokens in the Authorization header.

For documentation, I'd use a tool like rswag or apipie-rails to generate Swagger/OpenAPI specifications from code comments or dedicated DSLs. This allows automated documentation and interactive API exploration. Error handling would involve rescue blocks in the ApplicationController to return standardized JSON error responses with appropriate HTTP status codes. I would also implement request validations in the controller using strong parameters or form objects.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01531 — [twentyseven.txt:715–719](../ruby/twentyseven.txt) (Open-88) · [complete source](sources/twentyseven.md)


---

<a id="b-0172"></a>

### B-0172 — Explain what Strong Parameters are.

**Difficulty:** Advanced · **Topic:** Authentication, authorization and security · **Source occurrences:** 5

**Interview question**

Explain what Strong Parameters are.

**Direct answer**

Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.

**Detailed explanation**

Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.

**Practical example**

```ruby
def user_params
  params.require(:user).permit(:name, :email)
end
# Rails 8+: params.expect(user: [:name, :email])
# Ownership must still be checked: current_user.posts.find(params[:id])
```

**Important points and follow-ups**

- Parameter permission is distinct from SQL binding and output escaping.
- Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-00390 — [ten.txt:113–115](../ruby/ten.txt) (19) · [complete source](sources/ten.md)
- SRC-00793 — [thirtyeight.txt:192–193](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00838 — [thirtyfive.txt:163–169](../ruby/thirtyfive.txt) (08) · [complete source](sources/thirtyfive.md)
- SRC-01118 — [twenty.txt:139–154](../ruby/twenty.txt) (20) · [complete source](sources/twenty.md)
- SRC-01368 — [twentytwo.txt:281–283](../ruby/twentytwo.txt) (5) · [complete source](sources/twentytwo.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00390 (ten.txt)</summary>

**Original prompt:** What are Strong Parameters?

**Answer:** Strong Parameters allowlists attributes that may be mass-assigned from request data. It does not determine whether the user may modify the target record.

Use require/permit or the appropriate version’s expect API, then separately scope and authorize resource access. Never permit sensitive role, owner or tenant attributes merely because they appear in input. Nested collections require an explicit nested shape.

```ruby
allowed = params.require(:user).permit(:name, :timezone)
current_user.update!(allowed)
```

</details>


---

<a id="b-0173"></a>

### B-0173 — How can you implement authentication and authorization in a Rails application? What gems or techniques would you consider?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 2

**Interview question**

How can you implement authentication and authorization in a Rails application? What gems or techniques would you consider?

**Direct answer**

Authentication identifies the caller; authorization decides whether that caller may perform a specific operation on a specific resource.

**Detailed explanation**

Rails 8 has an authentication generator as a starting point; Devise is another established option with a different feature set. Use policies or abilities for authorization, scope queries to accessible records, and test cross-user access. A token format such as JWT is not a complete security design.

**Practical example**

```ruby
article = current_user.articles.find(params[:id])
# With a policy library, authorize the requested action explicitly.
# bin/rails generate authentication # Rails 8 starting point
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html
- UI visibility is not server-side access control.
- Keep password hashing, session rotation and object access checks separate concerns.

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01227 — [twentyfive.txt:150–155](../ruby/twentyfive.txt) (29) · [complete source](sources/twentyfive.md)
- SRC-01504 — [twentyseven.txt:492–506](../ruby/twentyseven.txt) (Open-61) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01227 (twentyfive.txt)</summary>

**Original prompt:** How do you implement authentication and authorization in Rails?

**Answer:** Authentication establishes identity; authorization checks which actions that identity may perform.

Rails 8 has an authentication generator that supplies a starting point, and Devise is a commonly used alternative. has_secure_password handles password hashing/authentication when configured with bcrypt and a password_digest column. Pundit and CanCanCan are authorization libraries. They require application-specific permission rules; installing a gem does not decide business access policy.

```bash
bin/rails generate authentication
# Or in an existing password-based User model:
has_secure_password
# Verify with user.authenticate(password)
```

</details>


---

<a id="b-0174"></a>

### B-0174 — How do you handle API authentication?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you handle API authentication?

**Direct answer**

Secure Rails applications with authentication, per-resource authorization, constrained input, safe output/SQL handling, CSRF defenses where applicable, HTTPS, secrets management and tested access controls.

**Detailed explanation**

Framework defaults help but do not establish application-specific permissions. For APIs choose an appropriate session, scoped token or OAuth model; validate token signature, issuer, audience and expiry when applicable. Limit request sizes and rates, filter secrets from logs, and test cross-user and cross-tenant access. Scan dependencies and apply supported security updates.

**Practical example**

```ruby
# Scope lookup to the authenticated user, then enforce the action policy:
@post = current_user.posts.find(params[:id])
authorize @post
@post.update!(params.require(:post).permit(:title))
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-01147 — [twenty.txt:432–436](../ruby/twenty.txt) (50) · [complete source](sources/twenty.md)


---

<a id="b-0175"></a>

### B-0175 — How do you handle file uploads and storage in a Rails application, and what are some considerations for security and scalability?

**Difficulty:** Advanced · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you handle file uploads and storage in a Rails application, and what are some considerations for security and scalability?

**Direct answer**

Active Storage attaches files to Active Record models and delegates storage to a configured service, such as local disk or S3.

**Detailed explanation**

Install its tables, configure the storage service, declare has_one_attached or has_many_attached, and authorize upload/download operations. Image variants use an image processor such as libvips. Validate size and actual content, and use safe serving/scanning policies. Rails 8.1 removed the built-in Azure service; older lists of supported services need version context.

**Practical example**

```bash
bin/rails active_storage:install
bin/rails db:migrate
# In User: has_one_attached :avatar
user.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png")
user.avatar.variant(resize_to_limit: [100, 100])
```

**Important points and follow-ups**

- Signed blob URLs are not a complete application authorization policy.
- Direct uploads still require server-side validation and cleanup of unattached blobs.
- Reference: https://guides.rubyonrails.org/v8.1/active_storage_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01544 — [twentyseven.txt:833–837](../ruby/twentyseven.txt) (Open-101) · [complete source](sources/twentyseven.md)


---

<a id="b-0176"></a>

### B-0176 — How do you handle security issues such as XSS (Cross-site Scripting) and CSRF (Cross-site Request Forgery) in Rails?

**Difficulty:** Advanced · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you handle security issues such as XSS (Cross-site Scripting) and CSRF (Cross-site Request Forgery) in Rails?

**Direct answer**

CSRF tricks a browser into sending an unwanted authenticated request; XSS injects script into a trusted page. Rails mitigates them through request forgery protection and output escaping.

**Detailed explanation**

Keep state changes off GET, retain authenticity-token verification for cookie-authenticated browser requests, and use secure session cookies. ERB escapes normal string output, but raw/html_safe can undo that protection. SameSite is additional defense and CORS is not a substitute for CSRF protection. A bearer-only API has a different CSRF threat model.

**Practical example**

```erb
<%= form_with(model: @post) do |f| %>
  <%= f.text_field :title %>
<% end %>
<!-- Normal escaped output: -->
<%= @post.title %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00952 — [thirtyfour.txt:123–123](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0177"></a>

### B-0177 — How do you implement OAuth authentication in Rails?

**Difficulty:** Advanced · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you implement OAuth authentication in Rails?

**Direct answer**

Use a maintained OAuth/OIDC integration to delegate sign-in, and validate the full protocol response rather than treating an arbitrary token as trusted.

**Detailed explanation**

Choose an authorization-code flow with state and, where appropriate, PKCE. For OpenID Connect validate nonce, issuer, audience and signatures. Map the verified provider identity to a local account carefully and avoid linking accounts based on an unverified email address. Doorkeeper serves OAuth authorization for your own API; OmniAuth integrates external sign-in providers.

**Practical example**

```text
Provider callback → verify state/code/token → locate account by issuer and subject → establish a new local session
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00944 — [thirtyfour.txt:115–115](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0178"></a>

### B-0178 — How do you implement security measures in a Ruby on Rails application?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you implement security measures in a Ruby on Rails application?

**Direct answer**

Use layered Rails defenses: authenticate users, authorize every resource access, permit mass-assignment fields, bind SQL parameters, escape output, protect cookie-authenticated requests from CSRF and keep dependencies patched.

**Detailed explanation**

Strong parameters limit assignment but do not grant authorization. Parameterized Active Record conditions separate SQL structure from values; input validation alone is not SQL-injection protection. Rails escapes ordinary rendered text, but raw/html_safe and unsafe HTML contexts can reintroduce XSS. Use HTTPS and secure cookie settings, reset sessions appropriately at authentication boundaries, filter secrets from logs, and make password storage an established hashing implementation.

**Practical example**

```ruby
user = current_account.users.find(params[:id])
allowed = params.require(:user).permit(:name)
user.update!(allowed)
# Binding values, not SQL interpolation:
User.where(email: params[:email])
```

**Important points and follow-ups**

- CSRF tokens protect applicable cookie-authenticated workflows; they do not prove consent or prevent XSS.
- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-00422 — [ten.txt:330–332](../ruby/ten.txt) (51) · [complete source](sources/ten.md)


---

<a id="b-0179"></a>

### B-0179 — How do you implement simple authentication in Rails?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you implement simple authentication in Rails?

**Direct answer**

Authentication establishes identity; authorization checks which actions that identity may perform.

**Detailed explanation**

Rails 8 has an authentication generator that supplies a starting point, and Devise is a commonly used alternative. has_secure_password handles password hashing/authentication when configured with bcrypt and a password_digest column. Pundit and CanCanCan are authorization libraries. They require application-specific permission rules; installing a gem does not decide business access policy.

**Practical example**

```bash
bin/rails generate authentication
# Or in an existing password-based User model:
has_secure_password
# Verify with user.authenticate(password)
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00875 — [thirtyfour.txt:44–44](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0180"></a>

### B-0180 — How do you implement user authentication using Devise in Rails?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you implement user authentication using Devise in Rails?

**Direct answer**

Authentication establishes identity; authorization checks which actions that identity may perform.

**Detailed explanation**

Rails 8 has an authentication generator that supplies a starting point, and Devise is a commonly used alternative. has_secure_password handles password hashing/authentication when configured with bcrypt and a password_digest column. Pundit and CanCanCan are authorization libraries. They require application-specific permission rules; installing a gem does not decide business access policy.

**Practical example**

```bash
bin/rails generate authentication
# Or in an existing password-based User model:
has_secure_password
# Verify with user.authenticate(password)
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00898 — [thirtyfour.txt:68–68](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0181"></a>

### B-0181 — How do you secure session management?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How do you secure session management?

**Direct answer**

Rails’ default CookieStore keeps encrypted and authenticated session data in the browser cookie; other session stores keep data server-side behind a session identifier.

**Detailed explanation**

Store a small user identifier, not passwords, and rotate/reset the session after authentication to mitigate fixation. Use HTTPS and suitable Secure, HttpOnly and SameSite settings. Ordinary unsigned cookies are client-controlled and must not be trusted as proof of identity. Cookie sessions have a small size limit and different revocation trade-offs from server-side sessions.

**Practical example**

```ruby
if user.authenticate(params[:password])
  reset_session
  session[:user_id] = user.id
end
# Logout:
reset_session
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; answer prepared independently.

**Source references**

- SRC-00658 — [fifteen.txt:101–102](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)


---

<a id="b-0182"></a>

### B-0182 — How does Rails handle security vulnerabilities?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How does Rails handle security vulnerabilities?

**Direct answer**

Secure Rails applications with authentication, per-resource authorization, constrained input, safe output/SQL handling, CSRF defenses where applicable, HTTPS, secrets management and tested access controls.

**Detailed explanation**

Framework defaults help but do not establish application-specific permissions. For APIs choose an appropriate session, scoped token or OAuth model; validate token signature, issuer, audience and expiry when applicable. Limit request sizes and rates, filter secrets from logs, and test cross-user and cross-tenant access. Scan dependencies and apply supported security updates.

**Practical example**

```ruby
# Scope lookup to the authenticated user, then enforce the action policy:
@post = current_user.posts.find(params[:id])
authorize @post
@post.update!(params.require(:post).permit(:title))
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-01210 — [twentyfive.txt:56–58](../ruby/twentyfive.txt) (12) · [complete source](sources/twentyfive.md)


---

<a id="b-0183"></a>

### B-0183 — How does Rails handle security, and what are some best practices for securing a Rails application?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How does Rails handle security, and what are some best practices for securing a Rails application?

**Direct answer**

Secure Rails applications with authentication, per-resource authorization, constrained input, safe output/SQL handling, CSRF defenses where applicable, HTTPS, secrets management and tested access controls.

**Detailed explanation**

Framework defaults help but do not establish application-specific permissions. For APIs choose an appropriate session, scoped token or OAuth model; validate token signature, issuer, audience and expiry when applicable. Limit request sizes and rates, filter secrets from logs, and test cross-user and cross-tenant access. Scan dependencies and apply supported security updates.

**Practical example**

```ruby
# Scope lookup to the authenticated user, then enforce the action policy:
@post = current_user.posts.find(params[:id])
authorize @post
@post.update!(params.require(:post).permit(:title))
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00894 — [thirtyfour.txt:64–64](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0184"></a>

### B-0184 — How does Rails handle user authentication and authorization? Provide an overview of commonly used gems or techniques for implementing these functionalities.

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How does Rails handle user authentication and authorization? Provide an overview of commonly used gems or techniques for implementing these functionalities.

**Direct answer**

Authentication establishes identity; authorization checks which actions that identity may perform.

**Detailed explanation**

Rails 8 has an authentication generator that supplies a starting point, and Devise is a commonly used alternative. has_secure_password handles password hashing/authentication when configured with bcrypt and a password_digest column. Pundit and CanCanCan are authorization libraries. They require application-specific permission rules; installing a gem does not decide business access policy.

**Practical example**

```bash
bin/rails generate authentication
# Or in an existing password-based User model:
has_secure_password
# Verify with user.authenticate(password)
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-01016 — [thirtyone.txt:627–639](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0185"></a>

### B-0185 — How have you implemented authorization in the past?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

How have you implemented authorization in the past?

**Direct answer**

Authenticate the caller, then authorize the requested action on the specific resource using a policy or equivalent explicit rule.

**Detailed explanation**

Strong Parameters only controls writable attributes; it does not establish ownership. Scope lookups to the current user or tenant, deny by default, and test ordinary users, owners, admins and unauthenticated callers. Hiding a link in the UI does not secure the endpoint.

**Practical example**

```ruby
# Assuming authentication and a configured Pundit policy:
@user = User.find(params[:id])
authorize @user, :update?
@user.update!(user_params)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01033 — [thirtyseven.txt:79–85](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0186"></a>

### B-0186 — What are common security attacks, and how Ruby addresses them?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What are common security attacks, and how Ruby addresses them?

**Direct answer**

Use layered Rails defenses: authenticate users, authorize every resource access, permit mass-assignment fields, bind SQL parameters, escape output, protect cookie-authenticated requests from CSRF and keep dependencies patched.

**Detailed explanation**

Strong parameters limit assignment but do not grant authorization. Parameterized Active Record conditions separate SQL structure from values; input validation alone is not SQL-injection protection. Rails escapes ordinary rendered text, but raw/html_safe and unsafe HTML contexts can reintroduce XSS. Use HTTPS and secure cookie settings, reset sessions appropriately at authentication boundaries, filter secrets from logs, and make password storage an established hashing implementation.

**Practical example**

```ruby
user = current_account.users.find(params[:id])
allowed = params.require(:user).permit(:name)
user.update!(allowed)
# Binding values, not SQL interpolation:
User.where(email: params[:email])
```

**Important points and follow-ups**

- CSRF tokens protect applicable cookie-authenticated workflows; they do not prove consent or prevent XSS.
- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-00236 — [seven.txt:354–378](../ruby/seven.txt) (20) · [complete source](sources/seven.md)


---

<a id="b-0187"></a>

### B-0187 — What are Rails sessions and cookies used for?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What are Rails sessions and cookies used for?

**Direct answer**

Cookies store browser data; Rails sessions expose per-client state through a configurable store. Rails’ default CookieStore keeps encrypted and authenticated session data in the cookie.

**Detailed explanation**

Server-backed session stores usually keep only a lookup identifier in the browser. CookieStore does not require sticky sessions or a shared session database, but all app instances need compatible secrets. Keep sessions small, rotate them when authentication changes, and understand expiry and revocation requirements.

**Practical example**

```text
session[:user_id] = user.id
cookies.encrypted[:preference] = { value: "dark", httponly: true }
reset_session # for an authentication boundary
```

**Important points and follow-ups**

- Do not claim Rails sessions are server-side by default.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01468 — [twentyseven.txt:191–199](../ruby/twentyseven.txt) (Open-25) · [complete source](sources/twentyseven.md)


---

<a id="b-0188"></a>

### B-0188 — What are some security best practices for Ruby on Rails applications?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What are some security best practices for Ruby on Rails applications?

**Direct answer**

Use layered Rails defenses: authenticate users, authorize every resource access, permit mass-assignment fields, bind SQL parameters, escape output, protect cookie-authenticated requests from CSRF and keep dependencies patched.

**Detailed explanation**

Strong parameters limit assignment but do not grant authorization. Parameterized Active Record conditions separate SQL structure from values; input validation alone is not SQL-injection protection. Rails escapes ordinary rendered text, but raw/html_safe and unsafe HTML contexts can reintroduce XSS. Use HTTPS and secure cookie settings, reset sessions appropriately at authentication boundaries, filter secrets from logs, and make password storage an established hashing implementation.

**Practical example**

```ruby
user = current_account.users.find(params[:id])
allowed = params.require(:user).permit(:name)
user.update!(allowed)
# Binding values, not SQL interpolation:
User.where(email: params[:email])
```

**Important points and follow-ups**

- CSRF tokens protect applicable cookie-authenticated workflows; they do not prove consent or prevent XSS.
- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-00271 — [eight.txt:321–331](../ruby/eight.txt) (Expert-10) · [complete source](sources/eight.md)


---

<a id="b-0189"></a>

### B-0189 — What is a session in Rails, and how is it managed?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 2

**Interview question**

What is a session in Rails, and how is it managed?

**Direct answer**

Rails’ default CookieStore keeps encrypted and authenticated session data in the browser cookie; other session stores keep data server-side behind a session identifier.

**Detailed explanation**

Store a small user identifier, not passwords, and rotate/reset the session after authentication to mitigate fixation. Use HTTPS and suitable Secure, HttpOnly and SameSite settings. Ordinary unsigned cookies are client-controlled and must not be trusted as proof of identity. Cookie sessions have a small size limit and different revocation trade-offs from server-side sessions.

**Practical example**

```ruby
if user.authenticate(params[:password])
  reset_session
  session[:user_id] = user.id
end
# Logout:
reset_session
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00871 — [thirtyfour.txt:40–40](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00990 — [thirtyfour.txt:542–561](../ruby/thirtyfour.txt) (21) · [complete source](sources/thirtyfour.md)


---

<a id="b-0190"></a>

### B-0190 — What is CSRF and how does Rails protect against it?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 5

**Interview question**

What is CSRF and how does Rails protect against it?

**Direct answer**

CSRF tricks a browser into sending an unwanted authenticated request; XSS injects script into a trusted page. Rails mitigates them through request forgery protection and output escaping.

**Detailed explanation**

Keep state changes off GET, retain authenticity-token verification for cookie-authenticated browser requests, and use secure session cookies. ERB escapes normal string output, but raw/html_safe can undo that protection. SameSite is additional defense and CORS is not a substitute for CSRF protection. A bearer-only API has a different CSRF threat model.

**Practical example**

```erb
<%= form_with(model: @post) do |f| %>
  <%= f.text_field :title %>
<% end %>
<!-- Normal escaped output: -->
<%= @post.title %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00656 — [fifteen.txt:99–99](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00698 — [thirty.txt:58–60](../ruby/thirty.txt) (14) · [complete source](sources/thirty.md)
- SRC-01114 — [twenty.txt:119–123](../ruby/twenty.txt) (16) · [complete source](sources/twenty.md)
- SRC-01334 — [twentysix.txt:75–77](../ruby/twentysix.txt) (20) · [complete source](sources/twentysix.md)
- SRC-01359 — [twentytwo.txt:244–248](../ruby/twentytwo.txt) (14) · [complete source](sources/twentytwo.md)


---

<a id="b-0191"></a>

### B-0191 — What is CSRF, and how does Rails prevent it?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is CSRF, and how does Rails prevent it?

**Direct answer**

CSRF tricks a browser into sending an unwanted authenticated request; XSS injects script into a trusted page. Rails mitigates them through request forgery protection and output escaping.

**Detailed explanation**

Keep state changes off GET, retain authenticity-token verification for cookie-authenticated browser requests, and use secure session cookies. ERB escapes normal string output, but raw/html_safe can undo that protection. SameSite is additional defense and CORS is not a substitute for CSRF protection. A bearer-only API has a different CSRF threat model.

**Practical example**

```erb
<%= form_with(model: @post) do |f| %>
  <%= f.text_field :title %>
<% end %>
<!-- Normal escaped output: -->
<%= @post.title %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/security.html

**Source references**

- SRC-01273 — [twentyfive.txt:514–516](../ruby/twentyfive.txt) (75) · [complete source](sources/twentyfive.md)


---

<a id="b-0192"></a>

### B-0192 — What is STS (Strict Transport Security) in Rails?

**Difficulty:** Intermediate · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is STS (Strict Transport Security) in Rails?

**Direct answer**

HTTP Strict Transport Security tells supporting browsers to use HTTPS for a host for a declared period. Rails force_ssl can redirect HTTP and configure secure cookies and HSTS.

**Detailed explanation**

HSTS is delivered in an HTTPS response header; an initial insecure visit is still relevant unless the browser already knows the policy or uses a preload list. Reverse-proxy TLS termination and forwarded-protocol trust must be configured correctly. Enabling includeSubDomains or preloading requires planning for every affected hostname.

**Practical example**

```ruby
config.force_ssl = true
# Inspect the actual Strict-Transport-Security response header in deployment.
```

**Important points and follow-ups**

- HSTS does not itself issue or renew a TLS certificate.

**Source references**

- SRC-00389 — [ten.txt:107–112](../ruby/ten.txt) (18) · [complete source](sources/ten.md)


---

<a id="b-0193"></a>

### B-0193 — What is the has_secure_password method in Rails?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is the has_secure_password method in Rails?

**Direct answer**

has_secure_password adds password assignment, bcrypt hashing and authentication helpers to a model with a password_digest column.

**Detailed explanation**

Add bcrypt and never store plaintext or reversible passwords. The standard password validation checks required data and bcrypt limits, but application policy such as breached-password checks and login throttling remains your responsibility. Treat reset tokens and session rotation as part of the complete authentication design.

**Practical example**

```ruby
class User < ApplicationRecord
  has_secure_password
end
user = User.create!(password: "a sufficiently long passphrase")
user.authenticate("wrong") # false
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01279 — [twentyfive.txt:540–550](../ruby/twentyfive.txt) (81) · [complete source](sources/twentyfive.md)


---

<a id="b-0194"></a>

### B-0194 — What is the primary purpose of a CSRF token in a Rails application?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is the primary purpose of a CSRF token in a Rails application?

**Direct answer**

Option 3: To protect against cross-site request forgery (CSRF) attacks.

**Detailed explanation**

The correct choice is To protect against cross-site request forgery (CSRF) attacks. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To protect against cross-site request forgery (CSRF) attacks.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01562 — [twentyseven.txt:1028–1039](../ruby/twentyseven.txt) (MCQ-14) · [complete source](sources/twentyseven.md)


---

<a id="b-0195"></a>

### B-0195 — What is the primary purpose of strong parameters in Rails?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is the primary purpose of strong parameters in Rails?

**Direct answer**

Option 2: To prevent unauthorized attribute assignment by filtering parameters passed to the controller.

**Detailed explanation**

The correct choice is To prevent unauthorized attribute assignment by filtering parameters passed to the controller. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To prevent unauthorized attribute assignment by filtering parameters passed to the controller.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01560 — [twentyseven.txt:1004–1015](../ruby/twentyseven.txt) (MCQ-12) · [complete source](sources/twentyseven.md)


---

<a id="b-0196"></a>

### B-0196 — What is the purpose of using gems like `Pundit` or `CanCanCan` in Rails? How do they help with authorization?

**Difficulty:** Beginner · **Topic:** Authentication, authorization and security · **Source occurrences:** 1

**Interview question**

What is the purpose of using gems like `Pundit` or `CanCanCan` in Rails? How do they help with authorization?

**Direct answer**

Gems like Pundit and CanCanCan in Rails provide authorization functionality, controlling what users are allowed to do within an application. They offer a structured and centralized approach to defining and enforcing permissions, preventing unauthorized access to resources and actions.

**Detailed explanation**

Gems like Pundit and CanCanCan in Rails provide authorization functionality, controlling what users are allowed to do within an application. They offer a structured and centralized approach to defining and enforcing permissions, preventing unauthorized access to resources and actions.

These gems help by:

Centralizing authorization logic: Instead of scattering authorization checks throughout the code, they provide a single place to define permissions.
Defining roles and abilities: They allow developers to define user roles (e.g., admin, editor, user) and the abilities associated with each role (e.g., create, read, update, delete).
Enforcing permissions in controllers and views: They offer methods to check permissions within controllers before executing actions and in views to conditionally display content. For example with Pundit in a controller authorize @article will check whether current user can perform an action on the @article object. With CanCanCan you might use authorize! :read, @article. In views you can conditionally display content with @article.accessible_by?(current_ability, :update) or can? :update, @article.

**Practical example**

```text
Gems like Pundit and CanCanCan in Rails provide authorization functionality, controlling what users are allowed to do within an application. They offer a structured and centralized approach to defining and enforcing permissions, preventing unauthorized access to resources and actions.

These gems help by:

Centralizing authorization logic: Instead of scattering authorization checks throughout the code, they provide a single place to define permissions.
Defining roles and abilities: They allow developers to define user roles (e.g., admin, editor, user) and the abilities associated with each role (e.g., create, read, update, delete).
Enforcing permissions in controllers and views: They offer methods to check permissions within controllers before executing actions and in views to conditionally display content. For example with Pundit in a controller authorize @article will check whether current user can perform an action on the @article object. With CanCanCan you might use authorize! :read, @article. In views you can conditionally display content with @article.accessible_by?(current_ability, :update) or can? :update, @article.
```

**Important points and follow-ups**

- Use can?(:update, record) or a policy check; the source’s record.accessible_by? example is not a standard CanCanCan instance predicate.

**Source references**

- SRC-01521 — [twentyseven.txt:647–654](../ruby/twentyseven.txt) (Open-78) · [complete source](sources/twentyseven.md)


---

<a id="b-0197"></a>

### B-0197 — Explain the concept of Action Cable in Ruby on Rails and how it facilitates real-time features in web applications.

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 3

**Interview question**

Explain the concept of Action Cable in Ruby on Rails and how it facilitates real-time features in web applications.

**Direct answer**

Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.

**Detailed explanation**

Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.

**Practical example**

```ruby
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
NotificationsChannel.broadcast_to(user, message: "Ready")
```

**Important points and follow-ups**

- A broadcast is not a durable job queue or a guarantee that every disconnected client receives it.
- Reference: https://guides.rubyonrails.org/action_cable_overview.html

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-00387 — [ten.txt:98–103](../ruby/ten.txt) (16) · [complete source](sources/ten.md)
- SRC-01021 — [thirtyone.txt:749–785](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01128 — [twenty.txt:239–246](../ruby/twenty.txt) (30) · [complete source](sources/twenty.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00387 (ten.txt)</summary>

**Original prompt:** Explain Action Cable in Rails.

**Answer:** Action Cable is Rails’ WebSocket integration for bidirectional real-time features through connections, channels and subscriptions.

Authenticate the connection, authorize each subscription and avoid broadcasting sensitive data to predictable unauthorized streams. Choose and operate the production adapter/server deliberately, manage reconnect behavior and treat WebSocket delivery separately from durable business events.

```ruby
class OrdersChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
OrdersChannel.broadcast_to(user, { status: "updated" })
```

</details>


---

<a id="b-0198"></a>

### B-0198 — Have you worked with WebSockets in Rails (e.g., ActionCable)?

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

Have you worked with WebSockets in Rails (e.g., ActionCable)?

**Direct answer**

Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.

**Detailed explanation**

Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.

**Practical example**

```ruby
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
NotificationsChannel.broadcast_to(user, message: "Ready")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_cable_overview.html

**Source references**

- SRC-01340 — [twentysix.txt:94–96](../ruby/twentysix.txt) (26) · [complete source](sources/twentysix.md)


---

<a id="b-0199"></a>

### B-0199 — How do you handle background jobs in Ruby applications?

**Difficulty:** Intermediate · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

How do you handle background jobs in Ruby applications?

**Direct answer**

Background jobs move work outside the request-response cycle. Use Rails Active Job with an appropriate backend, or a backend-specific interface such as Sidekiq when its features are needed.

**Detailed explanation**

Jobs need idempotent behavior because retries or redelivery may repeat work. Pass durable identifiers, set retry policies and timeouts, monitor queue lag and failures, and coordinate enqueueing with database commit. Sidekiq uses Redis and threads; Solid Queue is a database-backed Rails option. Choose according to workload and operational needs rather than assuming one default for every Rails version.

**Practical example**

```ruby
class ReportJob < ApplicationJob
  def perform(report_id)
    report = Report.find(report_id)
    report.generate_once!
  end
end
ReportJob.perform_later(report.id)
```

**Important points and follow-ups**

- A queue does not by itself provide exactly-once business effects.

**Source references**

- SRC-00267 — [eight.txt:288–293](../ruby/eight.txt) (Expert-06) · [complete source](sources/eight.md)


---

<a id="b-0200"></a>

### B-0200 — How do you implement real-time notifications using Rails?

**Difficulty:** Advanced · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

How do you implement real-time notifications using Rails?

**Direct answer**

Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.

**Detailed explanation**

Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.

**Practical example**

```ruby
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
NotificationsChannel.broadcast_to(user, message: "Ready")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_cable_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00968 — [thirtyfour.txt:139–139](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0201"></a>

### B-0201 — How do you use WebSockets or ActionCable in Rails to build real-time features?

**Difficulty:** Advanced · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

How do you use WebSockets or ActionCable in Rails to build real-time features?

**Direct answer**

Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.

**Detailed explanation**

Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.

**Practical example**

```ruby
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
NotificationsChannel.broadcast_to(user, message: "Ready")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_cable_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00956 — [thirtyfour.txt:127–127](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0202"></a>

### B-0202 — How does Rails' ActiveSupport::Notifications work for monitoring and debugging, and provide an example of subscribing to a notification event?

**Difficulty:** Advanced · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

How does Rails' ActiveSupport::Notifications work for monitoring and debugging, and provide an example of subscribing to a notification event?

**Direct answer**

Use structured request/error context, logs, traces, metrics and focused debugging to identify the failing operation, then add a regression check.

**Detailed explanation**

Log to the configured destination, often stdout in containers or log/<environment>.log locally. Filter secrets and personal data. Track latency, error rate, queue age, database saturation and resource usage. Use the debug gem or a local console for interactive inspection; do not expose development error consoles publicly. Apache logs live wherever the web server is configured, not at a universal Rails path.

**Practical example**

```ruby
Rails.logger.info(event: "order_created", order_id: order.id, request_id: request.request_id)
# config.filter_parameters += [:password, :token]
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/debugging_rails_applications.html

**Source references**

- SRC-00850 — [thirtyfive.txt:298–305](../ruby/thirtyfive.txt) (10) · [complete source](sources/thirtyfive.md)


---

<a id="b-0203"></a>

### B-0203 — What are ActionCable and WebSockets in Rails?

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

What are ActionCable and WebSockets in Rails?

**Direct answer**

Action Cable integrates WebSockets, authenticated connections, channels and pub/sub broadcasting with Rails for real-time updates.

**Detailed explanation**

Authenticate connections and authorize each subscription or resource stream. Select a shared production adapter so broadcasts reach clients connected to different processes. Background jobs can publish results, but Cable itself is not a durable job queue. Treat received client messages as untrusted input.

**Practical example**

```ruby
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
NotificationsChannel.broadcast_to(user, message: "Ready")
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_cable_overview.html

**Source references**

- SRC-01224 — [twentyfive.txt:123–129](../ruby/twentyfive.txt) (26) · [complete source](sources/twentyfive.md)


---

<a id="b-0204"></a>

### B-0204 — What are the benefits of using `ActiveJob` in Rails, and how does it work with different queueing backends?

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

What are the benefits of using `ActiveJob` in Rails, and how does it work with different queueing backends?

**Direct answer**

Active Job defines jobs and delegates execution to a queue adapter; Sidekiq is one backend, while current Rails also supports database-backed Solid Queue.

**Detailed explanation**

Enqueue durable work with perform_later and run workers for the chosen backend. Assume retries and possible repeated delivery: make effects idempotent. MRI threads help concurrent I/O; they do not guarantee parallel execution of CPU-bound Ruby code because of the GVL. Process-based workers can use multiple cores at additional memory cost.

**Practical example**

```ruby
class ReportJob < ApplicationJob
  def perform(report_id)
    report = Report.find(report_id)
    return if report.completed?
    # Generate report; guard durable effects against duplicate execution.
  end
end
ReportJob.perform_later(report.id)
```

**Important points and follow-ups**

- A queue does not guarantee exactly-once processing.
- Enqueue relative to transaction commit and handle deleted/deserialized records deliberately.
- Reference: https://guides.rubyonrails.org/active_job_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01502 — [twentyseven.txt:482–486](../ruby/twentyseven.txt) (Open-59) · [complete source](sources/twentyseven.md)


---

<a id="b-0205"></a>

### B-0205 — What is Active Job?

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 6

**Interview question**

What is Active Job?

**Direct answer**

Active Job defines jobs and delegates execution to a queue adapter; Sidekiq is one backend, while current Rails also supports database-backed Solid Queue.

**Detailed explanation**

Enqueue durable work with perform_later and run workers for the chosen backend. Assume retries and possible repeated delivery: make effects idempotent. MRI threads help concurrent I/O; they do not guarantee parallel execution of CPU-bound Ruby code because of the GVL. Process-based workers can use multiple cores at additional memory cost.

**Practical example**

```ruby
class ReportJob < ApplicationJob
  def perform(report_id)
    report = Report.find(report_id)
    return if report.completed?
    # Generate report; guard durable effects against duplicate execution.
  end
end
ReportJob.perform_later(report.id)
```

**Important points and follow-ups**

- A job backend does not guarantee exactly-once side effects. Solid Queue supports SQLite as well as PostgreSQL/MySQL.
- Reference: https://guides.rubyonrails.org/active_job_basics.html
- A queue does not guarantee exactly-once processing.
- Enqueue relative to transaction commit and handle deleted/deserialized records deliberately.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Qualified background job concurrency: job order/parallelism depend on backend and configuration.

**Source references**

- SRC-00791 — [thirtyeight.txt:188–189](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00792 — [thirtyeight.txt:190–191](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00817 — [thirtyeight.txt:244–246](../ruby/thirtyeight.txt) (2) · [complete source](sources/thirtyeight.md)
- SRC-01120 — [twenty.txt:160–168](../ruby/twenty.txt) (22) · [complete source](sources/twenty.md)
- SRC-01280 — [twentyfive.txt:551–567](../ruby/twentyfive.txt) (82) · [complete source](sources/twentyfive.md)
- SRC-01423 — [twentythree.txt:243–255](../ruby/twentythree.txt) (Q31) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00791 (thirtyeight.txt)</summary>

**Original prompt:** Explain what ActiveJob is.

**Answer:** Active Job defines and enqueues jobs through a queue adapter; a worker backend such as Solid Queue or Sidekiq performs them outside the web request.

Use jobs for email, imports and expensive independent work. Solid Queue is database-backed and is the Rails 8 default; Sidekiq uses Redis and multiple worker threads. Design jobs for retries and duplicate delivery, pass stable identifiers, bound timeouts and concurrency, and monitor queue latency/failures. Enqueue after commit when a job depends on committed data.

```ruby
class WelcomeJob < ApplicationJob
  def perform(user_id)
    UserMailer.welcome_email(User.find(user_id)).deliver_now
  end
end
WelcomeJob.perform_later(user.id)
```

</details>


---

<a id="b-0206"></a>

### B-0206 — What is Solid Queue in Rails?

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

What is Solid Queue in Rails?

**Direct answer**

Active Job defines and enqueues jobs through a queue adapter; a worker backend such as Solid Queue or Sidekiq performs them outside the web request.

**Detailed explanation**

Use jobs for email, imports and expensive independent work. Solid Queue is database-backed and is the Rails 8 default; Sidekiq uses Redis and multiple worker threads. Design jobs for retries and duplicate delivery, pass stable identifiers, bound timeouts and concurrency, and monitor queue latency/failures. Enqueue after commit when a job depends on committed data.

**Practical example**

```ruby
class WelcomeJob < ApplicationJob
  def perform(user_id)
    UserMailer.welcome_email(User.find(user_id)).deliver_now
  end
end
WelcomeJob.perform_later(user.id)
```

**Important points and follow-ups**

- A job backend does not guarantee exactly-once side effects. Solid Queue supports SQLite as well as PostgreSQL/MySQL.
- Reference: https://guides.rubyonrails.org/active_job_basics.html

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- Solid Queue also supports SQLite; it is not restricted to PostgreSQL/MySQL.

**Source references**

- SRC-01152 — [twenty.txt:469–478](../ruby/twenty.txt) (55) · [complete source](sources/twenty.md)


---

<a id="b-0207"></a>

### B-0207 — What is the ActiveJob framework, and how does it work?

**Difficulty:** Intermediate · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

What is the ActiveJob framework, and how does it work?

**Direct answer**

Active Job defines and enqueues jobs through a queue adapter; a worker backend such as Solid Queue or Sidekiq performs them outside the web request.

**Detailed explanation**

Use jobs for email, imports and expensive independent work. Solid Queue is database-backed and is the Rails 8 default; Sidekiq uses Redis and multiple worker threads. Design jobs for retries and duplicate delivery, pass stable identifiers, bound timeouts and concurrency, and monitor queue latency/failures. Enqueue after commit when a job depends on committed data.

**Practical example**

```ruby
class WelcomeJob < ApplicationJob
  def perform(user_id)
    UserMailer.welcome_email(User.find(user_id)).deliver_now
  end
end
WelcomeJob.perform_later(user.id)
```

**Important points and follow-ups**

- A job backend does not guarantee exactly-once side effects. Solid Queue supports SQLite as well as PostgreSQL/MySQL.
- Reference: https://guides.rubyonrails.org/active_job_basics.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00903 — [thirtyfour.txt:73–73](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0208"></a>

### B-0208 — What skills are needed for a Rails developer job?

**Difficulty:** Beginner · **Topic:** Background work and real-time features · **Source occurrences:** 1

**Interview question**

What skills are needed for a Rails developer job?

**Direct answer**

Prepare Ruby semantics, Rails request/data flow, SQL, testing, security, debugging and clear explanations of actual project decisions.

**Detailed explanation**

For around three years’ experience, practice implementing an endpoint, diagnosing N+1 queries, writing a migration with constraints, testing authorization, and explaining a production issue. Support answers with a real example rather than claiming tools or incidents you have not used.

**Practical example**

```text
Practice: build POST /orders with permitted input, a transaction, inventory checks, an authorization policy and request tests for success and failure.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01159 — [twenty.txt:513–515](../ruby/twenty.txt) (2) · [complete source](sources/twenty.md)


---

<a id="b-0209"></a>

### B-0209 — Describe your experience with different Rails caching techniques (e.g., fragment caching, Russian doll caching) and when you would use each one.

**Difficulty:** Advanced · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Describe your experience with different Rails caching techniques (e.g., fragment caching, Russian doll caching) and when you would use each one.

**Direct answer**

Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. Choose cache boundaries from measured expensive work, and define invalidation, key scope, expiry and failure behavior before adding a cache.

**Detailed explanation**

Fragment caching stores portions of rendered views; Russian doll caching nests fragments. Parent cache versions must change when relevant children change, often through touch: true. Low-level caching stores application data; HTTP caching uses validators or response headers. Page/action caching are historical extracted features, not simply built-in equivalents of all current caching.

**Practical example**

```erb
<% cache [current_user.role, @product] do %>
  <%= render @product %>
<% end %>
# class Comment < ApplicationRecord
#   belongs_to :article, touch: true
# end
```

**Important points and follow-ups**

- Include tenant/permission dimensions when results differ between users.
- Avoid caching live Active Record instances; cache stable values or IDs where practical.
- Reference: https://guides.rubyonrails.org/caching_with_rails.html
- A truthful project answer should include what you personally did and how the result was measured.

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The source uses a first-person illustrative story. Do not present it as your own experience. Adapt the structure to a genuine project.

**Source references**

- SRC-01533 — [twentyseven.txt:725–733](../ruby/twentyseven.txt) (Open-90) · [complete source](sources/twentyseven.md)


---

<a id="b-0210"></a>

### B-0210 — Explain the Rails initialization process.

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain the Rails initialization process.

**Direct answer**

config/application.rb defines application-wide settings; environment configuration specializes them, and initializers run during application boot.

**Detailed explanation**

config/environment.rb loads the application and initializes it. Initializers configure libraries or integrations and normally require a restart after changes. Reloadable constants should not be permanently captured during boot; use supported reload hooks such as to_prepare when needed. Keep boot work fast and free of avoidable external dependencies.

**Practical example**

```ruby
# config/application.rb
config.time_zone = "UTC"
# config/initializers/filter_parameter_logging.rb
Rails.application.config.filter_parameters += [:password]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01221 — [twentyfive.txt:114–116](../ruby/twentyfive.txt) (23) · [complete source](sources/twentyfive.md)


---

<a id="b-0211"></a>

### B-0211 — Explain the use of yield in Rails layouts.

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain the use of yield in Rails layouts.

**Direct answer**

A layout wraps view content, and yield inserts the current view or a named content_for section.

**Detailed explanation**

Use partials for reusable pieces and nested layouts when pages need an additional wrapper inside a shared application layout. content_for captures named sections; a block form needs do and a matching end. A named section only appears if the selected layout yields that name.

**Practical example**

```ruby
# layout
<title><%= content_for?(:title) ? yield(:title) : "Shop" %></title>
<main><%= yield %></main>
# view
<% content_for :title, "Products" %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/layouts_and_rendering.html

**Source references**

- SRC-01061 — [thirtysix.txt:283–410](../ruby/thirtysix.txt) (9) · [complete source](sources/thirtysix.md)


---

<a id="b-0212"></a>

### B-0212 — Explain what blocks are in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Explain what blocks are in Ruby on Rails.

**Direct answer**

A Proc is a callable object capturing a block and its lexical context; a lambda is a Proc with method-like argument and return behavior.

**Detailed explanation**

A block is passed with braces or do/end and is not automatically a standalone object. Capture it with &block when an object is needed. Lambda return exits the lambda, while non-lambda Proc return attempts to exit its defining method and can raise LocalJumpError later. Lambdas check arity more strictly than ordinary procs. yield invokes the method’s supplied block; it does not by itself create a Proc.

**Practical example**

```ruby
factor = 3
triple = ->(n) { n * factor }
triple.call(4) # 12
def with_value
  yield 10
end
with_value { |n| n + 1 } # 11
```

**Important points and follow-ups**

- Reference: https://docs.ruby-lang.org/en/master/Proc.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00783 — [thirtyeight.txt:160–161](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0213"></a>

### B-0213 — How do you handle file uploads in Rails? What gems or techniques would you use for image processing?

**Difficulty:** Intermediate · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

How do you handle file uploads in Rails? What gems or techniques would you use for image processing?

**Direct answer**

Active Storage attaches files to Active Record models and delegates storage to a configured service, such as local disk or S3.

**Detailed explanation**

Install its tables, configure the storage service, declare has_one_attached or has_many_attached, and authorize upload/download operations. Image variants use an image processor such as libvips. Validate size and actual content, and use safe serving/scanning policies. Rails 8.1 removed the built-in Azure service; older lists of supported services need version context.

**Practical example**

```bash
bin/rails active_storage:install
bin/rails db:migrate
# In User: has_one_attached :avatar
user.avatar.attach(io: File.open("avatar.png"), filename: "avatar.png")
user.avatar.variant(resize_to_limit: [100, 100])
```

**Important points and follow-ups**

- Signed blob URLs are not a complete application authorization policy.
- Direct uploads still require server-side validation and cleanup of unattached blobs.
- Reference: https://guides.rubyonrails.org/v8.1/active_storage_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01514 — [twentyseven.txt:595–602](../ruby/twentyseven.txt) (Open-71) · [complete source](sources/twentyseven.md)


---

<a id="b-0214"></a>

### B-0214 — Map

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

Map

**Direct answer**

map creates an array containing the result of applying a block to every element.

**Detailed explanation**

map is also called collect. It expresses a transformation, while each expresses iteration for side effects. For very large or unbounded streams, use a lazy enumerator when appropriate.

**Practical example**

```text
(1..4).map { |n| n * n } # [1, 4, 9, 16]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01191 — [twentyeight.txt:355–357](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0215"></a>

### B-0215 — What are the benefits of using the importmap-rails gem introduced in Rails 7 for managing JavaScript dependencies?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What are the benefits of using the importmap-rails gem introduced in Rails 7 for managing JavaScript dependencies?

**Direct answer**

importmap-rails maps JavaScript module names to browser-loadable module URLs, allowing ES modules without a JavaScript bundling step.

**Detailed explanation**

Pin reviewed dependency versions and choose local/vendor or CDN distribution deliberately. It does not transpile TypeScript/JSX or resolve every Node-specific package into a browser-ready form. Use a bundler when your source requires transformation or a package is not browser-compatible.

**Practical example**

```ruby
bin/importmap pin alpinejs
# app/javascript/application.js
import Alpine from "alpinejs"
window.Alpine = Alpine
Alpine.start()
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01150 — [twenty.txt:451–457](../ruby/twenty.txt) (53) · [complete source](sources/twenty.md)


---

<a id="b-0216"></a>

### B-0216 — What does the term “Yield” refer to in the context of Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Blocks, callables and iteration · **Source occurrences:** 1

**Interview question**

What does the term “Yield” refer to in the context of Ruby on Rails?

**Direct answer**

Ruby yield invokes the block supplied to the current method, passing any given arguments.

**Detailed explanation**

yield without a block raises LocalJumpError unless guarded by block_given?. In Rails layouts, yield is also used by the rendering machinery to insert view or named content. The Ruby keyword is lowercase, not Yield.

**Practical example**

```ruby
def twice
  return enum_for(:twice) unless block_given?
  yield 1
  yield 2
end
twice { |n| puts n }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01303 — [twentynine.txt:33–35](../ruby/twentynine.txt) (5) · [complete source](sources/twentynine.md)


---

<a id="b-0217"></a>

### B-0217 — Explain how you would implement a role-based access control (RBAC) system in a Rails application.

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

Explain how you would implement a role-based access control (RBAC) system in a Rails application.

**Direct answer**

Authentication identifies the caller; authorization decides whether that caller may perform a specific operation on a specific resource.

**Detailed explanation**

Rails 8 has an authentication generator as a starting point; Devise is another established option with a different feature set. Use policies or abilities for authorization, scope queries to accessible records, and test cross-user access. A token format such as JWT is not a complete security design.

**Practical example**

```ruby
article = current_user.articles.find(params[:id])
# With a policy library, authorize the requested action explicitly.
# bin/rails generate authentication # Rails 8 starting point
```

**Important points and follow-ups**

- UI visibility is not server-side access control.
- Keep password hashing, session rotation and object access checks separate concerns.
- Reference: https://guides.rubyonrails.org/security.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00899 — [thirtyfour.txt:69–69](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01540 — [twentyseven.txt:782–791](../ruby/twentyseven.txt) (Open-97) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00899 (thirtyfour.txt)</summary>

**Original prompt:** How can you implement role-based authorization in Rails?

**Answer:** Enforce server-side authorization for the target record and action; Strong Parameters alone does not prevent one user editing another user’s record.

Scope lookups to the current user/tenant or apply an explicit policy. For an admin-only action, check the authenticated user’s role before the action. Test unauthenticated, owner, non-owner and administrator cases and permit only the intended editable fields.

```ruby
@post = current_user.posts.find(params[:id])
@post.update!(params.require(:post).permit(:title))
# With a policy library: authorize @post, :update?
```

</details>


---

<a id="b-0218"></a>

### B-0218 — Explain the difference between ActiveSupport’s "HashWithIndifferentAccess" and Ruby’s "Hash"?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

Explain the difference between ActiveSupport’s "HashWithIndifferentAccess" and Ruby’s "Hash"?

**Direct answer**

Active Support is Rails’ collection of utility classes, extensions and support APIs such as time helpers, notifications, inflections and concerns.

**Detailed explanation**

Some extensions can be required selectively outside Rails. Know the semantics rather than relying only on convenient names: blank? and present? differ from nil? and empty?, and time/calendar operations carry timezone assumptions.

**Practical example**

```ruby
require "active_support/core_ext/object/blank"
"   ".blank? # true
false.blank? # true
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Ordinary Hash key comparison uses hash/eql? rather than simply ==.

**Source references**

- SRC-00697 — [thirty.txt:55–57](../ruby/thirty.txt) (13) · [complete source](sources/thirty.md)
- SRC-01365 — [twentytwo.txt:270–272](../ruby/twentytwo.txt) (2) · [complete source](sources/twentytwo.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00697 (thirty.txt)</summary>

**Original prompt:** Mention what is the difference between Active support’s “HashWithIndifferent” and Ruby’s “Hash”?

**Answer:** HashWithIndifferentAccess treats string and symbol keys equivalently; a normal Ruby Hash distinguishes them.

Ordinary Hash compares keys through hash/eql? semantics, not simply ==. The Active Support variant normalizes symbol keys, making request-like data convenient but not performing validation or deep business normalization.

```text
{ name: "Ada" }["name"] # nil
{ name: "Ada" }.with_indifferent_access["name"] # "Ada"
```

</details>


---

<a id="b-0219"></a>

### B-0219 — Explain what is ORM (Object-Relationship-Model) in Rails?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

Explain what is ORM (Object-Relationship-Model) in Rails?

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- ORM is Object-Relational Mapping; class/table and object/row conventions do not mean classes themselves are rows.

**Source references**

- SRC-00689 — [thirty.txt:21–23](../ruby/thirty.txt) (5) · [complete source](sources/thirty.md)


---

<a id="b-0220"></a>

### B-0220 — In a Rails application, what is the primary purpose of the flash object?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

In a Rails application, what is the primary purpose of the flash object?

**Direct answer**

Option 2: To display one-time notifications to the user after redirecting to a new page.

**Detailed explanation**

The correct choice is To display one-time notifications to the user after redirecting to a new page. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To display one-time notifications to the user after redirecting to a new page.
```

**Important points and follow-ups**

- flash is normally available for the current and next request; use flash.now for a current render and flash.keep when preserving it further.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01559 — [twentyseven.txt:992–1003](../ruby/twentyseven.txt) (MCQ-11) · [complete source](sources/twentyseven.md)


---

<a id="b-0221"></a>

### B-0221 — The following Ruby on Rails code is intended to define a validation for the name attribute in the Product model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to define a validation for the name attribute in the Product model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.

class Product < ApplicationRecord
  validates name, presence: true, length: { minimum: 3, maximum: 50 }
end
Code language: CSS (css)

**Direct answer**

Use a symbol or string naming the attribute: validates :name, presence: true, length: { minimum: 3, maximum: 50 }.

**Detailed explanation**

The bare name expression in a class body is interpreted as a method call/local expression, not the intended attribute name; in a model class it can even resolve to the class’s own name. Passing :name explicitly gives the validation DSL the correct attribute.

**Practical example**

```ruby
class Product < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_validations.html

**Corrections and source limitations**

- The source describes this as a syntax error, but the bare expression can parse and resolve to unintended behavior; the essential correction is the explicit attribute name.

**Source references**

- SRC-01000 — [thirtyone.txt:179–194](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0222"></a>

### B-0222 — What are polymorphic routes in Rails?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What are polymorphic routes in Rails?

**Direct answer**

A polymorphic belongs_to stores both the associated record’s ID and its model type so one association can point to different model classes.

**Detailed explanation**

The owner side declares has_many or has_one with as:, and the child declares belongs_to with polymorphic: true. The child belongs to one owner at a time, rather than simultaneously belonging to every model type. A conventional single foreign key cannot enforce references to multiple owner tables, so consider data integrity and class renames carefully.

**Practical example**

```ruby
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end
class Post < ApplicationRecord
  has_many :comments, as: :commentable
end
# Columns: commentable_id and commentable_type
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/association_basics.html

**Source references**

- SRC-01249 — [twentyfive.txt:292–294](../ruby/twentyfive.txt) (51) · [complete source](sources/twentyfive.md)


---

<a id="b-0223"></a>

### B-0223 — What is a Rails concern vs. a module?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is a Rails concern vs. a module?

**Direct answer**

A concern is a module, often using ActiveSupport::Concern, that groups cohesive reusable behavior; services and other objects separate workflows that do not belong to persistence models.

**Detailed explanation**

A concern can add associations or callbacks through included blocks and class methods through class_methods. It remains coupled to its host and does not reduce the host’s responsibilities merely by moving code into another file. Use composition/delegation for business workflows, validators for validation policy and form objects for multi-model input. These are design choices, not mandatory Rails layers.

**Practical example**

```ruby
module Noteable
  extend ActiveSupport::Concern
  included do
    has_many :notes, as: :noteable, dependent: :destroy
  end
end
```

**Important points and follow-ups**

- Reference: https://api.rubyonrails.org/classes/ActiveSupport/Concern.html

**Source references**

- SRC-01137 — [twenty.txt:356–375](../ruby/twenty.txt) (40) · [complete source](sources/twenty.md)


---

<a id="b-0224"></a>

### B-0224 — What is ORM(Object-Relationship-Model).

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is ORM(Object-Relationship-Model).

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- ORM is Object-Relational Mapping; class/table and object/row conventions do not mean classes themselves are rows.

**Source references**

- SRC-01348 — [twentytwo.txt:24–30](../ruby/twentytwo.txt) (3) · [complete source](sources/twentytwo.md)


---

<a id="b-0225"></a>

### B-0225 — What is the concern gem in Rails, and how does it differ from standard modules?

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the concern gem in Rails, and how does it differ from standard modules?

**Direct answer**

A concern is a module, often using ActiveSupport::Concern, that groups cohesive reusable behavior; services and other objects separate workflows that do not belong to persistence models.

**Detailed explanation**

A concern can add associations or callbacks through included blocks and class methods through class_methods. It remains coupled to its host and does not reduce the host’s responsibilities merely by moving code into another file. Use composition/delegation for business workflows, validators for validation policy and form objects for multi-model input. These are design choices, not mandatory Rails layers.

**Practical example**

```ruby
module Noteable
  extend ActiveSupport::Concern
  included do
    has_many :notes, as: :noteable, dependent: :destroy
  end
end
```

**Important points and follow-ups**

- Reference: https://api.rubyonrails.org/classes/ActiveSupport/Concern.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00961 — [thirtyfour.txt:132–132](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0226"></a>

### B-0226 — What is the difference between class methods and instance methods?

**Difficulty:** Intermediate · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the difference between class methods and instance methods?

**Direct answer**

An instance method is called on instances, while a class method is a singleton method on the class object.

**Detailed explanation**

Use instance methods for behavior dependent on one object’s state and class methods for class-level operations or factories. A class method is not a method made available automatically on every instance.

**Practical example**

```ruby
class Article
  def word_count = body.split.length
  def self.named(name) = where(author: name)
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01040 — [thirtyseven.txt:130–138](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0227"></a>

### B-0227 — What is the Object Relationship Model (ORM) in Rails?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the Object Relationship Model (ORM) in Rails?

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Source references**

- SRC-01305 — [twentynine.txt:39–41](../ruby/twentynine.txt) (7) · [complete source](sources/twentynine.md)


---

<a id="b-0228"></a>

### B-0228 — What is the params object in Rails?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

What is the params object in Rails?

**Direct answer**

Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.

**Detailed explanation**

Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.

**Practical example**

```ruby
def user_params
  params.require(:user).permit(:name, :email)
end
# Rails 8+: params.expect(user: [:name, :email])
# Ownership must still be checked: current_user.posts.find(params[:id])
```

**Important points and follow-ups**

- Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00881 — [thirtyfour.txt:50–50](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01237 — [twentyfive.txt:225–227](../ruby/twentyfive.txt) (39) · [complete source](sources/twentyfive.md)


---

<a id="b-0229"></a>

### B-0229 — What is the purpose of the ApplicationRecord class in Rails?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the purpose of the ApplicationRecord class in Rails?

**Direct answer**

Define User as a subclass of ApplicationRecord; ApplicationRecord is the application’s abstract Active Record base class.

**Detailed explanation**

The User class maps to users by convention. Shared model configuration can live in ApplicationRecord. Defining a Ruby class alone does not create a database table; use a migration. Keep application-wide callbacks in the base class rare because they affect every model.

**Practical example**

```ruby
class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class
end
class User < ApplicationRecord
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01086 — [thirtytwo.txt:108–110](../ruby/thirtytwo.txt) (19) · [complete source](sources/thirtytwo.md)


---

<a id="b-0230"></a>

### B-0230 — What is the Rails.cache object, and how do you use it for caching data?

**Difficulty:** Advanced · **Topic:** Classes, modules and OOP · **Source occurrences:** 1

**Interview question**

What is the Rails.cache object, and how do you use it for caching data?

**Direct answer**

Caching stores reusable results to avoid repeating database, rendering or computation work; choose keys, expiry and invalidation based on the data’s lifetime.

**Detailed explanation**

Use fragment/collection caching for views, low-level Rails.cache.fetch for computed values, and HTTP conditional caching where suitable. Include relevant tenant/user permissions in keys when content differs by audience. Russian-doll caching nests fragment caches with dependencies. Page/action caching are historical features extracted from Rails core; they are not universal modern defaults.

**Practical example**

```ruby
Rails.cache.fetch(["product", product.id, product.updated_at], expires_in: 10.minutes) do
  expensive_summary(product)
end
# View:
<% cache @product do %><%= render @product %><% end %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/caching_with_rails.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00940 — [thirtyfour.txt:111–111](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0231"></a>

### B-0231 — Where one should look for the controller classes for handling the web request in Ruby?

**Difficulty:** Beginner · **Topic:** Classes, modules and OOP · **Source occurrences:** 2

**Interview question**

Where one should look for the controller classes for handling the web request in Ruby?

**Direct answer**

Controllers coordinate HTTP requests and responses; Rails finds controller classes in app/controllers, while app/helpers holds view helper modules.

**Detailed explanation**

The router selects an action. Controllers handle request-level concerns such as permitted input, resource authorization, response format and status. Model/domain objects own persistence and business invariants. Helpers are primarily for presentation; they are not a general dumping ground for model or controller logic.

**Practical example**

```ruby
class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00721 — [thirty.txt:149–151](../ruby/thirty.txt) (37) · [complete source](sources/thirty.md)
- SRC-00739 — [thirtyeight.txt:48–49](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0232"></a>

### B-0232 — Explain how you can run Rails application without creating databases?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Explain how you can run Rails application without creating databases?

**Direct answer**

Generate an application with --skip-active-record when no relational persistence is needed.

**Detailed explanation**

Alternatively remove Active Record railties and configuration carefully in an existing app. A Rails application can serve requests without a database, but components such as database-backed jobs or authentication persistence may still need one. config.frameworks in environment.rb is obsolete.

**Practical example**

```bash
rails new brochure --skip-active-record
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.

**Source references**

- SRC-00700 — [thirty.txt:67–73](../ruby/thirty.txt) (16) · [complete source](sources/thirty.md)


---

<a id="b-0233"></a>

### B-0233 — Explain Ruby’s ActiveRecord and how it is used in Rails applications.

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Explain Ruby’s ActiveRecord and how it is used in Rails applications.

**Direct answer**

Active Record is Rails’ object-relational mapping layer, exposing database rows through Ruby objects and query relations, with associations, validations and callbacks.

**Detailed explanation**

A model typically maps to a table by naming convention; objects represent rows and columns become attributes. Relations compose and usually execute lazily. Model validations help user-facing correctness, but database constraints are needed for integrity under concurrent requests. Query methods still generate SQL and can be inefficient or unsafe if raw interpolated fragments are supplied.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
  validates :email, presence: true
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- Active Record is a Rails component, not part of Ruby core.

**Source references**

- SRC-00258 — [eight.txt:197–202](../ruby/eight.txt) (Mid-07) · [complete source](sources/eight.md)


---

<a id="b-0234"></a>

### B-0234 — Explain the purpose of Active Record in Ruby on Rails and how it simplifies database interactions.

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Explain the purpose of Active Record in Ruby on Rails and how it simplifies database interactions.

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Source references**

- SRC-01015 — [thirtyone.txt:611–626](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0235"></a>

### B-0235 — Explain what ActiveRecord is in Ruby on Rails and how it simplifies database interactions.

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Explain what ActiveRecord is in Ruby on Rails and how it simplifies database interactions.

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Source references**

- SRC-01005 — [thirtyone.txt:287–300](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0236"></a>

### B-0236 — How Convention over Configuration works in Active Record?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How Convention over Configuration works in Active Record?

**Direct answer**

Convention over configuration supplies predictable defaults; DRY avoids duplicating the same knowledge across the application.

**Detailed explanation**

For example, User maps to users and UsersController conventionally renders views under users. Configure exceptions explicitly. DRY is about keeping one authoritative rule, not forcing unrelated code into a shared abstraction solely because two lines look alike.

**Practical example**

```ruby
class User < ApplicationRecord
  # Convention: users table, id primary key
end
# Exception:
class LegacyUser < ApplicationRecord
  self.table_name = "people_archive"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01084 — [thirtytwo.txt:98–100](../ruby/thirtytwo.txt) (17) · [complete source](sources/thirtytwo.md)


---

<a id="b-0237"></a>

### B-0237 — How do you integrate multiple databases in a Rails application?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 2

**Interview question**

How do you integrate multiple databases in a Rails application?

**Direct answer**

Rails supports multiple database configurations, role switching for writing/reading, and horizontal sharding where configured.

**Detailed explanation**

Declare connections on appropriate abstract model classes and configure database.yml with separate databases/roles. Plan migrations and connection pool capacity per database. Transactions are not automatically atomic across databases, and reading from replicas must account for lag.

**Practical example**

```ruby
class AnimalsRecord < ApplicationRecord
  self.abstract_class = true
  connects_to database: { writing: :animals, reading: :animals_replica }
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_multiple_databases.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00664 — [fifteen.txt:109–109](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00799 — [thirtyeight.txt:204–205](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0238"></a>

### B-0238 — How does Rails handle database migrations, and why is it important for the development process?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How does Rails handle database migrations, and why is it important for the development process?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01014 — [thirtyone.txt:597–610](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0239"></a>

### B-0239 — How does Rails manage database state?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How does Rails manage database state?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01041 — [thirtyseven.txt:139–147](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0240"></a>

### B-0240 — How does the has_many :through association work?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How does the has_many :through association work?

**Direct answer**

Associations describe model relationships using belongs_to, has_one, has_many, has_many :through, has_one :through, or has_and_belongs_to_many.

**Detailed explanation**

A belongs_to normally places the foreign key on the declaring model; has_many places it on the associated rows. belongs_to alone does not imply a one-to-one relationship. Use a unique foreign-key index for a true one-to-one relationship. Migrations must create the required columns and constraints; declaring association macros alone does not alter the schema.

**Practical example**

```ruby
class Author < ApplicationRecord
  has_many :books
end
class Book < ApplicationRecord
  belongs_to :author
end
# books.author_id references authors.id
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/association_basics.html

**Source references**

- SRC-01206 — [twentyfive.txt:41–43](../ruby/twentyfive.txt) (8) · [complete source](sources/twentyfive.md)


---

<a id="b-0241"></a>

### B-0241 — How many types of Association relationships does a Model have?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 12

**Interview question**

How many types of Association relationships does a Model have?

**Direct answer**

Rails associations describe object relationships: belongs_to, has_one, has_many, has_many :through, has_one :through, and has_and_belongs_to_many.

**Detailed explanation**

belongs_to declares the foreign-key-owning side; it does not on its own make the database relationship one-to-one. Pair it with has_many for many children per parent, or has_one plus a unique foreign-key index for one-to-one. Ordinary foreign keys and uniqueness constraints enforce integrity independently of Rails validations.

**Practical example**

```ruby
class Author < ApplicationRecord
  has_many :books
end
class Book < ApplicationRecord
  belongs_to :author
end
Book.joins(:author).where(authors: { name: "Jane Doe" })
```

**Important points and follow-ups**

- Foreign keys/indexes enforce integrity and efficiency; association declarations alone do not.
- Reference: https://guides.rubyonrails.org/association_basics.html
- Deleting a parent does not automatically delete children unless dependent behavior or database constraints require it.
- Decide on nullability, foreign keys, indexes and dependent behavior explicitly.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Distinguished three cardinalities from the six association declaration forms.
- Corrected belongs_to as not inherently enforcing a one-to-one database relationship.

**Source references**

- SRC-00045 — [first.txt:297–301](../ruby/first.txt) (15) · [complete source](sources/first.md)
- SRC-00650 — [fifteen.txt:91–91](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-00807 — [thirtyeight.txt:220–221](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00820 — [thirtyeight.txt:253–260](../ruby/thirtyeight.txt) (5) · [complete source](sources/thirtyeight.md)
- SRC-00872 — [thirtyfour.txt:41–41](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00991 — [thirtyfour.txt:562–576](../ruby/thirtyfour.txt) (22) · [complete source](sources/thirtyfour.md)
- SRC-01097 — [thirtytwo.txt:143–145](../ruby/thirtytwo.txt) (30) · [complete source](sources/thirtytwo.md)
- SRC-01319 — [twentysix.txt:27–29](../ruby/twentysix.txt) (5) · [complete source](sources/twentysix.md)
- SRC-01404 — [twentythree.txt:72–77](../ruby/twentythree.txt) (Q12) · [complete source](sources/twentythree.md)
- SRC-01433 — [twentythree.txt:460–468](../ruby/twentythree.txt) (Q41) · [complete source](sources/twentythree.md)
- SRC-01488 — [twentyseven.txt:367–371](../ruby/twentyseven.txt) (Open-45) · [complete source](sources/twentyseven.md)
- SRC-01500 — [twentyseven.txt:467–476](../ruby/twentyseven.txt) (Open-57) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00045 (first.txt)</summary>

**Original prompt:** Explain the concept of associations in ActiveRecord.

**Answer:** Active Record associations declare model relationships such as belongs_to, has_many and has_one; through associations model join relationships.

In ActiveRecord, associations define the relationships between different models in a Rails application. Associations establish how different records are related to each other in the database. Common types of associations include has_many, belongs_to, has_one, and has_and_belongs_to_many.

These associations simplify the process of querying and manipulating related data, allowing you to build complex queries and manage connections between models easily.

```ruby
class User < ApplicationRecord
  has_many :posts
end
class Post < ApplicationRecord
  belongs_to :user
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00650 (fifteen.txt)</summary>

**Original prompt:** How do Active Record associations work?

**Answer:** Associations describe model relationships using belongs_to, has_one, has_many, has_many :through, has_one :through, or has_and_belongs_to_many.

A belongs_to normally places the foreign key on the declaring model; has_many places it on the associated rows. belongs_to alone does not imply a one-to-one relationship. Use a unique foreign-key index for a true one-to-one relationship. Migrations must create the required columns and constraints; declaring association macros alone does not alter the schema.

```ruby
class Author < ApplicationRecord
  has_many :books
end
class Book < ApplicationRecord
  belongs_to :author
end
# books.author_id references authors.id
```

</details>


---

<a id="b-0242"></a>

### B-0242 — How to override primary key in Active Record?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How to override primary key in Active Record?

**Direct answer**

Assign self.primary_key to the column serving as the model’s primary key.

**Detailed explanation**

The database must enforce appropriate uniqueness and nullability. Related models may need matching primary_key/foreign_key options. Changing the model setting does not modify database constraints.

**Practical example**

```ruby
class Product < ApplicationRecord
  self.primary_key = "product_id"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01088 — [thirtytwo.txt:115–118](../ruby/thirtytwo.txt) (21) · [complete source](sources/thirtytwo.md)


---

<a id="b-0243"></a>

### B-0243 — How to override table name in Active Record?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How to override table name in Active Record?

**Direct answer**

Assign self.table_name in the model when a legacy table does not follow Rails naming conventions.

**Detailed explanation**

The override changes the table used for model persistence and queries. Check primary-key and foreign-key configuration separately, and preserve conventions unless an existing schema requires a different mapping.

**Practical example**

```ruby
class Product < ApplicationRecord
  self.table_name = "legacy_products"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01087 — [thirtytwo.txt:111–114](../ruby/thirtytwo.txt) (20) · [complete source](sources/thirtytwo.md)


---

<a id="b-0244"></a>

### B-0244 — How to run and rollback Active Record migration?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How to run and rollback Active Record migration?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01096 — [thirtytwo.txt:140–142](../ruby/thirtytwo.txt) (29) · [complete source](sources/thirtytwo.md)


---

<a id="b-0245"></a>

### B-0245 — How would you handle a large number of database records in Rails (e.g., pagination, batch processing)?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

How would you handle a large number of database records in Rails (e.g., pagination, batch processing)?

**Direct answer**

Process large tables in bounded batches, paginate user interfaces, and stream exports instead of building everything in memory.

**Detailed explanation**

find_each iterates records in batches; in_batches exposes a relation per batch for bulk work. Use stable ordering/cursors, bound transaction size, and account for records changing during a run. For imports validate and stage data, use idempotent upserts with unique constraints, and record progress. CSV.generate_stream is not a Ruby standard CSV API.

**Practical example**

```ruby
User.where(active: true).find_each(batch_size: 500) do |user|
  ExportRowJob.perform_later(user.id)
end
# For CSV output, write each row to an IO:
CSV.open("users.csv", "w") { |csv| User.find_each { |u| csv << [u.id, u.email] } }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00951 — [thirtyfour.txt:122–122](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0246"></a>

### B-0246 — List out what can Rails Migration do.

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 2

**Interview question**

List out what can Rails Migration do.

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- Not every migration is automatically reversible. Large-table changes need lock and rollout planning.
- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00020 — [first.txt:160–169](../ruby/first.txt) (20) · [complete source](sources/first.md)
- SRC-01401 — [twentythree.txt:56–64](../ruby/twentythree.txt) (Q9) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00020 (first.txt)</summary>

**Original prompt:** List out what can Rails Migration do.

**Answer:** Migrations version schema changes: create/drop/rename tables, add/remove/rename/change columns, add indexes, and manage constraints.

This is an important Ruby interview question. Rails Migration can do the following things:

Create table
Rename column
Change column
Remove column
Drop table
Rename table
Add column

```ruby
# In an application migration:
# add_index :users, :email, unique: true
```

</details>


---

<a id="b-0247"></a>

### B-0247 — Mention what is the command to create a migration?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 5

**Interview question**

Mention what is the command to create a migration?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate is a historical Rails command.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html
- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.

**Source references**

- SRC-00343 — [nine.txt:560–565](../ruby/nine.txt) (72) · [complete source](sources/nine.md)
- SRC-00437 — [eleven.txt:191–196](../ruby/eleven.txt) (14) · [complete source](sources/eleven.md)
- SRC-00695 — [thirty.txt:47–51](../ruby/thirty.txt) (11) · [complete source](sources/thirty.md)
- SRC-01266 — [twentyfive.txt:459–467](../ruby/twentyfive.txt) (68) · [complete source](sources/twentyfive.md)
- SRC-01357 — [twentytwo.txt:230–240](../ruby/twentytwo.txt) (12) · [complete source](sources/twentytwo.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00343 (nine.txt)</summary>

**Original prompt:** Mention What Is The Command To Create A Migration?

**Answer:** A Rails migration is a versioned Ruby description of database changes. Generate it with bin/rails generate migration and apply pending changes with bin/rails db:migrate.

Migrations evolve schema consistently across environments; reversible operations can use change, while operations that Rails cannot reverse need reversible or explicit up/down methods. Data backfills and index creation on large live tables need deployment planning; database portability is not automatic for every SQL operation or index feature.

```bash
bin/rails generate migration AddStatusToUsers status:string
bin/rails db:migrate
bin/rails db:rollback
```

</details>


---

<a id="b-0248"></a>

### B-0248 — The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code.

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code.

<%= form_tag products_path do %>
  <%= label_tag :name, "Product Name" %>
  <%= text_field_tag :name %>

  <%= label_tag :price, "Price" %>
  <%= text_field_tag :price %>

  <%= submit_tag "Add Product" %>
<%= end_form_tag %>
Code language: HTML, XML (xml)

**Direct answer**

Replace the nonexistent end_form_tag with the ERB block terminator <% end %>. form_tag itself is valid legacy helper syntax.

**Detailed explanation**

The source unnecessarily says form_tag must be replaced by form_for. A modern model-backed form normally uses form_with, which also produces nested parameter names expected by Strong Parameters. Match controller parameter handling to the chosen form shape.

**Practical example**

```erb
<%= form_with(model: @product) do |f| %>
  <%= f.label :name %>
  <%= f.text_field :name %>
  <%= f.label :price %>
  <%= f.number_field :price, step: "0.01" %>
  <%= f.submit "Add Product" %>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Corrected invalid end_form_tag; form_tag is not intrinsically wrong.

**Source references**

- SRC-00996 — [thirtyone.txt:91–118](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0249"></a>

### B-0249 — The following Ruby on Rails code is intended to create a new article record and save it to the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to create a new article record and save it to the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.

# Controller
class ArticlesController < ApplicationController
  def create
    @article = Article.new(params[:article])
    if @article.save
      redirect_to articles_path
    else
      render 'new'
    end
  end
end

# View (new.html.erb)
<%= form_for @article do |f| %>
  <%= f.label :title %>
  <%= f.text_field :title %>

  <%= f.label :content %>
  <%= f.text_area :content %>

  <%= f.submit 'Create Article' %>
<% end %>
Code language: CSS (css)

**Direct answer**

The issue is unpermitted parameters during mass assignment in modern Rails, not a Ruby syntax error.

**Detailed explanation**

Use a private method returning permitted attributes, instantiate the article through an authorized scope where relevant, and handle invalid data with an appropriate response. The form’s nested article fields should match the expected input shape.

**Practical example**

```ruby
def create
  @article = current_user.articles.new(article_params)
  if @article.save
    redirect_to @article, status: :see_other
  else
    render :new, status: :unprocessable_entity
  end
end
private
def article_params
  params.require(:article).permit(:title, :content)
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source misclassifies ForbiddenAttributesError/mass-assignment handling as a syntax error.

**Source references**

- SRC-01006 — [thirtyone.txt:301–360](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0250"></a>

### B-0250 — The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error …

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.

class Product < ApplicationRecord
  belongs_to :category
end

class Category < ApplicationRecord
  has_many :products
end
Code language: CSS (css)

**Direct answer**

The associations shown already form a valid one-to-many relationship. Add optional: true only if the business permits a product with no category.

**Detailed explanation**

Modern belongs_to requires an associated record by default in newly configured applications. That is a valid integrity rule rather than a coding defect. The database should have category_id and an appropriate foreign key/nullability policy. Making an association optional without a requirement can weaken data integrity.

**Practical example**

```ruby
class Product < ApplicationRecord
  belongs_to :category
end
class Category < ApplicationRecord
  has_many :products
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/association_basics.html

**Corrections and source limitations**

- Source invents an optionality requirement and presents valid code as logically incorrect.

**Source references**

- SRC-00998 — [thirtyone.txt:141–164](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0251"></a>

### B-0251 — The following Ruby on Rails code is intended to define a simple controller action to retrieve and display a list of products from the database. However, it contains a syntax error and doesn’t work as expected. Identif…

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to define a simple controller action to retrieve and display a list of products from the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.

class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
end
Code language: JavaScript (javascript)

**Direct answer**

The controller shown has no Ruby syntax error. If the list fails, inspect the route, Product model/table, template location and actual database contents.

**Detailed explanation**

Product.all is a valid lazy relation and the controller action is syntactically valid. A model definition in another file is normal Rails organization, so its absence from the pasted snippet is not proof of a defect. Do not invent a missing model as the only possible root cause.

**Practical example**

```ruby
# Valid controller:
class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
end
# Conventional app/models/product.rb:
class Product < ApplicationRecord; end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source falsely labels valid controller code as a syntax error.

**Source references**

- SRC-00994 — [thirtyone.txt:51–76](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0252"></a>

### B-0252 — The following Ruby on Rails code is intended to delete an article record from the database when the user clicks the “Delete” link. However, it contains a logical error and doesn’t delete the article. Identify the erro…

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to delete an article record from the database when the user clicks the “Delete” link. However, it contains a logical error and doesn’t delete the article. Identify the error and fix the code.

# Controller
class ArticlesController < ApplicationController
  def destroy
    @article = Article.find(params[:id])
    if @article.destroy
      redirect_to articles_path
    else
      flash[:error] = 'Failed to delete the article.'
      redirect_to article_path(@article)
    end
  end
end

# View (show.html.erb)
<%= link_to 'Delete', article_path(@article), method: :delete, data: { confirm: 'Are you sure?' } %>

**Direct answer**

The before/after source code is identical. Whether method: :delete works depends on the frontend driver; prefer button_to, or use Turbo’s supported attributes.

**Detailed explanation**

Rails-UJS recognizes link_to method: :delete and data-confirm. A modern Turbo application uses data-turbo-method/data-turbo-confirm for links. An ordinary anchor without the relevant JavaScript issues GET, so inspect the actual network request and routes before diagnosing. The controller must authorize deletion and handle callback aborts.

**Practical example**

```erb
<%= button_to "Delete", article_path(@article), method: :delete, data: { turbo_confirm: "Are you sure?" } %>
# In destroy after success:
redirect_to articles_path, status: :see_other
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source’s proposed fix repeats the original and ignores Rails-UJS versus Turbo behavior.

**Source references**

- SRC-01010 — [thirtyone.txt:465–502](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0253"></a>

### B-0253 — The following Ruby on Rails code is intended to display a list of articles and their corresponding authors on the index page. However, it contains a logical error and doesn’t display the authors correctly. Identify th…

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to display a list of articles and their corresponding authors on the index page. However, it contains a logical error and doesn’t display the authors correctly. Identify the error

and fix the code.

# Models
class Article < ApplicationRecord
  belongs_to :author
end

class Author < ApplicationRecord
  has_many :articles
end

# Controller
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end
end

# View (index.html.erb)
<% @articles.each do |article| %>
  <p><%= article.title %> - <%= article.author.name %></p>
<% end %>
Code language: CSS (css)

**Direct answer**

The association access can display correctly; the observed problem in the snippet is N+1 query behavior, not an inherently incorrect author name.

**Detailed explanation**

Use includes(:author) or preload(:author) when rendering authors for a collection. If the author is optional and nil, handle that domain case separately; eager loading does not create a missing author. This normally reduces many per-row queries to a bounded query set.

**Practical example**

```ruby
@articles = Article.includes(:author).limit(50)
# View:
<% @articles.each do |article| %>
  <p><%= article.title %> — <%= article.author&.name || "Unknown author" %></p>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- Source conflates an N+1 performance problem with incorrect display.

**Source references**

- SRC-01012 — [thirtyone.txt:533–585](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0254"></a>

### B-0254 — The following Ruby on Rails code is intended to fetch a list of articles from the database and display their titles. However, it contains a logical error and doesn’t display any articles. Identify the error and fix th…

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to fetch a list of articles from the database and display their titles. However, it contains a logical error and doesn’t display any articles. Identify the error and fix the code.

# Controller
class ArticlesController < ApplicationController
  def index
    @articles = Article.all
  end
end

# View (index.html.erb)
<% @articles.each do |article| %>
  <p><%= article.title %></p>
<% end %>
Code language: CSS (css)

**Direct answer**

The displayed controller and ERB loop are already valid and already use <%= article.title %>; the source’s proposed correction is identical.

**Detailed explanation**

If no articles appear, confirm route/action execution, the expected template, nonempty data and any scopes/authorization filters. If an exception occurs, inspect the real exception. Do not claim a missing output tag when the provided tag is already correct.

**Practical example**

```ruby
@articles = Article.all
# index.html.erb
<% @articles.each do |article| %>
  <p><%= article.title %></p>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source supplies identical before/after code and invents an ERB output-tag error.

**Source references**

- SRC-01004 — [thirtyone.txt:255–286](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0255"></a>

### B-0255 — The following Ruby on Rails code is intended to update an existing article’s title and content in the database. However, it contains a logical error and doesn’t update the article as expected. Identify the error and f…

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

The following Ruby on Rails code is intended to update an existing article’s title and content in the database. However, it contains a logical error and doesn’t update the article as expected. Identify the error and fix the code.

# Controller
class ArticlesController < ApplicationController
  def update
    @article = Article.find(params[:id])
    if @article.update(params[:article])
      redirect_to article_path(@article)
    else
      render 'edit'
    end
  end
end

# View (edit.html.erb)
<%= form_for @article do |f| %>
  <%= f.label :title %>
  <%= f.text_field :title %>

  <%= f.label :content %>
  <%= f.text_area :content %>

  <%= f.submit 'Update Article' %>
<% end %>
Code language: CSS (css)

**Direct answer**

Update with explicitly permitted fields after retrieving an authorized article, instead of passing unpermitted params[:article] directly.

**Detailed explanation**

The source’s intended mass-assignment fix is valid in modern Rails, but authorization must also constrain which record may be updated. Strong Parameters controls attributes, not ownership. The update method returns false when validations fail; respond with errors rather than claiming success.

**Practical example**

```ruby
def update
  @article = current_user.articles.find(params[:id])
  if @article.update(article_params)
    redirect_to @article, status: :see_other
  else
    render :edit, status: :unprocessable_entity
  end
end
private
def article_params
  params.require(:article).permit(:title, :content)
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01008 — [thirtyone.txt:385–444](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0256"></a>

### B-0256 — What are migrations, and how do you roll back a migration in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What are migrations, and how do you roll back a migration in Rails?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00911 — [thirtyfour.txt:81–81](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0257"></a>

### B-0257 — What are the common data types in Rails migrations?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What are the common data types in Rails migrations?

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html
- JSON is not PostgreSQL-only; adapters including MySQL and SQLite offer differing JSON support. References default key size and foreign-key creation depend on explicit options and Rails configuration.

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01470 — [twentyseven.txt:212–231](../ruby/twentyseven.txt) (Open-27) · [complete source](sources/twentyseven.md)


---

<a id="b-0258"></a>

### B-0258 — What are the differences between create! and create in ActiveRecord?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What are the differences between create! and create in ActiveRecord?

**Direct answer**

The non-bang persistence method reports validation failure without raising; its bang counterpart raises an exception on failure.

**Detailed explanation**

save returns true or false and save! raises ActiveRecord::RecordInvalid for invalid data. create returns the instantiated object, which may be unpersisted; create! raises on validation failure. Database errors may raise even for non-bang calls, and callback aborts have their own failure behavior.

**Practical example**

```ruby
user = User.create(email: nil)
user.persisted? # false if email is required
User.create!(email: nil) # raises ActiveRecord::RecordInvalid
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00926 — [thirtyfour.txt:96–96](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0259"></a>

### B-0259 — What are the optional reserved column names you can use in Active Record?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What are the optional reserved column names you can use in Active Record?

**Direct answer**

Rails recognizes columns such as created_at, updated_at, lock_version, type, polymorphic *_type columns and association counter-cache columns.

**Detailed explanation**

created_at/updated_at support timestamps, lock_version enables optimistic locking, and type activates single-table inheritance by default. These names are conventions, not a ban on all other columns. Counter caches ordinarily use the associated table’s plural name, such as comments_count.

**Practical example**

```text
add_column :posts, :lock_version, :integer, default: 0, null: false
add_column :posts, :comments_count, :integer, default: 0, null: false
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01085 — [thirtytwo.txt:101–107](../ruby/thirtytwo.txt) (18) · [complete source](sources/thirtytwo.md)


---

<a id="b-0260"></a>

### B-0260 — What do you mean by Polymorphic Association in Rails?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 8

**Interview question**

What do you mean by Polymorphic Association in Rails?

**Direct answer**

A polymorphic belongs_to lets one association refer to different model types using a type column and an ID column.

**Detailed explanation**

For example, comments can belong to articles or photos. The pair identifies one target for each comment, not multiple simultaneous parents. A conventional foreign key cannot reference several target tables, so integrity and rename/migration behavior need special care.

**Practical example**

```ruby
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end
class Article < ApplicationRecord
  has_many :comments, as: :commentable
end
# comments: commentable_type, commentable_id; index both together
```

**Important points and follow-ups**

- Add the appropriate compound index and explicit authorization on the selected target.
- Reference: https://guides.rubyonrails.org/association_basics.html
- Never trust arbitrary client-supplied model names for constant lookup.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00384 — [ten.txt:86–88](../ruby/ten.txt) (13) · [complete source](sources/ten.md)
- SRC-00849 — [thirtyfive.txt:282–297](../ruby/thirtyfive.txt) (09) · [complete source](sources/thirtyfive.md)
- SRC-00896 — [thirtyfour.txt:66–66](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01135 — [twenty.txt:334–344](../ruby/twenty.txt) (37) · [complete source](sources/twenty.md)
- SRC-01188 — [twentyeight.txt:333–339](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)
- SRC-01211 — [twentyfive.txt:59–61](../ruby/twentyfive.txt) (13) · [complete source](sources/twentyfive.md)
- SRC-01428 — [twentythree.txt:305–307](../ruby/twentythree.txt) (Q36) · [complete source](sources/twentythree.md)
- SRC-01503 — [twentyseven.txt:487–491](../ruby/twentyseven.txt) (Open-60) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00384 (ten.txt)</summary>

**Original prompt:** What is a Polymorphic Association?

**Answer:** A polymorphic belongs_to association stores both an identifier and a type so one association can target different model classes.

For example a Comment may belong to a Post or User through commentable_id and commentable_type. Each comment belongs to one target, not simultaneously to every supported type. Renaming classes requires considering stored type values, and conventional foreign keys cannot directly enforce a polymorphic target across multiple tables.

```ruby
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end
class Post < ApplicationRecord
  has_many :comments, as: :commentable
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00849 (thirtyfive.txt)</summary>

**Original prompt:** How does Rails handle polymorphic associations?

**Answer:** A polymorphic belongs_to stores both the associated record’s ID and its model type so one association can point to different model classes.

The owner side declares has_many or has_one with as:, and the child declares belongs_to with polymorphic: true. The child belongs to one owner at a time, rather than simultaneously belonging to every model type. A conventional single foreign key cannot enforce references to multiple owner tables, so consider data integrity and class renames carefully.

```ruby
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end
class Post < ApplicationRecord
  has_many :comments, as: :commentable
end
# Columns: commentable_id and commentable_type
```

</details>


---

<a id="b-0261"></a>

### B-0261 — What do you mean by the term Rail Migration?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What do you mean by the term Rail Migration?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-00725 — [thirty.txt:161–163](../ruby/thirty.txt) (41) · [complete source](sources/thirty.md)


---

<a id="b-0262"></a>

### B-0262 — What do you understand about Rails Active Record in ROR?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What do you understand about Rails Active Record in ROR?

**Direct answer**

Active Record is Rails’ Object-Relational Mapping library, providing persistence, query composition, associations, validations and lifecycle callbacks.

**Detailed explanation**

By convention, User maps to users and each instance represents one row. It is a Rails component, not a Ruby language subsection. It generates SQL but does not remove the need for constraints, indexing or safe raw-query practices.

**Practical example**

```ruby
class User < ApplicationRecord
  validates :email, presence: true
end
User.where(active: true).limit(20)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-01108 — [twenty.txt:76–83](../ruby/twenty.txt) (10) · [complete source](sources/twenty.md)


---

<a id="b-0263"></a>

### B-0263 — What does it mean that Active Record migrations are database-agnostic?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What does it mean that Active Record migrations are database-agnostic?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01094 — [thirtytwo.txt:134–136](../ruby/thirtytwo.txt) (27) · [complete source](sources/thirtytwo.md)


---

<a id="b-0264"></a>

### B-0264 — What exactly do you know about the Active Records Rail?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What exactly do you know about the Active Records Rail?

**Direct answer**

Active Record is Rails’ Object-Relational Mapping library, providing persistence, query composition, associations, validations and lifecycle callbacks.

**Detailed explanation**

By convention, User maps to users and each instance represents one row. It is a Rails component, not a Ruby language subsection. It generates SQL but does not remove the need for constraints, indexing or safe raw-query practices.

**Practical example**

```ruby
class User < ApplicationRecord
  validates :email, presence: true
end
User.where(active: true).limit(20)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00713 — [thirty.txt:115–117](../ruby/thirty.txt) (29) · [complete source](sources/thirty.md)


---

<a id="b-0265"></a>

### B-0265 — What is a migration rollback? How do you use it?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is a migration rollback? How do you use it?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01231 — [twentyfive.txt:180–186](../ruby/twentyfive.txt) (33) · [complete source](sources/twentyfive.md)


---

<a id="b-0266"></a>

### B-0266 — What is a polymorphic has_many association, and how does it differ from a regular has_many?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is a polymorphic has_many association, and how does it differ from a regular has_many?

**Direct answer**

A polymorphic belongs_to stores both the associated record’s ID and its model type so one association can point to different model classes.

**Detailed explanation**

The owner side declares has_many or has_one with as:, and the child declares belongs_to with polymorphic: true. The child belongs to one owner at a time, rather than simultaneously belonging to every model type. A conventional single foreign key cannot enforce references to multiple owner tables, so consider data integrity and class renames carefully.

**Practical example**

```ruby
class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
end
class Post < ApplicationRecord
  has_many :comments, as: :commentable
end
# Columns: commentable_id and commentable_type
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/association_basics.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00946 — [thirtyfour.txt:117–117](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0267"></a>

### B-0267 — What is ActiveRecord::Enum in Rails?

**Difficulty:** Advanced · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is ActiveRecord::Enum in Rails?

**Direct answer**

Rails enum maps an attribute to named states backed by explicit integer or string values.

**Detailed explanation**

Use explicit mappings so adding or reordering names does not reinterpret existing database values. Modern Rails uses positional name/value arguments. Ruby itself has no general enum keyword corresponding to this Rails macro.

**Practical example**

```text
enum :status, { draft: 0, published: 1 }
post.published?
post.published!
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00844 — [thirtyfive.txt:232–239](../ruby/thirtyfive.txt) (04) · [complete source](sources/thirtyfive.md)


---

<a id="b-0268"></a>

### B-0268 — What is an Active Record in Rails?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is an Active Record in Rails?

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Source references**

- SRC-01077 — [thirtytwo.txt:73–75](../ruby/thirtytwo.txt) (10) · [complete source](sources/thirtytwo.md)


---

<a id="b-0269"></a>

### B-0269 — What is Rails Migration?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 17

**Interview question**

What is Rails Migration?

**Direct answer**

Rails migrations are versioned Ruby classes that change database structure; bin/rails db:migrate applies pending versions and bin/rails db:rollback reverts the most recent reversible migration.

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- The migration version API should match the application. Data backfills need separate operational planning for large datasets.
- ruby script/generate is a historical Rails command.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html
- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Migrations do not guarantee adapter portability or reversibility of every operation.

**Source references**

- SRC-00043 — [first.txt:287–291](../ruby/first.txt) (13) · [complete source](sources/first.md)
- SRC-00376 — [ten.txt:47–52](../ruby/ten.txt) (5) · [complete source](sources/ten.md)
- SRC-00434 — [eleven.txt:157–174](../ruby/eleven.txt) (11) · [complete source](sources/eleven.md)
- SRC-00694 — [thirty.txt:44–46](../ruby/thirty.txt) (10) · [complete source](sources/thirty.md)
- SRC-00738 — [thirtyeight.txt:46–47](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00761 — [thirtyeight.txt:96–98](../ruby/thirtyeight.txt) (2) · [complete source](sources/thirtyeight.md)
- SRC-00822 — [thirtyfive.txt:19–27](../ruby/thirtyfive.txt) (02) · [complete source](sources/thirtyfive.md)
- SRC-00858 — [thirtyfour.txt:27–27](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00977 — [thirtyfour.txt:282–307](../ruby/thirtyfour.txt) (8) · [complete source](sources/thirtyfour.md)
- SRC-00995 — [thirtyone.txt:77–90](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01093 — [thirtytwo.txt:131–133](../ruby/thirtytwo.txt) (26) · [complete source](sources/thirtytwo.md)
- SRC-01205 — [twentyfive.txt:38–40](../ruby/twentyfive.txt) (7) · [complete source](sources/twentyfive.md)
- SRC-01310 — [twentynine.txt:58–60](../ruby/twentynine.txt) (12) · [complete source](sources/twentynine.md)
- SRC-01346 — [twentytwo.txt:8–17](../ruby/twentytwo.txt) (1) · [complete source](sources/twentytwo.md)
- SRC-01400 — [twentythree.txt:53–55](../ruby/twentythree.txt) (Q8) · [complete source](sources/twentythree.md)
- SRC-01446 — [twentyseven.txt:35–39](../ruby/twentyseven.txt) (Open-3) · [complete source](sources/twentyseven.md)
- SRC-01474 — [twentyseven.txt:248–258](../ruby/twentyseven.txt) (Open-31) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00043 (first.txt)</summary>

**Original prompt:** What is a migration in Ruby on Rails?

**Answer:** A migration is a timestamped/versioned schema change written in a Rails DSL or SQL. Rails records applied versions and can reverse supported changes.

A migration in Ruby on Rails is a way to manage changes to the database schema over time. Migrations are Ruby scripts that make it easy to create, modify, and delete database tables, columns, and indexes.

They ensure that database schema evolves as the application grows. They can be versioned, rolled back, and applied consistently. Migrations are an integral part of keeping the database structure in sync with the application's codebase.

```bash
bin/rails generate migration AddActiveToUsers active:boolean
bin/rails db:migrate
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00376 (ten.txt)</summary>

**Original prompt:** What is the purpose of migrations in Rails?

**Answer:** A Rails migration is a versioned Ruby description of database changes. Generate it with bin/rails generate migration and apply pending changes with bin/rails db:migrate.

Migrations evolve schema consistently across environments; reversible operations can use change, while operations that Rails cannot reverse need reversible or explicit up/down methods. Data backfills and index creation on large live tables need deployment planning; database portability is not automatic for every SQL operation or index feature.

```bash
bin/rails generate migration AddStatusToUsers status:string
bin/rails db:migrate
bin/rails db:rollback
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00694 (thirty.txt)</summary>

**Original prompt:** Mention what is Rails Migration?

**Answer:** Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

</details>


---

<a id="b-0270"></a>

### B-0270 — What is the difference between Active Record and Active Model?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the difference between Active Record and Active Model?

**Direct answer**

Active Record adds database persistence and ORM behavior; Active Model provides reusable model interfaces without requiring a database table.

**Detailed explanation**

Use ActiveModel::Model for a form or service input object with validations and naming conventions. Use ApplicationRecord for persisted relational records. Active Model underpins parts of Active Record but does not itself provide the relational query interface.

**Practical example**

```ruby
class ContactForm
  include ActiveModel::Model
  attr_accessor :email
  validates :email, presence: true
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_model_basics.html

**Source references**

- SRC-01078 — [thirtytwo.txt:76–78](../ruby/thirtytwo.txt) (11) · [complete source](sources/thirtytwo.md)


---

<a id="b-0271"></a>

### B-0271 — What is the difference between Active Record and ORM?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the difference between Active Record and ORM?

**Direct answer**

ORM means Object-Relational Mapping. Active Record is Rails’ ORM: model classes generally map to tables, model instances to rows, and attributes to columns.

**Detailed explanation**

ORM is the broad technique; Active Record is both an architectural pattern and the name of Rails’ library implementing it. Active Record supports querying, persistence, validations and associations. It generates SQL, but developers still need SQL knowledge, database constraints and query-plan analysis. Safe parameter binding avoids many injection problems; raw interpolated SQL remains unsafe.

**Practical example**

```ruby
class User < ApplicationRecord
  has_many :posts
end
User.where(active: true).order(:id).limit(20)
```

**Important points and follow-ups**

- ORM does not stand for Object Relationship Model. It neither eliminates SQL nor guarantees efficient or secure queries in every usage.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Source references**

- SRC-01081 — [thirtytwo.txt:85–87](../ruby/thirtytwo.txt) (14) · [complete source](sources/thirtytwo.md)


---

<a id="b-0272"></a>

### B-0272 — What is the difference between save and create in ActiveRecord?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the difference between save and create in ActiveRecord?

**Direct answer**

save persists an existing Ruby model instance, inserting or updating as needed; create instantiates a new object and attempts to save it.

**Detailed explanation**

Both normally run validations and callbacks. A failed save returns false; a failed create returns an invalid, unpersisted object. Use save! or create! to raise on validation failure. Distinguish creating an object with new from persisting a row.

**Practical example**

```ruby
user = User.new(name: "Ada")
user.save
other = User.create(name: "Grace")
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00877 — [thirtyfour.txt:46–46](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0273"></a>

### B-0273 — What is the purpose of the config/database.yml file?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the purpose of the config/database.yml file?

**Direct answer**

config/database.yml declares environment-specific database adapter, database and connection settings; keep production credentials in secure configuration.

**Detailed explanation**

Use the pg adapter for PostgreSQL or mysql2 for MySQL and run migrations against the intended environment. A DATABASE_URL may supply deployment connection details. Check SSL and least-privilege access, and never commit live database passwords.

**Practical example**

```text
production:
  adapter: postgresql
  url: <%= ENV["DATABASE_URL"] %>
  pool: <%= ENV.fetch("RAILS_MAX_THREADS", 5) %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00910 — [thirtyfour.txt:80–80](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0274"></a>

### B-0274 — What is the Rails router's scope?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

What is the Rails router's scope?

**Direct answer**

scope groups routes with common path, controller module, helper prefix, or constraints without necessarily adding all of them.

**Detailed explanation**

A path scope only prefixes URLs; namespace normally prefixes the path, Ruby controller module and helper names together. Check bin/rails routes to confirm the generated interface.

**Practical example**

```text
scope path: "/admin", module: "admin", as: "admin" do
  resources :users
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01136 — [twenty.txt:345–355](../ruby/twenty.txt) (39) · [complete source](sources/twenty.md)


---

<a id="b-0275"></a>

### B-0275 — Where Rails keeps track of which migrations have been committed?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Where Rails keeps track of which migrations have been committed?

**Direct answer**

Migrations are versioned Ruby schema changes; run bin/rails db:migrate to apply them and bin/rails db:rollback to undo the latest reversible migration.

**Detailed explanation**

Use change for reversible operations, or up/down/reversible when Rails cannot infer reversal. Rails records applied migration versions in schema_migrations and maintains schema.rb or structure.sql. Do not edit already-applied migrations to change production schema. Adapter-specific SQL and some DDL cannot be portable or reversible, and rollback may lose data.

**Practical example**

```bash
bin/rails generate migration AddAgeToUsers age:integer
# Generated class version matches the app:
def change
  add_column :users, :age, :integer
end
bin/rails db:migrate
```

**Important points and follow-ups**

- ruby script/generate and class-level self.up/self.down examples are legacy syntax; modern migrations normally use versioned classes and instance methods.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Source references**

- SRC-01095 — [thirtytwo.txt:137–139](../ruby/thirtytwo.txt) (28) · [complete source](sources/thirtytwo.md)


---

<a id="b-0276"></a>

### B-0276 — Which of the following Rails migration commands is the most efficient and conventional way to add an index to an existing column named email on a table named users?

**Difficulty:** Intermediate · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Which of the following Rails migration commands is the most efficient and conventional way to add an index to an existing column named email on a table named users?

**Direct answer**

Option 3: `add_index :users, :email`

**Detailed explanation**

Use change for operations Rails can reverse, or explicit up/down or reversible for operations needing an inverse. Rails records applied versions in schema_migrations; migrations are not required to be arbitrarily rerunnable. A rollback does not recreate deleted production data. Database adapters differ in DDL transactions, locking, types, and supported index operations.

**Practical example**

```ruby
class AddEmailIndex < ActiveRecord::Migration[8.0]
  def change
    add_index :users, :email, unique: true
  end
end
# bin/rails db:migrate
# bin/rails db:rollback STEP=1
```

**Important points and follow-ups**

- Use the migration compatibility version generated for the application.
- A references column and an actual foreign key constraint are different; request foreign_key: true.
- For large changes use expand/backfill/contract and database-appropriate locking precautions.
- Modern migrations use instance methods def up / def down; self.up / self.down are legacy syntax.
- Reference: https://guides.rubyonrails.org/active_record_migrations.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01553 — [twentyseven.txt:918–929](../ruby/twentyseven.txt) (MCQ-5) · [complete source](sources/twentyseven.md)


---

<a id="b-0277"></a>

### B-0277 — Why it’s not recommended to use non-primary key columns in Active Record?

**Difficulty:** Beginner · **Topic:** Data, querying and integrity · **Source occurrences:** 1

**Interview question**

Why it’s not recommended to use non-primary key columns in Active Record?

**Direct answer**

A non-primary-key column named id conflicts with Active Record’s id abstraction; avoid that schema when possible or use id_value to access that column.

**Detailed explanation**

The issue is specifically a column called id that is not the model’s primary key, rather than a prohibition on ordinary non-primary-key columns. Migrations create an id primary key by default; disable the generated primary key with id: false before defining a different layout.

**Practical example**

```text
create_table :legacy_rows, id: false do |t|
  t.string :external_key, null: false
  t.string :id
end
```

**Important points and follow-ups**

- Check the installed Rails version when using legacy primary keys or composite keys.

**Source references**

- SRC-01098 — [thirtytwo.txt:146–147](../ruby/thirtytwo.txt) (31) · [complete source](sources/thirtytwo.md)


---

<a id="b-0278"></a>

### B-0278 — Describe how you would implement API versioning in a Rails application.

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 2

**Interview question**

Describe how you would implement API versioning in a Rails application.

**Direct answer**

I would implement API versioning in a Rails application using a few different strategies. One common approach is to use URL-based versioning, where the version number is included in the URL itself (e.g., /api/v1/resources, /api/v2/resources). This is straightforward to implement and makes it very clear which version of the API a client is using. Rails' routing constraints can be leveraged to route requests based on the version in the URL.

**Detailed explanation**

I would implement API versioning in a Rails application using a few different strategies. One common approach is to use URL-based versioning, where the version number is included in the URL itself (e.g., /api/v1/resources, /api/v2/resources). This is straightforward to implement and makes it very clear which version of the API a client is using. Rails' routing constraints can be leveraged to route requests based on the version in the URL.

Alternatively, I might use header-based versioning. In this case, the client specifies the desired API version in a custom request header (e.g., Accept: application/vnd.myapi.v1+json). This approach keeps the URLs cleaner but requires clients to manage the request header correctly. For either approach, I'd create separate controllers or namespaces to handle different versions, allowing for distinct logic and data transformations for each version. For example, placing code under app/controllers/api/v1/ or app/controllers/api/v2/

**Practical example**

```text
I would implement API versioning in a Rails application using a few different strategies. One common approach is to use URL-based versioning, where the version number is included in the URL itself (e.g., /api/v1/resources, /api/v2/resources). This is straightforward to implement and makes it very clear which version of the API a client is using. Rails' routing constraints can be leveraged to route requests based on the version in the URL.

Alternatively, I might use header-based versioning. In this case, the client specifies the desired API version in a custom request header (e.g., Accept: application/vnd.myapi.v1+json). This approach keeps the URLs cleaner but requires clients to manage the request header correctly. For either approach, I'd create separate controllers or namespaces to handle different versions, allowing for distinct logic and data transformations for each version. For example, placing code under app/controllers/api/v1/ or app/controllers/api/v2/
```

**Important points and follow-ups**

- Avoid duplicating the whole business layer solely because transport versions differ.

**Corrections and source limitations**

- Corrected claim that controller namespaces guarantee compatibility.

**Source references**

- SRC-00395 — [ten.txt:134–140](../ruby/ten.txt) (24) · [complete source](sources/ten.md)
- SRC-01507 — [twentyseven.txt:526–530](../ruby/twentyseven.txt) (Open-64) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00395 (ten.txt)</summary>

**Original prompt:** How do you handle API versioning in Rails?

**Answer:** Version APIs through an explicit strategy such as URL namespaces or media-type negotiation, and preserve the contract promised to existing consumers.

Namespaces organize routes and controllers; they do not automatically guarantee backward compatibility. Test response schema, semantics and error behavior for each supported version, document deprecation and observe actual consumer usage before removal.

```text
namespace :api do
  namespace :v1 do
    resources :users, only: :show
  end
end
```

</details>


---

<a id="b-0279"></a>

### B-0279 — Describe your experience with different Rails code analysis tools (e.g., RuboCop, Brakeman) and how they help improve code quality.

**Difficulty:** Advanced · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

Describe your experience with different Rails code analysis tools (e.g., RuboCop, Brakeman) and how they help improve code quality.

**Direct answer**

Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. Rake tasks automate named operations; Rails exposes many built-in tasks through bin/rails.

**Detailed explanation**

Custom tasks belong in lib/tasks/*.rake. Depend on :environment when the task needs the application models. Make maintenance tasks resumable and safe for the selected environment. Modern route inspection uses bin/rails routes rather than assuming rake routes exists.

**Practical example**

```ruby
namespace :reports do
  task refresh: :environment do
    Report.find_each { |report| RefreshJob.perform_later(report.id) }
  end
end
# bin/rails reports:refresh
```

**Important points and follow-ups**

- Do not confuse db:reset with a safe incremental migration; it recreates the database.
- Reference: https://guides.rubyonrails.org/command_line.html
- A truthful project answer should include what you personally did and how the result was measured.

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The source uses a first-person illustrative story. Do not present it as your own experience. Adapt the structure to a genuine project.

**Source references**

- SRC-01545 — [twentyseven.txt:838–842](../ruby/twentyseven.txt) (Open-102) · [complete source](sources/twentyseven.md)


---

<a id="b-0280"></a>

### B-0280 — Explain the differences between gems and plugins in Ruby on Rails.

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

Explain the differences between gems and plugins in Ruby on Rails.

**Direct answer**

Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

**Detailed explanation**

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

**Practical example**

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

**Important points and follow-ups**

- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00754 — [thirtyeight.txt:78–79](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0281"></a>

### B-0281 — Explain what is Gems and Gemset in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

Explain what is Gems and Gemset in Ruby on Rails.

**Direct answer**

A gem is a packaged Ruby library; a gemset is an isolated collection of installed gems supported by tools such as RVM.

**Detailed explanation**

RubyGems distributes packages. Bundler uses Gemfile and Gemfile.lock to resolve and activate dependencies for a project, often making a separate gemset unnecessary. A gemset is a tool-specific environment mechanism, not a Rails model or built-in Ruby namespace.

**Practical example**

```bash
gem install bundler
bundle install
bundle exec ruby app.rb
```

**Important points and follow-ups**

- Do not confuse Gemfile groups with RVM gemsets.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01419 — [twentythree.txt:183–185](../ruby/twentythree.txt) (Q27) · [complete source](sources/twentythree.md)


---

<a id="b-0282"></a>

### B-0282 — Explain what is rake in Rails?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 2

**Interview question**

Explain what is rake in Rails?

**Direct answer**

Rake is a Ruby task/build tool that defines dependencies and tasks in Rakefile or .rake files.

**Detailed explanation**

Rails exposes common tasks through bin/rails, including db:migrate and db:seed; custom tasks usually live in lib/tasks. Load :environment when the task needs models. Do not expose arbitrary administrative or destructive Rake tasks as unauthenticated web actions.

**Practical example**

```ruby
# lib/tasks/reports.rake
namespace :reports do
  task daily: :environment do
    puts Order.where(created_at: Time.current.all_day).count
  end
end
# bin/rails reports:daily
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00701 — [thirty.txt:74–76](../ruby/thirty.txt) (17) · [complete source](sources/thirty.md)
- SRC-01024 — [thirtyseven.txt:17–21](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0283"></a>

### B-0283 — How do you check the current version of Rails?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

How do you check the current version of Rails?

**Direct answer**

Run bin/rails --version inside the application to report the Rails version selected by that application’s bundle.

**Detailed explanation**

A global rails --version may describe a different installation. Gemfile.lock gives the resolved dependency versions and bundle exec constrains commands to that bundle.

**Practical example**

```bash
bin/rails --version
bundle exec rails --version
ruby -v
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; answer prepared independently.

**Source references**

- SRC-00890 — [thirtyfour.txt:59–60](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0284"></a>

### B-0284 — How do you install gems in a Rails project?

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 3

**Interview question**

How do you install gems in a Rails project?

**Direct answer**

Gemfile declares dependencies and version constraints; Bundler resolves them, and Gemfile.lock records the exact resolved versions.

**Detailed explanation**

Add a gem to Gemfile and run bundle install. Commit the lockfile for an application to make installs reproducible. bundle update deliberately changes resolved versions; prefer a targeted update when that is the intention. A Gemfile alone does not pin every transitive version.

**Practical example**

```bash
gem "bcrypt", "~> 3.1"
# bundle install
# bundle update bcrypt
```

**Important points and follow-ups**

- Reference: https://bundler.io/guides/using_bundler_in_applications.html
- Review compatibility, security advisories and the resulting lockfile diff.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00867 — [thirtyfour.txt:36–36](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00986 — [thirtyfour.txt:467–483](../ruby/thirtyfour.txt) (17) · [complete source](sources/thirtyfour.md)
- SRC-01464 — [twentyseven.txt:166–170](../ruby/twentyseven.txt) (Open-21) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00867 (thirtyfour.txt)</summary>

**Original prompt:** How can you add a new gem to your Rails application?

**Answer:** Gemfile declares the application’s gem requirements; Bundler resolves them and records exact selected versions in Gemfile.lock.

Add a dependency then run bundle install, or use bundle add. bundle install preserves an existing lockfile where possible; bundle update deliberately re-resolves dependencies. Gem groups control loading/install configuration but do not automatically create security isolation or require a particular disk directory.

```bash
bundle add pagy
bundle install
# Gemfile:
gem "pg", "~> 1.5"
```

</details>


---

<a id="b-0285"></a>

### B-0285 — How would you migrate a Rails application from an old version (e.g., Rails 4 to Rails 6)?

**Difficulty:** Advanced · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

How would you migrate a Rails application from an old version (e.g., Rails 4 to Rails 6)?

**Direct answer**

Deploy a tested build with explicit configuration, assets, secrets and compatible schema changes, plus monitoring and a rollback/recovery plan.

**Detailed explanation**

For schema changes under live traffic, use expand-and-contract: add backward-compatible schema, deploy compatible code, backfill in bounded resumable batches, then enforce constraints/remove old columns later. Avoid long locks and assume rolling deployments run old/new code simultaneously. Upgrade legacy Rails stepwise through supported intermediate versions and review each version’s upgrade notes.

**Practical example**

```text
1. Add a nullable replacement column.
2. Deploy code compatible with both schemas.
3. Backfill in batches and verify.
4. Enforce constraints, switch reads, and remove the old column in a later release.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00965 — [thirtyfour.txt:136–136](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0286"></a>

### B-0286 — Name the three default environments in Rails.

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 5

**Interview question**

Name the three default environments in Rails.

**Direct answer**

Rails normally has development, test, and production environments, selected by RAILS_ENV and configured under config/environments.

**Detailed explanation**

Separate database configuration, credentials and external service endpoints per environment. Development favors reloading and useful diagnostics; test runs controlled automated checks; production favors efficient stable serving. Isolation and backups are operational choices, not automatic guarantees simply because an environment is named production.

**Practical example**

```bash
RAILS_ENV=production bin/rails runner 'puts Rails.env'
# config/environments/production.rb
# config/database.yml
```

**Important points and follow-ups**

- The shown shell assignment syntax is POSIX; use the host shell’s equivalent on Windows.
- Do not run destructive maintenance against the wrong environment.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00405 — [ten.txt:179–183](../ruby/ten.txt) (34) · [complete source](sources/ten.md)
- SRC-00715 — [thirty.txt:121–126](../ruby/thirty.txt) (31) · [complete source](sources/thirty.md)
- SRC-01236 — [twentyfive.txt:218–224](../ruby/twentyfive.txt) (38) · [complete source](sources/twentyfive.md)
- SRC-01406 — [twentythree.txt:86–91](../ruby/twentythree.txt) (Q14) · [complete source](sources/twentythree.md)
- SRC-01461 — [twentyseven.txt:152–157](../ruby/twentyseven.txt) (Open-18) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00405 (ten.txt)</summary>

**Original prompt:** What are Rails Environments, and how do they work?

**Answer:** Rails environments choose configuration for development, test, production and any application-defined environment.

Environment files set behavior such as logging, error reporting, caching and eager loading. Credentials and external configuration should be managed appropriately rather than copied into source. Database configuration and service endpoints must match the selected environment.

```bash
RAILS_ENV=test bin/rails runner 'puts Rails.env'
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00715 (thirty.txt)</summary>

**Original prompt:** Name the three default environments in Rails?

**Answer:** Rails has development, test and production environments with shared configuration and per-environment overrides.

Use config/application.rb for shared settings, config/environments/<name>.rb for environment behavior, and credentials/environment variables for deployment-specific secrets. Development favors reload/debugging, production favors eager loading/caching and controlled error pages. RAILS_ENV selects the environment; testing is not the default environment name.

```bash
RAILS_ENV=production bin/rails runner "puts Rails.env"
```

</details>


---

<a id="b-0287"></a>

### B-0287 — What are Gems and how do you use them in a Rails project?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What are Gems and how do you use them in a Rails project?

**Direct answer**

Gemfile declares the application’s gem requirements; Bundler resolves them and records exact selected versions in Gemfile.lock.

**Detailed explanation**

Add a dependency then run bundle install, or use bundle add. bundle install preserves an existing lockfile where possible; bundle update deliberately re-resolves dependencies. Gem groups control loading/install configuration but do not automatically create security isolation or require a particular disk directory.

**Practical example**

```bash
bundle add pagy
bundle install
# Gemfile:
gem "pg", "~> 1.5"
```

**Important points and follow-ups**

- Reference: https://bundler.io/guides/using_bundler_in_applications.html

**Source references**

- SRC-01055 — [thirtysix.txt:86–130](../ruby/thirtysix.txt) (3) · [complete source](sources/thirtysix.md)


---

<a id="b-0288"></a>

### B-0288 — What are some of your favorite gems? What are their alternatives?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What are some of your favorite gems? What are their alternatives?

**Direct answer**

Choose tools based on the requirement and explain one you have actually used, including an alternative and its trade-off.

**Detailed explanation**

For example, Minitest versus RSpec concerns test style/tooling; Active Storage versus an upload gem concerns storage/workflow needs. Paperclip is a legacy attachment library and FactoryGirl is now FactoryBot. No list of gems is essential for every Rails app. Consult the API documentation matching the installed Ruby/Rails version.

**Practical example**

```text
Example interview response: “I used Active Storage for direct S3 uploads; I considered Shrine when custom processing pipelines were the main requirement.”
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Legacy library names: Paperclip is retired/legacy and FactoryGirl was renamed FactoryBot; choose supported tools for new work.

**Source references**

- SRC-01167 — [twentyeight.txt:81–93](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0289"></a>

### B-0289 — What are the different ways to manage configuration settings across environments in Rails?

**Difficulty:** Advanced · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What are the different ways to manage configuration settings across environments in Rails?

**Direct answer**

Rails has development, test and production environments with shared configuration and per-environment overrides.

**Detailed explanation**

Use config/application.rb for shared settings, config/environments/<name>.rb for environment behavior, and credentials/environment variables for deployment-specific secrets. Development favors reload/debugging, production favors eager loading/caching and controlled error pages. RAILS_ENV selects the environment; testing is not the default environment name.

**Practical example**

```bash
RAILS_ENV=production bin/rails runner "puts Rails.env"
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00938 — [thirtyfour.txt:109–109](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0290"></a>

### B-0290 — What gems do you consider essential in most Rails projects?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What gems do you consider essential in most Rails projects?

**Direct answer**

Choose tools based on the requirement and explain one you have actually used, including an alternative and its trade-off.

**Detailed explanation**

For example, Minitest versus RSpec concerns test style/tooling; Active Storage versus an upload gem concerns storage/workflow needs. Paperclip is a legacy attachment library and FactoryGirl is now FactoryBot. No list of gems is essential for every Rails app. Consult the API documentation matching the installed Ruby/Rails version.

**Practical example**

```text
Example interview response: “I used Active Storage for direct S3 uploads; I considered Shrine when custom processing pipelines were the main requirement.”
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01344 — [twentysix.txt:107–109](../ruby/twentysix.txt) (30) · [complete source](sources/twentysix.md)


---

<a id="b-0291"></a>

### B-0291 — What is a 'rake' task in Rails, and give an example?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 4

**Interview question**

What is a 'rake' task in Rails, and give an example?

**Direct answer**

Rake tasks automate named operations; Rails exposes many built-in tasks through bin/rails.

**Detailed explanation**

Custom tasks belong in lib/tasks/*.rake. Depend on :environment when the task needs the application models. Make maintenance tasks resumable and safe for the selected environment. Modern route inspection uses bin/rails routes rather than assuming rake routes exists.

**Practical example**

```ruby
namespace :reports do
  task refresh: :environment do
    Report.find_each { |report| RefreshJob.perform_later(report.id) }
  end
end
# bin/rails reports:refresh
```

**Important points and follow-ups**

- A non-Rails Rakefile can define standalone tasks without :environment.
- Do not confuse db:reset with a safe incremental migration; it recreates the database.
- Reference: https://guides.rubyonrails.org/command_line.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00261 — [eight.txt:220–231](../ruby/eight.txt) (Mid-10) · [complete source](sources/eight.md)
- SRC-00399 — [ten.txt:153–157](../ruby/ten.txt) (28) · [complete source](sources/ten.md)
- SRC-00937 — [thirtyfour.txt:108–108](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01465 — [twentyseven.txt:171–178](../ruby/twentyseven.txt) (Open-22) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00261 (eight.txt)</summary>

**Original prompt:** What is a rake task and how do you create one?

**Answer:** Rake automates named tasks with dependencies. In Rails put a .rake file in lib/tasks and depend on :environment when the task needs application models.

Use namespaces and descriptions for discoverability. Commands such as bin/rails data:cleanup execute the task in the application context. For production tasks, plan batching, observability, idempotency and dry-run behavior where useful; a task file is not automatically safe to rerun.

```ruby
# lib/tasks/reports.rake
namespace :reports do
  desc "Show the report count"
  task count: :environment do
    puts Report.count
  end
end
# bin/rails reports:count
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00937 (thirtyfour.txt)</summary>

**Original prompt:** How do you write custom Rake tasks in Rails?

**Answer:** Rake is a Ruby task/build tool that defines dependencies and tasks in Rakefile or .rake files.

Rails exposes common tasks through bin/rails, including db:migrate and db:seed; custom tasks usually live in lib/tasks. Load :environment when the task needs models. Do not expose arbitrary administrative or destructive Rake tasks as unauthenticated web actions.

```ruby
# lib/tasks/reports.rake
namespace :reports do
  task daily: :environment do
    puts Order.where(created_at: Time.current.all_day).count
  end
end
# bin/rails reports:daily
```

</details>


---

<a id="b-0292"></a>

### B-0292 — What is a 'rake' task? Can you describe a common rake task?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is a 'rake' task? Can you describe a common rake task?

**Direct answer**

Rake tasks automate named operations; Rails exposes many built-in tasks through bin/rails.

**Detailed explanation**

Custom tasks belong in lib/tasks/*.rake. Depend on :environment when the task needs the application models. Make maintenance tasks resumable and safe for the selected environment. Modern route inspection uses bin/rails routes rather than assuming rake routes exists.

**Practical example**

```ruby
namespace :reports do
  task refresh: :environment do
    Report.find_each { |report| RefreshJob.perform_later(report.id) }
  end
end
# bin/rails reports:refresh
```

**Important points and follow-ups**

- Do not confuse db:reset with a safe incremental migration; it recreates the database.
- Reference: https://guides.rubyonrails.org/command_line.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01495 — [twentyseven.txt:423–428](../ruby/twentyseven.txt) (Open-52) · [complete source](sources/twentyseven.md)


---

<a id="b-0293"></a>

### B-0293 — What is a Rails gem?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is a Rails gem?

**Direct answer**

A gem packages Ruby code and metadata so it can be distributed, versioned and installed with RubyGems/Bundler.

**Detailed explanation**

Rails itself is composed of gems. Evaluate maintenance, licensing, compatibility and necessity before adding a dependency. No gem is essential for every project, and personal-favorite questions should be answered from actual experience.

**Practical example**

```bash
gem install bundler
# In an application use its bundle:
bundle add rspec-rails
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01203 — [twentyfive.txt:29–31](../ruby/twentyfive.txt) (5) · [complete source](sources/twentyfive.md)


---

<a id="b-0294"></a>

### B-0294 — What is Gemfile in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 8

**Interview question**

What is Gemfile in Ruby on Rails?

**Direct answer**

Gemfile declares dependencies and version constraints; Bundler resolves them, and Gemfile.lock records the exact resolved versions.

**Detailed explanation**

Add a gem to Gemfile and run bundle install. Commit the lockfile for an application to make installs reproducible. bundle update deliberately changes resolved versions; prefer a targeted update when that is the intention. A Gemfile alone does not pin every transitive version.

**Practical example**

```bash
gem "bcrypt", "~> 3.1"
# bundle install
# bundle update bcrypt
```

**Important points and follow-ups**

- Reference: https://bundler.io/guides/using_bundler_in_applications.html
- Review compatibility, security advisories and the resulting lockfile diff.
- Reference: https://docs.ruby-lang.org/en/master/

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Gemfile declares requirements; Gemfile.lock pins the resolved versions for reproducible application bundles.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00777 — [thirtyeight.txt:148–149](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00826 — [thirtyfive.txt:58–66](../ruby/thirtyfive.txt) (06) · [complete source](sources/thirtyfive.md)
- SRC-00866 — [thirtyfour.txt:35–35](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00985 — [thirtyfour.txt:450–466](../ruby/thirtyfour.txt) (16) · [complete source](sources/thirtyfour.md)
- SRC-01029 — [thirtyseven.txt:52–56](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)
- SRC-01104 — [twenty.txt:56–60](../ruby/twenty.txt) (6) · [complete source](sources/twenty.md)
- SRC-01408 — [twentythree.txt:114–116](../ruby/twentythree.txt) (Q16) · [complete source](sources/twentythree.md)
- SRC-01463 — [twentyseven.txt:163–165](../ruby/twentyseven.txt) (Open-20) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00777 (thirtyeight.txt)</summary>

**Original prompt:** What is a Gemfile in Ruby on Rails?

**Answer:** Gemfile declares the application’s gem requirements; Bundler resolves them and records exact selected versions in Gemfile.lock.

Add a dependency then run bundle install, or use bundle add. bundle install preserves an existing lockfile where possible; bundle update deliberately re-resolves dependencies. Gem groups control loading/install configuration but do not automatically create security isolation or require a particular disk directory.

```bash
bundle add pagy
bundle install
# Gemfile:
gem "pg", "~> 1.5"
```

</details>


---

<a id="b-0295"></a>

### B-0295 — What is Gemfile.lock?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is Gemfile.lock?

**Direct answer**

Gemfile.lock records the resolved dependency graph and exact gem versions used by the application.

**Detailed explanation**

Commit it for applications so teammates and deployments install the same resolution. Gemfile declares requirements, not a guarantee that every machine independently resolves identical versions. Lockfile platform and Ruby/Bundler metadata also matter.

**Practical example**

```bash
bundle install
# Update a chosen dependency deliberately:
bundle update rails
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01030 — [thirtyseven.txt:57–63](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0296"></a>

### B-0296 — What is Rake?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 4

**Interview question**

What is Rake?

**Direct answer**

Rake is a Ruby task automation tool. Rakefiles define tasks and dependencies; Rails exposes many application tasks through bin/rails.

**Detailed explanation**

Rake is a Ruby Make; it is a Ruby utility that replaces the Unix utility 'make' and builds a list of tasks using a 'Rakefile' and '.rake files'. Rake is used in Rails for routine administration activities such as database migration via scripts, schema loading into the database, and so on.

**Practical example**

```ruby
# Rakefile
require "rake"
task :hello do
  puts "Hello"
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00025 — [first.txt:186–188](../ruby/first.txt) (25) · [complete source](sources/first.md)
- SRC-00736 — [thirtyeight.txt:42–43](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-01255 — [twentyfive.txt:326–334](../ruby/twentyfive.txt) (57) · [complete source](sources/twentyfive.md)
- SRC-01364 — [twentytwo.txt:267–269](../ruby/twentytwo.txt) (1) · [complete source](sources/twentytwo.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00736 (thirtyeight.txt)</summary>

**Original prompt:** Explain what “rake” means in Ruby on Rails.

**Answer:** Rake is a Ruby task/build tool that defines dependencies and tasks in Rakefile or .rake files.

Rails exposes common tasks through bin/rails, including db:migrate and db:seed; custom tasks usually live in lib/tasks. Load :environment when the task needs models. Do not expose arbitrary administrative or destructive Rake tasks as unauthenticated web actions.

```ruby
# lib/tasks/reports.rake
namespace :reports do
  task daily: :environment do
    puts Order.where(created_at: Time.current.all_day).count
  end
end
# bin/rails reports:daily
```

</details>


---

<a id="b-0297"></a>

### B-0297 — What is the difference between a plugin and a gem?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is the difference between a plugin and a gem?

**Direct answer**

A gem is a Ruby package; a Rails plugin adds Rails-specific behavior and is commonly distributed as a gem with a railtie or engine.

**Detailed explanation**

The historical distinction between vendor/plugins and globally installed gems does not describe modern Bundler-based Rails projects. Dependency versions and load paths are selected per application bundle, even when installed gems share disk storage.

**Practical example**

```text
Gemfile → gem dependency → optional Railtie/Engine hooks into the Rails application
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01196 — [twentyeight.txt:381–387](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0298"></a>

### B-0298 — What is the purpose of environment.rb in Rails?

**Difficulty:** Beginner · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is the purpose of environment.rb in Rails?

**Direct answer**

config/application.rb defines application-wide settings; environment configuration specializes them, and initializers run during application boot.

**Detailed explanation**

config/environment.rb loads the application and initializes it. Initializers configure libraries or integrations and normally require a restart after changes. Reloadable constants should not be permanently captured during boot; use supported reload hooks such as to_prepare when needed. Keep boot work fast and free of avoidable external dependencies.

**Practical example**

```ruby
# config/application.rb
config.time_zone = "UTC"
# config/initializers/filter_parameter_logging.rb
Rails.application.config.filter_parameters += [:password]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01294 — [twentyfive.txt:687–689](../ruby/twentyfive.txt) (96) · [complete source](sources/twentyfive.md)


---

<a id="b-0299"></a>

### B-0299 — What is the role of the strong_parameters gem in Rails?

**Difficulty:** Intermediate · **Topic:** Dependencies, deployment and operations · **Source occurrences:** 1

**Interview question**

What is the role of the strong_parameters gem in Rails?

**Direct answer**

Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.

**Detailed explanation**

Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.

**Practical example**

```ruby
def user_params
  params.require(:user).permit(:name, :email)
end
# Rails 8+: params.expect(user: [:name, :email])
# Ownership must still be checked: current_user.posts.find(params[:id])
```

**Important points and follow-ups**

- Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00907 — [thirtyfour.txt:77–77](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0300"></a>

### B-0300 — Can you describe a real-world scenario where you used MVC, and what challenges did you encounter?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Can you describe a real-world scenario where you used MVC, and what challenges did you encounter?

**Direct answer**

MVC separates domain data and rules in models, presentation in views, and HTTP coordination in controllers.

**Detailed explanation**

A request passes through Rack middleware and routing to a controller action. The controller authorizes the operation, invokes models or services, and renders a response, often using a view. Database-backed models use Active Record, while JSON APIs may render without an HTML view. Keep domain operations reusable outside controllers.

**Practical example**

```ruby
# config/routes.rb
resources :articles, only: :show
# ArticlesController#show
@article = Article.find(params[:id])
# app/views/articles/show.html.erb
# <%= @article.title %>
```

**Important points and follow-ups**

- A real project example should describe your own work; source anecdotes are illustrative only.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01577 — [twentyseven.txt:1229–1229](../ruby/twentyseven.txt) (Embedded-MVC-follow-up) · [complete source](sources/twentyseven.md)


---

<a id="b-0301"></a>

### B-0301 — Create a Rails controller action to find a User by their email address and render their profile. If the user is not found, render a 404 error.

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Create a Rails controller action to find a User by their email address and render their profile. If the user is not found, render a 404 error.

**Direct answer**

Find the authorized User by email and render explicit profile fields; if no user exists, return a defined 404 JSON response.

**Detailed explanation**

The example assumes the caller is already authorized to perform this lookup. Scope to a current tenant/user where required, normalize email according to the application’s account rules and avoid exposing password digests or arbitrary internal columns. Rendering only status can attempt template lookup; supply json or use head explicitly.

**Practical example**

```ruby
class UsersController < ApplicationController
  def show_by_email
    user = User.find_by(email: params[:email])
    if user
      render json: { id: user.id, name: user.name }
    else
      render json: { error: "not found" }, status: :not_found
    end
  end
end
```

**Important points and follow-ups**

- Do not expose a public account-enumeration endpoint accidentally.

**Corrections and source limitations**

- Corrected ambiguous render status: :not_found and unrestricted full-model serialization.

**Source references**

- SRC-00410 — [ten.txt:206–227](../ruby/ten.txt) (39) · [complete source](sources/ten.md)


---

<a id="b-0302"></a>

### B-0302 — Describe the difference between 'GET' and 'POST' HTTP methods.

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 2

**Interview question**

Describe the difference between 'GET' and 'POST' HTTP methods.

**Direct answer**

GET requests retrieve representations and are defined to be safe and idempotent; POST asks the target resource to process content and is not generally idempotent.

**Detailed explanation**

The important distinction is HTTP semantics, not merely where parameters appear. GET can use query parameters; POST can have both a query string and request body. A POST body is not encrypted by being absent from the address bar: use HTTPS. Server, proxy and application limits still bound request sizes.

**Practical example**

```text
GET /articles?page=2
POST /articles
Content-Type: application/json

{"title":"Ruby"}
```

**Important points and follow-ups**

- Do not implement state-changing actions with GET.
- Never claim POST has no data-size limit or provides secrecy on its own.
- Reference: https://www.rfc-editor.org/rfc/rfc9110.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01467 — [twentyseven.txt:184–190](../ruby/twentyseven.txt) (Open-24) · [complete source](sources/twentyseven.md)
- SRC-01484 — [twentyseven.txt:330–336](../ruby/twentyseven.txt) (Open-41) · [complete source](sources/twentyseven.md)


---

<a id="b-0303"></a>

### B-0303 — Discuss the use of partials and layouts in Rails views.

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Discuss the use of partials and layouts in Rails views.

**Direct answer**

Layouts define the common page frame and yield its content; partials render reusable view fragments and can accept explicit locals.

**Detailed explanation**

Partials are reusable view components in Rails that allow you to break down complex views into smaller, more manageable pieces. They enable you to keep your code DRY (don't repeat yourself) by reusing common HTML structures across multiple views.

Layouts, on the other hand, define the overall structure of your application's views including headers, footers, and navigation. Partials are often used within layouts to create a consistent look and feel across different pages of the application.

**Practical example**

```erb
<%# layout %>
<main><%= yield %></main>
<%# another view %>
<%= render "product", product: @product %>
```

**Important points and follow-ups**

- A partial conventionally begins with an underscore, such as _product.html.erb.

**Source references**

- SRC-00047 — [first.txt:307–311](../ruby/first.txt) (17) · [complete source](sources/first.md)


---

<a id="b-0304"></a>

### B-0304 — Explain how you can list all routes for an application?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Explain how you can list all routes for an application?

**Direct answer**

Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

**Detailed explanation**

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

**Practical example**

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.

**Source references**

- SRC-00702 — [thirty.txt:77–79](../ruby/thirty.txt) (18) · [complete source](sources/thirty.md)


---

<a id="b-0305"></a>

### B-0305 — Explain the concept of RESTful routes in Rails.

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 6

**Interview question**

Explain the concept of RESTful routes in Rails.

**Direct answer**

resources maps a resource to conventional index, show, new, create, edit, update and destroy actions using appropriate HTTP methods.

**Detailed explanation**

GET reads or displays a form, POST creates, PATCH/PUT updates, and DELETE destroys. HTML forms use Rails helpers to represent verbs not directly supported by native forms. A singular resource omits the collection index and the member ID path segment.

**Practical example**

```ruby
resources :articles, only: [:index, :show, :create]
# GET /articles -> index
# GET /articles/:id -> show
# POST /articles -> create
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html
- RESTful route conventions do not themselves make operations authorized or idempotent.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00857 — [thirtyfour.txt:26–26](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00976 — [thirtyfour.txt:266–281](../ruby/thirtyfour.txt) (7) · [complete source](sources/thirtyfour.md)
- SRC-00997 — [thirtyone.txt:119–140](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01007 — [thirtyone.txt:361–384](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01017 — [thirtyone.txt:640–653](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01469 — [twentyseven.txt:200–211](../ruby/twentyseven.txt) (Open-26) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00857 (thirtyfour.txt)</summary>

**Original prompt:** Explain the concept of RESTful routes in Rails.

**Answer:** Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

</details>


---

<a id="b-0306"></a>

### B-0306 — Explain the purpose of a Rails controller.

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 10

**Interview question**

Explain the purpose of a Rails controller.

**Direct answer**

A controller coordinates an HTTP request: it reads parameters, enforces authentication/authorization, invokes application behavior and selects the response.

**Detailed explanation**

Routes dispatch requests to actions. A controller can render HTML, JSON or another representation, or redirect. Keep domain workflows in models/services where they can be reused and tested independently; a controller should not be the only location enforcing an invariant.

**Practical example**

```ruby
class ArticlesController < ApplicationController
  def show
    @article = Article.find(params[:id])
  end
end
```

**Important points and follow-ups**

- Keep authorization explicit; merely rendering a record or maintaining a session does not authorize access.
- A serializer or explicit field list prevents unintended data exposure.
- Handle missing resources and object-level access according to the API/UI contract.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source correction: The router maps requests to actions. Controllers coordinate parameter filtering, domain operations, authorization and responses; sessions persist client state, rather than making an application real-time.
- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00027 — [first.txt:194–198](../ruby/first.txt) (27) · [complete source](sources/first.md)
- SRC-00378 — [ten.txt:56–60](../ruby/ten.txt) (7) · [complete source](sources/ten.md)
- SRC-00435 — [eleven.txt:175–181](../ruby/eleven.txt) (12) · [complete source](sources/eleven.md)
- SRC-00712 — [thirty.txt:112–114](../ruby/thirty.txt) (28) · [complete source](sources/thirty.md)
- SRC-00863 — [thirtyfour.txt:32–32](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00982 — [thirtyfour.txt:391–412](../ruby/thirtyfour.txt) (13) · [complete source](sources/thirtyfour.md)
- SRC-01063 — [thirtysix.txt:444–498](../ruby/thirtysix.txt) (11) · [complete source](sources/thirtysix.md)
- SRC-01353 — [twentytwo.txt:204–211](../ruby/twentytwo.txt) (8) · [complete source](sources/twentytwo.md)
- SRC-01448 — [twentyseven.txt:52–61](../ruby/twentyseven.txt) (Open-5) · [complete source](sources/twentyseven.md)
- SRC-01479 — [twentyseven.txt:293–302](../ruby/twentyseven.txt) (Open-36) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00027 (first.txt)</summary>

**Original prompt:** Define the role of Rails Controller.

**Answer:** A controller receives routed requests, validates permitted input, coordinates application/domain work and chooses a response. Routing itself belongs to the router.

The router maps requests to actions. Controllers coordinate parameter filtering, domain operations, authorization and responses; sessions persist client state, rather than making an application real-time.

```ruby
class ProductsController < ApplicationController
  def show
    @product = Product.find(params[:id])
  end
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00378 (ten.txt)</summary>

**Original prompt:** What is a Rails controller?

**Answer:** A Rails controller receives a routed request, checks request-level concerns, coordinates domain work and returns an HTTP response such as HTML or JSON.

Actions read permitted parameters, scope database access to the current user or tenant, invoke application behavior and render or redirect. Keep authentication and authorization distinct. Request state belongs to a controller instance, while long-lived shared caches and class state need concurrency care.

```ruby
class PostsController < ApplicationController
  def show
    post = current_user.posts.find(params[:id])
    render json: { id: post.id, title: post.title }
  end
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00712 (thirty.txt)</summary>

**Original prompt:** Tell something about Action Controller in Ruby on Rails?

**Answer:** Controllers coordinate HTTP requests and responses; Rails finds controller classes in app/controllers, while app/helpers holds view helper modules.

The router selects an action. Controllers handle request-level concerns such as permitted input, resource authorization, response format and status. Model/domain objects own persistence and business invariants. Helpers are primarily for presentation; they are not a general dumping ground for model or controller logic.

```ruby
class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
  end
end
```

</details>


---

<a id="b-0307"></a>

### B-0307 — Explain the Rails asset pipeline, and what are the advantages of using Webpacker over the asset pipeline?

**Difficulty:** Advanced · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Explain the Rails asset pipeline, and what are the advantages of using Webpacker over the asset pipeline?

**Direct answer**

Rails asset management organizes, fingerprints and serves browser assets. New Rails 8 applications use Propshaft; bundling/transpilation is a separate concern.

**Detailed explanation**

Older Sprockets applications often combine concatenation, preprocessing and minification in the pipeline. Propshaft focuses on digesting and serving ready-to-use assets; use jsbundling-rails/cssbundling-rails or another appropriate build tool when required. importmap-rails loads browser ES modules without a Node build. Webpacker is a legacy integration, not the default recommendation for a new application.

**Practical example**

```bash
RAILS_ENV=production bin/rails assets:precompile
# Reference a fingerprinted asset through a helper:
<%= image_tag "logo.png" %>
```

**Important points and follow-ups**

- Do not assume Sprockets, CoffeeScript, Webpacker, or automatic JS minification is present in every Rails version.
- Reference: https://guides.rubyonrails.org/asset_pipeline.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00943 — [thirtyfour.txt:114–114](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0308"></a>

### B-0308 — Explain the Rails controller action lifecycle.

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Explain the Rails controller action lifecycle.

**Direct answer**

A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.

**Detailed explanation**

The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.

**Practical example**

```text
GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Source references**

- SRC-01065 — [thirtysix.txt:538–570](../ruby/thirtysix.txt) (13) · [complete source](sources/thirtysix.md)


---

<a id="b-0309"></a>

### B-0309 — Explain the role of the sub-directory app/controller and app/helper.

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 4

**Interview question**

Explain the role of the sub-directory app/controller and app/helper.

**Direct answer**

Controllers in app/controllers coordinate HTTP requests; helper modules in app/helpers provide reusable presentation methods for views.

**Detailed explanation**

A controller action loads or changes application state, enforces authorization, and chooses a response. Helpers format or construct view content. They are not a substitute for domain services or authorization policies; controller access to helpers is not automatic in every calling context.

**Practical example**

```ruby
module UsersHelper
  def display_name(user)
    user.name.presence || "Anonymous"
  end
end
```

**Important points and follow-ups**

- Both directory names are plural.
- Keep database-heavy business logic out of view helpers.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source correction: Controllers coordinate HTTP request handling. Helpers are primarily view-facing modules for formatting/presentation. They are not the general storage location for business logic needed by models and controllers.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected singular directory names to app/controllers and app/helpers.

**Source references**

- SRC-00021 — [first.txt:170–174](../ruby/first.txt) (21) · [complete source](sources/first.md)
- SRC-00691 — [thirty.txt:27–31](../ruby/thirty.txt) (7) · [complete source](sources/thirty.md)
- SRC-01352 — [twentytwo.txt:194–203](../ruby/twentytwo.txt) (7) · [complete source](sources/twentytwo.md)
- SRC-01398 — [twentythree.txt:44–46](../ruby/twentythree.txt) (Q6) · [complete source](sources/twentythree.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00021 (first.txt)</summary>

**Original prompt:** Explain the role of sub-directory app/controllers and app/helpers.

**Answer:** app/controllers holds request-handling controllers. app/helpers holds helper modules primarily for views, not general model or controller business logic.

Controllers coordinate HTTP request handling. Helpers are primarily view-facing modules for formatting/presentation. They are not the general storage location for business logic needed by models and controllers.

```ruby
module PricesHelper
  def display_price(cents)
    number_to_currency(cents / 100.0)
  end
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00691 (thirty.txt)</summary>

**Original prompt:** Explain what is the role of sub-directory app/controllers and app/helpers?

**Answer:** Controllers coordinate HTTP requests and responses; Rails finds controller classes in app/controllers, while app/helpers holds view helper modules.

The router selects an action. Controllers handle request-level concerns such as permitted input, resource authorization, response format and status. Model/domain objects own persistence and business invariants. Helpers are primarily for presentation; they are not a general dumping ground for model or controller logic.

```ruby
class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
  end
end
```

</details>


---

<a id="b-0310"></a>

### B-0310 — Explain the use of respond_to in controllers.

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Explain the use of respond_to in controllers.

**Direct answer**

Controller respond_to selects the representation for the requested format using registered MIME types.

**Detailed explanation**

Define HTML, JSON or other branches intentionally and handle unsupported formats. This controller API differs from Ruby’s respond_to?, which asks whether an object exposes a method.

**Practical example**

```text
respond_to do |format|
  format.html
  format.json { render json: { id: @post.id, title: @post.title } }
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00905 — [thirtyfour.txt:75–75](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0311"></a>

### B-0311 — How can you create a controller in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How can you create a controller in Rails?

**Direct answer**

Use Rails generators to create the relevant model or controller files, then inspect the generated code and routes.

**Detailed explanation**

Generators provide a starting point, not business-complete application behavior. A model generator creates a migration; a controller generator only creates the requested actions/views/routes rather than a complete database resource.

**Practical example**

```bash
bin/rails generate model User name:string email:string
bin/rails generate controller Subjects index show
bin/rails db:migrate
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01309 — [twentynine.txt:51–57](../ruby/twentynine.txt) (11) · [complete source](sources/twentynine.md)


---

<a id="b-0312"></a>

### B-0312 — How can you perform CRUD (Create, Read, Update, Delete) operations in Rails?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How can you perform CRUD (Create, Read, Update, Delete) operations in Rails?

**Direct answer**

CRUD means Create, Read, Update and Delete; Active Record exposes these through persistence and query methods.

**Detailed explanation**

Use create!/save! and update! when validation failures should raise, and inspect errors when using non-bang methods. find raises for a missing ID; find_by can return nil. destroy runs destruction callbacks; delete bypasses them. Database constraints remain essential.

**Practical example**

```ruby
user = User.create!(name: "Ada", email: "ada@example.test")
user = User.find(user.id)
user.update!(name: "Grace")
user.destroy!
```

**Important points and follow-ups**

- The source’s User.query and db.session snippets are Python/SQLAlchemy, not Rails.
- Reference: https://guides.rubyonrails.org/active_record_basics.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01455 — [twentyseven.txt:107–115](../ruby/twentyseven.txt) (Open-12) · [complete source](sources/twentyseven.md)


---

<a id="b-0313"></a>

### B-0313 — How do I prepare for a Rails interview?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do I prepare for a Rails interview?

**Direct answer**

Prepare Ruby semantics, Rails request/data flow, SQL, testing, security, debugging and clear explanations of actual project decisions.

**Detailed explanation**

For around three years’ experience, practice implementing an endpoint, diagnosing N+1 queries, writing a migration with constraints, testing authorization, and explaining a production issue. Support answers with a real example rather than claiming tools or incidents you have not used.

**Practical example**

```text
Practice: build POST /orders with permitted input, a transaction, inventory checks, an authorization policy and request tests for success and failure.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01160 — [twenty.txt:516–518](../ruby/twenty.txt) (3) · [complete source](sources/twenty.md)


---

<a id="b-0314"></a>

### B-0314 — How do you create a new controller in Rails using the command line?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you create a new controller in Rails using the command line?

**Direct answer**

Run bin/rails generate controller followed by a controller name and optional actions.

**Detailed explanation**

The generator creates controller-related files and action routes according to its templates. Use plural resource controller names conventionally, and explicitly configure resources when building RESTful CRUD routes; a list of generated actions alone does not imply correct HTTP verb handling.

**Practical example**

```bash
bin/rails generate controller Books index show
# config/routes.rb:
# resources :books, only: [:index, :show]
```

**Important points and follow-ups**

- Do not expose create/update/destroy as GET routes.
- Reference: https://guides.rubyonrails.org/command_line.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01452 — [twentyseven.txt:86–91](../ruby/twentyseven.txt) (Open-9) · [complete source](sources/twentyseven.md)


---

<a id="b-0315"></a>

### B-0315 — How do you define a route in config/routes.rb for a controller action?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 4

**Interview question**

How do you define a route in config/routes.rb for a controller action?

**Direct answer**

Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

**Detailed explanation**

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

**Practical example**

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00889 — [thirtyfour.txt:58–58](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01060 — [thirtysix.txt:231–282](../ruby/thirtysix.txt) (8) · [complete source](sources/thirtysix.md)
- SRC-01110 — [twenty.txt:89–93](../ruby/twenty.txt) (12) · [complete source](sources/twenty.md)
- SRC-01257 — [twentyfive.txt:353–359](../ruby/twentyfive.txt) (59) · [complete source](sources/twentyfive.md)


---

<a id="b-0316"></a>

### B-0316 — How do you handle form submissions in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you handle form submissions in Rails?

**Direct answer**

Build a form using Rails helpers, receive it through a route/controller action, permit expected attributes, authorize the operation and handle validation results.

**Detailed explanation**

Use form_with for modern model-backed forms. On success redirect using post/redirect/get; on failure render the form with the invalid object and a suitable status. CSRF protection, server-side validation and authorization are separate requirements.

**Practical example**

```ruby
def create
  @post = current_user.posts.new(post_params)
  if @post.save
    redirect_to @post, status: :see_other
  else
    render :new, status: :unprocessable_entity
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00880 — [thirtyfour.txt:49–49](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0317"></a>

### B-0317 — How do you handle form submissions with nested attributes in Rails?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you handle form submissions with nested attributes in Rails?

**Direct answer**

Rails form helpers generate HTML tied to a URL or model; nested forms use fields_for with accepts_nested_attributes_for when updating associated records through a parent.

**Detailed explanation**

Use form_with for model binding and built-in form conventions. For nested updates, permit a deliberate attribute list and authorize the child records being changed. allow_destroy controls nested deletion through _destroy; include an ID when modifying an existing child.

**Practical example**

```erb
<%= form_with model: @user do |form| %>
  <%= form.text_field :name %>
  <%= form.fields_for :posts do |post| %>
    <%= post.text_field :title %>
  <% end %>
<% end %>
# params.require(:user).permit(:name, posts_attributes: [:id, :title])
```

**Important points and follow-ups**

- Strong parameters filter mass assignment; they do not replace authorization or validation.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01506 — [twentyseven.txt:512–525](../ruby/twentyseven.txt) (Open-63) · [complete source](sources/twentyseven.md)


---

<a id="b-0318"></a>

### B-0318 — How do you handle parameters in a controller action?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you handle parameters in a controller action?

**Direct answer**

Strong Parameters allowlist attributes for mass assignment; they do not provide general value validation, authorization, or universal type casting.

**Detailed explanation**

Form and query parameters normally arrive as strings; JSON bodies can carry JSON types. Use require/permit, or expect in Rails 8+, to define the input shape. Validate values and authorize the target record separately. Do not permit role/admin or tenant ownership fields merely because the client sent them.

**Practical example**

```ruby
def user_params
  params.require(:user).permit(:name, :email)
end
# Rails 8+: params.expect(user: [:name, :email])
# Ownership must still be checked: current_user.posts.find(params[:id])
```

**Important points and follow-ups**

- Strong Parameters has been built into Rails since Rails 4; a separate strong_parameters gem was a historical backport.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Strong Parameters allowlists shape/attributes; form/query values are not automatically validated and cast into secure application types.
- The source inserts Python-like code into a Rails controller answer; use actual Ruby/ActionController code.

**Source references**

- SRC-01066 — [thirtysix.txt:571–629](../ruby/thirtysix.txt) (14) · [complete source](sources/thirtysix.md)


---

<a id="b-0319"></a>

### B-0319 — How do you handle server-side rendering (SSR) in Rails?

**Difficulty:** Advanced · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you handle server-side rendering (SSR) in Rails?

**Direct answer**

Rails normally renders HTML on the server through Action View templates and layouts.

**Detailed explanation**

The server prepares the data and HTML; the browser displays it and can add Turbo/Stimulus interactions. If the question means server-rendering a JavaScript UI framework, that requires a separate integration and runtime/build plan rather than a generic Rails setting.

**Practical example**

```ruby
def show
  @post = Post.find(params[:id])
end
# show.html.erb
<h1><%= @post.title %></h1>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00941 — [thirtyfour.txt:112–112](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0320"></a>

### B-0320 — How do you implement nested forms in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you implement nested forms in Rails?

**Direct answer**

Nested routes express a parent-child URL relationship; nested forms edit associated models using fields_for and accepts_nested_attributes_for.

**Detailed explanation**

For routes, authorize the child through its parent rather than trusting unrelated IDs. Keep nesting shallow. For forms, permit the nested attribute keys explicitly and consider validation/error handling and reject_if/allow_destroy behavior.

**Practical example**

```ruby
resources :posts do
  resources :comments, shallow: true
end
# Controller lookup:
@comment = current_user.posts.find(params[:post_id]).comments.find(params[:id])
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01270 — [twentyfive.txt:488–500](../ruby/twentyfive.txt) (72) · [complete source](sources/twentyfive.md)


---

<a id="b-0321"></a>

### B-0321 — How do you implement RESTful APIs in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you implement RESTful APIs in Rails?

**Direct answer**

Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

**Detailed explanation**

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

**Practical example**

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html

**Source references**

- SRC-01223 — [twentyfive.txt:120–122](../ruby/twentyfive.txt) (25) · [complete source](sources/twentyfive.md)


---

<a id="b-0322"></a>

### B-0322 — How do you pass data from a controller to a view?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you pass data from a controller to a view?

**Direct answer**

Set controller instance variables for the rendered template, or pass explicit locals when rendering.

**Detailed explanation**

Each request normally has its own controller instance; assigning @orders does not make that variable global across users. Reusing a view with different data is not inherently a data leak. The security requirement is to scope/authorize the queried records and only display intended fields.

**Practical example**

```ruby
@post = current_user.posts.find(params[:id])
# View: <%= @post.title %>
# Partial: render partial: "post", locals: { post: @post }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01064 — [thirtysix.txt:499–537](../ruby/thirtysix.txt) (12) · [complete source](sources/thirtysix.md)


---

<a id="b-0323"></a>

### B-0323 — How do you perform eager loading in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you perform eager loading in Rails?

**Direct answer**

joins combines tables for filtering but does not preload associations; preload uses separate queries; eager_load uses a LEFT OUTER JOIN; includes chooses a loading strategy.

**Detailed explanation**

N+1 occurs when one query fetches parents and later association access issues additional per-parent queries. Select the loading strategy based on SQL filtering and memory needs. A join may duplicate parent rows and require distinct. Loading every association can waste memory, so combine eager loading with pagination and appropriate indexes.

**Practical example**

```ruby
posts = Post.includes(:author).limit(20)
posts.each { |post| puts post.author.name }
# Filtering via a join without loading all comments:
Post.joins(:comments).where(comments: { approved: true }).distinct
```

**Important points and follow-ups**

- includes does not always use one query. joins alone does not fix N+1 when the view later traverses associations.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- includes can use separate queries or a join, and joins alone does not preload an association.

**Source references**

- SRC-01254 — [twentyfive.txt:317–325](../ruby/twentyfive.txt) (56) · [complete source](sources/twentyfive.md)


---

<a id="b-0324"></a>

### B-0324 — How do you use nested layouts?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How do you use nested layouts?

**Direct answer**

A layout wraps view content, and yield inserts the current view or a named content_for section.

**Detailed explanation**

Use partials for reusable pieces and nested layouts when pages need an additional wrapper inside a shared application layout. content_for captures named sections; a block form needs do and a matching end. A named section only appears if the selected layout yields that name.

**Practical example**

```ruby
# layout
<title><%= content_for?(:title) ? yield(:title) : "Shop" %></title>
<main><%= yield %></main>
# view
<% content_for :title, "Products" %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/layouts_and_rendering.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00765 — [thirtyeight.txt:124–125](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0325"></a>

### B-0325 — How does Rails handle request-response cycles?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 2

**Interview question**

How does Rails handle request-response cycles?

**Direct answer**

A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.

**Detailed explanation**

The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.

**Practical example**

```text
GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00868 — [thirtyfour.txt:37–37](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00987 — [thirtyfour.txt:484–494](../ruby/thirtyfour.txt) (18) · [complete source](sources/thirtyfour.md)


---

<a id="b-0326"></a>

### B-0326 — How does Rails handle routing and request flow?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

How does Rails handle routing and request flow?

**Direct answer**

A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.

**Detailed explanation**

The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.

**Practical example**

```text
GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00644 — [fifteen.txt:83–83](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)


---

<a id="b-0327"></a>

### B-0327 — Import GraphQL data, model it in Rails, and expose RESTful CRUD endpoints

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Import GraphQL data, model it in Rails, and expose RESTful CRUD endpoints

**Direct answer**

Separate the GraphQL client, a validated Planet persistence model and a REST controller; import validated rows idempotently rather than embedding a network fetch in every endpoint.

**Detailed explanation**

Send a POST carrying the provided GraphQL query, apply connection/read timeouts, reject non-success responses and GraphQL errors, and validate data before writes. The query has no stable external ID, so name-based uniqueness is only an explicit exercise assumption. Store population with an adequate numeric/null policy and terrains/climates as structured data. A real API needs authorization, pagination and tests for upstream failures. The provided public endpoint was not called or assumed to remain available.

**Practical example**

```ruby
# Import service skeleton; adapter/schema details must match the app.
require "net/http"
require "json"
uri = URI(ENV.fetch("PLANETS_GRAPHQL_URL"))
request = Net::HTTP::Post.new(uri)
request["Content-Type"] = "application/json"
request.body = JSON.generate(query: "query Query {allPlanets{planets{name population terrains climates}}}")
response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", open_timeout: 3, read_timeout: 5) { |http| http.request(request) }
raise "Upstream HTTP #{response.code}" unless response.is_a?(Net::HTTPSuccess)
payload = JSON.parse(response.body)
raise "GraphQL errors" if payload["errors"]
rows = payload.fetch("data").fetch("allPlanets").fetch("planets")
Planet.transaction do
  rows.each do |row|
    planet = Planet.find_or_initialize_by(name: row.fetch("name"))
    planet.update!(population: row["population"], terrains: row["terrains"], climates: row["climates"])
  end
end
# routes.rb
resources :planets, only: [:index, :show, :create, :update, :destroy]
# Controller create:
# planet = Planet.create!(params.require(:planet).permit(:name, :population, terrains: [], climates: []))
# render json: planet, status: :created
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html
- Use a database unique constraint for the chosen external identity and a durable external ID if the provider exposes one.

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.
- Source supplies an exercise without a complete implementation; example is an independently prepared design, not a claim of a verified live integration.

**Source references**

- SRC-00992 — [thirtyone.txt:19–39](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)


---

<a id="b-0328"></a>

### B-0328 — In a Rails application, what is the primary purpose of a layout?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In a Rails application, what is the primary purpose of a layout?

**Direct answer**

Option 2: To provide a consistent structure and look-and-feel across multiple views.

**Detailed explanation**

The correct choice is To provide a consistent structure and look-and-feel across multiple views. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To provide a consistent structure and look-and-feel across multiple views.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01567 — [twentyseven.txt:1092–1103](../ruby/twentyseven.txt) (MCQ-19) · [complete source](sources/twentyseven.md)


---

<a id="b-0329"></a>

### B-0329 — In a Rails controller, what is the key difference between using redirect_to and render?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In a Rails controller, what is the key difference between using redirect_to and render?

**Direct answer**

Option 2: `redirect_to` sends an HTTP redirect to the browser, resulting in a new request, while `render` renders a view within the current request.

**Detailed explanation**

Rendering a template does not execute the other action or initialize its instance variables. Redirecting does not transfer local state except through mechanisms such as flash or parameters. Neither method is a Ruby return statement. After a successful modifying form submission, a 303 redirect is often appropriate.

**Practical example**

```text
if @article.update(article_params)
  redirect_to @article, status: :see_other
else
  render :edit, status: :unprocessable_entity
end
```

**Important points and follow-ups**

- Do not render twice or continue into another response.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01558 — [twentyseven.txt:980–991](../ruby/twentyseven.txt) (MCQ-10) · [complete source](sources/twentyseven.md)


---

<a id="b-0330"></a>

### B-0330 — In a Rails controller, what is the primary purpose of a before_action filter?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In a Rails controller, what is the primary purpose of a before_action filter?

**Direct answer**

Option 2: To define a method that is automatically called before a specific action.

**Detailed explanation**

Use before_action for authentication or loading shared resources, and around_action for logic that wraps the action and yields. Rendering or redirecting from a before callback halts the remaining action chain, but does not automatically stop Ruby statements within that same method. Use return where needed.

**Practical example**

```ruby
before_action :require_login
private
def require_login
  return if current_user
  redirect_to login_path
end
```

**Important points and follow-ups**

- before_filter and related filter names are historical APIs.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01569 — [twentyseven.txt:1116–1127](../ruby/twentyseven.txt) (MCQ-21) · [complete source](sources/twentyseven.md)


---

<a id="b-0331"></a>

### B-0331 — In a Rails controller, what is the primary purpose of the render method?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In a Rails controller, what is the primary purpose of the render method?

**Direct answer**

Option 3: To generate an HTML response from a view template and send it to the browser.

**Detailed explanation**

The correct choice is To generate an HTML response from a view template and send it to the browser. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To generate an HTML response from a view template and send it to the browser.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01557 — [twentyseven.txt:966–979](../ruby/twentyseven.txt) (MCQ-9) · [complete source](sources/twentyseven.md)


---

<a id="b-0332"></a>

### B-0332 — In Rails, what is the primary purpose of using render partial?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In Rails, what is the primary purpose of using render partial?

**Direct answer**

Option 3: To reuse a chunk of view code in multiple templates.

**Detailed explanation**

Render a partial with explicit locals or use collection rendering. It improves composition and avoids duplicating presentation. Keep its dependencies clear so it can be reused without relying on many controller instance variables.

**Practical example**

```erb
<%= render "product", product: @product %>
<%= render @products %>
<%# _product.html.erb %>
<%= product.name %>
```

**Important points and follow-ups**

- A partial is not a layout or a controller action.
- Reference: https://guides.rubyonrails.org/layouts_and_rendering.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01573 — [twentyseven.txt:1166–1177](../ruby/twentyseven.txt) (MCQ-25) · [complete source](sources/twentyseven.md)


---

<a id="b-0333"></a>

### B-0333 — In Ruby on Rails, what is the fundamental difference between using a _path helper and a _url helper when generating URLs?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In Ruby on Rails, what is the fundamental difference between using a _path helper and a _url helper when generating URLs?

**Direct answer**

Option 2: `_path` generates a relative URL, while `_url` generates an absolute URL including the protocol and host.

**Detailed explanation**

The correct choice is `_path` generates a relative URL, while `_url` generates an absolute URL including the protocol and host. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: `_path` generates a relative URL, while `_url` generates an absolute URL including the protocol and host.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01568 — [twentyseven.txt:1104–1115](../ruby/twentyseven.txt) (MCQ-20) · [complete source](sources/twentyseven.md)


---

<a id="b-0334"></a>

### B-0334 — In Ruby on Rails, what is the primary purpose of the content_tag helper method?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In Ruby on Rails, what is the primary purpose of the content_tag helper method?

**Direct answer**

Option 2: To generate HTML tags programmatically within your views.

**Detailed explanation**

The correct choice is To generate HTML tags programmatically within your views. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To generate HTML tags programmatically within your views.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01563 — [twentyseven.txt:1040–1051](../ruby/twentyseven.txt) (MCQ-15) · [complete source](sources/twentyseven.md)


---

<a id="b-0335"></a>

### B-0335 — In Ruby on Rails, what is the primary purpose of the form_with helper?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In Ruby on Rails, what is the primary purpose of the form_with helper?

**Direct answer**

Option 2: To create a form that automatically handles CSRF protection, resource routing, and model binding.

**Detailed explanation**

The correct choice is To create a form that automatically handles CSRF protection, resource routing, and model binding. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To create a form that automatically handles CSRF protection, resource routing, and model binding.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01556 — [twentyseven.txt:954–965](../ruby/twentyseven.txt) (MCQ-8) · [complete source](sources/twentyseven.md)


---

<a id="b-0336"></a>

### B-0336 — In Ruby on Rails, what is the primary purpose of the url_for helper method?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

In Ruby on Rails, what is the primary purpose of the url_for helper method?

**Direct answer**

Option 3: To generate URLs based on the application's routes.

**Detailed explanation**

The correct choice is To generate URLs based on the application's routes. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To generate URLs based on the application's routes.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01564 — [twentyseven.txt:1052–1065](../ruby/twentyseven.txt) (MCQ-16) · [complete source](sources/twentyseven.md)


---

<a id="b-0337"></a>

### B-0337 — What are Helpers and How do use Helpers in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 9

**Interview question**

What are Helpers and How do use Helpers in Ruby on Rails?

**Direct answer**

Controllers in app/controllers coordinate HTTP requests; helper modules in app/helpers provide reusable presentation methods for views.

**Detailed explanation**

A controller action loads or changes application state, enforces authorization, and chooses a response. Helpers format or construct view content. They are not a substitute for domain services or authorization policies; controller access to helpers is not automatic in every calling context.

**Practical example**

```ruby
module UsersHelper
  def display_name(user)
    user.name.presence || "Anonymous"
  end
end
```

**Important points and follow-ups**

- Both directory names are plural.
- Keep database-heavy business logic out of view helpers.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00743 — [thirtyeight.txt:56–57](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00744 — [thirtyeight.txt:58–59](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00882 — [thirtyfour.txt:51–51](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00918 — [thirtyfour.txt:88–88](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-01112 — [twenty.txt:101–105](../ruby/twenty.txt) (14) · [complete source](sources/twenty.md)
- SRC-01245 — [twentyfive.txt:268–270](../ruby/twentyfive.txt) (47) · [complete source](sources/twentyfive.md)
- SRC-01286 — [twentyfive.txt:621–641](../ruby/twentyfive.txt) (88) · [complete source](sources/twentyfive.md)
- SRC-01421 — [twentythree.txt:196–203](../ruby/twentythree.txt) (Q29) · [complete source](sources/twentythree.md)
- SRC-01457 — [twentyseven.txt:132–136](../ruby/twentyseven.txt) (Open-14) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00743 (thirtyeight.txt)</summary>

**Original prompt:** What is a helper in Ruby on Rails?

**Answer:** Helpers contain reusable presentation logic called from views, such as formatting a date or building a small HTML fragment.

Place domain rules and database access in domain/model/service code. Return safe HTML only when it is constructed or escaped correctly. Avoid marking user input html_safe. Helper modules belong in app/helpers and can be exposed to views by Rails.

```ruby
module ApplicationHelper
  def display_date(date)
    date ? l(date, format: :long) : "—"
  end
end
```

</details>


---

<a id="b-0338"></a>

### B-0338 — What are Models, Views, and Controllers in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 2

**Interview question**

What are Models, Views, and Controllers in Rails?

**Direct answer**

MVC separates domain/data behavior in models, presentation in views, and request coordination in controllers.

**Detailed explanation**

The router dispatches a request to a controller action. The action loads or changes domain objects and renders a view or another representation, or returns a redirect. Active Record models often provide persistence, but a model need not inherit from Active Record. Views should avoid database queries, and complex workflows can live in services or other domain objects.

**Practical example**

```ruby
# app/controllers/posts_controller.rb
def show
  @post = Post.find(params[:id])
end
# app/views/posts/show.html.erb
<h1><%= @post.title %></h1>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/getting_started.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00854 — [thirtyfour.txt:23–23](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00974 — [thirtyfour.txt:209–249](../ruby/thirtyfour.txt) (4) · [complete source](sources/thirtyfour.md)


---

<a id="b-0339"></a>

### B-0339 — What are the key differences between GET, POST, PUT, and DELETE HTTP methods?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 2

**Interview question**

What are the key differences between GET, POST, PUT, and DELETE HTTP methods?

**Direct answer**

GET retrieves without changing server state; POST submits a new operation; PUT replaces a representation; PATCH applies changes; DELETE requests removal.

**Detailed explanation**

GET is safe and idempotent. PUT and DELETE are idempotent in their intended state effect; their repeated HTTP responses need not be identical. POST is not guaranteed idempotent, but an application can enforce idempotency keys. A GET response can change as data changes; idempotence is not a promise of identical response bytes.

**Practical example**

```text
GET /posts/1
POST /posts
PATCH /posts/1
DELETE /posts/1
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00869 — [thirtyfour.txt:38–38](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00988 — [thirtyfour.txt:495–511](../ruby/thirtyfour.txt) (19) · [complete source](sources/thirtyfour.md)


---

<a id="b-0340"></a>

### B-0340 — What are the main parts of a Rails view?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What are the main parts of a Rails view?

**Direct answer**

A partial is a reusable view template with an underscore-prefixed filename, rendered with locals or model-based rendering.

**Detailed explanation**

Layouts supply shared page structure; normal templates render action-specific content; partials factor reusable pieces; helpers handle small presentation operations. Prefer explicit locals when reuse requires a clear data contract, and avoid database queries in partial loops.

**Practical example**

```ruby
# app/views/posts/_post.html.erb
<h2><%= post.title %></h2>
# Another view:
<%= render partial: "posts/post", locals: { post: @post } %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00888 — [thirtyfour.txt:57–57](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0341"></a>

### B-0341 — What are the most common Ruby on Rails interview questions?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What are the most common Ruby on Rails interview questions?

**Direct answer**

Practice Ruby object/method/block semantics, Rails MVC/request flow, Active Record/SQL, security, testing, jobs and production debugging.

**Detailed explanation**

Use the full collection for coverage rather than a fixed short list. For each topic, state the direct answer, show a concrete example, and explain the failure mode and trade-off you would verify in a real project.

**Practical example**

```text
Practice prompt: diagnose a slow authorized endpoint, show the SQL change, and write a test for the intended response.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01158 — [twenty.txt:510–512](../ruby/twenty.txt) (1) · [complete source](sources/twenty.md)


---

<a id="b-0342"></a>

### B-0342 — What are the most important Ruby on Rails interview questions?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What are the most important Ruby on Rails interview questions?

**Direct answer**

Practice Ruby object/method/block semantics, Rails MVC/request flow, Active Record/SQL, security, testing, jobs and production debugging.

**Detailed explanation**

Use the full collection for coverage rather than a fixed short list. For each topic, state the direct answer, show a concrete example, and explain the failure mode and trade-off you would verify in a real project.

**Practical example**

```text
Practice prompt: diagnose a slow authorized endpoint, show the SQL change, and write a test for the intended response.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-00666 — [fifteen.txt:236–238](../ruby/fifteen.txt) (1) · [complete source](sources/fifteen.md)


---

<a id="b-0343"></a>

### B-0343 — What command can you use to create a controller for the subject?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What command can you use to create a controller for the subject?

**Direct answer**

Use Rails generators to create the relevant model or controller files, then inspect the generated code and routes.

**Detailed explanation**

Generators provide a starting point, not business-complete application behavior. A model generator creates a migration; a controller generator only creates the requested actions/views/routes rather than a complete database resource.

**Practical example**

```bash
bin/rails generate model User name:string email:string
bin/rails generate controller Subjects index show
bin/rails db:migrate
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Historical Rails command/configuration example: use current bin/rails commands, versioned migration methods and modern server/configuration APIs.

**Source references**

- SRC-01351 — [twentytwo.txt:190–193](../ruby/twentytwo.txt) (6) · [complete source](sources/twentytwo.md)


---

<a id="b-0344"></a>

### B-0344 — What do you mean by Render and Redirect_to?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 6

**Interview question**

What do you mean by Render and Redirect_to?

**Direct answer**

render creates a response within the current request; redirect_to sends a redirect so the client makes a new request.

**Detailed explanation**

Rendering a template does not execute the other action or initialize its instance variables. Redirecting does not transfer local state except through mechanisms such as flash or parameters. Neither method is a Ruby return statement. After a successful modifying form submission, a 303 redirect is often appropriate.

**Practical example**

```text
if @article.update(article_params)
  redirect_to @article, status: :see_other
else
  render :edit, status: :unprocessable_entity
end
```

**Important points and follow-ups**

- Do not render twice or continue into another response.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected malformed pasted Ruby and added a validation-failure status in the example.

**Source references**

- SRC-00861 — [thirtyfour.txt:30–30](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00980 — [thirtyfour.txt:340–362](../ruby/thirtyfour.txt) (11) · [complete source](sources/thirtyfour.md)
- SRC-01204 — [twentyfive.txt:32–37](../ruby/twentyfive.txt) (6) · [complete source](sources/twentyfive.md)
- SRC-01290 — [twentyfive.txt:662–667](../ruby/twentyfive.txt) (92) · [complete source](sources/twentyfive.md)
- SRC-01422 — [twentythree.txt:204–242](../ruby/twentythree.txt) (Q30) · [complete source](sources/twentythree.md)
- SRC-01505 — [twentyseven.txt:507–511](../ruby/twentyseven.txt) (Open-62) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00861 (thirtyfour.txt)</summary>

**Original prompt:** What is the difference between render and redirect_to in controllers?

**Answer:** render builds the response within the current request; redirect_to returns an HTTP redirect so the client makes another request.

Rendering another template does not run that template’s controller action, so initialize its required data. Neither render nor redirect_to is a Ruby control-flow return; use return or conditional structure to avoid unintended continuation or double rendering. Use an appropriate failure status for invalid submissions.

```text
if @post.save
  redirect_to @post, status: :see_other
else
  render :new, status: :unprocessable_entity
end
```

</details>


---

<a id="b-0345"></a>

### B-0345 — What does “fat models, skinny controllers” mean?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What does “fat models, skinny controllers” mean?

**Direct answer**

A concern is a module, often using ActiveSupport::Concern, that groups cohesive reusable behavior; services and other objects separate workflows that do not belong to persistence models.

**Detailed explanation**

A concern can add associations or callbacks through included blocks and class methods through class_methods. It remains coupled to its host and does not reduce the host’s responsibilities merely by moving code into another file. Use composition/delegation for business workflows, validators for validation policy and form objects for multi-model input. These are design choices, not mandatory Rails layers.

**Practical example**

```ruby
module Noteable
  extend ActiveSupport::Concern
  included do
    has_many :notes, as: :noteable, dependent: :destroy
  end
end
```

**Important points and follow-ups**

- Reference: https://api.rubyonrails.org/classes/ActiveSupport/Concern.html

**Source references**

- SRC-01038 — [thirtyseven.txt:114–122](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0346"></a>

### B-0346 — What does “skinny controllers, skinny models” mean?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 3

**Interview question**

What does “skinny controllers, skinny models” mean?

**Direct answer**

A concern is a module, often using ActiveSupport::Concern, that groups cohesive reusable behavior; services and other objects separate workflows that do not belong to persistence models.

**Detailed explanation**

A concern can add associations or callbacks through included blocks and class methods through class_methods. It remains coupled to its host and does not reduce the host’s responsibilities merely by moving code into another file. Use composition/delegation for business workflows, validators for validation policy and form objects for multi-model input. These are design choices, not mandatory Rails layers.

**Practical example**

```ruby
module Noteable
  extend ActiveSupport::Concern
  included do
    has_many :notes, as: :noteable, dependent: :destroy
  end
end
```

**Important points and follow-ups**

- Reference: https://api.rubyonrails.org/classes/ActiveSupport/Concern.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Design guidance is not a framework rule: domain models need not all persist, and services commonly encapsulate business-domain workflows.

**Source references**

- SRC-00781 — [thirtyeight.txt:156–157](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00786 — [thirtyeight.txt:169–171](../ruby/thirtyeight.txt) (1) · [complete source](sources/thirtyeight.md)
- SRC-01039 — [thirtyseven.txt:123–129](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0347"></a>

### B-0347 — What is a 'form' in HTML, and how does it relate to a Rails application?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is a 'form' in HTML, and how does it relate to a Rails application?

**Direct answer**

Rails form helpers generate HTML tied to a URL or model; nested forms use fields_for with accepts_nested_attributes_for when updating associated records through a parent.

**Detailed explanation**

Use form_with for model binding and built-in form conventions. For nested updates, permit a deliberate attribute list and authorize the child records being changed. allow_destroy controls nested deletion through _destroy; include an ID when modifying an existing child.

**Practical example**

```erb
<%= form_with model: @user do |form| %>
  <%= form.text_field :name %>
  <%= form.fields_for :posts do |post| %>
    <%= post.text_field :title %>
  <% end %>
<% end %>
# params.require(:user).permit(:name, posts_attributes: [:id, :title])
```

**Important points and follow-ups**

- Strong parameters filter mass assignment; they do not replace authorization or validation.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01485 — [twentyseven.txt:337–341](../ruby/twentyseven.txt) (Open-42) · [complete source](sources/twentyseven.md)


---

<a id="b-0348"></a>

### B-0348 — What is a partial in Rails views? Why would you use one?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 8

**Interview question**

What is a partial in Rails views? Why would you use one?

**Direct answer**

A view turns data prepared for a response into a presentation, commonly HTML using ERB templates.

**Detailed explanation**

Controllers expose instance variables to their view context. ERB <%= ... %> outputs a value and <% ... %> executes Ruby without directly outputting its result. Presentation belongs here; permission decisions and domain invariants still need server-side enforcement.

**Practical example**

```erb
<%# app/views/articles/show.html.erb %>
<h1><%= @article.title %></h1>
```

**Important points and follow-ups**

- A partial is not a layout or a controller action.
- Reference: https://guides.rubyonrails.org/layouts_and_rendering.html
- Normal ERB output is HTML-escaped; avoid html_safe for untrusted content.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00862 — [thirtyfour.txt:31–31](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00981 — [thirtyfour.txt:363–390](../ruby/thirtyfour.txt) (12) · [complete source](sources/thirtyfour.md)
- SRC-01001 — [thirtyone.txt:195–208](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01116 — [twenty.txt:129–133](../ruby/twenty.txt) (18) · [complete source](sources/twenty.md)
- SRC-01246 — [twentyfive.txt:271–273](../ruby/twentyfive.txt) (48) · [complete source](sources/twentyfive.md)
- SRC-01288 — [twentyfive.txt:648–654](../ruby/twentyfive.txt) (90) · [complete source](sources/twentyfive.md)
- SRC-01460 — [twentyseven.txt:147–151](../ruby/twentyseven.txt) (Open-17) · [complete source](sources/twentyseven.md)
- SRC-01491 — [twentyseven.txt:389–400](../ruby/twentyseven.txt) (Open-48) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00862 (thirtyfour.txt)</summary>

**Original prompt:** What is a partial in Rails, and why would you use it?

**Answer:** A partial is a reusable view template with an underscore-prefixed filename, rendered with locals or model-based rendering.

Layouts supply shared page structure; normal templates render action-specific content; partials factor reusable pieces; helpers handle small presentation operations. Prefer explicit locals when reuse requires a clear data contract, and avoid database queries in partial loops.

```ruby
# app/views/posts/_post.html.erb
<h2><%= post.title %></h2>
# Another view:
<%= render partial: "posts/post", locals: { post: @post } %>
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01460 (twentyseven.txt)</summary>

**Original prompt:** What is a Rails partial, and why would you use one?

**Answer:** A partial is a reusable view template whose filename normally starts with an underscore.

Render a partial with explicit locals or use collection rendering. It improves composition and avoids duplicating presentation. Keep its dependencies clear so it can be reused without relying on many controller instance variables.

```erb
<%= render "product", product: @product %>
<%= render @products %>
<%# _product.html.erb %>
<%= product.name %>
```

</details>


---

<a id="b-0349"></a>

### B-0349 — What is a Rails form, and how do you create one?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is a Rails form, and how do you create one?

**Direct answer**

Rails form helpers generate HTML tied to a URL or model; nested forms use fields_for with accepts_nested_attributes_for when updating associated records through a parent.

**Detailed explanation**

Use form_with for model binding and built-in form conventions. For nested updates, permit a deliberate attribute list and authorize the child records being changed. allow_destroy controls nested deletion through _destroy; include an ID when modifying an existing child.

**Practical example**

```erb
<%= form_with model: @user do |form| %>
  <%= form.text_field :name %>
  <%= form.fields_for :posts do |post| %>
    <%= post.text_field :title %>
  <% end %>
<% end %>
# params.require(:user).permit(:name, posts_attributes: [:id, :title])
```

**Important points and follow-ups**

- Strong parameters filter mass assignment; they do not replace authorization or validation.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01456 — [twentyseven.txt:116–131](../ruby/twentyseven.txt) (Open-13) · [complete source](sources/twentyseven.md)


---

<a id="b-0350"></a>

### B-0350 — What is a Rails view, and how does it relate to the controller?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 2

**Interview question**

What is a Rails view, and how does it relate to the controller?

**Direct answer**

A view turns data prepared for a response into a presentation, commonly HTML using ERB templates.

**Detailed explanation**

Controllers expose instance variables to their view context. ERB <%= ... %> outputs a value and <% ... %> executes Ruby without directly outputting its result. Presentation belongs here; permission decisions and domain invariants still need server-side enforcement.

**Practical example**

```erb
<%# app/views/articles/show.html.erb %>
<h1><%= @article.title %></h1>
```

**Important points and follow-ups**

- Normal ERB output is HTML-escaped; avoid html_safe for untrusted content.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01449 — [twentyseven.txt:62–75](../ruby/twentyseven.txt) (Open-6) · [complete source](sources/twentyseven.md)
- SRC-01480 — [twentyseven.txt:303–307](../ruby/twentyseven.txt) (Open-37) · [complete source](sources/twentyseven.md)


---

<a id="b-0351"></a>

### B-0351 — What is an Asset Pipeline in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 11

**Interview question**

What is an Asset Pipeline in Rails?

**Direct answer**

An asset pipeline manages static asset discovery and fingerprinted URLs; exact bundling and preprocessing behavior depends on the configured tools and Rails version.

**Detailed explanation**

Rails 8 uses Propshaft by default. Propshaft does not itself perform general-purpose JavaScript/CSS bundling or minification; specialized tools can be added. Sprockets and Webpacker descriptions in older answers must be read in their historical context.

**Practical example**

```erb
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
<%= javascript_importmap_tags %>
# bin/rails assets:precompile
```

**Important points and follow-ups**

- Fingerprinting enables long-lived cache headers while content changes get new URLs.
- Do not assume Sprockets, CoffeeScript, Webpacker, or automatic JS minification is present in every Rails version.
- Reference: https://guides.rubyonrails.org/asset_pipeline.html
- Webpacker is not the universal modern Rails default.
- Do not assume every application concatenates all assets into exactly two files.

**Corrections and source limitations**

- Qualified old blanket claim that the pipeline always bundles/minifies/compresses all assets.
- The source supplies a prompt without an answer; an independently prepared answer is required.
- Asset behavior is version-specific: Rails 8 defaults to Propshaft; bundling/transpilation/minification may require separate tooling.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- Corrected Sprockets-era pipeline behavior for the Rails 8 Propshaft default.

**Source references**

- SRC-00404 — [ten.txt:173–178](../ruby/ten.txt) (33) · [complete source](sources/ten.md)
- SRC-00801 — [thirtyeight.txt:208–209](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)
- SRC-00876 — [thirtyfour.txt:45–45](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00999 — [thirtyone.txt:165–178](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01020 — [thirtyone.txt:731–748](../ruby/thirtyone.txt) · [complete source](sources/thirtyone.md)
- SRC-01117 — [twenty.txt:134–138](../ruby/twenty.txt) (19) · [complete source](sources/twenty.md)
- SRC-01207 — [twentyfive.txt:44–46](../ruby/twentyfive.txt) (9) · [complete source](sources/twentyfive.md)
- SRC-01259 — [twentyfive.txt:379–381](../ruby/twentyfive.txt) (61) · [complete source](sources/twentyfive.md)
- SRC-01425 — [twentythree.txt:259–268](../ruby/twentythree.txt) (Q33) · [complete source](sources/twentythree.md)
- SRC-01458 — [twentyseven.txt:137–141](../ruby/twentyseven.txt) (Open-15) · [complete source](sources/twentyseven.md)
- SRC-01490 — [twentyseven.txt:378–388](../ruby/twentyseven.txt) (Open-47) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00404 (ten.txt)</summary>

**Original prompt:** What is the asset pipeline in Rails?

**Answer:** Rails’ asset pipeline manages asset discovery and deployment references such as fingerprinted URLs. The exact compiler/bundler behavior depends on the configured tools and Rails version.

Older Sprockets setups support preprocessing and bundling. Newer Rails applications commonly use Propshaft, with CSS/JS bundling handled by separate tools or import maps as appropriate. Do not claim every asset pipeline combines, minifies and transpiles JavaScript automatically.

```bash
bin/rails assets:precompile
# Inspect configured Propshaft/Sprockets and JS/CSS build tools for this app.
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00801 (thirtyeight.txt)</summary>

**Original prompt:** Explain what an asset pipeline is.

**Answer:** Rails asset management organizes, fingerprints and serves browser assets. New Rails 8 applications use Propshaft; bundling/transpilation is a separate concern.

Older Sprockets applications often combine concatenation, preprocessing and minification in the pipeline. Propshaft focuses on digesting and serving ready-to-use assets; use jsbundling-rails/cssbundling-rails or another appropriate build tool when required. importmap-rails loads browser ES modules without a Node build. Webpacker is a legacy integration, not the default recommendation for a new application.

```bash
RAILS_ENV=production bin/rails assets:precompile
# Reference a fingerprinted asset through a helper:
<%= image_tag "logo.png" %>
```

</details>


---

<a id="b-0352"></a>

### B-0352 — What is Nested Layout in Ruby on Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is Nested Layout in Ruby on Rails?

**Direct answer**

Nested layouts let a section-specific layout supply content inside the application layout.

**Detailed explanation**

Use content_for and a layout render to share the global shell while customizing an admin area or similar section. Layouts are composed templates; an ERB layout does not inherit like a Ruby class.

**Practical example**

```erb
<%# layouts/admin.html.erb %>
<% content_for :content do %>
  <aside>Admin</aside><%= yield %>
<% end %>
<%= render template: "layouts/application" %>
<%# application: yield(:content).presence || yield %>
```

**Important points and follow-ups**

- Avoid naming a content block ambiguously or recursively rendering the same layout.
- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01414 — [twentythree.txt:156–161](../ruby/twentythree.txt) (Q22) · [complete source](sources/twentythree.md)


---

<a id="b-0353"></a>

### B-0353 — What is request.xhr?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is request.xhr?

**Direct answer**

request.xhr? checks whether the request carries the conventional X-Requested-With: XMLHttpRequest header.

**Detailed explanation**

It is a convenience hint, not proof of browser origin, authentication or safety. Modern fetch and Turbo requests may not set the same header, so use explicit formats/contracts rather than using xhr? as an authorization boundary.

**Practical example**

```text
if request.xhr?
  render partial: "results"
else
  render :index
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-01198 — [twentyeight.txt:401–401](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0354"></a>

### B-0354 — What is REST in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is REST in Rails?

**Direct answer**

Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

**Detailed explanation**

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

**Practical example**

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html

**Source references**

- SRC-01109 — [twenty.txt:84–88](../ruby/twenty.txt) (11) · [complete source](sources/twenty.md)


---

<a id="b-0355"></a>

### B-0355 — What is restful in rails

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is restful in rails

**Direct answer**

Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

**Detailed explanation**

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

**Practical example**

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/routing.html

**Source references**

- SRC-01197 — [twentyeight.txt:388–400](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0356"></a>

### B-0356 — What is the difference between form_for and form_with?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the difference between form_for and form_with?

**Direct answer**

form_for is the older model-bound form builder; form_with supports model-bound and URL/scoped forms through one interface.

**Detailed explanation**

Use form_with for new application code. Default remote/local behavior changed across Rails versions, and Turbo affects submission behavior independently. A model-bound form derives URL/method and parameter nesting from the object and routes.

**Practical example**

```erb
<%= form_with(model: @post) do |f| %>
  <%= f.text_field :title %>
  <%= f.submit %>
<% end %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01228 — [twentyfive.txt:156–161](../ruby/twentyfive.txt) (30) · [complete source](sources/twentyfive.md)


---

<a id="b-0357"></a>

### B-0357 — What is the error in this Rails route configuration?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the error in this Rails route configuration?

**Direct answer**

The explicit GET users/:id route duplicates the show route already generated by resources :users; it is redundant, not a Ruby syntax error.

**Detailed explanation**

Rails matches routes in declaration order. Remove accidental duplicate routes to make intent clear, but custom routes can be valid when they provide different behavior, constraints or helpers. Inspect the result with bin/rails routes.

**Practical example**

```text
Rails.application.routes.draw do
  resources :users
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Source wording overstates a duplicate route as an error; the shown routing file is syntactically valid.

**Source references**

- SRC-00827 — [thirtyfive.txt:67–77](../ruby/thirtyfive.txt) (07) · [complete source](sources/thirtyfive.md)


---

<a id="b-0358"></a>

### B-0358 — What is the primary purpose of the content_for helper in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the primary purpose of the content_for helper in Rails?

**Direct answer**

Option 1: To define a block of content in a view that can be rendered in a different view, typically a layout.

**Detailed explanation**

The correct choice is To define a block of content in a view that can be rendered in a different view, typically a layout. The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: To define a block of content in a view that can be rendered in a different view, typically a layout.
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01571 — [twentyseven.txt:1142–1153](../ruby/twentyseven.txt) (MCQ-23) · [complete source](sources/twentyseven.md)


---

<a id="b-0359"></a>

### B-0359 — What is the problem with the following controller code? How would you fix it?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the problem with the following controller code? How would you fix it?

**Direct answer**

Filter the allowed parameter keys directly instead of converting every untrusted key to a symbol; in a controller, use permit when these values will be mass-assigned.

**Detailed explanation**

The original claim that all symbols are never garbage-collected is outdated since Ruby 2.2, although bounded input and allowlisting remain important. The pasted params.slice(*available option keys) is syntactically broken because the variable name has spaces. Avoid building arbitrary dynamic dispatch or symbol vocabularies from attacker-controlled keys.

**Practical example**

```ruby
allowed = %w[first_option second_option third_option]
options = params.permit(*allowed).to_h
# For a plain Ruby Hash instead:
# options = input.slice(*allowed)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Corrected obsolete universal non-GC-symbol claim and malformed available option keys expression.
- Outdated: modern Ruby can garbage-collect dynamically created symbols; input allowlisting remains advisable.

**Source references**

- SRC-01372 — [twentytwo.txt:298–317](../ruby/twentytwo.txt) (1) · [complete source](sources/twentytwo.md)


---

<a id="b-0360"></a>

### B-0360 — What is the purpose of Rails layouts?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the purpose of Rails layouts?

**Direct answer**

A layout wraps view content, and yield inserts the current view or a named content_for section.

**Detailed explanation**

Use partials for reusable pieces and nested layouts when pages need an additional wrapper inside a shared application layout. content_for captures named sections; a block form needs do and a matching end. A named section only appears if the selected layout yields that name.

**Practical example**

```ruby
# layout
<title><%= content_for?(:title) ? yield(:title) : "Shop" %></title>
<main><%= yield %></main>
# view
<% content_for :title, "Products" %>
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/layouts_and_rendering.html

**Source references**

- SRC-01238 — [twentyfive.txt:228–230](../ruby/twentyfive.txt) (40) · [complete source](sources/twentyfive.md)


---

<a id="b-0361"></a>

### B-0361 — What is the purpose of the assets folder in Rails?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the purpose of the assets folder in Rails?

**Direct answer**

Rails asset management organizes, fingerprints and serves browser assets. New Rails 8 applications use Propshaft; bundling/transpilation is a separate concern.

**Detailed explanation**

Older Sprockets applications often combine concatenation, preprocessing and minification in the pipeline. Propshaft focuses on digesting and serving ready-to-use assets; use jsbundling-rails/cssbundling-rails or another appropriate build tool when required. importmap-rails loads browser ES modules without a Node build. Webpacker is a legacy integration, not the default recommendation for a new application.

**Practical example**

```bash
RAILS_ENV=production bin/rails assets:precompile
# Reference a fingerprinted asset through a helper:
<%= image_tag "logo.png" %>
```

**Important points and follow-ups**

- Do not assume Sprockets, CoffeeScript, Webpacker, or automatic JS minification is present in every Rails version.
- Reference: https://guides.rubyonrails.org/asset_pipeline.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00884 — [thirtyfour.txt:53–53](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0362"></a>

### B-0362 — What is the Rails request lifecycle?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

What is the Rails request lifecycle?

**Direct answer**

A request passes through the web server and Rack middleware, the router chooses a controller action, callbacks and the action run, then Rails returns a response.

**Detailed explanation**

The action can call models/services and render HTML, JSON or another representation, send headers, or redirect. A redirect asks the client to make another request. Routes decide allowed verbs; actions are not automatically GET endpoints. Authentication, authorization, CSRF and error handling apply at the relevant boundaries.

**Practical example**

```text
GET /posts/7 → Rack middleware → router → PostsController#show → Post.find(7) → show.html.erb → HTTP response
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/action_controller_overview.html

**Source references**

- SRC-01314 — [twentysix.txt:13–15](../ruby/twentysix.txt) (1) · [complete source](sources/twentysix.md)


---

<a id="b-0363"></a>

### B-0363 — What is the role of the 'routes.rb' file in a Rails application?

**Difficulty:** Beginner · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 9

**Interview question**

What is the role of the 'routes.rb' file in a Rails application?

**Direct answer**

config/routes.rb maps HTTP methods and URL patterns to endpoint handlers and creates URL/path helpers.

**Detailed explanation**

Routes are matched in declaration order. Use resources for a conventional collection, resource for a singular resource, and namespaces for organization. Routing selects an endpoint; it does not replace authentication or authorization.

**Practical example**

```ruby
resources :articles
get "/about", to: "pages#about"
# bin/rails routes
```

**Important points and follow-ups**

- Use bin/rails routes to inspect generated routes.
- Reference: https://guides.rubyonrails.org/routing.html
- A singular resource has no index action and normally no :id path segment.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.
- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-00044 — [first.txt:292–296](../ruby/first.txt) (14) · [complete source](sources/first.md)
- SRC-00379 — [ten.txt:61–63](../ruby/ten.txt) (8) · [complete source](sources/ten.md)
- SRC-00823 — [thirtyfive.txt:28–36](../ruby/thirtyfive.txt) (03) · [complete source](sources/thirtyfive.md)
- SRC-00832 — [thirtyfive.txt:116–124](../ruby/thirtyfive.txt) (02) · [complete source](sources/thirtyfive.md)
- SRC-00859 — [thirtyfour.txt:28–28](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)
- SRC-00978 — [thirtyfour.txt:308–321](../ruby/thirtyfour.txt) (9) · [complete source](sources/thirtyfour.md)
- SRC-01229 — [twentyfive.txt:162–172](../ruby/twentyfive.txt) (31) · [complete source](sources/twentyfive.md)
- SRC-01451 — [twentyseven.txt:81–85](../ruby/twentyseven.txt) (Open-8) · [complete source](sources/twentyseven.md)
- SRC-01478 — [twentyseven.txt:285–292](../ruby/twentyseven.txt) (Open-35) · [complete source](sources/twentyseven.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00044 (first.txt)</summary>

**Original prompt:** Describe the purpose of routes in a Rails application.

**Answer:** Routes match the HTTP verb and path to an endpoint, and provide URL/path helpers for links and redirects.

Routes in a Rails application define the URLs and their corresponding controller actions. They map incoming HTTP requests to specific controller methods, enabling you to design the navigation and behavior of your web application.

By configuring routes, you define the endpoints that users can access, along with the actions that will be performed when those endpoints are visited. This centralizes the management of your application's URLs and provides a clear structure for handling different requests.

```ruby
# config/routes.rb
resources :products, only: [:index, :show]
# GET /products/:id -> products#show
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00379 (ten.txt)</summary>

**Original prompt:** Explain the role of routing in Rails.

**Answer:** Rails routing matches an HTTP verb and path to a controller action and parameters.

Resource routing supplies conventional CRUD endpoints, while namespaces, constraints and explicit routes support other interfaces. Route order matters; keep broad catchalls after more specific routes. Routes select an action but do not enforce resource authorization by themselves.

```text
Rails.application.routes.draw do
  resources :posts, only: [:index, :show]
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00823 (thirtyfive.txt)</summary>

**Original prompt:** Describe the role of routes.rb in a Rails application.

**Answer:** Define routes in config/routes.rb; resources :posts generates the conventional resource routes, and bin/rails routes lists them.

The routes are GET /posts (index), GET /posts/new (new), POST /posts (create), GET /posts/:id (show), GET /posts/:id/edit (edit), PATCH or PUT /posts/:id (update), and DELETE /posts/:id (destroy). The new/edit routes display forms; they do not themselves persist changes. A member route has an ID and a collection route does not. Match action names exactly.

```ruby
resources :posts do
  member { get :comments }
  collection { post :bulk_upload }
end
# Additional paths: GET /posts/:id/comments and POST /posts/bulk_upload
```

</details>


---

<a id="b-0364"></a>

### B-0364 — Which of the following statements best describes the primary function of the Rails asset pipeline?

**Difficulty:** Intermediate · **Topic:** HTTP, MVC and presentation · **Source occurrences:** 1

**Interview question**

Which of the following statements best describes the primary function of the Rails asset pipeline?

**Direct answer**

Option 2: To compile, minify, and concatenate static assets like CSS, JavaScript, and images for improved performance.

**Detailed explanation**

Option 2 is the historical Sprockets-era intended answer. For Rails 8 Propshaft, fingerprinting and serving browser-ready assets are core duties; general bundling/minification require separate tools.

**Practical example**

```erb
<%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
<%= javascript_importmap_tags %>
# bin/rails assets:precompile
```

**Important points and follow-ups**

- Webpacker is not the universal modern Rails default.
- Do not assume every application concatenates all assets into exactly two files.
- Reference: https://guides.rubyonrails.org/asset_pipeline.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The pasted MCQ contains options but no answer key; this key is an independently derived answer.
- Version-qualified MCQ: its asset-pipeline option is outdated for default Propshaft applications.

**Source references**

- SRC-01550 — [twentyseven.txt:882–893](../ruby/twentyseven.txt) (MCQ-2) · [complete source](sources/twentyseven.md)


---

<a id="b-0365"></a>

### B-0365 — How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...)

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

How does Rails extend the Ruby language? (Convenience methods, 3.seconds.ago, hash.slice, ...)

**Direct answer**

Active Support extends Ruby with helpers such as durations and blank?/present?. Some historical Rails additions, including Hash#slice, later became core Ruby.

**Detailed explanation**

Active Support extends Ruby with helpers such as durations and blank?/present?. Some historical Rails additions, including Hash#slice, later became core Ruby. Hash#slice exists in Ruby 2.5+ without Rails; do not claim it is always Rails-only.

**Practical example**

```ruby
require "active_support/all"
p 3.seconds
p({a: 1, b: 2}.slice(:a))
```

**Important points and follow-ups**

- Hash#slice exists in Ruby 2.5+ without Rails; do not claim it is always Rails-only.

**Corrections and source limitations**

- Original answer is absent or incomplete; the answer below is an authored completion.
- Original incomplete/outdated claim corrected: Active Support extends Ruby with helpers such as durations and blank?/present?. Some historical Rails additions, including Hash#slice, later became core Ruby.

**Source references**

- SRC-00176 — [five.txt:63–63](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="b-0366"></a>

### B-0366 — What is the difference between before_validation and before_save callbacks?

**Difficulty:** Beginner · **Topic:** Object model and metaprogramming · **Source occurrences:** 1

**Interview question**

What is the difference between before_validation and before_save callbacks?

**Direct answer**

Model validations check whether an object meets application rules before normal persistence; database constraints enforce integrity across every writer.

**Detailed explanation**

Use validates for presence, length, numericality and other checks. valid? populates errors without saving. save returns false for validation failure; save! raises. Bulk SQL operations such as update_all bypass validations and callbacks, so important constraints must also exist in the database.

**Practical example**

```ruby
class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
user = User.new
user.valid? # false
user.errors.full_messages
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/active_record_validations.html

**Source references**

- SRC-01287 — [twentyfive.txt:642–647](../ruby/twentyfive.txt) (89) · [complete source](sources/twentyfive.md)


---

<a id="b-0367"></a>

### B-0367 — Explain how you would implement a search functionality in a Rails application. What are some performance considerations?

**Difficulty:** Beginner · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

Explain how you would implement a search functionality in a Rails application. What are some performance considerations?

**Direct answer**

Build search with an authorized base relation, explicit filter and sort allowlists, bounded pagination, and indexes aligned with the search strategy.

**Detailed explanation**

Simple structured filters fit Active Record. PostgreSQL full-text search or an external search service may be suitable for ranked text search. Inspect query plans and deep-pagination behavior. Never pass arbitrary client input as an ORDER BY expression; advanced search libraries also need attribute and association allowlists.

**Practical example**

```ruby
sorts = { "newest" => { created_at: :desc }, "name" => { name: :asc } }
records = current_user.tenant.products.where(active: true)
records = records.order(sorts.fetch(params[:sort], sorts["newest"]))
records = records.limit(25)
```

**Important points and follow-ups**

- Keyset pagination can avoid expensive large offsets.
- Escape LIKE wildcard characters when they should be literal.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01517 — [twentyseven.txt:615–625](../ruby/twentyseven.txt) (Open-74) · [complete source](sources/twentyseven.md)


---

<a id="b-0368"></a>

### B-0368 — Explain the role of background jobs and queues in enhancing Ruby application performance.

**Difficulty:** Intermediate · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

Explain the role of background jobs and queues in enhancing Ruby application performance.

**Direct answer**

Queues move work outside the request cycle and let workers retry and scale independently. They improve request latency but do not automatically reduce the total work.

**Detailed explanation**

Background jobs and queues are used to offload time-consuming or non-essential tasks from the main application process. This enhances user experience by reducing response times. By using gems like Sidekiq or Resque, you can move tasks like sending emails, processing uploaded files, and performing complex calculations to background workers. This allows your application to remain responsive and scalable even when dealing with resource-intensive tasks.

**Practical example**

```ruby
ReceiptJob.perform_later(order.id)
```

**Important points and follow-ups**

- Jobs must tolerate retries/duplicates; persist intent reliably when losing an enqueue would break business guarantees.

**Source references**

- SRC-00054 — [first.txt:338–340](../ruby/first.txt) (24) · [complete source](sources/first.md)


---

<a id="b-0369"></a>

### B-0369 — How do you cache partials and pages in Rails?

**Difficulty:** Beginner · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

How do you cache partials and pages in Rails?

**Direct answer**

A partial is a reusable view template with an underscore-prefixed filename, rendered with locals or model-based rendering.

**Detailed explanation**

Layouts supply shared page structure; normal templates render action-specific content; partials factor reusable pieces; helpers handle small presentation operations. Prefer explicit locals when reuse requires a clear data contract, and avoid database queries in partial loops.

**Practical example**

```ruby
# app/views/posts/_post.html.erb
<h2><%= post.title %></h2>
# Another view:
<%= render partial: "posts/post", locals: { post: @post } %>
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01326 — [twentysix.txt:49–51](../ruby/twentysix.txt) (12) · [complete source](sources/twentysix.md)


---

<a id="b-0370"></a>

### B-0370 — How do you handle performance monitoring and alerting in a Rails application, and what tools do you use for this purpose?

**Difficulty:** Advanced · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

How do you handle performance monitoring and alerting in a Rails application, and what tools do you use for this purpose?

**Direct answer**

Measure the bottleneck before changing the application: inspect latency distributions, traces, slow queries, allocation and queue metrics.

**Detailed explanation**

For database work, inspect actual SQL and query plans, fix N+1 patterns, and add indexes justified by query predicates and order. Consider bounded batches, less selected data, caching or background jobs only after understanding the workload. Re-measure the original case and watch regressions under representative concurrency.

**Practical example**

```ruby
users = User.preload(:posts).where(active: true).limit(100)
# Inspect generated SQL and query plans for the database in use.
# Compare p95 latency, query count and allocated bytes before/after.
```

**Important points and follow-ups**

- An index adds write/storage cost and is not guaranteed to improve every query.
- Choose alert thresholds from service objectives and avoid logging secrets.
- Reference: https://guides.rubyonrails.org/active_record_querying.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01541 — [twentyseven.txt:792–796](../ruby/twentyseven.txt) (Open-98) · [complete source](sources/twentyseven.md)


---

<a id="b-0371"></a>

### B-0371 — How do you optimize asset loading in Rails?

**Difficulty:** Beginner · **Topic:** Performance, memory and concurrency · **Source occurrences:** 1

**Interview question**

How do you optimize asset loading in Rails?

**Direct answer**

Rails asset management organizes, fingerprints and serves browser assets. New Rails 8 applications use Propshaft; bundling/transpilation is a separate concern.

**Detailed explanation**

Older Sprockets applications often combine concatenation, preprocessing and minification in the pipeline. Propshaft focuses on digesting and serving ready-to-use assets; use jsbundling-rails/cssbundling-rails or another appropriate build tool when required. importmap-rails loads browser ES modules without a Node build. Webpacker is a legacy integration, not the default recommendation for a new application.

**Practical example**

```bash
RAILS_ENV=production bin/rails assets:precompile
# Reference a fingerprinted asset through a helper:
<%= image_tag "logo.png" %>
```

**Important points and follow-ups**

- Do not assume Sprockets, CoffeeScript, Webpacker, or automatic JS minification is present in every Rails version.
- Reference: https://guides.rubyonrails.org/asset_pipeline.html

**Source references**

- SRC-01232 — [twentyfive.txt:187–193](../ruby/twentyfive.txt) (34) · [complete source](sources/twentyfive.md)


---

<a id="b-0372"></a>

### B-0372 — Describe your experience with different Rails testing frameworks (e.g., RSpec, Minitest) and your preferred testing strategies.

**Difficulty:** Advanced · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

Describe your experience with different Rails testing frameworks (e.g., RSpec, Minitest) and your preferred testing strategies.

**Direct answer**

Use a real example from your work and explain the context, your responsibility, the concrete technical decision, the observed outcome, and the trade-off. Rails includes Minitest support; RSpec is an alternative test framework. Choose tests that check meaningful behavior at suitable boundaries.

**Detailed explanation**

Use fast unit tests for business rules, request tests for HTTP contracts and authorization, integration tests for collaboration, and a smaller set of system tests for critical browser workflows. Request tests do not by themselves drive a browser. Isolate external services using controlled substitutes and test failure paths.

**Practical example**

```text
test "rejects a missing title" do
  article = Article.new(title: nil)
  assert_not article.valid?
  assert_includes article.errors[:title], "can't be blank"
end
```

**Important points and follow-ups**

- Use your own experience when answering a behavioral interview prompt.
- Reference: https://guides.rubyonrails.org/testing.html
- A truthful project answer should include what you personally did and how the result was measured.

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.
- The source uses a first-person illustrative story. Do not present it as your own experience. Adapt the structure to a genuine project.

**Source references**

- SRC-01524 — [twentyseven.txt:666–670](../ruby/twentyseven.txt) (Open-81) · [complete source](sources/twentyseven.md)


---

<a id="b-0373"></a>

### B-0373 — Explain how Rails handles logging.

**Difficulty:** Advanced · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

Explain how Rails handles logging.

**Direct answer**

Use structured request/error context, logs, traces, metrics and focused debugging to identify the failing operation, then add a regression check.

**Detailed explanation**

Log to the configured destination, often stdout in containers or log/<environment>.log locally. Filter secrets and personal data. Track latency, error rate, queue age, database saturation and resource usage. Use the debug gem or a local console for interactive inspection; do not expose development error consoles publicly. Apache logs live wherever the web server is configured, not at a universal Rails path.

**Practical example**

```ruby
Rails.logger.info(event: "order_created", order_id: order.id, request_id: request.request_id)
# config.filter_parameters += [:password, :token]
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/debugging_rails_applications.html

**Source references**

- SRC-00846 — [thirtyfive.txt:254–259](../ruby/thirtyfive.txt) (06) · [complete source](sources/thirtyfive.md)


---

<a id="b-0374"></a>

### B-0374 — Explain what functional testing is:

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

Explain what functional testing is:

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Corrections and source limitations**

- A referenced screenshot or image is missing from the pasted source; the exact original code/output cannot be recovered from this file.

**Source references**

- SRC-01189 — [twentyeight.txt:340–347](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0375"></a>

### B-0375 — How do you mock external APIs in tests?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

How do you mock external APIs in tests?

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Source references**

- SRC-01330 — [twentysix.txt:62–64](../ruby/twentysix.txt) (16) · [complete source](sources/twentysix.md)


---

<a id="b-0376"></a>

### B-0376 — How do you test a Rails application with integration tests, and what tools would you use?

**Difficulty:** Advanced · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

How do you test a Rails application with integration tests, and what tools would you use?

**Direct answer**

A unit test checks a focused behavior with assertions comparing actual and expected outcomes; a Rails suite combines unit/model, request/integration and browser/system tests.

**Detailed explanation**

Use Minitest or RSpec consistently and choose a test boundary based on the behavior. A unit need not be exactly one method, and tests should cover observable behavior rather than copy implementation details. Keep external effects controlled and scenario data explicit.

**Practical example**

```ruby
require "minitest/autorun"
class PriceTest < Minitest::Test
  def test_total
    assert_equal 6, [1, 2, 3].sum
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00955 — [thirtyfour.txt:126–126](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0377"></a>

### B-0377 — How do you test models in Rails?

**Difficulty:** Intermediate · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

How do you test models in Rails?

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00908 — [thirtyfour.txt:78–78](../ruby/thirtyfour.txt) · [complete source](sources/thirtyfour.md)


---

<a id="b-0378"></a>

### B-0378 — How do you write tests in Ruby with RSpec or Minitest?

**Difficulty:** Intermediate · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

How do you write tests in Ruby with RSpec or Minitest?

**Direct answer**

RSpec and Minitest are Ruby test frameworks. Rails integrates Minitest by default; RSpec is an optional dependency, commonly integrated through rspec-rails.

**Detailed explanation**

Write examples around observable behavior and important failures, and use appropriate unit, request, integration and system tests. Isolate nondeterministic dependencies such as network calls and time while preserving meaningful database integration checks. RSpec describe/context group behavior and expect expresses outcomes; Minitest uses assertions or its spec interface.

**Practical example**

```text
RSpec.describe "integer addition" do
  it "adds values" do
    expect(2 + 3).to eq(5)
  end
end
```

**Important points and follow-ups**

- RSpec is not a built-in part of Rails.
- Distribution of Minitest as a bundled gem depends on Ruby version; declare test dependencies explicitly.

**Source references**

- SRC-00540 — [nineteen.txt:722–740](../ruby/nineteen.txt) (39) · [complete source](sources/nineteen.md)


---

<a id="b-0379"></a>

### B-0379 — How does Rails support testing, and what testing frameworks are commonly used?

**Difficulty:** Intermediate · **Topic:** Testing, debugging and observability · **Source occurrences:** 3

**Interview question**

How does Rails support testing, and what testing frameworks are commonly used?

**Direct answer**

RSpec and Minitest are Ruby test frameworks. Rails integrates Minitest by default; RSpec is an optional dependency, commonly integrated through rspec-rails.

**Detailed explanation**

Write examples around observable behavior and important failures, and use appropriate unit, request, integration and system tests. Isolate nondeterministic dependencies such as network calls and time while preserving meaningful database integration checks. RSpec describe/context group behavior and expect expresses outcomes; Minitest uses assertions or its spec interface.

**Practical example**

```text
RSpec.describe "integer addition" do
  it "adds values" do
    expect(2 + 3).to eq(5)
  end
end
```

**Important points and follow-ups**

- RSpec is not a built-in part of Rails.
- Distribution of Minitest as a bundled gem depends on Ruby version; declare test dependencies explicitly.
- Reference: https://guides.rubyonrails.org/testing.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00419 — [ten.txt:315–320](../ruby/ten.txt) (48) · [complete source](sources/ten.md)
- SRC-00659 — [fifteen.txt:103–103](../ruby/fifteen.txt) · [complete source](sources/fifteen.md)
- SRC-01127 — [twenty.txt:226–238](../ruby/twenty.txt) (29) · [complete source](sources/twenty.md)

<details>
<summary>Distinct wording or additional reviewed detail — SRC-00659 (fifteen.txt)</summary>

**Original prompt:** How do you write tests in Rails applications?

**Answer:** Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

</details>

<details>
<summary>Distinct wording or additional reviewed detail — SRC-01127 (twenty.txt)</summary>

**Original prompt:** How do you test a Rails app?

**Answer:** A unit test checks a focused behavior with assertions comparing actual and expected outcomes; a Rails suite combines unit/model, request/integration and browser/system tests.

Use Minitest or RSpec consistently and choose a test boundary based on the behavior. A unit need not be exactly one method, and tests should cover observable behavior rather than copy implementation details. Keep external effects controlled and scenario data explicit.

```ruby
require "minitest/autorun"
class PriceTest < Minitest::Test
  def test_total
    assert_equal 6, [1, 2, 3].sum
  end
end
```

</details>


---

<a id="b-0380"></a>

### B-0380 — Mention the log that has to be seen to report errors in Ruby Rails?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

Mention the log that has to be seen to report errors in Ruby Rails?

**Direct answer**

Use structured request/error context, logs, traces, metrics and focused debugging to identify the failing operation, then add a regression check.

**Detailed explanation**

Log to the configured destination, often stdout in containers or log/<environment>.log locally. Filter secrets and personal data. Track latency, error rate, queue age, database saturation and resource usage. Use the debug gem or a local console for interactive inspection; do not expose development error consoles publicly. Apache logs live wherever the web server is configured, not at a universal Rails path.

**Practical example**

```ruby
Rails.logger.info(event: "order_created", order_id: order.id, request_id: request.request_id)
# config.filter_parameters += [:password, :token]
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/debugging_rails_applications.html

**Source references**

- SRC-00703 — [thirty.txt:80–82](../ruby/thirty.txt) (19) · [complete source](sources/thirty.md)


---

<a id="b-0381"></a>

### B-0381 — What are fixtures in Ruby on Rails?

**Difficulty:** Intermediate · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What are fixtures in Ruby on Rails?

**Direct answer**

A test harness runs tests and reports results; fixtures supply reproducible test data, commonly from YAML in Rails.

**Detailed explanation**

Fixtures and factories are alternative ways of preparing model state. Keep data small and relevant, avoid order-dependent shared state, and make important scenario setup visible. A fixture is not simply every kind of supporting test code.

**Practical example**

```ruby
# test/fixtures/users.yml
ada:
  name: Ada
# In a Rails test:
user = users(:ada)
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00772 — [thirtyeight.txt:138–139](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0382"></a>

### B-0382 — What are some best practices for writing Rails tests?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What are some best practices for writing Rails tests?

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Source references**

- SRC-01226 — [twentyfive.txt:141–149](../ruby/twentyfive.txt) (28) · [complete source](sources/twentyfive.md)


---

<a id="b-0383"></a>

### B-0383 — What are the differences between unit, functional, and integration tests in Rails?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What are the differences between unit, functional, and integration tests in Rails?

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Source references**

- SRC-01328 — [twentysix.txt:56–58](../ruby/twentysix.txt) (14) · [complete source](sources/twentysix.md)


---

<a id="b-0384"></a>

### B-0384 — What is testing in the context of Ruby on Rails? Why is it important?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What is testing in the context of Ruby on Rails? Why is it important?

**Direct answer**

Rails includes Minitest support; RSpec is an alternative test framework. Choose tests that check meaningful behavior at suitable boundaries.

**Detailed explanation**

Use fast unit tests for business rules, request tests for HTTP contracts and authorization, integration tests for collaboration, and a smaller set of system tests for critical browser workflows. Request tests do not by themselves drive a browser. Isolate external services using controlled substitutes and test failure paths.

**Practical example**

```text
test "rejects a missing title" do
  article = Article.new(title: nil)
  assert_not article.valid?
  assert_includes article.errors[:title], "can't be blank"
end
```

**Important points and follow-ups**

- Use your own experience when answering a behavioral interview prompt.
- Reference: https://guides.rubyonrails.org/testing.html

**Corrections and source limitations**

- Source explanation was expanded or corrected; use the interview answer above rather than copying the original passage.

**Source references**

- SRC-01496 — [twentyseven.txt:429–439](../ruby/twentyseven.txt) (Open-53) · [complete source](sources/twentyseven.md)


---

<a id="b-0385"></a>

### B-0385 — What is the logic behind the helper?

**Difficulty:** Advanced · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What is the logic behind the helper?

**Direct answer**

Helpers contain reusable presentation logic called from views, such as formatting a date or building a small HTML fragment.

**Detailed explanation**

Place domain rules and database access in domain/model/service code. Return safe HTML only when it is constructed or escaped correctly. Avoid marking user input html_safe. Helper modules belong in app/helpers and can be exposed to views by Rails.

**Practical example**

```ruby
module ApplicationHelper
  def display_date(date)
    date ? l(date, format: :long) : "—"
  end
end
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Source references**

- SRC-01047 — [thirtyseven.txt:179–185](../ruby/thirtyseven.txt) · [complete source](sources/thirtyseven.md)


---

<a id="b-0386"></a>

### B-0386 — What is the RSpec framework and how do you use it for testing?

**Difficulty:** Intermediate · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What is the RSpec framework and how do you use it for testing?

**Direct answer**

RSpec and Minitest are Ruby test frameworks. Rails integrates Minitest by default; RSpec is an optional dependency, commonly integrated through rspec-rails.

**Detailed explanation**

Write examples around observable behavior and important failures, and use appropriate unit, request, integration and system tests. Isolate nondeterministic dependencies such as network calls and time while preserving meaningful database integration checks. RSpec describe/context group behavior and expect expresses outcomes; Minitest uses assertions or its spec interface.

**Practical example**

```text
RSpec.describe "integer addition" do
  it "adds values" do
    expect(2 + 3).to eq(5)
  end
end
```

**Important points and follow-ups**

- RSpec is not a built-in part of Rails.
- Distribution of Minitest as a bundled gem depends on Ruby version; declare test dependencies explicitly.

**Source references**

- SRC-00268 — [eight.txt:294–302](../ruby/eight.txt) (Expert-07) · [complete source](sources/eight.md)


---

<a id="b-0387"></a>

### B-0387 — What testing libraries have you used with Rails (e.g., RSpec, Capybara, FactoryBot)?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What testing libraries have you used with Rails (e.g., RSpec, Capybara, FactoryBot)?

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Source references**

- SRC-01329 — [twentysix.txt:59–61](../ruby/twentysix.txt) (15) · [complete source](sources/twentysix.md)


---

<a id="b-0388"></a>

### B-0388 — What’s your favorite testing tool? Rspec, FactoryGirl, Capybara, and Cucumber.

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What’s your favorite testing tool? Rspec, FactoryGirl, Capybara, and Cucumber.

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-01179 — [twentyeight.txt:301–302](../ruby/twentyeight.txt) · [complete source](sources/twentyeight.md)


---

<a id="b-0389"></a>

### B-0389 — What’s your strategy for writing maintainable tests?

**Difficulty:** Beginner · **Topic:** Testing, debugging and observability · **Source occurrences:** 1

**Interview question**

What’s your strategy for writing maintainable tests?

**Direct answer**

Test behavior at the appropriate level: small domain/model tests, request/integration tests for HTTP behavior, and system tests for critical browser flows.

**Detailed explanation**

Rails supports Minitest; RSpec is an optional alternative. Use representative fixtures/factories, keep tests independent, and exercise invalid input, authorization and error paths. Stub external boundaries instead of the method being tested. Test jobs/mailers with supported helpers and simulate retries/failures where relevant. FactoryGirl was renamed FactoryBot.

**Practical example**

```text
test "rejects a blank title" do
  post = Post.new(title: "")
  assert_not post.valid?
  assert_includes post.errors[:title], "can’t be blank"
end
```

**Important points and follow-ups**

- Reference: https://guides.rubyonrails.org/testing.html

**Source references**

- SRC-01332 — [twentysix.txt:68–71](../ruby/twentysix.txt) (18) · [complete source](sources/twentysix.md)


---

<a id="b-0390"></a>

### B-0390 — Explain the differences between nil and false in Ruby on Rails.

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain the differences between nil and false in Ruby on Rails.

**Direct answer**

Ruby is a programming language; Rails is a web framework written in Ruby. Compare Ruby with Python, or Rails with a Python web framework such as Django.

**Detailed explanation**

Rails adds HTTP routing, controllers, rendering, database integration, jobs and application conventions. Ruby also runs scripts and non-web programs. Both Rails and Django can serve large production applications; workload, architecture, team knowledge and measurement determine suitability, rather than universal traffic or learning-curve rankings.

**Practical example**

```text
Ruby: puts "hello"
Rails: bin/rails new shop
Python web framework comparison: Rails versus Django
```

**Important points and follow-ups**

- A framework is not a programming language. Claims that Rails is a combination of Python/Perl or inherently better for heavy traffic are incorrect.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00757 — [thirtyeight.txt:84–85](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0391"></a>

### B-0391 — Explain what a string is in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain what a string is in Ruby on Rails.

**Direct answer**

String is Ruby’s text/byte-sequence class, with an associated encoding and normally mutable contents.

**Detailed explanation**

Single-quoted strings mostly take literal content, while double-quoted strings support interpolation and escapes. Use frozen strings when mutation is not wanted. Length in characters, bytes and user-perceived graphemes can differ for Unicode text.

**Practical example**

```ruby
name = "Ruby"
"Hello #{name}" # "Hello Ruby"
"é".length # 1
"é".bytesize # 2 in UTF-8
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00774 — [thirtyeight.txt:142–143](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0392"></a>

### B-0392 — Explain what a symbol is in Ruby on Rails.

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Explain what a symbol is in Ruby on Rails.

**Direct answer**

A Symbol is an immutable identifier value; a String is a text value that is normally mutable unless frozen.

**Detailed explanation**

Symbols with the same name refer to the same symbol object within the runtime. String identity depends on creation, interning and freezing, so object IDs are not a general type definition. Since Ruby 2.2 many dynamically created symbols can be garbage collected; symbols are not universally permanent memory leaks. Use strings for user content and symbols for a bounded vocabulary of names.

**Practical example**

```text
:name == :name # true
"name" == :name # false
"name".to_sym # :name
:name.to_s # "name"
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The source supplies a prompt without an answer; an independently prepared answer is required.

**Source references**

- SRC-00773 — [thirtyeight.txt:140–141](../ruby/thirtyeight.txt) · [complete source](sources/thirtyeight.md)


---

<a id="b-0393"></a>

### B-0393 — What are some common data types you might use in a Rails model (e.g., string, integer)?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What are some common data types you might use in a Rails model (e.g., string, integer)?

**Direct answer**

Common data types used in Rails models, which map to database column types, include:

**Detailed explanation**

Common data types used in Rails models, which map to database column types, include:

string: For text, like names or titles.
text: For longer text content, such as descriptions.
integer: For whole numbers, like IDs or quantities.
float/decimal: For numbers with decimal points, such as prices or measurements. decimal provides greater precision.
boolean: For true/false values.
date: For dates without time.
datetime/timestamp: For dates and times. timestamp provides better cross-database compatibility.
binary: For storing binary data, like images.
references: Used to create foreign key relationships between tables (e.g., references :user).

**Practical example**

```text
Common data types used in Rails models, which map to database column types, include:

string: For text, like names or titles.
text: For longer text content, such as descriptions.
integer: For whole numbers, like IDs or quantities.
float/decimal: For numbers with decimal points, such as prices or measurements. decimal provides greater precision.
boolean: For true/false values.
date: For dates without time.
datetime/timestamp: For dates and times. timestamp provides better cross-database compatibility.
binary: For storing binary data, like images.
references: Used to create foreign key relationships between tables (e.g., references :user).
```

**Important points and follow-ups**

- JSON is not PostgreSQL-only; adapters including MySQL and SQLite offer differing JSON support. References default key size and foreign-key creation depend on explicit options and Rails configuration.

**Source references**

- SRC-01494 — [twentyseven.txt:411–422](../ruby/twentyseven.txt) (Open-51) · [complete source](sources/twentyseven.md)


---

<a id="b-0394"></a>

### B-0394 — What is the difference between nil?, empty?, and blank? in Ruby/Rails?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between nil?, empty?, and blank? in Ruby/Rails?

**Direct answer**

nil? checks identity with nil, empty? is defined by collection-like types, and Active Support blank? combines false/nil, emptiness and whitespace semantics.

**Detailed explanation**

nil? checks identity with nil, empty? is defined by collection-like types, and Active Support blank? combines false/nil, emptiness and whitespace semantics. nil.empty? raises NoMethodError. blank? can be loaded outside Rails. false.blank? is true, so presence validation is not a boolean-true/false inclusion check.

**Practical example**

```ruby
require "active_support/core_ext/object/blank"
p [" ".nil?, " ".empty?, " ".blank?] # [false,false,true]
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Original example mixes code with prose/tables and sometimes escaped quotes; use the separate corrected example.
- nil.empty? raises NoMethodError. blank? can be loaded outside Rails. false.blank? is true, so presence validation is not a boolean-true/false inclusion check.

**Source references**

- SRC-00189 — [six.txt:1225–1315](../ruby/six.txt) (Q13) · [complete source](sources/six.md)


---

<a id="b-0395"></a>

### B-0395 — What is the difference between string and text in Rails?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What is the difference between string and text in Rails?

**Direct answer**

string and text are schema types that normally map to a length-limited character column and a larger text column; exact storage/limits depend on the database and migration options.

**Detailed explanation**

The Ruby value of either is usually a String. A typical Rails string default uses a length such as 255, but text has no universal 30,000-character limit. Check database adapter behavior, indexes and business-level length validation instead of assuming a cross-database maximum.

**Practical example**

```ruby
t.string :title, limit: 200
t.text :body
# Model policy:
validates :title, length: { maximum: 200 }
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- Corrected obsolete or database-dependent limitation claims; modern Rails supports foreign keys/multiple databases and text has no universal 30,000-character cap.

**Source references**

- SRC-01366 — [twentytwo.txt:273–275](../ruby/twentytwo.txt) (3) · [complete source](sources/twentytwo.md)


---

<a id="b-0396"></a>

### B-0396 — What values are "falsey" in Rails?  Or, which values are "truthy"?  What is the result of `a = 0 || 1`?

**Difficulty:** Beginner · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

What values are "falsey" in Rails?  Or, which values are "truthy"?  What is the result of `a = 0 || 1`?

**Direct answer**

Ruby conditionals treat only nil and false as falsey, including in Rails. Therefore a = 0 || 1 assigns and evaluates to 0.

**Detailed explanation**

Ruby conditionals treat only nil and false as falsey, including in Rails. Therefore a = 0 || 1 assigns and evaluates to 0. Rails blank? is a separate predicate: empty/whitespace values can be truthy while blank? is true.

**Practical example**

```ruby
a = 0 || 1
p a # 0
```

**Important points and follow-ups**

- Rails blank? is a separate predicate: empty/whitespace values can be truthy while blank? is true.

**Source references**

- SRC-00170 — [five.txt:45–51](../ruby/five.txt) · [complete source](sources/five.md)


---

<a id="b-0397"></a>

### B-0397 — Which of the following validators in a Rails model ensures that a specified attribute is not empty, meaning it is neither nil nor a blank string?

**Difficulty:** Intermediate · **Topic:** Values, collections and language basics · **Source occurrences:** 1

**Interview question**

Which of the following validators in a Rails model ensures that a specified attribute is not empty, meaning it is neither nil nor a blank string?

**Direct answer**

Option 2: presence

**Detailed explanation**

The correct choice is presence The other choices describe different Rails components or reverse the behavior being asked about.

**Practical example**

```text
Decision example: presence
```

**Important points and follow-ups**

- Explain the assumptions and observable behavior in the supplied example.

**Corrections and source limitations**

- The pasted MCQ contains options but no answer key; this key is an independently derived answer.

**Source references**

- SRC-01551 — [twentyseven.txt:894–905](../ruby/twentyseven.txt) (MCQ-3) · [complete source](sources/twentyseven.md)

