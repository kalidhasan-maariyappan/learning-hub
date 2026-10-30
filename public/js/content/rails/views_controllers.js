// Ruby on Rails: Views (Action View) and Controllers (Action Controller and routing).
(function () {
  'use strict';
  const JT = window.JT;
  const { p, h2, ul, table } = JT.h;
  const K = JT.kit;
  const page = K.pager('Rails');
  const term = (code, result) => K.rails(code, { title: 'Terminal', lang: 'text', result, label: 'Terminal' });

  page('rails_action_view', () => [
    h2('Action View and ERB'),
    p('Views are templates that turn data into HTML. Rails uses <b>ERB</b> (Embedded Ruby): HTML with Ruby inside special tags.'),
    table(['Tag', 'Does'], [
      ['<code>&lt;% code %&gt;</code>', 'Runs Ruby, prints nothing (loops, conditions)'],
      ['<code>&lt;%= code %&gt;</code>', 'Runs Ruby and prints the result, HTML-escaped'],
      ['<code>&lt;%# comment %&gt;</code>', 'A comment that is not sent to the browser'],
    ]),
    K.rails(`
      <h1>Products</h1>
      <% @products.each do |product| %>
        <div>
          <%= link_to product.name, product %>
          <% if product.inventory_count.zero? %>
            <span>Out of stock</span>
          <% end %>
        </div>
      <% end %>`, { title: 'app/views/products/index.html.erb', lang: 'erb' }),
    h2('Template lookup'),
    p('By convention <code>ProductsController#index</code> renders <code>app/views/products/index.html.erb</code>. The file name says the format (<code>html</code>) and the handler (<code>erb</code>); <code>index.json.jbuilder</code> would render JSON.'),
    K.remember(['<code>&lt;%= %&gt;</code> escapes HTML automatically, which protects against XSS.', 'Only use <code>raw</code> or <code>html_safe</code> on content you trust.']),
  ]);

  page('rails_layouts_rendering', () => [
    h2('Layouts'),
    p('A layout wraps every page with shared HTML such as the header and footer. The page content goes where the layout calls <code>yield</code>.'),
    K.rails(`
      <!DOCTYPE html>
      <html>
        <head>
          <title><%= content_for(:title) || "Store" %></title>
          <%= csrf_meta_tags %>
          <%= stylesheet_link_tag :app %>
          <%= javascript_importmap_tags %>
        </head>
        <body>
          <nav><%= link_to "Home", root_path %></nav>
          <%= yield %>
        </body>
      </html>`, { title: 'app/views/layouts/application.html.erb', lang: 'erb' }),
    h2('render and redirect_to'),
    K.rails(`
      def create
        @product = Product.new(product_params)
        if @product.save
          redirect_to @product, notice: "Product created."
        else
          render :new, status: :unprocessable_entity
        end
      end`, { title: 'app/controllers/products_controller.rb' }),
    table(['Call', 'What happens'], [
      ['<code>render :new</code>', 'Shows the <code>new</code> template in this same request; <code>@product</code> keeps its errors'],
      ['<code>redirect_to @product</code>', 'Sends a 302 response; the browser makes a new GET request'],
      ['<code>head :no_content</code>', 'Sends only a status code'],
      ['<code>render json: @product</code>', 'Sends JSON'],
    ]),
    K.warn('Calling <code>render</code> or <code>redirect_to</code> twice in one action. It raises <code>DoubleRenderError</code>; use <code>return</code> after the first one, or an <code>if/else</code>.'),
    K.tip('Return <code>422 unprocessable_entity</code> when a form has errors. Turbo needs a 4xx status to show the re-rendered form.'),
  ]);

  page('rails_partials', () => [
    h2('Partials'),
    p('A partial is a reusable piece of a view. Its file name starts with an underscore.'),
    K.rails(`
      <%= form_with model: product do |form| %>
        <%= form.label :name %>
        <%= form.text_field :name %>
        <%= form.submit %>
      <% end %>`, { title: 'app/views/products/_form.html.erb', lang: 'erb' }),
    K.rails(`
      <h1>New product</h1>
      <%= render "form", product: @product %>`, { title: 'app/views/products/new.html.erb', lang: 'erb' }),
    h2('Rendering collections'),
    p('<code>render @products</code> renders <code>_product.html.erb</code> once for each product, with a local variable named <code>product</code>:'),
    K.rails(`
      <%= render @products %>`, { title: 'index.html.erb', lang: 'erb' }),
    K.rails(`
      <div id="<%= dom_id(product) %>">
        <%= product.name %> — <%= number_to_currency(product.price) %>
      </div>`, { title: 'app/views/products/_product.html.erb', lang: 'erb' }),
    K.tip('Pass data to partials as locals instead of reading instance variables inside them; the partial is then reusable from any view.'),
  ]);

  page('rails_view_helpers', () => [
    h2('View helpers'),
    p('Helpers are methods for views. Rails includes many, and you can add your own in <code>app/helpers</code>.'),
    K.rails(`
      <%= link_to "All products", products_path %>
      <%= button_to "Delete", product, method: :delete %>
      <%= number_to_currency(1234.5) %>
      <%= time_ago_in_words(3.hours.ago) %>
      <%= pluralize(3, "review") %>
      <%= truncate("A very long product description", length: 15) %>
      <%= image_tag "logo.png", alt: "Store" %>`, { title: 'Common helpers', lang: 'erb', result: '<a href="/products">All products</a>\n<form class="button_to" method="post" action="/products/1">...</form>\n$1,234.50\nabout 3 hours\n3 reviews\nA very long ...\n<img alt="Store" src="/assets/logo-abc123.png">', label: 'HTML' }),
    h2('Your own helper'),
    K.rails(`
      module ProductsHelper
        def stock_label(product)
          product.inventory_count.positive? ? "In stock" : "Sold out"
        end
      end`, { title: 'app/helpers/products_helper.rb' }),
    K.warn('Deleting with a plain <code>link_to</code>. A link sends GET; use <code>button_to ... method: :delete</code>, which submits a form with a CSRF token.'),
  ]);

  page('rails_form_helpers', () => [
    h2('form_with'),
    p('<code>form_with</code> builds a form for a model. It chooses the URL and HTTP method (POST for a new record, PATCH for an existing one) and adds the CSRF token.'),
    K.rails(`
      <%= form_with model: @product do |form| %>
        <div>
          <%= form.label :name %>
          <%= form.text_field :name %>
        </div>
        <div>
          <%= form.label :category %>
          <%= form.select :category, ["clothes", "kitchen"] %>
        </div>
        <div>
          <%= form.check_box :featured %>
          <%= form.label :featured %>
        </div>
        <%= form.submit %>
      <% end %>`, { title: 'app/views/products/_form.html.erb', lang: 'erb' }),
    K.rails(`
      <form action="/products" method="post">
        <input type="hidden" name="authenticity_token" value="...">
        <input type="text" name="product[name]" id="product_name">
        ...
        <input type="submit" name="commit" value="Create Product">
      </form>`, { title: 'Generated HTML (new product)', lang: 'text' }),
    p('Field names like <code>product[name]</code> arrive in the controller as <code>params[:product][:name]</code>.'),
    h2('Forms without a model'),
    K.rails(`
      <%= form_with url: search_path, method: :get do |form| %>
        <%= form.search_field :q %>
        <%= form.submit "Search" %>
      <% end %>`, { title: 'Search form', lang: 'erb' }),
  ]);

  page('rails_controllers', () => [
    h2('Action Controller'),
    p('A controller is a Ruby class that inherits from <code>ApplicationController</code>. Each public method is an <b>action</b> that handles one kind of request.'),
    K.rails(`
      class ProductsController < ApplicationController
        def index
          @products = Product.all
        end

        def show
          @product = Product.find(params[:id])
        end
      end`, { title: 'app/controllers/products_controller.rb' }),
    h2('params'),
    p('<code>params</code> holds everything sent with the request: path segments, the query string and form or JSON data.'),
    K.rails(`
      # GET /products/7?sort=price
      params[:id]
      params[:sort]`, { title: 'Reading params', result: '"7"\n"price"' }),
    p('Values in <code>params</code> are strings. Active Record converts them when you assign them to attributes.'),
    h2('Responding to formats'),
    K.rails(`
      def show
        @product = Product.find(params[:id])
        respond_to do |format|
          format.html
          format.json { render json: @product }
        end
      end`, { title: 'HTML and JSON' }),
    K.tip('Controller names are plural (<code>ProductsController</code>), model names singular (<code>Product</code>).'),
  ]);

  page('rails_strong_params', () => [
    h2('Strong Parameters'),
    p('Rails will not let you pass <code>params</code> straight to <code>create</code> or <code>update</code>. You must list which attributes are allowed, so a user cannot set fields such as <code>admin</code> or <code>price</code> by adding them to the form. This attack is called <b>mass assignment</b>.'),
    K.rails(`
      class ProductsController < ApplicationController
        def create
          @product = Product.new(product_params)
          # ...
        end

        private

        def product_params
          params.expect(product: [:name, :description, :inventory_count])
        end
      end`, { title: 'params.expect (Rails 8)' }),
    p('<code>params.expect</code> requires a <code>product</code> hash and permits only the listed keys. If the shape is wrong, Rails responds with <b>400 Bad Request</b> instead of raising a 500 error.'),
    h2('Nested and array values'),
    K.rails(`
      params.expect(product: [:name, tag_ids: [], images: [], variants_attributes: [[:id, :size, :_destroy]]])`, { title: 'Arrays and nested attributes' }),
    p('In older code you will see the same thing written as <code>params.require(:product).permit(:name, ...)</code>.'),
    K.warn('Using <code>params.permit!</code> to allow everything. It brings back mass assignment.'),
  ]);

  page('rails_sessions_flash', () => [
    h2('Session'),
    p('The session stores small values between requests for one user. By default it is kept in an encrypted cookie.'),
    K.rails(`
      session[:cart_id] = cart.id
      cart = Cart.find_by(id: session[:cart_id])
      session.delete(:cart_id)
      reset_session`, { title: 'Using the session' }),
    h2('Cookies'),
    K.rails(`
      cookies[:theme] = "dark"
      cookies.encrypted[:user_id] = { value: user.id, expires: 2.weeks, httponly: true }
      cookies.signed[:visits] = 3`, { title: 'Plain, encrypted and signed cookies' }),
    table(['Kind', 'User can read', 'User can change'], [['<code>cookies</code>', 'Yes', 'Yes'], ['<code>cookies.signed</code>', 'Yes', 'No (detected)'], ['<code>cookies.encrypted</code>', 'No', 'No (detected)']]),
    h2('Flash'),
    p('The flash is a part of the session that is cleared after the next request. Use it for one-time messages after a redirect:'),
    K.rails(`
      redirect_to products_path, notice: "Product deleted."`, { title: 'Controller' }),
    K.rails(`
      <% if notice %>
        <p class="notice"><%= notice %></p>
      <% end %>`, { title: 'Layout', lang: 'erb' }),
    K.tip('When you <code>render</code> instead of redirecting, use <code>flash.now[:alert]</code> so the message does not also appear on the next page.'),
  ]);

  page('rails_controller_callbacks', () => [
    h2('before_action'),
    p('Controller callbacks run code before, after or around actions. <code>before_action</code> is the most common: it loads records or stops a request early.'),
    K.rails(`
      class ProductsController < ApplicationController
        before_action :set_product, only: %i[show edit update destroy]

        def show
        end

        def update
          if @product.update(product_params)
            redirect_to @product
          else
            render :edit, status: :unprocessable_entity
          end
        end

        private

        def set_product
          @product = Product.find(params[:id])
        end
      end`, { title: 'Removing repetition' }),
    h2('Stopping a request'),
    p('If a <code>before_action</code> renders or redirects, the action does not run:'),
    K.rails(`
      class Admin::BaseController < ApplicationController
        before_action :require_admin

        private

        def require_admin
          redirect_to root_path, alert: "Not allowed" unless Current.user&.admin?
        end
      end`, { title: 'Authorization check' }),
    K.remember(['Use <code>only:</code> or <code>except:</code> to limit which actions a callback applies to.', '<code>skip_before_action</code> turns off a parent controller’s callback.', '<code>around_action</code> wraps an action, for example to set the time zone.']),
  ]);

  page('rails_routing', () => [
    h2('Routing'),
    p('The router maps a URL and HTTP method to a controller action. <code>resources</code> creates the seven standard CRUD routes in one line.'),
    K.rails(`
      Rails.application.routes.draw do
        root "products#index"
        resources :products
        get "/about", to: "pages#about"
      end`, { title: 'config/routes.rb' }),
    table(['HTTP verb', 'Path', 'Action', 'Helper'], [
      ['GET', '/products', 'index', '<code>products_path</code>'], ['GET', '/products/new', 'new', '<code>new_product_path</code>'],
      ['POST', '/products', 'create', '<code>products_path</code>'], ['GET', '/products/:id', 'show', '<code>product_path(product)</code>'],
      ['GET', '/products/:id/edit', 'edit', '<code>edit_product_path(product)</code>'], ['PATCH/PUT', '/products/:id', 'update', '<code>product_path(product)</code>'],
      ['DELETE', '/products/:id', 'destroy', '<code>product_path(product)</code>'],
    ]),
    h2('List the routes'),
    term('bin/rails routes -c products', '      Prefix Verb   URI Pattern                  Controller#Action\n    products GET    /products(.:format)          products#index\n             POST   /products(.:format)          products#create\n new_product GET    /products/new(.:format)      products#new\n...'),
    K.tip('Use <code>resources :products, only: %i[index show]</code> to create only the routes you need.'),
  ]);

  page('rails_routing_more', () => [
    h2('Nested resources'),
    p('Nest a resource when it only makes sense inside its parent:'),
    K.rails(`
      resources :products do
        resources :reviews, only: %i[create destroy]
      end`, { title: 'config/routes.rb', result: 'POST   /products/:product_id/reviews      reviews#create\nDELETE /products/:product_id/reviews/:id  reviews#destroy', label: 'Routes' }),
    K.tip('Nest only one level deep. Use <code>shallow: true</code> so member routes such as edit and destroy do not need the parent id.'),
    h2('Member and collection routes'),
    K.rails(`
      resources :orders do
        member do
          post :cancel
        end
        collection do
          get :search
        end
      end`, { title: 'Extra actions', result: 'POST /orders/:id/cancel  orders#cancel\nGET  /orders/search      orders#search', label: 'Routes' }),
    h2('Namespaces'),
    K.rails(`
      namespace :admin do
        resources :products
      end`, { title: 'Admin area', result: 'GET /admin/products  admin/products#index  (Admin::ProductsController)', label: 'Routes' }),
    p('<code>scope module: "api"</code> changes only the controller module, and <code>scope "/v1"</code> only the URL path.'),
  ]);

  page('rails_controller_advanced', () => [
    h2('CSRF protection'),
    p('Rails protects every non-GET request against cross-site request forgery. Forms built with Rails helpers include a hidden <code>authenticity_token</code>, and the layout includes <code>csrf_meta_tags</code> for JavaScript requests. If the token is missing or wrong, Rails raises <code>ActionController::InvalidAuthenticityToken</code>.'),
    K.rails(`
      class ApplicationController < ActionController::Base
        protect_from_forgery with: :exception
      end`, { title: 'On by default in new apps' }),
    h2('Rate limiting (Rails 7.2+)'),
    K.rails(`
      class SessionsController < ApplicationController
        rate_limit to: 10, within: 3.minutes, only: :create,
                   with: -> { redirect_to new_session_url, alert: "Try again later." }
      end`, { title: 'Limit login attempts' }),
    h2('Filtering sensitive parameters'),
    p('Rails hides matching parameters in the log. New apps already filter passwords, tokens and similar names:'),
    K.rails(`
      Rails.application.config.filter_parameters += [:passw, :email, :secret, :token, :_key, :crypt, :salt, :certificate, :otp, :ssn, :cvv, :cvc]`, { title: 'config/initializers/filter_parameter_logging.rb' }),
    h2('Handling errors'),
    K.rails(`
      class ApplicationController < ActionController::Base
        rescue_from ActiveRecord::RecordNotFound, with: :not_found

        private

        def not_found
          render file: Rails.public_path.join("404.html"), status: :not_found, layout: false
        end
      end`, { title: 'rescue_from' }),
    K.tip('<code>allow_browser versions: :modern</code>, added to new apps\' ApplicationController, rejects old browsers that lack features the app relies on.'),
  ]);
})();
