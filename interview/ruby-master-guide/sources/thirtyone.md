# Source ledger: thirtyone.txt

SHA-256: `ef9779de38bc7dc0201ac173033576aadbe32131dc9023319d798159790cc19f`

869 physical lines; 31 extracted question/concept occurrences. The complete source is retained below, including original inaccuracies, missing-answer markers and website boilerplate. This is evidence, not the corrected study answer.

| Occurrence | Original lines | Final question | Original prompt |
|---|---:|---|---|
| SRC-00992 | 19–39 | [B-0327](../B-rails.md#b-0327) | Import GraphQL data, model it in Rails, and expose RESTful CRUD endpoints |
| SRC-00993 | 40–50 | [B-0102](../B-rails.md#b-0102) | Explain the Model-View-Controller (MVC) architectural pattern in the context of Ruby on Rails. |
| SRC-00994 | 51–76 | [B-0251](../B-rails.md#b-0251) | The following Ruby on Rails code is intended to define a simple controller action to retrieve and display a list of products from the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.  class ProductsController < ApplicationController   def index     @products = Product.all   end end Code language: JavaScript (javascript) |
| SRC-00995 | 77–90 | [B-0269](../B-rails.md#b-0269) | Explain the concept of migrations in Ruby on Rails and why they are essential for database management. |
| SRC-00996 | 91–118 | [B-0248](../B-rails.md#b-0248) | The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code.  <%= form_tag products_path do %>   <%= label_tag :name, "Product Name" %>   <%= text_field_tag :name %>    <%= label_tag :price, "Price" %>   <%= text_field_tag :price %>    <%= submit_tag "Add Product" %> <%= end_form_tag %> Code language: HTML, XML (xml) |
| SRC-00997 | 119–140 | [B-0305](../B-rails.md#b-0305) | Explain the concept of RESTful routes in Ruby on Rails and why they are considered best practices for web applications. |
| SRC-00998 | 141–164 | [B-0250](../B-rails.md#b-0250) | The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.  class Product < ApplicationRecord   belongs_to :category end  class Category < ApplicationRecord   has_many :products end Code language: CSS (css) |
| SRC-00999 | 165–178 | [B-0351](../B-rails.md#b-0351) | Explain the concept of asset pipeline in Ruby on Rails and its significance in web development. |
| SRC-01000 | 179–194 | [B-0221](../B-rails.md#b-0221) | The following Ruby on Rails code is intended to define a validation for the name attribute in the Product model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.  class Product < ApplicationRecord   validates name, presence: true, length: { minimum: 3, maximum: 50 } end Code language: CSS (css) |
| SRC-01001 | 195–208 | [B-0348](../B-rails.md#b-0348) | Explain the concept of partials in Ruby on Rails views and their benefits in web development. |
| SRC-01002 | 209–243 | [E-0030](../E-scenarios.md#e-0030) | The following Ruby on Rails code is intended to define a migration to create a products table with attributes name and price. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.  class CreateProducts < ActiveRecord::Migration[6.1]   def up     create_table :products do \|t       t.string :name       t.decimal :price, precision: 10, scale: 2       t.timestamps     end   end    def down     drop_table :products   end end |
| SRC-01003 | 244–254 | [B-0102](../B-rails.md#b-0102) | Explain the concept of MVC architecture in the context of Ruby on Rails. |
| SRC-01004 | 255–286 | [B-0254](../B-rails.md#b-0254) | The following Ruby on Rails code is intended to fetch a list of articles from the database and display their titles. However, it contains a logical error and doesn’t display any articles. Identify the error and fix the code.  # Controller class ArticlesController < ApplicationController   def index     @articles = Article.all   end end  # View (index.html.erb) <% @articles.each do \|article\| %>   <p><%= article.title %></p> <% end %> Code language: CSS (css) |
| SRC-01005 | 287–300 | [B-0235](../B-rails.md#b-0235) | Explain what ActiveRecord is in Ruby on Rails and how it simplifies database interactions. |
| SRC-01006 | 301–360 | [B-0249](../B-rails.md#b-0249) | The following Ruby on Rails code is intended to create a new article record and save it to the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.  # Controller class ArticlesController < ApplicationController   def create     @article = Article.new(params[:article])     if @article.save       redirect_to articles_path     else       render 'new'     end   end end  # View (new.html.erb) <%= form_for @article do \|f\| %>   <%= f.label :title %>   <%= f.text_field :title %>    <%= f.label :content %>   <%= f.text_area :content %>    <%= f.submit 'Create Article' %> <% end %> Code language: CSS (css) |
| SRC-01007 | 361–384 | [B-0305](../B-rails.md#b-0305) | Explain the concept of RESTful routing in Ruby on Rails. |
| SRC-01008 | 385–444 | [B-0255](../B-rails.md#b-0255) | The following Ruby on Rails code is intended to update an existing article’s title and content in the database. However, it contains a logical error and doesn’t update the article as expected. Identify the error and fix the code.  # Controller class ArticlesController < ApplicationController   def update     @article = Article.find(params[:id])     if @article.update(params[:article])       redirect_to article_path(@article)     else       render 'edit'     end   end end  # View (edit.html.erb) <%= form_for @article do \|f\| %>   <%= f.label :title %>   <%= f.text_field :title %>    <%= f.label :content %>   <%= f.text_area :content %>    <%= f.submit 'Update Article' %> <% end %> Code language: CSS (css) |
| SRC-01009 | 445–464 | [B-0117](../B-rails.md#b-0117) | Explain the concept of ActiveRecord callbacks in Ruby on Rails. |
| SRC-01010 | 465–502 | [B-0252](../B-rails.md#b-0252) | The following Ruby on Rails code is intended to delete an article record from the database when the user clicks the “Delete” link. However, it contains a logical error and doesn’t delete the article. Identify the error and fix the code.  # Controller class ArticlesController < ApplicationController   def destroy     @article = Article.find(params[:id])     if @article.destroy       redirect_to articles_path     else       flash[:error] = 'Failed to delete the article.'       redirect_to article_path(@article)     end   end end  # View (show.html.erb) <%= link_to 'Delete', article_path(@article), method: :delete, data: { confirm: 'Are you sure?' } %> |
| SRC-01011 | 503–532 | [B-0016](../B-rails.md#b-0016) | Explain the concept of eager loading in Ruby on Rails and why it is beneficial. |
| SRC-01012 | 533–585 | [B-0253](../B-rails.md#b-0253) | The following Ruby on Rails code is intended to display a list of articles and their corresponding authors on the index page. However, it contains a logical error and doesn’t display the authors correctly. Identify the error  and fix the code.  # Models class Article < ApplicationRecord   belongs_to :author end  class Author < ApplicationRecord   has_many :articles end  # Controller class ArticlesController < ApplicationController   def index     @articles = Article.all   end end  # View (index.html.erb) <% @articles.each do \|article\| %>   <p><%= article.title %> - <%= article.author.name %></p> <% end %> Code language: CSS (css) |
| SRC-01013 | 586–596 | [B-0102](../B-rails.md#b-0102) | Explain the Model-View-Controller (MVC) architectural pattern used in Ruby on Rails. How does it contribute to the development of web applications? |
| SRC-01014 | 597–610 | [B-0238](../B-rails.md#b-0238) | How does Rails handle database migrations, and why is it important for the development process? |
| SRC-01015 | 611–626 | [B-0234](../B-rails.md#b-0234) | Explain the purpose of Active Record in Ruby on Rails and how it simplifies database interactions. |
| SRC-01016 | 627–639 | [B-0184](../B-rails.md#b-0184) | How does Rails handle user authentication and authorization? Provide an overview of commonly used gems or techniques for implementing these functionalities. |
| SRC-01017 | 640–653 | [B-0305](../B-rails.md#b-0305) | Explain the concept of RESTful routing in Ruby on Rails. How does it help in building web applications? |
| SRC-01018 | 654–709 | [B-0117](../B-rails.md#b-0117) | Explain the concept of Rails callbacks and provide examples of where they can be used in real-world applications. |
| SRC-01019 | 710–730 | [E-0039](../E-scenarios.md#e-0039) | Explain the concept of caching in Ruby on Rails. How can caching improve the performance of web applications? |
| SRC-01020 | 731–748 | [B-0351](../B-rails.md#b-0351) | Explain the concept of asset pipeline in Ruby on Rails and how it optimizes the delivery of assets in web applications. |
| SRC-01021 | 749–785 | [B-0197](../B-rails.md#b-0197) | Explain the concept of Action Cable in Ruby on Rails and how it facilitates real-time features in web applications. |
| SRC-01022 | 786–823 | [B-0170](../B-rails.md#b-0170) | Explain how Rails manages sessions and cookies. How can developers use sessions for user authentication? |

## Complete original text

```text
Ruby on Rails
Rails is a Ruby-based back-end framework known for its emphasis on promoting code reusability (the Don’t Repeat Yourself principle), vast Rapid Application Development tool library, and Model-View-Controller (MVC) pattern support.

Rails follows the software design principle “convention over configuration,” which means that it provides a set of conventions and sensible defaults to minimize the amount of configuration developers need to do. This approach helps reduce boilerplate code, speeds up development, and promotes best practices.

https://rubyonrails.org/doctrine/
In order to assess the proficiency of developers in Rails during programming interviews, we provide a collection of practical coding tasks and interview queries. Moreover, we’ve devised a series of recommended approaches to guarantee that your interview questions effectively gauge the candidates’ Rails abilities.

Table of Contents
Rails example question
Junior Ruby on Rails interview questions
Intermediate Ruby on Rails interview questions
Senior Ruby on Rails interview questions
Interview best practices for Rails roles
Rails example question
Create a Rails CRUD API
The goal of this exercise is to retrieve data from an external source, store it in an appropriate database structure, and create a CRUD RESTful API to interface with the database

Goals
1. Read the data from this graphql endpoint: https://swapi-graphql.netlify.app/.netlify/functions/index with the following query:

query Query {allPlanets{planets{name population terrains climates}}}

(View the shape of the data here.)

2. Store the data from the graphql endpoint into the database and create appropriate models

3. Write RESTful Create, Read, Update, and Delete endpoints to interact with the database


Rails skills to assess
MVC architecture
Database management
Performance optimization
Jobs using Rails
Backend engineer
Rails developer
Full-stack developer
Junior Ruby on Rails interview questions
Question:
Explain the Model-View-Controller (MVC) architectural pattern in the context of Ruby on Rails.

Answer:
The Model-View-Controller (MVC) architectural pattern is a design pattern commonly used in web development, including Ruby on Rails. It aims to separate the application’s concerns into three main components:

Model: Represents the data and business logic of the application. It interacts with the database and defines the rules for data manipulation and validation.
View: Represents the user interface and presentation layer of the application. It displays the data to the users and receives their input.
Controller: Acts as an intermediary between the Model and the View. It handles user requests, processes data from the Model, and updates the View accordingly.
In Ruby on Rails, the MVC pattern is central to the framework’s structure. Models are defined using Ruby classes, Views are created using HTML with embedded Ruby code (ERB), and Controllers are Ruby classes that handle the application’s logic.

Question:
The following Ruby on Rails code is intended to define a simple controller action to retrieve and display a list of products from the database. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.

class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
end
Code language: JavaScript (javascript)
Answer:
The code provided is mostly correct. However, it lacks the definition of the Product model. The correct code should include the model definition as follows:

class ProductsController < ApplicationController
  def index
    @products = Product.all
  end
end
Code language: JavaScript (javascript)
Here, the Product model should be defined separately in a file named product.rb in the app/models directory, typically with the following content:

class Product < ApplicationRecord
  # Model logic and validations go here
end
Code language: JavaScript (javascript)
With the correct model definition in place, the controller action index will work as expected to retrieve all products from the database.

Question:
Explain the concept of migrations in Ruby on Rails and why they are essential for database management.

Answer:
Migrations in Ruby on Rails are a way to manage and version the database schema. They are Ruby scripts that make it easy to modify the database structure over time. Migrations allow developers to define changes to the database, such as creating or altering tables, adding or removing columns, or defining indexes, in a structured and organized manner.

Migrations are essential for database management because they provide the following benefits:

Version Control: Migrations act as a version control system for the database schema, enabling collaboration among developers and keeping track of changes.
Easy Rollback: Migrations support rolling back changes, allowing developers to revert to previous database states in case of issues.
Reproducible Setup: By using migrations, setting up and configuring the database for new deployments or for other developers becomes straightforward.
Team Collaboration: Migrations enable teams to work simultaneously on the database schema without conflicts.
Overall, migrations provide a consistent and organized approach to managing the database structure in Ruby on Rails applications.

Question:
The following Ruby on Rails code is intended to create a form for adding a new product to the database. However, it contains a logical error and doesn’t work correctly. Identify the error and fix the code.

<%= form_tag products_path do %>
  <%= label_tag :name, "Product Name" %>
  <%= text_field_tag :name %>

  <%= label_tag :price, "Price" %>
  <%= text_field_tag :price %>

  <%= submit_tag "Add Product" %>
<%= end_form_tag %>
Code language: HTML, XML (xml)
Answer:
The code provided contains a syntax error. The correct code should use the form_for helper instead of form_tag. Also, the end_form_tag should be replaced with end.

<%= form_for :product, url: products_path do |f| %>
  <%= f.label :name, "Product Name" %>
  <%= f.text_field :name %>

  <%= f.label :price, "Price" %>
  <%= f.text_field :price %>

  <%= f.submit "Add Product" %>
<% end %>
Code language: HTML, XML (xml)
In this corrected code, the form_for helper is used to create a form for the Product model. The f object within the block represents the form builder and allows you to create form fields for the model attributes.

Question:

Explain the concept of RESTful routes in Ruby on Rails and why they are considered best practices for web applications.

Answer:
RESTful routes in Ruby on Rails are a set of conventions that define the routes and actions for resources in a web application. REST (Representational State Transfer) is an architectural style for designing networked applications, and it is based on a set of principles that allow for scalability, maintainability, and simplicity.

RESTful routes follow a naming convention for CRUD (Create, Read, Update, Delete) operations on resources. For example:

GET /products: Retrieve a list of products.
GET /products/:id: Retrieve a specific product.
POST /products: Create a new product.
PATCH /products/:id: Update a specific product.
DELETE /products/:id: Delete a specific product.
RESTful routes are considered best practices for web applications for several reasons:

Predictable and Intuitive: RESTful routes follow a consistent naming convention that makes it easy to understand the actions and URLs associated with resources.
Scalability: RESTful routes enable the development of scalable applications by organizing resources in a structured manner.
Modularity: By adhering to RESTful conventions, web applications become more modular and easier to maintain, as resources are clearly defined.
Interoperability: RESTful routes adhere to standard HTTP methods and status codes, making it easier for different services and clients to interact with the application.
Overall, RESTful routes promote clean and organized code, simplifying the development and maintenance of Ruby on Rails applications.

Question:
The following Ruby on Rails code is intended to define a one-to-many association between the Product model and the Category model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.

class Product < ApplicationRecord
  belongs_to :category
end

class Category < ApplicationRecord
  has_many :products
end
Code language: CSS (css)
Answer:
The code provided is mostly correct. However, the belongs_to association in the Product model should include the optional: true option to make it an optional association, as not all products may belong to a specific category.

class Product < ApplicationRecord
  belongs_to :category, optional: true
end

class Category < ApplicationRecord
  has_many :products
end
Code language: CSS (css)
With this correction, the belongs_to association becomes optional, allowing a Product to exist without belonging to a specific Category.

Question:
Explain the concept of asset pipeline in Ruby on Rails and its significance in web development.

Answer:
The asset pipeline in Ruby on Rails is a feature that helps manage and optimize the assets (e.g., stylesheets, JavaScript files, images) of a web application. It aims to improve the application’s performance and speed up page load times by handling asset organization, compilation, and caching.

The significance of the asset pipeline in web development includes:

Asset Organization: The asset pipeline provides a structured way to organize various assets used in the application. It helps keep assets separate from application code, making the codebase cleaner and more maintainable.
Asset Compilation: The asset pipeline automatically compiles and minifies assets, reducing their size and optimizing their delivery to the client. This leads to faster page loads and a better user experience.
Asset Versioning: The asset pipeline includes mechanisms for versioning assets, ensuring that users always receive the latest version. This helps prevent caching issues and ensures that users see the latest changes to styles and scripts.
Preprocessing: The asset pipeline supports asset preprocessing using languages like Sass for stylesheets and CoffeeScript for JavaScript, allowing developers to write cleaner and more maintainable code.
Overall, the asset pipeline is a crucial feature of Ruby on Rails, significantly improving the performance and maintainability of web applications.

Question:
The following Ruby on Rails code is intended to define a validation for the name attribute in the Product model. However, it contains a logical error and doesn’t work as expected. Identify the error and fix the code.

class Product < ApplicationRecord
  validates name, presence: true, length: { minimum: 3, maximum: 50 }
end
Code language: CSS (css)
Answer:
The code provided contains a syntax error in the validates method. The correct code should use symbols for attribute names.

class Product < ApplicationRecord
  validates :name, presence: true, length: { minimum: 3, maximum: 50 }
end
Code language: CSS (css)
In this corrected code, the validates method takes the attribute name :name as a symbol, enabling the definition of the required validation rules for the name attribute.

Question:
Explain the concept of partials in Ruby on Rails views and their benefits in web development.

Answer:
Partials in Ruby on Rails are reusable view components that allow developers to extract common sections of a view into separate files. They help promote code reusability and reduce duplication in the views.

Benefits of using partials in web development include:

Code Reusability: Partials enable the reuse of common UI components across multiple views. For instance, a product card layout can be extracted into a partial and used in different pages that display products.
Simplified Maintenance: By abstracting common sections into partials, any changes or updates need to be made in a single place, simplifying maintenance and reducing the chance of errors.
Readability: Partials improve the readability of views by reducing the clutter of repetitive code and allowing developers to focus on the specific logic of each view.
Enhanced Collaboration: With partials, front-end and back-end developers can work more independently, focusing on their respective areas without interfering with each other’s code.
Overall, partials enhance the modularity and maintainability of Ruby on Rails views, making it easier to build and maintain web applications.

Question:
The following Ruby on Rails code is intended to define a migration to create a products table with attributes name and price. However, it contains a syntax error and doesn’t work as expected. Identify the error and fix the code.

class CreateProducts < ActiveRecord::Migration[6.1]
  def up
    create_table :products do |t
      t.string :name
      t.decimal :price, precision: 10, scale: 2
      t.timestamps
    end
  end

  def down
    drop_table :products
  end
end
Answer:
The code provided contains a syntax error in the create_table block. The t parameter in the create_table block should be followed by a pipe (|) character instead of an opening curly brace ({).

class CreateProducts < ActiveRecord::Migration[6.1]
  def up
    create_table :products do |t|
      t.string :name
      t.decimal :price, precision: 10, scale: 2
      t.timestamps
    end
  end

  def down
    drop_table :products
  end
end
In this corrected code, the create_table block correctly uses the pipe (|) character to define the table columns. The migration will now create a products table with the name and price attributes.

Intermediate Ruby on Rails interview questions
Question:
Explain the concept of MVC architecture in the context of Ruby on Rails.

Answer:
MVC (Model-View-Controller) is an architectural pattern widely used in Ruby on Rails and many other web frameworks. It promotes the separation of concerns by dividing the application into three main components:

Model: The Model represents the data and business logic of the application. It interacts with the database to fetch and store data, performs validations, and encapsulates the behavior of the application. In Ruby on Rails, models are typically implemented as Ruby classes that inherit from ActiveRecord::Base.
View: The View is responsible for presenting the data to the user. It generates the user interface and displays the information received from the Controller. Views in Ruby on Rails are implemented using Embedded Ruby (ERB) templates, which combine HTML with embedded Ruby code to render dynamic content.
Controller: The Controller acts as an intermediary between the Model and the View. It receives user requests, processes them, interacts with the Model to retrieve or update data, and then renders the appropriate View. Controllers in Ruby on Rails are Ruby classes that inherit from ApplicationController.
The MVC architecture in Ruby on Rails promotes maintainability, reusability, and flexibility in web application development by enforcing a clear separation of responsibilities between different components.

Question:
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
Answer:
The logical error in the code is that the article.title attribute is not being displayed correctly. The correct code is as follows:

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
In this corrected code, the article.title attribute is correctly displayed using the <%= %> tags in the ERB template.

Question:
Explain what ActiveRecord is in Ruby on Rails and how it simplifies database interactions.

Answer:
ActiveRecord is the Object-Relational Mapping (ORM) layer in Ruby on Rails. It provides a set of tools and conventions that simplify database interactions by mapping database tables to Ruby classes and records to Ruby objects. ActiveRecord abstracts away the SQL code and allows developers to interact with the database using familiar object-oriented techniques, making database operations more intuitive and straightforward.

Key features of ActiveRecord in Ruby on Rails include:

Model Representations: Each database table is represented by a corresponding Ruby class that inherits from ActiveRecord::Base. This class is referred to as the Model, and it encapsulates data access and business logic.
CRUD Operations: ActiveRecord provides methods to perform Create, Read, Update, and Delete (CRUD) operations on the database. For example, creating a new record is done by instantiating a new Model object and calling save, while reading records is done using methods like find, where, and all.
Associations: ActiveRecord allows the definition of associations between different Models, such as one-to-one, one-to-many, and many-to-many relationships. These associations simplify complex queries and provide convenient methods to navigate and retrieve related data.
Validations: ActiveRecord supports validations to ensure data integrity. Developers can define rules for data validation, such as presence, uniqueness, format, and custom validations, which are automatically triggered before saving records to the database.
By leveraging the power of ActiveRecord, Ruby on Rails developers can focus on application logic and easily interact with the database without worrying about low-level SQL operations.

Question:
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
Answer:
The syntax error in the code is that the params[:article] hash is not permitted for mass assignment. The correct code is as follows:

# Controller
class ArticlesController < ApplicationController
  def create
    @article = Article.new(article_params)
    if @article.save
      redirect_to articles_path
    else
      render 'new'
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content)
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
In this corrected code, a private method article_params is defined to explicitly permit only the desired attributes title and content. This ensures that only the permitted attributes can be mass-assigned to the @article object.

Question:
Explain the concept of RESTful routing in Ruby on Rails.

Answer:
RESTful routing in Ruby on Rails is an architectural style that maps HTTP methods and URLs to controller actions and resources. It follows a set of conventions to define the CRUD (Create, Read, Update, Delete) operations on resources, making the application’s API more consistent and predictable.

In RESTful routing, each resource (e.g., articles, users) is represented by a URL, and different HTTP methods are used to perform specific actions on those resources:

GET: Used to retrieve data from the server. In Rails, GET requests typically map to the index and show actions, which display lists of resources and individual resources, respectively.
POST: Used to create new resources on the server. In Rails, POST requests map to the create action, which handles the creation of new resources.
PUT/PATCH: Used to update existing resources on the server. In Rails, PUT and PATCH requests map to the update action, which handles the updating of resources.
DELETE: Used to delete resources from the server. In Rails, DELETE requests map to the destroy action, which handles the deletion of resources.
For example, to perform CRUD operations on articles, the following RESTful routes might be used:

GET     /articles        # index action (display all articles)
GET     /articles/:id   

 # show action (display a specific article)
POST    /articles        # create action (create a new article)
PUT     /articles/:id    # update action (update a specific article)
DELETE  /articles/:id    # destroy action (delete a specific article)
Code language: PHP (php)
By following RESTful routing conventions, Ruby on Rails applications become more organized, maintainable, and scalable.

Question:
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
Answer:
The logical error in the code is that the params[:article] hash is not permitted for mass assignment. The correct code is as follows:

# Controller
class ArticlesController < ApplicationController
  def update
    @article = Article.find(params[:id])
    if @article.update(article_params)
      redirect_to article_path(@article)
    else
      render 'edit'
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :content)
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
In this corrected code, a private method article_params is defined to explicitly permit only the desired attributes title and content. This ensures that only the permitted attributes can be mass-assigned when updating the @article object.

Question:
Explain the concept of ActiveRecord callbacks in Ruby on Rails.

Answer:
ActiveRecord callbacks in Ruby on Rails are methods that are automatically invoked at certain points in the lifecycle of an ActiveRecord object. They provide hooks to execute custom logic before or after certain database operations, such as saving, updating, or deleting records. Callbacks are used to perform additional tasks or modifications to the data during these lifecycle events.

There are various types of ActiveRecord callbacks:

before_validation: Executed before the validation process occurs. Useful for preparing data or performing cleanup operations before validation.
after_validation: Executed after the validation process occurs. Suitable for handling any additional tasks after the validation is complete.
before_save: Executed just before the record is saved to the database. Used to set default values or perform calculations on attributes.
after_save: Executed just after the record is saved to the database. Appropriate for additional actions that depend on the successful saving of the record.
before_create: Executed only before a new record is created and saved to the database.
after_create: Executed only after a new record is created and saved to the database.
before_update: Executed only before an existing record is updated and saved to the database.
after_update: Executed only after an existing record is updated and saved to the database.
before_destroy: Executed just before a record is deleted from the database.
after_destroy: Executed just after a record is deleted from the database.
ActiveRecord callbacks allow developers to encapsulate additional business logic and maintain data consistency throughout the object’s lifecycle.

Question:
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
Answer:
The logical error in the code is that the “Delete” link is not generating a proper HTTP DELETE request. The correct code is as follows:

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
In this corrected code, the method: :delete option is included in the link, indicating that a DELETE request should be generated when the “Delete” link is clicked. This allows the destroy action in the controller to be properly invoked, resulting in the successful deletion of the article.

Question:
Explain the concept of eager loading in Ruby on Rails and why it is beneficial.

Answer:
Eager loading in Ruby on Rails is a technique used to reduce the number of database queries when retrieving associated records. By default, when accessing associations like has_many, has_one, or belongs_to, Rails uses lazy loading. This means that Rails will make separate database queries for each association when they are accessed.

Eager loading allows developers to fetch the associated records along with the main record using a single query, thereby minimizing the number of database queries and improving performance.

For example, consider the following code:

# Models
class Author < ApplicationRecord
  has_many :books
end

class Book < ApplicationRecord
  belongs_to :author
end

# Controller
@authors = Author.all
Code language: CSS (css)
Without eager loading, the above code will generate one query to fetch all authors and then N additional queries to fetch the books associated with each author (N being the number of authors).

With eager loading, the associated books are fetched in a single query using the includes method:

@authors = Author.includes(:books).all
Code language: CSS (css)
Eager loading is beneficial because it reduces the number of queries sent to the database, resulting in faster load times and improved application performance. It is particularly useful when dealing with complex associations or when displaying collections of records with associated data in views.

Question:
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
Answer:
The logical error in the code is that the author association is not being eager-loaded, resulting in a separate query for each article’s author. The correct code is as follows:

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
    @articles = Article.includes(:author).all
  end
end

# View (index.html.erb)
<% @articles.each do |article| %>
  <p><%= article.title %> - <%= article.author.name %></p>
<% end %>
Code language: CSS (css)
In this corrected code, the includes(:author) method is used to eager-load the associated authors when retrieving the articles. This way, the authors’ data is fetched with a single additional query, rather than N additional queries (N being the number of articles), resulting in improved performance.

Senior Ruby on Rails interview questions
Question:
Explain the Model-View-Controller (MVC) architectural pattern used in Ruby on Rails. How does it contribute to the development of web applications?

Answer:
The Model-View-Controller (MVC) architectural pattern is a design pattern commonly used in Ruby on Rails and other web development frameworks. It separates the application into three interconnected components: Model, View, and Controller.

Model: The Model represents the data and business logic of the application. It encapsulates the data, defines database interactions, and includes validation rules. In Ruby on Rails, models are typically implemented as Ruby classes that interact with the database using Object-Relational Mapping (ORM) techniques, such as ActiveRecord.
View: The View is responsible for presenting the data to the user. It defines the user interface and how data is rendered. In Ruby on Rails, views are often written in HTML with embedded Ruby code (ERB) to dynamically display data.
Controller: The Controller handles user requests and acts as an intermediary between the Model and View. It receives incoming requests, processes the data through the Model, and then renders the appropriate View. Controllers are implemented as Ruby classes that define action methods to respond to different HTTP requests.
The MVC pattern promotes a clear separation of concerns, making the codebase more maintainable and scalable. It enables teams to work on different parts of the application independently and fosters code reuse and modularity. By following the convention over configuration principle, Ruby on Rails automatically maps URLs to appropriate controllers and views, streamlining the development process and promoting best practices.

Question:
How does Rails handle database migrations, and why is it important for the development process?

Answer:
In Ruby on Rails, database migrations are used to manage changes to the database schema over time. Migrations are Ruby classes that inherit from the ActiveRecord::Migration class. They allow developers to make changes to the database schema, such as creating or modifying tables, columns, and indexes, and they keep track of the changes in a version control system.

The process of using migrations involves the following steps:

Generate a migration: Developers use the rails generate migration command to create a new migration file with a timestamped name, indicating the changes to be made.
Define the migration: Inside the migration file, developers use Rails-provided methods (e.g., create_table, add_column, remove_column, etc.) to specify the changes to the database schema.
Run the migration: The rails db:migrate command is used to apply the migration and update the database schema. Rails keeps track of the migrated status of each migration to prevent applying the same migration multiple times.
Rollback the migration: If needed, developers can use the rails db:rollback command to undo the last migration, effectively rolling back the changes.
Database migrations are essential for the development process because they provide a version-controlled and repeatable way to manage changes to the database schema. This makes it easy to collaborate with other developers, deploy changes to different environments, and roll back changes if necessary. Additionally, migrations ensure that the database schema remains in sync with the application code, minimizing conflicts and ensuring data integrity during development and deployment.

Question:
Explain the purpose of Active Record in Ruby on Rails and how it simplifies database interactions.

Answer:
Active Record is an Object-Relational Mapping (ORM) pattern and a key component of Ruby on Rails. Its purpose is to simplify database interactions by abstracting the database layer and allowing developers to work with database records as if they were Ruby objects.

The main features and benefits of Active Record are as follows:

Object-Oriented Interface: Active Record allows developers to define model classes that correspond to database tables. Each instance of the model class represents a row in the table. Developers can use Ruby methods and syntax to interact with the database instead of writing raw SQL queries.
Associations: Active Record provides built-in support for defining associations between model classes, such as one-to-many, many-to-many, and one-to-one relationships. This makes it easy to navigate and manipulate related data without having to manually write complex SQL joins.
Query Interface: Active Record offers a chainable and expressive query interface to perform database queries. Developers can use methods like where, order, limit, select, and more to build complex queries with ease.
Validations: Active Record includes validation mechanisms that enable developers to specify rules for data integrity. Common validations include presence, uniqueness, numericality, and custom validations.
Callbacks: Active Record provides hooks (callbacks) that allow developers to perform actions before or after certain events, such as saving, updating, or deleting records. This is useful for implementing business logic and maintaining data consistency.
Migrations Integration: Active Record is tightly integrated with database migrations, allowing developers to define database changes using Ruby code and apply them incrementally through migrations.
By leveraging Active Record, developers can focus on the application’s business logic rather than low-level database interactions. It promotes code reusability, improves code organization, and reduces the likelihood of SQL injection vulnerabilities, as Active Record automatically sanitizes query parameters.

Question:
How does Rails handle user authentication and authorization? Provide an overview of commonly used gems or techniques for implementing these functionalities.

Answer:
Rails provides several gems and techniques to handle user authentication and authorization efficiently.

Devise: Devise is one of the most popular gems for user authentication in Rails. It provides a complete set of functionalities for user registration, login, password reset, account activation, and more. Devise integrates seamlessly with the Active Record ORM and supports various authentication strategies, such as database-backed or token-based authentication.
Omniauth: Omniauth is a gem for handling third-party authentication (e.g., signing in with Google or Facebook). It abstracts the authentication process for multiple providers and provides a unified API to interact with different OAuth providers.
Cancancan: Cancancan is a powerful gem for authorization management. It allows developers to define user roles and permissions using a simple DSL. With Cancancan, developers can easily restrict access to specific resources or actions based on a user’s role or permissions.
Pundit: Pundit is another popular gem for authorization. It follows a policy-based approach, where developers define individual policies for each resource or model. Pundit’s policies use plain Ruby classes and methods, making it easy to manage and test permissions.
JWT (JSON Web Tokens): For token-based authentication, developers can use gems like jwt to implement JSON Web Tokens. JWT is a stateless authentication mechanism that stores user information in the token itself, reducing the need for server-side storage.
Overall, combining Devise for authentication and Cancancan or Pundit for authorization provides a robust solution for user management in Rails applications. For additional functionalities, such as third-party authentication, developers can integrate Omniauth with Devise.

Question:
Explain the concept of RESTful routing in Ruby on Rails. How does it help in building web applications?

Answer:
RESTful routing is a key concept in Ruby on Rails that follows the principles of Representational State Transfer (REST). It defines a set of conventions for mapping HTTP methods and URLs to controller actions, providing a standard and organized way to build web applications.

The main features of RESTful routing in Rails are as follows:

Resource-Based Routing: RESTful routing treats web application components (e.g., users, posts, comments) as resources. Each resource corresponds to a model in the application. Rails provides a set of predefined routes for CRUD (Create, Read, Update, Delete) operations on these resources.
HTTP Methods: RESTful routing maps HTTP methods to controller actions. For example, GET requests are mapped to the index or show action for retrieving data, POST requests to create for creating new resources, PATCH or PUT requests to update for modifying existing resources, and DELETE requests to destroy for deleting resources.
Named Routes: Rails automatically generates named routes for each route in the application. These named routes make it easy to generate URLs and links within the views and controllers, improving code maintainability and reducing the likelihood of errors.
Resourceful Routing: Rails provides a concise way to declare resourceful routes using the resources method in the config/routes.rb file. This single line declaration generates all the standard RESTful routes for a resource.
Using RESTful routing in Rails promotes a clean and consistent API design, making the application easier to understand and maintain. It also improves the readability of the code and simplifies the process of building and modifying routes. Additionally, adhering to RESTful principles allows developers to create more discoverable and interoperable APIs that align with industry best practices.

Question:
Explain the concept of Rails callbacks and provide examples of where they can be used in real-world applications.

Answer:
Rails callbacks are methods that allow developers to trigger certain actions at specific points during the lifecycle of an Active Record model. They provide hooks to execute custom logic before or after certain events, such as saving, creating, updating, or deleting records. Callbacks help encapsulate behavior that needs to be executed consistently across model instances.

Rails offers several types of callbacks, including before_save, after_create, before_update, after_destroy, and many more. Here are some examples of where callbacks can be used in real-world applications:

Timestamping: Rails provides built-in callbacks before_create and before_update that can be used to automatically set timestamp attributes, such as created_at and updated_at, before the record is created or updated.
class Post < ApplicationRecord
  before_create :set_created_at

  private

  def set_created_at
    self.created_at = Time.now
  end
end
Code language: HTML, XML (xml)
Generating Slugs: Callbacks can be used to automatically generate slugs for friendly URLs based on other attributes when creating or updating a model instance.
class Article < ApplicationRecord
  before_save :generate_slug

  private

  def generate_slug
    self.slug = title.parameterize
  end
end
Code language: HTML, XML (xml)
Notification: After certain events, such as the creation of a new record, callbacks can trigger notifications to users or external services.
class Comment < ApplicationRecord
  after_create :send_notification_to_users

  private

  def send_notification_to_users
    # Code to send notifications to relevant users
  end
end
Code language: CSS (css)
Data Integrity: Callbacks can be used to enforce data integrity by performing checks or validations before certain events.
class Order < ApplicationRecord
  before_update :check_order_status

  private

  def check_order_status
    if status_changed? && status == 'shipped'
      raise StandardError, 'Cannot modify a shipped order.'
    end
  end
end
Code language: HTML, XML (xml)
Rails callbacks provide a powerful mechanism to execute custom logic at different points in the model’s lifecycle. However, developers should be cautious not to make callbacks overly complex or perform resource-intensive operations within them, as it may negatively impact the performance of the application.

Question:
Explain the concept of caching in Ruby on Rails. How can caching improve the performance of web applications?

Answer:
Caching in Ruby on Rails is a technique used to store frequently accessed or computationally expensive data in memory or on disk. The cached data can be quickly retrieved and served to users without having to recompute or regenerate it each time. Caching is crucial for improving the performance and responsiveness of web applications, especially for pages or resources that take time to generate.

Rails provides various caching strategies, including:

Page Caching: Caching the entire HTML output of a page as a static file. It is suitable for static pages that don’t change often.
Action Caching: Caching the output of a specific controller action. The cached data is stored in memory and served for subsequent requests until the cache expires or is invalidated.
Fragment Caching: Caching parts of a view or template. This is useful when only certain sections of a page need to be cached, while the rest is dynamic.
Low-Level Caching: Manual caching using methods like Rails.cache.fetch to store arbitrary data in the cache store.
Here’s how caching can improve the performance of web applications:

Reduced Response Time: Cached data is served quickly without executing the entire request cycle, reducing the response time and improving user experience.
Lower Server Load: Caching reduces the workload on the application server, as it can serve cached data without executing complex calculations or database queries.
Scalability: Caching helps scale web applications, as cached data can be served by multiple instances of the application server or even by dedicated caching servers.
Fewer Database Queries: By caching frequently accessed data, the number of database queries can be minimized, leading to improved database performance and reduced query execution time.
Reliability: Caching can help handle traffic spikes or temporary server outages by serving cached content when the primary data source is not available.
However, caching should be used judiciously, as over-caching or improper cache management may lead to stale data or inconsistent user experiences. Developers should be aware of cache expiration and invalidation to ensure that cached data is always up-to-date.

Question:
Explain the concept of asset pipeline in Ruby on Rails and how it optimizes the delivery of assets in web applications.

Answer:
The asset pipeline is a feature in Ruby on Rails that aims to optimize the delivery of assets, such as stylesheets, JavaScript files, and images, to web browsers. It provides a set of tools and conventions to process, compress, and cache assets, reducing page load times and improving performance.

The key features of the asset pipeline include:

Concatenation: The asset pipeline concatenates multiple JavaScript and CSS files into a single file, reducing the number of HTTP requests needed to fetch assets.
Minification: JavaScript and CSS files are minified, removing whitespace and comments, and renaming variables to reduce file sizes and improve download times.
Asset Compression: Assets are compressed using gzip or other compression algorithms, further reducing file sizes during transfer.
Caching: The asset pipeline adds fingerprinting or unique hashes to the asset filenames. When an asset is changed, the fingerprint changes, allowing browsers to cache assets efficiently and only download updated assets.
Precompilation: Assets are precompiled during deployment, so they don’t need to be processed on-the-fly during each request, saving server processing time.
Sprockets: Sprockets is the gem that provides the underlying functionality for the asset pipeline. It manages asset dependencies, includes directives, and asset preprocessing.
By using the asset pipeline, web applications can deliver optimized assets to users, resulting in faster page load times and improved user experience. Additionally, it reduces the load on the web

server and network, making the application more scalable and reliable, especially during traffic spikes.

Question:
Explain the concept of Action Cable in Ruby on Rails and how it facilitates real-time features in web applications.

Answer:
Action Cable is a framework in Ruby on Rails that enables real-time features, such as chat, notifications, or live updates, in web applications. It provides WebSocket support and a set of tools for handling WebSockets, which allow bidirectional communication between the client (web browser) and the server.

Action Cable works as follows:

WebSocket Connection: When a user connects to a page that includes Action Cable, a WebSocket connection is established between the client and the server. This connection remains open as long as the user is on the page.
Channels: Action Cable uses channels to organize WebSocket connections and manage message broadcasting. Each channel represents a specific feature or topic in the application, such as a chat room or a notification channel.
Broadcasting: Action Cable allows the server to broadcast messages to all connected clients subscribed to a particular channel. When a message is broadcasted, it is received by the relevant clients, triggering JavaScript callbacks to update the user interface in real-time.
Background Processing: Action Cable integrates with Active Job, allowing developers to perform time-consuming tasks, such as data processing or API calls, in the background while maintaining real-time responsiveness.
Here’s a simple example of using Action Cable for a real-time chat application:

# app/channels/chat_channel.rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_channel"
  end

  def receive(data)
    ActionCable.server.broadcast("chat_channel", data)
  end
end
// app/assets/javascripts/channels/chat.js
App.chat = App.cable.subscriptions.create("ChatChannel", {
  received: function(data) {
    // Handle received message and update the UI
  },

  send: function(message) {
    this.perform('receive', { message: message });
  }
});
Code language: JavaScript (javascript)
With Action Cable, developers can easily implement real-time features in their Ruby on Rails applications without relying on external libraries or services. It promotes user engagement, interactivity, and responsiveness, making web applications more dynamic and engaging.

Question:
Explain how Rails manages sessions and cookies. How can developers use sessions for user authentication?

Answer:
In Ruby on Rails, sessions and cookies are used to store user-specific data and maintain state between requests. They are essential for user authentication and maintaining user sessions across multiple requests.

Sessions: A session is a way to store user-specific data on the server-side. When a user makes a request to the Rails application for the first time, a unique session identifier (usually stored in a cookie) is sent to the user’s browser. This identifier is used to retrieve the session data stored on the server when the user makes subsequent requests.
Rails provides an abstraction for sessions using the session object, which is a hash-like structure accessible from controllers and views. Developers can store user-specific data, such as user IDs or authentication tokens, in the session to maintain state between requests.

To enable sessions in Rails, developers need to configure the session store in the config/application.rb file. Common session stores include cookies, databases, and external services like Redis.

Cookies: Cookies are small pieces of data stored in the user’s browser and sent with every HTTP request to the server. Rails uses cookies to store the session identifier and other user-specific data. Cookies are stored as key-value pairs and have an expiration time.
To set a cookie in Rails, developers use the cookies object in controllers. For example, to set a cookie named “user_id”:

cookies[:user_id] = { value: 123, expires: 1.week.from_now }
To read the value of a cookie:

user_id = cookies[:user_id]
For user authentication, developers can use sessions to store the user’s ID or authentication token after successful login. On each subsequent request, the application can check the session data to determine if the user is authenticated.

class SessionsController < ApplicationController
  def create
    # Perform authentication and get the authenticated user
    user = authenticate(params[:email], params[:password])

    if user
      session[:user_id] = user.id
      redirect_to root_path, notice: 'Logged in successfully!'
    else
      flash.now[:alert] = 'Invalid email or password.'
      render :new
    end
  end

  # Other actions like logout, etc.
end
Code language: HTML, XML (xml)
By using sessions and cookies in this way, Rails provides a secure and convenient way to implement user authentication and manage user sessions in web applications.

1,000 Companies use CoderPad to Screen and Interview Developers


Interview best practices for Rails roles
To conduct effective Rails interviews, it’s essential to consider various factors, such as the candidate’s experience level and the specific engineering role. To ensure your Rails interview questions yield the best results, we recommend following these best practices when interacting with candidates:

Create technical questions that reflect real-world business situations within your organization. This not only makes the interview more engaging for the candidate but also allows you to better assess their suitability for your team.
Encourage candidates to ask questions throughout the interview and foster a collaborative environment.
If Rails is used as part of a full stack, make sure your developers also possess knowledge of front-end technologies like HTML/CSS and database expertise, particularly with Active Record, which is Rails’ ORM (object-relational mapper) module.
Additionally, it’s important to adhere to standard interview practices when conducting Rails interviews. This includes adjusting question difficulty based on the candidate’s development skill level, providing timely feedback about their application status, and allowing candidates to ask about the evaluation or collaborate with you and your team.

Platform
Why CoderPad?
Resources
For Candidates
Pricing
twitter
youtube
linkedin
Product
Live Collaborative Online IDE
Realistic projects
Digital Whiteboard
Integrations
Single Sign-On (SSO)
Company
About Us
Press
Careers
Blog
Security
Contact Sales
Contact
FAQs
User Guides
Docs
Case Studies
Learning Center
Support
Contact Support
Status
Terms of service
Privacy policy
Policies

```
