<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid admin-layout">

    <%@ include file="../fragments/admin.jspf" %>

    <div class="admin-content">
        <p class="eyebrow">CURATE THE EVERYDAY</p>
        <div class="section-heading">
            <h1>The collection.</h1>
            <a class="text-link" href="#product-form">Add an essential +</a>
        </div>
        <label for="table-search" class="visually-hidden">Filter products</label>
        <input id="table-search" class="form-control table-search" data-table-filter placeholder="Find a product, category or SKU…">
        <section class="panel table-responsive">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${products}" var="p">
                        <tr>
                            <td><strong><c:out value="${p.title}" /></strong>
                                <br><small class="muted"><c:out value="${p.sku}" /> · <c:out value="${p.category}" /></small>
                            </td>
                            <td><c:out value="${p.money}" /></td>
                            <td>${p.stockQuantity}</td>
                            <td><span class="state">${p.active?'Active':'Hidden'}</span></td>
                            <td>
                                <a class="text-link" href="<c:url value='/admin/products?edit=${p.id}'/>#product-form">Edit ↗</a>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </section>
        <section class="panel mt-4" id="product-form">
            <h2>${empty editing?'Add an essential':'Edit essential'}</h2>
            <form method="post" action="<c:url value='/admin/products'/>" class="validated-form">

                <%@ include file="../fragments/csrf.jspf" %>

                <input type="hidden" name="id" value="${editing.id}">
                <div class="row g-3">
                    <div class="col-md-8">
                        <label for="title">Product title</label>
                        <input class="form-control" id="title" name="title" maxlength="150" value="<c:out value='${editing.title}'/>" required>
                    </div>
                    <div class="col-md-4">
                        <label for="sku">SKU</label>
                        <input class="form-control" id="sku" name="sku" maxlength="50" value="<c:out value='${editing.sku}'/>" required>
                    </div>
                    <div class="col-12">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" name="description" rows="3" maxlength="3000"
                            required><c:out value="${editing.description}"/></textarea>
                    </div>
                    <div class="col-md-4">
                        <label for="category">Category</label>
                        <input class="form-control" id="category" name="category" maxlength="50" value="<c:out value='${editing.category}'/>" required>
                    </div>
                    <div class="col-md-4">
                        <label for="price">Price (INR)</label>
                        <input class="form-control" id="price" name="price" type="number" min="1" max="1000000" step="0.01"
                            value="${empty editing?'':editing.priceMinorUnits/100}" required>
                    </div>
                    <div class="col-md-4">
                        <label for="stock">Available stock</label>
                        <input class="form-control" id="stock" name="stock" type="number" min="0" max="100000"
                            value="${empty editing?'0':editing.stockQuantity}" required>
                    </div>
                    <div class="col-md-6">
                        <label for="art">Illustration</label>
                        <select class="form-select" id="art" name="art" required>
                            <c:forEach items="${['lamp','chair','vase','bag','headphones','clock']}" var="art">
                                <option value="${art}" ${editing.art eq art?'selected':''}><c:out value="${art}" /></option>
                            </c:forEach>
                        </select>
                    </div>
                    <div class="col-md-6 d-flex align-items-end">
                        <label class="form-check">
                            <input class="form-check-input" type="checkbox" name="active" value="true" ${empty editing or editing.active?'checked':''}> Visible
                            in the store
                        </label>
                    </div>
                </div>
                <button class="btn btn-primary mt-4">Save product <i class="bi bi-check2"></i></button>
                <a class="text-link ms-3" href="<c:url value='/admin/products'/>#product-form">Start a new product</a>
            </form>
            <p class="small muted mt-3">Stock here is available inventory; pending orders already reserve their quantities. Hide products to remove them from
                the storefront while preserving order history.</p>
        </section>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
