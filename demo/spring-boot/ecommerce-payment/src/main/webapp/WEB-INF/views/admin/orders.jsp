<%@ page pageEncoding="UTF-8" %>

<%@ include file="../fragments/head.jspf" %>

<main id="main" class="page-width container-fluid admin-layout">

    <%@ include file="../fragments/admin.jspf" %>

    <div class="admin-content">
        <p class="eyebrow">EVERY CONSIDERED CHOICE</p>
        <h1>Orders.</h1>
        <label for="table-search" class="visually-hidden">Filter orders</label>
        <input id="table-search" class="form-control table-search" data-table-filter placeholder="Filter orders by ID, status or date…">
        <div class="panel">

            <%@ include file="../fragments/order-table.jspf" %>

        </div>
    </div>
</main>

<%@ include file="../fragments/footer.jspf" %>
